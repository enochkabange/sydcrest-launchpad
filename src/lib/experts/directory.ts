/**
 * The /experts directory: filters from the URL, matching and ranking. Pure
 * functions over rows already read from `public_experts` and `offers`, so the
 * whole behaviour is unit tested. The view is a security definer function,
 * so filters would not push down into SQL anyway; the directory is small
 * enough to load once per request and work on in memory. Move matching into
 * SQL (or a search index) when the list grows past a few hundred experts.
 */
import { categoryLabel, isExpertCategory } from "./categories";
import { isOfferKind, offerKindLabel, type OfferKind } from "./offers";

/** One approved expert, from `public_experts`, with nulls normalised. */
export type DirectoryExpert = {
  profileId: string;
  slug: string;
  name: string;
  avatarUrl: string | null;
  headline: string;
  bio: string | null;
  skills: string[];
  categories: string[];
  links: string[];
  languages: string[];
  region: string | null;
  availabilityNote: string | null;
  acceptingRequests: boolean;
  offersFreeIntro: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  approvedAt: string | null;
  completedBookings: number;
  reviewCount: number;
  /** Null until the first visible review. */
  averageRating: number | null;
  /** Null until three requests were answered in the last 180 days. */
  medianResponseHours: number | null;
  /** Kinds of the expert's active offers. */
  offerKinds: OfferKind[];
  /** Titles of active offers, for search. */
  offerTitles: string[];
  /**
   * Skills SydCrest has verified (#165). Empty until that feature fills it;
   * the `verifiedSkill` ranking signal already reads it.
   */
  verifiedSkills: string[];
};

export type PublicExpertRow = {
  profile_id: string | null;
  slug: string | null;
  display_name: string | null;
  avatar_url: string | null;
  headline: string | null;
  bio: string | null;
  skills: string[] | null;
  categories: string[] | null;
  links: string[] | null;
  languages: string[] | null;
  region: string | null;
  availability_note: string | null;
  accepting_requests: boolean | null;
  offers_free_intro: boolean | null;
  is_verified: boolean | null;
  is_featured: boolean | null;
  approved_at: string | null;
  completed_bookings: number | null;
  review_count: number | null;
  average_rating: number | null;
  median_response_hours: number | null;
};

export type OfferSummaryRow = { expert_id: string; kind: string; title: string };

export function toDirectoryExpert(row: PublicExpertRow, offers: OfferSummaryRow[] = []): DirectoryExpert | null {
  if (!row.profile_id || !row.slug) return null;
  const own = offers.filter((o) => o.expert_id === row.profile_id);
  const kinds = [...new Set(own.map((o) => o.kind).filter(isOfferKind))];
  return {
    profileId: row.profile_id,
    slug: row.slug,
    name: row.display_name?.trim() || "SydCrest expert",
    avatarUrl: row.avatar_url,
    headline: row.headline ?? "",
    bio: row.bio,
    skills: row.skills ?? [],
    categories: row.categories ?? [],
    links: row.links ?? [],
    languages: row.languages ?? [],
    region: row.region,
    availabilityNote: row.availability_note,
    acceptingRequests: row.accepting_requests ?? false,
    offersFreeIntro: row.offers_free_intro ?? false,
    isVerified: row.is_verified ?? false,
    isFeatured: row.is_featured ?? false,
    approvedAt: row.approved_at,
    completedBookings: row.completed_bookings ?? 0,
    reviewCount: row.review_count ?? 0,
    averageRating: row.average_rating === null ? null : Number(row.average_rating),
    medianResponseHours: row.median_response_hours === null ? null : Number(row.median_response_hours),
    offerKinds: kinds,
    offerTitles: own.map((o) => o.title),
    verifiedSkills: [],
  };
}

// Filters ---------------------------------------------------------------------------------------

export const SORTS = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Highest rated" },
  { value: "sessions", label: "Most sessions" },
  { value: "newest", label: "Newest" },
] as const;
export type Sort = (typeof SORTS)[number]["value"];

export const AVAILABILITY = [
  { value: "accepting", label: "Taking requests now" },
  { value: "free_intro", label: "Offers a free intro call" },
] as const;
export type Availability = (typeof AVAILABILITY)[number]["value"];

export const RATINGS = [
  { value: "4.5", label: "4.5 and up" },
  { value: "4", label: "4 and up" },
  { value: "3", label: "3 and up" },
] as const;

export type Filters = {
  q: string;
  skill: string;
  category: string;
  kind: OfferKind | "";
  availability: Availability | "";
  minRating: number | null;
  sort: Sort;
};

export const NO_FILTERS: Filters = {
  q: "",
  skill: "",
  category: "",
  kind: "",
  availability: "",
  minRating: null,
  sort: "recommended",
};

type Params = Record<string, string | string[] | undefined>;

function one(params: Params, key: string): string {
  const v = params[key];
  return (Array.isArray(v) ? v[0] : v)?.trim() ?? "";
}

/** Reads filters from search params, dropping anything unknown or malformed. */
export function parseFilters(params: Params): Filters {
  const kind = one(params, "type");
  const availability = one(params, "availability");
  const rating = one(params, "rating");
  const sort = one(params, "sort");
  const category = one(params, "category");
  return {
    q: one(params, "q").slice(0, 100),
    skill: one(params, "skill").slice(0, 60),
    category: isExpertCategory(category) ? category : "",
    kind: isOfferKind(kind) ? kind : "",
    availability: AVAILABILITY.some((a) => a.value === availability) ? (availability as Availability) : "",
    minRating: RATINGS.some((r) => r.value === rating) ? Number(rating) : null,
    sort: SORTS.some((s) => s.value === sort) ? (sort as Sort) : "recommended",
  };
}

/** True when any filter narrows the list (sort alone does not). */
export function isFiltered(f: Filters): boolean {
  return Boolean(f.q || f.skill || f.category || f.kind || f.availability || f.minRating !== null);
}

/** The URL for a set of filters, without defaults, so links stay short and canonical. */
export function filtersHref(f: Partial<Filters>, base = "/experts"): string {
  const params = new URLSearchParams();
  if (f.q) params.set("q", f.q);
  if (f.skill) params.set("skill", f.skill);
  if (f.category) params.set("category", f.category);
  if (f.kind) params.set("type", f.kind);
  if (f.availability) params.set("availability", f.availability);
  if (f.minRating !== null && f.minRating !== undefined) params.set("rating", String(f.minRating));
  if (f.sort && f.sort !== "recommended") params.set("sort", f.sort);
  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

const fold = (s: string) => s.toLocaleLowerCase("en").normalize("NFKD").replace(/[̀-ͯ]/g, "");

function haystack(e: DirectoryExpert): string {
  return fold(
    [
      e.name,
      e.headline,
      e.bio ?? "",
      ...e.skills,
      ...e.categories.map((c) => categoryLabel(c) ?? c),
      ...e.offerKinds.map(offerKindLabel),
      ...e.offerTitles,
    ].join(" \n "),
  );
}

export function matches(e: DirectoryExpert, f: Filters): boolean {
  if (f.skill && !e.skills.some((s) => fold(s) === fold(f.skill))) return false;
  if (f.category && !e.categories.includes(f.category)) return false;
  if (f.kind && !e.offerKinds.includes(f.kind)) return false;
  if (f.availability === "accepting" && !e.acceptingRequests) return false;
  if (f.availability === "free_intro" && !(e.offersFreeIntro && e.acceptingRequests)) return false;
  // Unreviewed experts have no rating, so a rating filter honestly leaves them out.
  if (f.minRating !== null && (e.averageRating === null || e.averageRating < f.minRating)) return false;
  if (f.q) {
    const text = haystack(e);
    if (!fold(f.q).split(/\s+/).filter(Boolean).every((word) => text.includes(word))) return false;
  }
  return true;
}

// Ranking ---------------------------------------------------------------------------------------

/**
 * One term of the "recommended" score: a value from 0 to 1 times a weight.
 * Signals see the active filters, so a signal can reward a match (the
 * verified skill boost does). To add a signal, append it to RANK_SIGNALS;
 * nothing else changes.
 */
export type RankSignal = {
  id: string;
  weight: number;
  value: (e: DirectoryExpert, f: Filters) => number;
};

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/** Ratings shrink towards 3.5 until an expert has a few reviews, so one five star review does not top the list. */
export function weightedRating(e: Pick<DirectoryExpert, "averageRating" | "reviewCount">): number {
  const prior = 3.5;
  const strength = 5;
  if (e.averageRating === null || e.reviewCount === 0) return prior;
  return (e.averageRating * e.reviewCount + prior * strength) / (e.reviewCount + strength);
}

export const RANK_SIGNALS: RankSignal[] = [
  { id: "accepting", weight: 3, value: (e) => (e.acceptingRequests ? 1 : 0) },
  { id: "rating", weight: 3, value: (e) => clamp((weightedRating(e) - 1) / 4) },
  { id: "sessions", weight: 2, value: (e) => clamp(Math.log1p(e.completedBookings) / Math.log1p(50)) },
  // Unknown response time is neutral, neither rewarded nor punished.
  {
    id: "response",
    weight: 1,
    value: (e) => (e.medianResponseHours === null ? 0.5 : clamp(1 - e.medianResponseHours / 72)),
  },
  { id: "verified", weight: 1.5, value: (e) => (e.isVerified ? 1 : 0) },
  { id: "freeIntro", weight: 0.5, value: (e) => (e.offersFreeIntro ? 1 : 0) },
  /**
   * #165: SydCrest verified skills. Full credit for a verified skill that
   * matches the skill filter or search, half credit for any verified skill.
   * Zero for everyone until `verifiedSkills` is filled from the database.
   */
  {
    id: "verifiedSkill",
    weight: 2,
    value: (e, f) => {
      if (e.verifiedSkills.length === 0) return 0;
      const wanted = [f.skill, ...f.q.split(/\s+/)].filter(Boolean).map(fold);
      const hit = e.verifiedSkills.some((s) => wanted.some((w) => fold(s).includes(w)));
      return hit ? 1 : 0.5;
    },
  },
];

export function score(e: DirectoryExpert, f: Filters, signals: RankSignal[] = RANK_SIGNALS): number {
  return signals.reduce((sum, s) => sum + s.weight * s.value(e, f), 0);
}

/** Stable last resort: longest listed first, then slug, so pages and tests never shuffle. */
function tiebreak(a: DirectoryExpert, b: DirectoryExpert): number {
  const at = a.approvedAt ? Date.parse(a.approvedAt) : Infinity;
  const bt = b.approvedAt ? Date.parse(b.approvedAt) : Infinity;
  return at - bt || a.slug.localeCompare(b.slug);
}

export function rankExperts(
  experts: DirectoryExpert[],
  f: Filters,
  signals: RankSignal[] = RANK_SIGNALS,
): DirectoryExpert[] {
  const list = experts.filter((e) => matches(e, f));
  const by: Record<Sort, (a: DirectoryExpert, b: DirectoryExpert) => number> = {
    recommended: (a, b) => score(b, f, signals) - score(a, f, signals),
    rating: (a, b) => weightedRating(b) - weightedRating(a) || b.reviewCount - a.reviewCount,
    sessions: (a, b) => b.completedBookings - a.completedBookings,
    newest: (a, b) =>
      (b.approvedAt ? Date.parse(b.approvedAt) : 0) - (a.approvedAt ? Date.parse(a.approvedAt) : 0),
  };
  return list.sort((a, b) => by[f.sort](a, b) || tiebreak(a, b));
}

/** Featured experts for the row above the list, best first. Only those taking requests. */
export function featuredExperts(experts: DirectoryExpert[], limit = 3): DirectoryExpert[] {
  return rankExperts(
    experts.filter((e) => e.isFeatured && e.acceptingRequests),
    NO_FILTERS,
  ).slice(0, limit);
}

/** Options for the filter selects, from the experts actually listed. */
export function facets(experts: DirectoryExpert[]) {
  const skills = new Map<string, string>();
  for (const e of experts) for (const s of e.skills) if (!skills.has(fold(s))) skills.set(fold(s), s);
  const categoryCounts = new Map<string, number>();
  for (const e of experts)
    for (const c of e.categories) if (isExpertCategory(c)) categoryCounts.set(c, (categoryCounts.get(c) ?? 0) + 1);
  const kinds = new Set(experts.flatMap((e) => e.offerKinds));
  return {
    skills: [...skills.values()].sort((a, b) => a.localeCompare(b)),
    categories: categoryCounts,
    kinds,
  };
}

// Trust signal copy -----------------------------------------------------------------------------

/** "Usually replies within a day". Null when there is not enough history to say. */
export function responseTimeLabel(hours: number | null): string | null {
  if (hours === null || !Number.isFinite(hours)) return null;
  if (hours <= 1) return "Usually replies within an hour";
  if (hours <= 6) return "Usually replies within a few hours";
  if (hours <= 24) return "Usually replies within a day";
  const days = Math.ceil(hours / 24);
  return `Usually replies within ${days} days`;
}

export function ratingLabel(average: number | null, count: number): string | null {
  if (average === null || count === 0) return null;
  return `${average.toFixed(1)} out of 5 from ${count} ${count === 1 ? "review" : "reviews"}`;
}

export function sessionsLabel(count: number): string | null {
  if (count <= 0) return null;
  return `${count} completed ${count === 1 ? "session" : "sessions"}`;
}
