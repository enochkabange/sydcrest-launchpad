import type { DeliveryResult } from "@/lib/messaging/send";

/**
 * Event reminders, sent by the daily cron (/api/cron/event-reminders) to
 * everyone going to an event that starts in the next 24 to 48 hours: an in
 * app notification for all of them, and a WhatsApp message for those with a
 * live WhatsApp consent. Running once a day, each event falls into exactly
 * one window, so nobody is reminded twice without storing a flag. Both
 * channels go through the existing hooks, which do nothing when unkeyed.
 * Pure logic plus a small store interface, so it is unit tested.
 */

const HOUR_MS = 60 * 60 * 1000;
export const REMINDER_FROM_HOURS = 24;
export const REMINDER_TO_HOURS = 48;

export type ReminderEvent = { id: string; slug: string; title: string; starts_at: string; format: string };
export type ReminderAttendee = { profileId: string; displayName: string | null };

export interface ReminderStore {
  /** Published events starting in [from, to). */
  eventsStartingBetween(from: Date, to: Date): Promise<ReminderEvent[]>;
  /** People whose RSVP is going. */
  goingAttendees(eventId: string): Promise<ReminderAttendee[]>;
  /** Profile id to WhatsApp number, for people with a live consent on their current number. */
  whatsappNumbers(): Promise<Map<string, string>>;
  /** In app notification (notify_user, service role). */
  notify(profileId: string, payload: Record<string, string>): Promise<void>;
}

export function reminderWindow(now: Date) {
  return {
    from: new Date(now.getTime() + REMINDER_FROM_HOURS * HOUR_MS),
    to: new Date(now.getTime() + REMINDER_TO_HOURS * HOUR_MS),
  };
}

/** The in app notification payload, by the notifications convention {title, body, href} plus ids. */
export function reminderPayload(event: ReminderEvent, when: string) {
  return {
    title: `Reminder: ${event.title}`,
    body: `Starts ${when}.${event.format === "in_person" ? "" : " Your joining link is on the event page."}`,
    href: `/events/${event.slug}`,
    event_id: event.id,
    event_slug: event.slug,
  };
}

export type ReminderSummary = { events: number; notified: number; whatsapp: number; skipped: number; failed: number };

export async function runEventReminders({
  store,
  sendWhatsApp,
  formatWhen,
  now = new Date(),
}: {
  store: ReminderStore;
  sendWhatsApp: (phone: string, attendee: ReminderAttendee, event: ReminderEvent) => Promise<DeliveryResult>;
  formatWhen: (iso: string) => string;
  now?: Date;
}): Promise<ReminderSummary> {
  const { from, to } = reminderWindow(now);
  const events = await store.eventsStartingBetween(from, to);
  const summary: ReminderSummary = { events: events.length, notified: 0, whatsapp: 0, skipped: 0, failed: 0 };
  if (!events.length) return summary;
  const numbers = await store.whatsappNumbers();

  for (const event of events) {
    const payload = reminderPayload(event, formatWhen(event.starts_at));
    for (const attendee of await store.goingAttendees(event.id)) {
      try {
        await store.notify(attendee.profileId, payload);
        summary.notified++;
      } catch {
        summary.failed++;
      }
      const phone = numbers.get(attendee.profileId);
      if (!phone) continue;
      const result = await sendWhatsApp(phone, attendee, event);
      if (result.status === "sent") summary.whatsapp++;
      else if (result.status === "skipped") summary.skipped++;
      else summary.failed++;
    }
  }
  return summary;
}
