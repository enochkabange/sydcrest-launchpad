import type Anthropic from "@anthropic-ai/sdk";
import { MAX_HISTORY_MESSAGES, MAX_MESSAGE_CHARS } from "./config";

/** A chat turn as the client sends it and the panel renders it. */
export type ChatMessage = { role: "user" | "assistant"; content: string };

export type StudyBuddyRequest = {
  nodeId: string;
  messages: Anthropic.MessageParam[];
  latestUserMessage: string;
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Validates POST {nodeId, messages}. Keeps only the last MAX_HISTORY_MESSAGES
 * turns, drops empty ones, merges any consecutive same role turns (the API
 * needs alternation) and requires the conversation to end with the learner.
 */
export function parseStudyBuddyRequest(
  body: unknown,
): { ok: true; data: StudyBuddyRequest } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Send a JSON body." };
  const { nodeId, messages } = body as { nodeId?: unknown; messages?: unknown };

  if (typeof nodeId !== "string" || !UUID.test(nodeId)) return { ok: false, error: "nodeId must be a topic id." };
  if (!Array.isArray(messages) || messages.length === 0) return { ok: false, error: "Send at least one message." };

  const cleaned: ChatMessage[] = [];
  for (const m of messages) {
    if (!m || typeof m !== "object") return { ok: false, error: "Each message needs a role and content." };
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      return { ok: false, error: "Each message needs a role and content." };
    }
    if (content.length > MAX_MESSAGE_CHARS) {
      return { ok: false, error: `Messages can be up to ${MAX_MESSAGE_CHARS} characters.` };
    }
    const text = content.trim();
    if (!text) continue;
    const last = cleaned.at(-1);
    if (last && last.role === role) last.content = `${last.content}\n\n${text}`;
    else cleaned.push({ role, content: text });
  }

  let recent = cleaned.slice(-MAX_HISTORY_MESSAGES);
  // The API expects the first turn to be the learner's.
  while (recent.length > 0 && recent[0].role !== "user") recent = recent.slice(1);

  const latest = recent.at(-1);
  if (!latest || latest.role !== "user") return { ok: false, error: "The last message must be yours." };

  return {
    ok: true,
    data: {
      nodeId,
      messages: recent.map(({ role, content }) => ({ role, content })),
      latestUserMessage: latest.content,
    },
  };
}
