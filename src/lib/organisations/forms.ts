/**
 * Pure helpers for business accounts (issue #161): organisation forms, slugs,
 * roles and invites. No database access, so it can be unit tested; the Server
 * Actions under src/app/(app)/business and src/app/(app)/org call it. The
 * database (RLS, column grants and the definer functions from #148) is the
 * real gate; these checks only give people friendly messages first.
 */
import { isRegionSlug, type RegionSlug } from "@/lib/regions";
import type { FieldErrors } from "@/lib/validation";
import { RATE_LIMIT_MESSAGE, RATE_LIMITED_CODE } from "@/lib/rate-limit";

/** Same rule as the organisations.slug check constraint. */
export const ORG_SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{1,58}[a-z0-9]$/;

export const ORG_KINDS = [
  { value: "business", label: "Business" },
  { value: "nonprofit", label: "Nonprofit or NGO" },
  { value: "school", label: "School or training provider" },
  { value: "government", label: "Government or public body" },
  { value: "other", label: "Something else" },
] as const;
export type OrgKind = (typeof ORG_KINDS)[number]["value"];

export function orgKindLabel(kind: string | null | undefined) {
  return ORG_KINDS.find((k) => k.value === kind)?.label ?? "Organisation";
}

export const ORG_ROLES = [
  { value: "owner", label: "Owner", help: "Everything, including adding other owners." },
  { value: "admin", label: "Admin", help: "Edits the profile, manages admins and recruiters, posts." },
  { value: "recruiter", label: "Recruiter", help: "Posts opportunities and contacts talent." },
] as const;
export type OrgRole = (typeof ORG_ROLES)[number]["value"];

export function isOrgRole(value: unknown): value is OrgRole {
  return ORG_ROLES.some((r) => r.value === value);
}

export function orgRoleLabel(role: string | null | undefined) {
  return ORG_ROLES.find((r) => r.value === role)?.label ?? "Member";
}

/** Who may invite, re-role or remove whom (mirrors the organisation_members policies). */
export function canManageMember(myRole: string | null | undefined, theirRole: string) {
  if (myRole === "owner") return true;
  return myRole === "admin" && theirRole !== "owner";
}

/** The roles a person may hand out. Owners give any role; admins give admin or recruiter. */
export function assignableRoles(myRole: string | null | undefined): OrgRole[] {
  if (myRole === "owner") return ["owner", "admin", "recruiter"];
  if (myRole === "admin") return ["admin", "recruiter"];
  return [];
}

export const VERIFICATION = {
  unverified: { label: "Not verified", tone: "neutral" },
  pending: { label: "Waiting for review", tone: "info" },
  verified: { label: "Verified", tone: "success" },
  rejected: { label: "Not approved", tone: "danger" },
  suspended: { label: "Suspended", tone: "danger" },
} as const;
export type VerificationStatus = keyof typeof VERIFICATION;

export function verificationLabel(status: string | null | undefined) {
  return VERIFICATION[status as VerificationStatus]?.label ?? "Not verified";
}

/** Verification can be asked for from these states (request_organisation_verification). */
export function canRequestVerification(status: string | null | undefined) {
  return status === "unverified" || status === "rejected";
}

/**
 * A slug from a name: lowercase letters and digits joined by single hyphens,
 * 3 to 60 characters. Returns "" when nothing usable is left (all symbols).
 */
export function slugify(name: string) {
  const base = name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
  if (base.length === 0) return "";
  if (base.length < 3) return `${base}-org`;
  return base;
}

/** The slug with a short suffix, for when the plain one is taken. */
export function slugWithSuffix(slug: string, suffix: string) {
  const tail = `-${suffix.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 6)}`;
  return `${slug.slice(0, 60 - tail.length).replace(/-+$/g, "")}${tail}`;
}

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * An http(s) link, adding https:// when someone types "example.com". Null when
 * empty; undefined when it can't be a web link (the caller reports an error).
 */
export function normaliseUrl(input: string): string | null | undefined {
  const raw = input.trim();
  if (!raw) return null;
  const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(raw) ? raw : `https://${raw}`;
  if (!/^https?:\/\//i.test(withScheme)) return undefined;
  if (withScheme.length > 2000 || /[\s<>"]/.test(withScheme)) return undefined;
  try {
    const url = new URL(withScheme);
    if (!url.hostname.includes(".")) return undefined;
    return withScheme;
  } catch {
    return undefined;
  }
}

export type OrganisationFields = "name" | "slug" | "kind" | "description" | "website" | "region" | "registration_number";

export type OrganisationInput = {
  name: string;
  slug: string;
  kind: OrgKind;
  description: string | null;
  website: string | null;
  region: RegionSlug | null;
  registration_number: string | null;
};

export function parseOrganisation(form: FormData): { data: OrganisationInput; errors: FieldErrors<OrganisationFields> } {
  const errors: FieldErrors<OrganisationFields> = {};
  const name = text(form, "name");
  if (!name) errors.name = "Enter the organisation's name.";
  else if (name.length > 120) errors.name = "Keep the name to 120 characters.";

  const typedSlug = text(form, "slug").toLowerCase();
  const slug = typedSlug || slugify(name);
  if (!ORG_SLUG_PATTERN.test(slug)) {
    errors.slug = typedSlug
      ? "Use 3 to 60 lowercase letters, numbers and hyphens, starting and ending with a letter or number."
      : "Choose a web address using letters and numbers.";
  }

  const kindRaw = text(form, "kind") || "business";
  const kind = ORG_KINDS.find((k) => k.value === kindRaw)?.value;
  if (!kind) errors.kind = "Choose what kind of organisation this is.";

  const description = text(form, "description");
  if (description.length > 3000) errors.description = "Keep the description to 3000 characters.";

  const website = normaliseUrl(text(form, "website"));
  if (website === undefined) errors.website = "Enter a web address such as https://example.com.";

  const regionRaw = text(form, "region");
  const region = regionRaw && isRegionSlug(regionRaw) ? regionRaw : null;
  if (regionRaw && !region) errors.region = "Choose a region from the list.";

  const registration = text(form, "registration_number");
  if (registration.length > 60) errors.registration_number = "Keep the registration number to 60 characters.";

  return {
    data: {
      name,
      slug,
      kind: kind ?? "business",
      description: description || null,
      website: website ?? null,
      region,
      registration_number: registration || null,
    },
    errors,
  };
}

/**
 * The public profile slug from what someone pasted: a full link
 * (https://.../u/mariama-i), a path (/u/mariama-i) or the slug itself.
 */
export function parseProfileSlug(input: string): string | null {
  let value = input.trim();
  if (!value) return null;
  try {
    if (/^https?:\/\//i.test(value)) value = new URL(value).pathname;
  } catch {
    return null;
  }
  const match = /^\/?(?:u\/)?([a-z0-9][a-z0-9-]*[a-z0-9])\/?$/i.exec(value);
  return match ? match[1].toLowerCase() : null;
}

/** Ask the database's error code what went wrong, in words people can act on. */
export function organisationErrorMessage(code: string | undefined, fallback: string) {
  switch (code) {
    case RATE_LIMITED_CODE:
      return RATE_LIMIT_MESSAGE;
    case "23505":
      return "That web address is taken. Try another.";
    case "42501":
      return "Business accounts are for adults (18 and over) who have finished signing up.";
    case "23514":
      return "An organisation needs at least one owner. Make someone else an owner first.";
    default:
      return fallback;
  }
}
