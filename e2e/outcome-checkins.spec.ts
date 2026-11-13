import { expect as baseExpect, test } from "@playwright/test";
import { createLearner, promoteToAdmin } from "./learners";
import { deleteUser, signIn } from "./earn-business";
import { admin, insert } from "./supabase-admin";

/**
 * Outcome check ins (#329): a learner who finished a cohort six months ago
 * answers their check in, and an admin sees it in the cohort's impact
 * report (before and after, response rate) and its printable version. The
 * row is seeded the way the daily job leaves it (created and sent), so the
 * journey does not wait on the cron.
 */

const expect = baseExpect.configure({ timeout: 15_000 });

function isoDay(offset: number) {
  return new Date(Date.now() + offset * 86_400_000).toISOString().slice(0, 10);
}

test("a learner answers a check in and an admin sees the report (#329)", async ({ page }) => {
  const tag = crypto.randomUUID().slice(0, 8);
  const [learner, boss] = await Promise.all([createLearner("Fuseini Abdulai"), createLearner("Mariama Seidu")]);
  await promoteToAdmin(boss.id);
  const [program] = await insert("programs", [
    { slug: `e2e-checkin-${tag}`, title: `Savannah Data Test ${tag}`, duration_weeks: 4, is_published: true },
  ]);
  const cohortName = `June ${tag}`;
  const finishedOn = isoDay(-190);
  const [cohort] = await insert("cohorts", [
    { program_id: program.id, name: cohortName, starts_on: isoDay(-218), status: "completed" },
  ]);
  try {
    await insert("cohort_members", [{ cohort_id: cohort.id, profile_id: learner.id, role: "learner" }]);
    await admin("/rest/v1/learner_profiles", { method: "POST", body: { profile_id: learner.id, employment_status: "looking" } });
    const [checkin] = await insert("outcome_checkins", [
      {
        profile_id: learner.id,
        source: "cohort",
        cohort_id: cohort.id,
        finished_on: finishedOn,
        months: 6,
        due_on: isoDay(-7),
        baseline_status: "looking",
        sent_at: new Date().toISOString(),
      },
    ]);

    // The learner answers from their outcomes page.
    await signIn(page, learner);
    await page.goto("/outcomes");
    await page.getByRole("link", { name: "Answer your 6 month check in" }).click();
    await expect(page).toHaveURL(new RegExp(`/outcomes/check-in/${checkin.id}$`));
    await expect(page.getByRole("heading", { name: "Your 6 month check in" })).toBeVisible();
    await page.getByLabel("What are you doing now?").selectOption("employed");
    await page.getByLabel("Where? (optional)").fill("Tamale Teaching Hospital");
    await page.getByLabel("Monthly earnings (optional)").selectOption("1000_2000");
    await page.getByLabel(/Count my answers, without my name/).check();
    await page.getByRole("button", { name: "Send my answers" }).click();
    await expect(page.getByText("Thanks for checking in. Your answers are saved.")).toBeVisible();
    await expect(page.getByRole("link", { name: "Answer your 6 month check in" })).toHaveCount(0);

    // The admin reads the cohort's report.
    await page.context().clearCookies();
    await signIn(page, boss);
    await page.goto("/admin/check-ins");
    await page.getByLabel("Report for").selectOption({ label: `Savannah Data Test ${tag}, ${cohortName}` });
    await page.getByLabel("Check in", { exact: true }).selectOption("6");
    await page.getByRole("button", { name: "Show report" }).click();
    const tile = (label: string) => page.getByText(label, { exact: true }).locator("xpath=following-sibling::dd[1]");
    await expect(tile("Learners covered")).toHaveText("1");
    await expect(tile("6 month check ins sent")).toHaveText("1");
    await expect(tile("Answered")).toHaveText("1 of 1 (100%)");
    await expect(tile("In work before")).toHaveText("0");
    await expect(tile("In work now")).toHaveText("1");
    await expect(tile("Moved into work")).toHaveText("1");

    await page.getByRole("link", { name: "Printable version" }).click();
    await expect(page).toHaveURL(/\/print\/outcomes\?scope=cohort/);
    await expect(page.getByRole("heading", { name: `Savannah Data Test ${tag}, ${cohortName}` })).toBeVisible();
    await expect(page.getByRole("button", { name: "Print or save as PDF" })).toBeVisible();
  } finally {
    await admin(`/rest/v1/cohorts?id=eq.${cohort.id}`, { method: "DELETE" }).catch(() => undefined);
    await admin(`/rest/v1/programs?id=eq.${program.id}`, { method: "DELETE" }).catch(() => undefined);
    await Promise.all([learner, boss].map((p) => deleteUser(p.id))).catch(() => undefined);
  }
});
