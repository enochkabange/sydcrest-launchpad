import { expect, test, type Page } from "@playwright/test";
import { createLearner, PASSWORD, promoteToAdmin, type Learner } from "./learners";
import { deleteRoadmap, seedRoadmap } from "./seed";
import { admin, insert } from "./supabase-admin";

async function signIn(page: Page, who: Learner) {
  await page.context().clearCookies();
  await page.goto("/login");
  await page.getByLabel("Email").fill(who.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 30_000 });
}

// Readiness score v1 (epic #320 step 5, #328): computed by the daily
// maintenance, shown to admins on the fairness page and the learner view.
test("admins see the fairness page and a learner's readiness per track; learners get a 404", async ({ page }) => {
  test.setTimeout(120_000);
  const roadmap = await seedRoadmap();
  try {
    const [learner, boss] = await Promise.all([createLearner("Fatima Iddrisu"), createLearner("Sulemana Abukari")]);
    await promoteToAdmin(boss.id);
    // Started a topic today: one learning day (1.3 of 10 points) out of the 75
    // points a track with no mapped skills can give, so 2, Getting started.
    const [node] = await admin<{ id: string }[]>(
      `/rest/v1/roadmap_nodes?roadmap_id=eq.${roadmap.id}&slug=eq.${roadmap.quizNode.slug}&select=id`,
    );
    await insert("roadmap_progress", [{ profile_id: learner.id, node_id: node.id, status: "in_progress" }]);
    await admin("/rest/v1/rpc/run_analytics_maintenance", { method: "POST", body: { p_days: 1 } });

    await signIn(page, learner);
    await page.goto("/admin/readiness");
    await expect(page.getByText("This page could not be found.")).toBeVisible();

    await signIn(page, boss);
    await page.goto("/admin/readiness");
    await expect(page.getByRole("heading", { name: "Readiness", level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: /^Fairness check: / })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Region", level: 3 })).toBeVisible();

    await page.goto(`/admin/learners/${learner.id}`);
    const row = page.getByTestId("readiness-row").filter({ hasText: roadmap.title });
    await expect(row).toContainText("Getting started");
    await expect(row).toContainText("2 of 100");
    await expect(row).toContainText("Not counted");
  } finally {
    await deleteRoadmap(roadmap.id);
  }
});
