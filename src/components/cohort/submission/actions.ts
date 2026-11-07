"use server";

import { trackRefusal, trackResult } from "@/lib/analytics/track";
import { refresh } from "next/cache";
import { after } from "next/server";
import { requireUser } from "@/lib/auth";
import { createAdminDb } from "@/lib/content-generation/db";
import { createClient } from "@/lib/supabase/server";
import { parseGradeForm, parseSubmissionForm, type SubmissionFields } from "@/lib/submissions/parse";
import { createReviewClient, needsAiReview, reviewSubmission, type SubmissionToReview } from "@/lib/submissions/server";
import { friendlyError } from "@/lib/submissions/status";

export type SubmissionFormState = {
  errors?: Partial<Record<SubmissionFields, string>>;
  message?: string;
  saved?: { status: string; at: number };
};

/**
 * The learner saves a draft or sends their work for a week. Everything goes
 * through save_submission (identity, membership, specialization and status
 * rules live there). When work is sent, the AI rubric review runs after the
 * response, so the learner never waits for the model.
 */
export async function saveSubmission(_prev: SubmissionFormState, form: FormData): Promise<SubmissionFormState> {
  const user = await requireUser();
  const parsed = parseSubmissionForm(form, user.id);
  if (!parsed.ok) {
    await trackRefusal("submission_saved", "validation");
    return { errors: parsed.errors };
  }
  const { weekId, bodyText, linkUrl, filePath, submit } = parsed.data;

  const supabase = await createClient();
  const { data: row, error } = await supabase.rpc("save_submission", {
      p_program_week_id: weekId,
      p_body_text: bodyText ?? undefined,
      p_link_url: linkUrl ?? undefined,
      p_file_path: filePath ?? undefined,
      p_submit: submit,
    });
  await trackResult("submission_saved", error ?? (row ? null : { code: "P0002" }), { sent: submit });
  if (error || !row) {
    return { message: friendlyError(error?.code, "We couldn't save your work. Try again in a moment.") };
  }

  if (submit) {
    const toReview: SubmissionToReview = {
      id: row.id,
      attempt: row.attempt,
      programWeekId: row.program_week_id,
      bodyText: row.body_text,
      linkUrl: row.link_url,
      filePath: row.file_path,
    };
    if (needsAiReview(toReview)) after(() => runReview(toReview));
  }

  refresh();
  return { saved: { status: row.status, at: Date.now() } };
}

/** The background job. A no op without the keys: the work simply waits for the mentor. */
async function runReview(sub: SubmissionToReview) {
  const client = createReviewClient();
  const db = createAdminDb();
  if (!client || !db) return;
  const outcome = await reviewSubmission({ db, client }, sub);
  if (outcome.status === "failed") console.error("AI review failed", { submission_id: sub.id, ...outcome });
}

export type PortfolioState = { message?: string; inPortfolio?: boolean };

/** Graded work only (the table enforces it); the one column a learner updates directly. */
export async function setInPortfolio(_prev: PortfolioState, form: FormData): Promise<PortfolioState> {
  const user = await requireUser();
  const id = form.get("submission_id");
  const value = form.get("in_portfolio") === "true";
  if (typeof id !== "string" || !id) return { message: "Refresh the page and try again." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("submissions")
    .update({ in_portfolio: value })
    .eq("id", id)
    .eq("profile_id", user.id)
    .select("in_portfolio")
    .maybeSingle();
  if (error || !data) {
    return {
      message:
        error?.code === "23514"
          ? "Only graded work can go in your portfolio."
          : "We couldn't update your portfolio. Try again.",
    };
  }
  refresh();
  return { inPortfolio: data.in_portfolio };
}

export type GradeFormState = {
  errors?: Partial<Record<"final_score" | "mentor_feedback" | "form", string>>;
  message?: string;
  saved?: { status: string; at: number };
};

/**
 * A mentor, coordinator or admin grades sent work, or returns it for
 * changes. grade_submission decides who may; the score never comes from the
 * learner's side.
 */
export async function gradeSubmission(_prev: GradeFormState, form: FormData): Promise<GradeFormState> {
  await requireUser();
  const parsed = parseGradeForm(form);
  if (!parsed.ok) {
    await trackRefusal("submission_graded", "validation");
    return { errors: parsed.errors };
  }
  const { submissionId, finalScore, feedback, returnWork } = parsed.data;

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("grade_submission", {
      p_submission_id: submissionId,
      // Ignored when returning; the function needs a value for the argument.
      p_final_score: finalScore ?? 0,
      p_mentor_feedback: feedback ?? undefined,
      p_return: returnWork,
    });
  await trackResult("submission_graded", error ?? (data ? null : { code: "P0002" }), { passed: !returnWork });
  if (error || !data) return { message: friendlyError(error?.code, "We couldn't save the grade. Try again.") };
  refresh();
  return { saved: { status: data.status, at: Date.now() } };
}
