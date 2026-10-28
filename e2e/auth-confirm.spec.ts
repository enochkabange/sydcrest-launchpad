import { expect, test } from "@playwright/test";
import { confirmationLink } from "./mailpit";
import { createLearner, PASSWORD, type Learner } from "./learners";
import { admin } from "./supabase-admin";

/**
 * Auth emails link to our own site (/auth/confirm with a token hash), not to
 * Supabase, so the link's domain matches the sender. Read through Mailpit.
 */

const ADULT_DOB = "2000-03-14";
let learner: Learner | undefined;

test.afterEach(async () => {
  if (learner) await admin(`/auth/v1/admin/users/${learner.id}`, { method: "DELETE" }).catch(() => {});
  learner = undefined;
});

function expectOwnSite(link: string, baseURL: string | undefined, type: string) {
  const url = new URL(link);
  expect(url.origin).toBe(new URL(baseURL!).origin);
  expect(url.pathname).toBe("/auth/confirm");
  expect(url.searchParams.get("type")).toBe(type);
  expect(url.searchParams.get("token_hash")).toBeTruthy();
}

test("a sign up confirmation link opens our own site and signs the learner in once", async ({ page, baseURL }, testInfo) => {
  const email = `mariama.${testInfo.project.name}.${crypto.randomUUID().slice(0, 8)}@example.test`;

  await test.step("sign up", async () => {
    await page.goto("/signup");
    await page.getByLabel("Your name").fill("Mariama Issah");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(PASSWORD);
    await page.getByLabel("Date of birth").fill(ADULT_DOB);
    await page.getByLabel(/I agree to the Terms and Privacy Policy/).check();
    await page.getByRole("button", { name: "Create account" }).click();
    await expect(page.getByText(`We sent a confirmation link to ${email}`)).toBeVisible();
  });

  const link = await confirmationLink(email);

  await test.step("the emailed link points at the app, not Supabase", async () => {
    expectOwnSite(link, baseURL, "email");
  });

  await test.step("following it confirms the email and lands on the dashboard", async () => {
    await page.goto(link);
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByRole("heading", { name: "Welcome, Mariama" })).toBeVisible();
  });

  await test.step("the used link explains itself on sign in", async () => {
    await page.context().clearCookies();
    await page.goto(link);
    await expect(page).toHaveURL(/\/login\?error=link$/);
    await expect(page.getByText(/That link has expired or was already used/)).toBeVisible();
  });
});

test("a reset link opens our own site and allows a new password", async ({ page, baseURL }) => {
  learner = await createLearner("Issahaku Mahama");

  await page.goto("/forgot-password");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByRole("button", { name: "Send reset link" }).click();
  const link = await confirmationLink(learner.email);
  expectOwnSite(link, baseURL, "recovery");
  expect(new URL(link).searchParams.get("next")).toBe("/reset-password");

  await page.goto(link);
  await expect(page).toHaveURL(/\/reset-password$/);
  await expect(page.getByLabel("New password", { exact: true })).toBeVisible();
});

test("a broken link goes back to the right form", async ({ page }) => {
  await page.goto("/auth/confirm?token_hash=not-a-real-hash&type=recovery");
  await expect(page).toHaveURL(/\/forgot-password\?error=link$/);
  await expect(page.getByText("That reset link has expired or was already used. Ask for a new one below.")).toBeVisible();

  await page.goto("/auth/confirm?token_hash=not-a-real-hash&type=email&next=%2F%2Fevil.example");
  await expect(page).toHaveURL(/\/login\?error=link$/);
});
