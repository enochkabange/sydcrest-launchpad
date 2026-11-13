import { test } from "@playwright/test";
import { signIn } from "../certificates-fixtures";
import { createLearner, promoteToAdmin } from "../learners";
import { admin, insert } from "../supabase-admin";
import { screensSetup, shoot } from "./shoot";

test("check in, admin report and print screens at 390, 1440 and 1920 (#329)", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const tag = crypto.randomUUID().slice(0, 8);
  const learner = await createLearner("Abiba Yakubu");
  const [program] = await insert("programs", [{ slug: `e2e-shots-${tag}`, title: `Shots ${tag}`, duration_weeks: 4, is_published: true }]);
  const [cohort] = await insert("cohorts", [{ program_id: program.id, name: `Shots ${tag}`, starts_on: "2026-01-05", status: "completed" }]);
  try {
    await insert("cohort_members", [{ cohort_id: cohort.id, profile_id: learner.id, role: "learner" }]);
    const [checkin] = await insert("outcome_checkins", [
      { profile_id: learner.id, source: "cohort", cohort_id: cohort.id, finished_on: "2026-02-02", months: 6, due_on: "2026-08-02", sent_at: new Date().toISOString() },
    ]);
    await signIn(page, learner.email);
    await shoot(page, testInfo, "outcome-check-in", `/outcomes/check-in/${checkin.id}`);
    await promoteToAdmin(learner.id);
    await shoot(page, testInfo, "admin-check-ins", `/admin/check-ins?report=cohort:${cohort.id}&months=6`);
    await shoot(page, testInfo, "print-outcomes", `/print/outcomes?scope=cohort&id=${cohort.id}&months=6`);
  } finally {
    await admin(`/rest/v1/cohorts?id=eq.${cohort.id}`, { method: "DELETE" }).catch(() => undefined);
    await admin(`/rest/v1/programs?id=eq.${program.id}`, { method: "DELETE" }).catch(() => undefined);
    await admin(`/auth/v1/admin/users/${learner.id}`, { method: "DELETE" }).catch(() => undefined);
  }
});
