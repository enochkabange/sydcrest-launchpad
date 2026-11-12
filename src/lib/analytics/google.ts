/**
 * Google Analytics 4, alongside our own first party analytics (epic #320).
 *
 * Off unless NEXT_PUBLIC_GA_MEASUREMENT_ID holds a GA4 measurement id. The
 * page view tracker calls gaPageView() after its own opt out check, so Do Not
 * Track, Global Privacy Control and the switch on /privacy turn Google off
 * too. Google only ever sees the route pattern (/u/[slug], never the slug),
 * the campaign tags of the landing address, and the page title on pages
 * whose address names nobody. Advertising storage and personalisation stay
 * denied, and Google signals are off.
 */

const ID_PATTERN = /^G-[A-Z0-9]{4,16}$/;

/** Query keys Google may see: campaign tags and the Google Ads click id. Everything else is dropped. */
export const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const;

export function measurementId(value: string | undefined = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID): string | null {
  const id = value?.trim();
  return id && ID_PATTERN.test(id) ? id : null;
}

/**
 * The address Google receives: the site origin, the route pattern, and only
 * the campaign keys of the real query string (each cut to 100 characters).
 */
export function gaPageLocation(origin: string, route: string, search: string): string {
  const query = new URLSearchParams(search);
  const kept = new URLSearchParams();
  for (const key of CAMPAIGN_KEYS) {
    const value = query.get(key);
    if (value) kept.set(key, value.slice(0, 100));
  }
  const tail = kept.toString();
  return `${origin}${route}${tail ? `?${tail}` : ""}`;
}

/** The title Google receives: the real title, unless the route has a variable part (it may name a person). */
export function gaPageTitle(route: string, title: string): string {
  return route.includes("[") ? route : title;
}

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

let loadedFor: string | null = null;

function ensureLoaded(id: string): GtagWindow["gtag"] {
  const w = window as GtagWindow;
  if (loadedFor === id && w.gtag) return w.gtag;
  w.dataLayer = w.dataLayer || [];
  // gtag.js reads the arguments object itself, so this must not be a rest parameter.
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  w.gtag("js", new Date());
  w.gtag("config", id, {
    send_page_view: false,
    page_location: `${location.origin}/`,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
  loadedFor = id;
  return w.gtag;
}

/**
 * The referrer Google receives: our own previous page as its cleaned address,
 * or only the origin of another site (enough to attribute the visit).
 */
export function gaReferrer(previous: string | null, documentReferrer: string, origin: string): string | undefined {
  if (previous) return previous;
  if (!documentReferrer) return undefined;
  try {
    const ref = new URL(documentReferrer);
    return ref.origin === origin ? `${origin}/` : `${ref.origin}/`;
  } catch {
    return undefined;
  }
}

let previousLocation: string | null = null;

/**
 * Browser only. Records a GA4 page view for a route pattern; does nothing
 * without a measurement id. The cleaned address, referrer and title are
 * set on the tag itself (not just on this event), so every later hit,
 * including GA4's automatic enhanced measurement events, carries them
 * instead of the real address.
 */
export function gaPageView(route: string) {
  const id = measurementId();
  if (!id) return;
  const gtag = ensureLoaded(id);
  const pageLocation = gaPageLocation(location.origin, route, location.search);
  gtag?.("set", {
    page_location: pageLocation,
    page_referrer: gaReferrer(previousLocation, document.referrer, location.origin),
    page_title: gaPageTitle(route, document.title),
  });
  gtag?.("event", "page_view");
  previousLocation = pageLocation;
}
