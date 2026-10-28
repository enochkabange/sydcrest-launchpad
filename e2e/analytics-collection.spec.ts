import { expect, test, type Page } from "@playwright/test";
import { admin } from "./supabase-admin";
import { createLearner, PASSWORD } from "./learners";

/**
 * Analytics collection (issue #242): key actions record the right events with
 * the standard attributes, the browser beacon batches page views, and opting
 * out (Do Not Track or the privacy page switch) records nothing.
 */

type Row = {
  name: string;
  props: Record<string, unknown>;
  route: string | null;
  source: string | null;
  device_class: string | null;
  signed_in: boolean | null;
  primary_role: string | null;
  roles: string[] | null;
  region: string | null;
};

const SELECT = "select=name,props,route,source,device_class,signed_in,primary_role,roles,region";

async function eventsFor(filter: string): Promise<Row[]> {
  return admin<Row[]>(`/rest/v1/events?${filter}&${SELECT}&order=id`);
}

/** Server events are written just after the response; give them a moment. */
async function waitForEvents(filter: string, names: string[]) {
  await expect
    .poll(async () => (await eventsFor(filter)).map((e) => e.name), { timeout: 15_000 })
    .toEqual(expect.arrayContaining(names));
  return eventsFor(filter);
}

async function signIn(page: Page, email: string) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 30_000 });
}

async function anonymousId(page: Page) {
  const cookie = (await page.context().cookies()).find((c) => c.name === "sc_aid");
  expect(cookie, "anonymous id cookie").toBeDefined();
  return cookie!.value;
}

test("a visitor's page views go through the batched beacon under the route pattern", async ({ page }) => {
  const beacon = page.waitForRequest((r) => r.method() === "POST" && new URL(r.url()).pathname === "/api/analytics", {
    timeout: 20_000,
  });
  await page.goto("/roadmaps");
  const request = await beacon;
  const body = JSON.parse(request.postData() ?? "{}");
  expect(body.events.map((e: { n: string }) => e.n)).toContain("page_view");
  expect(body.sid).toMatch(/^[0-9a-f-]{36}$/);

  const aid = await anonymousId(page);
  const rows = await waitForEvents(`anonymous_id=eq.${aid}&name=eq.page_view`, ["page_view"]);
  expect(rows[0]).toMatchObject({ route: "/roadmaps", source: "client", signed_in: false, primary_role: "visitor" });
});

test("sign in, a refused sign in and a profile save record the right events with attributes", async ({ page }) => {
  const learner = await createLearner("Fuseini Mahama");
  await admin(`/rest/v1/profiles?id=eq.${learner.id}`, { method: "PATCH", body: { region: "northern" } });

  await test.step("a wrong password is a refusal, not a sign in", async () => {
    await page.goto("/login");
    await page.getByLabel("Email").fill(learner.email);
    await page.getByLabel("Password").fill("not-the-password");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByText("That email and password don't match an account.")).toBeVisible();
    const aid = await anonymousId(page);
    const rows = await waitForEvents(`anonymous_id=eq.${aid}&name=eq.action_failed`, ["action_failed"]);
    expect(rows[0].props).toEqual({ action: "sign_in", refusal: "validation", code: "invalid_credentials" });
    expect(rows[0].signed_in).toBe(false);
  });

  await test.step("signing in and saving the profile", async () => {
    await signIn(page, learner.email);
    await page.goto("/profile");
    await page.getByLabel("Region").selectOption("upper_east");
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(page.getByText("Saved.")).toBeVisible();
  });

  const rows = await waitForEvents(`profile_id=eq.${learner.id}`, ["sign_in", "profile_updated", "page_view"]);
  const signIn_ = rows.find((r) => r.name === "sign_in")!;
  expect(signIn_).toMatchObject({ props: { method: "email" }, source: "server", signed_in: true, primary_role: "learner", region: "northern" });
  expect(signIn_.roles).toEqual(["learner"]);
  expect(["mobile", "desktop", "tablet", "bot"]).toContain(signIn_.device_class);

  const saved = rows.find((r) => r.name === "profile_updated")!;
  expect(saved).toMatchObject({ props: { has_region: true }, route: "/profile", signed_in: true });

  // Nothing personal reached the props of any event.
  for (const row of rows) expect(JSON.stringify(row.props)).not.toMatch(/fuseini|@example\.test|upper_east/i);
});

test("Do Not Track records nothing, signed in or not", async ({ browser, baseURL }) => {
  const learner = await createLearner("Mariama Seidu");
  // A browser with Do Not Track on sends the header with every request and says so to scripts.
  const context = await browser.newContext({ baseURL, extraHTTPHeaders: { DNT: "1" } });
  await context.addInitScript(() => Object.defineProperty(Navigator.prototype, "doNotTrack", { get: () => "1" }));
  const page = await context.newPage();
  await page.goto("/roadmaps");
  await signIn(page, learner.email);
  await page.goto("/profile");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByText("Saved.")).toBeVisible();
  // Let any beacon go out and any after() write land.
  await page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
  await page.waitForTimeout(3000);

  const aid = (await context.cookies()).find((c) => c.name === "sc_aid")?.value;
  expect(await eventsFor(`profile_id=eq.${learner.id}`)).toEqual([]);
  if (aid) expect(await eventsFor(`anonymous_id=eq.${aid}`)).toEqual([]);
  await context.close();
});

test("the privacy page switch turns analytics off for this browser", async ({ page }) => {
  await page.goto("/privacy");
  await page.getByRole("button", { name: "Turn analytics off on this device" }).click();
  await expect(page.getByText("Analytics are off for this browser.")).toBeVisible();
  const aid = await anonymousId(page);
  const before = (await eventsFor(`anonymous_id=eq.${aid}`)).length;

  const beacons: string[] = [];
  page.on("request", (r) => {
    if (new URL(r.url()).pathname === "/api/analytics") beacons.push(r.url());
  });
  await page.goto("/roadmaps");
  await page.goto("/about");
  await page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
  await page.waitForTimeout(3000);
  expect(beacons).toEqual([]);
  expect((await eventsFor(`anonymous_id=eq.${aid}`)).length).toBe(before);

  // And back on again.
  await page.goto("/privacy");
  await page.getByRole("button", { name: "Turn analytics back on" }).click();
  await expect(page.getByText("Analytics are on for this browser.")).toBeVisible();
});

test("the beacon refuses other sites", async ({ request, baseURL }) => {
  const res = await request.post("/api/analytics", {
    data: JSON.stringify({ events: [{ n: "page_view" }] }),
    headers: { Origin: "https://evil.example", "Content-Type": "text/plain" },
  });
  expect(res.status()).toBe(403);
  const ok = await request.post("/api/analytics", {
    data: JSON.stringify({ events: [{ n: "booking_requested" }] }),
    headers: { Origin: new URL(baseURL!).origin, "Content-Type": "text/plain" },
  });
  // Server only events are dropped; the answer is the same empty 204.
  expect(ok.status()).toBe(204);
});
