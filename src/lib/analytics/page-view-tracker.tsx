"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { recordPageView } from "./actions";

/** Honour Do Not Track and Global Privacy Control. */
function optedOut() {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav.globalPrivacyControl === true || nav.doNotTrack === "1";
}

/**
 * Records a first party page_view for each path the visitor lands on.
 * Renders nothing. Mount once per layout.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    // Dedupe: StrictMode runs effects twice, and a re-render must not count again.
    if (!pathname || last.current === pathname || optedOut()) return;
    last.current = pathname;
    recordPageView(pathname).catch(() => {});
  }, [pathname]);

  return null;
}
