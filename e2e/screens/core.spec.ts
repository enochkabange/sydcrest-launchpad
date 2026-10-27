import { expect, test } from "@playwright/test";
import { signUpAndConfirm } from "../auth";
import { deleteDmpCohort, seedDmpCohort, type SeededDmpCohort } from "../cohort-seed";
import { createLearner, PASSWORD } from "../learners";
import { deleteExperts, seedExperts, type SeededExperts } from "../experts-seed";
import { deleteRoadmap, seedRoadmap, type SeededRoadmap } from "../seed";
import { screensSetup, shoot } from "./shoot";

let roadmap: SeededRoadmap | undefined;
let cohort: SeededDmpCohort | undefined;
let experts: SeededExperts | undefined;

test.afterEach(async () => {
  if (roadmap) await deleteRoadmap(roadmap.id);
  roadmap = undefined;
  if (cohort) await deleteDmpCohort(cohort);
  cohort = undefined;
  await deleteExperts(experts);
  experts = undefined;
});

test("screenshots of key screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  roadmap = await seedRoadmap();
  experts = await seedExperts();

  const pages: [string, string][] = [
    ["home", "/"],
    ["programme", "/programme"],
    ["roadmaps", "/roadmaps"],
    ["roadmap", `/roadmaps/${roadmap.slug}`],
    ["topic", `/roadmaps/${roadmap.slug}/${roadmap.quizNode.slug}`],
    ["experts", "/experts"],
    ["expert", `/experts/${experts.verified.slug}`],
    ["offer", `/experts/${experts.verified.slug}/offers/${experts.verified.gigId}`],
    ["start", "/start"],
    ["signin", "/login"],
  ];
  for (const [name, path] of pages) await shoot(page, testInfo, name, path);

  await signUpAndConfirm(page, testInfo, "Wumpini Abukari");
  for (const [name, path] of [
    ["dashboard", "/dashboard"],
    ["leaderboards", "/leaderboards"],
    ["profile", "/profile"],
    ["learn", `/learn/${roadmap.slug}/${roadmap.quizNode.slug}`],
  ] as [string, string][]) {
    await shoot(page, testInfo, name, path);
  }

  // Cohort screens (#144): a learner in a DMP cohort in its second week.
  const learner = await createLearner("Wumpini Abukari");
  cohort = await seedDmpCohort(learner.id);
  await page.context().clearCookies();
  await page.goto("/login");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await shoot(page, testInfo, "cohort", "/cohort");
  await shoot(page, testInfo, "cohort-week", "/cohort/week/7");
});
