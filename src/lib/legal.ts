/**
 * Shared facts for the privacy policy, terms and consent capture.
 * Not server-only: the proxy, sign up validation and the legal pages all read it.
 */

/** Stored in user metadata as `terms_version` when someone agrees. Bump when the text changes. */
export const LEGAL_VERSION = "2026-10-draft";

/** True until the founder (and ideally a lawyer) approves the text. Shows the draft banner. */
export const LEGAL_IS_DRAFT = true;

/** Last time the text changed, shown on both pages. */
export const LEGAL_UPDATED = "28 October 2026";

/**
 * Where people send privacy requests. Left empty on purpose until the founder
 * confirms a real address; the pages say so rather than show an invented one.
 */
export const PRIVACY_CONTACT_EMAIL: string | null = null;

export const MINIMUM_AGE = 18;

export const UNDER_AGE_MESSAGE = "SydCrest accounts are for people aged 18 and over for now.";

/**
 * Whether a user has given a date of birth and agreed to the terms.
 * Reads Supabase `user_metadata` (from JWT claims or the user object).
 * Email sign ups set both at sign up; Google sign ups set them on /welcome.
 */
export function hasAgeAndConsent(metadata: unknown): boolean {
  if (!metadata || typeof metadata !== "object") return false;
  const { date_of_birth, terms_version } = metadata as Record<string, unknown>;
  return typeof date_of_birth === "string" && date_of_birth !== "" && typeof terms_version === "string" && terms_version !== "";
}
