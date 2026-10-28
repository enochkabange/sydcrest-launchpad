/**
 * A small roadmap with lessons (so it has time estimates), an optional topic
 * and a pick one group, for the modern roadmap specs (issue #244). Test code
 * only, through the shared service role helpers.
 */
import { admin, insert } from "./supabase-admin";

export type ModernRoadmap = {
  id: string;
  slug: string;
  title: string;
  nodes: Record<"records" | "counting" | "excel" | "sheets" | "photos" | "selling" | "catalogue", string>;
};

// About 900 words: 5 minutes of reading at 180 words a minute.
const LESSON = "Wumpini counts the stock at her shop in Tamale market. ".repeat(90).trim();
const PRACTICE = "Count ten items on one shelf and write them in a table.\n\n**Done looks like:** a table of ten items with their counts.";

export async function seedModernRoadmap({
  published = true,
  track = null as string | null,
  field = "data",
} = {}): Promise<ModernRoadmap> {
  const suffix = crypto.randomUUID().slice(0, 8);
  const title = `Shop Records ${suffix}`;
  const [roadmap] = await insert<{ id: string; slug: string }>("roadmaps", [
    {
      slug: `e2e-shop-records-${suffix}`,
      title,
      description: "Keep clear records for a market shop, then sell online.",
      is_published: published,
      field_category: field,
      level: "next-step",
      track,
    },
  ]);
  const [records, selling] = await insert<{ id: string }>("roadmap_nodes", [
    { roadmap_id: roadmap.id, slug: "records", title: "Market records", summary: "Why records matter for a shop.", position: 0 },
    { roadmap_id: roadmap.id, slug: "selling", title: "Selling online", summary: "Take the shop to WhatsApp.", position: 1 },
  ]);
  const [counting, excel, sheets, photos, catalogue] = await insert<{ id: string }>("roadmap_nodes", [
    { roadmap_id: roadmap.id, parent_id: records.id, slug: "counting", title: "Counting stock", summary: "Count what is on the shelves.", position: 0 },
    { roadmap_id: roadmap.id, parent_id: records.id, slug: "excel", title: "Excel", position: 1, choice_group: "sheet-tool" },
    { roadmap_id: roadmap.id, parent_id: records.id, slug: "sheets", title: "Google Sheets", position: 2, choice_group: "sheet-tool" },
    { roadmap_id: roadmap.id, parent_id: records.id, slug: "photos", title: "Price photos", position: 3, is_optional: true },
    {
      roadmap_id: roadmap.id,
      parent_id: selling.id,
      slug: "catalogue",
      title: "WhatsApp catalogue",
      summary: "Show Mariama's customers what is in stock.",
      position: 0,
    },
  ]);
  await insert(
    "node_content",
    [records, counting, catalogue].map((n) => ({ node_id: n.id, explanation_md: LESSON, practice_task_md: PRACTICE })),
  );
  return {
    id: roadmap.id,
    slug: roadmap.slug,
    title,
    nodes: {
      records: records.id,
      counting: counting.id,
      excel: excel.id,
      sheets: sheets.id,
      photos: photos.id,
      selling: selling.id,
      catalogue: catalogue.id,
    },
  };
}

export async function deleteModernRoadmap(id: string) {
  await admin(`/rest/v1/roadmaps?id=eq.${id}`, { method: "DELETE" });
}
