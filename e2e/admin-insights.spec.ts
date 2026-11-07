import { expect, test, type Page } from "@playwright/test";
import { admin, insert } from "./supabase-admin";
import { createLearner, PASSWORD, promoteToAdmin, type Learner } from "./learners";

/**
 * Admin insights (issue #243). Events are seeded on a day far in the past that
 * no other spec touches, the rollups rebuilt with the maintenance function,
 * and each dashboard is read with a custom range of just that day, so the
 * numbers are exact even with other specs running. Cohort numbers use a
 * cohort of this spec's own, picked with the cohort filter.
 */

const DAY_MS = 86_400_000;

async function signIn(page: Page, who: Learner) {
  await page.context().clearCookies();
  await page.goto("/login");
  await page.getByLabel("Email").fill(who.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 30_000 });
}

async function settled(page: Page) {
  await expect(page.locator("[aria-busy='true'], .animate-skeleton")).toHaveCount(0, { timeout: 30_000 });
}

test("admins read every dashboard with exact numbers and download CSV; learners get a 404", async ({ page }, testInfo) => {
  // Once: rebuilding the rollups from two projects at the same time could count a day twice.
  test.skip(testInfo.project.name !== "desktop", "Seeds and rebuilds the rollups once; the phone layout is checked below.");
  test.setTimeout(240_000);
  // Far enough back that no other spec (or local demo data) has events that day, inside the 13 month retention.
  const back = 380;
  const day = new Date(Date.now() - back * DAY_MS).toISOString().slice(0, 10);
  const at = (h: number) => `${day}T${String(h).padStart(2, "0")}:00:00Z`;
  const tag = crypto.randomUUID().slice(0, 8);
  const route = `/e2e-insights-${tag}`;

  const [learner, boss] = await Promise.all([createLearner("Mariama Abukari"), createLearner("Fuseini Iddrisu")]);
  await promoteToAdmin(boss.id);

  // Five visitors (three on phones, two on computers), one sign up, four
  // booking requests and one refused, and five LCP samples on our own page.
  const visitor = (i: number, device: string) => ({
    name: "page_view", anonymous_id: `e2e-${tag}-${i}`, session_id: crypto.randomUUID(), props: {}, created_at: at(9),
    device_class: device, signed_in: false, primary_role: "visitor", route, source: "client",
  });
  const events = [
    visitor(1, "mobile"), visitor(2, "mobile"), visitor(3, "mobile"), visitor(4, "desktop"), visitor(5, "desktop"),
    { name: "signup", profile_id: learner.id, session_id: crypto.randomUUID(), props: { method: "email" }, created_at: at(10), device_class: "mobile", signed_in: true, primary_role: "learner", route, source: "server" },
    ...[1, 2, 3, 4].map(() => ({
      name: "booking_requested", profile_id: learner.id, session_id: crypto.randomUUID(), props: {}, created_at: at(11),
      device_class: "mobile", signed_in: true, primary_role: "learner", route, source: "server",
    })),
    { name: "action_failed", profile_id: learner.id, session_id: crypto.randomUUID(), props: { action: "booking_requested", refusal: "validation", code: "23514" }, created_at: at(12), device_class: "mobile", signed_in: true, primary_role: "learner", route, source: "server" },
    ...[1000, 1200, 1400, 1600, 5000].map((value) => ({
      name: "web_vital", anonymous_id: `e2e-${tag}-4`, session_id: crypto.randomUUID(), props: { metric: "LCP", value, rating: value <= 2500 ? "good" : "poor" },
      created_at: at(13), device_class: "desktop", signed_in: false, route, source: "client",
    })),
  ];
  await insert("events", events);
  await admin("/rest/v1/rpc/run_analytics_maintenance", { method: "POST", body: { p_days: 400 } });

  // A cohort of the seeded programme that started 30 days ago; our learner sent nothing, so is at risk.
  const [program] = await admin<{ id: string }[]>("/rest/v1/programs?slug=eq.dmp&select=id");
  const starts = new Date(Date.now() - 30 * DAY_MS).toISOString().slice(0, 10);
  const [cohort] = await insert("cohorts", [{ program_id: program.id, name: `Insights cohort ${tag}`, starts_on: starts, status: "running" }]);
  await insert("cohort_members", [{ cohort_id: cohort.id, profile_id: learner.id, role: "learner" }]);

  try {
    const range = `range=custom&from=${day}&to=${day}`;
    await signIn(page, boss);

    await test.step("overview", async () => {
      await page.goto(`/admin/insights?${range}`);
      await settled(page);
      await expect(page.getByRole("heading", { level: 1, name: "Overview" })).toBeVisible();
      await expect(page.getByText("5 signed out visitors too")).toBeVisible();
      await expect(page.getByRole("heading", { name: "What each number means" })).toBeVisible();
    });

    await test.step("funnel", async () => {
      await page.goto(`/admin/insights/funnel?${range}`);
      await settled(page);
      const steps = page.getByRole("list", { name: "Funnel steps" });
      await expect(steps.getByRole("listitem").filter({ hasText: "Visited" })).toContainText("5");
      await expect(steps.getByRole("listitem").filter({ hasText: "Signed up" })).toContainText("20% of the step before");
    });

    await test.step("reliability", async () => {
      await page.goto(`/admin/insights/reliability?${range}`);
      await settled(page);
      const failures = page.getByRole("region", { name: "Failure rate by action" });
      await expect(failures.locator("tr").filter({ hasText: "Booking requested" })).toContainText("20%");
      const vital = page.locator("tr").filter({ hasText: route }).filter({ hasText: "LCP" });
      await expect(vital).toContainText("1.6 s");
      await expect(vital).toContainText("Good");
    });

    await test.step("DMP cohorts and the at risk export", async () => {
      await page.goto(`/admin/insights/cohorts?cohort=${cohort.id}`);
      await settled(page);
      await expect(page.getByRole("region", { name: "By cohort" }).locator("tr").filter({ hasText: `Insights cohort ${tag}` })).toBeVisible();
      await expect(page.getByRole("region", { name: "Learners at risk" }).locator("tr").filter({ hasText: learner.name })).toBeVisible();

      const href = await page.getByRole("link", { name: "Download CSV" }).last().getAttribute("href");
      expect(href).toContain("table=at_risk");
      const res = await page.request.get(href!);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toContain("text/csv");
      expect(res.headers()["content-disposition"]).toContain("sydcrest-at_risk-");
      const csv = await res.text();
      expect(csv).toContain("Cohort,Learner,Specialisation,Missing weeks");
      expect(csv).toContain(learner.name);
      expect(csv).not.toContain(learner.email);
    });

    await test.step("every other dashboard renders", async () => {
      for (const [path, title] of [
        ["retention", "Retention"],
        ["learning", "Learning"],
        ["features", "Feature use"],
        ["earn", "Experts and Earn"],
        ["community", "Community"],
      ]) {
        await page.goto(`/admin/insights/${path}?${range}`);
        await settled(page);
        await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
        await expect(page.getByRole("heading", { name: "What each number means" })).toBeVisible();
      }
      await page.goto(`/admin/insights/features?${range}`);
      await settled(page);
      await expect(page.locator("tr").filter({ hasText: "Bookings" })).toContainText("4");
    });

    await test.step("a learner gets a 404 for the pages and the export", async () => {
      await signIn(page, learner);
      await page.goto("/admin/insights/cohorts");
      await expect(page.getByText("This page could not be found.")).toBeVisible();
      await expect(page.getByText(learner.name)).toHaveCount(0);
      const res = await page.request.get(`/admin/insights/export?table=at_risk&cohort=${cohort.id}`);
      expect(res.status()).toBe(404);
      expect(await res.text()).not.toContain(learner.name);
    });
  } finally {
    await admin(`/rest/v1/cohort_members?cohort_id=eq.${cohort.id}`, { method: "DELETE" });
    await admin(`/rest/v1/cohorts?id=eq.${cohort.id}`, { method: "DELETE" });
    await admin(`/rest/v1/events?route=eq.${encodeURIComponent(route)}`, { method: "DELETE" });
    for (const who of [learner, boss]) await admin(`/auth/v1/admin/users/${who.id}`, { method: "DELETE" });
  }
});

test("the dashboards keep one column and their filters on a phone", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "phone", "Phone layout only.");
  const boss = await createLearner("Wumpini Alhassan");
  await promoteToAdmin(boss.id);
  try {
    await signIn(page, boss);
    for (const path of ["/admin/insights", "/admin/insights/cohorts", "/admin/insights/reliability"]) {
      await page.goto(path);
      await settled(page);
      await expect(page.getByRole("form", { name: "Filters" })).toBeVisible();
      await expect(page.getByRole("button", { name: "Apply filters" })).toBeVisible();
      // No sideways scrolling of the page itself.
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    }
    await page.goto("/admin/insights?range=7");
    await settled(page);
    await expect(page.getByLabel("Dates")).toHaveValue("7");
  } finally {
    await admin(`/auth/v1/admin/users/${boss.id}`, { method: "DELETE" });
  }
});
