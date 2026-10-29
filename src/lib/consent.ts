/**
 * Terms and privacy consent: the decision logic, kept pure so it can be unit
 * tested. Records live in the `consents` table (append only, server
 * timestamps); `lib/consent-records.ts` reads and writes them.
 *
 * Until the expand and contract finishes, sign up and /welcome also keep
 * writing `terms_version` to user metadata. Email sign ups awaiting
 * confirmation have no session yet, so metadata is the only place their
 * acceptance can wait; it is copied into `consents` on their first signed in
 * request. Date of birth stays in metadata (the consents table has no column
 * for it).
 */

/** One tick on the sign up form covers both documents. */
export const LEGAL_CONSENT_KINDS = ["terms", "privacy"] as const;
export type LegalConsentKind = (typeof LEGAL_CONSENT_KINDS)[number];

/**
 * "I confirm I am 18 or over" (founder decision D1): ticked at sign up and on
 * /welcome and recorded beside terms and privacy, as a clearer record for the
 * Data Protection Act. Not part of the legal gate: accounts made before the
 * tick existed are not sent back to /welcome for it.
 */
export const AGE_CONSENT_KIND = "age_confirmation";

/**
 * Whether the age confirmation is waiting in metadata (email sign ups have no
 * session until they confirm) and not yet in the consents table.
 */
export function needsAgeConfirmationRecord(rows: ConsentRow[], metadata: unknown): boolean {
  return metadataString(metadata, "age_confirmed_at") !== null && !rows.some((r) => r.kind === AGE_CONSENT_KIND);
}

export type ConsentRow = { kind: string; revoked_at: string | null };

export type LegalConsentState = {
  /** Both documents have a live (unrevoked) record. */
  granted: boolean;
  /** Kinds with a record that has since been revoked and nothing live. */
  revoked: LegalConsentKind[];
  /** Kinds with no record at all: candidates for the metadata backfill. */
  missing: LegalConsentKind[];
};

export function legalConsentState(rows: ConsentRow[]): LegalConsentState {
  const revoked: LegalConsentKind[] = [];
  const missing: LegalConsentKind[] = [];
  for (const kind of LEGAL_CONSENT_KINDS) {
    const ofKind = rows.filter((r) => r.kind === kind);
    if (ofKind.length === 0) missing.push(kind);
    else if (!ofKind.some((r) => r.revoked_at === null)) revoked.push(kind);
  }
  return { granted: revoked.length === 0 && missing.length === 0, revoked, missing };
}

function metadataString(metadata: unknown, key: string): string | null {
  if (!metadata || typeof metadata !== "object") return null;
  const value = (metadata as Record<string, unknown>)[key];
  return typeof value === "string" && value !== "" && value.length <= 40 ? value : null;
}

/** The terms version someone agreed to at sign up, if metadata has it. */
export function termsVersionFromMetadata(metadata: unknown): string | null {
  return metadataString(metadata, "terms_version");
}

export function hasDateOfBirth(metadata: unknown): boolean {
  return metadataString(metadata, "date_of_birth") !== null;
}

/**
 * What to do for a signed in user, given their consent rows and metadata.
 * - `allow`: date of birth on file and both consents live.
 * - `backfill`: no record yet but metadata shows they agreed; copy it over
 *   (version from metadata, not the current one) and allow.
 * - `welcome`: send them to /welcome (no date of birth, never agreed, or
 *   revoked). A revoked consent is never resurrected from metadata.
 */
export function decideLegalGate(
  rows: ConsentRow[],
  metadata: unknown,
): { action: "allow" } | { action: "backfill"; version: string; kinds: LegalConsentKind[] } | { action: "welcome" } {
  if (!hasDateOfBirth(metadata)) return { action: "welcome" };
  const state = legalConsentState(rows);
  if (state.granted) return { action: "allow" };
  if (state.revoked.length > 0) return { action: "welcome" };
  const version = termsVersionFromMetadata(metadata);
  if (!version) return { action: "welcome" };
  return { action: "backfill", version, kinds: state.missing };
}
