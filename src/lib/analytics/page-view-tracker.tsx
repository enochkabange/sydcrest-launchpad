"use client";

import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import { clientTrack, installListeners, reportWebVital, setRoute, trackVisitStart } from "./client/analytics";
import { routePattern } from "./context";
import { gaLoad } from "./google";
import { optedOut } from "./opt-out";

let lastPath: string | null = null;

/**
 * The browser half of first party analytics. Renders nothing; mount once per
 * layout. For each path the visitor lands on it records a page_view under the
 * route pattern (/u/[slug], never the slug), and it reports a sample of Core
 * Web Vitals, form starts and submits, and browser errors through the batched
 * beacon (src/lib/analytics/client). The first page of a tab session also
 * records visit_started: its campaign tags and referrer kind (./attribution).
 * Respects Do Not Track, Global Privacy
 * Control and the switch on the privacy page. When a GA4 measurement id is
 * set, it also loads the Google tag, which then records page views itself
 * (./google.ts).
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const params = useParams();

  useReportWebVitals(reportWebVital);

  useEffect(() => {
    installListeners();
  }, []);

  useEffect(() => {
    // Dedupe: StrictMode runs effects twice, and a re-render must not count again.
    if (!pathname || lastPath === pathname || optedOut()) return;
    lastPath = pathname;
    const route = routePattern(pathname, params);
    setRoute(route);
    // Where the visit came from, once per tab session, under the landing route.
    trackVisitStart();
    clientTrack("page_view");
    // The Google tag loads after the same opt out check and records page views itself.
    gaLoad();
  }, [pathname, params]);

  return null;
}
