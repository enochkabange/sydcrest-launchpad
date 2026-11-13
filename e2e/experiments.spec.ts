import { expect, test, type Page } from "@playwright/test";
import { createLearner, PASSWORD, promoteToAdmin, type Learner } from "./learners";

/**
 * Experiments (issue #327): an admin creates a draft, starts it, and the
 * Experiments dashboard lists it next to the seeded re-engagement holdout.
 * Learners get a 404 on both pages.
 */

async function signIn(page: Page, who: Learner) {
  await page.context().clearCookies();
  await page.goto("/login");
  await page.getByLabel("Email").fill(who.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 30_000 });
}

test("an admin creates and starts an experiment and the dashboard lists it; learners get a 404", async ({ page }) => {
  test.setTimeout(120_000);
  const [learner, boss] = await Promise.all([createLearner("Abdul-Rahman Issah"), createLearner("Mariama Iddrisu")]);
  await promoteToAdmin(boss.id);
  const key = `e2e_${crypto.randomUUID().slice(0, 8).replace(/-/g, "")}`;

  await signIn(page, learner);
  await page.goto("/admin/experiments");
  await expect(page.getByText("This page could not be found.")).toBeVisible();
  await page.goto("/admin/insights/experiments");
  await expect(page.getByText("This page could not be found.")).toBeVisible();

  await signIn(page, boss);
  await page.goto("/admin/experiments");
  await expect(page.getByRole("heading", { name: "Experiments", level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "reengage_holdout" })).toBeVisible();

  await page.getByLabel("Key").fill(key);
  await page.getByLabel("What is being tested").fill("A shorter welcome for Wumpini and friends");
  await page.getByLabel("Variants and weights").fill("control:50, short:50");
  await page.getByRole("button", { name: "Save as draft" }).click();
  await expect(page.getByText(`Saved ${key} as a draft.`)).toBeVisible();

  const item = page.getByRole("listitem").filter({ has: page.getByRole("heading", { name: key }) });
  await expect(item.getByText("Draft")).toBeVisible();
  await expect(item.getByText("Split: control 50%, short 50%", { exact: false })).toBeVisible();
  await item.getByRole("button", { name: `Start ${key}` }).click();
  await expect(item.getByRole("button", { name: `Stop ${key}` })).toBeVisible();
  await expect(item.getByText(/^Running since /)).toBeVisible();

  await page.goto("/admin/insights/experiments");
  await expect(page.getByRole("heading", { name: "Experiments", level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: key })).toBeVisible();
  await expect(page.getByRole("heading", { name: "reengage_holdout" })).toBeVisible();
  const card = page.locator("article", { has: page.getByRole("heading", { name: key }) });
  await expect(card.getByText("Running since", { exact: false })).toBeVisible();
  await expect(card.getByText("Not enough data yet").first()).toBeVisible();

  // The CSV export carries the same rows.
  const csv = await page.request.get("/admin/insights/export?table=experiments");
  expect(csv.status()).toBe(200);
  expect(await csv.text()).toContain(`${key},running,came_back_7d,control,50,0,0,0`);
});
