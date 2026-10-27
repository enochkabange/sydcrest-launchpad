import { getPublicChapters } from "@/lib/chapters/public";

import { siteUrl, type SitemapSource } from "./url";

/** The chapters list and every visible chapter, from the cached reads (refreshed by revalidateChapters). */
export const chapterEntries: SitemapSource = async () => [
  { url: siteUrl("/chapters"), changeFrequency: "weekly" as const, priority: 0.6 },
  ...(await getPublicChapters()).map(({ slug }) => ({
    url: siteUrl(`/chapters/${slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  })),
];
