import type { MetadataRoute } from "next";

import { SITE_URL as BASE } from "@/lib/site";

/** Public marketing pages only. App routes sit behind sign in and are kept out of search. */
const PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/programme", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/partners", priority: 0.7 },
  { path: "/business", priority: 0.6 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, priority }) => ({
    url: new URL(path, BASE).toString(),
    changeFrequency: "monthly",
    priority,
  }));
}
