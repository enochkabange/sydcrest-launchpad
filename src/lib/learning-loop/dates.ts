/**
 * Calendar days and weeks for the learning loop, in Africa/Accra, as
 * "YYYY-MM-DD" strings. Weeks start on Monday, matching the database's
 * private.accra_week_start. Accra is UTC+0 all year, but the zone is named so
 * the rule stays right if the platform ever runs elsewhere.
 */

export type Day = string;

const ACCRA = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Africa/Accra",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** The Accra calendar day of an instant. */
export function accraDay(at: Date | string): Day {
  return ACCRA.format(typeof at === "string" ? new Date(at) : at);
}

const toUtc = (day: Day) => new Date(`${day}T00:00:00Z`);

export function addDays(day: Day, n: number): Day {
  const d = toUtc(day);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Whole days from `from` to `to` (positive when `to` is later). */
export function daysBetween(from: Day, to: Day): number {
  return Math.round((toUtc(to).getTime() - toUtc(from).getTime()) / 86_400_000);
}

/** The Monday of the week containing `day`. */
export function weekStart(day: Day): Day {
  const dow = toUtc(day).getUTCDay(); // 0 Sunday to 6 Saturday
  return addDays(day, -((dow + 6) % 7));
}
