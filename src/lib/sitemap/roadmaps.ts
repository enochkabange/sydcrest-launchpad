import { getPublishedPaths } from "@/lib/roadmaps/public";
import { nodePath, roadmapPath } from "@/lib/roadmaps/seo";

import { siteUrl, type SitemapSource } from "./url";

/** Published roadmaps and their nodes, from the cached content reads (refreshed by revalidateRoadmap). */
export const roadmapEntries: SitemapSource = async () =>
  (await getPublishedPaths()).flatMap(({ slug, updated_at, nodes }) => [
    { url: siteUrl(roadmapPath(slug)), lastModified: updated_at, changeFrequency: "weekly" as const, priority: 0.8 },
    ...nodes.map((node) => ({
      url: siteUrl(nodePath(slug, node)),
      lastModified: updated_at,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ]);
