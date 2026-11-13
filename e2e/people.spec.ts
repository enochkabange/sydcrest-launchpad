import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";
import { signIn } from "./certificates-fixtures";
import { createLearner, promoteToAdmin } from "./learners";
import { admin } from "./supabase-admin";

// Self serve data rights (#333): download my data, then delete the account,
// which happens at once (no grace period, founder decision 13 Nov 2026).
test("a member downloads their data, then deletes their account at once", async ({ page }) => {
  test.setTimeout(120_000);
  const member = await createLearner("Wumpini Alhassan");
  await signIn(page, member.email);
  await page.goto("/profile");

  const section = page.locator("#your-data");
  await expect(section.getByRole("heading", { name: "Your data" })).toBeVisible();
  const [download] = await Promise.all([page.waitForEvent("download"), section.getByRole("link", { name: "Download my data" }).click()]);
  expect(download.suggestedFilename()).toMatch(/^sydcrest-my-data-\d{4}-\d{2}-\d{2}\.json$/);
  const file = JSON.parse(await readFile((await download.path())!, "utf8"));
  expect(file.format).toBe("sydcrest-my-data");
  expect(file.account).toEqual({ id: member.id, email: member.email });
  expect(file.data.profile.display_name).toBe("Wumpini Alhassan");
  expect(file.data.consents.map((c: { kind: string }) => c.kind)).toContain("terms");
  expect(file.missing).toEqual([]);

  await section.getByRole("link", { name: "Delete my account", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Delete my account", level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What we keep" })).toBeVisible();
  await page.getByRole("button", { name: "Delete my account now" }).click();

  // Signed out and gone: the account no longer exists.
  await expect(page).toHaveURL(/\/\?account=deleted/);
  const users = (await admin(`/auth/v1/admin/users/${member.id}`).catch(() => null)) as { id?: string } | null;
  expect(users?.id).toBeUndefined();
});

// People console (#332): an admin finds a member, writes a support note and
// sees it, and their visit, in the audit log.
test("an admin records a support note and sees it in the audit log", async ({ page }) => {
  test.setTimeout(120_000);
  const [member, boss] = await Promise.all([createLearner("Mariama Seidu"), createLearner("Abdul-Rahman Issah")]);
  await promoteToAdmin(boss.id);
  await signIn(page, boss.email);

  await page.goto("/admin/learners");
  await page.getByLabel("Name, exact email or phone").fill(member.email);
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByRole("link", { name: "Mariama Seidu" }).click();

  await expect(page.getByRole("heading", { name: "Mariama Seidu", level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Account", exact: true })).toBeVisible();
  await expect(page.getByText(member.email)).toBeVisible();
  await page.getByLabel("Support note").fill("Asked why the Tamale cohort is not showing. Explained the start date.");
  await page.getByRole("button", { name: "Save note" }).click();

  await expect(page.getByText("Note saved to the audit log.")).toBeVisible();
  const trail = page.getByRole("region", { name: "Audit log" });
  await expect(trail.getByText("Asked why the Tamale cohort is not showing. Explained the start date.")).toBeVisible();
  await expect(trail.getByText("Opened the page").first()).toBeVisible();

  await page.goto("/admin/learners/audit");
  await expect(page.getByRole("heading", { name: "Audit log", level: 1 })).toBeVisible();
  await expect(page.getByText("Asked why the Tamale cohort is not showing. Explained the start date.").first()).toBeVisible();

  await page.goto("/admin/learners/deletions");
  await expect(page.getByRole("heading", { name: "Deletion requests", level: 1 })).toBeVisible();
});
