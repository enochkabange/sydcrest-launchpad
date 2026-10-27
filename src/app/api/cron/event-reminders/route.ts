import { connection } from "next/server";
import { runEventReminders } from "@/lib/events/reminders";
import { supabaseReminderStore } from "@/lib/events/reminders-store";
import { formatEventDayShort, formatEventTime } from "@/lib/events/time";
import { createAdminClient } from "@/lib/messaging/admin";
import { isAuthorizedCron } from "@/lib/messaging/cron-auth";
import { sendWhatsApp } from "@/lib/messaging/send";
import { firstName } from "@/lib/messaging/templates";
import { SITE_URL } from "@/lib/site";

/**
 * Daily event reminders (scheduled in vercel.json): everyone going to an
 * event that starts in 24 to 48 hours gets an in app notification, and a
 * WhatsApp message if they turned those on. Without the service key it does
 * nothing; without Twilio keys WhatsApp sends are skipped and logged once.
 */
export async function GET(request: Request) {
  await connection();
  if (!isAuthorizedCron(request.headers.get("authorization"), process.env.CRON_SECRET)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    console.warn("[events] reminders skipped: SUPABASE_SECRET_KEY is not set.");
    return Response.json({ skipped: "SUPABASE_SECRET_KEY is not set" }, { status: 503 });
  }

  const site = SITE_URL.replace(/^https?:\/\//, "");
  const formatWhen = (iso: string) => `on ${formatEventDayShort(iso)} at ${formatEventTime(iso)} GMT`;
  const summary = await runEventReminders({
    store: supabaseReminderStore(admin),
    formatWhen,
    sendWhatsApp: (phone, attendee, event) =>
      sendWhatsApp(phone, "event_reminder", {
        name: firstName(attendee.displayName),
        event: event.title,
        when: formatWhen(event.starts_at),
        url: `${site}/events/${event.slug}`,
      }),
  });
  console.info(`[events] reminders ${JSON.stringify(summary)}`);
  return Response.json(summary);
}
