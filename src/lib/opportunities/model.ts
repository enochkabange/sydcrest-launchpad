/**
 * Pure helpers for the opportunities board (issue #159): kinds, filters,
 * Accra dates, matching and JobPosting structured data. No database access,
 * so it is unit tested and shared by the public pages, the saved list and
 * the posting forms (admin here, organisations in #161).
 */
import { FIELD_CATEGORIES, TRACKS } from "@/lib/roadmap-admin";
import { REGIONS, regionLabel } from "@/lib/regions";

export const OPPORTUNITY_KINDS = [
  { value: "job", label: "Job", plural: "Jobs" },
  { value: "internship", label: "Internship", plural: "Internships" },
  { value: "scholarship", label: "Scholarship", plural: "Scholarships" },
  { value: "grant", label: "Grant", plural: "Grants" },
  { value: "gig", label: "Gig", plural: "Gigs" },
] as const;

export type OpportunityKind = (typeof OPPORTUNITY_KINDS)[number]["value"];

export const OPPORTUNITY_STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" },
] as const;

export type OpportunityStatus = (typeof OPPORTUNITY_STATUSES)[number]["value"];

export function kindLabel(kind: string) {
  return OPPORTUNITY_KINDS.find((k) => k.value === kind)?.label ?? "Opportunity";
}

export function fieldLabel(field: string): string | null {
  return FIELD_CATEGORIES.find((f) => f.value === field)?.label ?? null;
}

export function trackLabel(track: string): string | null {
  return TRACKS.find((t) => t.value === track)?.label ?? null;
}

/** The public shape of an opportunity, as the board and detail pages read it. */
export type Opportunity = {
  id: string;
  slug: string;
  kind: string;
  title: string;
  summary: string | null;
  description: string;
  organisation_name: string;
  apply_url: string | null;
  apply_instructions: string | null;
  location: string | null;
  region: string | null;
  is_remote: boolean;
  deadline: string | null;
  eligibility: string | null;
  fields: string[];
  skills: string[];
  tracks: string[];
  compensation_note: string | null;
  published_at: string | null;
  updated_at: string;
};

export const OPPORTUNITY_COLUMNS =
  "id, slug, kind, title, summary, description, organisation_name, apply_url, apply_instructions, location, region, is_remote, deadline, eligibility, fields, skills, tracks, compensation_note, published_at, updated_at";

/** Reasons a learner can give when reporting a post. */
export const OPPORTUNITY_REPORT_REASONS = [
  "Asks for money to apply or start",
  "Not real or misleading",
  "Already closed or filled",
  "Offensive or unsafe",
  "Something else",
] as const;

// Accra dates -------------------------------------------------------------------

const ACCRA_DATE = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Africa/Accra",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Today's date in Accra as YYYY-MM-DD: the same day the database uses for deadlines. */
export function accraToday(now: Date = new Date()): string {
  return ACCRA_DATE.format(now);
}

/** Adds whole days to a YYYY-MM-DD date. */
export function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Whole days from `today` to `deadline` (0 = closes today, negative = past). */
export function daysUntil(deadline: string, today: string): number {
  return Math.round((Date.parse(`${deadline}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86_400_000);
}

/** Open to the public: no deadline, or the deadline is today or later (Accra). */
export function isOpenOn(o: { deadline: string | null }, today: string): boolean {
  return o.deadline === null || o.deadline >= today;
}

/**
 * Seconds until the next midnight in Accra, so cached board data expires the
 * moment a deadline passes. Accra keeps UTC all year, but this asks Intl
 * rather than assuming it.
 */
export function secondsToAccraMidnight(now: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Accra",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  const elapsed = get("hour") * 3600 + get("minute") * 60 + get("second");
  return Math.max(1, 86_400 - elapsed);
}

/** "Closes 14 Nov 2026", "Closes today", "Closes tomorrow" or "No fixed deadline". */
export function deadlineLabel(deadline: string | null, today: string): string {
  if (!deadline) return "No fixed deadline";
  const days = daysUntil(deadline, today);
  if (days === 0) return "Closes today";
  if (days === 1) return "Closes tomorrow";
  if (days < 0) return `Closed ${formatDate(deadline)}`;
  return `Closes ${formatDate(deadline)}`;
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date.slice(0, 10)}T00:00:00Z`),
  );
}

/** "Remote", "Tamale, Northern", "Northern or remote". */
export function locationLabel(o: { location: string | null; region: string | null; is_remote: boolean }): string {
  const region = regionLabel(o.region);
  const where = [...new Set([o.location, region].filter((p): p is string => !!p))].join(", ");
  if (o.is_remote) return where ? `${where} or remote` : "Remote";
  return where || "Location not given";
}

// Filters --------------------------------------------------------------------------

export const DEADLINE_FILTERS = [
  { value: "week", label: "Closing within 7 days", days: 7 },
  { value: "month", label: "Closing within 30 days", days: 30 },
  { value: "open-ended", label: "No fixed deadline", days: null },
] as const;

export type OpportunityFilters = {
  kind: OpportunityKind | null;
  field: string | null;
  /** "remote" or a region slug. */
  location: string | null;
  deadline: (typeof DEADLINE_FILTERS)[number]["value"] | null;
  view: "cards" | "table";
};

type Params = Record<string, string | string[] | undefined>;

function one(params: Params, key: string): string {
  const v = params[key];
  return (Array.isArray(v) ? v[0] : v)?.trim() ?? "";
}

/** Reads filters from the query string; anything unknown is ignored rather than an error. */
export function parseFilters(params: Params): OpportunityFilters {
  const kind = one(params, "type");
  const field = one(params, "field");
  const location = one(params, "location");
  const deadline = one(params, "deadline");
  return {
    kind: OPPORTUNITY_KINDS.find((k) => k.value === kind)?.value ?? null,
    field: FIELD_CATEGORIES.some((f) => f.value === field) ? field : null,
    location: location === "remote" || REGIONS.some((r) => r.slug === location) ? location : null,
    deadline: DEADLINE_FILTERS.find((d) => d.value === deadline)?.value ?? null,
    view: one(params, "view") === "table" ? "table" : "cards",
  };
}

export function hasActiveFilters(f: OpportunityFilters): boolean {
  return !!(f.kind || f.field || f.location || f.deadline);
}

/** The query string for a set of filters (empty values left out). */
export function filtersQuery(f: Partial<OpportunityFilters>): string {
  const q = new URLSearchParams();
  if (f.kind) q.set("type", f.kind);
  if (f.field) q.set("field", f.field);
  if (f.location) q.set("location", f.location);
  if (f.deadline) q.set("deadline", f.deadline);
  if (f.view === "table") q.set("view", "table");
  const s = q.toString();
  return s ? `?${s}` : "";
}

/** Soonest deadline first, open ended last; newest first within a day. */
export function sortForBoard<T extends Pick<Opportunity, "deadline" | "published_at">>(list: T[]): T[] {
  return [...list].sort((a, b) => {
    if (a.deadline !== b.deadline) {
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return a.deadline < b.deadline ? -1 : 1;
    }
    return (b.published_at ?? "").localeCompare(a.published_at ?? "");
  });
}

/** Applies the board filters and hides anything past its deadline. */
export function filterOpportunities<T extends Opportunity>(list: T[], f: OpportunityFilters, today: string): T[] {
  const window = DEADLINE_FILTERS.find((d) => d.value === f.deadline);
  return sortForBoard(
    list.filter((o) => {
      if (!isOpenOn(o, today)) return false;
      if (f.kind && o.kind !== f.kind) return false;
      if (f.field && !o.fields.includes(f.field)) return false;
      if (f.location === "remote" && !o.is_remote) return false;
      if (f.location && f.location !== "remote" && o.region !== f.location) return false;
      if (window) {
        if (window.days === null) return o.deadline === null;
        if (!o.deadline || o.deadline > addDays(today, window.days)) return false;
      }
      return true;
    }),
  );
}

// Suggestions --------------------------------------------------------------------

/**
 * Opportunities that suit the learner's path: tagged with one of their
 * tracks (the main track first, then a starter track), open today and not
 * already saved. Verified skills join the match later (#158).
 */
export function suggestFor<T extends Opportunity>(
  list: T[],
  tracks: string[],
  options: { today: string; exclude?: Iterable<string>; limit?: number },
): T[] {
  if (!tracks.length) return [];
  const skip = new Set(options.exclude ?? []);
  const rank = (o: T) => {
    const i = tracks.findIndex((t) => o.tracks.includes(t));
    return i === -1 ? Infinity : i;
  };
  return sortForBoard(list.filter((o) => isOpenOn(o, options.today) && !skip.has(o.id) && rank(o) !== Infinity))
    .sort((a, b) => rank(a) - rank(b))
    .slice(0, options.limit ?? 3);
}

// Structured data ------------------------------------------------------------------

/** Kinds Google treats as job postings. Scholarships, grants and gigs get none. */
export function isJobPosting(kind: string): boolean {
  return kind === "job" || kind === "internship";
}

/**
 * schema.org JobPosting for a job or internship, or null for other kinds.
 * Only facts we hold: no salary, and employment type only where the kind
 * says it (an internship).
 */
export function jobPostingJsonLd(o: Opportunity, url: string): Record<string, unknown> | null {
  if (!isJobPosting(o.kind)) return null;
  const region = regionLabel(o.region);
  const hasPlace = !!(o.location || region);
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: o.title,
    description: o.description,
    datePosted: (o.published_at ?? o.updated_at).slice(0, 10),
    ...(o.deadline ? { validThrough: `${o.deadline}T23:59:59+00:00` } : {}),
    ...(o.kind === "internship" ? { employmentType: "INTERN" } : {}),
    hiringOrganization: { "@type": "Organization", name: o.organisation_name },
    ...(hasPlace
      ? {
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              ...(o.location ? { addressLocality: o.location } : {}),
              ...(region ? { addressRegion: region } : {}),
              addressCountry: "GH",
            },
          },
        }
      : {}),
    ...(o.is_remote
      ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "Ghana" } }
      : {}),
    directApply: false,
    url,
  };
}

/** JSON for a <script type="application/ld+json">, safe to inline in HTML. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
