/**
 * Outcome check ins (epic #320, issue #329): 3, 6 and 12 months after a
 * learner finishes a cohort or a track, the daily cron asks how they are
 * doing. Pure logic (due dates, the plan for one run, the form, the report
 * shape) so it is unit tested; the store and the cron route do the I/O.
 *
 * The option lists must match the checks on public.outcome_checkins
 * (supabase/migrations/20261114500000_outcome_checkins.sql); a unit test
 * compares them.
 */
import { EMPLOYMENT, PAY_BANDS } from "@/lib/learner-profile";

// Options ------------------------------------------------------------------------------

export const CHECKIN_MONTHS = [3, 6, 12] as const;
export type CheckinMonths = (typeof CHECKIN_MONTHS)[number];

export const WORK_STATUSES = [
  { value: "employed", label: "Employed by an organisation" },
  { value: "self_employed", label: "Running my own business" },
  { value: "freelance", label: "Freelancing or taking gigs" },
  { value: "studying", label: "Studying or training" },
  { value: "looking", label: "Looking for work" },
  { value: "other", label: "Something else" },
] as const;
export type WorkStatus = (typeof WORK_STATUSES)[number]["value"];
export const WORK_STATUS_VALUES = WORK_STATUSES.map((s) => s.value) as WorkStatus[];

/** Monthly earnings in Ghana cedis: "none" plus the About you pay bands. */
export const EARNINGS_BANDS = [{ value: "none", label: "Not earning yet" }, ...PAY_BANDS] as const;
export type EarningsBand = (typeof EARNINGS_BANDS)[number]["value"];

/** Statuses that count as working, before (About you) and after (the check in). */
export const WORKING_BEFORE = ["employed", "self_employed"] as const;
export const WORKING_AFTER = ["employed", "self_employed", "freelance"] as const;

export function workStatusLabel(value: string) {
  return WORK_STATUSES.find((s) => s.value === value)?.label ?? "Not given";
}
export function earningsLabel(value: string) {
  return EARNINGS_BANDS.find((b) => b.value === value)?.label ?? "Not given";
}
export function baselineLabel(value: string) {
  return EMPLOYMENT.find((e) => e.value === value)?.label ?? "Not given";
}

export function isCheckinMonths(value: unknown): value is CheckinMonths {
  return CHECKIN_MONTHS.includes(Number(value) as CheckinMonths);
}

/** "3", "6" or "12" from a search param; 6 by default (the sponsor's usual question). */
export function parseCheckinMonths(value: string | string[] | undefined): CheckinMonths {
  const v = Array.isArray(value) ? value[0] : value;
  return isCheckinMonths(v) ? (Number(v) as CheckinMonths) : 6;
}

// Dates --------------------------------------------------------------------------------

/** How long after its due date a check in may still be created (backfill guard). */
export const CREATE_WITHIN_DAYS = 30;
/** No learner gets two check ins sent within this many days; the later one is skipped. */
export const MIN_GAP_DAYS = 60;

const DAY_MS = 24 * 60 * 60 * 1000;

function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

const iso = (date: Date) => date.toISOString().slice(0, 10);

/** Calendar months later; the 31st becomes the last day of a shorter month (31 Aug + 6 = 28 Feb). */
export function addMonths(isoDate: string, months: number) {
  const { y, m, d } = parts(isoDate);
  const target = new Date(Date.UTC(y, m - 1 + months, 1));
  const lastDay = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
  target.setUTCDate(Math.min(d, lastDay));
  return iso(target);
}

export function addDays(isoDate: string, days: number) {
  const { y, m, d } = parts(isoDate);
  return iso(new Date(Date.UTC(y, m - 1, d) + days * DAY_MS));
}

export function daysBetween(fromIso: string, toIso: string) {
  const a = parts(fromIso);
  const b = parts(toIso);
  return Math.round((Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)) / DAY_MS);
}

/**
 * The check in due now for a finish, if any: the latest milestone whose due
 * date has passed, as long as it passed no more than CREATE_WITHIN_DAYS ago.
 * So a cron that missed a few days catches up, and finishes from long before
 * this feature shipped do not set off a burst of overdue messages.
 */
export function dueCheckin(finishedOn: string, today: string): { months: CheckinMonths; dueOn: string } | null {
  let due: { months: CheckinMonths; dueOn: string } | null = null;
  for (const months of CHECKIN_MONTHS) {
    const dueOn = addMonths(finishedOn, months);
    if (dueOn <= today) due = { months, dueOn };
  }
  if (!due || daysBetween(due.dueOn, today) > CREATE_WITHIN_DAYS) return null;
  return due;
}

/** The finishes worth asking the database for today: due dates within the creation window. */
export function finishWindow(today: string) {
  return {
    // A few days of slack either side for month ends (31 May + 3 months is 31 August).
    from: addDays(addMonths(addDays(today, -CREATE_WITHIN_DAYS), -12), -3),
    to: addDays(addMonths(today, -3), 3),
  };
}

// Planning one run ---------------------------------------------------------------------

export type CheckinSource = "cohort" | "track";
export type BaselineStatus = (typeof EMPLOYMENT)[number]["value"];

export type Finish = {
  profile_id: string;
  source: CheckinSource;
  cohort_id: string | null;
  roadmap_id: string | null;
  finished_on: string;
  baseline_status: string | null;
};

export type ExistingCheckin = {
  profile_id: string;
  source: CheckinSource;
  cohort_id: string | null;
  roadmap_id: string | null;
  months: number;
};

export type PlannedCheckin = Finish & { months: CheckinMonths; due_on: string };

const finishKey = (f: { profile_id: string; source: string; cohort_id: string | null; roadmap_id: string | null }) =>
  `${f.profile_id}:${f.source}:${f.cohort_id ?? f.roadmap_id}`;

/** The check ins to create today: one per finish that is due, unless it (or a later one) exists. */
export function planCheckins(finishes: Finish[], existing: ExistingCheckin[], today: string): PlannedCheckin[] {
  const latest = new Map<string, number>();
  for (const e of existing) latest.set(finishKey(e), Math.max(latest.get(finishKey(e)) ?? 0, e.months));
  const planned = new Map<string, PlannedCheckin>();
  for (const f of finishes) {
    const due = dueCheckin(f.finished_on, today);
    if (!due) continue;
    const key = finishKey(f);
    if ((latest.get(key) ?? 0) >= due.months || planned.has(key)) continue;
    planned.set(key, { ...f, months: due.months, due_on: due.dueOn });
  }
  return [...planned.values()];
}

/**
 * Which new check ins to send and which to skip, so nobody gets two within
 * MIN_GAP_DAYS: one per learner per run, and none for a learner already sent
 * one recently. Earliest due first.
 */
export function chooseToSend<T extends { id: string; profile_id: string; due_on: string }>(
  created: T[],
  lastSentOn: Map<string, string>,
  today: string,
) {
  const send: T[] = [];
  const skip: T[] = [];
  const taken = new Set<string>();
  for (const c of [...created].sort((a, b) => a.due_on.localeCompare(b.due_on))) {
    const last = lastSentOn.get(c.profile_id);
    if (taken.has(c.profile_id) || (last && daysBetween(last, today) < MIN_GAP_DAYS)) skip.push(c);
    else {
      send.push(c);
      taken.add(c.profile_id);
    }
  }
  return { send, skip };
}

// Messages -----------------------------------------------------------------------------

export function checkinHref(id: string) {
  return `/outcomes/check-in/${id}`;
}

/** The in app notification, by the notifications convention {title, body, href} plus ids. */
export function checkinPayload(id: string, months: number) {
  return {
    title: `Your ${months} month check in`,
    body: "Two minutes: tell us how things are going since you finished. Every question but the first is optional.",
    href: checkinHref(id),
    checkin_id: id,
  };
}

// The form -----------------------------------------------------------------------------

export type CheckinField = "work_status" | "organisation" | "earnings_band" | "skills";

export type CheckinAnswer = {
  work_status: WorkStatus;
  organisation: string | null;
  earnings_band: EarningsBand | null;
  skills: string[];
  share: boolean;
};

/** Checks an answer the way the database will; skills must come from the learner's own options. */
export function parseCheckin(form: FormData, allowedSkills: readonly string[]) {
  const errors: Partial<Record<CheckinField, string>> = {};
  const get = (key: string) => {
    const v = form.get(key);
    return typeof v === "string" ? v.trim() : "";
  };

  const work_status = get("work_status");
  if (!WORK_STATUS_VALUES.includes(work_status as WorkStatus)) errors.work_status = "Choose what you are doing now.";

  const organisation = get("organisation");
  if (organisation.length > 120) errors.organisation = "Keep the name under 120 characters.";

  const earnings = get("earnings_band");
  if (earnings && !EARNINGS_BANDS.some((b) => b.value === earnings)) errors.earnings_band = "Choose a band from the list.";

  const skills = [...new Set(form.getAll("skills").filter((v): v is string => typeof v === "string"))];
  if (skills.some((s) => !allowedSkills.includes(s))) errors.skills = "Choose from your own skills and tracks.";
  else if (skills.length > 20) errors.skills = "Choose up to 20.";

  if (Object.keys(errors).length) return { errors } as const;
  return {
    data: {
      work_status: work_status as WorkStatus,
      organisation: organisation || null,
      earnings_band: (earnings || null) as EarningsBand | null,
      skills,
      share: form.get("share") === "on",
    } satisfies CheckinAnswer,
  } as const;
}

// Reports ------------------------------------------------------------------------------

export type ReportRow = { metric: string; bucket: string; people: number | null };

export type OutcomeReport = {
  learners: number | null;
  sent: number | null;
  answered: number | null;
  shared: number | null;
  workingBefore: number | null;
  workingAfter: number | null;
  intoWork: number | null;
  before: { bucket: string; label: string; people: number | null }[];
  after: { bucket: string; label: string; people: number | null }[];
  earnings: { bucket: string; label: string; people: number | null }[];
};

function ordered(rows: ReportRow[], metric: string, order: readonly { value: string }[], label: (v: string) => string) {
  const values = [...order.map((o) => o.value), "not_given"];
  return rows
    .filter((r) => r.metric === metric)
    .sort((a, b) => values.indexOf(a.bucket) - values.indexOf(b.bucket))
    .map((r) => ({ bucket: r.bucket, label: label(r.bucket), people: r.people }));
}

/** Turns the (metric, bucket, people) rows from the report functions into one object. */
export function shapeReport(rows: ReportRow[]): OutcomeReport {
  const total = (metric: string) => rows.find((r) => r.metric === metric && r.bucket === "all")?.people ?? null;
  return {
    learners: total("learners"),
    sent: total("sent"),
    answered: total("answered"),
    shared: total("shared"),
    workingBefore: total("working_before"),
    workingAfter: total("working_after"),
    intoWork: total("into_work"),
    before: ordered(rows, "before", EMPLOYMENT, baselineLabel),
    after: ordered(rows, "after", WORK_STATUSES, workStatusLabel),
    earnings: ordered(rows, "earnings", EARNINGS_BANDS, earningsLabel),
  };
}

/** "5 of 8 (63%)", honest about small or missing numbers. */
export function responseRate(answered: number | null, sent: number | null) {
  if (sent === 0) return "No check ins sent yet";
  if (answered === null || sent === null) return "Too few to show yet";
  return `${answered} of ${sent} (${Math.round((answered / sent) * 100)}%)`;
}
