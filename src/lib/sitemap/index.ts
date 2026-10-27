import { expertEntries } from "./experts";
import { corePages } from "./pages";
import { roadmapEntries } from "./roadmaps";
import { skillEntries } from "./skills";
import type { SitemapSource } from "./url";

/**
 * Every source of public URLs, in sitemap order. A feature adds its public
 * pages as its own module beside this file (see experts.ts) and one line
 * here; nothing else needs to change.
 */
export const SITEMAP_SOURCES: SitemapSource[] = [
  corePages,
  roadmapEntries,
  expertEntries,
  skillEntries,
];
