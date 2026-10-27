import { OUTCOME_TYPES } from "./labels";

/** A row of public.public_outcome_stats: verified outcomes of one type. */
export type OutcomeStatRow = { type: string | null; verified_count: number | null; verified_people: number | null };

export type ImpactSummary = {
  /** Every verified outcome, of any type. */
  total: number;
  /** Types with at least one verified outcome, in the order of OUTCOME_TYPES. */
  byType: { value: string; label: string; plural: string; definition: string; count: number; people: number }[];
};

/**
 * Totals for the public impact page. People are counted per type only: one
 * learner can hold a job and a scholarship, so adding the per type people
 * together would overstate how many people we have helped.
 */
export function summariseImpact(rows: OutcomeStatRow[]): ImpactSummary {
  const byType = OUTCOME_TYPES.flatMap((t) => {
    const row = rows.find((r) => r.type === t.value);
    const count = row?.verified_count ?? 0;
    if (count <= 0) return [];
    return [{ value: t.value, label: t.label, plural: t.plural, definition: t.definition, count, people: row?.verified_people ?? 0 }];
  });
  return { total: byType.reduce((sum, t) => sum + t.count, 0), byType };
}

/** A whole number percentage, or null when there is nothing to divide by. */
export function rate(part: number, whole: number): number | null {
  if (!whole) return null;
  return Math.round((part / whole) * 100);
}

export function formatRate(part: number, whole: number) {
  const r = rate(part, whole);
  return r === null ? "No learners yet" : `${r}%`;
}

/** A row of public.admin_cohort_outcomes. Dates are YYYY-MM-DD. */
export type CohortOutcomeRow = {
  cohort_id: string;
  program_title: string;
  cohort_name: string;
  cohort_status: string;
  starts_on: string;
  ends_on: string;
  window_ends_on: string;
  learners: number;
  completed: number;
  certified: number;
  placed: number;
};

export type CohortPhase = "not_started" | "running" | "window_open" | "window_closed";

/**
 * Where a cohort is in the North Star clock on `today` (YYYY-MM-DD, Ghana):
 * before it starts, while it runs, inside the months after it ends when
 * outcomes still count, or done (its numbers are final).
 */
export function cohortPhase(row: Pick<CohortOutcomeRow, "starts_on" | "ends_on" | "window_ends_on">, today: string): CohortPhase {
  if (today < row.starts_on) return "not_started";
  if (today <= row.ends_on) return "running";
  if (today <= row.window_ends_on) return "window_open";
  return "window_closed";
}

export const PHASE_LABELS: Record<CohortPhase, string> = {
  not_started: "Not started",
  running: "Running",
  window_open: "Counting outcomes",
  window_closed: "Final",
};

/** Totals across cohorts for the headline numbers on the admin North Star view. */
export function totalCohorts(rows: Pick<CohortOutcomeRow, "learners" | "completed" | "certified" | "placed">[]) {
  return rows.reduce(
    (sum, r) => ({
      learners: sum.learners + r.learners,
      completed: sum.completed + r.completed,
      certified: sum.certified + r.certified,
      placed: sum.placed + r.placed,
    }),
    { learners: 0, completed: 0, certified: 0, placed: 0 },
  );
}

/** Months the admin can choose for the window. The North Star uses six. */
export const WINDOW_MONTHS = [3, 6, 12] as const;
export const NORTH_STAR_MONTHS = 6;

export function parseMonths(raw: string | string[] | undefined): number {
  const value = Number(Array.isArray(raw) ? raw[0] : raw);
  return (WINDOW_MONTHS as readonly number[]).includes(value) ? value : NORTH_STAR_MONTHS;
}
