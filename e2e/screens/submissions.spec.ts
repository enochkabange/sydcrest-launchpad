import { expect, test } from "@playwright/test";
import { PASSWORD } from "../learners";
import {
  createLearnerRetrying,
  deleteSeededCohort,
  gradeAsMentor,
  seedCohortWithLearner,
  seedReviewedSubmission,
} from "../submissions-seed";
import { screensSetup, shoot } from "./shoot";

test("screenshots of the assignment submission screens (#145)", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const learner = await createLearnerRetrying("Mariama Seidu");
  const cohort = await seedCohortWithLearner(learner.id);
  try {
    await page.goto("/login");
    await page.getByLabel("Email").fill(learner.email);
    await page.getByLabel("Password").fill(PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/dashboard$/, { timeout: 20_000 });

    await shoot(page, testInfo, "work-empty", "/cohort/work");
    await shoot(page, testInfo, "submission-new", `/cohort/work/${cohort.weekId}`);
    const id = await seedReviewedSubmission(cohort, learner.id);
    await shoot(page, testInfo, "submission-reviewed", `/cohort/work/${cohort.weekId}`);
    await gradeAsMentor(id, 80, "Well organised. Next week, try a short video version for your WhatsApp group.");
    await shoot(page, testInfo, "submission-graded", `/cohort/work/${cohort.weekId}`);
    await shoot(page, testInfo, "work", "/cohort/work");
  } finally {
    await deleteSeededCohort(cohort, learner.id);
  }
});
