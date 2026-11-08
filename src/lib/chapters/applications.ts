import { isRegionSlug } from "@/lib/regions";
import { slugify } from "./model";

/**
 * Applying to start and lead a chapter (#301). Pure helpers for the form at
 * /chapters/start and the admin queue; the table's check constraints stay
 * the authority.
 */

export const APPLICATION_TEXT_MIN = 20;
export const APPLICATION_TEXT_MAX = 2000;

export type ChapterApplicationValues = { town: string; region: string; motivation: string; plan: string };

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function parseChapterApplication(form: FormData) {
  const data: ChapterApplicationValues = {
    town: text(form, "town"),
    region: text(form, "region"),
    motivation: text(form, "motivation"),
    plan: text(form, "plan"),
  };
  const errors: Partial<Record<keyof ChapterApplicationValues, string>> = {};
  if (data.town.length < 2) errors.town = "Enter the town or city.";
  else if (data.town.length > 80) errors.town = "Keep the town under 80 characters.";
  if (!isRegionSlug(data.region)) errors.region = "Choose the region.";
  for (const key of ["motivation", "plan"] as const) {
    const length = data[key].length;
    if (length < APPLICATION_TEXT_MIN) errors[key] = `Write at least ${APPLICATION_TEXT_MIN} characters.`;
    else if (length > APPLICATION_TEXT_MAX) errors[key] = `Keep this under ${APPLICATION_TEXT_MAX} characters.`;
  }
  return { data, errors };
}

/** The chapter address an approval suggests, from the town. */
export function suggestedChapterSlug(town: string) {
  return slugify(town);
}

export type ApplicationStatus = "submitted" | "approved" | "declined" | "withdrawn";

/** Whether someone can send a new application, given their latest one. */
export function canApply(latest: ApplicationStatus | null) {
  return latest !== "submitted" && latest !== "approved";
}
