import type Anthropic from "@anthropic-ai/sdk";
import { MAX_OUTPUT_TOKENS } from "./config";
import { buildUserPrompt, SYSTEM_PROMPT, type NodeContext } from "./prompt";
import { CONTENT_JSON_SCHEMA, parseGeneratedContent, type ParseResult } from "./schema";

type BatchRequest = Anthropic.Messages.BatchCreateParams.Request;
type IndividualResponse = Anthropic.Messages.MessageBatchIndividualResponse;

/** custom_id allows [a-zA-Z0-9_-]{1,64}; a node uuid fits as is. */
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function customIdFor(nodeId: string): string {
  if (!UUID.test(nodeId)) throw new Error(`Not a node id: ${nodeId}`);
  return nodeId;
}

export function nodeIdFrom(customId: string): string | null {
  return UUID.test(customId) ? customId : null;
}

/**
 * One batch request per node. The system prompt is the same for every request
 * and carries the cache breakpoint, so the shared instructions are written to
 * the cache once and read by the rest. 1 hour TTL because a batch can take
 * longer than 5 minutes to work through.
 */
export function buildBatchRequest(ctx: NodeContext, model: string): BatchRequest {
  return {
    custom_id: customIdFor(ctx.nodeId),
    params: {
      model,
      max_tokens: MAX_OUTPUT_TOKENS,
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral", ttl: "1h" } }],
      messages: [{ role: "user", content: buildUserPrompt(ctx) }],
      output_config: { format: { type: "json_schema", schema: CONTENT_JSON_SCHEMA } },
    },
  };
}

export type ResultOutcome = { nodeId: string | null; customId: string } & (
  | { ok: true; content: Extract<ParseResult, { ok: true }>["content"] }
  | { ok: false; errors: string[] }
);

/**
 * Turns one line of the batch results file into validated content or a list
 * of reasons it can't be used. Thinking blocks are skipped; only text counts.
 */
export function interpretResult(line: IndividualResponse): ResultOutcome {
  const base = { customId: line.custom_id, nodeId: nodeIdFrom(line.custom_id) };
  if (!base.nodeId) return { ...base, ok: false, errors: ["custom_id is not a node id"] };

  const result = line.result;
  if (result.type !== "succeeded") {
    const detail = result.type === "errored" ? `: ${result.error?.error?.message ?? "unknown error"}` : "";
    return { ...base, ok: false, errors: [`request ${result.type}${detail}`] };
  }
  const message = result.message;
  if (message.stop_reason === "refusal") return { ...base, ok: false, errors: ["model declined the request"] };
  if (message.stop_reason === "max_tokens") return { ...base, ok: false, errors: ["response was cut off at max_tokens"] };

  const text = message.content
    .filter((b): b is Anthropic.Messages.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
  if (!text.trim()) return { ...base, ok: false, errors: ["response had no text"] };

  const parsed = parseGeneratedContent(text);
  return parsed.ok ? { ...base, ok: true, content: parsed.content } : { ...base, ok: false, errors: parsed.errors };
}
