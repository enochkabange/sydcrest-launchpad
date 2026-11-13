import { test } from "@playwright/test";
import { signIn } from "../certificates-fixtures";
import { createLearner, promoteToAdmin } from "../learners";
import { screensSetup, shoot } from "./shoot";

test("admin matching audit at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo, 300_000);
  const boss = await createLearner("Mariama Seidu");
  await promoteToAdmin(boss.id);
  await signIn(page, boss.email);
  await shoot(page, testInfo, "matching", "/admin/matching");
});
