import "server-only";
import { createClient } from "@/lib/supabase/server";
import { answersKey, parseAnswers, type PathAnswers } from "./quiz";
import { buildPath, chooseTrack, starterFor, type PathResult, type PublishedRoadmap, type Track } from "./recommend";
import { createServiceClient } from "./service-client";

/**
 * The first published roadmap for a track (lowest display_order) with its
 * top level sections, or null while none is published. RLS already limits
 * the read to published content.
 */
export async function publishedRoadmapFor(track: Track): Promise<PublishedRoadmap | null> {
  const supabase = await createClient();
  const { data: roadmap, error } = await supabase
    .from("roadmaps")
    .select("id, slug, title")
    .eq("track", track)
    .eq("is_published", true)
    .order("display_order")
    .limit(1)
    .maybeSingle();
  if (error) console.error("publishedRoadmapFor failed", { track, message: error.message });
  if (!roadmap) return null;

  const { data: nodes } = await supabase
    .from("roadmap_nodes")
    .select("slug, title")
    .eq("roadmap_id", roadmap.id)
    .is("parent_id", null)
    .order("position");
  return { ...roadmap, sections: nodes ?? [] };
}

export async function resultFor(answers: PathAnswers): Promise<PathResult> {
  const { track } = chooseTrack(answers);
  const starter = starterFor(answers, track);
  const [published, starterPublished] = await Promise.all([
    publishedRoadmapFor(track),
    starter ? publishedRoadmapFor(starter.track) : null,
  ]);
  return buildPath(answers, published, starterPublished);
}

/** The learner's most recent saved answers (owner read under RLS). */
export async function latestSavedAnswers(profileId: string): Promise<PathAnswers | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("personalized_paths")
    .select("quiz_answers")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) console.error("latestSavedAnswers failed", { message: error.message });
  return data ? parseAnswers(data.quiz_answers) : null;
}

export type SaveOutcome = { saved: true; result: PathResult } | { saved: false; result: PathResult; reason: "unavailable" | "error" };

/**
 * Saves the path unless these exact answers are already the latest saved
 * ones, then mints track_chosen and path_personalized. Both writes need the
 * service role (learners cannot insert either). Minting is idempotent, so it
 * runs every time in case an earlier attempt failed half way.
 */
export async function savePath(profileId: string, answers: PathAnswers): Promise<SaveOutcome> {
  const result = await resultFor(answers);
  const admin = createServiceClient();
  if (!admin) return { saved: false, result, reason: "unavailable" };

  const latest = await latestSavedAnswers(profileId);
  if (!latest || answersKey(latest) !== answersKey(answers)) {
    const { error } = await admin.from("personalized_paths").insert({
      profile_id: profileId,
      quiz_answers: answers,
      recommended_roadmap_id: result.roadmap?.id ?? null,
      skill_gap: result.skillGap,
      plan: { track: result.track, start: result.start, weekly: result.plan, next_action: result.nextAction },
    });
    if (error) {
      console.error("savePath insert failed", { code: error.code, message: error.message });
      return { saved: false, result, reason: "error" };
    }
  }

  const mints = await Promise.all([
    admin.rpc("mint_achievement", { p_profile_id: profileId, p_type: "track_chosen", p_ref_id: result.track }),
    admin.rpc("mint_achievement", { p_profile_id: profileId, p_type: "path_personalized" }),
  ]);
  for (const { error } of mints) {
    if (error) console.error("mint_achievement failed", { code: error.code, message: error.message });
  }
  return { saved: true, result };
}
