import "server-only";
import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type PublicStats = {
  nodes_completed: number;
  current_streak: number;
  followers_count: number;
  following_count: number;
  has_datacamp_license: boolean;
};

const EMPTY_STATS: PublicStats = {
  nodes_completed: 0,
  current_streak: 0,
  followers_count: 0,
  following_count: 0,
  has_datacamp_license: false,
};

/** An opted in profile by slug, or null. Only ever reads the public view. */
export const getPublicProfileBySlug = cache(async (slug: string) => {
  const supabase = await createPublicClient();
  const { data } = await supabase.from("public_profiles").select("*").eq("public_slug", slug.toLowerCase()).maybeSingle();
  return data?.id ? data : null;
});

export const getPublicProfileById = cache(async (id: string) => {
  if (!UUID.test(id)) return null;
  const supabase = await createPublicClient();
  const { data } = await supabase.from("public_profiles").select("*").eq("id", id).maybeSingle();
  return data?.id ? data : null;
});

export const getPublicStats = cache(async (profileId: string): Promise<PublicStats> => {
  const supabase = await createPublicClient();
  const { data } = await supabase
    .from("public_profile_stats")
    .select("nodes_completed, current_streak, followers_count, following_count, has_datacamp_license")
    .eq("id", profileId)
    .maybeSingle();
  if (!data) return EMPTY_STATS;
  return {
    nodes_completed: data.nodes_completed ?? 0,
    current_streak: data.current_streak ?? 0,
    followers_count: data.followers_count ?? 0,
    following_count: data.following_count ?? 0,
    has_datacamp_license: data.has_datacamp_license ?? false,
  };
});

type AchievementRow = { id: string; profile_id: string; type: string; ref_id: string | null; created_at: string };

/** Titles of the topics and roadmaps achievements point at (published ones only, via RLS). */
async function titlesFor(rows: AchievementRow[]) {
  const supabase = await createPublicClient();
  const ids = (type: string) =>
    [...new Set(rows.filter((r) => r.type === type && r.ref_id && UUID.test(r.ref_id)).map((r) => r.ref_id!))];
  const nodeIds = ids("roadmap_node_completed");
  const roadmapIds = ids("roadmap_completed");
  const [nodes, roadmaps] = await Promise.all([
    nodeIds.length ? supabase.from("roadmap_nodes").select("id, title").in("id", nodeIds) : { data: [] },
    roadmapIds.length ? supabase.from("roadmaps").select("id, title").in("id", roadmapIds) : { data: [] },
  ]);
  return new Map([...(nodes.data ?? []), ...(roadmaps.data ?? [])].map((r) => [r.id, r.title]));
}

/** Recent achievements of a public profile. RLS returns none for private ones. */
export async function getPublicAchievements(profileId: string, limit = 12) {
  const supabase = await createPublicClient();
  const { data } = await supabase
    .from("achievements")
    .select("id, profile_id, type, ref_id, created_at")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false })
    .limit(limit);
  const rows = data ?? [];
  const titles = await titlesFor(rows);
  return rows.map((r) => ({ ...r, title: r.ref_id ? (titles.get(r.ref_id) ?? null) : null }));
}

/** One achievement with its owner, only when the owner's profile is public. */
export const getSharedAchievement = cache(async (id: string) => {
  if (!UUID.test(id)) return null;
  const supabase = await createPublicClient();
  const { data } = await supabase
    .from("achievements")
    .select("id, profile_id, type, ref_id, created_at")
    .eq("id", id)
    .maybeSingle();
  if (!data) return null;
  const owner = await getPublicProfileById(data.profile_id);
  if (!owner) return null;
  const titles = await titlesFor([data]);
  return { achievement: { ...data, title: data.ref_id ? (titles.get(data.ref_id) ?? null) : null }, owner };
});
