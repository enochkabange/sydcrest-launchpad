import type { AiFeedback } from "./feedback";

/**
 * What a learner can do with their work at each status, mirroring
 * save_submission: drafts and returned work can be saved or sent; sent work
 * can only be sent again (a new attempt); graded work is final until a
 * mentor returns it.
 */
export type SubmissionStatus = "draft" | "submitted" | "ai_reviewed" | "returned" | "graded";

export function canSaveDraft(status: SubmissionStatus | null): boolean {
  return status === null || status === "draft" || status === "returned";
}

export function canSubmit(status: SubmissionStatus | null): boolean {
  return status !== "graded";
}

export function isSent(status: SubmissionStatus | null): boolean {
  return status === "submitted" || status === "ai_reviewed" || status === "graded";
}

export const STATUS_LABEL: Record<SubmissionStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  ai_reviewed: "AI feedback ready",
  returned: "Returned for changes",
  graded: "Graded",
};

/** Tone for the status badge: neutral, waiting, action needed or done. */
export const STATUS_TONE: Record<SubmissionStatus, "neutral" | "info" | "warning" | "success"> = {
  draft: "neutral",
  submitted: "info",
  ai_reviewed: "info",
  returned: "warning",
  graded: "success",
};

/** Postgres error codes from the submission functions, in words for people. */
export function friendlyError(code: string | undefined, fallback: string): string {
  switch (code) {
    case "42501":
      return "You can't do that with this work. If you think you should, ask your mentor or coordinator.";
    case "22023":
      return "That didn't go through. Check the details and try again.";
    case "P0002":
      return "We couldn't find that work. Refresh the page and try again.";
    case "23514":
      return "Some of that doesn't fit. Check the length of your text and link.";
    default:
      return fallback;
  }
}

export function formatScore(score: number | null | undefined): string {
  return typeof score === "number" ? `${score} out of 100` : "Not scored yet";
}

/**
 * Where the AI review stands for one attempt. "resting" when the service is
 * not set up here (no key), "pending" while the background review runs,
 * "unavailable" when it never arrived (the job failed), "mentor_only" for a link or file without written text (the AI reads text
 * only), "ready" once record_ai_review has stored it.
 */
export type AiReviewState = "none" | "resting" | "pending" | "unavailable" | "mentor_only" | "ready";

/** A review still missing this long after sending has failed; stop promising it. */
export const REVIEW_GIVE_UP_MS = 15 * 60 * 1000;

export function aiReviewState(opts: {
  status: SubmissionStatus | null;
  hasText: boolean;
  feedback: AiFeedback | null;
  configured: boolean;
  submittedAt?: string | null;
  now?: number;
}): AiReviewState {
  if (opts.feedback) return "ready";
  if (opts.status !== "submitted") return "none";
  if (!opts.hasText) return "mentor_only";
  if (!opts.configured) return "resting";
  const sent = opts.submittedAt ? Date.parse(opts.submittedAt) : NaN;
  if (Number.isFinite(sent) && (opts.now ?? Date.now()) - sent > REVIEW_GIVE_UP_MS) return "unavailable";
  return "pending";
}

