import "server-only";
import { ogImage } from "@/components/marketing/og-card";
import { truncate } from "./seo";

/**
 * Branded share card for roadmap pages, the same card as the marketing pages.
 * Rendered on request from cached content; the CDN keeps it for a day and
 * serves a stale copy while refreshing, so an edited title shows up within
 * a day without making every share hit the server.
 */
export function roadmapOgImage(headline: string, subline: string) {
  const response = ogImage(truncate(headline, 48), truncate(subline, 70));
  response.headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800");
  return response;
}
