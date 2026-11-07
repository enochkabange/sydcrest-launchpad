"use server";

import { trackRefusal, trackResult } from "@/lib/analytics/track";
import { refresh } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { accraDay, weekStart } from "./dates";
import {
  parseGoalTarget,
  parseReviewAnswers,
  parseReviewRefs,
  parseReviewResults,
  type GoalState,
  type ReviewState,
} from "./review-data";

/**
 * Writes for the learning loop. Each action re-checks the session. The goal
 * is the learner's own row for the current Africa/Accra week (RLS pins both);
 * a review is graded by submit_review in the database, which takes identity
 * from auth.uid() and accepts only questions from quizzes the learner passed.
 */

export async function setWeeklyGoal(_prev: GoalState, form: FormData): Promise<GoalState> {
  const user = await requireUser();
  const target = parseGoalTarget(form.get("target"));
  if (!target) return { message: "Choose 1, 3 or 5 topics a week." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("weekly_goals")
    .upsert(
      { profile_id: user.id, week_start: weekStart(accraDay(new Date())), topics_target: target },
      { onConflict: "profile_id,week_start" },
    );
  await trackResult("weekly_goal_set", error, { goal: target });
  if (error) return { message: "We couldn't save your goal. Try again." };
  refresh();
  return { saved: target };
}

export async function submitReview(_prev: ReviewState, form: FormData): Promise<ReviewState> {
  await requireUser();
  const refs = parseReviewRefs(form.get("items"));
  if (!refs) return { message: "This review could not be read. Start a new one." };
  const answers = parseReviewAnswers(form, refs);
  if (!answers) {
    await trackRefusal("review_completed", "validation", "unanswered");
    return { message: "Choose an answer for every question, then check again." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("submit_review", { p_answers: answers }).single();
  await trackResult("review_completed", error ?? (data ? null : { code: "P0002" }), {
    items: data?.question_count,
    correct: data?.correct_count,
  });
  if (error || !data) {
    if (error?.code === "22023" || error?.code === "42501" || error?.code === "P0002") {
      return { message: "Your topics changed since this review started. Start a new one." };
    }
    return { message: "We couldn't check your answers. Try again." };
  }
  // No refresh(): the form keeps showing the questions it asked; home reads fresh on the next visit.
  return {
    outcome: { correct: data.correct_count, total: data.question_count, results: parseReviewResults(data.results) },
  };
}
