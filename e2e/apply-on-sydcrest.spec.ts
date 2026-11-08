import { expect as baseExpect, test } from "@playwright/test";
import { createLearner, type Learner } from "./learners";
import { deleteOrganisation, deleteUser, signIn, verifiedOrganisation } from "./earn-business";
import { admin, insert } from "./supabase-admin";

/**
 * Apply on SydCrest (#306): an employer posts a job that takes applications
 * here, a learner applies, and the employer moves them from New through
 * Shortlisted (their contact details appear) to Hired, which the learner
 * sees and which files a job outcome.
 */

const expect = baseExpect.configure({ timeout: 15_000 });

test("a learner applies on SydCrest and the employer shortlists and hires them (#306)", async ({ page }) => {
  const tag = crypto.randomUUID().slice(0, 6);
  const owner = await createLearner("Ayishetu Abukari");
  const learner: Learner = await createLearner("Amina Fuseini");
  const orgName = `Savannah Shea ${tag}`;
  const org = { ...(await verifiedOrganisation(owner, orgName)), name: orgName };
  const slug = `shea-sales-${tag}`;
  const [opp] = await insert<{ id: string }>("opportunities", [
    {
      slug,
      kind: "job",
      title: `Online sales assistant ${tag}`,
      description: "Sell shea butter to buyers across Ghana on WhatsApp and Instagram.",
      organisation_id: org.id,
      organisation_name: org.name,
      posted_by: owner.id,
      status: "open",
      apply_on_sydcrest: true,
    },
  ]);
  try {
    // The learner applies from the listing.
    await signIn(page, learner);
    await page.goto(`/opportunities/${slug}`);
    await page.getByRole("link", { name: "Apply on SydCrest" }).click();
    await expect(page.getByRole("heading", { name: `Apply: Online sales assistant ${tag}`, level: 1 })).toBeVisible();
    await page.getByRole("button", { name: "Send application" }).click();
    await expect(page.getByText("Write at least 20 characters about why you fit.")).toBeVisible();
    await expect(page.getByText(/^Tick the box to apply/)).toBeVisible();
    await page.getByLabel("Why you are a good fit").fill("I have sold provisions on WhatsApp for two years and I can start next week.");
    await page.getByLabel(new RegExp(`If ${org.name} shortlists me`)).check();
    await page.getByRole("button", { name: "Send application" }).click();
    await expect(page).toHaveURL(/\/opportunities\/applications\?sent=1$/);
    await expect(page.getByText("Sent. The employer has not looked at it yet.")).toBeVisible();

    // The employer sees the applicant without contact details, then shortlists.
    await page.context().clearCookies();
    await signIn(page, owner);
    await page.goto(`/org/${org.slug}/opportunities`);
    await page.getByRole("link", { name: `Applicants for Online sales assistant ${tag}` }).click();
    const card = page.getByRole("listitem").filter({ has: page.getByRole("heading", { name: "Amina Fuseini" }) });
    await expect(card.getByText("I have sold provisions on WhatsApp")).toBeVisible();
    await expect(card.getByText("Contact:")).toHaveCount(0);
    await card.getByRole("combobox", { name: "Stage" }).selectOption("shortlisted");
    await card.getByRole("button", { name: "Update" }).click();
    await expect(card.getByText(learner.email)).toBeVisible();

    await card.getByRole("combobox", { name: "Stage" }).selectOption("hired");
    await card.getByRole("button", { name: "Update" }).click();
    await expect(card.getByText("Hired", { exact: true }).first()).toBeVisible();

    // The learner sees the hire, and the outcome is filed for verification.
    await page.context().clearCookies();
    await signIn(page, learner);
    await page.goto("/opportunities/applications");
    await expect(page.getByText(/^Hired\. Congratulations!/)).toBeVisible();
    await expect(page.getByRole("button", { name: "Withdraw application" })).toHaveCount(0);
    const outcomes = await admin<{ type: string; verification_status: string }[]>(
      `/rest/v1/outcomes?profile_id=eq.${learner.id}&select=type,verification_status`,
    );
    expect(outcomes).toEqual([{ type: "job", verification_status: "pending" }]);
  } finally {
    await admin(`/rest/v1/opportunities?id=eq.${opp.id}`, { method: "DELETE" }).catch(() => undefined);
    await deleteOrganisation(org.slug).catch(() => undefined);
    await Promise.all([deleteUser(owner.id), deleteUser(learner.id)]).catch(() => undefined);
  }
});
