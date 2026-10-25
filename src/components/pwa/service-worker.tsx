"use client";

import { useEffect } from "react";

/**
 * Registers public/sw.js. Production only: in `next dev` the chunks change on
 * every edit and a caching worker would serve stale code.
 */
export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    const firstVisit = !navigator.serviceWorker.controller;
    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .then(() => navigator.serviceWorker.ready)
      .then((registration) => {
        // This page loaded before the worker could see it. Hand over its URL
        // and the static files it used so it also opens offline next time.
        // The files come from the HTTP cache, so this costs no extra data.
        if (!firstVisit) return;
        const assets = performance
          .getEntriesByType("resource")
          .map((entry) => entry.name)
          .filter((name) => name.includes("/_next/static/"));
        registration.active?.postMessage({
          type: "warm",
          page: location.pathname + location.search,
          assets,
        });
      })
      .catch(() => {
        // No worker means no offline support, but the site still works online.
      });
  }, []);
  return null;
}
