/**
 * Campaign links for chapter posters and WhatsApp posts (epic #320, issue
 * #335). Every link a chapter shares carries the same tags, so sign ups from
 * it show under the chapter on the acquisition dashboard and in the chapter's
 * "new joins by source":
 *
 *   ?utm_source=whatsapp&utm_medium=chapter&utm_campaign=<chapter slug>
 *
 * (WhatsApp is how chapters reach people, so it is the source on posters
 * too), plus an optional utm_content to tell links apart (for example
 * "poster", "library" or "skillshop-march"). Tags are cleaned with normaliseTag, the same rule the
 * browser applies when it reads them, so what is written is what is counted.
 * Pure.
 */
import { normaliseTag } from "../analytics/attribution";

export const CHAPTER_SOURCE = "whatsapp";
export const CHAPTER_MEDIUM = "chapter";

/** Pages a chapter link may open. */
export const LINK_TARGETS = [
  { value: "chapter", label: "The chapter page" },
  { value: "signup", label: "Sign up" },
  { value: "events", label: "Events" },
  { value: "home", label: "The home page" },
] as const;
export type LinkTarget = (typeof LINK_TARGETS)[number]["value"];

export function targetPath(target: LinkTarget, chapterSlug: string): string {
  switch (target) {
    case "chapter":
      return `/chapters/${chapterSlug}`;
    case "signup":
      return "/signup";
    case "events":
      return "/events";
    case "home":
      return "/";
  }
}

export function isLinkTarget(value: unknown): value is LinkTarget {
  return typeof value === "string" && LINK_TARGETS.some((t) => t.value === value);
}

/**
 * A tagged link for a chapter. `origin` is the site (https://...), `path` a
 * page on it. Null when the chapter slug does not make a tag or the origin
 * is not a web address.
 */
export function chapterCampaignLink({
  origin,
  path = "/",
  chapterSlug,
  content,
}: {
  origin: string;
  path?: string;
  chapterSlug: string;
  content?: string | null;
}): string | null {
  const campaign = normaliseTag(chapterSlug);
  if (!campaign || !URL.canParse(origin)) return null;
  const base = new URL(origin);
  if (base.protocol !== "https:" && base.protocol !== "http:") return null;
  const url = new URL(path.startsWith("/") && !path.startsWith("//") ? path : "/", base.origin);
  url.searchParams.set("utm_source", CHAPTER_SOURCE);
  url.searchParams.set("utm_medium", CHAPTER_MEDIUM);
  url.searchParams.set("utm_campaign", campaign);
  const contentTag = normaliseTag(content);
  if (contentTag) url.searchParams.set("utm_content", contentTag);
  return url.toString();
}
