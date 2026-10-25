import { MODELS, type ModelTier, type StudyBuddyModel } from "./config";

/**
 * Cheap, deterministic routing. Runs on every turn before any API call, so it
 * must be plain string checks, never another model call. Anything that looks
 * like it needs reasoning goes to the stronger model; everything else stays on
 * the cheap one.
 */

export type RouteReason = "routine" | "long" | "intent" | "code";

export type RouteDecision = {
  tier: ModelTier;
  model: StudyBuddyModel;
  reason: RouteReason;
};

/** A message longer than this is usually a pasted problem or a long question. */
export const LONG_MESSAGE_CHARS = 600;

const REASONING_INTENT = [
  /\bexplain\s+(?:to\s+me\s+)?why\b/i,
  /\bwhy\s+(?:does|do|is|are|did|would|should|can't|cannot|won't|doesn't|isn't)\b/i,
  /\bcompare\b/i,
  /\bcomparison\b/i,
  /\bdifference\s+between\b/i,
  /\b(?:pros\s+and\s+cons|trade\s*offs?)\b/i,
  /\bwhich\s+is\s+better\b/i,
  /\bdebug(?:ging)?\b/i,
  /\b(?:error|exception|traceback|stack\s*trace|bug)\b/i,
  /\bnot\s+working\b/i,
  /\bdoesn'?t\s+work\b/i,
  /\bstep\s+by\s+step\b/i,
  /\bprove\b/i,
];

const CODE_SIGNALS = [
  /```/,
  /^\s{4,}\S/m,
  /\b(?:function|const|let|var|return|import|def|class|lambda)\b[^.\n]*[({=:]/,
  /=>/,
  /\b(?:SELECT|INSERT|UPDATE|DELETE)\b[\s\S]*\b(?:FROM|INTO|SET|WHERE)\b/i,
  /<\/?[a-z][a-z0-9-]*[\s>]/i,
  /[{};]\s*$/m,
  /\b\w+\([^)]*\)\s*[;{]?\s*$/m,
];

export function looksLikeCode(text: string): boolean {
  return CODE_SIGNALS.some((pattern) => pattern.test(text));
}

export function hasReasoningIntent(text: string): boolean {
  return REASONING_INTENT.some((pattern) => pattern.test(text));
}

function decision(tier: ModelTier, reason: RouteReason): RouteDecision {
  return { tier, model: MODELS[tier], reason };
}

/** Decide which model answers, from the learner's latest message. */
export function routeMessage(latestUserMessage: string): RouteDecision {
  const text = latestUserMessage.trim();
  if (looksLikeCode(text)) return decision("reasoning", "code");
  if (hasReasoningIntent(text)) return decision("reasoning", "intent");
  if (text.length > LONG_MESSAGE_CHARS) return decision("reasoning", "long");
  return decision("routine", "routine");
}
