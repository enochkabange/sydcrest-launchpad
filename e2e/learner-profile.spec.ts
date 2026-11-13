import { expect, test, type Page } from "@playwright/test";
import { createLearner, PASSWORD, type Learner } from "./learners";

async function signIn(page: Page, learner: Learner) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

// Learner profile v2 (epic #320): optional questions, saved and shown again.
test("a learner answers About you and sees their answers kept", async ({ page }) => {
  const learner = await createLearner("Iddrisu Salifu");
  await signIn(page, learner);

  // The dashboard invites them while few questions are answered.
  await page.getByRole("link", { name: "Tell us about you" }).click();
  await expect(page.getByRole("heading", { name: "About you", level: 1 })).toBeVisible();

  await page.getByLabel("What do you most want from SydCrest?").selectOption("job");
  await page.getByLabel("Hours a week you can study").selectOption("3_5");
  await page.getByLabel("Evenings").check();
  await page.getByLabel("Dagbani").check();
  await page.getByLabel("Lowest monthly pay you would accept").selectOption("1000_2000");
  await page.getByRole("button", { name: "Save answers" }).click();
  await expect(page.getByText("Saved. Thank you.")).toBeVisible();

  await page.reload();
  await expect(page.getByLabel("What do you most want from SydCrest?")).toHaveValue("job");
  await expect(page.getByLabel("Hours a week you can study")).toHaveValue("3_5");
  await expect(page.getByLabel("Evenings")).toBeChecked();
  await expect(page.getByLabel("Dagbani")).toBeChecked();

  // Clearing an answer is allowed: every question is optional.
  await page.getByLabel("Lowest monthly pay you would accept").selectOption("");
  await page.getByRole("button", { name: "Save answers" }).click();
  await expect(page.getByText("Saved. Thank you.")).toBeVisible();
  await page.reload();
  await expect(page.getByLabel("Lowest monthly pay you would accept")).toHaveValue("");

  // The profile page shows how much is answered.
  await page.goto("/profile");
  await expect(page.getByText(/You have answered 4 of \d+ questions/)).toBeVisible();
});
