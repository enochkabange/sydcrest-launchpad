"use server";

import { trackRefusal, trackResult } from "@/lib/analytics/track";
import { refresh } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { friendlyDbError, parseCriteria, parseReviewForm, rubricForWeek } from "@/lib/mentor/progress";

export type ReviewState = {
  ok?: string;
  message?: string;
  errors?: Partial<Record<string, string>>;
  at?: number;
};

/**
 * Sends (or resends) a capstone peer review. The rubric is read again here,
 * never taken from the form, and submit_peer_review checks it once more.
 */
export async function submitPeerReview(reviewId: string, _prev: ReviewState, form: FormData): Promise<ReviewState> {
  await requireUser();
  const supabase = await createClient();
  const { data: row } = await supabase
    .from("peer_review_submissions")
    .select("review_id, program_id, program_week_id")
    .eq("review_id", reviewId)
    .maybeSingle();
  if (!row?.program_id || !row.program_week_id) return { message: "We could not find this review. Reload the page and try again." };

  const { data: rubrics } = await supabase.from("rubrics").select("program_week_id, criteria").eq("program_id", row.program_id);
  const criteria = parseCriteria(rubricForWeek(rubrics ?? [], row.program_week_id)?.criteria);
  const { data, errors } = parseReviewForm(form, criteria);
  if (Object.keys(errors).length) {
    await trackRefusal("peer_review_submitted", "validation");
    return { errors };
  }

  const { error } = await supabase.rpc("submit_peer_review", {
    p_review_id: reviewId,
    p_rubric_scores: data.scores,
    p_comment: data.comment,
  });
  await trackResult("peer_review_submitted", error);
  if (error) return { message: friendlyDbError(error, "We could not send your review. Try again.") };
  refresh();
  return { ok: "Review sent. Thank you. You can update it at any time.", at: Date.now() };
}
