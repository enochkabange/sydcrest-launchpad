import { expect, test, type Page } from "@playwright/test";
import { admin, insert } from "./supabase-admin";

/**
 * Roadmap views (issue #129): the map is the default view, List shows the
 * outline and is remembered on the device, and a topic opened from the
 * roadmap shows in a panel (side panel on desktop, bottom sheet on phone)
 * while the URL is the topic page. Reloading that URL shows the full page.
 *
 * Set ROADMAP_SHOTS to a folder to save screenshots of each state.
 */

let slug = "";
let roadmapId = "";

test.describe.configure({ mode: "serial" });

test.beforeAll(async ({}, testInfo) => {
  const tag = `${testInfo.project.name}-${crypto.randomUUID().slice(0, 6)}`;
  slug = `e2e-market-prices-${tag}`;
  const [roadmap] = await insert("roadmaps", [
    { slug, title: `Market Prices ${tag}`, description: "Track prices at Tamale market in a spreadsheet.", is_published: true },
  ]);
  roadmapId = roadmap.id;
  const [records, sharing] = await insert("roadmap_nodes", [
    { roadmap_id: roadmap.id, slug: "records", title: "Keeping records", position: 0 },
    { roadmap_id: roadmap.id, slug: "sharing", title: "Sharing prices", position: 1 },
  ]);
  const [notebook] = await insert("roadmap_nodes", [
    {
      roadmap_id: roadmap.id,
      parent_id: records.id,
      slug: "notebook",
      title: "From notebook to sheet",
      summary: "Copy a week of prices from Hawa's notebook into a sheet.",
      position: 0,
    },
    { roadmap_id: roadmap.id, parent_id: records.id, slug: "excel", title: "Excel", position: 1, choice_group: "sheet-tool" },
    { roadmap_id: roadmap.id, parent_id: records.id, slug: "sheets", title: "Google Sheets", position: 2, choice_group: "sheet-tool" },
    { roadmap_id: roadmap.id, parent_id: records.id, slug: "records-check", title: "A clean price sheet", position: 3, kind: "checkpoint" },
    { roadmap_id: roadmap.id, parent_id: sharing.id, slug: "whatsapp", title: "Sharing on WhatsApp", position: 0, is_optional: true },
  ]);
  await insert("node_resources", [
    { node_id: notebook.id, label: "Google Sheets training", url: "https://support.google.com/a/users/answer/9282959", kind: "article", position: 0 },
    { node_id: notebook.id, label: "Practise with a price list", url: "https://support.google.com/docs", kind: "practice", position: 1 },
  ]);
});

test.afterAll(async () => {
  if (roadmapId) await admin(`/rest/v1/roadmaps?id=eq.${roadmapId}`, { method: "DELETE" });
});

async function shot(page: Page, name: string, fullPage = false) {
  const dir = process.env.ROADMAP_SHOTS;
  if (dir) await page.screenshot({ path: `${dir}/${name}-${test.info().project.name}.png`, fullPage });
}

async function noSidewaysScroll(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

test("the map is the default view and shows sections, topics, choices and checkpoints", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto(`/roadmaps/${slug}`);
  const map = page.getByRole("list", { name: "Roadmap map" });
  await expect(map).toBeVisible();
  await expect(page.getByRole("button", { name: "Map" })).toHaveAttribute("aria-pressed", "true");
  await expect(map.getByRole("link", { name: /Section 1\s*Keeping records/ })).toHaveAttribute("href", `/roadmaps/${slug}/records`);
  await expect(map.getByRole("link", { name: /From notebook to sheet/ })).toHaveAttribute("href", `/roadmaps/${slug}/notebook`);
  await expect(map.getByRole("link", { name: /Excel\s*Choose one/ })).toBeVisible();
  await expect(map.getByRole("link", { name: /Sharing on WhatsApp\s*Optional/ })).toBeVisible();
  await expect(map.getByRole("link", { name: /Checkpoint · A clean price sheet/ })).toBeVisible();
  await expect(page.getByText("Checkpoint", { exact: true }).first()).toBeVisible();
  await noSidewaysScroll(page);
  await shot(page, "map", true);
  expect(errors).toEqual([]);
});

test("List shows the outline and is remembered on this device", async ({ page }) => {
  await page.goto(`/roadmaps/${slug}`);
  await page.getByRole("button", { name: "List" }).click();
  await expect(page.getByRole("list", { name: "Roadmap outline" })).toBeVisible();
  await expect(page.getByRole("list", { name: "Roadmap map" })).toHaveCount(0);
  await shot(page, "list", true);

  await page.reload();
  await expect(page.getByRole("list", { name: "Roadmap outline" })).toBeVisible();
  await expect(page.getByRole("button", { name: "List" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Map" }).click();
  await expect(page.getByRole("list", { name: "Roadmap map" })).toBeVisible();
});

test("a topic opens in a panel over the roadmap, and Escape closes it and returns focus", async ({ page }) => {
  await page.goto(`/roadmaps/${slug}`);
  const topic = page.getByRole("list", { name: "Roadmap map" }).getByRole("link", { name: /From notebook to sheet/ });
  await topic.click();

  const panel = page.getByRole("dialog", { name: "From notebook to sheet" });
  await expect(panel).toBeVisible();
  await expect(page).toHaveURL(new RegExp(`/roadmaps/${slug}/notebook$`));
  await expect(panel.getByText("Section 1 · Keeping records · Topic 1 of 3")).toBeVisible();
  await expect(panel.getByText("Copy a week of prices from Hawa's notebook into a sheet.")).toBeVisible();
  await expect(panel.getByRole("link", { name: /Open the full lesson/ })).toHaveAttribute("href", `/learn/${slug}/notebook`);
  await expect(panel.getByRole("link", { name: /Practice\s*Practise with a price list/ })).toBeVisible();
  // The roadmap stays underneath, and focus is inside the panel.
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Market Prices");
  expect(await panel.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  await page.waitForTimeout(300);
  await shot(page, "panel");

  await page.keyboard.press("Escape");
  await expect(panel).toHaveCount(0);
  await expect(page).toHaveURL(new RegExp(`/roadmaps/${slug}$`));
  await expect(topic).toBeFocused();
});

test("stepping through topics in the panel, then closing, returns to the roadmap", async ({ page }) => {
  await page.goto(`/roadmaps/${slug}`);
  await page.getByRole("list", { name: "Roadmap map" }).getByRole("link", { name: /From notebook to sheet/ }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("link", { name: /Next\s*Excel/ }).click();
  await expect(page.getByRole("dialog", { name: "Excel" })).toBeVisible();
  await expect(page).toHaveURL(new RegExp(`/roadmaps/${slug}/excel$`));

  await page.getByRole("button", { name: "Close topic" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page).toHaveURL(new RegExp(`/roadmaps/${slug}$`));
});

test("browser back closes the panel", async ({ page }) => {
  await page.goto(`/roadmaps/${slug}`);
  await page.getByRole("list", { name: "Roadmap map" }).getByRole("link", { name: /Sharing on WhatsApp/ }).click();
  await expect(page.getByRole("dialog", { name: "Sharing on WhatsApp" })).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page).toHaveURL(new RegExp(`/roadmaps/${slug}$`));
});

test("reloading a topic URL shows the full topic page, whose links stay full pages", async ({ page }) => {
  await page.goto(`/roadmaps/${slug}`);
  await page.getByRole("list", { name: "Roadmap map" }).getByRole("link", { name: /From notebook to sheet/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();

  await page.reload();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("From notebook to sheet");
  await expect(page.getByText("Section 1 · Keeping records · Topic 1 of 3")).toBeVisible();
  await noSidewaysScroll(page);

  await page.getByRole("navigation", { name: "Roadmap" }).getByRole("link", { name: /Next\s*Excel/ }).click();
  await expect(page).toHaveURL(new RegExp(`/roadmaps/${slug}/excel$`));
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Excel");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
