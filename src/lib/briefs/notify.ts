import "server-only";
import { createAdminClient } from "@/lib/messaging/admin";
import { sendAlerts } from "@/lib/messaging/alerts";
import { logOnce } from "@/lib/messaging/config";
import { SITE_URL } from "@/lib/site";
import { matchExperts } from "./briefs";

/**
 * Notifications for briefs and pitches. In app rows go through the service
 * role `notify_user` (the only way server code may write notifications, see
 * the notifications migration). Kinds come from its fixed list:
 * `opportunity` for a new brief that matches an expert, `booking` for pitch
 * news, since an accepted pitch becomes a booking.
 *
 * Each in app row is followed by a WhatsApp alert for recipients who turned
 * WhatsApp updates on (founder decision on #191; see lib/messaging/alerts).
 * Email stays off until an email sender exists. Nothing here throws: a
 * failed notification never blocks posting, pitching or accepting.
 */

type Payload = { title: string; body: string; href: string } & Record<string, string>;

async function send(recipients: string[], kind: "opportunity" | "booking", payload: Payload): Promise<number> {
  if (recipients.length === 0) return 0;
  const admin = createAdminClient();
  if (!admin) {
    logOnce("briefs-notify-unkeyed", "brief notifications not sent: set SUPABASE_SECRET_KEY.");
    return 0;
  }
  const results = await Promise.all(
    recipients.map((id) => admin.rpc("notify_user", { p_recipient_id: id, p_kind: kind, p_payload: payload })),
  );
  const failed = results.filter((r) => r.error);
  if (failed.length) console.error(`[briefs] ${failed.length} notifications failed: ${failed[0].error?.message}`);
  await sendAlerts(admin, recipients, { title: payload.title, href: payload.href }, SITE_URL.replace(/^https?:\/\//, ""));
  return results.length - failed.length;
}

/**
 * Tells approved experts whose skills (or, failing that, categories) overlap
 * a new brief. Never the poster, and never members of the posting
 * organisation (they cannot pitch on its briefs). Returns how many were told.
 */
export async function notifyMatchingExperts(brief: {
  id: string;
  title: string;
  kind: string;
  posterId: string;
  organisationId: string | null;
  skills: string[];
  categories: string[];
}): Promise<number> {
  try {
    const admin = createAdminClient();
    if (!admin) {
      logOnce("briefs-notify-unkeyed", "brief notifications not sent: set SUPABASE_SECRET_KEY.");
      return 0;
    }
    const [experts, members] = await Promise.all([
      admin.from("expert_profiles").select("profile_id, skills, categories").eq("status", "approved"),
      brief.organisationId
        ? admin.from("organisation_members").select("profile_id").eq("organisation_id", brief.organisationId).eq("status", "active")
        : Promise.resolve({ data: [] as { profile_id: string | null }[], error: null }),
    ]);
    if (experts.error) throw experts.error;
    const exclude = [brief.posterId, ...(members.data ?? []).map((m) => m.profile_id).filter((id): id is string => !!id)];
    const recipients = matchExperts(brief, experts.data ?? [], exclude);
    return await send(recipients, "opportunity", {
      title: brief.kind === "job" ? "A new job brief matches your skills" : "A new brief matches your skills",
      body: brief.title,
      href: `/briefs/${brief.id}`,
      brief_id: brief.id,
    });
  } catch (error) {
    console.error("[briefs] could not notify matching experts", error);
    return 0;
  }
}

/** Tells the brief's poster that an expert pitched. */
export async function notifyNewPitch(args: { briefId: string; briefTitle: string; posterId: string; expertName: string }) {
  try {
    await send([args.posterId], "booking", {
      title: `${args.expertName} pitched on your brief`,
      body: args.briefTitle,
      href: `/briefs/${args.briefId}#pitches`,
      brief_id: args.briefId,
    });
  } catch (error) {
    console.error("[briefs] could not notify the poster", error);
  }
}

/** Tells an expert their pitch was accepted (with the booking) or not chosen. */
export async function notifyPitchDecision(args: {
  expertId: string;
  briefId: string;
  briefTitle: string;
  bookingId?: string;
}) {
  try {
    await send(
      [args.expertId],
      "booking",
      args.bookingId
        ? {
            title: "Your pitch was accepted",
            body: `${args.briefTitle}. Your booking is ready.`,
            href: `/bookings/${args.bookingId}`,
            brief_id: args.briefId,
            booking_id: args.bookingId,
          }
        : {
            title: "Your pitch was not chosen this time",
            body: args.briefTitle,
            href: `/briefs/${args.briefId}`,
            brief_id: args.briefId,
          },
    );
  } catch (error) {
    console.error("[briefs] could not notify the expert", error);
  }
}
