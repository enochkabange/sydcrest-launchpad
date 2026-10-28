/**
 * Pure rules for the mentor console and peer review (issue #146). No I/O, so
 * they are unit tested in progress.test.ts. The database stays the authority
 * (grade_submission, submit_peer_review); these only decide what to show and
 * catch obvious mistakes before a round trip.
 */

export type ProgramWeek = {
  id: string;
  week_number: number;
  specialization: string | null;
  theme: string;
  is_capstone: boolean;
};

/**
 * A learner's twelve weeks: per week number, their specialization's row if
 * one exists, else the shared row (DMP weeks 7 to 9 fork). Sorted by number.
 */
export function learnerPath<W extends ProgramWeek>(weeks: W[], specialization: string | null): W[] {
  const byNumber = new Map<number, W>();
  for (const w of weeks) {
    if (w.specialization === null) {
      if (!byNumber.has(w.week_number)) byNumber.set(w.week_number, w);
    }
  }
  if (specialization) {
    for (const w of weeks) {
      if (w.specialization === specialization) byNumber.set(w.week_number, w);
    }
  }
  return [...byNumber.values()].sort((a, b) => a.week_number - b.week_number);
}

/** The distinct week numbers of a programme, for the progress grid's columns. */
export function weekNumbers(weeks: ProgramWeek[]): number[] {
  return [...new Set(weeks.map((w) => w.week_number))].sort((a, b) => a - b);
}

const DAY = 24 * 60 * 60 * 1000;

/** Week n is due on starts_on + 7n days (a yyyy-mm-dd date, UTC). */
export function dueOn(startsOn: string, weekNumber: number): string {
  const start = Date.parse(`${startsOn}T00:00:00Z`);
  return new Date(start + 7 * weekNumber * DAY).toISOString().slice(0, 10);
}

export type SubmissionStatus = "draft" | "submitted" | "ai_reviewed" | "returned" | "graded";

export type CellState =
  | "passed" // graded at or above the pass mark
  | "below" // graded under the pass mark
  | "waiting" // sent, waiting for a mentor
  | "returned" // sent back for changes
  | "late" // nothing sent and past due plus grace days
  | "overdue" // nothing sent, past due, still inside the grace days
  | "upcoming"; // nothing sent, not due yet

/**
 * One cell of the progress grid. `today` is a yyyy-mm-dd date so the rule is
 * testable and the same for every viewer.
 */
export function cellState({
  status,
  finalScore,
  passScore,
  startsOn,
  weekNumber,
  graceDays,
  today,
}: {
  status: SubmissionStatus | null;
  finalScore: number | null;
  passScore: number;
  startsOn: string;
  weekNumber: number;
  graceDays: number;
  today: string;
}): CellState {
  if (status === "graded") return (finalScore ?? 0) >= passScore ? "passed" : "below";
  if (status === "submitted" || status === "ai_reviewed") return "waiting";
  if (status === "returned") return "returned";
  const due = dueOn(startsOn, weekNumber);
  if (today <= due) return "upcoming";
  const lateFrom = new Date(Date.parse(`${due}T00:00:00Z`) + graceDays * DAY).toISOString().slice(0, 10);
  return today > lateFrom ? "late" : "overdue";
}

export const CELL_LABEL: Record<CellState, string> = {
  passed: "Passed",
  below: "Below pass mark",
  waiting: "Waiting for review",
  returned: "Returned for changes",
  late: "Late",
  overdue: "Past due, in grace days",
  upcoming: "Not due yet",
};

/** Today in Ghana (UTC all year), as yyyy-mm-dd. */
export function todayInAccra(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export type Criterion = { id: string; label: string; description: string; max_points: number };

/** Rubric criteria from the jsonb column, dropping anything malformed. */
export function parseCriteria(json: unknown): Criterion[] {
  if (!Array.isArray(json)) return [];
  return json.flatMap((c) => {
    if (!c || typeof c !== "object") return [];
    const { id, label, description, max_points } = c as Record<string, unknown>;
    if (typeof id !== "string" || typeof label !== "string" || typeof max_points !== "number") return [];
    return [{ id, label, description: typeof description === "string" ? description : "", max_points }];
  });
}

/**
 * The rubric for a week: the week's own row, else the programme default
 * (program_week_id null). Mirrors private.rubric_for_week, which is not
 * callable by signed in users.
 */
export function rubricForWeek<R extends { program_week_id: string | null }>(rubrics: R[], weekId: string): R | null {
  return rubrics.find((r) => r.program_week_id === weekId) ?? rubrics.find((r) => r.program_week_id === null) ?? null;
}

export type ReviewInput = { scores: Record<string, number>; comment: string };
export type ReviewErrors = Partial<Record<string, string>>;

/**
 * Reads a peer review form: one whole number per criterion (field name
 * `score_<criterion id>`) from 0 to its maximum, and a comment. Only the
 * rubric's criteria are kept, so the result has no extra keys.
 */
export function parseReviewForm(
  form: { get(name: string): FormDataEntryValue | null },
  criteria: Criterion[],
): { data: ReviewInput; errors: ReviewErrors } {
  const errors: ReviewErrors = {};
  const scores: Record<string, number> = {};
  for (const c of criteria) {
    const raw = String(form.get(`score_${c.id}`) ?? "").trim();
    const n = Number(raw);
    if (raw === "" || !Number.isInteger(n) || n < 0 || n > c.max_points) {
      errors[`score_${c.id}`] = `Give a whole number from 0 to ${c.max_points}.`;
    } else {
      scores[c.id] = n;
    }
  }
  const comment = String(form.get("comment") ?? "").trim();
  if (!comment) errors.comment = "Write a short comment for your peer.";
  else if (comment.length > 4000) errors.comment = "Keep the comment under 4000 characters.";
  return { data: { scores, comment }, errors };
}

/** Friendly copy for the error codes the Phase 2 functions raise. */
export function friendlyDbError(error: { code?: string; message?: string } | null | undefined, fallback: string): string {
  if (!error) return fallback;
  switch (error.code) {
    case "42501":
      return "You are not allowed to do that for this cohort.";
    case "P0002":
      return "We could not find that record. Reload the page and try again.";
    case "53400":
      return "That cohort is full. Choose another cohort.";
    case "23505":
      return "That is already in place.";
    case "22023":
      // These messages are written for people in the migrations.
      return error.message ?? fallback;
    default:
      return fallback;
  }
}

export const ROLE_LABEL: Record<string, string> = {
  learner: "Learner",
  mentor: "Mentor",
  coordinator: "Coordinator",
};

export const MEMBER_STATUS_LABEL: Record<string, string> = {
  active: "Active",
  deferred: "Deferred",
  completed: "Completed",
};

export const COHORT_STATUSES = ["planned", "enrolling", "running", "completed", "cancelled"] as const;
export type CohortStatus = (typeof COHORT_STATUSES)[number];
export const COHORT_STATUS_LABEL: Record<CohortStatus, string> = {
  planned: "Planned",
  enrolling: "Enrolling",
  running: "Running",
  completed: "Completed",
  cancelled: "Cancelled",
};

/** Reads the admin cohort form. */
export function parseCohortForm(form: { get(name: string): FormDataEntryValue | null }) {
  const errors: Partial<Record<"program_id" | "name" | "starts_on" | "max_size" | "status", string>> = {};
  const program_id = String(form.get("program_id") ?? "");
  const name = String(form.get("name") ?? "").trim();
  const starts_on = String(form.get("starts_on") ?? "");
  const sizeRaw = String(form.get("max_size") ?? "").trim();
  const status = String(form.get("status") ?? "planned") as CohortStatus;
  if (!program_id) errors.program_id = "Choose a programme.";
  if (!name) errors.name = "Give the cohort a name.";
  else if (name.length > 80) errors.name = "Keep the name under 80 characters.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(starts_on) || Number.isNaN(Date.parse(starts_on))) errors.starts_on = "Choose a start date.";
  const max_size = Number(sizeRaw);
  if (!Number.isInteger(max_size) || max_size < 1 || max_size > 200) errors.max_size = "Give a size from 1 to 200.";
  if (!COHORT_STATUSES.includes(status)) errors.status = "Choose a status.";
  return { data: { program_id, name, starts_on, max_size, status }, errors };
}

/** A loose email check for the staff lookup form; Auth is the real check. */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
