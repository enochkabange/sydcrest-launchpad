import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { deleteDmpCohort, seedDmpCohort, type SeededDmpCohort } from "./cohort-seed";
import { createLearner, PASSWORD, type Learner } from "./learners";
import { deleteRoadmap, seedRoadmap, type SeededRoadmap } from "./seed";
import { admin } from "./supabase-admin";

/**
 * Display and accessibility settings (issue #204): choices apply at once,
 * survive a reload (applied before first paint by the inline script), follow
 * a signed in user to a fresh device, and key pages pass axe in both themes.
 */

const KEY = "sydcrest.display";
const html = (page: Page) => page.locator("html");

async function signIn(page: Page, learner: Learner) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

test("theme and text size apply at once and persist after a reload", async ({ page }) => {
  await page.goto("/settings");
  const settings = page.getByTestId("display-settings");
  await expect(html(page)).not.toHaveAttribute("data-theme", /./);

  await settings.getByRole("radio", { name: /^Dark/ }).check();
  await settings.getByRole("radio", { name: /^150%/ }).check();
  await settings.getByRole("checkbox", { name: /Underline links/ }).check();
  await expect(html(page)).toHaveAttribute("data-theme", "dark");
  await expect(html(page)).toHaveAttribute("data-text-size", "150");
  await expect(html(page)).toHaveAttribute("data-underline-links", "on");
  // 150 percent of the 16px default.
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).fontSize)).toBe("24px");

  await page.reload();
  await expect(html(page)).toHaveAttribute("data-theme", "dark");
  await expect(html(page)).toHaveAttribute("data-text-size", "150");
  await expect(settings.getByRole("radio", { name: /^Dark/ })).toBeChecked();
  await expect(settings.getByRole("radio", { name: /^150%/ })).toBeChecked();

  // The page is still dark before any of our JavaScript bundles run: the inline script did it.
  const ctx = await page.context().browser()!.newContext({ javaScriptEnabled: true });
  await ctx.addInitScript(([k]) => localStorage.setItem(k, JSON.stringify({ theme: "dark", textSize: 125 })), [KEY]);
  const fresh = await ctx.newPage();
  await fresh.route(/\/_next\/static\/chunks\/.*\.js$/, (route) => route.abort());
  await fresh.goto("/");
  await expect(html(fresh)).toHaveAttribute("data-theme", "dark");
  await expect(html(fresh)).toHaveAttribute("data-text-size", "125");
  await ctx.close();

  // The quick switch in the site header flips it back, and that persists too.
  await page.goto("/");
  // Wait for hydration: the label names the action once the client knows the theme.
  const quick = page.getByRole("button", { name: "Use light theme" }).first();
  await expect(quick).toBeVisible();
  await quick.click();
  await expect(html(page)).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(html(page)).toHaveAttribute("data-theme", "light");

  // Reset clears every attribute.
  await page.goto("/settings");
  await page.getByRole("button", { name: "Reset to standard settings" }).click();
  await expect(html(page)).not.toHaveAttribute("data-text-size", /./);
  await expect(html(page)).not.toHaveAttribute("data-theme", /./);
});

test("150 percent text never makes a page scroll sideways", async ({ page }) => {
  const learner = await createLearner("Hawa Issahaku");
  try {
    await page.addInitScript(([k]) => localStorage.setItem(k, JSON.stringify({ textSize: 150, spacing: "wide" })), [KEY]);
    const paths = ["/", "/roadmaps", "/programme", "/settings", "/accessibility"];
    const signedIn = ["/dashboard", "/learn", "/profile", "/community"];
    const overflow = async (path: string) => {
      await page.goto(path);
      await page.waitForLoadState("load");
      await expect(html(page)).toHaveAttribute("data-text-size", "150");
      return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    };
    for (const path of paths) expect(await overflow(path), path).toBeLessThanOrEqual(0);
    await signIn(page, learner);
    for (const path of signedIn) expect(await overflow(path), path).toBeLessThanOrEqual(0);
  } finally {
    await admin(`/auth/v1/admin/users/${learner.id}`, { method: "DELETE" });
  }
});

test.describe("signed in", () => {
  let learner: Learner | undefined;
  test.afterEach(async () => {
    if (learner) await admin(`/auth/v1/admin/users/${learner.id}`, { method: "DELETE" });
    learner = undefined;
  });

  test("choices save to the profile and follow the user to a new device", async ({ page, browser }, testInfo) => {
    learner = await createLearner("Mariama Seidu");
    await signIn(page, learner);
    if (testInfo.project.name === "phone") {
      // Phones: Settings is in the You menu in the top bar.
      await page.getByRole("button", { name: /^You:/ }).first().click();
      await page.getByTestId("you-menu").getByRole("link", { name: "Settings" }).click();
    } else {
      // From md the sidebar lists the You group.
      await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Settings" }).click();
    }
    await expect(page).toHaveURL(/\/settings$/);

    const settings = page.getByTestId("display-settings");
    await settings.getByRole("radio", { name: /^Dark/ }).check();
    await settings.getByRole("checkbox", { name: /Higher contrast/ }).check();
    await expect(html(page)).toHaveAttribute("data-contrast", "more");

    const id = learner.id;
    await expect
      .poll(async () => {
        const [row] = await admin<{ display_prefs: { theme?: string; contrast?: string } }[]>(
          `/rest/v1/profiles?id=eq.${id}&select=display_prefs`,
        );
        return `${row.display_prefs.theme}/${row.display_prefs.contrast}`;
      })
      .toBe("dark/more");

    // Another device: empty storage, signs in, gets the account's choices.
    const other = await browser.newContext();
    const page2 = await other.newPage();
    await signIn(page2, learner);
    await expect(html(page2)).toHaveAttribute("data-theme", "dark");
    await expect(html(page2)).toHaveAttribute("data-contrast", "more");
    await page2.reload();
    await expect(html(page2)).toHaveAttribute("data-theme", "dark");
    await other.close();
  });
});

test.describe("axe", () => {
  let roadmap: SeededRoadmap | undefined;
  let cohort: SeededDmpCohort | undefined;
  let learner: Learner | undefined;
  test.afterEach(async () => {
    if (roadmap) await deleteRoadmap(roadmap.id);
    if (cohort) await deleteDmpCohort(cohort);
    if (learner) await admin(`/auth/v1/admin/users/${learner.id}`, { method: "DELETE" });
    roadmap = cohort = learner = undefined;
  });

  test("key pages have no serious or critical violations in light and dark", async ({ page }) => {
    test.setTimeout(180_000);
    roadmap = await seedRoadmap();
    learner = await createLearner("Fuseini Mahama");
    cohort = await seedDmpCohort(learner.id);

    const visitor = ["/", `/roadmaps/${roadmap.slug}`, "/settings", "/accessibility"];
    const signedIn = ["/dashboard", `/learn/${roadmap.slug}/${roadmap.quizNode.slug}`, "/cohort"];

    const failures: string[] = [];
    async function check(path: string, theme: string) {
      await page.goto(path);
      await page.waitForLoadState("load");
      await expect(page.locator("[aria-busy='true'], .animate-skeleton")).toHaveCount(0, { timeout: 15_000 });
      await expect(html(page)).toHaveAttribute("data-theme", theme);
      const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      for (const v of violations.filter((v) => v.impact === "serious" || v.impact === "critical")) {
        failures.push(`${theme} ${path}: ${v.id} (${v.impact}) ${v.nodes.map((n) => n.target.join(" ")).slice(0, 5).join(", ")}`);
      }
    }

    for (const theme of ["light", "dark"]) {
      await page.goto("/");
      await page.evaluate(([k, t]) => localStorage.setItem(k, JSON.stringify({ theme: t })), [KEY, theme]);
      for (const path of visitor) await check(path, theme);
    }
    await signIn(page, learner);
    for (const theme of ["light", "dark"]) {
      await page.evaluate(([k, t]) => localStorage.setItem(k, JSON.stringify({ theme: t, updatedAt: Date.now() })), [KEY, theme]);
      for (const path of signedIn) await check(path, theme);
    }
    expect(failures, failures.join("\n")).toEqual([]);
  });
});
