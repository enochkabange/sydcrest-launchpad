/**
 * Honest, rough time estimates for a lesson (issue #255).
 *
 * Note for #244 (modern roadmap experience): this is the small shared util
 * that issue asked lessons to reuse. If #244 lands its own estimate, keep one:
 * the rule here is reading time plus fixed allowances, rounded to 5 minutes.
 *
 * Reading speed is set low on purpose: many learners read in a second
 * language, on a small screen, and stop to try things.
 */

/** Words a minute for careful study reading. */
export const READING_WPM = 180;
/** A practice task, done properly with free tools. */
export const PRACTICE_MINUTES = 20;
/** Each quiz question, including reading the options and the explanation. */
export const QUIZ_MINUTES_PER_QUESTION = 1;

export type EstimateInput = {
  explanation_md?: string | null;
  workedExample_md?: string | null;
  practice_task_md?: string | null;
  /** Number of quiz questions (0 when there is no quiz). */
  quizQuestions?: number;
};

export function countWords(md: string | null | undefined): number {
  if (!md) return 0;
  // Markdown marks are not words; code counts like prose (it is read slowly anyway).
  return md
    .replace(/[#*_`>[\]()|]/g, " ")
    .split(/\s+/)
    .filter((w) => /\w/.test(w)).length;
}

/**
 * Minutes to work through a lesson: reading, a practice allowance when there
 * is a task, and the quiz. Rounded up to the nearest 5, never under 5. Null
 * when there is nothing to estimate (no content yet).
 */
export function estimateLessonMinutes(input: EstimateInput): number | null {
  const words = countWords(input.explanation_md) + countWords(input.workedExample_md);
  const practice = input.practice_task_md?.trim() ? PRACTICE_MINUTES : 0;
  const quiz = (input.quizQuestions ?? 0) * QUIZ_MINUTES_PER_QUESTION;
  if (!words && !practice && !quiz) return null;
  const raw = words / READING_WPM + practice + quiz;
  return Math.max(5, Math.ceil(raw / 5) * 5);
}

/** "about 35 min", "about 1 hr 10 min"; device and locale neutral. */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `about ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `about ${hours} hr${rest ? ` ${rest} min` : ""}`;
}
