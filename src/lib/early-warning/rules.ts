/**
 * Early warning rules (issues #325 and #330). Pure, so it can be unit tested
 * and shared by the server and the pages.
 *
 * The database computes risk daily (private.risk_reasons and
 * private.risk_level in supabase/migrations/20261114200000_early_warning.sql)
 * and these functions mirror it exactly: change both together. The pgTAP
 * test and rules.test.ts check the same cases.
 *
 * Every reason is a fixed code with a plain words explanation, so a mentor
 * always sees why someone is on their list. Device, connection, region and
 * study hour never enter the rules.
 */

export const RISK_REASONS = [
  "went_quiet",
  "dormant",
  "missed_deadlines",
  "streak_broken",
  "slipping",
  "pace_slowing",
  "quiz_stuck",
  "no_first_topic",
] as const;
export type RiskReason = (typeof RISK_REASONS)[number];

export const RISK_LEVELS = ["none", "watch", "at_risk"] as const;
export type RiskLevel = (typeof RISK_LEVELS)[number];

/** Reasons that alone make a learner at risk. */
export const STRONG_REASONS: readonly RiskReason[] = ["went_quiet", "dormant", "missed_deadlines"];

/** Reasons about going quiet: the ones whose alerts count towards "came back". */
export const QUIET_REASONS: readonly RiskReason[] = ["went_quiet", "dormant", "streak_broken", "slipping"];

export const CONTACT_KINDS = ["message", "call", "session"] as const;
export type ContactKind = (typeof CONTACT_KINDS)[number];

export const QUIET_MIN_DAYS = 7;
export const QUIET_MAX_DAYS = 60;
export const STREAK_ACTIVE_DAYS = 5;
export const STREAK_QUIET_DAYS = 3;
export const PACE_MIN_PRIOR = 4;
export const QUIZ_FAILS = 3;
export const PATH_DAYS = 7;
export const MISSED_DEADLINES = 2;

export type RiskInput = {
  /** learner_attributes.stage */
  stage: string;
  /** Days since last active (UTC days); null when never active. */
  daysQuiet: number | null;
  /** Active days in the 14 days up to the last active day. */
  active14: number;
  /** Active days in the 56 days up to the last active day. */
  active56: number;
  /** Topics finished in the last 14 days. */
  topicsRecent: number;
  /** Topics finished in the 56 days before that. */
  topicsPrior: number;
  /** Most failed quizzes on one topic in 30 days, not yet passed. */
  quizFails: number;
  topicsStarted: number;
  /** Days since they first saved a path; null when they never did. */
  pathAge: number | null;
  /** Cohort deadlines missed in the last 28 days. */
  deadlinesMissed: number;
};

/** Their usual gap between active days, from at least 3 active days in 56. */
export function usualGap(active56: number): number | null {
  return active56 >= 3 ? Math.ceil(56 / active56) : null;
}

export function riskReasons(i: RiskInput): RiskReason[] {
  const gap = usualGap(i.active56);
  const q = i.daysQuiet;
  const quiet = gap !== null && q !== null && q >= Math.max(QUIET_MIN_DAYS, 2 * gap) && q <= QUIET_MAX_DAYS;
  const out: RiskReason[] = [];
  if (quiet) out.push("went_quiet");
  if (i.stage === "dormant" && q !== null && q <= QUIET_MAX_DAYS) out.push("dormant");
  if (i.deadlinesMissed >= MISSED_DEADLINES) out.push("missed_deadlines");
  if (i.active14 >= STREAK_ACTIVE_DAYS && q !== null && q >= STREAK_QUIET_DAYS && q <= QUIET_MAX_DAYS && !quiet) out.push("streak_broken");
  if (i.stage === "slipping") out.push("slipping");
  if (i.topicsPrior >= PACE_MIN_PRIOR && i.topicsRecent * 8 <= i.topicsPrior) out.push("pace_slowing");
  if (i.quizFails >= QUIZ_FAILS) out.push("quiz_stuck");
  if (i.topicsStarted === 0 && i.pathAge !== null && i.pathAge >= PATH_DAYS) out.push("no_first_topic");
  return out;
}

export function riskLevel(reasons: readonly string[]): RiskLevel {
  if (reasons.some((r) => (STRONG_REASONS as readonly string[]).includes(r)) || reasons.length >= 2) return "at_risk";
  return reasons.length === 1 ? "watch" : "none";
}

export const LEVEL_LABEL: Record<RiskLevel, string> = { none: "On track", watch: "Keep an eye", at_risk: "Check in now" };
export const LEVEL_TONE: Record<RiskLevel, "neutral" | "warning" | "danger"> = { none: "neutral", watch: "warning", at_risk: "danger" };

export const CONTACT_LABEL: Record<ContactKind, string> = { message: "Message", call: "Call", session: "Session" };
export const CONTACT_PAST: Record<ContactKind, string> = { message: "Messaged", call: "Called", session: "Met" };

export function isRiskLevel(v: unknown): v is RiskLevel {
  return typeof v === "string" && (RISK_LEVELS as readonly string[]).includes(v);
}
export function isContactKind(v: unknown): v is ContactKind {
  return typeof v === "string" && (CONTACT_KINDS as readonly string[]).includes(v);
}

/** The numbers behind the reasons, as learner_risk stores them. */
export type RiskDetail = {
  days_quiet: number | null;
  usual_gap_days: number | null;
  topics_recent: number;
  topics_prior: number;
  quiz_fails: number;
  deadlines_missed: number;
};

const days = (n: number) => `${n} ${n === 1 ? "day" : "days"}`;

/** One reason in plain words, using the numbers when we have them. */
export function reasonText(reason: string, d?: Partial<RiskDetail>): string {
  const q = d?.days_quiet ?? null;
  switch (reason) {
    case "went_quiet":
      return q !== null && d?.usual_gap_days
        ? `Quiet for ${days(q)}, when they usually come back every ${days(d.usual_gap_days)}.`
        : "Quiet for much longer than usual.";
    case "dormant":
      return q !== null ? `Not active for ${days(q)}.` : "Not active for over three weeks.";
    case "missed_deadlines":
      return d?.deadlines_missed ? `Missed ${d.deadlines_missed} cohort deadlines in the last four weeks.` : "Missed cohort deadlines lately.";
    case "streak_broken":
      return q !== null ? `Was learning most days, then stopped ${days(q)} ago.` : "Was learning most days, then stopped.";
    case "slipping":
      return q !== null ? `Last active ${days(q)} ago.` : "Has not been active for over a week.";
    case "pace_slowing":
      return d?.topics_prior
        ? `Finishing topics more slowly: ${d.topics_recent ?? 0} in the last two weeks, about ${Math.round(d.topics_prior / 4)} every two weeks before.`
        : "Finishing topics more slowly than before.";
    case "quiz_stuck":
      return d?.quiz_fails ? `Failed one topic's quiz ${d.quiz_fails} times this month.` : "Stuck on one topic's quiz.";
    case "no_first_topic":
      return "Saved a learning path but has not started a topic.";
    default:
      return "Flagged by the daily check.";
  }
}

export type CaseloadRow = {
  level: string;
  last_contact_at: string | null;
  next_due_on?: string | null;
  display_name: string | null;
};

const LEVEL_RANK: Record<string, number> = { at_risk: 0, watch: 1, none: 2 };

/**
 * The caseload order: highest risk first, then the longest since anyone made
 * contact (never contacted first), then the nearest unsent deadline, then name.
 */
export function sortCaseload<T extends CaseloadRow>(rows: readonly T[]): T[] {
  return [...rows].sort(
    (a, b) =>
      (LEVEL_RANK[a.level] ?? 3) - (LEVEL_RANK[b.level] ?? 3) ||
      cmpNullsFirst(a.last_contact_at, b.last_contact_at) ||
      cmpNullsLast(a.next_due_on ?? null, b.next_due_on ?? null) ||
      (a.display_name ?? "").localeCompare(b.display_name ?? ""),
  );
}

function cmpNullsFirst(a: string | null, b: string | null) {
  if (a === b) return 0;
  if (a === null) return -1;
  if (b === null) return 1;
  return a.localeCompare(b);
}
function cmpNullsLast(a: string | null, b: string | null) {
  if (a === b) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  return a.localeCompare(b);
}

export const NOTE_MAX = 280;
