import { expect, test, type Page } from "@playwright/test";
import { admin, insert } from "./supabase-admin";

/**
 * Public roadmap pages against a roadmap seeded through the local service
 * role (each project seeds its own, so phone and desktop run in parallel).
 * The build ran before seeding, so these pages exercise the on demand path:
 * App Shell first, then the cached render.
 */

const PASSWORD = "Tamale-2027-pilot";

type Seed = {
  slug: string;
  title: string;
  roadmapIds: string[];
  nodes: Record<"foundations" | "spreadsheets" | "counting" | "sharing", string>;
};

let seed: Seed;

test.describe.configure({ mode: "serial" });

test.beforeAll(async ({}, testInfo) => {
  const tag = `${testInfo.project.name}-${crypto.randomUUID().slice(0, 6)}`;
  const slug = `e2e-shop-records-${tag}`;
  const title = `Shop Records ${tag}`;

  const [roadmap, draft] = await insert("roadmaps", [
    { slug, title, description: "Keep clear records for a small shop, from a notebook to a spreadsheet.", is_published: true },
    { slug: `${slug}-draft`, title: `Draft ${tag}`, is_published: false },
  ]);

  const [foundations, sharing] = await insert("roadmap_nodes", [
    { roadmap_id: roadmap.id, slug: "foundations", title: "Foundations", summary: "Start with the records a shop already keeps.", position: 0 },
    { roadmap_id: roadmap.id, slug: "sharing", title: "Sharing your records", position: 1, is_optional: true },
  ]);
  const [spreadsheets, counting] = await insert("roadmap_nodes", [
    {
      roadmap_id: roadmap.id,
      parent_id: foundations.id,
      slug: "spreadsheets",
      title: "Spreadsheets first",
      summary: "Move daily sales from a notebook into Google Sheets.",
      position: 0,
    },
    { roadmap_id: roadmap.id, parent_id: foundations.id, slug: "counting", title: "Counting stock", position: 1 },
  ]);
  await insert("roadmap_nodes", [
    { roadmap_id: draft.id, slug: "hidden", title: "Hidden topic", position: 0 },
  ]);

  await insert("node_content", [
    {
      node_id: spreadsheets.id,
      explanation_md: [
        "# Why records matter",
        "",
        "Mariama sells provisions in Tamale market. **Good records** show her which goods sell fastest.",
        "",
        "- Write each sale on one row",
        "- Total the day with a formula",
        "",
        'Raw markup stays text: <img src="x" onerror="alert(1)">',
        "",
        "Read the [Sheets help centre](https://support.google.com/docs) when you get stuck.",
      ].join("\n"),
      practice_task_md: "Ask Fuseini for one week of his sales and put them in a sheet with a total for each day.",
    },
  ]);
  await insert("node_resources", [
    { node_id: spreadsheets.id, label: "Google Sheets training", url: "https://support.google.com/a/users/answer/9282959", kind: "article", source: "Google", position: 0 },
    { node_id: spreadsheets.id, label: "Broken old link", url: "https://example.org/gone", kind: "video", is_active: false, position: 1 },
  ]);

  seed = {
    slug,
    title,
    roadmapIds: [roadmap.id, draft.id],
    nodes: { foundations: foundations.id, spreadsheets: spreadsheets.id, counting: counting.id, sharing: sharing.id },
  };
});

test.afterAll(async () => {
  if (seed) await admin(`/rest/v1/roadmaps?id=in.(${seed.roadmapIds.join(",")})`, { method: "DELETE" });
});

async function expectHouseStyle(page: Page) {
  const copy = await page.locator("body").innerText();
  expect(copy).not.toMatch(/[—–]/);
  expect(copy).not.toContain(" - ");
  const fits = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
  expect(fits).toBe(true);
}

const meta = (page: Page, property: string) => page.locator(`meta[property="${property}"]`).first();

test("the roadmaps list renders with its own title and share card", async ({ page }) => {
  await page.goto("/roadmaps");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Learning roadmaps");
  await expect(page).toHaveTitle("Learning roadmaps · SydCrest Launchpad");
  await expect(meta(page, "og:image")).toHaveAttribute("content", /\/og\/roadmaps$/);
  await expectHouseStyle(page);
});

test("a published roadmap shows its outline, metadata and share card", async ({ page, request }) => {
  const path = `/roadmaps/${seed.slug}`;
  await page.goto(path);

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(seed.title);
  await expect(page).toHaveTitle(`${seed.title} roadmap · SydCrest Launchpad`);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${path}$`));
  await expect(meta(page, "og:title")).toHaveAttribute("content", `${seed.title} roadmap · SydCrest Launchpad`);
  await expect(meta(page, "og:image")).toHaveAttribute("content", new RegExp(`/og/roadmaps/${seed.slug}$`));

  // The map is the default view; List shows the outline.
  await expect(page.getByRole("list", { name: "Roadmap map" })).toBeVisible();
  await page.getByRole("button", { name: "List" }).click();
  const outline = page.getByRole("list", { name: "Roadmap outline" });
  await expect(outline.getByRole("link", { name: /Foundations/ })).toHaveAttribute("href", `${path}/foundations`);
  await expect(outline.getByRole("link", { name: /1\.1\s*Spreadsheets first/ })).toBeVisible();
  await expect(outline.getByRole("link", { name: /Sharing your records\s*Optional/ })).toBeVisible();

  // Visitors get a sign in prompt and no progress marks.
  await expect(page.getByText("to save your progress as you learn.")).toBeVisible();
  await expect(page.locator("[data-progress]")).toHaveCount(0);
  await expectHouseStyle(page);

  const card = await request.get(`/og/roadmaps/${seed.slug}`);
  expect(card.status()).toBe(200);
  expect(card.headers()["content-type"]).toBe("image/png");
});

test("a node page renders reviewed content safely with its resources", async ({ page, request }) => {
  const path = `/roadmaps/${seed.slug}/spreadsheets`;
  await page.goto(path);

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Spreadsheets first");
  await expect(page).toHaveTitle(`Spreadsheets first · ${seed.title} · SydCrest Launchpad`);
  await expect(meta(page, "og:type")).toHaveAttribute("content", "article");
  await expect(meta(page, "og:image")).toHaveAttribute("content", new RegExp(`/og/roadmaps/${seed.slug}/spreadsheets$`));
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", "Move daily sales from a notebook into Google Sheets.");

  await expect(page.getByRole("link", { name: "Start learning" })).toHaveAttribute("href", `/learn/${seed.slug}/spreadsheets`);
  const nav = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(nav.getByRole("link", { name: seed.title })).toHaveAttribute("href", `/roadmaps/${seed.slug}`);
  await expect(nav.getByRole("link", { name: "Foundations" })).toBeVisible();

  // Markdown: a heading, bold text, a list and a safe link; raw HTML shows as text.
  const article = page.locator("article");
  await expect(article.getByRole("heading", { level: 2, name: "Why records matter" })).toBeVisible();
  await expect(article.locator("strong", { hasText: "Good records" })).toBeVisible();
  await expect(article.getByRole("listitem").filter({ hasText: "Write each sale on one row" })).toBeVisible();
  await expect(article.getByRole("link", { name: "Sheets help centre" })).toHaveAttribute("href", "https://support.google.com/docs");
  await expect(article.getByText('<img src="x" onerror="alert(1)">', { exact: false })).toBeVisible();
  await expect(article.locator("img")).toHaveCount(0);

  await expect(page.getByText("Ask Fuseini for one week of his sales")).toBeVisible();
  await expect(page.getByRole("link", { name: /Google Sheets training/ })).toHaveAttribute(
    "href",
    "https://support.google.com/a/users/answer/9282959",
  );
  await expect(page.getByText("Broken old link")).toHaveCount(0);

  await expect(page.getByRole("navigation", { name: "Roadmap" }).getByRole("link", { name: /Next\s*Counting stock/ })).toBeVisible();
  await expectHouseStyle(page);

  const card = await request.get(`/og/roadmaps/${seed.slug}/spreadsheets`);
  expect(card.status()).toBe(200);
  expect(card.headers()["content-type"]).toBe("image/png");
});

test("a node without content says honestly that it is coming soon", async ({ page }) => {
  await page.goto(`/roadmaps/${seed.slug}/counting`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Counting stock");
  await expect(page.getByText("The written explanation for this topic is being prepared and reviewed. It is coming soon.")).toBeVisible();
  await expect(page.getByText("A practice task for this topic is coming soon.")).toBeVisible();
  await expect(page.getByText("Resources for this topic are coming soon.")).toBeVisible();
  await expectHouseStyle(page);
});

test("share copies the link when the native share sheet is not available", async ({ page, context, baseURL }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: baseURL });
  await page.addInitScript(() => Object.defineProperty(navigator, "share", { value: undefined, configurable: true }));
  const path = `/roadmaps/${seed.slug}`;
  await page.goto(path);
  await page.getByRole("button", { name: "Share" }).click();
  await expect(page.getByText("Link copied.")).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(new URL(path, baseURL).toString());
});

// Issue #136: the marketing header pushed the page sideways at 768. Phone
// covers the narrow widths, desktop the wide ones.
const WIDTHS = { phone: [360, 390, 768], desktop: [1024, 1440] } as Record<string, number[]>;

test("the page never scrolls sideways, header included", async ({ page }, testInfo) => {
  for (const width of WIDTHS[testInfo.project.name] ?? []) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", `/roadmaps/${seed.slug}`]) {
      await page.goto(path);
      const nav = page.getByRole("navigation", { name: "Site" });
      await expect(nav.getByRole("link", { name: "Roadmaps" })).toBeVisible();
      const sizes = await page.evaluate(() => ({
        scroll: document.scrollingElement!.scrollWidth,
        viewport: window.innerWidth,
      }));
      expect(sizes.scroll, `${path} at ${width}px`).toBeLessThanOrEqual(sizes.viewport);
      // Links that do not fit scroll inside the nav row and stay reachable.
      // Retried because the header re-renders once after hydration.
      const last = nav.getByRole("link", { name: "For business" });
      await expect(async () => {
        await last.scrollIntoViewIfNeeded();
        await expect(last).toBeInViewport();
      }).toPass();
    }
  }
});

test("drafts and unknown slugs are not found", async ({ page }) => {
  for (const path of [`/roadmaps/${seed.slug}-draft`, `/roadmaps/${seed.slug}-draft/hidden`, `/roadmaps/${seed.slug}/nope`]) {
    await page.goto(path);
    await expect(page.getByText("This page could not be found.")).toBeVisible();
    await expect(page.locator("h1", { hasText: "Hidden topic" })).toHaveCount(0);
  }
  const card = await page.request.get(`/og/roadmaps/${seed.slug}-draft`);
  expect(card.status()).toBe(404);
});

test("a signed in learner sees their progress marks", async ({ page }, testInfo) => {
  const email = `mariama.${testInfo.project.name}.${crypto.randomUUID().slice(0, 8)}@example.test`;
  const user = await admin<{ id: string }>("/auth/v1/admin/users", {
    method: "POST",
    body: {
      email,
      password: PASSWORD,
      email_confirm: true,
      user_metadata: { display_name: "Mariama Seidu", date_of_birth: "2000-03-14", terms_version: "e2e" },
    },
  });

  try {
    await insert("roadmap_progress", [
      { profile_id: user.id, node_id: seed.nodes.spreadsheets, status: "done", completed_at: new Date().toISOString() },
      { profile_id: user.id, node_id: seed.nodes.counting, status: "in_progress" },
    ]);

    await page.goto("/login");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/dashboard$/);

    await page.goto(`/roadmaps/${seed.slug}`);
    await expect(page.getByTestId("roadmap-progress")).toHaveText("1 of 3 required topics done.");
    await expect(page.getByRole("progressbar", { name: "Roadmap progress" })).toHaveAttribute("aria-valuenow", "33");
    // The map colours topics by status: one done, one in progress, and its section count.
    const map = page.getByRole("list", { name: "Roadmap map" });
    await expect(map.locator('[data-progress="done"]')).toHaveCount(1);
    await expect(map.locator('[data-progress="in_progress"]')).toHaveCount(1);
    await expect(map.getByText("1 of 3 required done")).toBeVisible();
    await page.getByRole("button", { name: "List" }).click();
    await expect(page.locator('[data-progress="done"]')).toHaveCount(1);
    await expect(page.locator('[data-progress="in_progress"]')).toHaveCount(1);
    await expect(page.locator('[data-progress="not_started"]')).toHaveCount(2);

    await page.goto(`/roadmaps/${seed.slug}/spreadsheets`);
    await expect(page.locator("article header").getByText("Done", { exact: true })).toBeVisible();
  } finally {
    await admin(`/auth/v1/admin/users/${user.id}`, { method: "DELETE" });
  }
});
