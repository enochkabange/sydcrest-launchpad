import type Anthropic from "@anthropic-ai/sdk";
import { describe, expect, it, vi } from "vitest";
import { buildRequestParams, createStudyBuddyClient, REFUSAL_TEXT, streamReply, tokenUsage, type ReplyStream, type StudyBuddyClient } from "./chat";
import { buildSystemPrompt } from "./prompt";
import { routeMessage } from "./router";

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
