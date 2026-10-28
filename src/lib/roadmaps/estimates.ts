/**
 * Time estimates for topics, sections and roadmaps (issue #244). Pure.
 *
 * The formula, per node with a written lesson:
 *
 *   reading  = lesson words / 180 words a minute
 *   practice = 15 minutes + practice task words / 180, when there is a task
 *   quiz     = 1 minute a question
 *   estimate = reading + practice + quiz, rounded up to the next 5 minutes
 *
 * 180 words a minute is a careful, study pace for learners reading in a second
 * language on any screen (adult silent reading is around 240). The 15 minutes
 * is the doing: most practice tasks ask for something small to be made and
 * checked. Free resources outside SydCrest are not counted.
 *
 * A node without a lesson has no estimate (null), never a guess. Totals add
 * the known estimates and say how many nodes are missing, so the copy can say
 * "at least" honestly. Always shown as "about".
 */

export const ESTIMATE = {
  wordsPerMinute: 180,
  practiceBaseMinutes: 15,
  minutesPerQuestion: 1,
  roundTo: 5,
} as const;

export type EstimateInputs = {
  hasLesson: boolean;
  lessonWords: number;
  practiceWords: number;
  quizQuestions: number;
};

export function estimateMinutes(input: EstimateInputs | null | undefined): number | null {
  if (!input?.hasLesson) return null;
  const words = (n: number) => Math.max(0, n) / ESTIMATE.wordsPerMinute;
  const reading = words(input.lessonWords);
  const practice = input.practiceWords > 0 ? ESTIMATE.practiceBaseMinutes + words(input.practiceWords) : 0;
  const quiz = Math.max(0, input.quizQuestions) * ESTIMATE.minutesPerQuestion;
  const total = reading + practice + quiz;
  return Math.max(ESTIMATE.roundTo, Math.ceil(total / ESTIMATE.roundTo) * ESTIMATE.roundTo);
}

/** A sum of estimates: the known minutes and how many nodes had none. */
export type Estimate = { minutes: number; missing: number };

export function sumEstimates(values: readonly (number | null)[]): Estimate {
  let minutes = 0;
  let missing = 0;
  for (const v of values) {
    if (v === null) missing += 1;
    else minutes += v;
  }
  return { minutes, missing };
}

/** "about 25 min", "about 1 hour", "about 14 hours". */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `about ${Math.max(1, Math.round(minutes))} min`;
  const hours = Math.round(minutes / 60);
  return `about ${hours} ${hours === 1 ? "hour" : "hours"}`;
}

/** A total for copy, or null when no node has an estimate yet. */
export function formatEstimate(estimate: Estimate): string | null {
  if (estimate.minutes === 0) return null;
  return formatMinutes(estimate.minutes);
}

/** Whole weeks to finish `minutesLeft` at `weeklyMinutes`, at least 1. */
export function weeksLeft(minutesLeft: number, weeklyMinutes: number): number {
  if (minutesLeft <= 0) return 0;
  if (weeklyMinutes <= 0) return Infinity;
  return Math.max(1, Math.ceil(minutesLeft / weeklyMinutes));
}

/**
 * The continue bar's time left: "About 14 hours left, roughly 3 weeks at
 * about 5 hours a week." Without a pace (no path answers) the total only.
 */
export function timeLeftCopy(minutesLeft: number, pace: { minutes: number; label: string } | null): string | null {
  if (minutesLeft <= 0) return null;
  const left = formatMinutes(minutesLeft);
  const sentence = `${left.charAt(0).toUpperCase()}${left.slice(1)} left`;
  if (!pace) return `${sentence}.`;
  const weeks = weeksLeft(minutesLeft, pace.minutes);
  return `${sentence}, roughly ${weeks} ${weeks === 1 ? "week" : "weeks"} at ${pace.label}.`;
}

/**
 * Time bands for the roadmap index filter, by required minutes. Set from the
 * real spread (October 2026: every track is about 9 to 13 hours of SydCrest
 * lessons, practice and quizzes); revisit as tracks grow.
 */
export const TIME_BANDS = [
  { id: "short", label: "Under 10 hours", max: 10 * 60 },
  { id: "medium", label: "10 to 12 hours", max: 12 * 60 },
  { id: "long", label: "12 hours or more", max: Infinity },
] as const;

export type TimeBand = (typeof TIME_BANDS)[number]["id"];

/** Null when the roadmap has no estimate yet (no lessons). */
export function timeBand(minutes: number): TimeBand | null {
  if (minutes <= 0) return null;
  return TIME_BANDS.find((b) => minutes < b.max)?.id ?? "long";
}
