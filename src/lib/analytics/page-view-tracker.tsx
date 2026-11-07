"use client";

import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import { clientTrack, installListeners, reportWebVital, setRoute } from "./client/analytics";
import { routePattern } from "./context";
import { optedOut } from "./opt-out";

let lastPath: string | null = null;

/**
 * The browser half of first party analytics. Renders nothing; mount once per
 * layout. For each path the visitor lands on it records a page_view under the
 * route pattern (/u/[slug], never the slug), and it reports a sample of Core
 * Web Vitals, form starts and submits, and browser errors through the batched
 * beacon (src/lib/analytics/client). Respects Do Not Track, Global Privacy
 * Control and the switch on the privacy page.
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
    setRoute(routePattern(pathname, params));
    clientTrack("page_view");
  }, [pathname, params]);

  return null;
}
