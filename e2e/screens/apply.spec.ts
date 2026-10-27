import { test } from "@playwright/test";
import { signIn } from "../certificates-fixtures";
import { createLearner, promoteToAdmin } from "../learners";
import { admin, insert } from "../supabase-admin";
import { screensSetup, shoot } from "./shoot";

test("programme application screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);

  // The admin review queue, with one real (test) application and an open cohort.
  const [dmp] = await admin<{ id: string }[]>("/rest/v1/programs?slug=eq.dmp&select=id");
  const [openCohort] = await insert("cohorts", [
    { program_id: dmp.id, name: `Screens cohort ${crypto.randomUUID().slice(0, 6)}`, starts_on: "2027-01-11", max_size: 25, status: "enrolling" },
  ]);
  const [learner, applicant, reviewer] = await Promise.all([
    createLearner("Wumpini Abukari"),
    createLearner("Mariama Iddrisu"),
    createLearner("Abdul-Rahman Yakubu"),
  ]);
  await promoteToAdmin(reviewer.id);
  await insert("cohort_applications", [
    {
      program_id: dmp.id,
      profile_id: applicant.id,
      preferred_cohort_id: openCohort.id,
      specialization: "social_media",
      screening_answers: { motivation: "I sell shea butter in Tamale and want to reach customers online.", device: "Phone only", hours: "5 to 10" },
    },
  ]);
  try {
    await signIn(page, learner.email);
    await shoot(page, testInfo, "apply", "/programme/apply");
    await signIn(page, reviewer.email);
    await shoot(page, testInfo, "admin-applications", "/admin/applications");
  } finally {
    await admin(`/rest/v1/cohort_applications?profile_id=eq.${applicant.id}`, { method: "DELETE" });
    await admin(`/rest/v1/cohorts?id=eq.${openCohort.id}`, { method: "DELETE" });
  }
});
