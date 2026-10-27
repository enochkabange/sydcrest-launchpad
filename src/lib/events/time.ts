/**
 * Event times. Ghana keeps GMT all year (Africa/Accra, no daylight saving),
 * so event times are shown and entered in Accra time, which is UTC. Pure, so
 * the phase rules are unit tested.
 */

export const EVENT_TIME_ZONE = "Africa/Accra";
const HOUR_MS = 60 * 60 * 1000;

/** Check in opens this long before the start and closes this long after the end (check_in_event). */
export const CHECK_IN_MARGIN_HOURS = 2;

export type EventTiming = { status: string; starts_at: string; ends_at: string };

/** Where an event is in its life, for the honest state shown on its page. */
export type EventPhase = "draft" | "cancelled" | "upcoming" | "live" | "past";

export function eventPhase(event: EventTiming, now: Date = new Date()): EventPhase {
  if (event.status === "draft") return "draft";
  if (event.status === "cancelled") return "cancelled";
  if (event.status === "completed") return "past";
  const t = now.getTime();
  if (t < Date.parse(event.starts_at)) return "upcoming";
  if (t < Date.parse(event.ends_at)) return "live";
  return "past";
}

/** rsvp_event accepts published events that have not ended. */
export function rsvpOpen(event: EventTiming, now: Date = new Date()) {
  return event.status === "published" && now.getTime() < Date.parse(event.ends_at);
}

/** check_in_event accepts codes from two hours before the start to two hours after the end. */
export function checkInOpen(event: EventTiming, now: Date = new Date()) {
  if (event.status !== "published") return false;
  const t = now.getTime();
  return (
    t >= Date.parse(event.starts_at) - CHECK_IN_MARGIN_HOURS * HOUR_MS &&
    t <= Date.parse(event.ends_at) + CHECK_IN_MARGIN_HOURS * HOUR_MS
  );
}

/** When check in opens, for the "not open yet" message. */
export function checkInOpensAt(event: EventTiming) {
  return new Date(Date.parse(event.starts_at) - CHECK_IN_MARGIN_HOURS * HOUR_MS).toISOString();
}

/** The event_feedback insert policy: people who checked in, once the event has started. */
export function feedbackOpen(event: EventTiming, now: Date = new Date()) {
  return event.status !== "draft" && now.getTime() >= Date.parse(event.starts_at);
}

const dayFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: EVENT_TIME_ZONE,
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const shortDayFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: EVENT_TIME_ZONE,
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});
const timeFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: EVENT_TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});
const dayKeyFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: EVENT_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** "Saturday 14 November 2026" */
export function formatEventDay(iso: string) {
  return dayFormat.format(new Date(iso)).replace(",", "");
}

/** "Sat 14 Nov 2026" */
export function formatEventDayShort(iso: string) {
  return shortDayFormat.format(new Date(iso)).replace(",", "");
}

/** "10:00" */
export function formatEventTime(iso: string) {
  return timeFormat.format(new Date(iso));
}

/**
 * "10:00 to 15:00 GMT" on one day; "Sat 14 Nov 2026 10:00 to Sun 15 Nov 2026
 * 16:00 GMT" across days. Words, not a dash, between the two.
 */
export function formatEventTimes(startsAt: string, endsAt: string) {
  const sameDay = dayKeyFormat.format(new Date(startsAt)) === dayKeyFormat.format(new Date(endsAt));
  if (sameDay) return `${formatEventTime(startsAt)} to ${formatEventTime(endsAt)} GMT`;
  return `${formatEventDayShort(startsAt)} ${formatEventTime(startsAt)} to ${formatEventDayShort(endsAt)} ${formatEventTime(endsAt)} GMT`;
}

/** An ISO time as the value of a datetime-local input, in Accra time ("2026-11-14T10:00"). */
export function toDateTimeInput(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 16);
}

/** A datetime-local value, read as Accra time, to ISO. Null when it is not a valid time. */
export function fromDateTimeInput(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(value)) return null;
  const d = new Date(`${value.length === 16 ? `${value}:00` : value}Z`);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

/** Minutes as "1 hour 30 minutes", for recordings. */
export function formatDuration(minutes: number | null) {
  if (!minutes || minutes < 1) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const parts = [];
  if (h) parts.push(`${h} ${h === 1 ? "hour" : "hours"}`);
  if (m) parts.push(`${m} ${m === 1 ? "minute" : "minutes"}`);
  return parts.join(" ");
}
