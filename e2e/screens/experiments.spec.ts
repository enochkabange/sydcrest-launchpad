import { test } from "@playwright/test";
import { signIn } from "../certificates-fixtures";
import { createLearner, promoteToAdmin } from "../learners";
import { screensSetup, shoot } from "./shoot";

test("experiments admin and dashboard at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const boss = await createLearner("Hawa Yakubu");
  await promoteToAdmin(boss.id);
  await signIn(page, boss.email);
  await shoot(page, testInfo, "admin-experiments", "/admin/experiments");
  await shoot(page, testInfo, "insights-experiments", "/admin/insights/experiments");
});
