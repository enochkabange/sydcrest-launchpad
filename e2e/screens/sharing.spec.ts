import { expect, test } from "@playwright/test";
import { insertFixtureCertificate, seedEligibleCohort, signIn as signInByEmail } from "../certificates-fixtures";
import { signIn } from "../earn-business";
import { seedSharer } from "../sharing-seed";
import { screensSetup, shoot } from "./shoot";

test("sharing screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const { learner, topicId, roadmapAchievementId } = await seedSharer("Hawa Issahaku");

  await shoot(page, testInfo, "share-achievement", `/a/${roadmapAchievementId}`);
  await shoot(page, testInfo, "share-card-story", `/og/achievements/${roadmapAchievementId}/story`);
  await shoot(page, testInfo, "share-card-square", `/og/achievements/${topicId}/square`);
  await signIn(page, learner);
  await shoot(page, testInfo, "profile-milestones", "/profile#milestones");


  // The share panel open, at a phone and a laptop width.
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/profile#milestones");
    // Retried: a click that lands before hydration does nothing.
    await expect(async () => {
      await page.locator("#milestones").getByRole("button", { name: "Share card" }).first().click();
      await expect(page.getByRole("radio", { name: /Status size/ })).toBeChecked({ timeout: 1_000 });
    }).toPass();
    const file = `e2e-screenshots/share-panel-${width}.png`;
    await page.locator("#milestones").screenshot({ path: file });
    await testInfo.attach(`share-panel-${width}`, { path: file, contentType: "image/png" });
  }

  // A certificate earned in a cohort, as learners see it, with its card. A fresh context: a new learner signs in.
  const cohort = await seedEligibleCohort(`share-${crypto.randomUUID().slice(0, 6)}`);
  const verificationId = await insertFixtureCertificate(cohort);
  const other = await (await page.context().browser()!.newContext()).newPage();
  await shoot(other, testInfo, "share-card-certificate", `/og/certificates/${verificationId}/story`);
  await signInByEmail(other, cohort.learner.email);
  await shoot(other, testInfo, "certificates-share", "/certificates");
  await other.context().close();
});
