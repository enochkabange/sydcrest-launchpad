import { expect, test, type Browser, type Page } from "@playwright/test";
import { createLearner, PASSWORD, promoteToAdmin, type Learner } from "./learners";

async function signIn(page: Page, learner: Learner) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

async function signedInPage(browser: Browser, learner: Learner, viewport: { width: number; height: number } | null) {
  const context = await browser.newContext(viewport ? { viewport } : {});
  const page = await context.newPage();
  await signIn(page, learner);
  return page;
}

/** A date a few weeks ago, as a date input takes it. */
function recentDate() {
  return new Date(Date.now() - 20 * 86_400_000).toISOString().slice(0, 10);
}

test("signed out visitors are sent to sign in from their outcomes", async ({ page }) => {
  await page.goto("/outcomes");
  await expect(page).toHaveURL(/\/login$/);
});

test("the impact page explains every number and never shows a made up figure", async ({ page }) => {
  await page.goto("/impact");
  await expect(page.getByRole("heading", { level: 1, name: "Our impact, counted honestly" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Verified outcomes" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "How we count" })).toBeVisible();
  // Either the honest empty state or real verified counts, each with its definition.
  const empty = page.getByText("We will publish outcomes once our first cohort finishes").first();
  const counted = page.getByText(/checked against evidence/);
  await expect(empty.or(counted).first()).toBeVisible();
});

test("a learner reports an outcome, an admin asks for more, then verifies it", async ({ page, browser }, testInfo) => {
  const [learner, admin] = await Promise.all([createLearner("Wumpini Iddrisu"), createLearner("Abdul-Rahman Yakubu")]);
  await promoteToAdmin(admin.id);
  const organisation = `Tamale Tech Hub ${crypto.randomUUID().slice(0, 8)}`;
  const viewport = testInfo.project.use.viewport ?? null;

  await test.step("the learner finds outcomes from their profile and reports one", async () => {
    await signIn(page, learner);
    await page.goto("/profile");
    await page.getByRole("link", { name: "Your outcomes" }).click();
    await expect(page).toHaveURL(/\/outcomes$/);
    await expect(page.getByRole("heading", { name: "Nothing reported yet" })).toBeVisible();
    await page.getByRole("link", { name: "Report an outcome" }).first().click();
    await expect(page).toHaveURL(/\/outcomes\/new$/);

    await page.getByRole("button", { name: "Report outcome" }).click();
    await expect(page.getByText("Choose what kind of outcome this is.")).toBeVisible();
    await expect(page.getByText("Add a link or a note so we can check it.")).toBeVisible();

    await page.getByLabel("What kind of outcome?").selectOption("internship");
    await page.getByLabel("Organisation, client or funder").fill(organisation);
    await page.getByLabel("Role or award (optional)").fill("Junior web developer intern");
    await page.getByLabel("Date it started or was awarded").fill(recentDate());
    await page.getByLabel("Note for the reviewer (optional)").fill("Offer letter signed by Mariama Seidu, the hub lead.");
    await page.getByRole("button", { name: "Report outcome" }).click();
    await expect(page).toHaveURL(/\/outcomes\?reported=1$/);
    await expect(page.getByText(/Your outcome is in/)).toBeVisible();
    const item = page.getByRole("listitem").filter({ hasText: organisation });
    await expect(item.getByText("Waiting for review")).toBeVisible();
  });

  const adminPage = await signedInPage(browser, admin, viewport);
  const queueItem = adminPage.getByRole("listitem").filter({ hasText: organisation });

  await test.step("the admin asks for more evidence", async () => {
    await adminPage.goto("/admin/outcomes");
    await expect(queueItem.getByText("Wumpini Iddrisu")).toBeVisible();
    await queueItem.getByText("Ask for more evidence").click();
    await queueItem.getByLabel("Note to the learner").fill("Please add a link to the offer letter.");
    await queueItem.getByRole("button", { name: "Reject with note" }).click();
    await expect(queueItem).toHaveCount(0);
  });

  await test.step("the learner sees the note, adds evidence and it goes back for review", async () => {
    await page.goto("/outcomes");
    const item = page.getByRole("listitem").filter({ hasText: organisation });
    await expect(item.getByText("Needs more evidence")).toBeVisible();
    await expect(item.getByText("Please add a link to the offer letter.")).toBeVisible();
    await item.getByRole("link", { name: "Add evidence" }).click();
    await page.getByLabel("Link to evidence (optional)").fill("https://example.com/offer-letter");
    await page.getByRole("button", { name: "Save and send for review" }).click();
    await expect(page).toHaveURL(/\/outcomes\?updated=1$/);
    await expect(page.getByRole("listitem").filter({ hasText: organisation }).getByText("Waiting for review")).toBeVisible();
  });

  await test.step("the admin verifies it and the North Star view loads", async () => {
    await adminPage.goto("/admin/outcomes");
    await expect(queueItem.getByRole("link", { name: "https://example.com/offer-letter" })).toBeVisible();
    await queueItem.getByRole("button", { name: "Verify" }).click();
    await expect(queueItem).toHaveCount(0);
    await adminPage.goto("/admin/outcomes?status=verified");
    await expect(queueItem.getByText("Verified")).toBeVisible();

    await adminPage.goto("/admin/impact");
    await expect(adminPage.getByRole("heading", { level: 1, name: "North Star" })).toBeVisible();
    await expect(adminPage.getByRole("heading", { name: "What each number means" })).toBeVisible();
    await adminPage.context().close();
  });

  await test.step("verified is final for the learner, and the public page counts it", async () => {
    await page.goto("/outcomes");
    const item = page.getByRole("listitem").filter({ hasText: organisation });
    await expect(item.getByText("Verified", { exact: true })).toBeVisible();
    await expect(item.getByRole("link", { name: /Edit|Add evidence/ })).toHaveCount(0);

    await page.goto("/impact");
    await expect(page.getByText(/checked against evidence/)).toBeVisible();
    await expect(page.getByText(/Held by \d+ learners?\./).first()).toBeVisible();
  });
});

test("learners cannot open the admin outcome screens", async ({ page }) => {
  const learner = await createLearner("Fuseini Abukari");
  await signIn(page, learner);
  for (const path of ["/admin/outcomes", "/admin/impact"]) {
    await page.goto(path);
    await expect(page.getByText("This page could not be found.")).toBeVisible();
  }
});
