import { expect, test } from "@playwright/test";
import { confirmationLink } from "./mailpit";

test("signed out visitors are sent to login from the content admin", async ({ page }) => {
  await page.goto("/admin/content");
  await expect(page).toHaveURL(/\/login$/);
});

test("a learner who is not an admin cannot see the content generator", async ({ page }, testInfo) => {
  const email = `napari.${testInfo.project.name}.${crypto.randomUUID().slice(0, 8)}@example.test`;
  await page.goto("/signup");
  await page.getByLabel("Your name").fill("Napari Sumaila");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill("Tamale-2027-pilot");
  await page.getByLabel("Date of birth").fill("1999-07-02");
  await page.getByLabel(/I agree to the Terms and Privacy Policy/).check();
  await page.getByLabel("I confirm I am 18 or over").check();
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByText(`We sent a confirmation link to ${email}`)).toBeVisible();
  await page.goto(await confirmationLink(email));
  await expect(page).toHaveURL(/\/dashboard$/);

  await page.goto("/admin/content");
  await expect(page.getByText("This page could not be found.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit batch" })).toHaveCount(0);
});
