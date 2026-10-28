import type { GeneratedQuestion } from "./schema";

/**
 * Quiz balance checks (issue #214). If the correct option is usually the
 * longest one, or usually sits in the same position, learners can pass a quiz
 * without reading the lesson. A track fails when either share goes above
 * QUIZ_BALANCE_MAX.
 */
export const QUIZ_BALANCE_MAX = 0.4;

export type QuizBalance = {
  questions: number;
  /** Share of questions where the correct option is strictly longer than every other option. */
  longestShare: number;
  /** Share of questions where the correct option is strictly shorter than every other option. */
  shortestShare: number;
  /** Count of correct answers at each position (index 0 to 3). */
  positions: number[];
  /** Largest share of correct answers held by a single position. */
  maxPositionShare: number;
};

const len = (s: string) => s.trim().length;

export function isCorrectStrictlyLongest(q: GeneratedQuestion): boolean {
  const target = len(q.options[q.answer_index]);
  return q.options.every((o, i) => i === q.answer_index || len(o) < target);
}

export function isCorrectStrictlyShortest(q: GeneratedQuestion): boolean {
  const target = len(q.options[q.answer_index]);
  return q.options.every((o, i) => i === q.answer_index || len(o) > target);
}

export function quizBalance(questions: GeneratedQuestion[]): QuizBalance {
  const n = questions.length;
  const positions = [0, 0, 0, 0];
  let longest = 0;
  let shortest = 0;
  for (const q of questions) {
    positions[q.answer_index] = (positions[q.answer_index] ?? 0) + 1;
    if (isCorrectStrictlyLongest(q)) longest += 1;
    if (isCorrectStrictlyShortest(q)) shortest += 1;
  }
  const share = (x: number) => (n === 0 ? 0 : x / n);
  return {
    questions: n,
    longestShare: share(longest),
    shortestShare: share(shortest),
    positions,
    maxPositionShare: share(Math.max(...positions)),
  };
}
