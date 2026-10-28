import { expect, test } from "@playwright/test";
import { createLearner, type Learner } from "./learners";
import { confirmationLink } from "./mailpit";
import { admin } from "./supabase-admin";

/** Forgot password (issue #227): reset by email through local Mailpit. */

const NEUTRAL = "If an account uses that email, we have sent a link to reset your password.";
let learner: Learner | undefined;

test.afterEach(async () => {
  if (learner) await admin(`/auth/v1/admin/users/${learner.id}`, { method: "DELETE" }).catch(() => {});
  learner = undefined;
});

test("a learner resets a forgotten password by email and signs in with the new one", async ({ page }) => {
  learner = await createLearner("Hawa Mahama");
  const email = learner.email;
  const newPassword = `Bolgatanga-${crypto.randomUUID().slice(0, 8)}`;

  await test.step("ask for a reset link from sign in", async () => {
    await page.goto("/login");
    await page.getByRole("link", { name: "Forgot your password?" }).click();
    await expect(page).toHaveURL(/\/forgot-password$/);
    await page.getByLabel("Email").fill(email);
    await page.getByRole("button", { name: "Send reset link" }).click();
    await expect(page.getByText(NEUTRAL)).toBeVisible();
  });

  await test.step("follow the emailed link and choose a new password", async () => {
    await page.goto(await confirmationLink(email));
    await expect(page).toHaveURL(/\/reset-password$/);
    await page.getByLabel("New password", { exact: true }).fill(newPassword);
    await page.getByLabel("Confirm new password").fill(`${newPassword}x`);
    await page.getByRole("button", { name: "Save new password" }).click();
    await expect(page.getByText("The two passwords don't match.")).toBeVisible();
    await page.getByLabel("New password", { exact: true }).fill(newPassword);
    await page.getByLabel("Confirm new password").fill(newPassword);
    await page.getByRole("button", { name: "Save new password" }).click();
    await expect(page).toHaveURL(/\/dashboard\?notice=password$/);
    await expect(page.getByText("Your new password is saved.")).toBeVisible();
  });

  await test.step("sign in with the new password", async () => {
    await page.context().clearCookies();
    await page.goto("/login");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(newPassword);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByRole("heading", { name: "Welcome, Hawa" })).toBeVisible();
  });

  await test.step("the used link no longer works", async () => {
    await page.context().clearCookies();
    await page.goto(await confirmationLink(email));
    await expect(page.getByText(/expired or was already used/)).toBeVisible();
  });
});

test("an address with no account gets the same answer", async ({ page }) => {
  await page.goto("/forgot-password");
  await page.getByLabel("Email").fill(`nobody.${crypto.randomUUID().slice(0, 8)}@example.test`);
  await page.getByRole("button", { name: "Send reset link" }).click();
  await expect(page.getByText(NEUTRAL)).toBeVisible();
});

test("without a reset session the page explains the link has expired", async ({ page }) => {
  await page.goto("/reset-password");
  await expect(page.getByText("This reset link has expired or was already used.")).toBeVisible();
  await expect(page.getByLabel("New password", { exact: true })).toHaveCount(0);
  await page.getByRole("link", { name: "Ask for a new link" }).click();
  await expect(page).toHaveURL(/\/forgot-password$/);
});
