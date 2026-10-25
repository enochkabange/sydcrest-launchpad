import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../supabase/database.types";
import type { NodeContext } from "./prompt";
import { toQuizRows, type GeneratedContent } from "./schema";

export type AdminDb = SupabaseClient<Database>;

/**
 * Supabase client with the secret key. Bypasses RLS, so it must only ever run
 * in server code (Server Actions, scripts). The key is SUPABASE_SECRET_KEY and
 * is never exposed with a NEXT_PUBLIC prefix. Returns null when unconfigured.
 */
export function createAdminDb(env: NodeJS.ProcessEnv = process.env): AdminDb | null {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

export type Selection = {
  roadmapSlug?: string | null;
  nodeId?: string | null;
  /** Include nodes that already have content. Only with a roadmap or a node. */
  regenerate?: boolean;
};

export function selectionError(sel: Selection): string | null {
  if (sel.roadmapSlug && sel.nodeId) return "Choose a roadmap or a node, not both.";
  if (sel.regenerate && !sel.roadmapSlug && !sel.nodeId) {
    return "Regenerating is deliberate: choose one roadmap or one node.";
  }
  return null;
}

type NodeRow = {
  id: string;
  roadmap_id: string;
  parent_id: string | null;
  title: string;
  summary: string | null;
  position: number;
  node_content: { id: string } | null;
};

type RoadmapRow = { id: string; title: string; description: string | null; track: string | null };

const PAGE = 1000;

async function loadNodes(db: AdminDb, roadmapIds: string[]): Promise<NodeRow[]> {
  const rows: NodeRow[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("roadmap_nodes")
      .select("id, roadmap_id, parent_id, title, summary, position, node_content(id)")
      .in("roadmap_id", roadmapIds)
      .order("roadmap_id")
      .order("position")
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`Could not load nodes: ${error.message}`);
    rows.push(...(data as unknown as NodeRow[]));
    if (!data || data.length < PAGE) return rows;
  }
}

/** Builds the roadmap context for one node from the full node list. */
export function contextFor(node: NodeRow, roadmap: RoadmapRow, all: NodeRow[]): NodeContext {
  const parent = node.parent_id ? all.find((n) => n.id === node.parent_id) : undefined;
  const siblings = all
    .filter((n) => n.roadmap_id === node.roadmap_id && n.parent_id === node.parent_id && n.id !== node.id)
    .sort((a, b) => a.position - b.position)
    .map((n) => n.title);
  return {
    nodeId: node.id,
    nodeTitle: node.title,
    nodeSummary: node.summary,
    roadmapTitle: roadmap.title,
    roadmapDescription: roadmap.description,
    track: roadmap.track,
    parentTitle: parent?.title ?? null,
    siblingTitles: siblings,
  };
}

/**
 * The nodes a run should generate: every node without content by default, or
 * every node in one roadmap (or one node) when regenerating.
 */
export async function loadTargets(db: AdminDb, sel: Selection): Promise<NodeContext[]> {
  const problem = selectionError(sel);
  if (problem) throw new Error(problem);

  let roadmapQuery = db.from("roadmaps").select("id, title, description, track");
  if (sel.nodeId) {
    const { data: node, error } = await db.from("roadmap_nodes").select("roadmap_id").eq("id", sel.nodeId).maybeSingle();
    if (error) throw new Error(`Could not load node: ${error.message}`);
    if (!node) throw new Error(`No node with id ${sel.nodeId}`);
    roadmapQuery = roadmapQuery.eq("id", node.roadmap_id);
  } else if (sel.roadmapSlug) {
    roadmapQuery = roadmapQuery.eq("slug", sel.roadmapSlug);
  }
  const { data: roadmaps, error } = await roadmapQuery.order("display_order");
  if (error) throw new Error(`Could not load roadmaps: ${error.message}`);
  if (sel.roadmapSlug && !roadmaps?.length) throw new Error(`No roadmap with slug ${sel.roadmapSlug}`);
  if (!roadmaps?.length) return [];

  const byId = new Map(roadmaps.map((r) => [r.id, r]));
  const nodes = await loadNodes(db, [...byId.keys()]);
  return nodes
    .filter((n) => (sel.nodeId ? n.id === sel.nodeId : true))
    .filter((n) => sel.regenerate || !n.node_content)
    .map((n) => contextFor(n, byId.get(n.roadmap_id)!, nodes));
}

export type WriteOutcome = "written" | "already_collected";

/**
 * Stores one node's generated content. Quiz questions go to node_quiz, the
 * answer key to node_quiz_answers, and node_content last with content_version
 * bumped. node_content.generated_at doubles as the "collected" marker: if it
 * is newer than the batch, this result was stored already and is skipped, so
 * collecting the same batch twice does not bump the version twice.
 */
export async function writeGenerated(
  db: AdminDb,
  nodeId: string,
  content: GeneratedContent,
  batchCreatedAt: string,
): Promise<WriteOutcome> {
  const { data: existing, error: readError } = await db
    .from("node_content")
    .select("id, content_version, generated_at")
    .eq("node_id", nodeId)
    .maybeSingle();
  if (readError) throw new Error(`Could not read node_content: ${readError.message}`);
  if (existing && new Date(existing.generated_at) >= new Date(batchCreatedAt)) return "already_collected";

  const { questions, answerKey, passThreshold } = toQuizRows(content.quiz);
  const { data: quiz, error: quizError } = await db
    .from("node_quiz")
    .upsert({ node_id: nodeId, questions, pass_threshold: passThreshold }, { onConflict: "node_id" })
    .select("id")
    .single();
  if (quizError) throw new Error(`Could not save quiz: ${quizError.message}`);

  const { error: keyError } = await db
    .from("node_quiz_answers")
    .upsert({ quiz_id: quiz.id, answer_key: answerKey }, { onConflict: "quiz_id" });
  if (keyError) throw new Error(`Could not save answer key: ${keyError.message}`);

  const fields = {
    explanation_md: content.explanation_md,
    practice_task_md: content.practice_task_md,
    generated_at: new Date().toISOString(),
  };
  const { error: contentError } = existing
    ? await db
        .from("node_content")
        .update({ ...fields, content_version: existing.content_version + 1 })
        .eq("id", existing.id)
    : await db.from("node_content").insert({ ...fields, node_id: nodeId, content_version: 1 });
  if (contentError) throw new Error(`Could not save content: ${contentError.message}`);
  return "written";
}
