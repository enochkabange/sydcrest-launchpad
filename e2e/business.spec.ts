import { expect, test } from "@playwright/test";
import { createLearner, promoteToAdmin } from "./learners";
import { certify, deleteOrganisation, signIn, signedInPage, verifiedOrganisation } from "./earn-business";

/**
 * Business accounts and the talent directory (issue #161), at phone and
 * desktop widths, against the local stack.
 */

const slugs: string[] = [];
test.afterEach(async () => {
  for (const slug of slugs.splice(0)) await deleteOrganisation(slug);
});

test("an organisation signs up, asks for review, is verified and goes public", async ({ page, browser }, testInfo) => {
  const owner = await createLearner("Abdul-Rahman Mahama");
  const reviewer = await createLearner("Mariama Iddrisu");
  await promoteToAdmin(reviewer.id);
  const name = `Savannah Agritech ${crypto.randomUUID().slice(0, 6)}`;

  // From the marketing page to the real sign up flow.
  await signIn(page, owner);
  await page.goto("/business");
  await page.getByRole("link", { name: "Create a business account" }).first().click();
  await expect(page).toHaveURL(/\/business\/new$/);
  await expect(page.getByRole("heading", { name: "Create a business account" })).toBeVisible();

  // The confirmation is required.
  await page.getByLabel("Organisation name").fill(name);
  await page.getByLabel("Region (optional)").selectOption("northern");
  await page.getByRole("button", { name: "Create business account" }).click();
  await expect(page.getByText("Confirm that you are allowed to act for this organisation.")).toBeVisible();
  await page.getByLabel("I am allowed to act for this organisation.").check();
  await page.getByRole("button", { name: "Create business account" }).click();

  await expect(page).toHaveURL(/\/org\/savannah-agritech-[a-z0-9]+\/manage\?created=1$/);
  const slug = new URL(page.url()).pathname.split("/")[2];
  slugs.push(slug);
  await expect(page.getByRole("heading", { level: 1, name })).toBeVisible();
  await expect(page.getByText("You are owner here.")).toBeVisible();
  await expect(page.getByText("Not verified", { exact: true })).toBeVisible();

  // Not public until verified.
  const visitor = await browser.newPage();
  await visitor.goto(`/org/${slug}`);
  await expect(visitor.getByText("This page could not be found.")).toBeVisible();
  await expect(visitor.getByRole("heading", { level: 1, name })).toHaveCount(0);

  await page.getByRole("button", { name: "Ask to be verified" }).click();
  await expect(page.getByText("Waiting for review", { exact: true }).first()).toBeVisible();

  // An admin verifies it from the queue.
  const adminPage = await signedInPage(browser, reviewer, testInfo.project.use.viewport ?? null);
  await adminPage.goto("/admin/organisations");
  const card = adminPage.getByRole("listitem").filter({ has: adminPage.getByRole("heading", { name }) });
  await expect(card).toBeVisible();
  await card.getByRole("button", { name: "Verify" }).click();
  await expect(adminPage.getByRole("heading", { name })).toHaveCount(0);

  // Now public, with the verified badge.
  await visitor.goto(`/org/${slug}`);
  await expect(visitor.getByRole("heading", { level: 1, name })).toBeVisible();
  await expect(visitor.getByText(/Verified by SydCrest/)).toBeVisible();
  await expect(visitor.getByText("Northern Region").first()).toBeVisible();

  // The owner sees verified, and the placeholder for posting.
  await page.goto(`/org/${slug}/opportunities`);
  await page.getByRole("link", { name: "Post an opportunity" }).click();
  await expect(page).toHaveURL(new RegExp(`/org/${slug}/opportunities/new$`), { timeout: 15_000 });
  await expect(page.getByRole("heading", { name: "Posting is nearly here" })).toBeVisible();
});

test("a certified learner opts in, an organisation asks to talk, and the learner shares a contact", async ({ page, browser }, testInfo) => {
  const owner = await createLearner("Wumpini Abukari");
  const learner = await createLearner("Fuseini Alhassan");
  const outsider = await createLearner("Hawa Seidu");
  const programme = await certify(learner);
  const orgName = `Tamale Data Works ${crypto.randomUUID().slice(0, 6)}`;
  const org = await verifiedOrganisation(owner, orgName);
  slugs.push(org.slug);
  const viewport = testInfo.project.use.viewport ?? null;

  // The learner opts in.
  await signIn(page, learner);
  await page.goto("/talent/me");
  await page.getByLabel("Headline").fill("Junior data analyst");
  await page.getByLabel("Skills (optional)").fill("Excel, SQL, Power BI");
  await page.getByLabel("Data", { exact: true }).check();
  await page.getByLabel("Region (optional)").selectOption("northern");
  await page.getByRole("button", { name: "Join the directory" }).click();
  await expect(page.getByText("Listed", { exact: true })).toBeVisible();
  await expect(page.getByText(`Certified: ${programme}`).first()).toBeVisible();

  // Someone without a verified organisation cannot browse.
  const outsiderPage = await signedInPage(browser, outsider, viewport);
  await outsiderPage.goto("/talent");
  await expect(outsiderPage.getByRole("heading", { name: "For verified organisations" })).toBeVisible();
  await expect(outsiderPage.getByText("Fuseini Alhassan")).toHaveCount(0);

  // The organisation filters, finds and asks.
  const ownerPage = await signedInPage(browser, owner, viewport);
  await ownerPage.goto("/talent");
  await ownerPage.getByLabel("Skill").fill("excel");
  await ownerPage.getByLabel("Region").selectOption("northern");
  await ownerPage.getByRole("button", { name: "Show talent" }).click();
  await expect(ownerPage).toHaveURL(/skill=excel/);
  // Other runs list learners with the same name, so pick this one by their link.
  await ownerPage.locator(`a[href="/talent/${learner.id}"]`).click();
  await expect(ownerPage).toHaveURL(new RegExp(`/talent/${learner.id}$`), { timeout: 15_000 });
  await expect(ownerPage.getByRole("heading", { name: "Ask Fuseini to talk" })).toBeVisible({ timeout: 15_000 });
  // The list page stays in the DOM, hidden, after a client navigation; count what is shown.
  await expect(ownerPage.getByText("Junior data analyst").locator("visible=true")).toHaveCount(1);
  await expect(ownerPage.getByText(learner.email)).toHaveCount(0);
  await ownerPage.getByLabel("Message to Fuseini").fill("We are hiring a data intern in Tamale. Could we talk?");
  await ownerPage.getByRole("button", { name: "Ask to talk" }).click();
  await expect(ownerPage.getByText(/Request sent/)).toBeVisible();

  // No contact detail reaches the organisation before the learner accepts.
  await ownerPage.goto(`/org/${org.slug}/requests`);
  await expect(ownerPage.getByText("Waiting for a reply")).toBeVisible();
  await expect(ownerPage.getByText(/They shared/)).toHaveCount(0);

  // The learner accepts and chooses what to share.
  await page.goto("/talent/me");
  await expect(page.getByText("We are hiring a data intern in Tamale. Could we talk?")).toBeVisible();
  await page.getByLabel(/What should they use to reach you/).fill("fuseini.work@example.com");
  await page.getByRole("button", { name: "Accept" }).click();
  await expect(page.getByText("You shared: fuseini.work@example.com")).toBeVisible();

  await ownerPage.reload();
  await expect(ownerPage.getByText("fuseini.work@example.com")).toBeVisible();
  await expect(ownerPage.getByText("Accepted", { exact: true })).toBeVisible();
});
