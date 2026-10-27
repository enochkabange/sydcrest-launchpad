import type { FieldErrors } from "@/lib/validation";
import { isRegionSlug, type RegionSlug } from "@/lib/regions";
import { parseSkills, SLUG_PATTERN } from "@/lib/social/public-profile";

/**
 * Parsing for the expert application and the expert profile (issue #149).
 * Every limit mirrors a check constraint on expert_profiles or
 * expert_applications, so the database never has to reject a form with a raw
 * error. Pure: no server code, unit tested.
 */

export const LIMITS = {
  headline: 120,
  bio: 3000,
  skills: 30,
  skillLength: 40,
  links: 10,
  languages: 10,
  availabilityNote: 300,
  motivation: 2000,
  experience: 3000,
  url: 2000,
} as const;

export type ApplicationFields = "slug" | "headline" | "skills" | "links" | "evidence_links" | "experience" | "motivation";
export type ProfileFields =
  | "slug"
  | "headline"
  | "bio"
  | "skills"
  | "links"
  | "languages"
  | "region"
  | "availability_note";

export type ExpertProfileInput = {
  slug: string;
  headline: string;
  skills: string[];
  links: string[];
};

export type ApplicationInput = {
  profile: ExpertProfileInput;
  application: { motivation: string; experience: string | null; evidence_links: string[] };
};

export type ExpertProfileUpdate = ExpertProfileInput & {
  bio: string | null;
  languages: string[];
  region: RegionSlug | null;
  availability_note: string | null;
  accepting_requests: boolean;
  offers_free_intro: boolean;
};

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/** Same rule as private.url_ok: a plain http or https address with no spaces or quotes. */
export function isSafeUrl(url: string) {
  return url.length <= LIMITS.url && /^https?:\/\/[^\s<>"]+$/i.test(url);
}

/**
 * One link per line (commas work too). A bare address like "behance.net/hawa"
 * gets https:// in front, which is what people mean.
 */
export function parseLinks(input: string): string[] {
  const seen = new Set<string>();
  const links: string[] = [];
  for (const raw of input.split(/[\n,]/)) {
    let link = raw.trim();
    if (!link) continue;
    if (!/^[a-z][a-z0-9+.-]*:/i.test(link)) link = `https://${link}`;
    if (seen.has(link)) continue;
    seen.add(link);
    links.push(link);
  }
  return links;
}

function checkLinks(links: string[], label: string): string | undefined {
  if (links.length > LIMITS.links) return `Add up to ${LIMITS.links} ${label}.`;
  if (links.some((l) => !isSafeUrl(l))) return "Each link must be a web address starting with http:// or https://.";
  return undefined;
}

function checkSkills(skills: string[]): string | undefined {
  if (!skills.length) return "List at least one skill.";
  if (skills.length > LIMITS.skills) return `List up to ${LIMITS.skills} skills.`;
  if (skills.some((s) => s.length > LIMITS.skillLength)) return `Keep each skill under ${LIMITS.skillLength} characters.`;
  return undefined;
}

/** Turns a name into a link name suggestion: "Hawa Iddrisu" becomes "hawa-iddrisu". */
export function suggestSlug(name: string | null | undefined) {
  const slug = (name ?? "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
    .replace(/-+$/g, "");
  return SLUG_PATTERN.test(slug) ? slug : "";
}

function parseProfileBase(form: FormData) {
  const slug = text(form, "slug").toLowerCase();
  const headline = text(form, "headline");
  const skills = parseSkills(text(form, "skills"));
  const links = parseLinks(text(form, "links"));
  const errors: FieldErrors<"slug" | "headline" | "skills" | "links"> = {};

  if (!SLUG_PATTERN.test(slug)) {
    errors.slug = "Use 3 to 40 lowercase letters, numbers or hyphens, starting and ending with a letter or number.";
  }
  if (!headline) errors.headline = "Add a headline so learners know what you help with.";
  else if (headline.length > LIMITS.headline) errors.headline = `Keep your headline under ${LIMITS.headline} characters.`;
  const skillsError = checkSkills(skills);
  if (skillsError) errors.skills = skillsError;
  const linksError = checkLinks(links, "links");
  if (linksError) errors.links = linksError;

  return { data: { slug, headline, skills, links }, errors };
}

/** The /experts/apply form: the public profile basics plus the review record. */
export function parseApplication(form: FormData) {
  const base = parseProfileBase(form);
  const motivation = text(form, "motivation");
  const experience = text(form, "experience");
  const evidence = parseLinks(text(form, "evidence_links"));
  const errors: FieldErrors<ApplicationFields> = { ...base.errors };

  if (!motivation) errors.motivation = "Tell us why you want to help learners.";
  else if (motivation.length > LIMITS.motivation) errors.motivation = `Keep this under ${LIMITS.motivation} characters.`;
  if (experience.length > LIMITS.experience) errors.experience = `Keep this under ${LIMITS.experience} characters.`;
  if (!evidence.length) errors.evidence_links = "Add at least one link to work you have done.";
  else {
    const evidenceError = checkLinks(evidence, "samples");
    if (evidenceError) errors.evidence_links = evidenceError;
  }

  const data: ApplicationInput = {
    profile: base.data,
    application: { motivation, experience: experience || null, evidence_links: evidence },
  };
  return { data, errors };
}

/** The profile editor on /expert. */
export function parseExpertProfile(form: FormData) {
  const base = parseProfileBase(form);
  const bio = text(form, "bio");
  const languages = parseSkills(text(form, "languages"));
  const region = text(form, "region");
  const availability = text(form, "availability_note");
  const errors: FieldErrors<ProfileFields> = { ...base.errors };

  if (bio.length > LIMITS.bio) errors.bio = `Keep your bio under ${LIMITS.bio} characters.`;
  if (languages.length > LIMITS.languages) errors.languages = `List up to ${LIMITS.languages} languages.`;
  if (region && !isRegionSlug(region)) errors.region = "Choose a region from the list.";
  if (availability.length > LIMITS.availabilityNote) {
    errors.availability_note = `Keep your availability note under ${LIMITS.availabilityNote} characters.`;
  }

  const data: ExpertProfileUpdate = {
    ...base.data,
    bio: bio || null,
    languages,
    region: (region || null) as RegionSlug | null,
    availability_note: availability || null,
    accepting_requests: form.get("accepting_requests") === "on",
    offers_free_intro: form.get("offers_free_intro") === "on",
  };
  return { data, errors };
}

export type ExpertStatus = "pending" | "approved" | "delisted";
export type ApplicationStatus = "submitted" | "approved" | "rejected" | "withdrawn";

/**
 * What the applicant sees, from their expert profile status and latest
 * application. `canApply` is true when a new application is allowed (the
 * database keeps one open application at a time).
 */
export function applicationStage(
  expertStatus: ExpertStatus | null,
  latest: ApplicationStatus | null,
): { stage: "new" | "submitted" | "approved" | "rejected" | "withdrawn" | "delisted"; canApply: boolean } {
  if (expertStatus === "approved") return { stage: "approved", canApply: false };
  if (latest === "submitted") return { stage: "submitted", canApply: false };
  if (expertStatus === "delisted") return { stage: "delisted", canApply: true };
  if (latest === "rejected") return { stage: "rejected", canApply: true };
  if (latest === "withdrawn") return { stage: "withdrawn", canApply: true };
  return { stage: "new", canApply: true };
}

/** Median response hours from public_experts, in words. Null when there is no real data yet. */
export function describeResponseTime(hours: number | null | undefined) {
  if (hours == null || !Number.isFinite(hours)) return null;
  if (hours < 1) return "Usually within an hour";
  if (hours < 24) return `Usually within ${Math.ceil(hours)} hours`;
  const days = Math.ceil(hours / 24);
  return days === 1 ? "Usually within a day" : `Usually within ${days} days`;
}
