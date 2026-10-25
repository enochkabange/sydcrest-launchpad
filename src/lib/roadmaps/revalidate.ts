import "server-only";
import { revalidateTag } from "next/cache";
import { ALL_ROADMAPS_TAG, ROADMAPS_TAG, roadmapTag } from "./public";

/**
 * Refresh the public roadmap pages after content changes. Call it from a
 * Server Action or Route Handler after any write to roadmaps, roadmap_nodes,
 * node_content or node_resources (including publish and unpublish).
 *
 * - `revalidateRoadmap(slug)` refreshes that roadmap, its node pages, the
 *   /roadmaps list and the sitemap. When a slug is renamed, pass the old slug
 *   and the new one.
 * - `revalidateRoadmap()` refreshes every roadmap page.
 *
 * Expires immediately rather than serving stale once, so an admin who just
 * published sees the change on the next load. Content edits are rare, so the
 * one blocking render this costs is fine.
 */
export function revalidateRoadmap(...slugs: string[]) {
  const now = { expire: 0 };
  if (slugs.length === 0) {
    revalidateTag(ALL_ROADMAPS_TAG, now);
    return;
  }
  revalidateTag(ROADMAPS_TAG, now);
  for (const slug of slugs) revalidateTag(roadmapTag(slug), now);
}
