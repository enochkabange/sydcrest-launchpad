import { test } from "@playwright/test";
import { signIn } from "../certificates-fixtures";
import { createLearner } from "../learners";
import { screensSetup, shoot } from "./shoot";

test("outcomes and impact screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  await shoot(page, testInfo, "impact", "/impact");
  const learner = await createLearner("Wumpini Abukari");
  await signIn(page, learner.email);
  await shoot(page, testInfo, "outcomes", "/outcomes");
  await shoot(page, testInfo, "outcomes-new", "/outcomes/new");
});
