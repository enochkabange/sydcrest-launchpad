import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { accraDay, addDays, type Day } from "@/lib/learning-loop/dates";
import { nextUnfinished, requiredProgress } from "@/components/learn/next-node";
import type { ReadinessRow } from "./insights";

/**
 * Reads for My progress (issue #337). Request time: callers sit inside
 * <Suspense>. RLS returns only the learner's own rows (roadmap_progress,
 * review_sessions, learner_attributes, and readiness_scores since
 * 20261114800000_my_progress.sql).
 */

export type CurrentRoadmap = {
  slug: string;
  title: string;
  done: number;
  total: number;
  complete: boolean;
  next: { title: string; href: string } | null;
};

export type MyProgress = {
  today: Day;
  /** Days with a topic update or a finished review (Accra). */
  learningDays: Day[];
  /** One Accra day per required or optional topic finished. */
  doneDays: Day[];
  topicsDone: number;
  quizzesPassed: number;
  /** Best checkpoint quiz score per passed topic, in the order they were passed. */
  quizScores: number[];
  current: CurrentRoadmap | null;
  attributes: {
    usual_hour_band: string | null;
    last_active_on: string | null;
    topics_started: number;
    quiz_retries_90: number;
  } | null;
};

// Two months of topic and review days covers a 30 day count and a 4 week pace.
const WINDOW_DAYS = 60;

export const getMyProgress = cache(async (userId: string): Promise<MyProgress> => {
  const supabase = await createClient();
  const today = accraDay(new Date());
  const since = `${addDays(today, -WINDOW_DAYS)}T00:00:00Z`;

  const [{ data: progress }, { data: reviews }, { data: attributes }] = await Promise.all([
    supabase
      .from("roadmap_progress")
      .select("node_id, status, quiz_score, verified_at, completed_at, updated_at, roadmap_nodes(roadmap_id)")
      .eq("profile_id", userId)
      .neq("status", "not_started")
      .order("updated_at", { ascending: false }),
    supabase.from("review_sessions").select("completed_at").eq("profile_id", userId).gte("completed_at", since),
    supabase
      .from("learner_attributes")
      .select("usual_hour_band, last_active_on, topics_started, quiz_retries_90")
      .eq("profile_id", userId)
      .maybeSingle(),
  ]);

  const rows = progress ?? [];
  const done = rows.filter((r) => r.status === "done");
  const passed = rows
    .filter((r): r is typeof r & { verified_at: string; quiz_score: number } => !!r.verified_at && r.quiz_score !== null)
    .sort((a, b) => a.verified_at.localeCompare(b.verified_at));

  const learningDays = [
    ...rows.filter((r) => r.updated_at >= since).map((r) => accraDay(r.updated_at)),
    ...(reviews ?? []).map((r) => accraDay(r.completed_at)),
  ];

  return {
    today,
    learningDays,
    doneDays: done.map((r) => accraDay(r.completed_at ?? r.verified_at ?? r.updated_at)),
    topicsDone: done.length,
    quizzesPassed: passed.length,
    quizScores: passed.map((r) => Number(r.quiz_score)),
    current: await currentRoadmap(supabase, rows),
    attributes: attributes ?? null,
  };
});

type Client = Awaited<ReturnType<typeof createClient>>;
type ProgressRow = { node_id: string; status: string; roadmap_nodes: { roadmap_id: string } | null };

/** The most recently touched roadmap, the same rule as the home screen. */
async function currentRoadmap(supabase: Client, rows: ProgressRow[]): Promise<CurrentRoadmap | null> {
  const roadmapId = rows.find((r) => r.roadmap_nodes)?.roadmap_nodes?.roadmap_id;
  if (!roadmapId) return null;
  const [{ data: roadmap }, { data: nodes }] = await Promise.all([
    supabase.from("roadmaps").select("slug, title").eq("id", roadmapId).maybeSingle(),
    supabase.from("roadmap_nodes").select("id, slug, title, position, is_optional").eq("roadmap_id", roadmapId),
  ]);
  if (!roadmap) return null;
  const doneIds = new Set(rows.filter((r) => r.status === "done").map((r) => r.node_id));
  const next = nextUnfinished(nodes ?? [], doneIds);
  return {
    slug: roadmap.slug,
    title: roadmap.title,
    ...requiredProgress(nodes ?? [], doneIds),
    next: next ? { title: next.title, href: `/learn/${roadmap.slug}/${next.slug}` } : null,
  };
}

export type MyReadiness = ReadinessRow & { title: string; computed_at: string };

/** The learner's readiness per track, best first, with the track titles. */
export const getMyReadiness = cache(async (userId: string): Promise<MyReadiness[]> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("readiness_scores")
    .select(
      "roadmap_slug, score, band, skills_points, progress_points, portfolio_points, activity_points, profile_points, points_available, skills_verified, skills_total, topics_done, topics_total, portfolio_pieces, active_days_30, about_complete, profile_public, computed_at",
    )
    .eq("profile_id", userId)
    .order("score", { ascending: false })
    .order("roadmap_slug");
  const rows = data ?? [];
  if (!rows.length) return [];
  const { data: roadmaps } = await supabase
    .from("roadmaps")
    .select("slug, title")
    .in(
      "slug",
      rows.map((r) => r.roadmap_slug),
    );
  return rows.map((r) => ({ ...r, title: roadmaps?.find((m) => m.slug === r.roadmap_slug)?.title ?? r.roadmap_slug }));
});
