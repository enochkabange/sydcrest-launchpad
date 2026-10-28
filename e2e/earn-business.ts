/**
 * Seeding for the business accounts and talent directory journeys (issue
 * #161), through the LOCAL stack's secret key only (see supabase-admin.ts).
 */
import { expect, type Browser, type Page } from "@playwright/test";
import { admin, insert } from "./supabase-admin";
import { PASSWORD, type Learner } from "./learners";

export async function signIn(page: Page, learner: Learner) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

export async function signedInPage(browser: Browser, learner: Learner, viewport: { width: number; height: number } | null) {
  const context = await browser.newContext(viewport ? { viewport } : {});
  const page = await context.newPage();
  await signIn(page, learner);
  return page;
}

/** A live programme certificate, which makes the learner eligible for the talent directory. */
export async function certify(learner: Learner) {
  const [program] = await admin<{ id: string; title: string }[]>("/rest/v1/programs?select=id,title&slug=eq.dmp");
  if (!program) throw new Error("The dmp programme seed is missing");
  await insert("certificates", [
    { profile_id: learner.id, program_id: program.id, recipient_name: learner.name, program_title: program.title },
  ]);
  return program.title;
}

/** A verified organisation owned by `owner`, created the way the app does (the trigger adds the owner). */
export async function verifiedOrganisation(owner: Learner, name: string) {
  const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${crypto.randomUUID().slice(0, 6)}`;
  const [org] = await insert<{ slug: string }>("organisations", [
    { slug, name, kind: "business", region: "northern", created_by: owner.id, verification_status: "verified", verified_at: new Date().toISOString() },
  ]);
  return { id: org.id, slug };
}

export async function deleteOrganisation(slug: string) {
  await admin(`/rest/v1/organisations?slug=eq.${slug}`, { method: "DELETE" });
}

export async function deleteUser(id: string) {
  await admin(`/auth/v1/admin/users/${id}`, { method: "DELETE" });
}
