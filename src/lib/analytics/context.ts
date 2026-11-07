/**
 * The request side of an analytics event: device class, route pattern,
 * session and the opt out signals. Pure, so the server, the beacon route and
 * the browser share one definition (and unit tests cover it).
 */
import type { DeviceClass } from "./events";

/** "off" when the visitor turned analytics off on this device (set from the privacy page). */
export const OPT_OUT_COOKIE = "sc_analytics";
/** The current route pattern, e.g. /learn/[slug]/[node], so Server Actions know where they ran. */
export const ROUTE_COOKIE = "sc_route";
/** A random id for this browser tab session. */
export const SESSION_COOKIE = "sc_sid";

type HeaderSource = { get(name: string): string | null };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ROUTE = /^\/[A-Za-z0-9_./[\]()@-]{0,199}$/;

export function isSessionId(value: unknown): value is string {
  return typeof value === "string" && UUID.test(value);
}

/**
 * Do Not Track, Global Privacy Control or the visitor's own switch. When any
 * is on, nothing is recorded: no page views, no actions, no errors.
 */
export function optedOutRequest(headers: HeaderSource, optOutCookie: string | undefined | null): boolean {
  return headers.get("dnt") === "1" || headers.get("sec-gpc") === "1" || optOutCookie === "off";
}

/**
 * Coarse device class from the client hint (Chromium sends Sec-CH-UA-Mobile
 * by default) or the user agent. Never stores the user agent itself.
 */
export function deviceClass(headers: HeaderSource): DeviceClass {
  const ua = headers.get("user-agent") ?? "";
  if (!ua) return "unknown";
  if (/bot|crawl|spider|slurp|preview|headless|lighthouse|pagespeed/i.test(ua)) return "bot";
  if (/iPad|Tablet|PlayBook|Silk|Kindle/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) return "tablet";
  const mobileHint = headers.get("sec-ch-ua-mobile");
  if (mobileHint === "?1" || /Mobi|iPhone|iPod|Android|Opera Mini|KaiOS/i.test(ua)) return "mobile";
  return "desktop";
}

/** A route pattern from the browser's cookie, if it looks like one. */
export function cleanRoute(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const bare = value.split(/[?#]/, 1)[0];
  return ROUTE.test(bare) && !bare.includes("@") ? bare : null;
}

/**
 * The route pattern for a path, given the route's dynamic params
 * (useParams): /u/wumpini-alhassan with { slug } becomes /u/[slug], so a
 * person's slug or an id never reaches the database.
 */
export function routePattern(pathname: string, params: Record<string, string | string[] | undefined> | null): string {
  const segments = pathname.split("/").filter(Boolean).map((s) => safeDecode(s));
  const out = [...segments];
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      const start = indexOfRun(out, value);
      if (start >= 0) out.splice(start, value.length, `[...${key}]`);
    } else {
      const at = out.indexOf(value);
      if (at >= 0) out[at] = `[${key}]`;
    }
  }
  return coarseRoute(`/${out.join("/")}`, true);
}

/**
 * A path made safe without knowing its route: ids and numbers become [id],
 * and segments that are not plain lower case words become [slug]. Used when
 * the browser has not told the server its route pattern yet.
 */
export function coarseRoute(path: string, keepBrackets = false): string {
  const segments = path.split(/[?#]/, 1)[0].split("/").filter(Boolean);
  const clean = segments.map((segment, i) => {
    if (keepBrackets && /^\[(\.\.\.)?[A-Za-z0-9_]+\]$/.test(segment)) return segment;
    if (UUID.test(segment) || /^\d+$/.test(segment)) return "[id]";
    // The first segment is always a section of the app; later ones that look
    // like a slug (hyphens, digits) may name a person or a thing.
    if (i === 0 && /^[a-z][a-z0-9-]{0,40}$/.test(segment)) return segment;
    return /^[a-z]{1,24}$/.test(segment) ? segment : "[slug]";
  });
  const route = `/${clean.join("/")}`;
  return route.length > 200 ? route.slice(0, 200) : route;
}

/**
 * The route pattern from Next's route file path in onRequestError, e.g.
 * /(app)/learn/[slug]/[node]/page becomes /learn/[slug]/[node].
 */
export function routeFromFilePath(routePath: string | undefined): string | null {
  if (!routePath) return null;
  const segments = routePath
    .split("/")
    .filter(Boolean)
    .filter((s) => !/^\(.*\)$/.test(s) && !s.startsWith("@") && s !== "app" && s !== "src")
    .map((s) => s.replace(/^\(\.+\)/, ""));
  if (["page", "route", "layout", "default"].includes(segments.at(-1) ?? "")) segments.pop();
  return cleanRoute(`/${segments.join("/")}`) ?? null;
}

function indexOfRun(haystack: string[], run: string[]) {
  if (!run.length) return -1;
  for (let i = 0; i + run.length <= haystack.length; i++) {
    if (run.every((part, j) => haystack[i + j] === part)) return i;
  }
  return -1;
}

function safeDecode(segment: string) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}
