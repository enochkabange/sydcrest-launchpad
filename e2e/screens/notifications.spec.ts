import { test } from "@playwright/test";
import { signIn } from "../certificates-fixtures";
import { createLearner } from "../learners";
import { seedNotifications } from "../notifications-seed";
import { screensSetup, shoot } from "./shoot";

test("notification centre and companion screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const empty = await createLearner("Fuseini Alhassan");
  await signIn(page, empty.email);
  await shoot(page, testInfo, "notifications-empty", "/notifications");
  await shoot(page, testInfo, "study-buddy-companion", "/study-buddy");

  const learner = await createLearner("Mariama Seidu");
  await seedNotifications(learner.id);
  await signIn(page, learner.email);
  await shoot(page, testInfo, "notifications", "/notifications");
});
