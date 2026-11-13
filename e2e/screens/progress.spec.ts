import { test } from "@playwright/test";
import { signIn } from "../certificates-fixtures";
import { createLearner } from "../learners";
import { deleteRoadmap, seedRoadmap } from "../seed";
import { admin, insert } from "../supabase-admin";
import { screensSetup, shoot } from "./shoot";

test("My progress at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo, 300_000);
  const roadmap = await seedRoadmap();
  try {
    const learner = await createLearner("Abdul-Rahman Issah");
    const [node] = await admin<{ id: string }[]>(
      `/rest/v1/roadmap_nodes?roadmap_id=eq.${roadmap.id}&slug=eq.${roadmap.quizNode.slug}&select=id`,
    );
    await insert("roadmap_progress", [{ profile_id: learner.id, node_id: node.id, status: "in_progress" }]);
    await admin("/rest/v1/rpc/run_analytics_maintenance", { method: "POST", body: { p_days: 1 } });
    await signIn(page, learner.email);
    await shoot(page, testInfo, "progress", "/progress");
  } finally {
    await deleteRoadmap(roadmap.id);
  }
});
