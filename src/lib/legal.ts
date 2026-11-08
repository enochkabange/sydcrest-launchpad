/**
 * Shared facts for the privacy policy, terms and consent capture.
 * Not server-only: the proxy, sign up validation and the legal pages all read it.
 */

/**
 * Stored in user metadata as `terms_version` and in `consents.version` when
 * someone agrees. Bump it when the text changes in a way people should agree
 * to again: signed in learners are then sent to /welcome to agree (#60).
 */
export const LEGAL_VERSION = "2026-12";

/** Shows the draft banner. False since the founder approved the text on 7 November 2026 (#60). */
export const LEGAL_IS_DRAFT = false;

/** Last time the text changed, shown on both pages. */
export const LEGAL_UPDATED = "8 November 2026";

/** Where people send privacy requests (founder, 7 November 2026). */
export const PRIVACY_CONTACT_EMAIL: string | null = "privacy@sydcrest.com";

export const MINIMUM_AGE = 18;

export const UNDER_AGE_MESSAGE = "SydCrest accounts are for people aged 18 and over for now.";

/**
 * Whether a user has given a date of birth and agreed to the current terms.
 * Reads Supabase `user_metadata` (from JWT claims or the user object).
 * Email sign ups set both at sign up; Google sign ups set them on /welcome.
 */
export function hasAgeAndConsent(metadata: unknown): boolean {
  if (!metadata || typeof metadata !== "object") return false;
  const { date_of_birth, terms_version } = metadata as Record<string, unknown>;
  return typeof date_of_birth === "string" && date_of_birth !== "" && terms_version === LEGAL_VERSION;
}
