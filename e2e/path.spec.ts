import { expect, test, type Page } from "@playwright/test";
import { confirmationLink } from "./mailpit";

const PASSWORD = "Tamale-2027-pilot";

type Choices = { interests: string[]; confidence: string; experience: string; goal: string; hours: string; device: string; data: string };

async function takeQuiz(page: Page, c: Choices) {
  await page.goto("/start");
  await expect(page.getByRole("heading", { name: "Where do I start?" })).toBeVisible();
  for (const interest of c.interests) await page.getByLabel(interest).check();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel(c.confidence).check();
  await page.getByLabel(c.experience).check();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel(c.goal).check();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel(c.hours).check();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel(c.device).check();
  await page.getByLabel(c.data).check();
  await page.getByRole("button", { name: "See my path" }).click();
}

const DATA_LEARNER: Choices = {
  interests: ["Finding answers in numbers and spreadsheets"],
  confidence: "I get by",
  experience: "Not yet",
  goal: "Get my first job in tech",
  hours: "3 to 6 hours a week",
  device: "My own laptop or computer",
  data: "Enough for most things, videos add up",
};

test("a visitor takes the quiz signed out, signs up and sees their saved path", async ({ page }, testInfo) => {
  const email = `abdul-rahman.${testInfo.project.name}.${crypto.randomUUID().slice(0, 8)}@example.test`;

  await test.step("the quiz needs no account, the result does", async () => {
    await takeQuiz(page, DATA_LEARNER);
    await expect(page.getByRole("heading", { name: "Your path is ready" })).toBeVisible();
    await expect(page.getByText("Data Analyst")).toHaveCount(0);
    await page.getByRole("link", { name: "Create a free account" }).click();
    await expect(page).toHaveURL(/\/signup\?next=%2Fpath|\/signup\?next=\/path/);
  });

  await test.step("sign up", async () => {
    await page.getByLabel("Your name").fill("Abdul-Rahman Seidu");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(PASSWORD);
    await page.getByLabel("Date of birth").fill("1999-08-21");
    await page.getByLabel(/I agree to the Terms and Privacy Policy/).check();
    await page.getByLabel("I confirm I am 18 or over").check();
    await page.getByRole("button", { name: "Create account" }).click();
    await expect(page.getByText(`We sent a confirmation link to ${email}`)).toBeVisible();
  });

  await test.step("confirming the email lands on the result", async () => {
    await page.goto(await confirmationLink(email));
    await expect(page).toHaveURL(/\/path$/);
    await expect(page.getByRole("heading", { name: "Data Analyst", level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Your skill gap" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Your weekly plan" })).toBeVisible();
    await expect(page.getByText("4 sessions of 75 minutes")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Your next step" })).toBeVisible();
    // No roadmaps are published on a fresh stack, so the page says so honestly.
    await expect(page.getByText("The Data Analyst roadmap opens soon.")).toBeVisible();
  });

  await test.step("the path was saved to the account", async () => {
    // After a reload the browser copy and cookie are gone; the result comes from personalized_paths.
    await page.reload();
    await expect(page.getByRole("heading", { name: "Data Analyst", level: 1 })).toBeVisible();
    await expect(page.getByText("We could not save your path")).toHaveCount(0);
  });

  await test.step("signed in learners go straight to a new result when they retake", async () => {
    await page.getByRole("link", { name: "Retake the quiz" }).click();
    await takeQuiz(page, {
      ...DATA_LEARNER,
      interests: ["Helping businesses sell online and on social media"],
      goal: "Grow my own business",
      hours: "Under 3 hours a week",
      device: "A phone only",
    });
    await expect(page).toHaveURL(/\/path$/);
    await expect(page.getByRole("heading", { name: "Digital Marketer", level: 1 })).toBeVisible();
    await expect(page.getByText("3 sessions of 40 minutes")).toBeVisible();
  });
});

test("signed out visitors opening /path are sent to sign up", async ({ page }) => {
  await page.goto("/path");
  await expect(page).toHaveURL(/\/signup\?next=%2Fpath|\/signup\?next=\/path/);
});
