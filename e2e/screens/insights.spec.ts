import { test } from "@playwright/test";
import { signIn } from "../certificates-fixtures";
import { createLearner, promoteToAdmin } from "../learners";
import { screensSetup, shoot } from "./shoot";

test("admin insights dashboards at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo, 600_000);
  const boss = await createLearner("Fuseini Mahama");
  await promoteToAdmin(boss.id);
  await signIn(page, boss.email);
  for (const name of ["", "funnel", "retention", "learning", "features", "cohorts", "earn", "community", "reliability"]) {
    await shoot(page, testInfo, `insights${name ? `-${name}` : ""}`, `/admin/insights${name ? `/${name}` : ""}`);
  }
});
