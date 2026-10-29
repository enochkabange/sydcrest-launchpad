"use server";

import { trackResult } from "@/lib/analytics/track";
import { refresh } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { friendlyDbError } from "@/lib/mentor/progress";

/**
 * Mentor console mutations. Each re-checks the session; the database
 * functions and RLS decide whether this person is staff for that learner
 * (assign_peer_review, defer_learner, cohort_notes). Grading uses the
 * submissions feature's gradeSubmission (src/components/cohort/submission).
 */

export type FormState = {
  ok?: string;
  message?: string;
  errors?: Partial<Record<string, string>>;
  /** Changes on every success so a form can reset its fields. */
  at?: number;
};

export async function assignPeerReview(submissionId: string, _prev: FormState, form: FormData): Promise<FormState> {
  await requireUser();
  const reviewer = String(form.get("reviewer_id") ?? "");
  if (!reviewer) return { errors: { reviewer_id: "Choose a learner to review this work." } };
  const supabase = await createClient();
  const { error } = await supabase.rpc("assign_peer_review", { p_submission_id: submissionId, p_reviewer_id: reviewer });
  await trackResult("peer_review_assigned", error);
  if (error) return { message: friendlyDbError(error, "We could not assign the review. Try again.") };
  refresh();
  return { ok: "Peer review assigned.", at: Date.now() };
}

export async function addNote(memberId: string, _prev: FormState, form: FormData): Promise<FormState> {
  const user = await requireUser();
  const body = String(form.get("body") ?? "").trim();
  if (!body) return { errors: { body: "Write the note first." } };
  if (body.length > 4000) return { errors: { body: "Keep notes under 4000 characters." } };
  const supabase = await createClient();
  const { error } = await supabase.from("cohort_notes").insert({ cohort_member_id: memberId, author_id: user.id, body });
  if (error) return { message: "We could not save the note. Try again." };
  refresh();
  return { ok: "Note saved.", at: Date.now() };
}

export async function deleteNote(noteId: string) {
  await requireUser();
  const supabase = await createClient();
  // RLS lets authors and admins delete; anything else deletes nothing.
  await supabase.from("cohort_notes").delete().eq("id", noteId);
  refresh();
}

/**
 * Defers a learner (to a later cohort, or to wait for one) and records the
 * reason as a private staff note on their membership. defer_learner takes no
 * reason, and notes are the staff only record, so the note is written only
 * after the deferral succeeds.
 */
export async function deferLearner(memberId: string, _prev: FormState, form: FormData): Promise<FormState> {
  const user = await requireUser();
  const reason = String(form.get("reason") ?? "").trim();
  const target = String(form.get("to_cohort_id") ?? "");
  if (!reason) return { errors: { reason: "Say why, so the next mentor has the context." } };
  if (reason.length > 3800) return { errors: { reason: "Keep the reason under 3800 characters." } };
  const supabase = await createClient();
  const { error } = await supabase.rpc("defer_learner", {
    p_cohort_member_id: memberId,
    p_to_cohort_id: target || undefined,
  });
  await trackResult("learner_deferred", error);
  if (error) return { message: friendlyDbError(error, "We could not defer this learner. Try again.") };
  const { error: noteError } = await supabase
    .from("cohort_notes")
    .insert({ cohort_member_id: memberId, author_id: user.id, body: `Deferred. ${reason}` });
  refresh();
  if (noteError) return { ok: "Deferred, but the reason was not saved. Add it as a note.", at: Date.now() };
  return { ok: target ? "Deferred and moved to the new cohort." : "Deferred. Place them in a later cohort when one opens.", at: Date.now() };
}
