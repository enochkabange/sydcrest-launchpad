import "server-only";
import { createAdminClient } from "@/lib/messaging/admin";
import { logOnce } from "@/lib/messaging/config";
import { matchExperts } from "./briefs";

/**
 * Notifications for briefs and pitches. In app rows go through the service
 * role `notify_user` (the only way server code may write notifications, see
 * the notifications migration). Kinds come from its fixed list:
 * `opportunity` for a new brief that matches an expert, `booking` for pitch
 * news, since an accepted pitch becomes a booking.
 *
 * Email and WhatsApp are hooks only: the app has no email provider yet, and
 * WhatsApp messages a business starts need a Meta approved template, so
 * both no-op (logged once) until they are set up. Nothing here throws: a
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
  externalHooks(recipients.length);
  return results.length - failed.length;
}

/** Email and WhatsApp for brief news: not set up yet, so a logged no-op. */
function externalHooks(count: number) {
  if (count === 0) return;
  logOnce("briefs-external", "brief email and WhatsApp alerts are not set up; in app notifications only.");
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
