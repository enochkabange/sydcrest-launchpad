import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/** A sitemap source: one feature's public URLs. Listed in src/lib/sitemap/index.ts. */
export type SitemapSource = () => Promise<MetadataRoute.Sitemap> | MetadataRoute.Sitemap;

/** Absolute URL on the public site for a path. */
export const siteUrl = (path: string) => new URL(path, SITE_URL).toString();

/** Static pages that change rarely, at the given priorities. */
export const staticPages =
  (pages: { path: string; priority: number }[]): SitemapSource =>
  () =>
    pages.map(({ path, priority }) => ({ url: siteUrl(path), changeFrequency: "monthly" as const, priority }));
