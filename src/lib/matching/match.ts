/**
 * Matching (epic #320, issue #336): the match score that ranks opportunities
 * for a learner, the plain words that explain it, and the admin audit's
 * rates by group. Mirrors private.match_weights(),
 * private.opportunity_required_skills() and private.opportunity_match() in
 * supabase/migrations/20261114900000_matching.sql (a unit test keeps the
 * bonus equal). Model card: docs/readiness.md, "Matching". Pure.
 *
 * Match score = the learner's best readiness score among the roadmaps of
 * the opportunity's tracks, plus SKILL_BONUS for each required skill they
 * have verified, capped at 100. It only ranks: no listing is ever hidden.
 */
import { enough } from "@/lib/insights/metrics";
import { bandFor, bandLabel, type Band } from "@/lib/readiness/score";

/** A proposal for founder review. Change it here AND in a new migration. */
export const MATCH_WEIGHTS = { skill_bonus: 5 } as const;

/** A published skill and the tracks (roadmaps.track and roadmap slugs) it is mapped to. */
export type CatalogueSkill = { id: string; slug: string; name: string; tracks: string[] };

/** The learner's readiness on one roadmap (public.my_match_readiness). */
export type TrackReadiness = {
  roadmap_slug: string;
  roadmap_title: string;
  /** roadmaps.track, which is what opportunities are tagged with. */
  track: string | null;
  score: number;
  band: string;
  topics_done: number;
  topics_total: number;
};

export type LearnerContext = { readiness: TrackReadiness[]; verifiedSkillIds: ReadonlySet<string> };

type Listing = { id: string; skills: string[]; tracks: string[] };

export type RequiredSkills = {
  skills: CatalogueSkill[];
  /** "listing": named on the listing; "track": mapped to its tracks; "none": neither. */
  source: "listing" | "track" | "none";
};

const norm = (s: string) => s.trim().toLowerCase();

function onTracks(tracks: string[], o: Pick<Listing, "tracks">): boolean {
  return tracks.some((t) => o.tracks.includes(t));
}

/**
 * The skills an opportunity needs: those the listing names that are in the
 * catalogue (by name or slug, ignoring case); when it names none, the skills
 * mapped to the roadmaps of its tracks. Sorted by name.
 */
export function requiredSkills(o: Pick<Listing, "skills" | "tracks">, catalogue: CatalogueSkill[]): RequiredSkills {
  const named = new Set(o.skills.map(norm));
  const byName = catalogue.filter((s) => named.has(norm(s.name)) || named.has(s.slug));
  const sort = (list: CatalogueSkill[]) => [...list].sort((a, b) => a.name.localeCompare(b.name));
  if (byName.length) return { skills: sort(byName), source: "listing" };
  const byTrack = catalogue.filter((s) => onTracks(s.tracks, o));
  return byTrack.length ? { skills: sort(byTrack), source: "track" } : { skills: [], source: "none" };
}

/** The roadmap readiness that counts for an opportunity: the best among the roadmaps of its tracks. */
export function trackReadiness(o: Pick<Listing, "tracks">, readiness: TrackReadiness[]): TrackReadiness | null {
  let best: TrackReadiness | null = null;
  for (const r of readiness) {
    const tagged = (r.track !== null && o.tracks.includes(r.track)) || o.tracks.includes(r.roadmap_slug);
    if (!tagged) continue;
    if (!best || r.score > best.score || (r.score === best.score && r.roadmap_slug < best.roadmap_slug)) best = r;
  }
  return best;
}

export type NextStep =
  | { kind: "skill"; skill: CatalogueSkill }
  | { kind: "topic"; roadmap_slug: string; roadmap_title: string }
  | { kind: "track"; track: string };

export type Match = {
  /** Null when there is nothing to rank on: no readiness for its tracks and no required skill verified. */
  score: number | null;
  band: Band | null;
  readiness: TrackReadiness | null;
  required: RequiredSkills;
  verified: CatalogueSkill[];
  missing: CatalogueSkill[];
  next: NextStep | null;
};

/** The same arithmetic as private.opportunity_match(). */
export function computeMatch(o: Listing, ctx: LearnerContext, catalogue: CatalogueSkill[]): Match {
  const required = requiredSkills(o, catalogue);
  const verified = required.skills.filter((s) => ctx.verifiedSkillIds.has(s.id));
  const missing = required.skills.filter((s) => !ctx.verifiedSkillIds.has(s.id));
  const readiness = trackReadiness(o, ctx.readiness);
  const score =
    readiness === null && verified.length === 0
      ? null
      : Math.min(100, (readiness?.score ?? 0) + verified.length * MATCH_WEIGHTS.skill_bonus);
  return { score, band: score === null ? null : bandFor(score), readiness, required, verified, missing, next: nextStep(o, readiness, missing) };
}

/** What would raise the fit most: the next skill to verify, else the next topic, else starting the track. */
function nextStep(o: Pick<Listing, "tracks">, readiness: TrackReadiness | null, missing: CatalogueSkill[]): NextStep | null {
  if (missing.length) return { kind: "skill", skill: missing[0] };
  if (readiness && readiness.topics_done < readiness.topics_total) {
    return { kind: "topic", roadmap_slug: readiness.roadmap_slug, roadmap_title: readiness.roadmap_title };
  }
  if (!readiness && o.tracks.length) return { kind: "track", track: o.tracks[0] };
  return null;
}

/**
 * Orders listings for one learner: highest match first, unmatched last, and
 * the incoming order kept within a tie. Never drops a listing.
 */
export function rankForLearner<T extends Listing>(list: T[], ctx: LearnerContext, catalogue: CatalogueSkill[]): { o: T; match: Match }[] {
  return list
    .map((o, i) => ({ o, match: computeMatch(o, ctx, catalogue), i }))
    .sort((a, b) => (b.match.score ?? -1) - (a.match.score ?? -1) || a.i - b.i)
    .map(({ o, match }) => ({ o, match }));
}

/** A list in plain words: "A", "A and B", "A, B and C". */
export function listWords(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

/**
 * "Why this fits you", in plain words: the verified skills that match and
 * the readiness band for the track. Never the score or its parts.
 */
export function whyItFits(m: Match, trackName: (track: string) => string | null): string[] {
  const lines: string[] = [];
  if (m.verified.length) {
    const of = m.required.skills.length > m.verified.length ? ` (${m.verified.length} of the ${m.required.skills.length} it needs)` : "";
    lines.push(`You have verified ${listWords(m.verified.map((s) => s.name))}${of}.`);
  }
  if (m.readiness) {
    const track = m.readiness.track ? trackName(m.readiness.track) : null;
    lines.push(`Your readiness for ${m.readiness.roadmap_title}${track && track !== m.readiness.roadmap_title ? ` (${track})` : ""}: ${bandLabel(m.readiness.band)}.`);
  }
  return lines;
}

/** "What would improve your fit": one next step, or null when there is nothing left to suggest. */
export function improveFit(m: Match, trackName: (track: string) => string | null): { text: string; href: string } | null {
  const n = m.next;
  if (!n) return null;
  if (n.kind === "skill") return { text: `Verify ${n.skill.name}: take its quiz or send a portfolio piece.`, href: `/skills/${n.skill.slug}` };
  if (n.kind === "topic") return { text: `Finish the next topic in ${n.roadmap_title}.`, href: `/roadmaps/${n.roadmap_slug}` };
  return { text: `Start the ${trackName(n.track) ?? "matching"} track to build your readiness for roles like this.`, href: "/roadmaps" };
}

// Employer reasons --------------------------------------------------------------------------

/** One consenting applicant or listed learner, as the employer function returns them. */
export type SharedReadiness = {
  band: string | null;
  roadmap_title: string | null;
  verified_skills?: string[] | null;
  portfolio_pieces: number | null;
};

/** Plain reasons an employer may see (with consent): band, matching verified skills, approved portfolio pieces. */
export function employerReasons(r: SharedReadiness): string[] {
  const lines: string[] = [];
  if (r.band && r.roadmap_title) lines.push(`${bandLabel(r.band)} in ${r.roadmap_title}.`);
  else lines.push("No readiness band for this track yet.");
  const skills = r.verified_skills ?? [];
  if (skills.length) lines.push(`Verified the skills this role needs: ${listWords(skills)}.`);
  const pieces = r.portfolio_pieces ?? 0;
  if (pieces > 0) lines.push(`${pieces} approved portfolio ${pieces === 1 ? "piece" : "pieces"}${r.roadmap_title ? ` for ${r.roadmap_title}` : ""}.`);
  return lines;
}

/** The talent directory column (`[{roadmap_slug, roadmap_title, band, portfolio_pieces}]`), defensively parsed. */
export function parseSharedReadiness(value: unknown): { roadmap_slug: string; roadmap_title: string; band: string; portfolio_pieces: number }[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((v) => {
    if (!v || typeof v !== "object") return [];
    const r = v as Record<string, unknown>;
    if (typeof r.roadmap_slug !== "string" || typeof r.band !== "string") return [];
    return [
      {
        roadmap_slug: r.roadmap_slug,
        roadmap_title: typeof r.roadmap_title === "string" ? r.roadmap_title : r.roadmap_slug,
        band: r.band,
        portfolio_pieces: typeof r.portfolio_pieces === "number" ? r.portfolio_pieces : 0,
      },
    ];
  });
}

// Admin audit -------------------------------------------------------------------------------

/** A rate differing from its dimension's rate by more than this (as a share, so 0.1 = 10 points) is flagged. */
export const MATCH_RATE_GAP = 0.1;

export const AUDIT_BANDS = [
  { value: "job_ready", label: "Job ready" },
  { value: "building", label: "Building" },
  { value: "getting_started", label: "Getting started" },
  { value: "none", label: "No readiness for the track" },
] as const;

export function auditBandLabel(value: string): string {
  return AUDIT_BANDS.find((b) => b.value === value)?.label ?? value;
}

export const AUDIT_DIMENSIONS = [
  { value: "band", label: "Readiness band" },
  { value: "region", label: "Region" },
  { value: "device", label: "Usual device" },
  { value: "internet", label: "Internet (About you)" },
  { value: "age", label: "Age band" },
  { value: "education", label: "Education (About you)" },
] as const;

export type FunnelRow = { dimension: string; grp: string; shown: number; applied: number; shortlisted: number; hired: number };

export const RATES = [
  { key: "applyRate", label: "Applied", of: "shown" },
  { key: "shortlistRate", label: "Shortlisted", of: "applied" },
  { key: "hireRate", label: "Hired", of: "applied" },
] as const;
type RateKey = (typeof RATES)[number]["key"];

export type RateLine = FunnelRow & Record<RateKey, number | null> & { gaps: Record<RateKey, number | null>; flagged: boolean };
export type AuditDimension = { dimension: string; label: string; overall: Record<RateKey, number | null>; groups: RateLine[]; flags: number };

function rates(r: Pick<FunnelRow, "shown" | "applied" | "shortlisted" | "hired">): Record<RateKey, number | null> {
  return {
    applyRate: enough(r.shown) ? r.applied / r.shown : null,
    shortlistRate: enough(r.applied) ? r.shortlisted / r.applied : null,
    hireRate: enough(r.applied) ? r.hired / r.applied : null,
  };
}

/**
 * Match rates by group (the readiness fairness groups): applied of shown,
 * shortlisted and hired of applied. A rate needs MIN_SAMPLE cases or it is
 * null, and a group is flagged when any rate differs from its dimension's
 * rate by more than MATCH_RATE_GAP.
 */
export function matchFairness(rows: FunnelRow[]): AuditDimension[] {
  return AUDIT_DIMENSIONS.map(({ value, label }) => {
    const mine = rows.filter((r) => r.dimension === value);
    const sum = (k: "shown" | "applied" | "shortlisted" | "hired") => mine.reduce((a, r) => a + r[k], 0);
    const overall = rates({ shown: sum("shown"), applied: sum("applied"), shortlisted: sum("shortlisted"), hired: sum("hired") });
    const groups = mine
      .map((r) => {
        const own = rates(r);
        const gaps = Object.fromEntries(
          RATES.map(({ key }) => [key, own[key] !== null && overall[key] !== null ? own[key]! - overall[key]! : null]),
        ) as Record<RateKey, number | null>;
        const flagged = Object.values(gaps).some((g) => g !== null && Math.abs(g) > MATCH_RATE_GAP);
        return { ...r, ...own, gaps, flagged };
      })
      .sort((a, b) => b.shown - a.shown || a.grp.localeCompare(b.grp));
    return { dimension: value, label, overall, groups, flags: groups.filter((g) => g.flagged).length };
  });
}

export type AuditRow = {
  opportunity_id: string;
  title: string;
  organisation_name: string;
  band: string;
  shown: number;
  applied: number;
  shortlisted: number;
  hired: number;
};

export type AuditOpportunity = {
  id: string;
  title: string;
  organisation_name: string;
  totals: Pick<FunnelRow, "shown" | "applied" | "shortlisted" | "hired">;
  bands: AuditRow[];
};

/** Groups the per band rows by opportunity, bands in AUDIT_BANDS order, most shown first. */
export function auditByOpportunity(rows: AuditRow[]): AuditOpportunity[] {
  const byId = new Map<string, AuditOpportunity>();
  for (const r of rows) {
    const o = byId.get(r.opportunity_id) ?? {
      id: r.opportunity_id,
      title: r.title,
      organisation_name: r.organisation_name,
      totals: { shown: 0, applied: 0, shortlisted: 0, hired: 0 },
      bands: [],
    };
    o.bands.push(r);
    o.totals.shown += r.shown;
    o.totals.applied += r.applied;
    o.totals.shortlisted += r.shortlisted;
    o.totals.hired += r.hired;
    byId.set(r.opportunity_id, o);
  }
  const order = (b: string) => {
    const i = AUDIT_BANDS.findIndex((x) => x.value === b);
    return i === -1 ? AUDIT_BANDS.length : i;
  };
  return [...byId.values()]
    .map((o) => ({ ...o, bands: o.bands.sort((a, b) => order(a.band) - order(b.band)) }))
    .sort((a, b) => b.totals.shown - a.totals.shown || a.title.localeCompare(b.title));
}
