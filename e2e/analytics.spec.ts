import { expect, test } from "@playwright/test";
import { confirmationLink } from "./mailpit";
import { testPhone } from "./learners";

// CI builds without NEXT_PUBLIC_GA_MEASUREMENT_ID, so Google Analytics stays off here (src/lib/analytics/google.ts).
test("visitors get a first party anonymous id and no third party trackers", async ({ page, context, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  const thirdParty: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.protocol.startsWith("http") && url.origin !== origin) thirdParty.push(url.origin);
  });

  // Page views go out through the first party beacon (issue #242).
  const pageView = page.waitForRequest((r) => r.method() === "POST" && new URL(r.url()).pathname === "/api/analytics", {
    timeout: 20_000,
  });
  await page.goto("/about");
  await pageView;

  const cookie = (await context.cookies()).find((c) => c.name === "sc_aid");
  expect(cookie, "anonymous id cookie").toBeDefined();
  expect(cookie!.httpOnly).toBe(true);
  expect(cookie!.value).toMatch(/^[0-9a-f-]{36}$/);
  expect(thirdParty).toEqual([]);
});

test("the funnel is for admins only", async ({ page }, testInfo) => {
  const email = `abdul.rahman.${testInfo.project.name}.${crypto.randomUUID().slice(0, 8)}@example.test`;
  await page.goto("/signup");
  await page.getByLabel("Your name").fill("Abdul-Rahman Issah");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Phone number").fill(testPhone());
  await page.getByLabel("Password").fill("Tamale-2027-pilot");
  await page.getByLabel("Date of birth").fill("1999-07-02");
  await page.getByLabel(/I agree to the Terms and Privacy Policy/).check();
  await page.getByLabel("I confirm I am 18 or over").check();
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByText(`We sent a confirmation link to ${email}`)).toBeVisible();

  // Confirming signs them in; their consent moves into the consents table on this first request.
  await page.goto(await confirmationLink(email));
  await expect(page).toHaveURL(/\/dashboard$/);

  await page.goto("/admin/funnel");
  await expect(page.getByText("This page could not be found.")).toBeVisible();
  await expect(page.getByText("Visit to sign up")).toHaveCount(0);
});

test("the privacy policy counts a page view too", async ({ page }) => {
  const pageView = page.waitForRequest((r) => r.method() === "POST" && new URL(r.url()).pathname === "/api/analytics", {
    timeout: 20_000,
  });
  await page.goto("/privacy");
  await pageView;
});

test("a tagged link records where the visit came from, once per tab session", async ({ page }) => {
  const beacons: { n: string; p?: Record<string, unknown>; r?: string }[] = [];
  page.on("request", (r) => {
    if (r.method() !== "POST" || new URL(r.url()).pathname !== "/api/analytics") return;
    beacons.push(...((JSON.parse(r.postData() ?? "{}").events ?? []) as typeof beacons));
  });
  const first = page.waitForRequest((r) => r.method() === "POST" && new URL(r.url()).pathname === "/api/analytics", {
    timeout: 20_000,
  });
  await page.goto("/programme?utm_source=WhatsApp&utm_medium=chapter&utm_campaign=Tamale");
  await first;

  const visit = beacons.find((e) => e.n === "visit_started");
  expect(visit?.p).toEqual({ utm_source: "whatsapp", utm_medium: "chapter", utm_campaign: "tamale", referrer: "direct", deep_link: true });
  expect(visit?.r).toBe("/programme");

  // A second page in the same tab is a page view, not a new visit.
  const second = page.waitForRequest((r) => r.method() === "POST" && new URL(r.url()).pathname === "/api/analytics", {
    timeout: 20_000,
  });
  await page.goto("/about");
  await second;
  expect(beacons.filter((e) => e.n === "visit_started")).toHaveLength(1);
});
