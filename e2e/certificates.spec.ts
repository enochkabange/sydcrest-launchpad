import { expect, test } from "@playwright/test";
import type { Learner } from "./learners";
import { seedEligibleCohort, signIn } from "./certificates-fixtures";

/**
 * Certificates (issue #147): the learner sees the checklist, the mentor
 * issues, anyone verifies, the public profile lists it, an admin revokes.
 * Test data comes from certificates-fixtures.ts (local stack only).
 */

test("a mentor issues a certificate, anyone verifies it, an admin revokes it", async ({ page, request }, testInfo) => {
  test.setTimeout(240_000);
  const tag = `${testInfo.project.name}-${crypto.randomUUID().slice(0, 6)}`;
  const seeded = await seedEligibleCohort(tag);
  const learner: Learner = seeded.learner;
  let verifyPath = "";

  await test.step("the learner sees every criterion met and waits for the mentor", async () => {
    await signIn(page, learner.email);
    await page.goto("/certificates");
    await expect(page.getByRole("heading", { name: "Certificates", level: 1 })).toBeVisible();
    const card = page.getByRole("region", { name: /certification$/ });
    await expect(card.getByText("Pass every week (done)")).toBeAttached();
    await expect(card.getByText("Review a classmate's capstone (done)")).toBeAttached();
    await expect(card.getByText("Mentor's final review (not yet)")).toBeAttached();
    await expect(card.getByText(/Your mentor makes the final review/).first()).toBeVisible();
  });

  await test.step("the cohort home shows the same checklist", async () => {
    await page.goto("/cohort");
    await expect(page.getByRole("region", { name: /certification$/ }).getByText("Mentor's final review (not yet)")).toBeAttached({
      timeout: 15_000,
    });
  });

  await test.step("a learner cannot open the issuing screen", async () => {
    await page.goto("/certificates/issue");
    await expect(page.getByText("This page could not be found.")).toBeVisible();
  });

  await test.step("the mentor issues the certificate", async () => {
    await signIn(page, seeded.mentor.email);
    await page.goto(`/certificates/issue?cohort=${seeded.cohortId}`);
    await expect(page.getByRole("heading", { name: "Issue certificates", level: 1 })).toBeVisible();
    await page.getByRole("button", { name: `Issue certificate to ${learner.name}` }).click();
    // The page refreshes from the server: the row now links to the certificate.
    await page.getByRole("link", { name: `Issued: view ${learner.name}'s certificate` }).click();
    await expect(page).toHaveURL(/\/verify\/[0-9a-f]{32}$/);
    verifyPath = new URL(page.url()).pathname;
  });

  await test.step("anyone can verify it, signed out", async () => {
    await page.context().clearCookies();
    await page.goto(verifyPath);
    await expect(page.getByText("Valid certificate")).toBeVisible();
    await expect(page.getByRole("heading", { name: learner.name, level: 1 })).toBeVisible();
    await expect(page.getByText(/Delta Mentoring Program/).first()).toBeVisible();
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);

    const credential = await request.get(`${verifyPath}/credential.json`);
    expect(credential.status()).toBe(200);
    const vc = await credential.json();
    expect(vc.type).toEqual(["VerifiableCredential", "OpenBadgeCredential"]);
    expect(vc.credentialSubject.identifier[0].identityHash).toBe(learner.name);
    expect(JSON.stringify(vc)).not.toContain(learner.email);

    const badge = await request.get("/badges/dmp/image.png");
    expect(badge.headers()["content-type"]).toContain("image/png");
    const issuer = await request.get("/badges/issuer.json");
    expect((await issuer.json()).type).toEqual(["Profile"]);
  });

  await test.step("the public profile lists it", async () => {
    await page.goto(`/u/${seeded.slug}`);
    const section = page.getByRole("region", { name: "Certificates" });
    await expect(section.getByRole("link", { name: /Delta Mentoring Program/ })).toHaveAttribute("href", verifyPath);
  });

  await test.step("the learner sees the certificate with a link to share", async () => {
    await signIn(page, learner.email);
    await page.goto("/certificates");
    await expect(page.getByText("Certificate issued")).toBeVisible();
    await expect(page.getByLabel("Verification link")).toHaveValue(new RegExp(`${verifyPath}$`));
  });

  await test.step("an admin revokes it with a reason", async () => {
    await signIn(page, seeded.admin.email);
    await page.goto("/admin/certificates");
    const item = page.getByRole("listitem").filter({ hasText: `E2E certificates ${tag}` });
    await item.getByText("Revoke", { exact: true }).click();
    await item.getByLabel(/Reason for revoking/).fill("Issued to the wrong cohort in testing.");
    await item.getByRole("button", { name: "Revoke certificate" }).click();
    await expect(page.getByText("Certificate revoked.")).toBeVisible({ timeout: 15_000 });
    const revoked = page.getByRole("listitem").filter({ hasText: `E2E certificates ${tag}` });
    await expect(revoked.getByText("Revoked", { exact: true })).toBeVisible();
    await expect(revoked.getByText("Reason: Issued to the wrong cohort in testing.")).toBeVisible();
  });

  await test.step("the verify page now says revoked and is not indexed", async () => {
    await page.context().clearCookies();
    await page.goto(verifyPath);
    await expect(page.getByRole("heading", { name: "This certificate was revoked" })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    expect((await request.get(`${verifyPath}/credential.json`)).status()).toBe(410);
    await page.goto(`/u/${seeded.slug}`);
    await expect(page.getByRole("region", { name: "Certificates" })).toHaveCount(0);
  });

  await test.step("an unknown id says so and is not indexed", async () => {
    await page.goto(`/verify/${"0".repeat(32)}`);
    await expect(page.getByRole("heading", { name: "No certificate found" })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
});
