import { isExpertCategory, type ExpertCategory } from "@/lib/experts/categories";

/**
 * Briefs and pitches (issue #152): form parsing, board filters, expert
 * matching and labels. Pure functions, no I/O, so they are unit tested.
 * Limits mirror the checks on `briefs` and `pitches` in the
 * earn_bookings_briefs migration. Budgets and prices are whole cedis and
 * display only: nothing here charges anyone.
 */

export const TITLE_MAX = 120;
export const DESCRIPTION_MAX = 4000;
export const SKILLS_MAX = 20;
export const SKILL_MAX = 60;
export const CATEGORIES_MAX = 5;
export const LOCATION_MAX = 120;
export const MESSAGE_MAX = 3000;
export const TIMELINE_MAX = 300;
export const BUDGET_MAX = 1_000_000;

export const BRIEF_KINDS = [
  { kind: "advice", label: "Advice", detail: "Ask an expert for guidance, a review or a session." },
  { kind: "job", label: "Job", detail: "A piece of work for your organisation." },
] as const;

export type BriefKind = (typeof BRIEF_KINDS)[number]["kind"];

export function isBriefKind(value: string): value is BriefKind {
  return BRIEF_KINDS.some((k) => k.kind === value);
}

export function briefKindLabel(kind: string): string {
  return BRIEF_KINDS.find((k) => k.kind === kind)?.label ?? "Brief";
}

const BRIEF_STATUS: Record<string, string> = {
  open: "Open",
  closed: "Closed",
  awarded: "Awarded",
  cancelled: "Cancelled",
};

const PITCH_STATUS: Record<string, string> = {
  submitted: "Waiting for a reply",
  accepted: "Accepted",
  declined: "Not chosen",
  withdrawn: "Withdrawn",
};

export function briefStatusLabel(status: string): string {
  return BRIEF_STATUS[status] ?? status;
}

export function pitchStatusLabel(status: string): string {
  return PITCH_STATUS[status] ?? status;
}

/** Tone classes for a status pill (semantic tokens only). */
export function statusTone(status: string): string {
  switch (status) {
    case "open":
    case "submitted":
      return "bg-info-bg text-info-fg";
    case "awarded":
    case "accepted":
      return "bg-success-bg text-success-fg";
    default:
      return "bg-surface-sunken text-content-2";
  }
}

/** "GHS 1,500 (indicative)", or null when no budget was given. Display only. */
export function budgetLabel(ghs: number | null | undefined): string | null {
  if (ghs === null || ghs === undefined) return null;
  return `GHS ${ghs.toLocaleString("en-GH")} (indicative)`;
}

// Form parsing -------------------------------------------------------------------------

type FieldErrors = Partial<Record<string, string>>;

function text(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Splits a comma or new line separated skills field: trimmed, deduplicated
 * ignoring case (first spelling wins), empty items dropped.
 */
export function parseSkills(raw: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const part of raw.split(/[,\n]/)) {
    const skill = part.trim().replace(/\s+/g, " ");
    const key = skill.toLowerCase();
    if (!skill || seen.has(key)) continue;
    seen.add(key);
    out.push(skill);
  }
  return out;
}

/** A whole number of cedis, or null for an empty field. Returns NaN for anything invalid. */
export function parseCedis(raw: string): number | null {
  const cleaned = raw.replace(/[,\s]/g, "").replace(/^GHS/i, "");
  if (!cleaned) return null;
  if (!/^\d+$/.test(cleaned)) return Number.NaN;
  const n = Number(cleaned);
  return n <= BUDGET_MAX ? n : Number.NaN;
}

/** Today in Accra (UTC, no daylight saving) as YYYY-MM-DD. */
export function accraToday(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export type BriefInput = {
  kind: BriefKind;
  organisation_id: string | null;
  title: string;
  description: string;
  skills: string[];
  categories: ExpertCategory[];
  indicative_budget_ghs: number | null;
  location: string | null;
  is_remote: boolean;
  deadline: string | null;
};

/**
 * Validates the new brief form. `postableOrgs` are the verified
 * organisations the poster may post a job for; a job brief must name one.
 */
export function parseBrief(
  form: FormData,
  postableOrgs: string[],
  now = new Date(),
): { data: BriefInput | null; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const kindRaw = text(form, "kind") || "advice";
  const kind: BriefKind = isBriefKind(kindRaw) ? kindRaw : "advice";
  if (!isBriefKind(kindRaw)) errors.kind = "Choose advice or job.";

  let organisationId: string | null = null;
  if (kind === "job") {
    const org = text(form, "organisation_id");
    if (!org || !postableOrgs.includes(org)) errors.organisation_id = "Choose the organisation this job is for.";
    else organisationId = org;
  }

  const title = text(form, "title");
  if (!title) errors.title = "Give your brief a short title.";
  else if (title.length > TITLE_MAX) errors.title = `Keep the title under ${TITLE_MAX} characters.`;

  const description = text(form, "description");
  if (description.length < 20) errors.description = "Describe what you need in a few sentences.";
  else if (description.length > DESCRIPTION_MAX) errors.description = `Keep the description under ${DESCRIPTION_MAX} characters.`;

  const skills = parseSkills(text(form, "skills"));
  if (skills.length === 0) errors.skills = "Add at least one skill, so the right experts hear about it.";
  else if (skills.length > SKILLS_MAX) errors.skills = `Add up to ${SKILLS_MAX} skills.`;
  else if (skills.some((s) => s.length > SKILL_MAX)) errors.skills = `Keep each skill under ${SKILL_MAX} characters.`;

  const categories = [...new Set(form.getAll("categories").filter((c): c is string => typeof c === "string"))];
  if (categories.some((c) => !isExpertCategory(c))) errors.categories = "Choose categories from the list.";
  else if (categories.length > CATEGORIES_MAX) errors.categories = `Choose up to ${CATEGORIES_MAX} categories.`;

  const budget = parseCedis(text(form, "budget"));
  if (Number.isNaN(budget)) errors.budget = "Enter a whole number of cedis, or leave it empty.";

  const location = text(form, "location");
  if (location.length > LOCATION_MAX) errors.location = `Keep the location under ${LOCATION_MAX} characters.`;

  const deadline = text(form, "deadline");
  if (deadline) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(deadline) || Number.isNaN(Date.parse(deadline))) errors.deadline = "Enter a valid date.";
    else if (deadline < accraToday(now)) errors.deadline = "Choose today or a later date.";
  }

  const isRemote = form.get("is_remote") === "on";
  if (!isRemote && !location) errors.location = "Say where the work happens, or tick remote.";

  if (Object.keys(errors).length) return { data: null, errors };
  return {
    data: {
      kind,
      organisation_id: organisationId,
      title,
      description,
      skills,
      categories: categories as ExpertCategory[],
      indicative_budget_ghs: budget,
      location: location || null,
      is_remote: isRemote,
      deadline: deadline || null,
    },
    errors,
  };
}

export type PitchInput = {
  message: string;
  proposed_timeline: string | null;
  indicative_price_ghs: number | null;
  offer_id: string | null;
};

/** Validates the pitch form. `offerIds` are the expert's own active offers. */
export function parsePitch(form: FormData, offerIds: string[]): { data: PitchInput | null; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const message = text(form, "message");
  if (message.length < 20) errors.message = "Tell the poster how you would help, in a few sentences.";
  else if (message.length > MESSAGE_MAX) errors.message = `Keep your message under ${MESSAGE_MAX} characters.`;

  const timeline = text(form, "timeline");
  if (timeline.length > TIMELINE_MAX) errors.timeline = `Keep the timeline under ${TIMELINE_MAX} characters.`;

  const price = parseCedis(text(form, "price"));
  if (Number.isNaN(price)) errors.price = "Enter a whole number of cedis, or leave it empty.";

  const offer = text(form, "offer_id");
  if (offer && !offerIds.includes(offer)) errors.offer_id = "Choose one of your own offers.";

  if (Object.keys(errors).length) return { data: null, errors };
  return {
    data: { message, proposed_timeline: timeline || null, indicative_price_ghs: price, offer_id: offer || null },
    errors,
  };
}

// Board filters -------------------------------------------------------------------------

export type BoardFilters = { kind: BriefKind | ""; skill: string };

type Params = Record<string, string | string[] | undefined>;

function one(params: Params, key: string): string {
  const v = params[key];
  return (Array.isArray(v) ? v[0] : v)?.trim() ?? "";
}

export function parseBoardFilters(params: Params): BoardFilters {
  const kind = one(params, "kind");
  return { kind: isBriefKind(kind) ? kind : "", skill: one(params, "skill").slice(0, SKILL_MAX) };
}

export function boardHref(f: Partial<BoardFilters>, base = "/briefs"): string {
  const params = new URLSearchParams();
  if (f.kind) params.set("kind", f.kind);
  if (f.skill) params.set("skill", f.skill);
  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

type FilterableBrief = { kind: string | null; skills: string[] | null };

export function matchesBoard(b: FilterableBrief, f: BoardFilters): boolean {
  if (f.kind && b.kind !== f.kind) return false;
  if (f.skill) {
    const want = f.skill.toLowerCase();
    if (!(b.skills ?? []).some((s) => s.toLowerCase() === want)) return false;
  }
  return true;
}

/** Skills on the listed briefs, most used first, for the skill filter. */
export function skillFacets(briefs: FilterableBrief[], limit = 40): string[] {
  const counts = new Map<string, { label: string; n: number }>();
  for (const b of briefs) {
    for (const s of b.skills ?? []) {
      const key = s.toLowerCase();
      const entry = counts.get(key) ?? { label: s, n: 0 };
      entry.n += 1;
      counts.set(key, entry);
    }
  }
  return [...counts.values()]
    .sort((a, b) => b.n - a.n || a.label.localeCompare(b.label))
    .slice(0, limit)
    .map((e) => e.label);
}

// Matching experts ------------------------------------------------------------------------

export type MatchableExpert = { profile_id: string; skills: string[] | null; categories: string[] | null };

function normalise(skill: string): string {
  return skill.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Approved experts to tell about a new brief: anyone sharing a skill
 * (ignoring case and spacing). When the brief names no skill an expert
 * shares, a shared category counts instead. Never the poster or anyone in
 * `exclude` (members of the posting organisation, who cannot pitch).
 * Skill matches come first; capped at `limit`.
 */
export function matchExperts(
  brief: { skills: string[]; categories: string[] },
  experts: MatchableExpert[],
  exclude: string[],
  limit = 100,
): string[] {
  const skip = new Set(exclude);
  const wanted = new Set(brief.skills.map(normalise));
  const cats = new Set(brief.categories);
  const bySkill: string[] = [];
  const byCategory: string[] = [];
  for (const e of experts) {
    if (skip.has(e.profile_id)) continue;
    if ((e.skills ?? []).some((s) => wanted.has(normalise(s)))) bySkill.push(e.profile_id);
    else if ((e.categories ?? []).some((c) => cats.has(c))) byCategory.push(e.profile_id);
  }
  return [...bySkill, ...byCategory].slice(0, limit);
}

/** Short, friendly date for a deadline or a posted day, in Accra time. */
export function formatDate(iso: string): string {
  return new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Accra",
  });
}
