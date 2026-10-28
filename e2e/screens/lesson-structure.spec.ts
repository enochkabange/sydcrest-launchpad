import { test } from "@playwright/test";
import { signIn } from "../earn-business";
import { createLearner } from "../learners";
import { deleteRatedRoadmap, seedRatedRoadmap } from "../lesson-structure-seed";
import { admin } from "../supabase-admin";
import { screensSetup, shoot } from "./shoot";

test("lesson structure screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const roadmap = await seedRatedRoadmap();
  const learner = await createLearner("Abdul-Rahman Sumaila");
  try {
    await shoot(page, testInfo, "roadmap-career-levels", `/roadmaps/${roadmap.slug}`);
    await shoot(page, testInfo, "topic-rated", `/roadmaps/${roadmap.slug}/${roadmap.lesson.slug}`);
    await signIn(page, learner);
    await shoot(page, testInfo, "lesson-structure", `/learn/${roadmap.slug}/${roadmap.lesson.slug}`);
  } finally {
    await deleteRatedRoadmap(roadmap.id);
    await admin(`/auth/v1/admin/users/${learner.id}`, { method: "DELETE" }).catch(() => {});
  }
});
