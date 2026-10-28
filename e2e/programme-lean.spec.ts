import { expect, test } from "@playwright/test";

/**
 * Issue #239: /programme shows the twelve weeks as three phases and links to
 * the full week by week outline on /programme/curriculum.
 */

test("the programme page shows three phases and links to the full curriculum", async ({ page }) => {
  await page.goto("/programme");
  const curriculum = page.locator("#curriculum");
  await expect(curriculum.getByRole("heading", { name: "Twelve weeks in three phases", level: 2 })).toBeVisible();
  await expect(curriculum.getByText(/SydCrest's own lessons/)).toBeVisible();

  const phases = curriculum.getByRole("listitem").filter({ has: page.getByRole("heading", { level: 3 }) });
  await expect(phases).toHaveCount(3);
  for (const [weeks, title] of [
    ["Weeks 1 to 6", "Foundation"],
    ["Weeks 7 to 9", "Specialise"],
    ["Weeks 10 to 12", "Portfolio and capstone"],
  ]) {
    await expect(curriculum.getByRole("heading", { name: title, level: 3 })).toBeVisible();
    await expect(curriculum.getByText(weeks)).toBeVisible();
  }
  for (const track of ["SEO & Content Marketing", "Social Media Marketing", "Google Ads (SEM)"]) {
    await expect(curriculum.getByText(track, { exact: true })).toBeVisible();
  }

  // The week by week list is gone from this page; the stats, apply and waitlist sections stay.
  await expect(page.getByText("Computer & Internet Basics")).toHaveCount(0);
  await expect(page.getByText("Free resource:")).toHaveCount(0);
  await expect(page.getByText("guided, with weekly assignments")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Who it is for" })).toBeVisible();
  await expect(page.locator("#apply")).toBeVisible();
  await expect(page.locator("#waitlist form")).toBeVisible();

  await curriculum.getByRole("link", { name: "See the full week by week outline" }).click();
  await expect(page).toHaveURL(/\/programme\/curriculum$/);
  await expect(page.getByRole("heading", { name: "The full curriculum", level: 1 })).toBeVisible();
});

test("the full curriculum lists every week with lessons and extra practice", async ({ page }) => {
  await page.goto("/programme/curriculum");
  await expect(page).toHaveTitle(/The full curriculum/);
  await expect(page.getByRole("heading", { name: "Weeks 1 to 6: the foundation", level: 2 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Computer & Internet Basics", level: 3 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Final Assessment and Graduation", level: 3 })).toBeVisible();

  const week1 = page.getByRole("listitem").filter({ has: page.getByRole("heading", { name: "Computer & Internet Basics" }) });
  await expect(week1.getByRole("heading", { name: "SydCrest lessons" })).toBeVisible();
  await expect(week1.getByText("Mouse and keyboard basics")).toBeVisible();
  const practice = week1.getByRole("link", { name: /GCFGlobal LearnFree: Computer Basics.*opens in a new tab/ });
  await expect(practice).toHaveAttribute("href", "https://www.learnfree.org/series/computer-basics");
  await expect(practice).toHaveAttribute("target", "_blank");

  // Specialisation weeks open per track.
  await page.getByText("Google Ads (SEM)", { exact: true }).click();
  await expect(page.getByRole("heading", { name: "Google Ads Fundamentals", level: 3 })).toBeVisible();

  // No horizontal scroll at either width.
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("the sitemap lists the full curriculum", async ({ request }) => {
  const body = await (await request.get("/sitemap.xml")).text();
  expect(body).toMatch(/<loc>[^<]*\/programme\/curriculum<\/loc>/);
});
