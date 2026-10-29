import { expect, test } from "@playwright/test";
import { confirmationLink } from "./mailpit";

const PASSWORD = "Tamale-2027-pilot";
const ADULT_DOB = "2000-03-14";

/** A date of birth that makes someone 16 today, whatever day the suite runs. */
function under18Dob() {
  const d = new Date();
  return `${d.getUTCFullYear() - 16}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

test("a learner signs up, confirms, edits their profile, signs out and back in", async ({ page }, testInfo) => {
  const email = `wumpini.${testInfo.project.name}.${crypto.randomUUID().slice(0, 8)}@example.test`;

  await test.step("sign up", async () => {
    await page.goto("/signup");
    await page.getByLabel("Your name").fill("Wumpini Alhassan");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(PASSWORD);
    await page.getByLabel("Date of birth").fill(ADULT_DOB);
    await page.getByLabel(/I agree to the Terms and Privacy Policy/).check();
    await page.getByLabel("I confirm I am 18 or over").check();
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

test("someone under 18 is refused at sign up", async ({ page }) => {
  await page.goto("/signup");
  await page.getByLabel("Your name").fill("Mariama Iddrisu");
  await page.getByLabel("Email").fill(`mariama.${crypto.randomUUID().slice(0, 8)}@example.test`);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByLabel("Date of birth").fill(under18Dob());
  await page.getByLabel(/I agree to the Terms and Privacy Policy/).check();
  await page.getByLabel("I confirm I am 18 or over").check();
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByText("SydCrest accounts are for people aged 18 and over for now.")).toBeVisible();
  await expect(page.getByText("We sent a confirmation link")).toHaveCount(0);
});

test("sign up needs the terms box ticked", async ({ page }) => {
  await page.goto("/signup");
  await page.getByLabel("Your name").fill("Fuseini Alhassan");
  await page.getByLabel("Email").fill(`fuseini.${crypto.randomUUID().slice(0, 8)}@example.test`);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByLabel("Date of birth").fill(ADULT_DOB);
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByText("Tick the box to agree to the Terms and Privacy Policy.")).toBeVisible();
  // "I confirm I am 18 or over" is its own tick (founder decision D1).
  await expect(page.getByText("Tick the box to confirm you are 18 or over.")).toBeVisible();
  await expect(page.getByText("We sent a confirmation link")).toHaveCount(0);
});

test("privacy policy and terms are readable signed out", async ({ page }) => {
  await page.goto("/privacy");
  await expect(page.getByRole("heading", { name: "Privacy Policy", level: 1 })).toBeVisible();
  await expect(page.getByText("Draft for review.")).toBeVisible();
  await page.goto("/terms");
  await expect(page.getByRole("heading", { name: "Terms", level: 1 })).toBeVisible();
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
