import { test } from "@playwright/test";
import { insertFixtureCertificate, seedEligibleCohort, signIn } from "../certificates-fixtures";
import { screensSetup, shoot } from "./shoot";

test("certificate screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const seeded = await seedEligibleCohort(`screens-${crypto.randomUUID().slice(0, 6)}`);
  const verificationId = await insertFixtureCertificate(seeded);

  await shoot(page, testInfo, "verify", `/verify/${verificationId}`);
  await shoot(page, testInfo, "verify-unknown", `/verify/${"0".repeat(32)}`);
  await signIn(page, seeded.learner.email);
  await shoot(page, testInfo, "certificates", "/certificates");
  await signIn(page, seeded.mentor.email);
  await shoot(page, testInfo, "certificates-issue", `/certificates/issue?cohort=${seeded.cohortId}`);
});
