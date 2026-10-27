import { mkdirSync } from "node:fs";
import { expect, test, type Page, type TestInfo } from "@playwright/test";
import { signUpAndConfirm } from "./auth";
import { deleteDmpCohort, seedDmpCohort, type SeededDmpCohort } from "./cohort-seed";
import { createLearner, PASSWORD } from "./learners";
import { deleteRoadmap, seedRoadmap, type SeededRoadmap } from "./seed";

/**
 * Full page screenshots of key screens at a phone (390), a laptop (1440) and
 * a desktop (1920) width, so every PR shows what a screen looks like on each
 * (issue #154). Saved to e2e-screenshots/ (uploaded by CI as an artifact)
 * and attached to the report. No pixel assertions: the e2e width check in
 * layout.spec.ts guards the layout; these are for people to look at.
 */
const WIDTHS = [
  { name: "390", width: 390, height: 844 },
  { name: "1440", width: 1440, height: 900 },
  { name: "1920", width: 1920, height: 1080 },
];
const DIR = "e2e-screenshots";

let roadmap: SeededRoadmap | undefined;
let cohort: SeededDmpCohort | undefined;

test.afterEach(async () => {
  if (roadmap) await deleteRoadmap(roadmap.id);
  roadmap = undefined;
  if (cohort) await deleteDmpCohort(cohort);
  cohort = undefined;
});

async function shoot(page: Page, testInfo: TestInfo, name: string, path: string) {
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w.width, height: w.height });
    await page.goto(path);
    // Not networkidle: signed in screens keep a request open. Wait for streamed Suspense islands instead.
    await page.waitForLoadState("load");
    await expect(page.locator("[aria-busy='true'], .animate-skeleton")).toHaveCount(0, { timeout: 15_000 });
    const file = `${DIR}/${name}-${w.name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    await testInfo.attach(`${name}-${w.name}`, { path: file, contentType: "image/png" });
  }
}

test("screenshots of key screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Takes every width itself, once.");
  test.setTimeout(240_000);
  mkdirSync(DIR, { recursive: true });
  roadmap = await seedRoadmap();

  const pages: [string, string][] = [
    ["home", "/"],
    ["programme", "/programme"],
    ["roadmaps", "/roadmaps"],
    ["roadmap", `/roadmaps/${roadmap.slug}`],
    ["topic", `/roadmaps/${roadmap.slug}/${roadmap.quizNode.slug}`],
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
