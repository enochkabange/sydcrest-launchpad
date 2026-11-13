import "server-only";
import { validateProps } from "@/lib/analytics/events";
import { recordEvents } from "@/lib/analytics/track";
import type { AdminClient } from "@/lib/messaging/admin";
import { WHATSAPP_CONSENT_VERSION } from "@/lib/messaging/consent";
import { supabaseReengageStore } from "@/lib/messaging/reengage-store";
import type { CheckinSource } from "./checkins";
import type { CheckinStore } from "./checkins-run";

/** CheckinStore backed by Supabase with the service role (the cron has no user session). */
export function supabaseCheckinStore(admin: AdminClient): CheckinStore {
  return {
    async finishes(from, to) {
      const { data, error } = await admin.rpc("outcome_checkin_finishes", { p_from: from, p_to: to });
      if (error) throw new Error(`outcome_checkin_finishes: ${error.message}`);
      return data.map((f) => ({ ...f, source: f.source as CheckinSource }));
    },

    async existing(profileIds) {
      const rows = [];
      for (let i = 0; i < profileIds.length; i += 200) {
        const { data, error } = await admin
          .from("outcome_checkins")
          .select("profile_id, source, cohort_id, roadmap_id, months")
          .in("profile_id", profileIds.slice(i, i + 200));
        if (error) throw new Error(`outcome_checkins: ${error.message}`);
        rows.push(...data.map((r) => ({ ...r, source: r.source as CheckinSource })));
      }
      return rows;
    },

    async create(rows) {
      const { data, error } = await admin.rpc("create_outcome_checkins", { p_rows: rows });
      if (error) throw new Error(`create_outcome_checkins: ${error.message}`);
      return data;
    },

    async lastSentOn(profileIds, since) {
      const last = new Map<string, string>();
      for (let i = 0; i < profileIds.length; i += 200) {
        const { data, error } = await admin
          .from("outcome_checkins")
          .select("profile_id, sent_at")
          .in("profile_id", profileIds.slice(i, i + 200))
          .gte("sent_at", since);
        if (error) throw new Error(`outcome_checkins: ${error.message}`);
        for (const r of data) {
          const day = r.sent_at!.slice(0, 10);
          if ((last.get(r.profile_id) ?? "") < day) last.set(r.profile_id, day);
        }
      }
      return last;
    },

    async markSent(id) {
      const { error } = await admin.from("outcome_checkins").update({ sent_at: new Date().toISOString() }).eq("id", id);
      if (error) throw new Error(`mark sent: ${error.message}`);
    },

    async markSkipped(ids) {
      const { error } = await admin.from("outcome_checkins").update({ skipped_at: new Date().toISOString() }).in("id", ids);
      if (error) throw new Error(`mark skipped: ${error.message}`);
    },

    async whatsappNumbers() {
      // The same consent rules as the weekly nudge: a live consent of the
      // current version, on the number still on the profile.
      const learners = await supabaseReengageStore(admin).consentingLearners(WHATSAPP_CONSENT_VERSION);
      return new Map(learners.map((l) => [l.profileId, { phone: l.phone, displayName: l.displayName }]));
    },

    async notify(profileId, payload) {
      const { error } = await admin.rpc("notify_user", { p_recipient_id: profileId, p_kind: "system", p_payload: payload });
      if (error) throw new Error(`notify_user: ${error.message}`);
    },

    async recordSent(months) {
      // A count with no person attached: the cron has no session, and the
      // service role records the event without a profile.
      const context = { anonymous_id: null, session_id: null, device_class: "unknown", source: "server", route: "/api/cron/reengage" } as const;
      for (let i = 0; i < months.length; i += 25) {
        const events = months
          .slice(i, i + 25)
          .map((m) => ({ name: "outcome_checkin_sent" as const, props: validateProps("outcome_checkin_sent", { months: m }) }));
        await recordEvents(admin, events, context);
      }
    },
  };
}
