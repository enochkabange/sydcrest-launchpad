import { test } from "@playwright/test";
import { createLearner, PASSWORD } from "../learners";
import { deleteCohort, seedCohort, type SeededCohort } from "../cohort-seed";
import { screensSetup, shoot } from "./shoot";

let seeded: SeededCohort | undefined;
test.afterEach(async () => {
  if (seeded) await deleteCohort(seeded);
  seeded = undefined;
});

test("programme overview, full curriculum and a cohort week at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  await shoot(page, testInfo, "programme-lean", "/programme");
  await shoot(page, testInfo, "programme-curriculum", "/programme/curriculum");

  const learner = await createLearner("Issahaku Mahama");
  seeded = await seedCohort(learner.id);
  await page.goto("/login");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL(/\/dashboard$/);
  await shoot(page, testInfo, "cohort-week-extra-practice", "/cohort/week/1");
});
