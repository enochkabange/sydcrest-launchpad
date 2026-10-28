import Anthropic from "@anthropic-ai/sdk";
import { EFFORT, MAX_TOKENS, MAX_TOOL_ROUNDS } from "./config";
import type { RouteDecision } from "./router";

/**
 * The model call and its stream, kept apart from the route so it can be
 * tested with a fake client (no live calls in tests or CI).
 */

/** The slice of MessageStream we use; a fake in tests implements just this. */
export type ReplyStream = AsyncIterable<Anthropic.MessageStreamEvent> & {
  finalMessage(): Promise<Anthropic.Message>;
  readonly currentMessage: Anthropic.Message | undefined;
  abort(): void;
};

export type StudyBuddyClient = {
  messages: { stream(params: Anthropic.MessageStreamParams): ReplyStream };
};

/** Whether chat can run at all, so pages can show a friendly notice instead of a panel that only 503s. */
export function isStudyBuddyConfigured(apiKey = process.env.ANTHROPIC_API_KEY): boolean {
  return Boolean(apiKey);
}

/** Null when ANTHROPIC_API_KEY is missing; the route answers 503. */
export function createStudyBuddyClient(apiKey = process.env.ANTHROPIC_API_KEY): StudyBuddyClient | null {
  if (!apiKey) return null;
  return new Anthropic({ apiKey, maxRetries: 1 });
}

export function buildRequestParams(
  route: RouteDecision,
  system: Anthropic.TextBlockParam[],
  messages: Anthropic.MessageParam[],
  tools?: Anthropic.Tool[],
): Anthropic.MessageStreamParams {
  return {
    model: route.model,
    max_tokens: MAX_TOKENS[route.tier],
    // Tools render before the system prompt, so the system blocks' cache
    // breakpoints cache the (fixed) tool list too.
    ...(tools && tools.length > 0 ? { tools } : {}),
    system,
    messages,
    output_config: { effort: EFFORT[route.tier] },
  };
}

export type TokenUsage = { inputTokens: number; outputTokens: number };

/** Total input = uncached + cache writes + cache reads, so the log is the true volume. */
export function tokenUsage(usage: Partial<Anthropic.Usage> | undefined | null): TokenUsage {
  if (!usage) return { inputTokens: 0, outputTokens: 0 };
  return {
    inputTokens:
      (usage.input_tokens ?? 0) + (usage.cache_creation_input_tokens ?? 0) + (usage.cache_read_input_tokens ?? 0),
    outputTokens: usage.output_tokens ?? 0,
  };
}

export const REFUSAL_TEXT =
  "I can't help with that one. Let's get back to the topic. What part of the lesson would you like to look at together?";

export const CUT_OFF_TEXT = "\n\n(I stopped there to keep things short. Ask me to continue if you want more.)";

/** Runs one tool call for the model; see tools/run.ts. */
export type ToolExecutor = (name: string, input: unknown) => Promise<{ content: string; isError: boolean }>;

function addUsage(total: TokenUsage, usage: Partial<Anthropic.Usage> | undefined | null): TokenUsage {
  const more = tokenUsage(usage);
  return { inputTokens: total.inputTokens + more.inputTokens, outputTokens: total.outputTokens + more.outputTokens };
}

/**
 * Streams the reply as plain UTF 8 text. onFinish runs exactly once with
 * the usage the API reported across every call in the turn, also when the
 * stream fails or the learner closes the panel mid reply, so every billed
 * call's tokens are logged. (The message itself was already counted against
 * the cap before the call.) It does not run if the API was never reached.
 *
 * With runTool, the model may call the companion tools: each round's text
 * streams out, the tool calls run on the server, their results go back as
 * one user message, and the model continues. After MAX_TOOL_ROUNDS rounds
 * the last call is made with tool_choice none, so a turn always ends in a
 * written reply and its cost stays bounded.
 */
export function streamReply(
  client: StudyBuddyClient,
  params: Anthropic.MessageStreamParams,
  onFinish: (usage: TokenUsage) => Promise<void> | void,
  runTool?: ToolExecutor,
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let stream: ReplyStream | null = null;
  let finished = false;
  let total: TokenUsage = { inputTokens: 0, outputTokens: 0 };
  let reachedApi = false;

  async function finish() {
    if (finished) return;
    finished = true;
    if (!reachedApi) return;
    try {
      await onFinish(total);
    } catch (error) {
      console.error("Study Buddy could not record usage", error);
    }
  }

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let sentText = false;
      let breakBeforeNextText = false;
      let messages = params.messages;
      try {
        for (let round = 0; ; round++) {
          const lastRound = round >= MAX_TOOL_ROUNDS;
          stream = client.messages.stream({
            ...params,
            messages,
            ...(runTool && params.tools && lastRound ? { tool_choice: { type: "none" } } : {}),
          });
          let roundText = false;
          for await (const event of stream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta" && event.delta.text) {
              const text = breakBeforeNextText && !roundText ? `\n\n${event.delta.text}` : event.delta.text;
              sentText = true;
              roundText = true;
              controller.enqueue(encoder.encode(text));
            }
          }
          const final = await stream.finalMessage();
          stream = null;
          reachedApi = true;
          total = addUsage(total, final.usage);

          if (final.stop_reason === "tool_use" && runTool && !lastRound) {
            const calls = final.content.filter((b): b is Anthropic.ToolUseBlock => b.type === "tool_use");
            const results = await Promise.all(
              calls.map(async (call): Promise<Anthropic.ToolResultBlockParam> => {
                const out = await runTool(call.name, call.input);
                return { type: "tool_result", tool_use_id: call.id, content: out.content, ...(out.isError ? { is_error: true } : {}) };
              }),
            );
            messages = [...messages, { role: "assistant", content: final.content }, { role: "user", content: results }];
            if (roundText) breakBeforeNextText = true;
            continue;
          }

          if (final.stop_reason === "refusal" && !sentText) controller.enqueue(encoder.encode(REFUSAL_TEXT));
          if (final.stop_reason === "max_tokens") controller.enqueue(encoder.encode(CUT_OFF_TEXT));
          break;
        }
        await finish();
        controller.close();
      } catch (error) {
        const partial = (stream as ReplyStream | null)?.currentMessage?.usage;
        if (partial) {
          reachedApi = true;
          total = addUsage(total, partial);
        }
        await finish();
        console.error("Study Buddy stream failed", error);
        try {
          controller.error(error);
        } catch {
          // Already cancelled by the client.
        }
      }
    },
    cancel() {
      stream?.abort();
    },
  });
}
