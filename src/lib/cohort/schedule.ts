/**
 * Pure cohort rules from the Phase 2 schema contract (docs/data-model.md,
 * "Learning rules"): week dates, the learner's path and progress. No I/O, so
 * every rule is unit tested. Dates are calendar days ("YYYY-MM-DD"); the
 * maths runs on whole UTC days so no time zone can shift a due date.
 */

const DAY_MS = 86_400_000;

/** Days since the epoch for a "YYYY-MM-DD" string (or the leading date of an ISO timestamp). */
export function dayNumber(date: string): number {
  const [y, m, d] = date.slice(0, 10).split("-").map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / DAY_MS);
}

/** "YYYY-MM-DD" for a day number. */
export function fromDayNumber(day: number): string {
  return new Date(day * DAY_MS).toISOString().slice(0, 10);
}

export function addDays(date: string, days: number): string {
  return fromDayNumber(dayNumber(date) + days);
}

/** Today in Ghana (GMT, no daylight saving), as "YYYY-MM-DD". */
export function todayInGhana(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

/** "Mon 3 Nov 2026": readable, unambiguous, no dashes. */
export function formatDay(date: string): string {
  return new Date(dayNumber(date) * DAY_MS).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Week n is due `starts_on + 7n` days. */
export function dueDate(startsOn: string, week: number): string {
  return addDays(startsOn, 7 * week);
}

/** Work sent after this day is late: the due date plus the programme's grace days. */
export function lateAfter(startsOn: string, week: number, graceDays: number): string {
  return addDays(dueDate(startsOn, week), graceDays);
}

/** The first day of week n. */
export function weekStarts(startsOn: string, week: number): string {
  return addDays(startsOn, 7 * (week - 1));
}

export type CohortTiming =
  | { phase: "upcoming"; daysToStart: number }
  | { phase: "running"; week: number }
  | { phase: "finished" };

/** Where the cohort is on `today`: not started, in week n (1 based) or past its last week. */
export function cohortTiming(startsOn: string, durationWeeks: number, today: string): CohortTiming {
  const days = dayNumber(today) - dayNumber(startsOn);
  if (days < 0) return { phase: "upcoming", daysToStart: -days };
  const week = Math.floor(days / 7) + 1;
  if (week > durationWeeks) return { phase: "finished" };
  return { phase: "running", week };
}

/** The week to put first: the current week while running, week 1 before, the last week after. */
export function focusWeek(timing: CohortTiming, durationWeeks: number): number {
  if (timing.phase === "running") return timing.week;
  if (timing.phase === "upcoming") return 1;
  return durationWeeks;
}

export type WeekRow = { id: string; week_number: number; specialization: string | null };

/**
 * A learner's path: per week number, their specialization's row when there is
 * one, else the shared row. A week number with only specialization rows (DMP
 * weeks 7 to 9) maps to null until the learner picks one.
 */
export function pathFor<W extends WeekRow>(
  weeks: W[],
  specialization: string | null,
  durationWeeks: number,
): { week_number: number; week: W | null; forks: boolean }[] {
  const out = [];
  for (let n = 1; n <= durationWeeks; n++) {
    const rows = weeks.filter((w) => w.week_number === n);
    const own = specialization ? rows.find((w) => w.specialization === specialization) : undefined;
    const shared = rows.find((w) => w.specialization === null);
    out.push({ week_number: n, week: own ?? shared ?? null, forks: rows.some((w) => w.specialization !== null) });
  }
  return out;
}

export type SubmissionLite = {
  program_week_id: string;
  status: string;
  final_score: number | null;
  submitted_at: string | null;
};

export type WeekState =
  | "passed"
  | "graded"
  | "returned"
  | "sent"
  | "draft"
  | "upcoming"
  | "current"
  | "due"
  | "grace"
  | "late"
  | "choose";

/** One status per week, for the plan: the work's state first, then the calendar. */
export function weekState(args: {
  week: number;
  hasWeek: boolean;
  submission: SubmissionLite | undefined;
  startsOn: string;
  graceDays: number;
  passScore: number;
  today: string;
}): WeekState {
  const { week, hasWeek, submission, startsOn, graceDays, passScore, today } = args;
  if (!hasWeek) return "choose";
  if (submission) {
    if (submission.status === "graded") {
      return (submission.final_score ?? 0) >= passScore ? "passed" : "graded";
    }
    if (submission.status === "returned") return "returned";
    if (submission.status === "submitted" || submission.status === "ai_reviewed") return "sent";
  }
  const t = dayNumber(today);
  if (t < dayNumber(weekStarts(startsOn, week))) return submission ? "draft" : "upcoming";
  if (t <= dayNumber(dueDate(startsOn, week))) {
    if (submission) return "draft";
    return t < dayNumber(weekStarts(startsOn, week + 1)) ? "current" : "due";
  }
  if (t <= dayNumber(lateAfter(startsOn, week, graceDays))) return "grace";
  return "late";
}

export const WEEK_STATE_LABEL: Record<WeekState, string> = {
  passed: "Passed",
  graded: "Graded",
  returned: "Returned to you",
  sent: "Sent",
  draft: "Draft saved",
  upcoming: "Coming up",
  current: "This week",
  due: "Due today",
  grace: "In grace period",
  late: "Late",
  choose: "Choose a specialization",
};

/** Sent work counts once it has left drafts. */
export function isSent(s: SubmissionLite | undefined): boolean {
  return !!s && s.status !== "draft";
}

/**
 * A learner may change specialization until they have sent work for a
 * specialization week (choose_specialization enforces the same rule).
 */
export function specializationLocked(
  weeks: WeekRow[],
  submissions: SubmissionLite[],
): boolean {
  const forkIds = new Set(weeks.filter((w) => w.specialization !== null).map((w) => w.id));
  return submissions.some((s) => forkIds.has(s.program_week_id) && isSent(s));
}

export type Specialization = { slug: string; label: string };

/** programs.specializations is jsonb; keep only well formed entries. */
export function parseSpecializations(value: unknown): Specialization[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((v) =>
    v && typeof v === "object" && typeof (v as Specialization).slug === "string" && typeof (v as Specialization).label === "string"
      ? [{ slug: (v as Specialization).slug, label: (v as Specialization).label }]
      : [],
  );
}

/** The first membership to show: an active learner row, else the latest deferred one, else a completed one. */
export function pickMembership<
  M extends { role: string; status: string; deferred_at: string | null; created_at: string; starts_on: string },
>(rows: M[]): M | null {
  const learner = rows.filter((r) => r.role === "learner");
  const byStartDesc = (a: M, b: M) => b.starts_on.localeCompare(a.starts_on);
  const active = learner.filter((r) => r.status === "active").sort(byStartDesc);
  if (active.length) return active[0];
  const deferred = learner
    .filter((r) => r.status === "deferred")
    .sort((a, b) => (b.deferred_at ?? b.created_at).localeCompare(a.deferred_at ?? a.created_at));
  if (deferred.length) return deferred[0];
  const completed = learner.filter((r) => r.status === "completed").sort(byStartDesc);
  return completed[0] ?? null;
}

/** Progress across the learner's path: lessons done, work sent, weeks passed. */
export function pathProgress(
  path: { week: { id: string; lessons: { done: boolean }[] } | null }[],
  submissions: Map<string, SubmissionLite>,
  passScore: number,
) {
  const weeks = path.flatMap((p) => (p.week ? [p.week] : []));
  const lessons = weeks.flatMap((w) => w.lessons);
  const subs = weeks.map((w) => submissions.get(w.id));
  return {
    lessonsDone: lessons.filter((l) => l.done).length,
    lessonsTotal: lessons.length,
    sent: subs.filter(isSent).length,
    passed: subs.filter((s) => s?.status === "graded" && (s.final_score ?? 0) >= passScore).length,
    weeksTotal: path.length,
  };
}
