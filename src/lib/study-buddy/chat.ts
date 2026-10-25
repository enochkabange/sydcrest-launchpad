import Anthropic from "@anthropic-ai/sdk";
import { EFFORT, MAX_TOKENS } from "./config";
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

/** Null when ANTHROPIC_API_KEY is missing; the route answers 503. */
export function createStudyBuddyClient(apiKey = process.env.ANTHROPIC_API_KEY): StudyBuddyClient | null {
  if (!apiKey) return null;
  return new Anthropic({ apiKey, maxRetries: 1 });
}

export function buildRequestParams(
  route: RouteDecision,
  system: Anthropic.TextBlockParam[],
  messages: Anthropic.MessageParam[],
): Anthropic.MessageStreamParams {
  return {
    model: route.model,
    max_tokens: MAX_TOKENS[route.tier],
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

/**
 * Streams the reply as plain UTF 8 text. onFinish runs exactly once with
 * whatever usage the API reported, also when the stream fails or the learner
 * closes the panel mid reply, so every billed call is logged against the cap.
 * It does not run if the API was never reached (no usage at all).
 */
export function streamReply(
  client: StudyBuddyClient,
  params: Anthropic.MessageStreamParams,
  onFinish: (usage: TokenUsage) => Promise<void> | void,
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let stream: ReplyStream | null = null;
  let finished = false;

  async function finish(usage: Partial<Anthropic.Usage> | undefined) {
    if (finished) return;
    finished = true;
    if (!usage) return;
    try {
      await onFinish(tokenUsage(usage));
    } catch (error) {
      console.error("Study Buddy could not record usage", error);
    }
  }

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let sentText = false;
      try {
        stream = client.messages.stream(params);
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta" && event.delta.text) {
            sentText = true;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal" && !sentText) controller.enqueue(encoder.encode(REFUSAL_TEXT));
        if (final.stop_reason === "max_tokens") controller.enqueue(encoder.encode(CUT_OFF_TEXT));
        await finish(final.usage);
        controller.close();
      } catch (error) {
        await finish(stream?.currentMessage?.usage);
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
