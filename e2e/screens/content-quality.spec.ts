import { test } from "@playwright/test";
import { signIn } from "../certificates-fixtures";
import { createLearner, promoteToAdmin } from "../learners";
import { deleteRoadmap, seedRoadmap } from "../seed";
import { screensSetup, shoot } from "./shoot";

test("content quality screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const roadmap = await seedRoadmap();
  const [learner, boss] = await Promise.all([createLearner("Mariama Iddrisu"), createLearner("Abdul-Rahman Yakubu")]);
  await promoteToAdmin(boss.id);
  try {
    // The lesson, ending with "Was this lesson clear?".
    await signIn(page, learner.email);
    await shoot(page, testInfo, "lesson-feedback", `/learn/${roadmap.slug}/${roadmap.quizNode.slug}`);
    await signIn(page, boss.email);
    await shoot(page, testInfo, "admin-rewrite-queue", "/admin/content/quality");
  } finally {
    await deleteRoadmap(roadmap.id);
  }
});
