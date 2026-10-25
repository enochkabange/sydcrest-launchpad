import { expect, type Page, type TestInfo } from "@playwright/test";
import { confirmationLink } from "./mailpit";

export const PASSWORD = "Tamale-2027-pilot";
export const ADULT_DOB = "2000-03-14";

/** Signs up a new adult learner, confirms the email and lands on the dashboard. Returns the email. */
export async function signUpAndConfirm(page: Page, testInfo: TestInfo, name: string): Promise<string> {
  const first = name.split(" ")[0];
  const email = `${first.toLowerCase()}.${testInfo.project.name}.${crypto.randomUUID().slice(0, 8)}@example.test`;
  await page.goto("/signup");
  await page.getByLabel("Your name").fill(name);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByLabel("Date of birth").fill(ADULT_DOB);
  await page.getByLabel(/I agree to the Terms and Privacy Policy/).check();
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByText(`We sent a confirmation link to ${email}`)).toBeVisible();
  await page.goto(await confirmationLink(email));
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { name: `Welcome, ${first}` })).toBeVisible();
  return email;
}
