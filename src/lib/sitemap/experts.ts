import { expertPath } from "@/lib/experts/offers";
import { getExpertSitemapEntries } from "@/lib/experts/sitemap";

import { siteUrl, type SitemapSource } from "./url";

/** Approved experts' public profiles. */
export const expertEntries: SitemapSource = async () =>
  (await getExpertSitemapEntries()).map(({ slug, approvedAt }) => ({
    url: siteUrl(expertPath(slug)),
    ...(approvedAt ? { lastModified: approvedAt } : {}),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
