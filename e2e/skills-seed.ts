/**
 * Seeds verified skill fixtures (issue #165) through the service role on the
 * LOCAL stack. Test code only. Questions are original and use Northern
 * Ghanaian names, as every demo and test fixture does.
 */
import { expect, type Page } from "@playwright/test";
import { PASSWORD } from "./learners";
import { admin, insert } from "./supabase-admin";

/** Two questions. The right answers are option 1 for q1 and option 0 for q2. */
export const QUIZ_QUESTIONS = [
  {
    id: "q1",
    prompt: "Mariama sells shea butter in Tamale. Which column helps her see how much she earned each day?",
    options: ["Customer's favourite colour", "Quantity sold times price", "The weather", "Her phone model"],
  },
  {
    id: "q2",
    prompt: "Fuseini shares his stock sheet with a helper who should only look at it. Which access does he give?",
    options: ["View only", "Full edit access"],
  },
];
export const QUIZ_KEY = { q1: 1, q2: 0 };

export type SeededSkill = { id: string; slug: string; name: string; quizId?: string; portfolioId?: string };

export async function seedSkill(opts: { roadmapSlug?: string; quiz?: boolean; portfolio?: boolean; published?: boolean } = {}) {
  const suffix = crypto.randomUUID().slice(0, 8);
  const name = `Stock records ${suffix}`;
  const [skill] = await insert<{ slug: string; name: string }>("skills", [
    {
      slug: `e2e-stock-${suffix}`,
      name,
      summary: "Keeping a clear record of what a small shop buys and sells.",
      is_published: opts.published ?? true,
    },
  ]);
  const seeded: SeededSkill = { id: skill.id, slug: skill.slug, name };
  if (opts.roadmapSlug) await mapRoadmap(skill.id, opts.roadmapSlug);
  if (opts.quiz) {
    const [quiz] = await insert("skill_assessments", [
      {
        skill_id: skill.id,
        kind: "quiz",
        title: "Stock records assessment",
        questions: QUIZ_QUESTIONS,
        pass_threshold: 100,
        retry_after_hours: 24,
        is_published: true,
      },
    ]);
    await insert("skill_assessment_answers", [{ assessment_id: quiz.id, answer_key: QUIZ_KEY }]);
    seeded.quizId = quiz.id;
  }
  if (opts.portfolio) {
    const [portfolio] = await insert("skill_assessments", [
      {
        skill_id: skill.id,
        kind: "portfolio",
        title: "Stock records portfolio",
        instructions: "Share a sheet that tracks a week of stock for a real or imagined shop.",
        is_published: true,
      },
    ]);
    seeded.portfolioId = portfolio.id;
  }
  return seeded;
}

export async function mapRoadmap(skillId: string, roadmapSlug: string) {
  await admin("/rest/v1/skill_roadmaps", { method: "POST", body: { skill_id: skillId, roadmap_slug: roadmapSlug } });
}

/** Skills cascade to their mappings, assessments, attempts and verified skills. */
export async function deleteSkill(id: string) {
  await admin(`/rest/v1/skills?id=eq.${id}`, { method: "DELETE" });
}

export async function deleteSkillBySlug(slug: string) {
  await admin(`/rest/v1/skills?slug=eq.${slug}`, { method: "DELETE" });
}

export async function makePublic(profileId: string, slug: string) {
  await admin(`/rest/v1/profiles?id=eq.${profileId}`, { method: "PATCH", body: { is_public: true, public_slug: slug } });
}

export async function setRole(profileId: string, role: "learner" | "mentor" | "admin") {
  await admin(`/rest/v1/profiles?id=eq.${profileId}`, { method: "PATCH", body: { role } });
}

/** What the database does when every required topic of a roadmap is quiz verified. */
export async function mintRoadmapCompleted(profileId: string, roadmapId: string) {
  await admin("/rest/v1/rpc/mint_achievement", {
    method: "POST",
    body: { p_profile_id: profileId, p_type: "roadmap_completed", p_ref_id: roadmapId },
  });
}

export async function signIn(page: Page, email: string) {
  await page.context().clearCookies();
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}
