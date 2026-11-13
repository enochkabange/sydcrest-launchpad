/**
 * Attribution (epic #320): where a visit came from. Pure, so the browser,
 * the share buttons and unit tests share one definition.
 *
 * At the start of each tab session the browser records one visit_started
 * event with the campaign tags in the address (utm_source, utm_medium,
 * utm_campaign, utm_content), the kind of site that linked to us (never the
 * address of that page) and whether the visit landed on an inner page (a deep
 * link) rather than the home page. The landing page's route pattern goes in
 * the event's route column like any other event.
 *
 * Tags are reduced to short lowercase slugs, so a tag can never carry an
 * email address, a phone number or free text into the database.
 */

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];

/** The kind of site a visit came from. Hostnames themselves are not recorded. */
export const REFERRERS = [
  "direct",
  "internal",
  "search",
  "whatsapp",
  "facebook",
  "instagram",
  "linkedin",
  "x",
  "tiktok",
  "youtube",
  "telegram",
  "email",
  "other",
] as const;
export type Referrer = (typeof REFERRERS)[number];

const TAG_MAX = 60;

/**
 * A campaign tag as a slug: lowercase, anything other than letters and
 * digits becomes a hyphen, cut to 60 characters. Null when nothing is left
 * or the tag looks like an email address or phone number.
 */
export function normaliseTag(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const raw = value.trim();
  if (!raw || raw.includes("@") || raw.replace(/\D/g, "").length >= 8) return null;
  const slug = raw
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, TAG_MAX)
    .replace(/-+$/, "");
  return slug || null;
}

const SITES: [Referrer, RegExp][] = [
  // Webmail first: mail.google.com would otherwise count as search.
  ["email", /^(mail\.google\.com|outlook\.(live|office|office365)\.com|mail\.yahoo\.com|mail\.proton\.me)$/],
  ["search", /(^|\.)(google|bing|duckduckgo|yahoo|yandex|baidu|ecosia|brave|startpage)\.[a-z.]+$|^search\./],
  ["whatsapp", /(^|\.)(whatsapp\.(com|net)|wa\.me)$/],
  ["facebook", /(^|\.)(facebook\.com|fb\.com|fb\.me|messenger\.com)$/],
  ["instagram", /(^|\.)instagram\.com$/],
  ["linkedin", /(^|\.)(linkedin\.com|lnkd\.in)$/],
  ["x", /(^|\.)(x\.com|twitter\.com|t\.co)$/],
  ["tiktok", /(^|\.)tiktok\.com$/],
  ["youtube", /(^|\.)(youtube\.com|youtu\.be)$/],
  ["telegram", /(^|\.)(telegram\.org|t\.me|telegram\.me)$/],
];

/** Which kind of site a referrer URL is; direct when there is none, internal for our own host. */
export function classifyReferrer(referrer: string | null | undefined, ownHost: string): Referrer {
  if (!referrer || !URL.canParse(referrer)) return "direct";
  const url = new URL(referrer);
  if (url.protocol === "android-app:") {
    // Android apps that open links pass their package name.
    const app = url.host.toLowerCase();
    // Gmail is com.google.android.gm, so mail apps come before Google search.
    if (app.endsWith(".gm") || app.includes("mail") || app.includes("outlook")) return "email";
    if (app.includes("whatsapp")) return "whatsapp";
    if (app.includes("facebook")) return "facebook";
    if (app.includes("instagram")) return "instagram";
    if (app.includes("linkedin")) return "linkedin";
    if (app.includes("twitter")) return "x";
    if (app.includes("telegram")) return "telegram";
    if (app.includes("google")) return "search";
    return "other";
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return "other";
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  const own = ownHost.toLowerCase().split(":", 1)[0].replace(/^www\./, "");
  if (host === own) return "internal";
  for (const [kind, pattern] of SITES) if (pattern.test(host)) return kind;
  return "other";
}

export type VisitProps = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  referrer: Referrer;
  deep_link: boolean;
};

/** The props of visit_started for a landing page. */
export function visitProps(location: { search: string; host: string; pathname: string }, referrer: string): VisitProps {
  const params = new URLSearchParams(location.search);
  const props: VisitProps = {
    referrer: classifyReferrer(referrer, location.host),
    deep_link: location.pathname !== "/" && location.pathname !== "",
  };
  for (const key of UTM_KEYS) {
    const tag = normaliseTag(params.get(key));
    if (tag) props[key] = tag;
  }
  return props;
}

/**
 * A share link with campaign tags, so visits from it are counted under the
 * share: utm_source is how it was shared (the share sheet, a copied link),
 * utm_medium is "share" and utm_campaign is what was shared.
 */
export function withShareTags(url: string, how: "share" | "copy", what: string): string {
  if (!URL.canParse(url)) return url;
  const out = new URL(url);
  out.searchParams.set("utm_source", how);
  out.searchParams.set("utm_medium", "share");
  out.searchParams.set("utm_campaign", what);
  return out.toString();
}
