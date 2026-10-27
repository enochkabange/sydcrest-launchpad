/**
 * Pure helpers for the talent directory (issue #161): the learner's listing
 * form, the directory filters and contact requests. No database access; the
 * database decides eligibility and who sees what (talent_listings RLS,
 * talent_directory, respond_talent_contact).
 */
import { isRegionSlug, type RegionSlug } from "@/lib/regions";
import { TRACKS } from "@/lib/roadmap-admin";
import { normaliseUrl } from "@/lib/organisations/forms";
import type { FieldErrors } from "@/lib/validation";

export const AVAILABILITY = [
  { value: "open_to_work", label: "Open to jobs" },
  { value: "open_to_internships", label: "Open to internships" },
  { value: "open_to_gigs", label: "Open to gigs and projects" },
] as const;
export type Availability = (typeof AVAILABILITY)[number]["value"];

export function availabilityLabel(value: string | null | undefined) {
  return AVAILABILITY.find((a) => a.value === value)?.label ?? "Open to opportunities";
}

export function trackLabel(slug: string) {
  return TRACKS.find((t) => t.value === slug)?.label ?? slug;
}

export function isTrack(value: string) {
  return TRACKS.some((t) => t.value === value);
}

export const MAX_SKILLS = 30;
export const MAX_TRACKS = 10;
const MAX_SKILL_LENGTH = 40;

/** Skills typed as a list (commas or new lines): trimmed, de duplicated ignoring case, first spelling kept. */
export function parseSkills(input: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const part of input.split(/[,\n]/)) {
    const skill = part.replace(/\s+/g, " ").trim();
    if (!skill) continue;
    const key = skill.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(skill);
  }
  return out;
}

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export type ListingFields = "headline" | "summary" | "skills" | "tracks" | "region" | "availability" | "portfolio_url";

export type ListingInput = {
  headline: string;
  summary: string | null;
  skills: string[];
  tracks: string[];
  region: RegionSlug | null;
  availability: Availability;
  open_to_remote: boolean;
  portfolio_url: string | null;
  is_active: boolean;
};

export function parseListing(form: FormData): { data: ListingInput; errors: FieldErrors<ListingFields> } {
  const errors: FieldErrors<ListingFields> = {};

  const headline = text(form, "headline");
  if (!headline) errors.headline = "Write one line about what you do, such as Junior frontend developer.";
  else if (headline.length > 120) errors.headline = "Keep the headline to 120 characters.";

  const summary = text(form, "summary");
  if (summary.length > 2000) errors.summary = "Keep the summary to 2000 characters.";

  const skills = parseSkills(text(form, "skills"));
  if (skills.length > MAX_SKILLS) errors.skills = `List up to ${MAX_SKILLS} skills.`;
  else if (skills.some((s) => s.length > MAX_SKILL_LENGTH)) errors.skills = `Keep each skill to ${MAX_SKILL_LENGTH} characters.`;

  const tracks = [...new Set(form.getAll("tracks").filter((t): t is string => typeof t === "string" && isTrack(t)))];
  if (tracks.length > MAX_TRACKS) errors.tracks = `Choose up to ${MAX_TRACKS} tracks.`;

  const regionRaw = text(form, "region");
  const region = regionRaw && isRegionSlug(regionRaw) ? regionRaw : null;
  if (regionRaw && !region) errors.region = "Choose a region from the list.";

  const availabilityRaw = text(form, "availability") || "open_to_work";
  const availability = AVAILABILITY.find((a) => a.value === availabilityRaw)?.value;
  if (!availability) errors.availability = "Choose what you are open to.";

  const portfolio = normaliseUrl(text(form, "portfolio_url"));
  if (portfolio === undefined) errors.portfolio_url = "Enter a link such as https://github.com/your-name.";

  return {
    data: {
      headline,
      summary: summary || null,
      skills,
      tracks,
      region,
      availability: availability ?? "open_to_work",
      open_to_remote: form.get("open_to_remote") === "on",
      portfolio_url: portfolio ?? null,
      is_active: form.get("is_active") !== "off",
    },
    errors,
  };
}

export type DirectoryFilters = { skill: string; track: string; region: string };

type Params = Record<string, string | string[] | undefined>;

function first(params: Params, key: string) {
  const value = params[key];
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

/** Filters from the directory's search params; unknown tracks and regions are dropped. */
export function parseDirectoryFilters(params: Params): DirectoryFilters {
  const track = first(params, "track");
  const region = first(params, "region");
  return {
    skill: first(params, "skill").slice(0, 40),
    track: isTrack(track) ? track : "",
    region: isRegionSlug(region) ? region : "",
  };
}

export function hasFilters(f: DirectoryFilters) {
  return Boolean(f.skill || f.track || f.region);
}

/** Case insensitive: "excel" finds "Excel", "Microsoft Excel" and "excel formulas". */
export function matchesSkill(skills: readonly string[] | null | undefined, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (skills ?? []).some((s) => s.toLowerCase().includes(q));
}

export const CONTACT_MESSAGE_MAX = 2000;
export const SHARED_CONTACT_MAX = 300;

export function parseContactMessage(input: string): { message: string; error?: string } {
  const message = input.trim();
  if (!message) return { message, error: "Say who you are and why you would like to talk." };
  if (message.length > CONTACT_MESSAGE_MAX) return { message, error: `Keep the message to ${CONTACT_MESSAGE_MAX} characters.` };
  return { message };
}

export function parseSharedContact(input: string): { contact: string | null; error?: string } {
  const contact = input.trim();
  if (contact.length > SHARED_CONTACT_MAX) return { contact, error: `Keep it to ${SHARED_CONTACT_MAX} characters.` };
  return { contact: contact || null };
}

export const CONTACT_STATUS = {
  pending: "Waiting for a reply",
  accepted: "Accepted",
  declined: "Declined",
  withdrawn: "Withdrawn",
} as const;

export function contactStatusLabel(status: string) {
  return CONTACT_STATUS[status as keyof typeof CONTACT_STATUS] ?? status;
}

export function isUuid(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}
