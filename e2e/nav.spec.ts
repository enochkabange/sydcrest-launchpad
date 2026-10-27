import { expect, test, type Page } from "@playwright/test";
import { NAV_GROUPS, PHONE_TABS, PUBLIC_NAV, groupById } from "../src/lib/nav/config";
import { deleteNavPeople, seedNavPeople, signInAs, type NavPeople } from "./nav-seed";

/**
 * Navigation and information architecture (issue #190): every destination is
 * at most two taps away on a phone, role items show only for that role,
 * signed in users keep the app navigation on public pages, and nothing
 * scrolls sideways at 360, 390, 768, 1024 or 1440.
 */
test.describe.configure({ mode: "serial", timeout: 180_000 });

let people: NavPeople | undefined;
test.beforeAll(async () => {
  people = await seedNavPeople();
});
test.afterAll(async () => {
  await deleteNavPeople(people);
});

const ROLE_ITEMS = ["Mentor console", "Expert dashboard", "Become an expert", "Organisation", "Admin"];
const SEES: Record<keyof Omit<NavPeople, "cohortId" | "orgSlug">, string[]> = {
  learner: ["Become an expert"],
  mentor: ["Mentor console", "Become an expert"],
  expert: ["Expert dashboard"],
  business: ["Become an expert", "Organisation"],
  admin: ["Mentor console", "Become an expert", "Admin"],
};

async function noSidewaysScroll(page: Page, label: string) {
  const sizes = await page.evaluate(() => ({
    scroll: document.scrollingElement!.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(sizes.scroll, label).toBeLessThanOrEqual(sizes.viewport);
}

test("phone: every destination is two taps from Home", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "phone", "The tab bar is the phone layout.");
  // An admin who mentors, is an expert and runs an organisation would see every item; the
  // admin persona covers Admin and Mentor console, and the role test below covers the rest.
  await signInAs(page, people!.admin);
  const tabs = page.getByRole("navigation", { name: "Primary" });
  await expect(tabs.getByRole("link")).toHaveText(PHONE_TABS.map((t) => t.label));

  for (const group of NAV_GROUPS.filter((g) => g.hub)) {
    await page.goto("/dashboard");
    // Tap one: the tab.
    await tabs.getByRole("link", { name: group.label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${group.hub}$`));
    await expect(tabs.getByRole("link", { name: group.label, exact: true })).toHaveAttribute("aria-current", "page");
    if (group.id === "community") {
      // The feed is the Community hub: its row of destinations sits above it (only once #182 adds the feed page).
      const strip = page.getByRole("navigation", { name: "Community" });
      if (await strip.count()) {
        for (const item of group.items) await expect(strip.getByRole("link", { name: item.label })).toHaveAttribute("href", item.href);
      }
      continue;
    }
    // Tap two: any destination in the hub.
    const main = page.locator("main");
    for (const item of group.items.filter((i) => !i.audience || i.audience === "staff" || i.audience === "notExpert")) {
      await expect(main.getByRole("link", { name: item.label, exact: true })).toHaveAttribute("href", item.href);
    }
    const first = group.items[0];
    await main.getByRole("link", { name: first.label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${first.href}(\\?|$)`));
  }

  // You: the avatar, then Profile, Notifications, Settings, Admin or Sign out.
  await page.goto("/dashboard");
  await page.getByRole("button", { name: /^You/ }).click();
  const menu = page.getByTestId("you-menu");
  for (const item of groupById("you").items) {
    await expect(menu.getByRole("link", { name: item.label })).toHaveAttribute("href", item.href);
  }
  await expect(menu.getByRole("button", { name: "Sign out" })).toBeVisible();
  await menu.getByRole("link", { name: "Profile" }).click();
  await expect(page).toHaveURL(/\/profile$/);
  await expect(menu).toBeHidden();
  await expect(page.getByTestId("notification-bell").filter({ visible: true })).toHaveAttribute("href", "/notifications");
});

test("role items show only for that role", async ({ page }, testInfo) => {
  for (const [role, sees] of Object.entries(SEES) as [keyof typeof SEES, string[]][]) {
    await signInAs(page, people![role]);
    if (testInfo.project.name === "desktop") {
      const sidebar = page.getByRole("navigation", { name: "Primary" });
      await expect(page.locator("nav[data-ready]")).toBeVisible();
      for (const item of ROLE_ITEMS) {
        await expect(sidebar.getByRole("link", { name: item, exact: true }), `${role}: ${item}`).toHaveCount(sees.includes(item) ? 1 : 0);
      }
    } else {
      // Phones: role items live on the hubs and in the You menu.
      const found: string[] = [];
      for (const hub of ["/mentors", "/earn"]) {
        await page.goto(hub);
        // Role cards stream in after the static ones (inside the list: React parks streamed HTML
        // in a hidden template elsewhere before swapping it in).
        await expect(page.locator("main ul").getByTestId("hub-roles-ready")).toBeAttached();
        for (const item of ROLE_ITEMS) if (await page.locator("main").getByRole("link", { name: item, exact: true }).count()) found.push(item);
      }
      await page.getByRole("button", { name: /^You/ }).click();
      if (await page.getByTestId("you-menu").getByRole("link", { name: "Admin" }).count()) found.push("Admin");
      expect(found.sort(), role).toEqual([...sees].sort());
    }
  }
});

test("signed in users keep the app navigation on public pages", async ({ page }, testInfo) => {
  const phone = testInfo.project.name === "phone";
  for (const path of ["/experts", "/opportunities", "/roadmaps", "/impact"]) {
    await page.context().clearCookies();
    await page.goto(path);
    await expect(page.getByRole("navigation", { name: "Site" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();
    await expect(page.getByTestId("notification-bell")).toHaveCount(0);
  }
  await signInAs(page, people!.learner);
  for (const path of ["/experts", "/opportunities", "/roadmaps", "/impact"]) {
    await page.goto(path);
    await expect(page.getByRole("navigation", { name: phone ? "Primary" : "App" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Site" })).toHaveCount(0);
    await expect(page.getByTestId("notification-bell").filter({ visible: true })).toHaveCount(1);
  }
  // The Mentors destination is current on the expert directory.
  await page.goto("/experts");
  const nav = page.getByRole("navigation", { name: phone ? "Primary" : "App" });
  await expect(nav.getByRole("link", { name: "Mentors", exact: true })).toHaveAttribute("aria-current", "page");
});

test("the visitor header lists every public area", async ({ page }) => {
  await page.goto("/");
  const site = page.getByRole("navigation", { name: "Site" });
  const footer = page.getByRole("navigation", { name: "Footer" });
  for (const { href, label } of PUBLIC_NAV) {
    await expect(site.getByRole("link", { name: label })).toHaveAttribute("href", href);
    await expect(footer.getByRole("link", { name: label })).toHaveAttribute("href", href);
  }
});

const WIDTHS = { phone: [360, 390, 768], desktop: [1024, 1440] } as Record<string, number[]>;

test("nothing scrolls sideways, signed out or in", async ({ page }, testInfo) => {
  const visitor = ["/", "/roadmaps", "/experts", "/opportunities", "/impact"];
  const member = ["/dashboard", "/learn", "/mentors", "/earn", "/experts", "/roadmaps"];
  for (const width of WIDTHS[testInfo.project.name] ?? []) {
    await page.setViewportSize({ width, height: 900 });
    await page.context().clearCookies();
    for (const path of visitor) {
      await page.goto(path);
      await noSidewaysScroll(page, `visitor ${path} at ${width}px`);
    }
  }
  await signInAs(page, people!.admin);
  for (const width of WIDTHS[testInfo.project.name] ?? []) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of member) {
      await page.goto(path);
      await expect(page.getByTestId("notification-bell").first()).toBeAttached();
      await noSidewaysScroll(page, `signed in ${path} at ${width}px`);
    }
  }
});

test("signed out visitors are sent to sign in from every signed in area", async ({ page }) => {
  for (const path of ["/learn", "/mentors", "/earn", "/community", "/mentor", "/expert", "/certificates", "/outcomes", "/org", "/talent/me"]) {
    await page.goto(path);
    await expect(page, path).toHaveURL(/\/login$/);
  }
});
