/**
 * Study Buddy knobs in one place. Changing the daily allowance or a model is
 * a one line edit here; nothing else hard codes these values.
 */

/** Messages each learner may send per day (Africa/Accra calendar day). */
export const DAILY_MESSAGE_LIMIT = 30;

export const MODELS = {
  /** Routine turns: definitions, quick checks, encouragement. */
  routine: "claude-haiku-5-5",
  /** Reasoning heavy turns: why questions, comparisons, debugging, code. */
  reasoning: "claude-sonnet-5-5",
} as const;

export type ModelTier = keyof typeof MODELS;
export type StudyBuddyModel = (typeof MODELS)[ModelTier];

/**
 * Hard ceiling on each reply. Adaptive thinking counts toward this, so it is
 * the real cost cap per turn, not just the visible answer length.
 */
export const MAX_TOKENS: Record<ModelTier, number> = {
  routine: 1024,
  reasoning: 2048,
};

/** Effort per tier. Chat does well at low; harder turns get a little more. */
export const EFFORT: Record<ModelTier, "low" | "medium"> = {
  routine: "low",
  reasoning: "medium",
};

/** Only the most recent turns are sent, so long chats do not grow in cost. */
export const MAX_HISTORY_MESSAGES = 12;

/** Longest single message a learner may send. */
export const MAX_MESSAGE_CHARS = 4000;

/** Longest node explanation passed as context (characters). */
export const MAX_CONTEXT_CHARS = 24000;

/**
 * Tool rounds per turn (each is one more model call). After this many the
 * model must answer with what it has, so one message never fans out into an
 * unbounded number of billed calls.
 */
export const MAX_TOOL_ROUNDS = 3;
