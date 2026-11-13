import { expect, test } from "@playwright/test";
import { signIn } from "./certificates-fixtures";
import { createLearner } from "./learners";
import { deleteRoadmap, seedRoadmap } from "./seed";
import { admin, insert } from "./supabase-admin";

// My progress (epic #320, #337). The readiness block stays off until the
// founder switches it on (READINESS_FOR_LEARNERS=on, not set in CI), even
// when the learner has a readiness row.
test("a learner opens My progress and sees their rhythm and current roadmap, without readiness by default", async ({ page }) => {
  test.setTimeout(120_000);
  const roadmap = await seedRoadmap();
  try {
    const learner = await createLearner("Mariama Seidu");
    // Started a topic today, then the daily maintenance: one readiness row exists.
    const [node] = await admin<{ id: string }[]>(
      `/rest/v1/roadmap_nodes?roadmap_id=eq.${roadmap.id}&slug=eq.${roadmap.quizNode.slug}&select=id`,
    );
    await insert("roadmap_progress", [{ profile_id: learner.id, node_id: node.id, status: "in_progress" }]);
    await admin("/rest/v1/rpc/run_analytics_maintenance", { method: "POST", body: { p_days: 1 } });

    await signIn(page, learner.email);
    await page.goto("/progress");
    await expect(page.getByRole("heading", { name: "My progress", level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Your study rhythm" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Time to finish" })).toBeVisible();
    await expect(page.getByText(new RegExp(`${roadmap.title}: 0 of \\d+ required topics? done`))).toBeVisible();
    await expect(page.getByRole("heading", { name: "Ideas for you" })).toBeVisible();

    await expect(page.getByRole("heading", { name: "Your readiness" })).toHaveCount(0);
    await expect(page.getByTestId("readiness-track")).toHaveCount(0);
  } finally {
    await deleteRoadmap(roadmap.id);
  }
});
