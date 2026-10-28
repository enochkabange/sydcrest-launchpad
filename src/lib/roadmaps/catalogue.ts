/**
 * The roadmap index filters (issue #244): field, time, works on a phone and
 * level. Pure and client safe; the page computes each card's facets on the
 * server and the filter bar matches them here.
 */
import { timeBand, TIME_BANDS, type TimeBand } from "./estimates";

export const FIELD_LABELS: Record<string, string> = {
  foundations: "Digital foundations",
  software: "Software",
  data: "Data",
  ai: "AI",
  infrastructure: "IT and cloud",
  security: "Security",
  design: "Design",
  product: "Product",
  marketing: "Marketing and content",
  business: "Business and office",
  creative: "Creative",
};

export const LEVEL_LABELS = {
  "first-steps": "New to digital tools",
  beginner: "Beginner",
  "next-step": "Best after another track",
} as const;

export type Level = keyof typeof LEVEL_LABELS;

export type Facets = {
  field: string | null;
  band: TimeBand | null;
  phone: boolean;
  level: Level | null;
};

export type Filters = { field: string; band: string; level: string; phone: boolean };

export const NO_FILTERS: Filters = { field: "", band: "", level: "", phone: false };

export function facetsFor(r: {
  field_category: string | null;
  required_minutes: number;
  track: string | null;
  level: string | null;
}, phoneFriendly: ReadonlySet<string>): Facets {
  return {
    field: r.field_category,
    band: timeBand(r.required_minutes),
    phone: !!r.track && phoneFriendly.has(r.track),
    level: r.level && r.level in LEVEL_LABELS ? (r.level as Level) : null,
  };
}

/** An empty filter matches everything; a roadmap without a facet value matches only the empty filter. */
export function matchesFilters(f: Facets, filters: Filters): boolean {
  if (filters.field && f.field !== filters.field) return false;
  if (filters.band && f.band !== filters.band) return false;
  if (filters.level && f.level !== filters.level) return false;
  if (filters.phone && !f.phone) return false;
  return true;
}

/** The options each select shows: only values some roadmap has, in a stable order. */
export function filterOptions(all: readonly Facets[]) {
  const fields = Object.keys(FIELD_LABELS).filter((k) => all.some((f) => f.field === k));
  const bands = TIME_BANDS.filter((b) => all.some((f) => f.band === b.id)).map((b) => ({ id: b.id, label: b.label }));
  const levels = (Object.keys(LEVEL_LABELS) as Level[]).filter((l) => all.some((f) => f.level === l));
  return {
    fields: fields.map((id) => ({ id, label: FIELD_LABELS[id] })),
    bands,
    levels: levels.map((id) => ({ id, label: LEVEL_LABELS[id] })),
    phone: all.some((f) => f.phone),
  };
}
