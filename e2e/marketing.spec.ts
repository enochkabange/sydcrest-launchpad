import { expect, test } from "@playwright/test";
import { admin } from "./supabase-admin";

/**
 * The public site. The pages are static; the waitlist test saves to the local
 * Supabase stack. Runs under both the phone (390px) and desktop projects, so
 * the overflow check is the 390px check.
 */
const PAGES = [
  { path: "/", h1: "Find your path into tech." },
  { path: "/about", h1: "Why SydCrest exists" },
  { path: "/programme", h1: "The Delta Mentoring Program" },
  { path: "/business", h1: "Hire verified Ghanaian talent" },
  { path: "/partners", h1: "Help turn northern talent into earning talent" },
];

for (const { path, h1 } of PAGES) {
  test(`${path} renders its heading with no dashes in the copy`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(h1);

    // Closed <details> hide text from innerText; open them so the specialisation weeks are checked too.
    await page.locator("details").evaluateAll((els) => els.forEach((el) => ((el as HTMLDetailsElement).open = true)));

    // House style: no em dashes, en dashes or spaced hyphens in anything a visitor reads.
    const copy = await page.locator("body").innerText();
    expect(copy).not.toMatch(/[—–]/);
    expect(copy).not.toContain(" - ");

    // Phone first: nothing pushes the page wider than the viewport.
    const fits = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    expect(fits).toBe(true);
  });
}

test("waitlist validates, saves the sign up, and answers a repeat the same way", async ({ page }, testInfo) => {
  // Unique per run and per project, so parallel phone and desktop runs never collide.
  const email = `wumpini.${testInfo.project.name}.${Date.now()}@example.com`;
  const thanks = "Thanks, you are on the waitlist.";

  try {
    await page.goto("/programme");
    const form = page.locator("#waitlist form");
    await form.getByRole("button", { name: "Join the waitlist" }).click();
    await expect(form.getByText("Tell us your name.")).toBeVisible();
    await expect(form.getByText("Choose your region.")).toBeVisible();

    await form.getByLabel("Your name").fill("Wumpini Alhassan");
    await form.getByLabel("Email").fill(email);
    await form.getByLabel("Region").selectOption("northern");
    await form.getByRole("button", { name: "Join the waitlist" }).click();
    await expect(page.getByRole("status")).toContainText(thanks);

    const rows = await admin<{ name: string; region: string; interest: string }[]>(
      `/rest/v1/waitlist?select=name,region,interest&email=eq.${encodeURIComponent(email)}`,
    );
    expect(rows).toEqual([{ name: "Wumpini Alhassan", region: "northern", interest: "dmp_cohort" }]);

    // The same address again, in different case: same thanks, still one row, nothing revealed.
    await page.goto("/partners");
    const again = page.locator("form").filter({ has: page.getByLabel("Email") });
    await again.getByLabel("Your name").fill("Wumpini Alhassan");
    await again.getByLabel("Email").fill(email.toUpperCase());
    await again.getByLabel("Region").selectOption("northern");
    await again.getByRole("button", { name: "Register interest" }).click();
    await expect(page.getByRole("status")).toContainText(thanks);
    const after = await admin<unknown[]>(`/rest/v1/waitlist?select=id&email=eq.${encodeURIComponent(email)}`);
    expect(after).toHaveLength(1);
  } finally {
    await admin(`/rest/v1/waitlist?email=eq.${encodeURIComponent(email)}`, { method: "DELETE" });
  }
});

test("home links to sign up and every marketing page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Create a free account" })).toHaveAttribute("href", "/signup");
  const nav = page.getByRole("navigation", { name: "Site" });
  for (const name of ["Roadmaps", "Programme", "Experts"]) {
    await expect(nav.getByRole("link", { name })).toBeVisible();
  }
  // About and Partners are about SydCrest itself: the footer carries them.
  const footer = page.getByRole("navigation", { name: "Footer" });
  for (const name of ["About", "Partners", "Find your path", "For business"]) {
    await expect(footer.getByRole("link", { name })).toBeVisible();
  }
});

for (const { path, title } of [
  { path: "/start", title: "Where do I start?" },
  { path: "/privacy", title: "Privacy Policy" },
  { path: "/terms", title: "Terms" },
]) {
  test(`${path} has its own canonical and share card`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(new RegExp(`^${title.replace("?", "\\?")}`));
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${path}$`));
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", new RegExp(`${path}$`));
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", new RegExp(`/og/${path.slice(1)}`));
  });
}

test("the sitemap lists the start quiz", async ({ request }) => {
  const body = await (await request.get("/sitemap.xml")).text();
  expect(body).toMatch(/<loc>[^<]*\/start<\/loc>/);
});

test("sign in and legal pages link to Privacy and Terms", async ({ page }) => {
  for (const path of ["/login", "/privacy"]) {
    await page.goto(path);
    const legal = page.getByRole("navigation", { name: "Legal" });
    await expect(legal.getByRole("link", { name: "Privacy" })).toBeVisible();
    await expect(legal.getByRole("link", { name: "Terms" })).toBeVisible();
  }
});
