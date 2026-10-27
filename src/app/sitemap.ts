import type { MetadataRoute } from "next";

import { SITEMAP_SOURCES } from "@/lib/sitemap";

/**
 * Public pages only. App routes sit behind sign in and are kept out of
 * search. Each feature contributes its URLs through src/lib/sitemap.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const parts = await Promise.all(SITEMAP_SOURCES.map((source) => source()));
  return parts.flat();
}
