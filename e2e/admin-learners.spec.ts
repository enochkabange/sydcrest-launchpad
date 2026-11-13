import { expect, test, type Page } from "@playwright/test";
import { admin } from "./supabase-admin";
import { createLearner, PASSWORD, promoteToAdmin, type Learner } from "./learners";

async function signIn(page: Page, who: Learner) {
  await page.context().clearCookies();
  await page.goto("/login");
  await page.getByLabel("Email").fill(who.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 30_000 });
}

// The learner view (epic #320 step 4): attributes computed by the daily
// maintenance, a list by stage and search, one page per learner; 404 for others.
test("admins find a learner and open their view; learners get a 404", async ({ page }) => {
  test.setTimeout(120_000);
  const [learner, boss] = await Promise.all([createLearner("Salamatu Abdulai"), createLearner("Alhassan Mumuni")]);
  await promoteToAdmin(boss.id);
  // Only today's rollups: other specs rebuild their own days.
  await admin("/rest/v1/rpc/run_analytics_maintenance", { method: "POST", body: { p_days: 1 } });

  await signIn(page, learner);
  await page.goto("/admin/learners");
  await expect(page.getByText("This page could not be found.")).toBeVisible();

  await signIn(page, boss);
  await page.goto("/admin/learners?stage=new");
  await expect(page.getByRole("heading", { name: "Learners", level: 1 })).toBeVisible();
  await page.getByLabel("Name or exact email").fill(learner.email);
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByRole("link", { name: "Salamatu Abdulai" }).click();

  await expect(page.getByRole("heading", { name: "Salamatu Abdulai", level: 1 })).toBeVisible();
  await expect(page.getByText(/^New · .* · learner · joined /).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Reliability and work" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Recent activity" })).toBeVisible();
});
