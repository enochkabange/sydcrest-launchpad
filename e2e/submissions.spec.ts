import { expect, test, type Page } from "@playwright/test";
import { PASSWORD, type Learner } from "./learners";
import { createLearnerRetrying, deleteSeededCohort, findSubmission, gradeAsMentor, seedCohortWithLearner, type SeededCohort } from "./submissions-seed";

/**
 * Assignment submissions (#145). The local stack and CI run without
 * ANTHROPIC_API_KEY, so no test calls the model: sent work shows the
 * friendly "AI feedback is resting" state and waits for the mentor.
 */

let seed: SeededCohort | undefined;
let learner: Learner | undefined;

test.afterEach(async () => {
  if (seed && learner) await deleteSeededCohort(seed, learner.id);
  seed = undefined;
  learner = undefined;
});

async function signIn(page: Page, who: Learner) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(who.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 20_000 });
}

test("a learner drafts, submits, resubmits, sees the grade and adds the work to their portfolio", async ({ page }) => {
  test.setTimeout(120_000);
  learner = await createLearnerRetrying("Abdul-Rahman Iddrisu");
  seed = await seedCohortWithLearner(learner.id);
  await signIn(page, learner);

  await page.goto(`/cohort/work/${seed.weekId}`);
  const section = page.locator("#submit");
  await expect(section.getByRole("heading", { name: "Your work", level: 2 })).toBeVisible();
  await expect(section.getByText("Not started")).toBeVisible();

  // An empty submission is refused with a clear message.
  await section.getByRole("button", { name: "Submit work" }).click();
  await expect(section.getByRole("alert").filter({ hasText: "Add your answer" })).toBeVisible();

  // Draft first.
  const answer = section.getByLabel("Your answer");
  await answer.fill("My first draft about digital work in Tamale.");
  await section.getByRole("button", { name: "Save draft" }).click();
  await expect(section.getByText("Draft saved.")).toBeVisible();
  await expect(section.getByText("Draft", { exact: true })).toBeVisible();

  // Then send it.
  await answer.fill("Digital work lets Mariama sell shea butter online to buyers in Accra and abroad.");
  await section.getByLabel("Link (optional)").fill("https://example.com/my-plan");
  await section.getByRole("button", { name: "Submit work" }).click();
  await expect(section.getByText("Submitted. Your mentor can see it now.")).toBeVisible();
  await expect(section.getByRole("heading", { name: "AI feedback is resting" }).first()).toBeAttached();
  // Sent work cannot go back to a draft; it can only be sent again.
  await expect(section.getByRole("button", { name: "Save draft" })).toHaveCount(0);
  expect(await findSubmission(learner.id, seed.weekId)).toMatchObject({ status: "submitted", attempt: 1 });

  // Resubmission counts a new attempt.
  await section.getByLabel("Your answer").fill("Digital work lets Mariama sell shea butter online. Here is my weekly plan.");
  await section.getByRole("button", { name: "Submit again" }).click();
  await expect(section.getByText("Attempt 2")).toBeVisible();

  // The mentor grades it (the console is #146), and the learner sees the result.
  const row = await findSubmission(learner.id, seed.weekId);
  await gradeAsMentor(row!.id, 78, "Clear plan. Next, add one real post with a photo.");
  await page.reload();
  await expect(section.getByText("Graded", { exact: true })).toBeVisible();
  await expect(section.getByText("78 out of 100").first()).toBeAttached();
  await expect(section.getByText("Clear plan. Next, add one real post with a photo.").first()).toBeAttached();
  await expect(section.getByRole("button", { name: /Submit/ })).toHaveCount(0);

  await section.getByRole("button", { name: "Add to portfolio" }).click();
  await expect(section.getByRole("button", { name: "Remove from portfolio" })).toBeVisible();

  await page.goto("/cohort/work");
  await expect(page.getByRole("heading", { name: "Your work", level: 1 })).toBeVisible();
  await expect(page.getByText("1 of 1 graded piece is in your portfolio.")).toBeVisible();
});

test("someone outside a cohort sees an honest notice instead of the form", async ({ page }) => {
  const outsider = await createLearnerRetrying("Fuseini Alhassan");
  const [week] = await (await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/program_weeks?week_number=eq.2&specialization=is.null&select=id`, {
    headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "" },
  })).json() as { id: string }[];
  await signIn(page, outsider);
  await page.goto(`/cohort/work/${week.id}`);
  await expect(page.getByRole("heading", { name: "Submissions open when you join a cohort" })).toBeVisible();
  await expect(page.getByLabel("Your answer")).toHaveCount(0);
});
