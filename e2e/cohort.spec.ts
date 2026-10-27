import { expect, test, type Page } from "@playwright/test";
import { createLearner, PASSWORD, type Learner } from "./learners";
import { deferWithoutTarget, deleteCohort, seedCohort, type SeededCohort } from "./cohort-seed";

/**
 * The learner's cohort home and week view (#144), at phone and desktop
 * widths (the two Playwright projects). Each test seeds its own programme.
 */

let seeded: SeededCohort | undefined;

test.afterEach(async () => {
  if (seeded) await deleteCohort(seeded);
  seeded = undefined;
});

async function signIn(page: Page, learner: Learner) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

test("a learner with no cohort sees an honest empty state", async ({ page }) => {
  await signIn(page, await createLearner("Mariama Seidu"));
  await page.goto("/cohort");
  await expect(page.getByRole("heading", { name: "Your cohort", level: 1 })).toBeVisible();
  await expect(page.getByText("You are not in a cohort yet.")).toBeVisible();
  await expect(page.getByRole("link", { name: "See the programme" })).toHaveAttribute("href", "/programme");
});

test("a learner follows this week, the plan, lessons and specialization", async ({ page }) => {
  const learner = await createLearner("Wumpini Abukari");
  seeded = await seedCohort(learner.id);
  await signIn(page, learner);

  await page.goto("/cohort");
  await expect(page.getByRole("heading", { name: seeded.cohortName, level: 1 })).toBeVisible();
  await expect(page.getByText("Week 1 of 4", { exact: true }).first()).toBeVisible();

  // This week: theme without the dash, objectives, lessons, assignment and due date.
  const thisWeek = page.getByRole("region", { name: "This week" });
  await expect(thisWeek.getByRole("heading", { name: "Spreadsheets for a market stall: the basics" })).toBeVisible();
  await expect(thisWeek.getByText("Keep a price list in a sheet")).toBeVisible();
  await expect(thisWeek.getByText("0 of 2 done")).toBeVisible();
  await expect(thisWeek.getByText(/^Due \w{3}, \d+ \w{3} \d{4}\.$/)).toBeVisible();
  await expect(thisWeek.getByRole("link", { name: "Submit your work" })).toHaveAttribute("href", "/cohort/week/1#submit");

  // Mentor and members come from the roster.
  const people = page.getByRole("region", { name: "Your cohort" });
  await expect(people.getByText("Abdul-Rahman Iddrisu")).toBeVisible();
  await expect(people.getByText("Fuseini Mahama")).toBeVisible();
  await expect(people.getByText("Wumpini Abukari (you)")).toBeVisible();

  // The plan lists every week, week 3 waiting on a specialization.
  const plan = page.getByRole("navigation", { name: "Week plan" });
  await expect(plan.getByRole("link")).toHaveCount(4);
  await expect(plan.getByRole("link", { name: /Week 3.*Your specialization week.*Choose a specialization/ })).toBeVisible();

  // A lesson opens the existing /learn page.
  await thisWeek.getByRole("link", { name: /Spreadsheet basics/ }).click();
  await expect(page).toHaveURL(new RegExp(`/learn/${seeded.roadmap.slug}/${seeded.roadmap.quizNode.slug}$`));
  await expect(page.getByRole("heading", { name: "Spreadsheet basics", level: 1 })).toBeVisible({ timeout: 15_000 });

  // Week 2 links a topic that is not on the site yet.
  await page.goto("/cohort/week/2");
  await expect(page.getByRole("heading", { name: "Writing for customers", level: 1 })).toBeVisible();
  await expect(page.getByText(/lessons for this week are being published/)).toBeVisible();

  // Week 3 asks for a specialization, then follows it.
  await page.goto("/cohort/week/3");
  await expect(page.getByRole("heading", { name: "Your specialization week", level: 1 })).toBeVisible();
  await page.getByRole("radio", { name: /Social media/ }).check();
  await page.getByRole("button", { name: "Choose this specialization" }).click();
  await expect(page.getByText("Saved. Week 3 now follows Social media.").or(page.getByRole("heading", { name: "Short video for a shop" }))).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "Short video for a shop", level: 1 })).toBeVisible();

  // The submission slot is anchored for the form that sends work.
  await expect(page.locator("#submit")).toContainText("Script a short video for a phone repair shop.");
  await expect(page.locator("#submit")).toContainText("Nothing sent for this week yet.");

  // Not a week of this programme (streamed, so the not found page arrives with a 200).
  await page.goto("/cohort/week/9");
  await expect(page.getByText("This page could not be found.")).toBeVisible();
});

test("a deferred learner keeps their progress and sees the next cohort", async ({ page }) => {
  const learner = await createLearner("Mariama Seidu");
  seeded = await seedCohort(learner.id);
  await deferWithoutTarget(seeded.memberId);
  await signIn(page, learner);

  await page.goto("/cohort");
  await expect(page.getByRole("heading", { name: "Your place moves to a later cohort" })).toBeVisible();
  await expect(page.getByText(`Next cohort: ${seeded.laterCohortName}`)).toBeVisible();
  await expect(page.getByRole("region", { name: "This week" })).toHaveCount(0);
  await expect(page.getByRole("region", { name: "Your progress" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Week plan" })).toBeVisible();
});
