import "server-only";
import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import type { Database } from "@/lib/supabase/database.types";
import { estimateMinutes } from "./estimates";
import { buildNodeTree, type FlatNode } from "./tree";

/**
 * Published roadmap content for the public pages, cached with `use cache`.
 *
 * Reads are anonymous: a cookie free client with the publishable key, so row
 * level security returns published rows only (drafts, inactive links and quiz
 * answer keys never reach these pages). Having no cookies is also what lets
 * the results be cached and prerendered for everyone.
 *
 * Every result is tagged so admin edits can refresh the pages immediately;
 * see `revalidateRoadmap` in ./revalidate.ts. Without a refresh, content is at
 * most an hour old.
 */

/** The /roadmaps list and sitemap: anything that spans roadmaps. */
export const ROADMAPS_TAG = "roadmaps";
/** One roadmap's page and its node pages. */
export const roadmapTag = (slug: string) => `roadmap:${slug}`;
/** Every cached roadmap read, for a full refresh. */
export const ALL_ROADMAPS_TAG = "roadmaps:all";

function anonClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } },
  );
}

/**
 * The CI build check has no database. At build time a failed read becomes an
 * empty result (pages then render on first visit); at runtime it throws, and
 * a thrown error is never cached.
 */
async function guarded<T>(what: string, empty: T, run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (process.env.NEXT_PHASE === "phase-production-build") {
      console.warn(`Roadmaps: could not load ${what} at build time (${message}); rendering on demand.`);
      return empty;
    }
    throw new Error(`Could not load ${what}: ${message}`);
  }
}

function check(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

const NODE_KINDS = ["section", "topic", "checkpoint"] as const;
/** The column is checked in the database; anything else reads as "derive from depth". */
function asNodeKind(kind: string | null): FlatNode["kind"] {
  return NODE_KINDS.find((k) => k === kind) ?? null;
}

const LEVELS = ["first-steps", "beginner", "next-step"] as const;
export type RoadmapLevel = (typeof LEVELS)[number];
function asLevel(level: string | null): RoadmapLevel | null {
  return LEVELS.find((l) => l === level) ?? null;
}

type EstimateRow = Omit<Database["public"]["Views"]["node_estimate_inputs"]["Row"], "roadmap_id">;

/** Estimated minutes per node id (estimates.ts), null where a node has no lesson. */
function minutesByNode(rows: readonly EstimateRow[]): Record<string, number | null> {
  const out: Record<string, number | null> = {};
  for (const r of rows) {
    if (!r.node_id) continue;
    out[r.node_id] = estimateMinutes({
      hasLesson: !!r.has_lesson,
      lessonWords: r.lesson_words ?? 0,
      practiceWords: r.practice_words ?? 0,
      quizQuestions: r.quiz_questions ?? 0,
    });
  }
  return out;
}

export type RoadmapSummary = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  track: string | null;
  field_category: string | null;
  level: RoadmapLevel | null;
  leads_to: string[];
  updated_at: string;
  node_count: number;
  /** Ids of required (non optional) nodes, for progress on the index cards. */
  required_ids: string[];
  /** Estimated minutes of the required nodes with lessons; 0 when none has one yet. */
  required_minutes: number;
};

export async function getPublishedRoadmaps(): Promise<RoadmapSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(ROADMAPS_TAG, ALL_ROADMAPS_TAG);

  return guarded("roadmaps", [], async () => {
    const client = anonClient();
    const [{ data, error }, estimates] = await Promise.all([
      client
        .from("roadmaps")
        .select("id, slug, title, description, track, field_category, level, leads_to, updated_at, roadmap_nodes(id, is_optional)")
        .eq("is_published", true)
        .order("display_order")
        .order("title"),
      client.from("node_estimate_inputs").select("node_id, has_lesson, lesson_words, practice_words, quiz_questions"),
    ]);
    check(error);
    check(estimates.error);
    const minutes = minutesByNode(estimates.data ?? []);
    return (data ?? []).map(({ roadmap_nodes, level, ...r }) => {
      const required_ids = roadmap_nodes.filter((n) => !n.is_optional).map((n) => n.id);
      return {
        ...r,
        level: asLevel(level),
        node_count: roadmap_nodes.length,
        required_ids,
        required_minutes: required_ids.reduce((sum, id) => sum + (minutes[id] ?? 0), 0),
      };
    });
  });
}

export type PublishedRoadmap = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  track: string | null;
  leads_to: string[];
  updated_at: string;
  nodes: FlatNode[];
  /** Estimated minutes per node id; null (or missing) where a node has no lesson. */
  minutes: Record<string, number | null>;
};

export async function getPublishedRoadmap(slug: string): Promise<PublishedRoadmap | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(roadmapTag(slug), ALL_ROADMAPS_TAG);

  return guarded("roadmap", null, async () => {
    const { data, error } = await anonClient()
      .from("roadmaps")
      .select(
        "id, slug, title, description, track, leads_to, updated_at, roadmap_nodes(id, parent_id, slug, title, summary, position, is_optional, kind, choice_group)",
      )
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    check(error);
    if (!data) return null;
    const estimates = await anonClient()
      .from("node_estimate_inputs")
      .select("node_id, has_lesson, lesson_words, practice_words, quiz_questions")
      .eq("roadmap_id", data.id);
    check(estimates.error);
    const { roadmap_nodes, ...roadmap } = data;
    return {
      ...roadmap,
      nodes: roadmap_nodes.map((n) => ({ ...n, kind: asNodeKind(n.kind) })),
      minutes: minutesByNode(estimates.data ?? []),
    };
  });
}

export type NodeDetail = {
  content: { explanation_md: string; practice_task_md: string | null; content_version: number } | null;
  resources: { id: string; label: string; url: string; kind: "article" | "video" | "practice"; source: string | null }[];
  /** A quiz exists; passing it is how a topic becomes done. */
  hasQuiz: boolean;
  /** Questions in the quiz, 0 without one. */
  quizQuestions: number;
};

/** Pre generated content and active resources for one node of a published roadmap. */
export async function getNodeDetail(roadmapSlug: string, nodeId: string): Promise<NodeDetail> {
  "use cache";
  cacheLife("hours");
  cacheTag(roadmapTag(roadmapSlug), ALL_ROADMAPS_TAG);

  const empty: NodeDetail = { content: null, resources: [], hasQuiz: false, quizQuestions: 0 };
  return guarded("node content", empty, async () => {
    const supabase = anonClient();
    const [content, resources, quiz] = await Promise.all([
      supabase
        .from("node_content")
        .select("explanation_md, practice_task_md, content_version")
        .eq("node_id", nodeId)
        .maybeSingle(),
      supabase
        .from("node_resources")
        .select("id, label, url, kind, source")
        .eq("node_id", nodeId)
        .eq("is_active", true)
        .order("position")
        .order("label"),
      supabase.from("node_quiz").select("id, questions").eq("node_id", nodeId).maybeSingle(),
    ]);
    check(content.error);
    check(resources.error);
    check(quiz.error);
    return {
      content: content.data,
      resources: (resources.data ?? []).map((r) => ({ ...r, kind: r.kind as NodeDetail["resources"][number]["kind"] })),
      hasQuiz: !!quiz.data,
      quizQuestions: Array.isArray(quiz.data?.questions) ? quiz.data.questions.length : 0,
    };
  });
}

/** A roadmap, its outline and one node in it, or null when either is not published. */
export async function getPublishedNode(slug: string, nodeSlug: string) {
  const roadmap = await getPublishedRoadmap(slug);
  if (!roadmap) return null;
  const tree = buildNodeTree(roadmap.nodes);
  const node = roadmap.nodes.find((n) => n.slug === nodeSlug);
  if (!node) return null;
  return { roadmap, tree, node };
}

/** Published roadmaps with their node slugs, for the sitemap and build time params. */
export async function getPublishedPaths(): Promise<{ slug: string; updated_at: string; nodes: string[] }[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(ROADMAPS_TAG, ALL_ROADMAPS_TAG);

  return guarded("roadmap paths", [], async () => {
    const { data, error } = await anonClient()
      .from("roadmaps")
      .select("slug, updated_at, roadmap_nodes(slug)")
      .eq("is_published", true)
      .order("display_order");
    check(error);
    return (data ?? []).map((r) => ({ slug: r.slug, updated_at: r.updated_at, nodes: r.roadmap_nodes.map((n) => n.slug) }));
  });
}
