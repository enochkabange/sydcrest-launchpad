import "server-only";
import type { AdminClient } from "./admin";
import { WHATSAPP_CONSENT_KIND } from "./consent";
import { consentedCandidates, LAST_NUDGE_KEY, type ReengageStore } from "./reengage";

/**
 * ReengageStore backed by Supabase with the service role. Nudge history lives
 * in auth app_metadata (users cannot edit it) because this feature ships
 * without a migration; a message_sends table is the better home later.
 */
export function supabaseReengageStore(admin: AdminClient): ReengageStore {
  return {
    async consentingLearners(version) {
      const { data: consents, error } = await admin
        .from("consents")
        .select("profile_id, phone")
        .eq("kind", WHATSAPP_CONSENT_KIND)
        .eq("version", version)
        .is("revoked_at", null)
        .not("phone", "is", null);
      if (error) throw new Error(`consents: ${error.message}`);
      const ids = Array.from(new Set(consents.map((c) => c.profile_id)));
      if (!ids.length) return [];

      const { data: profiles, error: profileError } = await admin
        .from("profiles")
        .select("id, phone, display_name")
        .in("id", ids)
        .not("phone", "is", null);
      if (profileError) throw new Error(`profiles: ${profileError.message}`);
      return consentedCandidates(consents, profiles);
    },

    async lastProgressAt(profileIds) {
      const latest = new Map<string, string>();
      if (!profileIds.length) return latest;
      const { data, error } = await admin
        .from("roadmap_progress")
        .select("profile_id, updated_at")
        .in("profile_id", profileIds)
        .order("updated_at", { ascending: false });
      if (error) throw new Error(`roadmap_progress: ${error.message}`);
      for (const row of data) if (!latest.has(row.profile_id)) latest.set(row.profile_id, row.updated_at);
      return latest;
    },

    async authInfo(profileId) {
      const { data, error } = await admin.auth.admin.getUserById(profileId);
      if (error || !data.user) return null;
      const last = data.user.app_metadata?.[LAST_NUDGE_KEY];
      return {
        lastSignInAt: data.user.last_sign_in_at ?? null,
        createdAt: data.user.created_at ?? null,
        lastNudgeAt: typeof last === "string" ? last : null,
      };
    },

    async markNudged(profileId, at) {
      const { data, error } = await admin.auth.admin.getUserById(profileId);
      if (error || !data.user) throw new Error(`auth user ${profileId}: ${error?.message ?? "missing"}`);
      // Spread the existing metadata: never trust the API to merge for us.
      const { error: updateError } = await admin.auth.admin.updateUserById(profileId, {
        app_metadata: { ...data.user.app_metadata, [LAST_NUDGE_KEY]: at.toISOString() },
      });
      if (updateError) throw new Error(`mark nudged ${profileId}: ${updateError.message}`);
    },
  };
}
