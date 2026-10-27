import { expect, test } from "@playwright/test";
import { confirmationLink } from "./mailpit";

// CI has no Twilio credentials, so this exercises the consent flow and the
// no op send path; nothing leaves the machine.
test("a learner turns WhatsApp updates on and off from their profile", async ({ page }, testInfo) => {
  const email = `abdul-rahman.${testInfo.project.name}.${crypto.randomUUID().slice(0, 8)}@example.test`;

  await page.goto("/signup");
  await page.getByLabel("Your name").fill("Abdul-Rahman Yakubu");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill("Tamale-2027-pilot");
  await page.getByLabel("Date of birth").fill("1999-06-02");
  await page.getByLabel(/I agree to the Terms and Privacy Policy/).check();
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByText(`We sent a confirmation link to ${email}`)).toBeVisible();
  await page.goto(await confirmationLink(email));
  await expect(page).toHaveURL(/\/dashboard$/);

  await page.goto("/profile");
  const toggle = page.getByLabel("Send me updates on WhatsApp");
  const save = page.getByRole("button", { name: "Save WhatsApp choice" });

  await test.step("needs a phone number first", async () => {
    await toggle.check();
    await save.click();
    await expect(page.getByText("Save a phone number above first, then turn on WhatsApp updates.")).toBeVisible();
    await page.reload();
    await expect(toggle).not.toBeChecked();
  });

  await test.step("opts in once a phone is saved", async () => {
    await page.getByLabel("Phone number (optional)").fill("024 765 4321");
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(page.getByText("Saved.")).toBeVisible();
    await toggle.check();
    await save.click();
    await expect(page.getByText("WhatsApp updates are on.")).toBeVisible();
    await page.reload();
    await expect(toggle).toBeChecked();
  });

  await test.step("a new phone number turns updates off and asks again", async () => {
    await page.getByLabel("Phone number (optional)").fill("050 123 4567");
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(page.getByText("Your number changed, so WhatsApp updates are off.")).toBeVisible();
    await expect(toggle).not.toBeChecked();
    await page.reload();
    await expect(toggle).not.toBeChecked();
    await expect(page.getByText("Updates stopped when your number changed.")).toBeVisible();
  });

  await test.step("opts in again for the new number", async () => {
    await toggle.check();
    await save.click();
    await expect(page.getByText("WhatsApp updates are on.")).toBeVisible();
    await page.reload();
    await expect(toggle).toBeChecked();
    await expect(page.getByText("Updates stopped when your number changed.")).toBeHidden();
  });

  await test.step("opts out", async () => {
    await toggle.uncheck();
    await save.click();
    await expect(page.getByText("WhatsApp updates are off.")).toBeVisible();
    await page.reload();
    await expect(toggle).not.toBeChecked();
  });
});
