import { expect, test } from "@playwright/test";

/**
 * The public site. Static pages, no Supabase needed. Runs under both the
 * phone (390px) and desktop projects, so the overflow check is the 390px check.
 */
const PAGES = [
  { path: "/", h1: "Find your path into tech." },
  { path: "/about", h1: "Why SydCrest exists" },
  { path: "/programme", h1: "The Delta Mentoring Program" },
  { path: "/business", h1: "Hire vetted, verified Ghanaian talent" },
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

test("waitlist validates, then says honestly that it opens soon", async ({ page }) => {
  await page.goto("/programme");
  const form = page.locator("#waitlist form");
  await form.getByRole("button", { name: "Join the waitlist" }).click();
  await expect(form.getByText("Tell us your name.")).toBeVisible();
  await expect(form.getByText("Choose your region.")).toBeVisible();

  await form.getByLabel("Your name").fill("Wumpini Alhassan");
  await form.getByLabel("Email").fill("wumpini@example.com");
  await form.getByLabel("Region").selectOption("northern");
  await form.getByRole("button", { name: "Join the waitlist" }).click();
  await expect(page.getByRole("status")).toContainText("Thanks, the waitlist opens soon.");
});

test("home links to sign up and every marketing page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Create a free account" })).toHaveAttribute("href", "/signup");
  const nav = page.getByRole("navigation", { name: "Site" });
  for (const name of ["About", "Programme", "Partners", "For business"]) {
    await expect(nav.getByRole("link", { name })).toBeVisible();
  }
});
