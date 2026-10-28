"use server";

import { track, trackRefusal, trackResult } from "@/lib/analytics/track";
import { classifyError, errorCode } from "@/lib/analytics/refusal";
import { refresh } from "next/cache";
import { parseAnswers, parseQuestions } from "@/components/learn/quiz-data";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { parsePortfolioForm, retryOpensAt } from "@/lib/skills/assessment";
import { skillErrorMessage } from "@/lib/skills/errors";

/**
 * Learner and reviewer writes for verified skills (issue #165). Every action
 * re-checks the session and goes through the database functions, which take
 * identity from auth.uid(), grade against the hidden key, enforce the retry
 * wait and are the only way a verified skill is issued. Nothing here writes
 * a privileged column.
 */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Quiz ------------------------------------------------------------------------------------------

export type SkillQuizState = {
  outcome?: { score: number; passed: boolean; verified: boolean; retryAt: string | null };
  message?: string;
  at?: number;
};

export async function submitSkillQuiz(assessmentId: string, _prev: SkillQuizState, form: FormData): Promise<SkillQuizState> {
  await requireUser();
  if (!UUID.test(assessmentId)) return { message: "This assessment is not open right now." };
  const supabase = await createClient();

  // Questions come from the database, never the form, so the answers object has exactly their ids.
  const { data: assessment } = await supabase
    .from("skill_assessments")
    .select("questions, retry_after_hours")
    .eq("id", assessmentId)
    .eq("kind", "quiz")
    .maybeSingle();
  const questions = parseQuestions(assessment?.questions);
  if (!assessment || questions.length === 0) return { message: "This assessment is not open right now." };

  const answers = parseAnswers(form, questions);
  if (!answers) {
    await trackRefusal("skill_quiz_submitted", "validation", "unanswered");
    return { message: "Answer every question before you submit." };
  }

  const { data, error } = await supabase.rpc("submit_skill_quiz", { p_assessment_id: assessmentId, p_answers: answers });
  if (error) {
    await trackRefusal("skill_quiz_submitted", classifyError(error), errorCode(error));
    return { message: skillErrorMessage(error), at: Date.now() };
  }
  const row = Array.isArray(data) ? data[0] : data;
  if (!row) return { message: skillErrorMessage(null), at: Date.now() };
  await track("skill_quiz_submitted", { passed: row.passed, score: row.score });

  const now = new Date().toISOString();
  return {
    outcome: {
      score: row.score,
      passed: row.passed,
      verified: Boolean(row.verified_skill_id) || row.passed,
      retryAt:
        row.passed || assessment.retry_after_hours <= 0
          ? null
          : retryOpensAt({ submitted_at: now, reviewed_at: null }, assessment.retry_after_hours).toISOString(),
    },
    at: Date.now(),
  };
}

// Portfolio -------------------------------------------------------------------------------------

export type PortfolioState = {
  errors?: { portfolio_url?: string; note?: string };
  message?: string;
  sent?: number;
};

export async function submitSkillPortfolio(assessmentId: string, _prev: PortfolioState, form: FormData): Promise<PortfolioState> {
  await requireUser();
  if (!UUID.test(assessmentId)) return { message: "This assessment is not open right now." };
  const { data, errors } = parsePortfolioForm(form);
  if (Object.keys(errors).length) {
    await trackRefusal("skill_portfolio_submitted", "validation");
    return { errors };
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("submit_skill_portfolio", {
    p_assessment_id: assessmentId,
    p_portfolio_url: data.url,
    p_note: data.note ?? undefined,
  });
  await trackResult("skill_portfolio_submitted", error);
  if (error) return { message: skillErrorMessage(error) };
  refresh();
  return { sent: Date.now() };
}

// Review (mentors and admins) -------------------------------------------------------------------

export type ReviewState = { message?: string; done?: "approved" | "rejected"; errors?: { note?: string } };

export async function reviewPortfolio(attemptId: string, _prev: ReviewState, form: FormData): Promise<ReviewState> {
  await requireUser();
  if (!UUID.test(attemptId)) return { message: "That submission no longer exists." };
  const approve = form.get("decision") === "approve";
  const note = String(form.get("note") ?? "").trim();
  if (!approve && !note) return { errors: { note: "Say what to improve before you send the work back." } };
  if (note.length > 2000) return { errors: { note: "Keep the note to 2000 characters." } };

  const supabase = await createClient();
  const { error } = await supabase.rpc("review_skill_portfolio", {
    p_attempt_id: attemptId,
    p_approve: approve,
    p_note: note || undefined,
  });
  await trackResult("skill_portfolio_reviewed", error, { decision: approve ? "approved" : "changes_requested" });
  if (error) return { message: skillErrorMessage(error) };
  refresh();
  return { done: approve ? "approved" : "rejected" };
}

// Claim from completed paths --------------------------------------------------------------------

export type ClaimState = { claimed?: number; message?: string; at?: number };

export async function claimPathSkills(): Promise<ClaimState> {
  await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("claim_path_skills");
  await trackResult("path_skills_claimed", error, { claimed: data ?? 0 });
  if (error) return { message: skillErrorMessage(error), at: Date.now() };
  if (data) refresh();
  return { claimed: data ?? 0, at: Date.now() };
}
