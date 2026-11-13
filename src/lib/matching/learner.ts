import "server-only";
import { cache } from "react";
import { getViewer } from "@/lib/opportunities/learner";
import { createClient } from "@/lib/supabase/server";
import type { CatalogueSkill, LearnerContext } from "./match";

/**
 * The data matching reads for a signed in learner (#336): the published skill
 * catalogue with the tracks each skill is mapped to, the learner's own
 * readiness per track (public.my_match_readiness) and their verified skills.
 * Reads the session, so callers sit inside <Suspense>.
 */

/** Published skills, each with the tracks (roadmaps.track) and roadmap slugs it is mapped to. */
export const getSkillCatalogue = cache(async (): Promise<CatalogueSkill[]> => {
  const supabase = await createClient();
  const [skills, maps, roadmaps] = await Promise.all([
    supabase.from("skills").select("id, slug, name").eq("is_published", true),
    supabase.from("skill_roadmaps").select("skill_id, roadmap_slug"),
    supabase.from("roadmaps").select("slug, track").eq("is_published", true),
  ]);
  const failed = skills.error ?? maps.error ?? roadmaps.error;
  if (failed) {
    console.error("getSkillCatalogue failed", { message: failed.message });
    return [];
  }
  const trackOf = new Map((roadmaps.data ?? []).map((r) => [r.slug, r.track]));
  const tracks = new Map<string, Set<string>>();
  for (const m of maps.data ?? []) {
    if (!trackOf.has(m.roadmap_slug)) continue;
    const set = tracks.get(m.skill_id) ?? new Set<string>();
    set.add(m.roadmap_slug);
    const track = trackOf.get(m.roadmap_slug);
    if (track) set.add(track);
    tracks.set(m.skill_id, set);
  }
  return (skills.data ?? []).map((s) => ({ ...s, tracks: [...(tracks.get(s.id) ?? [])] }));
});

/** The learner's readiness and verified skills, or null when signed out. */
export const getLearnerContext = cache(async (): Promise<LearnerContext | null> => {
  const viewer = await getViewer();
  if (!viewer) return null;
  const supabase = await createClient();
  const [readiness, verified] = await Promise.all([
    supabase.rpc("my_match_readiness"),
    supabase.from("verified_skills").select("skill_id").eq("profile_id", viewer.id).is("revoked_at", null),
  ]);
  if (readiness.error) console.error("my_match_readiness failed", { message: readiness.error.message });
  if (verified.error) console.error("verified skills failed", { message: verified.error.message });
  return {
    readiness: readiness.data ?? [],
    verifiedSkillIds: new Set((verified.data ?? []).map((v) => v.skill_id)),
  };
});
