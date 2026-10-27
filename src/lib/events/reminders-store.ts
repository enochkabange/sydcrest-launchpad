import "server-only";
import type { AdminClient } from "@/lib/messaging/admin";
import { WHATSAPP_CONSENT_VERSION } from "@/lib/messaging/consent";
import { supabaseReengageStore } from "@/lib/messaging/reengage-store";
import type { ReminderStore } from "./reminders";

/** ReminderStore backed by Supabase with the service role (the cron has no user session). */
export function supabaseReminderStore(admin: AdminClient): ReminderStore {
  return {
    async eventsStartingBetween(from, to) {
      const { data, error } = await admin
        .from("community_events")
        .select("id, slug, title, starts_at, format")
        .eq("status", "published")
        .gte("starts_at", from.toISOString())
        .lt("starts_at", to.toISOString());
      if (error) throw new Error(`community_events: ${error.message}`);
      return data;
    },

    async goingAttendees(eventId) {
      const { data, error } = await admin
        .from("event_rsvps")
        .select("profile_id, profile:profiles(display_name)")
        .eq("event_id", eventId)
        .eq("status", "going");
      if (error) throw new Error(`event_rsvps: ${error.message}`);
      return data.map((r) => ({ profileId: r.profile_id, displayName: r.profile?.display_name ?? null }));
    },

    async whatsappNumbers() {
      // The same consent rules as the weekly nudge: a live consent of the
      // current version, on the number still on the profile.
      const learners = await supabaseReengageStore(admin).consentingLearners(WHATSAPP_CONSENT_VERSION);
      return new Map(learners.map((l) => [l.profileId, l.phone]));
    },

    async notify(profileId, payload) {
      const { error } = await admin.rpc("notify_user", { p_recipient_id: profileId, p_kind: "system", p_payload: payload });
      if (error) throw new Error(`notify_user: ${error.message}`);
    },
  };
}
