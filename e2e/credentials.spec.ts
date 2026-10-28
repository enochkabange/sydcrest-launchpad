import { expect, test, type Page } from "@playwright/test";
import { deleteUser, signIn } from "./earn-business";
import { createLearner, promoteToAdmin, type Learner } from "./learners";
import { makePublic } from "./sharing-seed";
import { admin } from "./supabase-admin";
import { bakedPng } from "../src/lib/credentials/fixtures";

/**
 * Credentials wallet (issue #253): add a certificate with a file, make it
 * public, share it to LinkedIn, view the public wallet, report it and hide
 * it as an admin; and an Open Badge import that cannot be checked stays
 * "Added by the learner".
 */

// A 1x1 PNG: a real image for the upload.
const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "base64",
);

async function slugOf(learner: Learner) {
  const [row] = await admin<{ public_slug: string }[]>(`/rest/v1/profiles?select=public_slug&id=eq.${learner.id}`);
  return row.public_slug;
}

/** Opens a <details> by its summary; retried, because a tap before hydration can be lost. */
async function openPanel(page: Page, name: string) {
  const summary = page.locator("#credentials summary", { hasText: name });
  await expect(async () => {
    if (!(await summary.evaluate((s) => (s.parentElement as HTMLDetailsElement).open))) await summary.click();
    expect(await summary.evaluate((s) => (s.parentElement as HTMLDetailsElement).open)).toBe(true);
  }).toPass();
}

test.describe("credentials wallet", () => {
  const cleanup: (() => Promise<unknown>)[] = [];
  test.afterEach(async () => {
    while (cleanup.length) await cleanup.pop()!().catch(() => {});
  });

  test("add with a file, make public, share to LinkedIn, view, report and hide", async ({ page, browser }) => {
    test.setTimeout(120_000);
    const learner = await createLearner("Abdul-Rahman Issah");
    cleanup.push(() => deleteUser(learner.id));
    await makePublic(learner);
    const slug = await slugOf(learner);

    await signIn(page, learner);
    await page.goto("/profile#credentials");
    const wallet = page.locator("#credentials");

    await test.step("add a certificate with an image of it", async () => {
      await openPanel(page, "Add a certificate");
      await wallet.getByLabel("Certificate name").fill("Google Data Analytics");
      await wallet.getByLabel("Issued by").fill("Google");
      await wallet.getByLabel("Issue date (optional)").fill("2026-05-14");
      await wallet.getByLabel("Credential ID (optional)").fill("GDA-2026-0042");
      await wallet.getByLabel("Issuer's verification link (optional)").fill("https://www.coursera.org/account/accomplishments/verify/GDA0042");
      await wallet.locator("input[type=file]").first().setInputFiles({ name: "certificate.png", mimeType: "image/png", buffer: PNG });
      await expect(wallet.getByText("certificate.png")).toBeVisible();
      await wallet.getByRole("button", { name: "Add certificate" }).click();
      await expect(wallet.getByText("Saved to your wallet.")).toBeVisible();
    });

    const card = wallet.locator("article", { hasText: "Google Data Analytics" });
    await test.step("it is private and the learner's word", async () => {
      await expect(card.getByText("Added by the learner", { exact: true })).toBeVisible();
      await expect(card.getByText("Only you can see it.")).toBeVisible();
      await expect(card.locator("img")).toHaveAttribute("src", /\/storage\/v1\/object\/sign\/credentials\//);
    });

    await test.step("make it public", async () => {
      await card.getByRole("button", { name: /Make public/ }).click();
      await expect(card.getByText("Anyone with your wallet link can see it.")).toBeVisible();
    });

    await test.step("Add to LinkedIn opens LinkedIn's own certification form, filled in", async () => {
      const href = await card.getByRole("link", { name: /Add to LinkedIn/ }).getAttribute("href");
      const url = new URL(href!);
      expect(url.origin + url.pathname).toBe("https://www.linkedin.com/profile/add");
      expect(Object.fromEntries(url.searchParams)).toMatchObject({
        startTask: "CERTIFICATION_NAME",
        name: "Google Data Analytics",
        organizationName: "Google",
        issueYear: "2026",
        issueMonth: "5",
        certId: "GDA-2026-0042",
        certUrl: "https://www.coursera.org/account/accomplishments/verify/GDA0042",
      });
      await card.getByRole("button", { name: "Embed" }).click();
      await expect(card.getByLabel(/Embed code for/)).toHaveValue(/^<a href="[^"]+\/u\/[^"]+\/credentials#c-[0-9a-f-]+"[^>]*><img src="[^"]+\/og\/credentials\/[0-9a-f-]+\/square"/);
    });

    const [row] = await admin<{ id: string }[]>(`/rest/v1/external_credentials?select=id&profile_id=eq.${learner.id}`);

    await test.step("a visitor sees it on the public wallet with an honest label", async () => {
      const visitor = await browser.newPage();
      await visitor.goto(`/u/${slug}/credentials`);
      await expect(visitor.getByRole("heading", { level: 1, name: "Abdul-Rahman Issah's credentials" })).toBeVisible();
      const publicCard = visitor.locator(`#c-${row.id}`);
      await expect(publicCard.getByRole("heading", { name: "Google Data Analytics" })).toBeVisible();
      await expect(publicCard.getByText("Added by the learner", { exact: true })).toBeVisible();
      await expect(publicCard.getByText(/SydCrest has not checked it/)).toBeVisible();
      await expect(publicCard.getByRole("link", { name: /Check with Google/ })).toHaveAttribute("href", /coursera\.org/);
      const img = await visitor.request.get((await publicCard.locator("img").getAttribute("src"))!);
      expect(img.status()).toBe(200);
      const og = await visitor.request.get(`/og/credentials/${row.id}/square`);
      expect(og.status()).toBe(200);
      expect(og.headers()["content-type"]).toBe("image/png");
      // The profile page summarises the wallet.
      await visitor.goto(`/u/${slug}`);
      await expect(visitor.getByRole("link", { name: "See all credentials" })).toBeVisible();
      await visitor.close();
    });

    await test.step("another learner reports it", async () => {
      const reporter = await createLearner("Hawa Abubakari");
      cleanup.push(() => deleteUser(reporter.id));
      const other = await browser.newPage();
      await signIn(other, reporter);
      await other.goto(`/u/${slug}/credentials`);
      const publicCard = other.locator(`#c-${row.id}`);
      await expect(async () => {
        await publicCard.getByText("Report", { exact: false }).first().click();
        await expect(publicCard.getByLabel("Reason")).toBeVisible({ timeout: 1_000 });
      }).toPass();
      await publicCard.getByLabel("Reason").selectOption("Fake or misleading certificate");
      await publicCard.getByRole("button", { name: "Send report" }).click();
      await expect(publicCard.getByText("Thanks. Our team will review this report.")).toBeVisible();
      await other.close();
    });

    await test.step("an admin hides it, and it leaves the public wallet", async () => {
      const moderator = await createLearner("Fuseini Mahama");
      cleanup.push(() => deleteUser(moderator.id));
      await promoteToAdmin(moderator.id);
      const mod = await browser.newPage();
      await signIn(mod, moderator);
      await mod.goto("/admin/reports");
      const report = mod.locator("li", { hasText: "Credential: Google Data Analytics" });
      await expect(report).toBeVisible();
      await report.getByRole("button", { name: "Hide credential" }).click();
      await expect(report.getByRole("button", { name: "Show credential again" })).toBeVisible();
      await mod.close();
      cleanup.push(() => admin(`/rest/v1/reports?target_id=eq.${row.id}`, { method: "DELETE" }));

      const visitor = await browser.newPage();
      await visitor.goto(`/u/${slug}/credentials`);
      await expect(visitor.getByText("Nothing to show yet")).toBeVisible();
      await visitor.close();
      await page.goto("/profile#credentials");
      await expect(page.locator("#credentials").getByText(/Our team hid this credential/)).toBeVisible();
    });
  });

  test("an Open Badge that cannot be checked is imported as added by the learner", async ({ page }) => {
    const learner = await createLearner("Mariama Seidu");
    cleanup.push(() => deleteUser(learner.id));
    await signIn(page, learner);
    await page.goto("/profile#credentials");
    const wallet = page.locator("#credentials");
    await openPanel(page, "Import an Open Badge");

    const credential = {
      "@context": ["https://www.w3.org/ns/credentials/v2"],
      id: "urn:uuid:5f1a7c2e-1b7d-4f36-9a51-0b6a2f3c9d10",
      type: ["VerifiableCredential", "OpenBadgeCredential"],
      issuer: { id: "urn:uuid:issuer", type: ["Profile"], name: "Bolgatanga Coding Club" },
      validFrom: "2026-02-10T00:00:00Z",
      credentialSubject: { type: ["AchievementSubject"], achievement: { type: ["Achievement"], name: "HTML and CSS Basics" } },
    };
    await wallet.getByLabel("Badge image (PNG or SVG)").setInputFiles({
      name: "badge.png",
      mimeType: "image/png",
      buffer: bakedPng("openbadgecredential", JSON.stringify(credential)),
    });
    await wallet.getByRole("button", { name: "Import badge" }).click();
    await expect(wallet.getByText(/HTML and CSS Basics is in your wallet, private for now\./)).toBeVisible();
    await expect(wallet.getByText(/shows as added by you/).first()).toBeVisible();

    const imported = wallet.locator("article", { hasText: "HTML and CSS Basics" });
    await expect(imported.getByText("Bolgatanga Coding Club")).toBeVisible();
    await expect(imported.getByText("Added by the learner", { exact: true })).toBeVisible();
    await expect(imported.getByText("Verified by the issuer")).toHaveCount(0);
  });
});
