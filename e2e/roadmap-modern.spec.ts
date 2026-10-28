import { expect, test, type Page } from "@playwright/test";
import { signIn } from "./earn-business";
import { createLearner, promoteToAdmin, type Learner } from "./learners";
import { deleteModernRoadmap, seedModernRoadmap, type ModernRoadmap } from "./roadmap-modern-seed";
import { admin, insert } from "./supabase-admin";

/**
 * The modern roadmap experience (issue #244): map controls, the journey on a
 * phone, the continue bar, search, keyboard tree navigation, hide optional
 * topics, and the roadmap index filters.
 */

const DATA_ANSWERS = { v: 1, interests: ["data"], confidence: "some", experience: "tried", goal: "first-job", hours: "3-6", device: "own-computer", data: "okay" };

let seed: ModernRoadmap;
const users: Learner[] = [];

test.describe.configure({ mode: "serial" });

test.beforeAll(async () => {
  seed = await seedModernRoadmap();
});

test.afterAll(async () => {
  if (seed) await deleteModernRoadmap(seed.id);
  for (const u of users) await admin(`/auth/v1/admin/users/${u.id}`, { method: "DELETE" }).catch(() => {});
});

const isPhone = () => test.info().project.name === "phone";

async function noSidewaysScroll(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

test("the map pans and zooms with buttons, keys and a drag, with a minimap", async ({ page }) => {
  test.skip(isPhone(), "Pan and zoom is for wide screens; phones get the transit line.");
  await page.goto(`/roadmaps/${seed.slug}`);
  const canvas = page.getByRole("region", { name: "Roadmap map, pan and zoom" });
  await expect(canvas).toBeVisible();
  await expect(page.getByTestId("roadmap-minimap")).toBeVisible();
  const zoom = page.getByRole("group", { name: "Map controls" }).getByText(/\d+%/);
  await expect(zoom).toHaveText(/100%/);

  await page.getByRole("button", { name: "Zoom in" }).click();
  await expect(zoom).toHaveText(/120%/);
  await page.getByRole("button", { name: "Zoom out" }).click();
  await page.getByRole("button", { name: "Zoom out" }).click();
  await expect(zoom).toHaveText(/83%/);

  // Keys work while focus is anywhere in the map.
  await page.getByRole("tree", { name: "Roadmap map" }).getByRole("treeitem").first().focus();
  await page.keyboard.press("0");
  await expect(zoom).toHaveText(/100%/);
  await page.keyboard.press("+");
  await expect(zoom).toHaveText(/120%/);
  await page.keyboard.press("-");
  await expect(zoom).toHaveText(/100%/);

  await page.getByRole("button", { name: "Fit to screen" }).click();
  await expect(zoom).not.toHaveText("");
  await page.getByRole("button", { name: "Reset zoom" }).click();
  await expect(zoom).toHaveText(/100%/);

  // A drag pans the map and never opens the topic under the pointer.
  const surface = page.locator('[data-map-canvas="on"] [style*="translate"]');
  const before = await surface.getAttribute("style");
  const box = (await canvas.boundingBox())!;
  await page.mouse.move(box.x + 40, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + 140, box.y + box.height / 2 - 120, { steps: 6 });
  await page.mouse.up();
  await expect(surface).not.toHaveAttribute("style", before ?? "");
  await expect(page).toHaveURL(new RegExp(`/roadmaps/${seed.slug}$`));
  await noSidewaysScroll(page);
});

test("a phone gets the journey by default, with sticky section headers and time estimates", async ({ page }) => {
  test.skip(!isPhone(), "The journey is the phone default.");
  await page.goto(`/roadmaps/${seed.slug}`);
  await expect(page.getByRole("button", { name: "Journey" })).toHaveAttribute("aria-pressed", "true");
  const journey = page.getByRole("list", { name: "Roadmap journey" });
  await expect(journey).toBeVisible();
  await expect(page.getByRole("tree", { name: "Roadmap map" })).toBeHidden();

  const header = journey.getByRole("heading", { name: "Market records" }).locator("xpath=ancestor::header");
  expect(await header.evaluate((el) => getComputedStyle(el).position)).toBe("sticky");
  await expect(journey.getByRole("link", { name: /Counting stock/ })).toContainText("about 25 min");
  await expect(journey.getByText("Pick one")).toBeVisible();
  await noSidewaysScroll(page);

  await journey.getByRole("link", { name: /WhatsApp catalogue/ }).click();
  await expect(page.getByRole("dialog", { name: "WhatsApp catalogue" })).toBeVisible();
});

test("the continue bar starts visitors at step one and brings learners back to their next step", async ({ page }) => {
  await page.goto(`/roadmaps/${seed.slug}`);
  const start = page.getByRole("region", { name: "Start here" });
  await expect(start).toContainText("Start here");
  await expect(start).toContainText("Market records");
  await expect(start).toContainText("for the whole roadmap");

  const learner = await createLearner("Abdul-Rahman Iddrisu");
  users.push(learner);
  await insert("roadmap_progress", [
    { profile_id: learner.id, node_id: seed.nodes.records, status: "done", completed_at: new Date().toISOString() },
    { profile_id: learner.id, node_id: seed.nodes.counting, status: "in_progress" },
  ]);
  await insert("personalized_paths", [
    {
      profile_id: learner.id,
      quiz_answers: DATA_ANSWERS,
    },
  ]);
  await signIn(page, learner);

  // No layout shift while the learner's islands arrive.
  await page.addInitScript(() => {
    (window as unknown as { __cls: number }).__cls = 0;
    new PerformanceObserver((list) => {
      for (const e of list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
        if (!e.hadRecentInput) (window as unknown as { __cls: number }).__cls += e.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto(`/roadmaps/${seed.slug}`);
  const bar = page.getByRole("region", { name: "Continue where you left off" });
  await expect(bar).toBeVisible();
  await expect(bar).toContainText("Counting stock");
  await expect(bar).toContainText(/left, roughly 1 week at about 5 hours a week\./);
  await expect(page.locator("[data-up-next]").first()).toBeAttached();
  await page.waitForTimeout(500);
  const cls = await page.evaluate(() => (window as unknown as { __cls: number }).__cls);
  expect(cls).toBeLessThan(0.1);

  await bar.getByRole("link", { name: /Continue/ }).click();
  await expect(page.getByRole("dialog", { name: "Counting stock" })).toBeVisible();
  await expect(page.getByRole("dialog").getByText("A table of ten items with their counts.")).toBeVisible();
});

test("search finds a topic and opens it with the keyboard", async ({ page }) => {
  await page.goto(`/roadmaps/${seed.slug}`);
  const search = page.getByRole("combobox", { name: "Search this roadmap" });
  await search.fill("whats");
  const results = page.getByRole("listbox", { name: "Matching topics" });
  // The title match first, then the section whose summary mentions it.
  await expect(results.getByRole("option")).toHaveCount(2);
  await expect(results.getByRole("option").first()).toContainText("WhatsApp catalogue");
  await expect(results.getByRole("option").first()).toHaveAttribute("aria-selected", "true");
  await search.fill("zzz");
  await expect(page.getByText("No topics match. Try another word.")).toBeVisible();
  await search.fill("sheet");
  await search.press("ArrowDown");
  await expect(results.getByRole("option", { name: /Google Sheets/ })).toHaveAttribute("aria-selected", "true");
  await search.press("Enter");
  await expect(page.getByRole("dialog", { name: "Google Sheets" })).toBeVisible();
  await expect(page).toHaveURL(new RegExp(`/roadmaps/${seed.slug}/sheets$`));
});

test("the outline is a keyboard tree: arrows move, Left and Right close and open, and it is remembered", async ({ page }) => {
  await page.goto(`/roadmaps/${seed.slug}`);
  await page.getByRole("button", { name: "List" }).click();
  const tree = page.getByRole("tree", { name: "Roadmap outline" });
  const section = tree.getByRole("treeitem", { name: /Market records/ });
  await expect(tree.locator('[role="treeitem"][tabindex="0"]')).toHaveCount(1);

  await section.focus();
  await page.keyboard.press("ArrowDown");
  await expect(tree.getByRole("treeitem", { name: /Counting stock/ })).toBeFocused();
  await expect(tree.locator('[role="treeitem"][tabindex="0"]')).toHaveCount(1);
  await page.keyboard.press("ArrowLeft");
  await expect(section).toBeFocused();
  await page.keyboard.press("ArrowLeft");
  await expect(section).toHaveAttribute("aria-expanded", "false");
  await expect(tree.getByRole("treeitem", { name: /Counting stock/ })).toBeHidden();
  await page.keyboard.press("ArrowDown");
  await expect(tree.getByRole("treeitem", { name: /Selling online/ })).toBeFocused();
  await page.keyboard.press("Home");
  await expect(section).toBeFocused();

  await page.reload();
  await expect(tree.getByRole("treeitem", { name: /Market records/ })).toHaveAttribute("aria-expanded", "false");
  await tree.getByRole("treeitem", { name: /Market records/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(section).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("End");
  await expect(tree.getByRole("treeitem", { name: /WhatsApp catalogue/ })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "WhatsApp catalogue" })).toBeVisible();
});

test("optional topics can be hidden, and choices are labelled", async ({ page }) => {
  await page.goto(`/roadmaps/${seed.slug}`);
  await page.getByRole("button", { name: "List" }).click();
  const tree = page.getByRole("tree", { name: "Roadmap outline" });
  await expect(tree.getByRole("treeitem", { name: /Excel\s*Choose 1 of 2/ })).toBeVisible();
  await expect(tree.getByRole("treeitem", { name: /Price photos/ })).toBeVisible();
  const toggle = page.getByRole("switch", { name: "Hide optional topics" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-checked", "true");
  await expect(tree.getByRole("treeitem", { name: /Price photos/ })).toBeHidden();
  await page.getByRole("button", { name: "Close all sections" }).click();
  await expect(tree.getByRole("treeitem", { name: /Counting stock/ })).toBeHidden();
  await page.getByRole("button", { name: "Open all sections" }).click();
  await expect(tree.getByRole("treeitem", { name: /Counting stock/ })).toBeVisible();
});

test("the roadmap index filters by field, time, level and phone, and recommends from the path quiz", async ({ page }) => {
  // The index is cached: publishing through the admin refreshes it, as in production.
  const draft = await seedModernRoadmap({ published: false, track: "data" });
  const phoneTrack = await seedModernRoadmap({ published: false, track: "digital-marketing", field: "marketing" });
  const editor = await createLearner("Fuseini Mahama");
  users.push(editor);
  await promoteToAdmin(editor.id);
  try {
    await page.goto("/roadmaps");
    await expect(page.getByRole("heading", { name: "Not sure where to start?" })).toBeVisible();

    await signIn(page, editor);
    for (const r of [draft, phoneTrack]) {
      await page.goto(`/admin/roadmaps/${r.id}`);
      await page.getByRole("button", { name: "Publish" }).click();
      await expect(page.getByText("Published", { exact: true })).toBeVisible();
    }

    await insert("personalized_paths", [{ profile_id: editor.id, quiz_answers: DATA_ANSWERS }]);
    await page.goto("/roadmaps");
    await expect(page.getByTestId("recommended")).toContainText("Recommended for you");
    const card = page.getByRole("link", { name: new RegExp(draft.title) });
    const phoneCard = page.getByRole("link", { name: new RegExp(phoneTrack.title) });
    await expect(card).toBeVisible();
    await expect(card).toContainText("Best after another track");
    await expect(card).toContainText("about 1 hour");
    await expect(phoneCard).toContainText("Works on a phone");

    const filters = page.getByRole("search", { name: "Filter roadmaps" });
    await filters.getByLabel("Field").selectOption("data");
    await filters.getByLabel("Level").selectOption("next-step");
    await expect(page.getByTestId("roadmap-count")).toContainText("roadmaps match.");
    await expect(card).toBeVisible();
    await expect(phoneCard).toBeHidden();
    await filters.getByLabel("Works on a phone").check();
    await expect(card).toBeHidden();
    await expect(page.getByText("No roadmap matches every filter.")).toBeVisible();
    await filters.getByRole("button", { name: "Clear filters" }).click();
    await filters.getByLabel("Works on a phone").check();
    await expect(phoneCard).toBeVisible();
    await expect(card).toBeHidden();
    await filters.getByRole("button", { name: "Clear filters" }).click();
    await expect(card).toBeVisible();
    await noSidewaysScroll(page);
  } finally {
    await deleteModernRoadmap(draft.id);
    await deleteModernRoadmap(phoneTrack.id);
  }
});
