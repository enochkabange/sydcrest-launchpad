import { expect, test, type Browser, type Page } from "@playwright/test";
import { createLearner, PASSWORD, promoteToAdmin, type Learner } from "./learners";

/**
 * Become an expert (issue #149): apply, draft a gig while in review, get
 * approved, verified and featured by an admin, then delisted with a reason.
 * Runs at phone and desktop widths against the local stack.
 */

// Server Actions redirect and re-render; give them longer than the default on a busy CI runner.
const AFTER_SUBMIT = { timeout: 15_000 };

async function signIn(page: Page, learner: Learner) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

async function signedInPage(browser: Browser, learner: Learner) {
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await signIn(page, learner);
  return page;
}

test("a learner applies to be an expert, drafts a gig and is approved, verified and delisted by an admin", async ({ page, browser }) => {
  test.setTimeout(120_000);
  const tag = crypto.randomUUID().slice(0, 8);
  const [applicant, admin] = await Promise.all([createLearner(`Hawa Iddrisu${tag}`), createLearner("Issahaku Sumaila")]);
  await promoteToAdmin(admin.id);
  const slug = `hawa-${tag}`;

  await test.step("the applicant sends an application", async () => {
    await signIn(page, applicant);
    await page.goto("/experts/apply");
    await expect(page.getByRole("heading", { name: "Become an expert", level: 1 })).toBeVisible();
    // Validation keeps what was typed.
    await page.getByLabel("Headline").fill("Data analyst helping beginners in Tamale");
    await page.getByRole("button", { name: "Send application" }).click();
    await expect(page.getByText("Check the highlighted fields and try again.")).toBeVisible(AFTER_SUBMIT);
    await expect(page.getByLabel("Headline")).toHaveValue("Data analyst helping beginners in Tamale");

    await page.getByLabel("Expert page link name").fill(slug);
    await page.getByLabel("Skills").fill("Excel, Power BI, SQL");
    await page.getByLabel("Links about you (optional)").fill("https://example.com/hawa");
    await page.getByLabel("Sample work").fill("https://example.com/hawa/sales-dashboard");
    await page.getByLabel("Why do you want to be an expert on SydCrest?").fill("I want more young people in the north to get data jobs.");
    await page.getByRole("button", { name: "Send application" }).click();
    await expect(page.getByRole("heading", { name: "Your application is in review" })).toBeVisible(AFTER_SUBMIT);
  });

  await test.step("while in review, the applicant drafts a gig", async () => {
    await page.goto("/expert");
    await expect(page.getByText("In review", { exact: true })).toBeVisible();
    await page.getByRole("link", { name: "Add an offer" }).click();
    await page.getByLabel("Kind of offer").selectOption("gig");
    await page.getByLabel("Title").fill("Clean your sales spreadsheet");
    await page.getByLabel("Description").fill("I tidy a messy sales sheet and build a simple summary.");
    await page.getByRole("button", { name: "Add offer" }).click();
    // A gig needs a scope and a delivery time.
    await expect(page.getByText("Describe exactly what you will deliver.")).toBeVisible(AFTER_SUBMIT);
    await expect(page.getByLabel("Title")).toHaveValue("Clean your sales spreadsheet");
    await page.getByLabel("Scope").fill("A cleaned sheet and a one page summary of sales by month.");
    await page.getByLabel("Delivery time in days").fill("5");
    await page.getByLabel("Indicative price in cedis (optional)").fill("250");
    await page.getByRole("button", { name: "Add offer" }).click();
    await expect(page).toHaveURL(/\/expert\?offer=added$/, AFTER_SUBMIT);
    const offer = page.getByRole("listitem").filter({ hasText: "Clean your sales spreadsheet" });
    await expect(offer.getByText("Free during the soft launch")).toBeVisible();
    await expect(offer.getByText("Indicative price GH₵ 250, not charged")).toBeVisible();
    await expect(offer.getByText("Delivered in 5 days")).toBeVisible();
  });

  const adminPage = await signedInPage(browser, admin);
  await test.step("an admin approves the application, then verifies and features the expert", async () => {
    await adminPage.goto("/admin/experts");
    const card = adminPage.getByRole("listitem").filter({ has: adminPage.getByRole("heading", { name: applicant.name }) });
    await expect(card.getByRole("link", { name: "https://example.com/hawa/sales-dashboard" })).toBeVisible();
    await card.getByLabel("Note to the applicant (optional)").fill("Welcome aboard.");
    await card.getByRole("button", { name: `Approve ${applicant.name}` }).click();
    await expect(card).toHaveCount(0, AFTER_SUBMIT);

    await adminPage.goto("/admin/experts?view=experts&status=approved");
    const expert = adminPage.getByRole("listitem").filter({ has: adminPage.getByRole("heading", { name: applicant.name }) });
    await expert.getByRole("button", { name: `Verify ${applicant.name}` }).click();
    await expect(expert.getByText("Verified", { exact: true })).toBeVisible(AFTER_SUBMIT);
    await expert.getByRole("button", { name: `Feature ${applicant.name}` }).click();
    await expect(expert.getByText("Featured", { exact: true })).toBeVisible(AFTER_SUBMIT);
  });

  await test.step("the expert sees they are listed", async () => {
    await page.goto("/experts/apply");
    await expect(page.getByRole("heading", { name: "You are an approved expert" })).toBeVisible();
    await page.goto("/expert");
    await expect(page.getByText("Listed", { exact: true })).toBeVisible();
    await expect(page.getByRole("list", { name: "Badges" }).getByText("Verified")).toBeVisible();
    await expect(page.getByRole("link", { name: "View your expert page" })).toHaveAttribute("href", `/experts/${slug}`);

    await page.getByLabel("Availability note (optional)").fill("Weekday evenings and Saturday mornings");
    await page.getByRole("button", { name: "Save expert profile" }).click();
    await expect(page.getByText("Expert profile saved.")).toBeVisible(AFTER_SUBMIT);
    await expect(page.getByLabel("Availability note (optional)")).toHaveValue("Weekday evenings and Saturday mornings");
  });

  await test.step("an admin delists the expert with a reason the expert can read", async () => {
    const expert = adminPage.getByRole("listitem").filter({ has: adminPage.getByRole("heading", { name: applicant.name }) });
    await expert.getByLabel("Reason for delisting (shown to the expert)").fill("Two learners reported missed sessions.");
    await expert.getByRole("button", { name: `Delist ${applicant.name}` }).click();
    await expect(expert).toHaveCount(0, AFTER_SUBMIT);

    await page.goto("/expert");
    await expect(page.getByText("Delisted", { exact: true })).toBeVisible();
    await expect(page.getByText("Two learners reported missed sessions.")).toBeVisible();
    await expect(page.getByRole("link", { name: "Add an offer" })).toHaveCount(0);
  });
  await adminPage.context().close();
});

test("someone who is not an expert sees an honest empty dashboard, and the admin queue is hidden", async ({ page }) => {
  test.setTimeout(60_000);
  const learner = await createLearner("Mariama Seidu");
  await signIn(page, learner);
  await page.goto("/expert");
  await expect(page.getByRole("heading", { name: "You are not an expert yet" })).toBeVisible();
  await page.locator("main").getByRole("link", { name: "Become an expert" }).click();
  await expect(page).toHaveURL(/\/experts\/apply$/);
  await page.goto("/admin/experts");
  await expect(page.getByText("This page could not be found.")).toBeVisible();
});
