import "server-only";
import { createAdminClient } from "@/lib/messaging/admin";
import { sendAlerts } from "@/lib/messaging/alerts";
import { logOnce } from "@/lib/messaging/config";
import { SITE_URL } from "@/lib/site";
import { bookingNotification, type BookingEvent } from "./model";

/**
 * Tell the other person about a booking event. In app through notify_user
 * (service role only, so this needs SUPABASE_SECRET_KEY); without the key it
 * does nothing and logs once. Never throws: a missed notification must not
 * undo a request, a reply or a review that already saved.
 *
 * After the in app row, a WhatsApp alert goes to the recipient if they turned
 * WhatsApp updates on (founder decision on #191; see lib/messaging/alerts).
 * Email stays off until an email sender exists. A message alert that was
 * skipped in app (one unread nudge per thread) is skipped on WhatsApp too.
 */
export async function notifyBookingEvent(
  recipientId: string,
  event: BookingEvent,
  booking: { id: string; offerTitle: string | null },
  actorName: string,
) {
  const { kind, payload } = bookingNotification(event, booking, actorName);
  const admin = createAdminClient();
  if (!admin) {
    logOnce("bookings-notify", "booking notifications not sent: set SUPABASE_SECRET_KEY.");
    return { inApp: "skipped" as const };
  }
  try {
    // One unread nudge per thread is enough: skip a new message alert while the last one is unread.
    if (event === "message") {
      const { data } = await admin
        .from("notifications")
        .select("id")
        .eq("recipient_id", recipientId)
        .eq("kind", "booking")
        .is("read_at", null)
        .contains("payload", { booking_id: booking.id, event: "message" })
        .limit(1);
      if (data?.length) return { inApp: "skipped" as const };
    }
    const { error } = await admin.rpc("notify_user", { p_recipient_id: recipientId, p_kind: kind, p_payload: payload });
    if (error) console.error(`[bookings] notify ${event} failed: ${error.message}`);
    const external = await sendAlerts(admin, [recipientId], { title: payload.title, href: payload.href }, SITE_URL.replace(/^https?:\/\//, ""));
    return { inApp: error ? ("failed" as const) : ("sent" as const), external };
  } catch (e) {
    console.error(`[bookings] notify ${event} failed: ${e instanceof Error ? e.message : String(e)}`);
    return { inApp: "failed" as const };
  }
}
