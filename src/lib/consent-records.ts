import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import { hasAgeAndConsent } from "@/lib/legal";
import { LEGAL_CONSENT_KINDS, decideLegalGate, type LegalConsentKind } from "@/lib/consent";

type Client = SupabaseClient<Database>;

/**
 * Writes live terms and privacy consents for the signed in user. One insert
 * per kind so an existing live row (unique index, 23505) for one kind does
 * not block the other; a duplicate counts as success. Insert only, no
 * .select(). Returns false if any write failed.
 */
export async function recordLegalConsent(
  supabase: Client,
  version: string,
  kinds: readonly LegalConsentKind[] = LEGAL_CONSENT_KINDS,
): Promise<boolean> {
  let ok = true;
  for (const kind of kinds) {
    const { error } = await supabase.from("consents").insert({ kind, version });
    if (error && error.code !== "23505") {
      console.error("recordLegalConsent failed", { kind, code: error.code, message: error.message });
      ok = false;
    }
  }
  return ok;
}

/**
 * The authoritative age and consent check for a signed in user: date of birth
 * from metadata, terms and privacy from the consents table. Backfills the
 * table from metadata the first time it runs for someone who agreed before
 * consents were recorded. If the table cannot be read, falls back to the
 * metadata check so nobody is locked out by an outage.
 */
export async function hasAgeAndRecordedConsent(
  supabase: Client,
  userId: string,
  metadata: unknown,
): Promise<boolean> {
  const { data, error } = await supabase
    .from("consents")
    .select("kind, revoked_at")
    .eq("profile_id", userId)
    .in("kind", [...LEGAL_CONSENT_KINDS]);
  if (error) {
    console.error("consent lookup failed", { code: error.code, message: error.message });
    return hasAgeAndConsent(metadata);
  }
  const decision = decideLegalGate(data, metadata);
  if (decision.action === "backfill") {
    await recordLegalConsent(supabase, decision.version, decision.kinds);
    return true;
  }
  return decision.action === "allow";
}
