import { isEventFormat, isEventKind, type EventFormat, type EventKind } from "./labels";

/**
 * The /events filters (?kind=&format=&chapter=). Unknown values are ignored,
 * so an old or edited link still shows a list. Pure, so it is unit tested.
 */

export type EventFilters = { kind: EventKind | null; format: EventFormat | null; chapter: string | null };

type Params = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export function parseEventFilters(params: Params, chapterSlugs: string[]): EventFilters {
  const kind = first(params.kind);
  const format = first(params.format);
  const chapter = first(params.chapter);
  return {
    kind: isEventKind(kind) ? kind : null,
    format: isEventFormat(format) ? format : null,
    chapter: chapterSlugs.includes(chapter) ? chapter : null,
  };
}

export function hasFilters(filters: EventFilters) {
  return Boolean(filters.kind || filters.format || filters.chapter);
}

type Filterable = { kind: string; format: string; chapter: { slug: string } | null };

/** A hybrid event counts for both "in person" and "online". */
export function matchesFilters(event: Filterable, filters: EventFilters) {
  if (filters.kind && event.kind !== filters.kind) return false;
  if (filters.chapter && event.chapter?.slug !== filters.chapter) return false;
  if (filters.format && event.format !== filters.format && !(event.format === "hybrid")) return false;
  return true;
}

/** Upcoming (soonest first, live ones included) and past (latest first). */
export function splitByTime<T extends { status: string; starts_at: string; ends_at: string }>(events: T[], now: Date = new Date()) {
  const t = now.getTime();
  const isPast = (e: T) => e.status === "completed" || Date.parse(e.ends_at) <= t;
  const upcoming = events.filter((e) => !isPast(e)).sort((a, b) => Date.parse(a.starts_at) - Date.parse(b.starts_at));
  const past = events.filter(isPast).sort((a, b) => Date.parse(b.starts_at) - Date.parse(a.starts_at));
  return { upcoming, past };
}
