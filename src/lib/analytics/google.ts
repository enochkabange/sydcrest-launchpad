/**
 * Google Analytics 4, alongside our own first party analytics (epic #320).
 *
 * Off unless NEXT_PUBLIC_GA_MEASUREMENT_ID holds a GA4 measurement id. The
 * page view tracker calls gaLoad() after its own opt out check, so Do Not
 * Track, Global Privacy Control and the switch on /privacy keep Google's tag
 * from loading at all.
 *
 * Once loaded, the Google tag runs on its property settings (founder
 * decision, 12 November 2026): it records page views with the full address
 * and title, and enhanced measurement (scrolls, outbound clicks, form
 * interactions, video, downloads, site search, history changes). We send no
 * page views of our own, which would count each page twice. Advertising
 * storage, advert personalisation and Google signals stay denied here. The
 * privacy page (/privacy#google-analytics) describes this; keep it in step
 * with the property's settings.
 */

const ID_PATTERN = /^G-[A-Z0-9]{4,16}$/;

export function measurementId(value: string | undefined = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID): string | null {
  const id = value?.trim();
  return id && ID_PATTERN.test(id) ? id : null;
}

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

let loadedFor: string | null = null;

/** Browser only. Loads the Google tag once per page load; does nothing without a measurement id. */
export function gaLoad() {
  const id = measurementId();
  if (!id || loadedFor === id) return;
  const w = window as GtagWindow;
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
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
  loadedFor = id;
}
