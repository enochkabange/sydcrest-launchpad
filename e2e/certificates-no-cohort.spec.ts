import { expect, test, type Page } from "@playwright/test";
import { admin, insert } from "./supabase-admin";
import { createLearner, type Learner } from "./learners";
import { signIn } from "./certificates-fixtures";

/**
 * /certificates for a learner outside any cohort (issue #238): a certificate
 * they hold still shows, with its verification link and sharing; with none,
 * an honest empty state points to how certificates are earned. Runs on the
 * phone and desktop projects. Test data is created in the LOCAL stack only.
 */

/** E2E FIXTURE ONLY: a live certificate for the seeded programme, with no cohort. */
async function certificateWithoutCohort(learner: Learner) {
  const [program] = await admin<{ id: string; title: string }[]>("/rest/v1/programs?slug=eq.dmp&select=id,title");
  const [cert] = await insert("certificates", [
    {
      profile_id: learner.id,
      program_id: program.id,
      cohort_id: null,
      recipient_name: learner.name,
      program_title: program.title,
      specialization: "seo",
      specialization_label: "SEO & Content Marketing",
    },
  ]);
  return (cert as unknown as { verification_id: string }).verification_id;
}

async function expectNoSideScroll(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
}

test("a learner with a certificate but no cohort sees it and can share it", async ({ page }) => {
  test.setTimeout(120_000);
  const learner = await createLearner("Wumpini Alhassan");
  const verificationId = await certificateWithoutCohort(learner);

  await signIn(page, learner.email);
  await page.goto("/certificates");
  await expect(page.getByRole("heading", { name: "Certificates", level: 1 })).toBeVisible();

  const card = page.getByRole("region", { name: /certificate$/ });
  await expect(card.getByText("Certificate issued")).toBeVisible();
  await expect(card.getByRole("heading", { name: /SEO & Content Marketing/, level: 2 })).toBeVisible();
  await expect(card.getByRole("link", { name: "View certificate" })).toHaveAttribute("href", `/verify/${verificationId}`);
  await expect(card.getByLabel("Verification link")).toHaveValue(new RegExp(`/verify/${verificationId}$`));
  await expect(card.getByRole("button", { name: "Copy link" })).toBeVisible();
  await expect(card.getByRole("link", { name: /Add to LinkedIn/ })).toBeVisible();

  await expect(page.getByRole("heading", { name: "No certificates yet" })).toHaveCount(0);
  await expect(page.getByRole("region", { name: /certification$/ })).toHaveCount(0);
  await expectNoSideScroll(page);
});

test("a learner with no certificate and no cohort sees how certificates are earned", async ({ page }) => {
  test.setTimeout(120_000);
  const learner = await createLearner("Mariama Seidu");

  await signIn(page, learner.email);
  await page.goto("/certificates");
  const empty = page.getByRole("region", { name: "No certificates yet" });
  await expect(empty).toBeVisible();
  await expect(empty.getByText(/Certificates come from finishing a mentored programme/)).toBeVisible();
  await expect(empty.getByRole("link", { name: "See the programme" })).toHaveAttribute("href", "/programme");
  await expect(page.getByRole("region", { name: /certificate$|certification$/ })).toHaveCount(0);
  await expectNoSideScroll(page);
});
