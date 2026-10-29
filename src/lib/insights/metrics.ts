/**
 * Metric calculations and number formats for the admin insights dashboards
 * (issue #243). Pure, unit tested in metrics.test.ts. The rule throughout:
 * never show a rate or a percentile computed from too few cases, and never
 * fill a gap with a made up or interpolated value.
 */
import { EVENTS, type EventName } from "@/lib/analytics/events";

/**
 * Below this many cases a rate, average or percentile is shown as "Not
 * enough data yet" instead of a number. Counts are always shown.
 */
export const MIN_SAMPLE = 5;
export const NOT_ENOUGH = "Not enough data yet";

const NUMBER = new Intl.NumberFormat("en-GB");

export function formatCount(n: number): string {
  return NUMBER.format(n);
}

/** True when there are enough cases to show a rate or percentile. */
export function enough(cases: number | null | undefined): boolean {
  return typeof cases === "number" && cases >= MIN_SAMPLE;
}

/** part / whole, or null when whole is under MIN_SAMPLE. */
export function rate(part: number, whole: number): number | null {
  return enough(whole) ? part / whole : null;
}

/** A share as "45%" (one decimal under 10%), or NOT_ENOUGH. */
export function formatRate(part: number, whole: number): string {
  const r = rate(part, whole);
  return r === null ? NOT_ENOUGH : formatShare(r);
}

export function formatShare(r: number): string {
  const pct = r * 100;
  const digits = pct > 0 && pct < 10 ? 1 : 0;
  return `${pct.toFixed(digits).replace(/\.0$/, "")}%`;
}

/** A median or mean in hours, readable: "45 minutes", "6.5 hours", "3.2 days". */
export function formatHours(hours: number | null | undefined, samples: number): string {
  if (hours === null || hours === undefined || !Number.isFinite(hours) || !enough(samples)) return NOT_ENOUGH;
  if (hours < 1) return `${Math.max(1, Math.round(hours * 60))} minutes`;
  if (hours < 48) return `${trim(hours)} hours`;
  return `${trim(hours / 24)} days`;
}

function trim(n: number) {
  return n >= 10 ? String(Math.round(n)) : n.toFixed(1).replace(/\.0$/, "");
}

export type VitalMetric = "LCP" | "INP" | "CLS" | "FCP" | "TTFB";

/** Google's Core Web Vitals thresholds: [good up to, poor from]. */
export const VITAL_THRESHOLDS: Record<VitalMetric, [number, number]> = {
  LCP: [2500, 4000],
  INP: [200, 500],
  CLS: [0.1, 0.25],
  FCP: [1800, 3000],
  TTFB: [800, 1800],
};

export const VITAL_LABELS: Record<VitalMetric, string> = {
  LCP: "Largest content shown (LCP)",
  INP: "Response to input (INP)",
  CLS: "Layout shift (CLS)",
  FCP: "First content shown (FCP)",
  TTFB: "Server response (TTFB)",
};

/** A percentile value in its unit: "2.4 s", "180 ms", "0.12"; NOT_ENOUGH under the sample floor. */
export function formatVital(metric: string, value: number | null | undefined, samples: number): string {
  if (value === null || value === undefined || !Number.isFinite(value) || !enough(samples)) return NOT_ENOUGH;
  if (metric === "CLS") return value.toFixed(2);
  if (value >= 1000) return `${(value / 1000).toFixed(1)} s`;
  return `${Math.round(value)} ms`;
}

export type VitalRating = "good" | "needs_improvement" | "poor";
export const RATING_LABELS: Record<VitalRating, string> = {
  good: "Good",
  needs_improvement: "Needs work",
  poor: "Poor",
};

export function vitalRating(metric: string, value: number | null | undefined): VitalRating | null {
  const t = VITAL_THRESHOLDS[metric as VitalMetric];
  if (!t || value === null || value === undefined || !Number.isFinite(value)) return null;
  if (value <= t[0]) return "good";
  if (value <= t[1]) return "needs_improvement";
  return "poor";
}

/** Change against the previous period: "Up 25%", "Down 10%", "No change", "New", or null with too little to compare. */
export function formatChange(current: number, previous: number): string | null {
  if (previous === 0 && current === 0) return null;
  if (previous === 0) return current >= MIN_SAMPLE ? "New" : null;
  if (previous < MIN_SAMPLE && current < MIN_SAMPLE) return null;
  const change = (current - previous) / previous;
  if (Math.abs(change) < 0.005) return "No change";
  return `${change > 0 ? "Up" : "Down"} ${formatShare(Math.abs(change))}`;
}

// Retention ------------------------------------------------------------------------

export const RETENTION_WEEKS = 8;

export type RetentionRow = { cohort_week: string; cohort_size: number; week_offset: number; active: number };
export type CohortSize = { cohort_week: string; cohort_size: number };

/** null: the week has not ended yet ("Not yet"), which is never the same as 0. */
export type RetentionCell = { active: number; rate: number | null } | null;
export type RetentionLine = { week: string; size: number; cells: RetentionCell[] };

/**
 * The weekly cohort matrix, newest cohort first, weeks 1 to 8. A cell is
 * null when the database returned no row for it (the week has not ended),
 * and its rate is null when the cohort is under MIN_SAMPLE people.
 */
export function retentionMatrix(rows: RetentionRow[], cohorts: CohortSize[]): RetentionLine[] {
  const sizes = new Map<string, number>(cohorts.map((c) => [c.cohort_week, c.cohort_size]));
  for (const r of rows) if (!sizes.has(r.cohort_week)) sizes.set(r.cohort_week, r.cohort_size);
  const cells = new Map(rows.map((r) => [`${r.cohort_week}:${r.week_offset}`, r.active]));
  return [...sizes.entries()]
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([week, size]) => ({
      week,
      size,
      cells: Array.from({ length: RETENTION_WEEKS }, (_, i) => {
        const active = cells.get(`${week}:${i + 1}`);
        return active === undefined ? null : { active, rate: rate(active, size) };
      }),
    }));
}

/**
 * Weighted average across cohorts for each week: total active over total
 * people, counting only cohorts whose week has ended. Null per week when no
 * cohort has reached it or fewer than MIN_SAMPLE people have.
 */
export function retentionAverage(lines: RetentionLine[]): (number | null)[] {
  return Array.from({ length: RETENTION_WEEKS }, (_, i) => {
    let active = 0;
    let people = 0;
    for (const line of lines) {
      const cell = line.cells[i];
      if (cell) {
        active += cell.active;
        people += line.size;
      }
    }
    return rate(active, people);
  });
}

// Feature use ----------------------------------------------------------------------

export const FEATURE_LABELS: Record<string, string> = {
  auth: "Accounts and sign in",
  settings: "Settings",
  onboarding: "Waitlist",
  path: "Path quiz",
  learn: "Learning",
  review: "Review",
  study_buddy: "Study Buddy",
  skills: "Verified skills",
  programme: "Programme applications",
  cohort: "Cohort work",
  certificates: "Certificates",
  experts: "Experts",
  bookings: "Bookings",
  briefs: "Briefs",
  opportunities: "Opportunities",
  outcomes: "Outcomes",
  talent: "Talent directory",
  organisations: "Organisations",
  community: "Community",
  events: "Events",
  chapters: "Chapters",
  social: "Following",
  sharing: "Sharing",
  notifications: "Notifications",
  navigation: "Page views",
  experience: "Forms and Web Vitals",
  failures: "Failures",
};

/** Features that are about reliability, not use; the Reliability dashboard shows them. */
const NOT_FEATURES = new Set(["failures", "experience"]);

export type FeatureEventRow = { name: string; events: number; previous_events: number; users: number; active_days: number };
export type FeatureUse = {
  feature: string;
  label: string;
  events: number;
  previous: number;
  /** The most people using any one action of the feature (a floor on the feature's users; people are not added across actions). */
  users: number;
  perUser: number | null;
  activeDays: number;
  actions: FeatureEventRow[];
};

export function featureOf(name: string): string {
  return (EVENTS as Record<string, { feature: string }>)[name]?.feature ?? "other";
}

export function eventLabel(name: string): string {
  const s = name.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Groups per event rows into features, most used first. */
export function groupFeatures(rows: FeatureEventRow[]): FeatureUse[] {
  const map = new Map<string, FeatureUse>();
  for (const row of rows) {
    const feature = featureOf(row.name as EventName);
    if (NOT_FEATURES.has(feature)) continue;
    const f =
      map.get(feature) ??
      { feature, label: FEATURE_LABELS[feature] ?? eventLabel(feature), events: 0, previous: 0, users: 0, perUser: null, activeDays: 0, actions: [] };
    f.events += row.events;
    f.previous += row.previous_events;
    f.users = Math.max(f.users, row.users);
    f.activeDays = Math.max(f.activeDays, row.active_days);
    f.actions.push(row);
    map.set(feature, f);
  }
  return [...map.values()]
    .map((f) => ({ ...f, perUser: enough(f.users) ? f.events / f.users : null, actions: f.actions.sort((a, b) => b.events - a.events) }))
    .sort((a, b) => b.events - a.events || a.label.localeCompare(b.label));
}

// Series ---------------------------------------------------------------------------

export type Point = { x: string; y: number };

/** Sum of a series, for "nothing happened in this range" checks. */
export function total(points: Point[]): number {
  return points.reduce((s, p) => s + p.y, 0);
}

/**
 * Weekly totals from daily points (weeks start Monday), for long ranges where
 * a daily line is too dense. Partial first and last weeks are labelled by
 * their Monday like the rest and keep only the days in range: no padding.
 */
export function weekly(points: Point[]): Point[] {
  const out = new Map<string, number>();
  for (const p of points) {
    const d = new Date(`${p.x}T00:00:00Z`);
    const monday = new Date(d.getTime() - ((d.getUTCDay() + 6) % 7) * 86_400_000).toISOString().slice(0, 10);
    out.set(monday, (out.get(monday) ?? 0) + p.y);
  }
  return [...out.entries()].map(([x, y]) => ({ x, y }));
}
