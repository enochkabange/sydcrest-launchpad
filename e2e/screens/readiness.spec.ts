import { test } from "@playwright/test";
import { signIn } from "../certificates-fixtures";
import { createLearner, promoteToAdmin } from "../learners";
import { admin } from "../supabase-admin";
import { screensSetup, shoot } from "./shoot";

test("admin readiness page at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo, 300_000);
  const boss = await createLearner("Fuseini Mahama");
  await promoteToAdmin(boss.id);
  await admin("/rest/v1/rpc/run_analytics_maintenance", { method: "POST", body: { p_days: 1 } });
  await signIn(page, boss.email);
  await shoot(page, testInfo, "readiness", "/admin/readiness");
});
