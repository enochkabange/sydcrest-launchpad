import { admin } from "./supabase-admin";

/**
 * Notifications for e2e, inserted the way server code does it: notify_user
 * with the service role (learners cannot insert their own).
 */
export async function notify(recipientId: string, kind: string, payload: Record<string, unknown>) {
  return admin<string>("/rest/v1/rpc/notify_user", {
    method: "POST",
    body: { p_recipient_id: recipientId, p_kind: kind, p_payload: payload },
  });
}

/** One of each kind the centre renders, oldest first, plus one with no copy of its own. */
export async function seedNotifications(recipientId: string) {
  await notify(recipientId, "verified_skill", { skill_id: crypto.randomUUID(), skill_slug: "excel-basics", skill_name: "Excel basics", source: "path_completion" });
  await notify(recipientId, "event_update", {
    event_id: crypto.randomUUID(),
    event_slug: "bolgatanga-meetup",
    event_title: "Bolgatanga learners meetup",
    status: "cancelled",
    starts_at: "2026-11-14T15:00:00Z",
  });
  // A kind with no copy in the payload: the generic renderer gives it a plain title.
  await notify(recipientId, "cohort", { cohort_id: crypto.randomUUID() });
  await notify(recipientId, "system", {
    title: "Reminder: Spreadsheet skillshop in Tamale",
    body: "Starts tomorrow at 10:00. Bring your laptop or phone.",
    href: "/roadmaps",
  });
  await notify(recipientId, "community_reply", { post_id: crypto.randomUUID(), reply_id: crypto.randomUUID(), scope: "everyone" });
}
