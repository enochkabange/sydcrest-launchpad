/**
 * Imports every roadmap outline and lesson into the STAGING project and
 * publishes the roadmaps, as /admin/roadmaps "Import draft roadmaps" plus
 * publish would. Run by .github/workflows/staging-content.yml with a secret
 * key fetched at run time; it refuses any project other than staging.
 *
 *   NODE_OPTIONS=--conditions=react-server pnpm tsx scripts/staging/import-content.ts
 */
import { createClient } from "@supabase/supabase-js";
import { ROADMAP_DRAFTS } from "../../src/content/roadmaps";
import { TRACK_CONTENT } from "../../src/content/roadmaps/content";
import { importTrackContent } from "../../src/lib/content-import";
import { importRoadmapDrafts } from "../../src/lib/roadmap-import";
import type { Database } from "../../src/lib/supabase/database.types";

const STAGING_REF = "wyxeerwocbnqmjjzpgun";

async function main() {
  const url = process.env.SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SECRET_KEY ?? "";
  if (url !== `https://${STAGING_REF}.supabase.co`) throw new Error(`Refusing to run against ${url || "no URL"}: staging only.`);
  if (!key) throw new Error("SUPABASE_SECRET_KEY is not set.");

  const supabase = createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  // The importers take the app's server client type; the secret key client has the same API.
  const client = supabase as unknown as Parameters<typeof importRoadmapDrafts>[0];

  const outlines = await importRoadmapDrafts(client, ROADMAP_DRAFTS);
  console.log(`Outlines: ${outlines.created} new, ${outlines.updated} updated, ${outlines.nodes} nodes, ${outlines.resourcesAdded} new links.`);

  const lessons = await importTrackContent(client as unknown as Parameters<typeof importTrackContent>[0], TRACK_CONTENT);
  console.log(`Lessons: ${lessons.written} written, ${lessons.unchanged} already up to date.`);
  const missing = [...lessons.missingRoadmaps, ...lessons.missingNodes];
  if (missing.length) throw new Error(`No matching node for: ${missing.join(", ")}`);

  const { data: published, error } = await supabase
    .from("roadmaps")
    .update({ is_published: true })
    .in("slug", ROADMAP_DRAFTS.map((d) => d.slug))
    .select("slug");
  if (error) throw new Error(`Could not publish: ${error.message}`);
  console.log(`Published ${published.length} roadmaps.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
