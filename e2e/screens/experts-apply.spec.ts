import { test } from "@playwright/test";
import { signIn } from "../certificates-fixtures";
import { createLearner } from "../learners";
import { screensSetup, shoot } from "./shoot";

test("become an expert screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const learner = await createLearner("Wumpini Abukari");
  await signIn(page, learner.email);
  await shoot(page, testInfo, "experts-apply", "/experts/apply");
  await shoot(page, testInfo, "expert", "/expert");
});
