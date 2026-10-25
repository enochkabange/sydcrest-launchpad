import "server-only";
import type { createClient } from "@/lib/supabase/server";
import type { RoadmapDraft } from "@/content/roadmaps/types";
import { draftNodeRows, draftNodeRowsWithParents, planResources } from "./roadmap-admin";

type Client = Awaited<ReturnType<typeof createClient>>;

export type ImportSummary = { created: number; updated: number; nodes: number; resourcesAdded: number };

/**
 * Imports the draft outlines from src/content/roadmaps as roadmaps, nodes and
 * resources. Idempotent by slug: running it again updates text from the files
 * and never duplicates. New roadmaps arrive unpublished; an existing roadmap
 * keeps its publish flag and display order, and anything an admin added by
 * hand (nodes, links) is left in place. Runs as the signed in admin, so RLS
 * still applies.
 */
export async function importRoadmapDrafts(supabase: Client, drafts: RoadmapDraft[]): Promise<ImportSummary> {
  const slugs = drafts.map((d) => d.slug);
  const { data: before, error: readError } = await supabase.from("roadmaps").select("slug").in("slug", slugs);
  if (readError) throw new Error(`Could not read roadmaps: ${readError.message}`);
  const existed = new Set(before.map((r) => r.slug));

  // Insert the missing ones as drafts. ignoreDuplicates keeps a concurrent run harmless.
  const fresh = drafts
    .map((d, display_order) => ({ d, display_order }))
    .filter(({ d }) => !existed.has(d.slug))
    .map(({ d, display_order }) => ({
      slug: d.slug,
      title: d.title,
      description: d.description,
      track: d.track,
      field_category: d.field_category,
      locale: d.locale,
      display_order,
      is_published: false,
    }));
  if (fresh.length) {
    const { error } = await supabase.from("roadmaps").upsert(fresh, { onConflict: "slug", ignoreDuplicates: true });
    if (error) throw new Error(`Could not create roadmaps: ${error.message}`);
  }

  for (const d of drafts.filter((d) => existed.has(d.slug))) {
    const { error } = await supabase
      .from("roadmaps")
      .update({ title: d.title, description: d.description, track: d.track, field_category: d.field_category, locale: d.locale })
      .eq("slug", d.slug);
    if (error) throw new Error(`Could not update ${d.slug}: ${error.message}`);
  }

  const { data: rows, error: idError } = await supabase.from("roadmaps").select("id, slug").in("slug", slugs);
  if (idError) throw new Error(`Could not read roadmaps: ${idError.message}`);
  const roadmapIdBySlug = new Map(rows.map((r) => [r.slug, r.id]));

  let nodes = 0;
  let resourcesAdded = 0;
  for (const draft of drafts) {
    const roadmapId = roadmapIdBySlug.get(draft.slug);
    if (!roadmapId) throw new Error(`Roadmap ${draft.slug} was not saved`);

    // Pass 1: every node exists (matched on roadmap and slug), so ids are known.
    const { data: saved, error: nodeError } = await supabase
      .from("roadmap_nodes")
      .upsert(draftNodeRows(roadmapId, draft.nodes), { onConflict: "roadmap_id,slug" })
      .select("id, slug");
    if (nodeError) throw new Error(`Could not save nodes of ${draft.slug}: ${nodeError.message}`);
    const idBySlug = new Map(saved.map((n) => [n.slug, n.id]));

    // Pass 2: link parents now that every parent row exists.
    const { error: parentError } = await supabase
      .from("roadmap_nodes")
      .upsert(draftNodeRowsWithParents(roadmapId, draft.nodes, idBySlug), { onConflict: "id" });
    if (parentError) throw new Error(`Could not link nodes of ${draft.slug}: ${parentError.message}`);
    nodes += draft.nodes.length;

    const { data: existing, error: resError } = await supabase
      .from("node_resources")
      .select("id, node_id, url")
      .in("node_id", [...idBySlug.values()]);
    if (resError) throw new Error(`Could not read links of ${draft.slug}: ${resError.message}`);
    const { inserts, updates } = planResources(draft.nodes, idBySlug, existing);
    if (inserts.length) {
      const { error } = await supabase.from("node_resources").insert(inserts);
      if (error) throw new Error(`Could not add links to ${draft.slug}: ${error.message}`);
      resourcesAdded += inserts.length;
    }
    if (updates.length) {
      const { error } = await supabase.from("node_resources").upsert(updates, { onConflict: "id" });
      if (error) throw new Error(`Could not update links of ${draft.slug}: ${error.message}`);
    }
  }

  return { created: drafts.length - existed.size, updated: existed.size, nodes, resourcesAdded };
}
