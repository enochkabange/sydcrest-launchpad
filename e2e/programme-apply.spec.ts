import { expect, test, type Browser, type Page } from "@playwright/test";
import { createLearner, PASSWORD, promoteToAdmin, type Learner } from "./learners";
import { admin, insert } from "./supabase-admin";

/**
 * Issue #143: apply to the DMP from /programme, the admin review queue, and
 * the applicant's status page. /cohort itself is built in issue #144, so the
 * journey checks the link to it rather than the page behind it.
 */

const token = () => crypto.randomUUID().slice(0, 6);

async function signIn(page: Page, learner: Learner) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

async function signedInPage(browser: Browser, learner: Learner) {
  const page = await (await browser.newContext()).newPage();
  await signIn(page, learner);
  return page;
}

async function dmpId() {
  const [row] = await admin<{ id: string }[]>("/rest/v1/programs?slug=eq.dmp&select=id");
  return row.id;
}

const cohorts: string[] = [];
const people: string[] = [];

async function seedCohort(name: string, maxSize = 25) {
  const [cohort] = await insert<{ name: string }>("cohorts", [
    { program_id: await dmpId(), name, starts_on: "2027-01-11", max_size: maxSize, status: "enrolling" },
  ]);
  cohorts.push(cohort.id);
  return cohort;
}

async function learner(name: string) {
  const l = await createLearner(name);
  people.push(l.id);
  return l;
}

test.afterAll(async () => {
  for (const id of people) {
    await admin(`/rest/v1/cohort_applications?profile_id=eq.${id}`, { method: "DELETE" });
    await admin(`/rest/v1/cohort_members?profile_id=eq.${id}`, { method: "DELETE" });
  }
  for (const id of cohorts) await admin(`/rest/v1/cohorts?id=eq.${id}`, { method: "DELETE" });
});

test("signed out visitors see the Apply call to action and keep the waitlist form", async ({ page }) => {
  await page.goto("/programme");
  await expect(page.getByRole("link", { name: "Apply for a seat" })).toHaveAttribute("href", "#apply");
  await expect(page.getByRole("link", { name: "Create an account and apply" })).toHaveAttribute(
    "href",
    "/signup?next=%2Fprogramme%2Fapply",
  );
  await expect(page.getByRole("button", { name: "Join the waitlist" })).toBeVisible();

  await page.getByRole("link", { name: "Sign in to apply" }).click();
  await expect(page).toHaveURL(/\/login\?next=%2Fprogramme%2Fapply$/);

  // Signing in from there lands on the application form.
  const visitor = await learner(`Wumpini Alhassan ${token()}`);
  await page.getByLabel("Email").fill(visitor.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/programme\/apply$/);
  await expect(page.getByRole("button", { name: "Send my application" })).toBeVisible();
});

test("a learner applies, an admin accepts them into a cohort, and the learner is sent to it", async ({ page, browser }) => {
  const id = token();
  const cohort = await seedCohort(`Tamale pilot ${id}`);
  const applicant = await learner(`Mariama Iddrisu ${id}`);
  const reviewer = await learner(`Abdul-Rahman Yakubu ${id}`);
  await promoteToAdmin(reviewer.id);

  await test.step("the learner applies from /programme", async () => {
    await signIn(page, applicant);
    await page.goto("/programme");
    await expect(page.getByRole("link", { name: "Apply now" })).toBeVisible();
    await page.getByRole("link", { name: "Apply now" }).click();
    await expect(page.getByRole("heading", { name: "Apply to the Delta Mentoring Program", level: 1 })).toBeVisible();

    await page.getByRole("button", { name: "Send my application" }).click();
    await expect(page.getByText("Answer this question.")).toBeVisible();

    await page.getByLabel("Why do you want to join the Delta Mentoring Program?").fill(
      "I sell shea butter in Tamale and want to reach customers online.",
    );
    await page.getByLabel("How do you usually get online?").selectOption("Phone and a shared computer");
    await page.getByLabel("How many hours a week can you give to the programme?").selectOption("5 to 10");
    await page.getByLabel("Which specialisation interests you most?").selectOption({ label: "Social Media Marketing" });
    await page.getByLabel("Which cohort would you like to join?").selectOption(cohort.id);
    await page.getByRole("button", { name: "Send my application" }).click();

    const status = page.getByTestId("application-status");
    await expect(status.getByText("Under review")).toBeVisible();
    await status.getByText("Your answers").click();
    await expect(status.getByText("I sell shea butter in Tamale")).toBeVisible();
  });

  await test.step("the admin accepts the application into the cohort", async () => {
    const adminPage = await signedInPage(browser, reviewer);
    await adminPage.goto("/admin/applications");
    const card = adminPage.getByTestId("application").filter({ hasText: applicant.name });
    await expect(card.getByText("I sell shea butter in Tamale")).toBeVisible();
    await expect(card.getByLabel("Cohort")).toHaveValue(cohort.id);
    await card.getByLabel(/Note to the applicant/).fill("Welcome aboard. See you on 11 January.");
    await card.getByRole("button", { name: "Accept" }).click();
    await expect(card).toHaveCount(0);

    await adminPage.goto("/admin/applications?status=accepted");
    await expect(adminPage.getByTestId("application").filter({ hasText: applicant.name })).toContainText(`In ${cohort.name}`);
    await adminPage.context().close();
  });

  await test.step("the learner sees the decision and the way to their cohort", async () => {
    await page.goto("/programme/apply");
    const status = page.getByTestId("application-status");
    await expect(status.getByText("Accepted", { exact: true })).toBeVisible();
    await expect(status.getByText(`You are in ${cohort.name}`)).toBeVisible();
    await expect(status.getByText("Welcome aboard. See you on 11 January.")).toBeVisible();
    await expect(status.getByRole("link", { name: "Go to your cohort" })).toHaveAttribute("href", "/cohort");
    await expect(status.getByRole("button", { name: "Withdraw application" })).toHaveCount(0);

    await page.goto("/programme");
    await expect(page.getByText("Your application: Accepted")).toBeVisible();
    await expect(page.getByRole("link", { name: "Go to your cohort" })).toHaveAttribute("href", "/cohort");
  });
});

test("a full cohort is explained to the admin, who can waitlist instead", async ({ page }) => {
  const id = token();
  const cohort = await seedCohort(`Bolgatanga small ${id}`, 1);
  const [first, second, reviewer] = await Promise.all([
    learner(`Fuseini Abukari ${id}`),
    learner(`Hawa Seidu ${id}`),
    learner(`Issahaku Mahama ${id}`),
  ]);
  await promoteToAdmin(reviewer.id);
  const programId = await dmpId();
  const answers = { motivation: "To learn digital marketing", device: "Phone only", hours: "Under 5" };
  await insert("cohort_applications", [
    { program_id: programId, profile_id: first.id, screening_answers: answers, preferred_cohort_id: cohort.id },
    { program_id: programId, profile_id: second.id, screening_answers: answers, preferred_cohort_id: cohort.id },
  ]);

  await signIn(page, reviewer);
  await page.goto("/admin/applications");
  const firstCard = page.getByTestId("application").filter({ hasText: first.name });
  await firstCard.getByRole("button", { name: "Accept" }).click();
  await expect(firstCard).toHaveCount(0);

  const secondCard = page.getByTestId("application").filter({ hasText: second.name });
  await expect(secondCard.getByLabel("Cohort")).toHaveValue(cohort.id);
  await secondCard.getByRole("button", { name: "Accept" }).click();
  await expect(secondCard.getByRole("alert")).toHaveText(/That cohort is full/);

  await secondCard.getByRole("button", { name: "Waitlist" }).click();
  await expect(secondCard).toHaveCount(0);
  await page.goto("/admin/applications?status=waitlisted");
  await expect(page.getByTestId("application").filter({ hasText: second.name })).toBeVisible();
});

test("an applicant withdraws and can apply again", async ({ page }) => {
  const applicant = await learner(`Amina Sumaila ${token()}`);
  await insert("cohort_applications", [
    {
      program_id: await dmpId(),
      profile_id: applicant.id,
      screening_answers: { motivation: "To grow my tailoring business", device: "My own computer", hours: "More than 10" },
    },
  ]);

  await signIn(page, applicant);
  await page.goto("/programme/apply");
  const status = page.getByTestId("application-status");
  await expect(status.getByText("Under review")).toBeVisible();
  await status.getByRole("button", { name: "Withdraw application" }).click();
  await status.getByRole("button", { name: "Yes, withdraw" }).click();

  await expect(page.getByRole("heading", { name: "Apply again", level: 1 })).toBeVisible();
  await expect(page.getByTestId("application-status").getByText("Withdrawn", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Send my application" })).toBeVisible();
});
