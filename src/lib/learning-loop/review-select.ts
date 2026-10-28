import type { QuizQuestion } from "@/components/learn/quiz-data";

/**
 * Which questions a 5 minute review asks (issue #232). Only questions from
 * quizzes the learner has passed are candidates; submit_review checks that
 * again in the database. Spacing is a small Leitner scheme:
 *
 * - Each question has a box: the number of times in a row it was answered
 *   right in reviews (0 when never reviewed or last answered wrong).
 * - The box sets how long the question can rest: 1, 3, 7, 14 then 30 days.
 * - A question is as due as the share of its rest it has used: days since it
 *   was last seen (the quiz pass or the last review) divided by its rest.
 * - Most due first; ties go to more past mistakes, then the longest unseen.
 * - At most two questions per topic while other topics have questions left,
 *   so a review covers more ground.
 *
 * Deterministic for a given input, so it is easy to test.
 */

export const REVIEW_SIZE = 5;
const REST_DAYS = [1, 3, 7, 14, 30];
const PER_TOPIC = 2;

export type ReviewCandidate = {
  nodeId: string;
  nodeTitle: string;
  roadmapSlug: string;
  nodeSlug: string;
  /** When the learner first passed this topic's quiz (verified_at). */
  passedAt: string;
  question: QuizQuestion;
};

export type ReviewHistory = { nodeId: string; questionId: string; correct: boolean; answeredAt: string };

export type ReviewItem = ReviewCandidate & { mistakes: number };

export const itemKey = (nodeId: string, questionId: string) => `${nodeId}:${questionId}`;

const DAY_MS = 86_400_000;

export function selectReviewQuestions(
  candidates: ReviewCandidate[],
  history: ReviewHistory[],
  now: Date,
  size = REVIEW_SIZE,
): ReviewItem[] {
  const byKey = new Map<string, ReviewHistory[]>();
  for (const h of history) {
    const key = itemKey(h.nodeId, h.questionId);
    const list = byKey.get(key) ?? [];
    list.push(h);
    byKey.set(key, list);
  }

  const scored = candidates.map((c) => {
    const key = itemKey(c.nodeId, c.question.id);
    const answers = (byKey.get(key) ?? []).sort((a, b) => b.answeredAt.localeCompare(a.answeredAt));
    let box = 0;
    for (const a of answers) {
      if (!a.correct) break;
      box += 1;
    }
    const mistakes = answers.filter((a) => !a.correct).length;
    const lastSeen = answers[0]?.answeredAt ?? c.passedAt;
    const age = Math.max(0, (now.getTime() - new Date(lastSeen).getTime()) / DAY_MS);
    const due = age / REST_DAYS[Math.min(box, REST_DAYS.length - 1)];
    return { item: { ...c, mistakes }, key, due, lastSeen };
  });

  scored.sort(
    (a, b) =>
      b.due - a.due ||
      b.item.mistakes - a.item.mistakes ||
      a.lastSeen.localeCompare(b.lastSeen) ||
      a.key.localeCompare(b.key),
  );

  const picked: typeof scored = [];
  const perTopic = new Map<string, number>();
  for (const s of scored) {
    if (picked.length >= size) break;
    const n = perTopic.get(s.item.nodeId) ?? 0;
    if (n >= PER_TOPIC) continue;
    picked.push(s);
    perTopic.set(s.item.nodeId, n + 1);
  }
  // Fewer topics than the cap allows: fill up with the next most due.
  for (const s of scored) {
    if (picked.length >= size) break;
    if (!picked.includes(s)) picked.push(s);
  }
  return picked.map((s) => s.item);
}
