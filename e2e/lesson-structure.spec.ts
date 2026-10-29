import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { signIn } from "./earn-business";
import { createLearner, type Learner } from "./learners";
import { deleteRatedRoadmap, seedRatedRoadmap, type SeededRatedRoadmap } from "./lesson-structure-seed";
import { admin } from "./supabase-admin";

/**
 * Lesson structure (issue #255): the lesson's header strip, outcomes,
 * optional anatomy and table of contents, and the roadmap's Jobs at each
 * level panel, at both project widths.
 */

let roadmap: SeededRatedRoadmap | undefined;
let learner: Learner | undefined;

test.afterEach(async () => {
  if (roadmap) await deleteRatedRoadmap(roadmap.id);
  if (learner) await admin(`/auth/v1/admin/users/${learner.id}`, { method: "DELETE" }).catch(() => {});
  roadmap = undefined;
  learner = undefined;
});

async function axe(page: import("@playwright/test").Page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  return violations
    .filter((v) => v.impact === "serious" || v.impact === "critical" || v.id === "heading-order" || v.id === "target-size")
    .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")}`);
}

test("a learner sees the lesson's difficulty, outcomes, anatomy and contents, and jumps around with it", async ({ page }, testInfo) => {
  roadmap = await seedRatedRoadmap();
  learner = await createLearner("Mariama Fuseini");
  const phone = testInfo.project.name === "phone";
  await signIn(page, learner);
  await page.goto(`/learn/${roadmap.slug}/${roadmap.lesson.slug}`);
  await expect(page.getByRole("heading", { name: roadmap.lesson.title, level: 1 })).toBeVisible();

  await test.step("the header strip says how hard and how long, in words", async () => {
    const about = page.getByRole("list", { name: "About this lesson" });
    await expect(about.getByTestId("difficulty-badge")).toHaveText("Intermediate");
    await expect(about.getByText("Complexity 3 of 5")).toBeVisible();
    await expect(about.getByText(/about \d+ min$/)).toBeVisible();
  });

  await test.step("outcomes and every anatomy part render in order", async () => {
    const outcomes = page.getByTestId("lesson-outcomes");
    await expect(outcomes.getByRole("heading", { name: "You will be able to" })).toBeVisible();
    await expect(outcomes.getByRole("listitem")).toHaveCount(3);
    const parts = new Set([
      "You will be able to",
      "Explanation",
      "Worked example",
      "Key terms",
      "Common mistakes",
      "Practice task",
      "Check yourself",
      "Checkpoint",
    ]);
    const headings = (await page.locator("article h2").allTextContents()).filter((h) => parts.has(h));
    expect(headings).toEqual([
      "You will be able to",
      "Explanation",
      "Worked example",
      "Key terms",
      "Common mistakes",
      "Practice task",
      "Check yourself",
      "Checkpoint",
    ]);
    await expect(page.locator("dl dt").first()).toHaveText("Stock count");
    await expect(page.locator("dl dd").first()).toHaveText("Counting what is really on the shelf.");
  });

  await test.step("the contents jump to a section and mark where the reader is", async () => {
    let toc;
    if (phone) {
      await expect(page.getByTestId("lesson-toc")).toBeHidden();
      const details = page.getByTestId("lesson-toc-inline");
      await expect(details).not.toHaveAttribute("open");
      await details.locator("summary").click();
      toc = details.getByRole("navigation", { name: "On this page" });
    } else {
      toc = page.getByTestId("lesson-toc");
    }
    await expect(toc.getByRole("link", { name: "Fix the gaps" })).toHaveAttribute("href", "#explanation-fix-the-gaps");
    await toc.getByRole("link", { name: "Key terms" }).click();
    await expect(page).toHaveURL(/#key-terms$/);
    await expect(page.getByRole("heading", { name: "Key terms", level: 2 })).toBeInViewport();
    if (phone) await expect(page.getByTestId("lesson-toc-inline")).not.toHaveAttribute("open");
    else await expect(toc.getByRole("link", { name: "Key terms" })).toHaveAttribute("aria-current", "location");
    // Reading progress moves once the reader is part way down.
    await expect
      .poll(async () => Number(await page.getByTestId("reading-progress").first().getAttribute("data-value")))
      .toBeGreaterThan(0);
  });

  await test.step("tables scroll inside their own box and lists nest and keep numbering (#267)", async () => {
    const region = page.getByRole("region", { name: "Monday count at the shop" });
    await expect(region).toBeVisible();
    await expect(region).toHaveAttribute("tabindex", "0");
    const table = region.getByRole("table", { name: "Monday count at the shop" });
    await expect(table.getByRole("columnheader")).toHaveText(["Item", "On the list", "Counted", "Variance (GHS)", "Fix"]);
    await expect(table.getByRole("row")).toHaveCount(4);
    await expect(table.getByRole("cell", { name: "Record two unrecorded sales" }).locator("strong")).toHaveText("unrecorded sales");
    const widths = await region.evaluate((el) => ({
      region: el.scrollWidth > el.clientWidth,
      page: document.documentElement.scrollWidth <= window.innerWidth,
    }));
    // A phone scrolls the table inside its box; the page itself never scrolls
    // sideways. On desktop whether five columns fit depends on the font, so
    // only the page is checked there.
    expect(widths.page).toBe(true);
    if (phone) expect(widths.region).toBe(true);
    await region.scrollIntoViewIfNeeded();
    await testInfo.attach(`lesson-table-${testInfo.project.name}`, { body: await region.screenshot(), contentType: "image/png" });

    const explanation = page.locator("section#explanation");
    const first = explanation.locator("ol").filter({ hasText: "Count the shelf" }).first();
    await expect(first.locator("> li")).toHaveText([/^Count the shelf/, "Write each number down"]);
    await expect(first.locator("> li").first().locator("ul > li")).toHaveText(["Tins first", "Then bags"]);
    const continued = explanation.locator('ol[start="3"]');
    await expect(continued.locator("> li")).toHaveText(["Mark every gap", "Tell the owner"]);
  });

  await test.step("no serious accessibility problems", async () => {
    await page.evaluate(() => window.scrollTo(0, 0));
    expect(await axe(page)).toEqual([]);
  });
});

test("visitors see jobs at each level on the roadmap and the rating on a topic", async ({ page }) => {
  roadmap = await seedRatedRoadmap();

  await page.goto(`/roadmaps/${roadmap.slug}`);
  const levels = page.getByTestId("career-levels");
  await expect(levels.getByRole("heading", { name: "Jobs at each level" })).toBeVisible();
  const junior = levels.getByRole("listitem").filter({ has: page.getByRole("heading", { name: "Junior" }) });
  await expect(junior.getByText("Store Assistant")).toBeVisible();
  await expect(junior.getByText("Inventory Clerk")).toBeVisible();
  const foundation = levels.getByRole("listitem").filter({ has: page.getByRole("heading", { name: "Foundation" }) });
  await expect(foundation.getByText("This level prepares you for the roles in the next one.")).toBeVisible();
  // The section header carries the level: the map's tree item from md, the journey's header on a phone.
  if (test.info().project.name === "phone") await expect(page.getByText(/Section 2 of \d+ · Junior/)).toBeVisible();
  else await expect(page.getByRole("treeitem", { name: /Section 2 · Junior/ })).toHaveCount(1);
  expect(await axe(page)).toEqual([]);

  await page.goto(`/roadmaps/${roadmap.slug}/${roadmap.lesson.slug}`);
  await expect(page.getByTestId("difficulty-badge")).toHaveText("Intermediate");
  await expect(page.getByText("Complexity 3 of 5")).toBeVisible();
  await expect(page.getByTestId("lesson-outcomes").getByRole("listitem")).toHaveCount(3);
});
