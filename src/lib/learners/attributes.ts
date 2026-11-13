/**
 * Labels for the computed learner attributes (public.learner_attributes,
 * epic #320 step 4) and the admin learner view. Pure.
 */

export const STAGES = [
  { value: "active", label: "Active", hint: "Active in the last 7 days" },
  { value: "slipping", label: "Slipping", hint: "Last active 8 to 21 days ago" },
  { value: "dormant", label: "Dormant", hint: "Last active more than 21 days ago" },
  { value: "not_started", label: "Not started", hint: "Joined over 14 days ago, never opened a topic" },
  { value: "new", label: "New", hint: "Joined in the last 14 days" },
] as const;
export type Stage = (typeof STAGES)[number]["value"];

export function isStage(value: unknown): value is Stage {
  return typeof value === "string" && STAGES.some((s) => s.value === value);
}

export function stageLabel(value: string | null | undefined): string {
  return STAGES.find((s) => s.value === value)?.label ?? "Not computed yet";
}

const HOUR_BAND_LABELS: Record<string, string> = {
  night: "Night (midnight to 5am)",
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  late: "Late evening (after 9pm)",
};

export function hourBandLabel(value: string | null | undefined): string {
  return (value && HOUR_BAND_LABELS[value]) || "Not known yet";
}

const DEVICE_LABELS: Record<string, string> = { mobile: "Phone", tablet: "Tablet", desktop: "Computer" };

export function deviceLabel(value: string | null | undefined): string {
  return (value && DEVICE_LABELS[value]) || "Not known yet";
}

/** A 0–1 rate as a whole percentage, or a dash when there is nothing to rate. */
export function percent(rate: number | null | undefined): string {
  return rate === null || rate === undefined || !Number.isFinite(rate) ? "–" : `${Math.round(rate * 100)}%`;
}

/** Turn up rate: attended out of events attended or missed after saying yes. */
export function turnUpRate(attended: number, noShows: number): number | null {
  return attended + noShows > 0 ? attended / (attended + noShows) : null;
}

/** "Today", "Yesterday", "N days ago" from a YYYY-MM-DD, against today's UTC date. */
export function daysAgo(day: string | null | undefined, today: string): string {
  if (!day) return "Never";
  const diff = Math.round((Date.parse(`${today}T00:00:00Z`) - Date.parse(`${day}T00:00:00Z`)) / 86_400_000);
  if (!Number.isFinite(diff)) return "Never";
  if (diff <= 0) return "Today";
  if (diff === 1) return "Yesterday";
  return `${diff} days ago`;
}
