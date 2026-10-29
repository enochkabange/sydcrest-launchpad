/**
 * Filters for the admin insights dashboards (issue #243), read from and
 * written to URL search params so every view is a shareable link and the
 * CSV export sees exactly what the page saw. Pure: unit tested in
 * filters.test.ts.
 */
import { isRegionSlug } from "@/lib/regions";

export const PRESETS = [7, 30, 90] as const;
export type Preset = (typeof PRESETS)[number];
export const DEFAULT_PRESET: Preset = 30;
/** The report functions refuse longer ranges (private.insights_guard). */
export const MAX_RANGE_DAYS = 401;

export const FILTER_KEYS = ["track", "region", "chapter", "cohort", "device"] as const;
export type FilterKey = (typeof FILTER_KEYS)[number];

export const DEVICES = [
  { value: "mobile", label: "Phone" },
  { value: "tablet", label: "Tablet" },
  { value: "desktop", label: "Computer" },
] as const;

export type InsightFilters = {
  from: string;
  to: string;
  /** Days in the range, both ends included. */
  days: number;
  /** The preset in use, or null for a custom range. */
  preset: Preset | null;
  track: string | null;
  region: string | null;
  chapter: string | null;
  cohort: string | null;
  device: string | null;
};

export type SearchParams = Record<string, string | string[] | undefined>;

const DAY = 86_400_000;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SLUG = /^[a-z0-9][a-z0-9_-]{0,79}$/;

function one(value: string | string[] | undefined): string | null {
  const v = Array.isArray(value) ? value[0] : value;
  return v && v.trim() ? v.trim() : null;
}

function validDate(value: string | null): value is string {
  if (!value || !DATE.test(value)) return false;
  const t = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(t) && new Date(t).toISOString().slice(0, 10) === value;
}

/** yyyy-mm-dd plus n days (n may be negative). */
export function addDays(day: string, n: number): string {
  return new Date(Date.parse(`${day}T00:00:00Z`) + n * DAY).toISOString().slice(0, 10);
}

/** Days from `from` to `to`, both included. */
export function spanDays(from: string, to: string): number {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY) + 1;
}

/**
 * Reads the filters a dashboard supports from search params. `range` picks a
 * preset (7, 30 or 90 days ending today); `from` and `to` make a custom range
 * when both are valid dates, in order, not in the future and at most 401 days
 * apart. Anything invalid falls back to the default, never to an error.
 * Filters the dashboard does not support are dropped.
 */
export function parseFilters(sp: SearchParams, today: string, allowed: readonly FilterKey[] = FILTER_KEYS): InsightFilters {
  const allow = new Set(allowed);
  const from = one(sp.from);
  const to = one(sp.to);
  const range = one(sp.range);

  let preset: Preset | null = null;
  let start: string;
  let end: string;
  if (range !== "custom" && PRESETS.includes(Number(range) as Preset)) {
    preset = Number(range) as Preset;
  } else if (validDate(from) && validDate(to) && from <= to && to <= today && spanDays(from, to) <= MAX_RANGE_DAYS) {
    start = from;
    end = to;
  } else {
    preset = DEFAULT_PRESET;
  }
  if (preset) {
    end = today;
    start = addDays(today, -(preset - 1));
  }

  const pick = (key: FilterKey, ok: (v: string) => boolean) => {
    const v = one(sp[key]);
    return allow.has(key) && v && ok(v) ? v : null;
  };

  return {
    from: start!,
    to: end!,
    days: spanDays(start!, end!),
    preset,
    track: pick("track", (v) => SLUG.test(v)),
    region: pick("region", isRegionSlug),
    chapter: pick("chapter", (v) => UUID.test(v)),
    cohort: pick("cohort", (v) => UUID.test(v)),
    device: pick("device", (v) => DEVICES.some((d) => d.value === v)),
  };
}

/** The seven arguments every admin_insights_* function takes. */
export function toRpcArgs(f: InsightFilters) {
  return {
    p_from: f.from,
    p_to: f.to,
    p_track: f.track ?? undefined,
    p_region: f.region ?? undefined,
    p_chapter: f.chapter ?? undefined,
    p_cohort: f.cohort ?? undefined,
    p_device: f.device ?? undefined,
  };
}

/** Search params for these filters (with overrides), as `?a=b` or "". */
export function filterQuery(f: InsightFilters, overrides: Partial<Record<"range" | "from" | "to" | FilterKey, string | null>> = {}) {
  const params = new URLSearchParams();
  const custom = overrides.from !== undefined || overrides.to !== undefined;
  const range = overrides.range !== undefined ? overrides.range : custom ? null : f.preset ? String(f.preset) : null;
  if (range && range !== "custom") {
    if (Number(range) !== DEFAULT_PRESET) params.set("range", range);
  } else {
    params.set("from", overrides.from ?? f.from);
    params.set("to", overrides.to ?? f.to);
  }
  for (const key of FILTER_KEYS) {
    const v = overrides[key] !== undefined ? overrides[key] : f[key];
    if (v) params.set(key, v);
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}

/** True when any people or device filter is set (not just the dates). */
export function hasFilters(f: InsightFilters) {
  return FILTER_KEYS.some((k) => f[k] !== null);
}

/** "1 Oct 2026 to 28 Oct 2026" style range, for headings and file names. */
export function formatDay(day: string) {
  return new Date(`${day}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export function describeRange(f: InsightFilters) {
  if (f.preset) return `Last ${f.preset} days, ${formatDay(f.from)} to ${formatDay(f.to)}`;
  return `${formatDay(f.from)} to ${formatDay(f.to)}`;
}
