import type { MetadataRoute } from "next";

import { getPublishedPaths } from "@/lib/roadmaps/public";
import { nodePath, roadmapPath } from "@/lib/roadmaps/seo";
import { SITE_URL as BASE } from "@/lib/site";

/** Public pages only. App routes sit behind sign in and are kept out of search. */
const PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/programme", priority: 0.9 },
  { path: "/start", priority: 0.8 },
  { path: "/roadmaps", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/impact", priority: 0.6 },
  { path: "/partners", priority: 0.7 },
  { path: "/business", priority: 0.6 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

const url = (path: string) => new URL(path, BASE).toString();

/** Published roadmaps come from the cached content reads, refreshed by revalidateRoadmap. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const roadmaps = await getPublishedPaths();
  return [
    ...PAGES.map(({ path, priority }) => ({ url: url(path), changeFrequency: "monthly" as const, priority })),
    ...roadmaps.flatMap(({ slug, updated_at, nodes }) => [
      { url: url(roadmapPath(slug)), lastModified: updated_at, changeFrequency: "weekly" as const, priority: 0.8 },
      ...nodes.map((node) => ({
        url: url(nodePath(slug, node)),
        lastModified: updated_at,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
    ]),
  ];
}
