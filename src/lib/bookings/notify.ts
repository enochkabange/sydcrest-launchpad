import "server-only";
import { createAdminClient } from "@/lib/messaging/admin";
import { logOnce } from "@/lib/messaging/config";
import { bookingNotification, type BookingEvent } from "./model";

/**
 * Tell the other person about a booking event. In app through notify_user
 * (service role only, so this needs SUPABASE_SECRET_KEY); without the key it
 * does nothing and logs once. Never throws: a missed notification must not
 * undo a request, a reply or a review that already saved.
 *
 * Email and WhatsApp alerts for bookings are hooks only for now: no consent
 * covers booking messages yet, so externalAlert reports "not configured".
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
    return { inApp: "skipped" as const, external: externalAlert() };
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
      if (data?.length) return { inApp: "skipped" as const, external: externalAlert() };
    }
    const { error } = await admin.rpc("notify_user", { p_recipient_id: recipientId, p_kind: kind, p_payload: payload });
    if (error) console.error(`[bookings] notify ${event} failed: ${error.message}`);
    return { inApp: error ? ("failed" as const) : ("sent" as const), external: externalAlert() };
  } catch (e) {
    console.error(`[bookings] notify ${event} failed: ${e instanceof Error ? e.message : String(e)}`);
    return { inApp: "failed" as const, external: externalAlert() };
  }
}

/** The email and WhatsApp hook for booking alerts. A safe no op until a provider and consent exist. */
export function externalAlert(): { status: "skipped"; reason: "not_configured" } {
  logOnce("bookings-external", "booking email and WhatsApp alerts are not set up yet; in app only.");
  return { status: "skipped", reason: "not_configured" };
}
