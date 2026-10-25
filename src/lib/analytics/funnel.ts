/** Shapes the funnel_by_week() rows for the admin funnel page. Pure. */

export type FunnelWeek = { week_start: string; visits: number; signups: number; activations: number };

/** Whole percent, or null when there is nothing to divide by. */
export function rate(part: number, whole: number): number | null {
  if (!whole || whole <= 0) return null;
  return Math.round((part / whole) * 100);
}

export function formatRate(part: number, whole: number): string {
  const value = rate(part, whole);
  return value === null ? "None yet" : `${value}%`;
}

export function funnelTotals(weeks: FunnelWeek[]) {
  return weeks.reduce(
    (sum, w) => ({
      visits: sum.visits + w.visits,
      signups: sum.signups + w.signups,
      activations: sum.activations + w.activations,
    }),
    { visits: 0, signups: 0, activations: 0 },
  );
}

/** "20 Oct 2026" from a YYYY-MM-DD week start (UTC, which is Accra time). */
export function formatWeek(weekStart: string): string {
  const date = new Date(`${weekStart}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return weekStart;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}
