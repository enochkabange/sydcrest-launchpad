/**
 * Study habits (epic #320, step 3): when and how often each person comes
 * back. Pure, so the browser and unit tests share it.
 *
 * session_started is recorded once per tab session with the hour band and
 * weekday on the visitor's own clock and the whole days since their last
 * session on this browser (kept in localStorage as a date, nothing else).
 */

export const HOUR_BANDS = ["night", "morning", "afternoon", "evening", "late"] as const;
export type HourBand = (typeof HOUR_BANDS)[number];
export const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
export type Weekday = (typeof WEEKDAYS)[number];

/** night 0–4, morning 5–11, afternoon 12–16, evening 17–20, late 21–23 (local time). */
export function hourBand(date: Date): HourBand {
  const h = date.getHours();
  if (h < 5) return "night";
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  if (h < 21) return "evening";
  return "late";
}

export function weekday(date: Date): Weekday {
  return WEEKDAYS[date.getDay()];
}

/** The local calendar date as YYYY-MM-DD. */
export function localDay(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Whole days from a saved YYYY-MM-DD to today; null for a first session or a bad value. Capped at 999. */
export function daysSince(saved: string | null | undefined, today: Date): number | null {
  if (!saved || !/^\d{4}-\d{2}-\d{2}$/.test(saved)) return null;
  const [y, m, d] = saved.split("-").map(Number);
  const then = Date.UTC(y, m - 1, d);
  const now = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const days = Math.round((now - then) / 86_400_000);
  if (!Number.isFinite(days) || days < 0) return null;
  return Math.min(days, 999);
}

export type SessionProps = { hour_band: HourBand; weekday: Weekday; days_since_last?: number; returning: boolean };

export function sessionProps(now: Date, lastDay: string | null): SessionProps {
  const days = daysSince(lastDay, now);
  return { hour_band: hourBand(now), weekday: weekday(now), ...(days === null ? {} : { days_since_last: days }), returning: days !== null };
}
