import { mkdirSync } from "node:fs";
import { expect, test, type Page, type TestInfo } from "@playwright/test";
import { signUpAndConfirm } from "./auth";
import { createLearner, PASSWORD, promoteToAdmin } from "./learners";
import { admin, insert } from "./supabase-admin";
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

test.afterEach(async () => {
  if (roadmap) await deleteRoadmap(roadmap.id);
  roadmap = undefined;
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
    ["apply", "/programme/apply"],
  ] as [string, string][]) {
    await shoot(page, testInfo, name, path);
  }

  // The admin review queue, with one real (test) application and an open cohort.
  const [dmp] = await admin<{ id: string }[]>("/rest/v1/programs?slug=eq.dmp&select=id");
  const [cohort] = await insert("cohorts", [
    { program_id: dmp.id, name: `Screens cohort ${crypto.randomUUID().slice(0, 6)}`, starts_on: "2027-01-11", max_size: 25, status: "enrolling" },
  ]);
  const [applicant, reviewer] = await Promise.all([createLearner("Mariama Iddrisu"), createLearner("Abdul-Rahman Yakubu")]);
  await promoteToAdmin(reviewer.id);
  await insert("cohort_applications", [
    {
      program_id: dmp.id,
      profile_id: applicant.id,
      preferred_cohort_id: cohort.id,
      specialization: "social_media",
      screening_answers: { motivation: "I sell shea butter in Tamale and want to reach customers online.", device: "Phone only", hours: "5 to 10" },
    },
  ]);
  try {
    await page.context().clearCookies();
    await page.goto("/login");
    await page.getByLabel("Email").fill(reviewer.email);
    await page.getByLabel("Password").fill(PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await shoot(page, testInfo, "admin-applications", "/admin/applications");
  } finally {
    await admin(`/rest/v1/cohort_applications?profile_id=eq.${applicant.id}`, { method: "DELETE" });
    await admin(`/rest/v1/cohorts?id=eq.${cohort.id}`, { method: "DELETE" });
  }
});
