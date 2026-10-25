import { expect, test } from "@playwright/test";
import { confirmationLink } from "./mailpit";

const PASSWORD = "Tamale-2027-pilot";

test("a learner signs up, confirms, edits their profile, signs out and back in", async ({ page }, testInfo) => {
  const email = `wumpini.${testInfo.project.name}.${crypto.randomUUID().slice(0, 8)}@example.test`;

  await test.step("sign up", async () => {
    await page.goto("/signup");
    await page.getByLabel("Your name").fill("Wumpini Alhassan");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(PASSWORD);
    await page.getByRole("button", { name: "Create account" }).click();
    await expect(page.getByText(`We sent a confirmation link to ${email}`)).toBeVisible();
  });

  await test.step("confirm the email and land on the dashboard", async () => {
    await page.goto(await confirmationLink(email));
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByRole("heading", { name: "Welcome, Wumpini" })).toBeVisible();
  });

  await test.step("set region and phone", async () => {
    await page.getByRole("link", { name: "Add your region" }).click();
    await expect(page).toHaveURL(/\/profile$/);
    await page.getByLabel("Region").selectOption("northern");
    await page.getByLabel("Phone number (optional)").fill("024 123 4567");
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(page.getByText("Saved.")).toBeVisible();
    // Stored as E.164, shown back in the local format.
    await page.reload();
    await expect(page.getByLabel("Region")).toHaveValue("northern");
    await expect(page.getByLabel("Phone number (optional)")).toHaveValue("024 123 4567");
  });

  await test.step("sign out from the visible control for this layout", async () => {
    // Phones: on the profile page. Desktop: in the sidebar. Only one is visible.
    await page.getByRole("button", { name: "Sign out" }).click();
    await expect(page).toHaveURL("/");
  });

  await test.step("signed out visitors are sent to login", async () => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login$/);
  });

  await test.step("sign back in", async () => {
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByRole("heading", { name: "Welcome, Wumpini" })).toBeVisible();
  });
});

test("wrong password shows an error without revealing which field was wrong", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("nobody@example.test");
  await page.getByLabel("Password").fill("not-the-password");
  await page.getByRole("button", { name: "Sign in" }).click();
  // Next.js keeps its own empty role="alert" route announcer, so match by text.
  await expect(page.getByRole("alert").filter({ hasText: "don't match" })).toHaveText(
    "That email and password don't match an account.",
  );
});

test("the Google button hands off to Google", async ({ page }) => {
  // Google blocks automated sign in, so only the redirect is checked.
  await page.goto("/login");
  const [request] = await Promise.all([
    page.waitForRequest((r) => r.url().includes("/auth/v1/authorize") && r.url().includes("provider=google")),
    page.getByRole("button", { name: "Continue with Google" }).click(),
  ]);
  expect(request.url()).toContain("provider=google");
});
