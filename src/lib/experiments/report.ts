/**
 * The Experiments dashboard's arithmetic (issue #327), pure so it is unit
 * tested. Rows come from public.admin_insights_experiments: one per
 * experiment and variant, with people exposed in the range, those whose
 * seven day window has closed (measured) and how many of them came back.
 */
import { MIN_SAMPLE, enough } from "@/lib/insights/metrics";

export type ExperimentRow = {
  experiment_key: string;
  status: string;
  metric: string;
  started_at: string | null;
  stopped_at: string | null;
  variant: string;
  variant_order: number;
  weight: number;
  people: number;
  measured: number;
  came_back: number;
};

export type Arm = {
  variant: string;
  control: boolean;
  /** Share of the split, 0 to 1. */
  share: number;
  people: number;
  measured: number;
  cameBack: number;
  /** cameBack / measured, or null under MIN_SAMPLE measured. */
  rate: number | null;
  /** rate minus the control's rate, or null when either is null. */
  difference: number | null;
  /** Whether the difference is unlikely to be chance (two sided, 95%). Null under COMPARE_MIN measured in either arm. */
  clear: boolean | null;
};

export type ExperimentReport = {
  key: string;
  status: string;
  metric: string;
  startedAt: string | null;
  stoppedAt: string | null;
  people: number;
  arms: Arm[];
};

export const METRIC_LABELS: Record<string, string> = {
  came_back_7d: "Came back on a later day within 7 days",
  active_7d: "Active within 7 days",
};

/**
 * Measured people needed in both arms before the dashboard says whether a
 * difference could be chance. Above MIN_SAMPLE on purpose: 5 against 5 can
 * look "significant" and mean nothing.
 */
export const COMPARE_MIN = 30;

export const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  running: "Running",
  stopped: "Stopped",
};

/** Standard normal CDF (Abramowitz and Stegun 7.1.26, error under 1.5e-7). */
function normalCdf(z: number): number {
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const erf =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-x * x);
  return z >= 0 ? (1 + erf) / 2 : (1 - erf) / 2;
}

/**
 * Two proportion z test: the two sided p value for "came back" rates
 * x1/n1 and x2/n2 being different, or null when it cannot be computed.
 */
export function pValue(
  x1: number,
  n1: number,
  x2: number,
  n2: number,
): number | null {
  if (n1 <= 0 || n2 <= 0) return null;
  const pooled = (x1 + x2) / (n1 + n2);
  const se = Math.sqrt(pooled * (1 - pooled) * (1 / n1 + 1 / n2));
  if (se === 0) return 1;
  const z = (x2 / n2 - x1 / n1) / se;
  return 2 * (1 - normalCdf(Math.abs(z)));
}

/** Groups the rows by experiment (in the order the database sent them) and compares each variant with the control. */
export function experimentReports(
  rows: readonly ExperimentRow[],
): ExperimentReport[] {
  const byKey = new Map<string, ExperimentRow[]>();
  for (const row of rows) {
    const list = byKey.get(row.experiment_key) ?? [];
    list.push(row);
    byKey.set(row.experiment_key, list);
  }
  return [...byKey.values()].map((list) => {
    const sorted = [...list].sort((a, b) => a.variant_order - b.variant_order);
    const totalWeight = sorted.reduce((s, r) => s + r.weight, 0) || 1;
    const control = sorted[0];
    const controlRate = enough(control.measured)
      ? control.came_back / control.measured
      : null;
    const arms: Arm[] = sorted.map((r, i) => {
      const rate = enough(r.measured) ? r.came_back / r.measured : null;
      const comparable = i > 0 && rate !== null && controlRate !== null;
      const p =
        comparable && control.measured >= COMPARE_MIN && r.measured >= COMPARE_MIN
          ? pValue(control.came_back, control.measured, r.came_back, r.measured)
          : null;
      return {
        variant: r.variant,
        control: i === 0,
        share: r.weight / totalWeight,
        people: r.people,
        measured: r.measured,
        cameBack: r.came_back,
        rate,
        difference: comparable ? rate - controlRate : null,
        clear: p === null ? null : p < 0.05,
      };
    });
    return {
      key: control.experiment_key,
      status: control.status,
      metric: control.metric,
      startedAt: control.started_at,
      stoppedAt: control.stopped_at,
      people: sorted.reduce((s, r) => s + r.people, 0),
      arms,
    };
  });
}

/** "4 points higher", "2.5 points lower" or "no different". */
export function formatPoints(difference: number): string {
  const pts = Math.round(Math.abs(difference) * 1000) / 10;
  if (pts === 0) return "no different";
  return `${pts} ${pts === 1 ? "point" : "points"} ${difference > 0 ? "higher" : "lower"}`;
}

export { MIN_SAMPLE };
