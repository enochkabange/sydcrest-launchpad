import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { parseQuestions } from "@/components/learn/quiz-data";
import { accraDay, addDays, type Day } from "./dates";
import { dailyStreak, weeklyProgress, type DailyStreak, type WeeklyProgress } from "./streak";
import { selectReviewQuestions, type ReviewCandidate, type ReviewItem } from "./review-select";

/**
 * Reads for the learning loop (issue #232). Request time: callers sit inside
 * <Suspense>. RLS returns only the learner's own rows; the answer keys are
 * never read here (node_quiz holds questions only).
 */

export type LearningLoop = {
  today: Day;
  daily: DailyStreak;
  weekly: WeeklyProgress;
  reviewedToday: boolean;
  /** Questions available to review, from quizzes the learner has passed. */
  reviewQuestions: number;
};

// Far enough back for any kind streak (two rest days a week) people will reach soon.
const ACTIVITY_WINDOW_DAYS = 400;

export const getLearningLoop = cache(async (userId: string): Promise<LearningLoop> => {
  const supabase = await createClient();
  const today = accraDay(new Date());
  const since = `${addDays(today, -ACTIVITY_WINDOW_DAYS)}T00:00:00Z`;

  const [{ data: passed }, { data: reviews }, { data: goals }] = await Promise.all([
    supabase.from("roadmap_progress").select("node_id, verified_at").eq("profile_id", userId).not("verified_at", "is", null),
    supabase.from("review_sessions").select("completed_at").eq("profile_id", userId).gte("completed_at", since),
    supabase.from("weekly_goals").select("week_start, topics_target").eq("profile_id", userId),
  ]);

  const passedRows = (passed ?? []).filter((p): p is { node_id: string; verified_at: string } => !!p.verified_at);
  const passedDays = passedRows.map((p) => accraDay(p.verified_at));
  const reviewDays = (reviews ?? []).map((r) => accraDay(r.completed_at));

  let reviewQuestions = 0;
  if (passedRows.length) {
    const { data: quizzes } = await supabase
      .from("node_quiz")
      .select("questions")
      .in(
        "node_id",
        passedRows.map((p) => p.node_id),
      );
    reviewQuestions = (quizzes ?? []).reduce((n, q) => n + parseQuestions(q.questions).length, 0);
  }

  return {
    today,
    daily: dailyStreak([...passedDays, ...reviewDays], today),
    weekly: weeklyProgress(
      (goals ?? []).map((g) => ({ weekStart: g.week_start, target: g.topics_target })),
      passedDays,
      today,
    ),
    reviewedToday: reviewDays.includes(today),
    reviewQuestions,
  };
});

/** Up to five questions for a review, chosen by spacing (see review-select.ts). */
export async function getReviewItems(userId: string): Promise<ReviewItem[]> {
  const supabase = await createClient();
  const { data: passed } = await supabase
    .from("roadmap_progress")
    .select("node_id, verified_at, roadmap_nodes(slug, title, roadmaps(slug))")
    .eq("profile_id", userId)
    .not("verified_at", "is", null);
  const rows = passed ?? [];
  if (!rows.length) return [];

  const nodeIds = rows.map((r) => r.node_id);
  const [{ data: quizzes }, { data: history }] = await Promise.all([
    supabase.from("node_quiz").select("node_id, questions").in("node_id", nodeIds),
    supabase
      .from("review_answers")
      .select("node_id, question_id, correct, answered_at")
      .eq("profile_id", userId)
      .order("answered_at", { ascending: false })
      .limit(2000),
  ]);

  const candidates: ReviewCandidate[] = rows.flatMap((r) => {
    const node = r.roadmap_nodes;
    const roadmapSlug = node?.roadmaps?.slug;
    const quiz = quizzes?.find((q) => q.node_id === r.node_id);
    if (!node || !roadmapSlug || !quiz || !r.verified_at) return [];
    const passedAt = r.verified_at;
    return parseQuestions(quiz.questions).map((question) => ({
      nodeId: r.node_id,
      nodeTitle: node.title,
      nodeSlug: node.slug,
      roadmapSlug,
      passedAt,
      question,
    }));
  });

  return selectReviewQuestions(
    candidates,
    (history ?? []).map((h) => ({
      nodeId: h.node_id,
      questionId: h.question_id,
      correct: h.correct,
      answeredAt: h.answered_at,
    })),
    new Date(),
  );
}
