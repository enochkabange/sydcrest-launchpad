import type Anthropic from "@anthropic-ai/sdk";
import { describe, expect, it, vi } from "vitest";
import { buildRequestParams, createStudyBuddyClient, REFUSAL_TEXT, streamReply, tokenUsage, type ReplyStream, type StudyBuddyClient } from "./chat";
import { buildSystemPrompt } from "./prompt";
import { routeMessage } from "./router";
import { MAX_TOOL_ROUNDS } from "./config";
import { COMPANION_TOOLS } from "./tools/definitions";

const usage = {
  input_tokens: 40,
  output_tokens: 25,
  cache_creation_input_tokens: 0,
  cache_read_input_tokens: 900,
} as Anthropic.Usage;

function textEvents(parts: string[]): Anthropic.MessageStreamEvent[] {
  return parts.map((text) => ({ type: "content_block_delta", index: 0, delta: { type: "text_delta", text } }) as Anthropic.MessageStreamEvent);
}

function fakeClient(opts: { parts?: string[]; stopReason?: Anthropic.StopReason; failAfter?: number } = {}) {
  const calls: Anthropic.MessageStreamParams[] = [];
  const final = { usage, stop_reason: opts.stopReason ?? "end_turn" } as Anthropic.Message;
  const client: StudyBuddyClient = {
    messages: {
      stream(params) {
        calls.push(params);
        const events = textEvents(opts.parts ?? ["Good ", "question!"]);
        const stream: ReplyStream = {
          currentMessage: final,
          abort: vi.fn(),
          finalMessage: async () => final,
          async *[Symbol.asyncIterator]() {
            for (const [i, e] of events.entries()) {
              if (opts.failAfter !== undefined && i === opts.failAfter) throw new Error("network down");
              yield e;
            }
          },
        };
        return stream;
      },
    },
  };
  return { client, calls };
}

async function readAll(stream: ReadableStream<Uint8Array>) {
  return new Response(stream).text();
}

const node = { roadmapTitle: null, title: "Variables", summary: null, explanationMd: "A variable is a named box.", practiceTaskMd: null, quizPrompts: [] };

describe("createStudyBuddyClient", () => {
  it("returns null without a key so the route can answer 503", () => {
    expect(createStudyBuddyClient("")).toBeNull();
    expect(createStudyBuddyClient(undefined)).toBeNull();
  });
});

describe("buildRequestParams", () => {
  it("bounds max_tokens and keeps the cached system blocks", () => {
    const cheap = buildRequestParams(routeMessage("What is a variable?"), buildSystemPrompt(node), [{ role: "user", content: "What is a variable?" }]);
    expect(cheap).toMatchObject({ model: "claude-haiku-5-5", max_tokens: 1024, output_config: { effort: "low" } });
    const hard = buildRequestParams(routeMessage("Explain why x = x + 1 works"), buildSystemPrompt(node), []);
    expect(hard).toMatchObject({ model: "claude-sonnet-5-5", max_tokens: 2048 });
    expect(hard.max_tokens).toBeLessThanOrEqual(4096);
    expect(Array.isArray(hard.system) && hard.system.every((b) => b.cache_control?.type === "ephemeral")).toBe(true);
  });
});

describe("streamReply", () => {
  it("streams text and records total tokens once", async () => {
    const { client, calls } = fakeClient();
    const onFinish = vi.fn();
    const params = buildRequestParams(routeMessage("hi"), buildSystemPrompt(node), [{ role: "user", content: "hi" }]);
    expect(await readAll(streamReply(client, params, onFinish))).toBe("Good question!");
    expect(calls).toHaveLength(1);
    expect(onFinish).toHaveBeenCalledTimes(1);
    expect(onFinish).toHaveBeenCalledWith({ inputTokens: 940, outputTokens: 25 });
  });

  it("replaces an empty refusal with a friendly line", async () => {
    const { client } = fakeClient({ parts: [], stopReason: "refusal" });
    const text = await readAll(streamReply(client, {} as Anthropic.MessageStreamParams, vi.fn()));
    expect(text).toBe(REFUSAL_TEXT);
  });

  it("still records usage when the stream fails part way", async () => {
    const { client } = fakeClient({ parts: ["a", "b", "c"], failAfter: 1 });
    const onFinish = vi.fn();
    await expect(readAll(streamReply(client, {} as Anthropic.MessageStreamParams, onFinish))).rejects.toThrow();
    expect(onFinish).toHaveBeenCalledTimes(1);
  });
});

describe("tokenUsage", () => {
  it("adds cache reads and writes to input", () => {
    expect(tokenUsage({ input_tokens: 1, cache_creation_input_tokens: 2, cache_read_input_tokens: 3, output_tokens: 4 })).toEqual({ inputTokens: 6, outputTokens: 4 });
    expect(tokenUsage(null)).toEqual({ inputTokens: 0, outputTokens: 0 });
  });
});

/** A client that plays a queue of scripted rounds: each is some text, then optional tool calls. */
function scriptedClient(rounds: { text?: string[]; tools?: { name: string; input: unknown }[]; stopReason?: Anthropic.StopReason }[]) {
  const calls: Anthropic.MessageStreamParams[] = [];
  const client: StudyBuddyClient = {
    messages: {
      stream(params) {
        calls.push(structuredClone(params));
        const round = rounds[Math.min(calls.length - 1, rounds.length - 1)];
        const toolBlocks = (round.tools ?? []).map((t, i) => ({ type: "tool_use", id: `toolu_${calls.length}_${i}`, name: t.name, input: t.input }));
        const final = {
          usage: { input_tokens: 100, output_tokens: 10 },
          stop_reason: round.stopReason ?? (toolBlocks.length ? "tool_use" : "end_turn"),
          content: [...(round.text ?? []).map((text) => ({ type: "text", text })), ...toolBlocks],
        } as unknown as Anthropic.Message;
        const events = textEvents(round.text ?? []);
        return {
          currentMessage: final,
          abort: vi.fn(),
          finalMessage: async () => final,
          async *[Symbol.asyncIterator]() {
            yield* events;
          },
        } satisfies ReplyStream;
      },
    },
  };
  return { client, calls };
}

describe("streamReply with companion tools", () => {
  const params = buildRequestParams(routeMessage("Who could mentor me?"), buildSystemPrompt(null), [{ role: "user", content: "Who could mentor me?" }], COMPANION_TOOLS);

  it("runs the tools the model asks for, sends the results back and streams the final answer", async () => {
    const { client, calls } = scriptedClient([
      { text: ["Let me look."], tools: [{ name: "suggest_mentors", input: {} }, { name: "upcoming_events", input: {} }] },
      { text: ["Try [Fuseini](/experts/fuseini-data)."] },
    ]);
    const runTool = vi.fn(async (name: string) => ({ content: `<untrusted_content>${name}</untrusted_content>`, isError: name === "upcoming_events" }));
    const onFinish = vi.fn();
    const text = await readAll(streamReply(client, params, onFinish, runTool));

    expect(text).toBe("Let me look.\n\nTry [Fuseini](/experts/fuseini-data).");
    expect(runTool).toHaveBeenCalledWith("suggest_mentors", {});
    expect(runTool).toHaveBeenCalledWith("upcoming_events", {});
    expect(calls).toHaveLength(2);
    // Second call: the assistant's tool calls, then ONE user message with every result.
    const sent = calls[1].messages;
    expect(sent).toHaveLength(3);
    expect(sent[1].role).toBe("assistant");
    expect(sent[2]).toEqual({
      role: "user",
      content: [
        { type: "tool_result", tool_use_id: "toolu_1_0", content: "<untrusted_content>suggest_mentors</untrusted_content>" },
        { type: "tool_result", tool_use_id: "toolu_1_1", content: "<untrusted_content>upcoming_events</untrusted_content>", is_error: true },
      ],
    });
    // Same tools and system on every call, so the cached prefix holds.
    expect(calls[1].tools).toEqual(calls[0].tools);
    expect(calls[1].system).toEqual(calls[0].system);
    expect(onFinish).toHaveBeenCalledTimes(1);
    expect(onFinish).toHaveBeenCalledWith({ inputTokens: 200, outputTokens: 20 });
  });

  it("stops offering tools after MAX_TOOL_ROUNDS so a turn always ends", async () => {
    const { client, calls } = scriptedClient([{ tools: [{ name: "my_next_steps", input: {} }] }]);
    const runTool = vi.fn(async () => ({ content: "{}", isError: false }));
    await readAll(streamReply(client, params, vi.fn(), runTool));
    expect(calls).toHaveLength(MAX_TOOL_ROUNDS + 1);
    expect(runTool).toHaveBeenCalledTimes(MAX_TOOL_ROUNDS);
    expect(calls.at(-1)?.tool_choice).toEqual({ type: "none" });
    expect(calls.slice(0, -1).every((c) => c.tool_choice === undefined)).toBe(true);
  });

  it("does not run tools without an executor", async () => {
    const { client, calls } = scriptedClient([{ text: ["Hi"], tools: [{ name: "my_next_steps", input: {} }] }]);
    expect(await readAll(streamReply(client, params, vi.fn()))).toBe("Hi");
    expect(calls).toHaveLength(1);
  });

  it("puts the tools before the cached system blocks in the companion chat", () => {
    expect(params.tools?.map((t) => ("name" in t ? t.name : null))).toEqual(COMPANION_TOOLS.map((t) => t.name));
    expect(params.system).toEqual(buildSystemPrompt(null));
  });
});
