import { expect, test, type Page, type TestInfo } from "@playwright/test";
import { signIn } from "../earn-business";
import { createLearner } from "../learners";
import { deleteModernRoadmap, seedModernRoadmap } from "../roadmap-modern-seed";
import { admin, insert } from "../supabase-admin";
import { screensSetup, shoot } from "./shoot";

const WIDTHS = [
  { name: "390", width: 390, height: 844 },
  { name: "1440", width: 1440, height: 900 },
  { name: "1920", width: 1920, height: 1080 },
];

/** Like shoot(), but waits for the learner's continue bar so the shot shows the signed in state. */
async function shootLearner(page: Page, testInfo: TestInfo, name: string, path: string) {
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w.width, height: w.height });
    await page.goto(path);
    await expect(page.getByRole("region", { name: "Continue where you left off" })).toBeVisible();
    await expect(page.locator("[aria-busy='true'], .animate-skeleton")).toHaveCount(0, { timeout: 15_000 });
    await page.waitForTimeout(300);
    const file = `e2e-screenshots/${name}-${w.name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    await testInfo.attach(`${name}-${w.name}`, { path: file, contentType: "image/png" });
  }
}

test("modern roadmap screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const roadmap = await seedModernRoadmap();
  const learner = await createLearner("Wumpini Alhassan");
  try {
    await shoot(page, testInfo, "roadmaps-index", "/roadmaps");
    await shoot(page, testInfo, "roadmap-visitor", `/roadmaps/${roadmap.slug}`);

    await insert("roadmap_progress", [
      { profile_id: learner.id, node_id: roadmap.nodes.records, status: "done", completed_at: new Date().toISOString() },
      { profile_id: learner.id, node_id: roadmap.nodes.counting, status: "in_progress" },
    ]);
    await insert("personalized_paths", [
      {
        profile_id: learner.id,
        quiz_answers: { v: 1, interests: ["data"], confidence: "some", experience: "tried", goal: "first-job", hours: "3-6", device: "own-computer", data: "okay" },
      },
    ]);
    await signIn(page, learner);
    await shootLearner(page, testInfo, "roadmap-learner", `/roadmaps/${roadmap.slug}`);
    await page.evaluate(() => localStorage.setItem("sydcrest:roadmap-view", "outline"));
    await shootLearner(page, testInfo, "roadmap-learner-list", `/roadmaps/${roadmap.slug}`);
    await page.evaluate(() => localStorage.setItem("sydcrest:roadmap-view", "journey"));
    await shootLearner(page, testInfo, "roadmap-learner-journey", `/roadmaps/${roadmap.slug}`);
    await page.evaluate(() => localStorage.removeItem("sydcrest:roadmap-view"));

    // The topic panel over the roadmap, opened from the map.
    for (const w of WIDTHS) {
      await page.setViewportSize({ width: w.width, height: w.height });
      await page.goto(`/roadmaps/${roadmap.slug}`);
      await page.getByRole("button", { name: "Map", exact: true }).click();
      await page.getByRole("tree", { name: "Roadmap map" }).getByRole("treeitem", { name: /Counting stock/ }).click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await expect(page.locator("[aria-busy='true'], .animate-skeleton")).toHaveCount(0, { timeout: 15_000 });
      await page.waitForTimeout(400);
      const file = `e2e-screenshots/roadmap-panel-${w.name}.png`;
      await page.screenshot({ path: file });
      await testInfo.attach(`roadmap-panel-${w.name}`, { path: file, contentType: "image/png" });
    }
  } finally {
    await deleteModernRoadmap(roadmap.id);
    await admin(`/auth/v1/admin/users/${learner.id}`, { method: "DELETE" }).catch(() => {});
  }
});
