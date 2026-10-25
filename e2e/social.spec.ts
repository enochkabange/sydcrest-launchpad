import { expect, test, type Browser, type Page } from "@playwright/test";
import { createLearner, mintStreak, PASSWORD, promoteToAdmin, type Learner } from "./supabase-admin";

async function signIn(page: Page, learner: Learner) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

async function signedInPage(browser: Browser, learner: Learner) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await signIn(page, learner);
  return page;
}

test("a public profile can be viewed signed out, followed, reported and triaged", async ({ page, browser }) => {
  const [owner, fan, admin] = await Promise.all([
    createLearner("Wumpini Alhassan"),
    createLearner("Fuseini Mahama"),
    createLearner("Mariama Seidu"),
  ]);
  await promoteToAdmin(admin.id);
  const slug = `wumpini-${crypto.randomUUID().slice(0, 8)}`;
  const reportDetails = `Spam links ${crypto.randomUUID().slice(0, 8)}`;

  await test.step("the owner makes their profile public with a slug", async () => {
    await signIn(page, owner);
    await page.goto("/profile");
    await page.getByLabel("Profile link name").fill(slug);
    await page.getByLabel("Headline (optional)").fill("Learning data analysis in Tamale");
    await page.getByLabel("Skills (optional)").fill("Excel, SQL");
    await page.getByLabel("Make my profile public").check();
    await page.getByRole("button", { name: "Save public profile" }).click();
    await expect(page.getByText("Public profile updated.")).toBeVisible();
    await expect(page.getByLabel("Invite link")).toHaveValue(new RegExp(`/signup\\?ref=${slug}$`));
  });

  await test.step("a signed out visitor sees the public profile", async () => {
    const visitor = await (await browser.newContext()).newPage();
    await visitor.goto(`/u/${slug}`);
    await expect(visitor.getByRole("heading", { name: "Wumpini Alhassan", level: 1 })).toBeVisible();
    await expect(visitor.getByText("Learning data analysis in Tamale")).toBeVisible();
    await expect(visitor.getByText("SQL", { exact: true })).toBeVisible();
    await expect(visitor.getByRole("link", { name: "Sign in to follow Wumpini" })).toBeVisible();
    await expect(visitor.getByText(owner.email)).toHaveCount(0);
    await visitor.context().close();
  });

  await test.step("an achievement of a public profile has a shareable page and card", async () => {
    const id = await mintStreak(owner.id, 7);
    const visitor = await (await browser.newContext()).newPage();
    await visitor.goto(`/a/${id}`);
    await expect(visitor.getByRole("heading", { name: "7 day learning streak" })).toBeVisible();
    const card = await visitor.locator('meta[property="og:image"]').getAttribute("content");
    const image = await visitor.request.get(new URL(card!).pathname + new URL(card!).search);
    expect(image.headers()["content-type"]).toBe("image/png");
    await visitor.context().close();
  });

  const fanPage = await signedInPage(browser, fan);

  await test.step("another learner follows", async () => {
    await fanPage.goto(`/u/${slug}`);
    await fanPage.getByRole("button", { name: "Follow" }).click();
    await expect(fanPage.getByRole("button", { name: "Unfollow" })).toBeVisible();
    await expect(fanPage.locator("dl > div", { hasText: "Followers" })).toContainText("1");
  });

  await test.step("and reports the profile", async () => {
    await fanPage.getByText("Report this profile").click();
    await fanPage.getByLabel("Reason").selectOption("Spam or scam");
    await fanPage.getByLabel("Details (optional)").fill(reportDetails);
    await fanPage.getByRole("button", { name: "Send report" }).click();
    await expect(fanPage.getByText("Thanks. Our team will review this report.")).toBeVisible();
    await fanPage.context().close();
  });

  await test.step("the report reaches the admin queue and is resolved", async () => {
    const adminPage = await signedInPage(browser, admin);
    await adminPage.goto("/admin/reports");
    const report = adminPage.getByRole("listitem").filter({ hasText: reportDetails });
    await expect(report).toContainText("Wumpini Alhassan");
    await expect(report).toContainText("Reported by Fuseini Mahama");
    await report.getByRole("button", { name: "Mark actioned" }).click();
    await expect(adminPage.getByRole("listitem").filter({ hasText: reportDetails })).toHaveCount(0);
    await adminPage.goto("/admin/reports?status=actioned");
    await expect(adminPage.getByRole("listitem").filter({ hasText: reportDetails })).toBeVisible();
    await adminPage.context().close();
  });

  await test.step("learners who are not admins cannot open the queue", async () => {
    await page.goto("/admin/reports");
    await expect(page.getByRole("heading", { name: "Reports" })).toHaveCount(0);
    await expect(page.getByText(reportDetails)).toHaveCount(0);
    await expect(page.getByRole("listitem").filter({ hasText: "Reported by" })).toHaveCount(0);
  });

  await test.step("the leaderboards open", async () => {
    await page.goto("/leaderboards");
    await expect(page.getByRole("heading", { name: "Leaderboards", level: 1 })).toBeVisible();
    await page.getByRole("link", { name: "By region" }).click();
    await expect(page.getByText("Choose a region to see its board.")).toBeVisible();
  });
});
