import { test } from "@playwright/test";
import { signIn } from "../certificates-fixtures";
import { createLearner, promoteToAdmin } from "../learners";
import { screensSetup, shoot } from "./shoot";

test("people console and data rights at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo, 400_000);
  const [member, boss] = await Promise.all([createLearner("Fuseini Mahama"), createLearner("Hawa Yakubu")]);
  await promoteToAdmin(boss.id);
  await signIn(page, member.email);
  await shoot(page, testInfo, "profile-delete", "/profile/delete");
  await signIn(page, boss.email);
  await shoot(page, testInfo, "admin-learner-console", `/admin/learners/${member.id}`);
  await shoot(page, testInfo, "admin-audit-log", "/admin/learners/audit");
  await shoot(page, testInfo, "admin-deletion-requests", "/admin/learners/deletions");
});
