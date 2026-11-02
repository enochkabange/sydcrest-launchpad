import { test } from "@playwright/test";
import { createLearner } from "../learners";
import { deleteRoadmap, seedRoadmap } from "../seed";
import { deleteSkill, makePublic, seedSkill, setRole, signIn } from "../skills-seed";
import { screensSetup, shoot } from "./shoot";

test("verified skill screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const roadmap = await seedRoadmap();
  const skill = await seedSkill({ roadmapSlug: roadmap.slug, quiz: true, portfolio: true });
  try {
    await shoot(page, testInfo, "skills", "/skills");
    await shoot(page, testInfo, "skill", `/skills/${skill.slug}`);

    const learner = await createLearner("Mariama Abdulai");
    await makePublic(learner.id, `mariama-${skill.slug.slice(-8)}`);
    await signIn(page, learner.email);
    await shoot(page, testInfo, "skill-quiz", `/skills/${skill.slug}/quiz`);
    await shoot(page, testInfo, "skill-portfolio", `/skills/${skill.slug}/portfolio`);

    const founder = await createLearner("Fuseini Alhassan");
    await setRole(founder.id, "admin");
    await signIn(page, founder.email);
    await shoot(page, testInfo, "skills-reviews", "/skills/reviews");
    await shoot(page, testInfo, "admin-skills", "/admin/skills");
    await shoot(page, testInfo, "admin-skill-reviewers", "/admin/skills/reviewers");
    await shoot(page, testInfo, "admin-skill", `/admin/skills/${skill.id}`);
    await shoot(page, testInfo, "admin-skill-quiz", `/admin/skills/${skill.id}/assessments/${skill.quizId}`);
  } finally {
    await deleteSkill(skill.id);
    await deleteRoadmap(roadmap.id);
  }
});
