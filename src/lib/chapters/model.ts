import { CHAPTERS } from "@/content/marketing";
import { isRegionSlug, REGIONS, type RegionSlug } from "@/lib/regions";

/**
 * Regional chapters (issue #163, Planning 01 §3): pure helpers shared by the
 * public pages, the lead tools and the admin editor. No database access here,
 * so everything is unit tested. The checks mirror the database constraints
 * on public.chapters, which stay the authority.
 */

export const CHAPTER_STATUSES = ["draft", "launching", "active", "paused", "closed"] as const;
export type ChapterStatus = (typeof CHAPTER_STATUSES)[number];

export function isChapterStatus(value: string): value is ChapterStatus {
  return (CHAPTER_STATUSES as readonly string[]).includes(value);
}

/** Launching and active chapters take new members (private.chapter_is_joinable). */
export function isJoinable(status: string) {
  return status === "launching" || status === "active";
}

/** Label and one honest sentence for each status. Drafts only ever reach admins. */
export const STATUS_COPY: Record<ChapterStatus, { label: string; summary: string }> = {
  draft: { label: "Draft", summary: "Only admins can see this chapter." },
  launching: {
    label: "Being set up",
    summary: "Open to join. The team is planning the first Skillshop.",
  },
  active: { label: "Active", summary: "Open to join. Meets and runs events in the city." },
  paused: { label: "Paused", summary: "Taking a break. New members can join once it restarts." },
  closed: { label: "Closed", summary: "No longer running. Its page stays up for the record." },
};

export function statusCopy(status: string) {
  return isChapterStatus(status) ? STATUS_COPY[status] : STATUS_COPY.closed;
}

/** The five northern capitals in launch order, with the region slug profiles use. */
export const PLANNED_CHAPTERS: { city: string; region: RegionSlug; regionLabel: string }[] = CHAPTERS.map((c) => {
  const region = REGIONS.find((r) => r.label === c.region);
  if (!region) throw new Error(`Unknown chapter region ${c.region}`);
  return { city: c.city, region: region.slug, regionLabel: c.region };
});

export type ChapterLike = { slug: string; name: string; region: string; city: string; status: string };

/**
 * Orders chapters for the list: the northern capitals in launch order (Tamale
 * first), then any other chapter by name. Closed chapters go last.
 */
export function sortChapters<T extends ChapterLike>(chapters: T[]): T[] {
  const rank = (c: T) => {
    const i = PLANNED_CHAPTERS.findIndex((p) => p.region === c.region && p.city.toLowerCase() === c.city.toLowerCase());
    return (c.status === "closed" ? 100 : 0) + (i >= 0 ? i : 50);
  };
  return [...chapters].sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
}

/**
 * Planned capitals that have no chapter yet, for the honest "being set up"
 * cards. A chapter in the same region counts as covering it.
 */
export function plannedWithoutChapter(chapters: ChapterLike[]) {
  return PLANNED_CHAPTERS.filter((p) => !chapters.some((c) => c.region === p.region));
}

/**
 * The chapter to suggest from a learner's profile region: one in their
 * region, preferring one they can join (active before launching). Null when
 * their region has no chapter yet or they have not set a region.
 */
export function suggestChapter<T extends ChapterLike>(chapters: T[], region: string | null): T | null {
  if (!region) return null;
  const order = ["active", "launching", "paused", "closed"];
  const inRegion = chapters
    .filter((c) => c.region === region && order.includes(c.status))
    .sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));
  return inRegion[0] ?? null;
}

/** The planned capital for a region, if it is one of the five. */
export function plannedFor(region: string | null) {
  return PLANNED_CHAPTERS.find((p) => p.region === region) ?? null;
}

// Validation ------------------------------------------------------------------

/** Same pattern as the chapters.whatsapp_url check constraint. */
const WHATSAPP_URL = /^https:\/\/(chat\.whatsapp\.com|wa\.me|whatsapp\.com\/channel)\/[A-Za-z0-9/?=_-]+$/;
const SLUG = /^[a-z0-9][a-z0-9-]{0,48}[a-z0-9]$/;

export const SUMMARY_MAX = 2000;

export function isWhatsappUrl(value: string) {
  return value.length <= 300 && WHATSAPP_URL.test(value);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50)
    .replace(/-+$/g, "");
}

type Errors = Record<string, string | undefined>;

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/** The part of a chapter page its lead owns: summary and WhatsApp link. */
export function parseChapterDetails(form: FormData) {
  const summary = text(form, "summary");
  const whatsapp_url = text(form, "whatsapp_url");
  const errors: Errors = {};
  if (summary.length > SUMMARY_MAX) errors.summary = `Keep the summary under ${SUMMARY_MAX} characters.`;
  if (whatsapp_url && !isWhatsappUrl(whatsapp_url)) {
    errors.whatsapp_url = "Use a WhatsApp invite link that starts with https://chat.whatsapp.com/ or https://wa.me/";
  }
  return { data: { summary, whatsapp_url }, errors };
}

/** The admin create and edit form. An empty slug is made from the city. */
export function parseChapterForm(form: FormData) {
  const name = text(form, "name");
  const city = text(form, "city");
  const region = text(form, "region");
  const status = text(form, "status") || "draft";
  const slug = text(form, "slug").toLowerCase() || slugify(city);
  const details = parseChapterDetails(form);
  const errors: Errors = { ...details.errors };

  if (!name) errors.name = "Give the chapter a name.";
  else if (name.length > 80) errors.name = "Keep the name under 80 characters.";
  if (!city) errors.city = "Add the city.";
  else if (city.length > 80) errors.city = "Keep the city under 80 characters.";
  if (!isRegionSlug(region)) errors.region = "Choose a region.";
  if (!isChapterStatus(status)) errors.status = "Choose a status.";
  if (!SLUG.test(slug)) errors.slug = "Use 2 to 50 lowercase letters, numbers and hyphens.";

  for (const key of Object.keys(errors)) if (!errors[key]) delete errors[key];
  return {
    data: {
      name,
      city,
      region,
      status: status as ChapterStatus,
      slug,
      summary: details.data.summary || null,
      whatsapp_url: details.data.whatsapp_url || null,
    },
    errors,
  };
}

/** Pulls a public profile slug out of what an admin pastes: a slug, /u/slug or a full address. */
export function profileSlugFrom(value: string) {
  const trimmed = value.trim();
  const match = trimmed.match(/\/u\/([^/?#\s]+)/);
  return (match ? match[1] : trimmed.replace(/^@/, "")).toLowerCase();
}
