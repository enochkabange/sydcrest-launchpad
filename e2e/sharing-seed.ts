/**
 * Seeding for the sharing loop (issue #233) through the LOCAL stack's secret
 * key only (see supabase-admin.ts): public profiles and milestones minted the
 * way server code mints them. Test code only.
 */
import { certify } from "./earn-business";
import { createLearner, type Learner } from "./learners";
import { seedRoadmap, type SeededRoadmap } from "./seed";
import { admin } from "./supabase-admin";

export async function makePublic(learner: Learner) {
  await admin(`/rest/v1/profiles?id=eq.${learner.id}`, {
    method: "PATCH",
    body: { is_public: true, public_slug: `${learner.name.split(" ")[0].toLowerCase()}-${crypto.randomUUID().slice(0, 8)}` },
  });
}

/** Mints an achievement through mint_achievement (idempotent) and returns its id. */
export async function mint(learner: Learner, type: string, ref: string) {
  await admin("/rest/v1/rpc/mint_achievement", { method: "POST", body: { p_profile_id: learner.id, p_type: type, p_ref_id: ref } });
  const [row] = await admin<{ id: string }[]>(
    `/rest/v1/achievements?select=id&profile_id=eq.${learner.id}&type=eq.${type}&ref_id=eq.${ref}`,
  );
  return row.id;
}

export async function nodeId(roadmap: SeededRoadmap, slug: string) {
  const [row] = await admin<{ id: string }[]>(`/rest/v1/roadmap_nodes?select=id&roadmap_id=eq.${roadmap.id}&slug=eq.${slug}`);
  return row.id;
}

export type Sharer = { learner: Learner; roadmap: SeededRoadmap; topicId: string; roadmapAchievementId: string };

/**
 * A public learner with a topic, a section, a roadmap and a certificate to
 * share. Milestone posts stay off (the default), so seeding adds nothing to
 * the shared everyone feed.
 */
export async function seedSharer(name = "Wumpini Alhassan"): Promise<Sharer> {
  const [learner, roadmap] = await Promise.all([createLearner(name), seedRoadmap()]);
  await makePublic(learner);
  const quizNode = await nodeId(roadmap, roadmap.quizNode.slug);
  const topicId = await mint(learner, "roadmap_node_completed", quizNode);
  await mint(learner, "section_completed", quizNode);
  const roadmapAchievementId = await mint(learner, "roadmap_completed", roadmap.id);
  await certify(learner);
  return { learner, roadmap, topicId, roadmapAchievementId };
}
