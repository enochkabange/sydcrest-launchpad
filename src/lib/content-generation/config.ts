/**
 * Settings for pre generating node content with the Message Batches API.
 * Content is generated once per node and served from the database, so the
 * stronger model is worth it here. Override with CONTENT_MODEL or --model.
 */
export const DEFAULT_CONTENT_MODEL = "claude-sonnet-5-5";

/** Room for adaptive thinking plus the JSON answer; well under the cap. */
export const MAX_OUTPUT_TOKENS = 16_000;

/** Quiz shape the platform expects. */
export const QUIZ_MIN_QUESTIONS = 3;
export const QUIZ_MAX_QUESTIONS = 5;
export const QUIZ_OPTIONS = 4;
export const PASS_THRESHOLD_MIN = 50;
export const PASS_THRESHOLD_MAX = 100;

export function contentModel(override?: string | null): string {
  return override?.trim() || process.env.CONTENT_MODEL?.trim() || DEFAULT_CONTENT_MODEL;
}
