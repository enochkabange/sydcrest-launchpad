import { LESSON_FEEDBACK_REASONS, type LessonFeedbackReason } from "@/lib/analytics/events";

/** Plain labels for why a lesson was not clear (#326), in the order learners see them. */
export const REASON_LABELS: Record<LessonFeedbackReason, string> = {
  confusing: "Confusing",
  too_long: "Too long",
  too_short: "Too short",
  missing_example: "Needs an example",
  broken_link: "A link is broken",
};

export const REASONS = LESSON_FEEDBACK_REASONS;

/** A stored reason as the typed value, or null. */
export function reasonOf(value: string | null | undefined): LessonFeedbackReason | null {
  return value && Object.hasOwn(REASON_LABELS, value) ? (value as LessonFeedbackReason) : null;
}

export function reasonLabel(value: string | null | undefined): string | null {
  return value && Object.hasOwn(REASON_LABELS, value) ? REASON_LABELS[value as LessonFeedbackReason] : null;
}
