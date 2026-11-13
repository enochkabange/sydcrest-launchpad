import { expect, test } from "@playwright/test";
import { signIn } from "./certificates-fixtures";
import { createLearner } from "./learners";
import { deleteRoadmap, seedRoadmap } from "./seed";
import { admin, insert } from "./supabase-admin";

// My progress (epic #320, #337): a learner sees their own readiness band and
// the next step that would raise it most.
test("a learner opens My progress and sees their readiness band and a next step", async ({ page }) => {
  test.setTimeout(120_000);
  const roadmap = await seedRoadmap();
  try {
    const learner = await createLearner("Mariama Seidu");
    // Started a topic today, then the daily maintenance: one readiness row, Getting started.
    const [node] = await admin<{ id: string }[]>(
      `/rest/v1/roadmap_nodes?roadmap_id=eq.${roadmap.id}&slug=eq.${roadmap.quizNode.slug}&select=id`,
    );
    await insert("roadmap_progress", [{ profile_id: learner.id, node_id: node.id, status: "in_progress" }]);
    await admin("/rest/v1/rpc/run_analytics_maintenance", { method: "POST", body: { p_days: 1 } });

    await signIn(page, learner.email);
    await page.goto("/progress");
    await expect(page.getByRole("heading", { name: "My progress", level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Your study rhythm" })).toBeVisible();

    const track = page.getByTestId("readiness-track").filter({ hasText: roadmap.title });
    await expect(track.getByTestId("readiness-band")).toHaveText("Getting started");
    await expect(track.getByText("Track progress")).toBeVisible();
    const step = track.getByTestId("readiness-step").first();
    await expect(step).toContainText("required topic");
    await expect(step.getByRole("link", { name: "Open the roadmap" })).toHaveAttribute("href", `/roadmaps/${roadmap.slug}`);
  } finally {
    await deleteRoadmap(roadmap.id);
  }
});
