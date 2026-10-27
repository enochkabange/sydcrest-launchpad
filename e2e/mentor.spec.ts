import { expect as baseExpect, test, type Page } from "@playwright/test";
import { createLearner, PASSWORD, promoteToAdmin, type Learner } from "./learners";
import { deleteMentorCohort, seedMentorCohort, type MentorSeed } from "./mentor-seed";
import { admin, insert } from "./supabase-admin";

/**
 * Mentor console, capstone peer review and cohort admin (issue #146), at
 * phone and desktop widths, against the local stack.
 */

// Each journey seeds five accounts and streams several Suspense islands.
const expect = baseExpect.configure({ timeout: 15_000 });
test.describe.configure({ timeout: 120_000 });

async function signIn(page: Page, who: { email: string }) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(who.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

let seed: MentorSeed | undefined;
const extra: Learner[] = [];

test.afterEach(async () => {
  if (seed) await deleteMentorCohort(seed);
  seed = undefined;
  await Promise.all(extra.splice(0).map((p) => admin(`/auth/v1/admin/users/${p.id}`, { method: "DELETE" }).catch(() => undefined)));
});

test("a mentor grades queued work, assigns a capstone peer review and defers a learner", async ({ page }) => {
  seed = await seedMentorCohort();
  await signIn(page, seed.mentor);

  await page.goto("/mentor");
  await expect(page.getByRole("heading", { level: 1, name: seed.cohort.name })).toBeVisible();
  const queue = page.getByRole("region", { name: "Review queue" });
  await expect(queue.getByRole("link", { name: "Fuseini Alhassan" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Wumpini Abukari" }).first()).toBeVisible();

  // Grade the queued week one work.
  await queue.getByRole("link", { name: "Fuseini Alhassan" }).click();
  await expect(page.getByRole("heading", { level: 1, name: /Fuseini Alhassan, week 1/ })).toBeVisible();
  await page.getByLabel("Final score (0 to 100)").fill("72");
  await page.getByLabel("Feedback for the learner (optional)").fill("Good interviews, Fuseini. Add the prices you heard.");
  await page.getByRole("button", { name: "Save grade" }).click();
  await expect(page.getByText("Grade saved.")).toBeVisible();

  // Assign a peer reviewer to Mariama's capstone.
  await page.goto(`/mentor/submissions/${seed.capstoneSubmissionId}`);
  await expect(page.getByRole("heading", { level: 1, name: /Mariama Seidu, week 12/ })).toBeVisible();
  await page.getByLabel("Reviewer").selectOption({ label: "Wumpini Abukari" });
  await page.getByRole("button", { name: "Assign peer review" }).click();
  await expect(page.getByText("Peer review assigned.")).toBeVisible();
  await expect(page.getByText("Wumpini Abukari").last()).toBeVisible();

  // Defer Abdul-Rahman to the later cohort with a reason.
  await page.goto(`/mentor/learners/${seed.learners.abdul.memberId}`);
  await expect(page.getByRole("heading", { level: 1, name: "Abdul-Rahman Yakubu" })).toBeVisible();
  await page.getByLabel("Move to").selectOption(seed.later.id);
  await page.getByLabel("Reason").fill("Missed three weeks while caring for family. Agreed to restart.");
  await page.getByRole("button", { name: "Defer learner" }).click();
  // The deferral form leaves once the learner is placed; check what stays.
  await expect(page.getByText(`Moved to ${seed.later.name}.`)).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText("Deferred. Missed three weeks while caring for family. Agreed to restart.")).toBeVisible();

  await page.goto(`/mentor?cohort=${seed.cohort.id}`);
  const row = page.locator("tr", { hasText: "Abdul-Rahman Yakubu" }).first();
  await expect(row.getByText("Deferred")).toBeVisible();
});

test("a learner sees reviews to do and submits a rubric review", async ({ page }) => {
  seed = await seedMentorCohort();
  // Staff assignment is covered above; assign here with the service role to keep this journey short.
  const [review] = await insert("peer_reviews", [
    { submission_id: seed.capstoneSubmissionId, reviewer_id: seed.learners.wumpini.id, assigned_by: seed.mentor.id },
  ]);
  await signIn(page, seed.learners.wumpini);

  await page.goto("/cohort/reviews");
  await expect(page.getByRole("heading", { level: 2, name: "Reviews to do" })).toBeVisible();
  await page.getByRole("link", { name: /Week 12/ }).click();
  await expect(page).toHaveURL(new RegExp(`/cohort/reviews/${review.id}$`));
  await expect(page.getByText(/three month campaign plan for a Tamale tailoring shop/)).toBeVisible();
  // The author is never shown to the reviewer.
  await expect(page.getByText("Mariama Seidu")).toHaveCount(0);

  const scores = page.getByRole("spinbutton");
  const count = await scores.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) await scores.nth(i).fill("1");
  await page.getByLabel("Comment for your peer").fill("The budget is clear, Mariama. Say how you will measure walk ins.");
  await page.getByRole("button", { name: "Send review" }).click();
  await expect(page.getByText(/Review sent/)).toBeVisible();

  await page.goto("/cohort/reviews");
  await expect(page.getByText("All your reviews are sent")).toBeVisible();
});

test("learners cannot open the mentor console or another person's review", async ({ page }) => {
  seed = await seedMentorCohort();
  const [review] = await insert("peer_reviews", [
    { submission_id: seed.capstoneSubmissionId, reviewer_id: seed.learners.wumpini.id, assigned_by: seed.mentor.id },
  ]);
  await signIn(page, seed.learners.fuseini);
  await page.goto("/mentor");
  await expect(page.getByText("This page could not be found.")).toBeVisible();
  await page.goto(`/cohort/reviews/${review.id}`);
  await expect(page.getByText("This page could not be found.")).toBeVisible();
});

test("an admin creates a cohort and adds a mentor by email", async ({ page }) => {
  const boss = await createLearner("Napari Sumaila");
  const mentor = await createLearner("Salifu Iddrisu");
  extra.push(boss, mentor);
  await promoteToAdmin(boss.id);
  await signIn(page, boss);

  const name = `Yendi e2e ${crypto.randomUUID().slice(0, 6)}`;
  await page.goto("/admin/cohorts");
  const [dmp] = await admin<{ id: string }[]>("/rest/v1/programs?slug=eq.dmp&select=id");
  await page.getByLabel("Programme").selectOption(dmp.id);
  await page.getByLabel("Name").fill(name);
  await page.getByLabel("Starts on").fill("2027-02-01");
  await page.getByRole("button", { name: "Create cohort" }).click();
  await expect(page.getByRole("heading", { level: 1, name })).toBeVisible();
  const cohortId = page.url().split("/").pop()!;

  try {
    await page.getByLabel("Their sign in email").fill(mentor.email);
    await page.getByRole("button", { name: "Add to cohort" }).click();
    await expect(page.getByText("Added as mentor.")).toBeVisible();
    await expect(page.locator("tr", { hasText: "Salifu Iddrisu" })).toBeVisible();

    await page.getByLabel("Their sign in email").fill("nobody.here@example.test");
    await page.getByRole("button", { name: "Add to cohort" }).click();
    await expect(page.getByText("No account uses that email. Ask them to sign up first.")).toBeVisible();
  } finally {
    await admin(`/rest/v1/cohorts?id=eq.${cohortId}`, { method: "DELETE" });
  }
});
