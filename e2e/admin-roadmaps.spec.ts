import { expect, test, type Page } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";
import { LEGAL_VERSION } from "../src/lib/legal";
import { ROADMAP_DRAFTS } from "../src/content/roadmaps";

/**
 * Admin roadmap editor (issue #44). The test user is created and promoted
 * with the LOCAL stack's service role key, which CI exports as
 * SUPABASE_SERVICE_ROLE_KEY for this spec only (never to the app bundle).
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "http://127.0.0.1:54321";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const PASSWORD = "Tamale-2027-pilot";

test.skip(!SERVICE_KEY, "Set SUPABASE_SERVICE_ROLE_KEY from `supabase status -o json` to run the admin specs.");

function serviceClient() {
  return createClient(SUPABASE_URL, SERVICE_KEY!, { auth: { persistSession: false, autoRefreshToken: false } });
}

/** A confirmed learner who has passed the age and terms step, signed in through the UI. */
async function signInNewUser(page: Page, label: string) {
  const email = `fuseini.${label}.${crypto.randomUUID().slice(0, 8)}@example.test`;
  const { data, error } = await serviceClient().auth.admin.createUser({
    email,
    password: PASSWORD,
    email_confirm: true,
    user_metadata: { full_name: "Fuseini Alhassan", date_of_birth: "1998-06-02", terms_version: LEGAL_VERSION },
  });
  if (error) throw error;
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  return data.user.id;
}

async function promote(userId: string) {
  const { error } = await serviceClient().from("profiles").update({ role: "admin" }).eq("id", userId);
  if (error) throw error;
}

test("an admin creates a roadmap with two nodes, publishes it and flags a broken link", async ({ page }, testInfo) => {
  const suffix = `${testInfo.project.name}-${crypto.randomUUID().slice(0, 6)}`;
  const userId = await signInNewUser(page, testInfo.project.name);
  let roadmapUrl = "";

  await test.step("a learner who is not an admin gets a 404", async () => {
    await page.goto("/admin/roadmaps");
    await expect(page.getByText("This page could not be found.")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Roadmaps", level: 1 })).toHaveCount(0);
  });

  await promote(userId);

  await test.step("create a draft roadmap", async () => {
    await page.goto("/admin/roadmaps/new");
    await page.getByLabel("Title").fill(`Tamale data basics ${suffix}`);
    await page.getByLabel("Slug").fill(`e2e-${suffix}`);
    await page.getByLabel("Description").fill("A short roadmap made by the end to end test.");
    await page.getByLabel("Track").selectOption("data");
    await page.getByLabel("Field").selectOption("data");
    await page.getByRole("button", { name: "Create roadmap" }).click();
    await expect(page).toHaveURL(/\/admin\/roadmaps\/[0-9a-f-]{36}$/);
    roadmapUrl = page.url();
    await expect(page.getByRole("heading", { name: `Tamale data basics ${suffix}`, level: 1 })).toBeVisible();
    await expect(page.getByText("Draft", { exact: true })).toBeVisible();
  });

  await test.step("add a section and a child node", async () => {
    await page.getByLabel("Node title").fill("Spreadsheets first");
    await page.getByLabel("Node summary").fill("Sorting, filtering and formulas in Google Sheets.");
    await page.getByRole("button", { name: "Add node" }).click();
    await expect(page.getByText("Node added.")).toBeVisible();
    await expect(page.getByRole("link", { name: /Spreadsheets first/ })).toBeVisible();

    await page.getByLabel("Node title").fill("Everyday statistics");
    await page.getByLabel("Parent").selectOption({ label: "Spreadsheets first" });
    await page.getByLabel(/Optional/).check();
    await page.getByRole("button", { name: "Add node" }).click();
    await expect(page.getByRole("link", { name: /Everyday statistics/ })).toBeVisible();
  });

  await test.step("publish it", async () => {
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await expect(page.getByText("Published", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Unpublish" })).toBeVisible();
  });

  await test.step("the database has the published roadmap and its tree", async () => {
    const db = serviceClient();
    const { data: roadmap } = await db.from("roadmaps").select("id, is_published, track").eq("slug", `e2e-${suffix}`).single();
    expect(roadmap).toMatchObject({ is_published: true, track: "data" });
    const { data: nodes } = await db.from("roadmap_nodes").select("id, slug, parent_id, is_optional").eq("roadmap_id", roadmap!.id);
    expect(nodes).toHaveLength(2);
    const parent = nodes!.find((n) => n.slug === "spreadsheets-first");
    const child = nodes!.find((n) => n.slug === "everyday-statistics");
    expect(parent?.parent_id).toBeNull();
    expect(child).toMatchObject({ parent_id: parent!.id, is_optional: true });
  });

  await test.step("attach a link and mark it broken", async () => {
    await page.getByRole("link", { name: /Spreadsheets first/ }).click();
    await expect(page.getByRole("heading", { name: "Spreadsheets first", level: 1 })).toBeVisible();
    const label = `Sheets help ${suffix}`;
    await page.getByLabel("Link label").last().fill(label);
    await page.getByLabel("Link address").last().fill("https://support.google.com/docs");
    await page.getByRole("button", { name: "Add link" }).click();
    await expect(page.getByText("Link added.")).toBeVisible();

    const card = page.getByRole("listitem").filter({ hasText: label });
    await card.getByLabel(/Link works/).uncheck();
    await card.getByRole("button", { name: "Save link" }).click();
    await expect(card.getByText("Broken", { exact: true })).toBeVisible();

    await page.goto("/admin/roadmaps/links?show=broken");
    await expect(page.getByText(label)).toBeVisible();
  });

  await test.step("unpublish again so other specs see a clean catalogue", async () => {
    await page.goto(roadmapUrl);
    await page.getByRole("button", { name: "Unpublish" }).click();
    await expect(page.getByRole("button", { name: "Publish", exact: true })).toBeVisible();
  });
});

test("importing the draft outlines twice never duplicates them", async ({ page }, testInfo) => {
  // Shared rows: run in one project only so the two viewports don't race each other.
  test.skip(testInfo.project.name !== "desktop", "Runs once, on desktop.");
  test.setTimeout(90_000);
  await promote(await signInNewUser(page, "import"));

  await page.goto("/admin/roadmaps");
  const importButton = page.getByRole("button", { name: "Import draft roadmaps" });
  await importButton.click();
  await expect(page.getByText(`Imported ${ROADMAP_DRAFTS.length} drafts`)).toBeVisible({ timeout: 30_000 });
  await importButton.click();
  await expect(page.getByText(`0 new, ${ROADMAP_DRAFTS.length} updated`)).toBeVisible({ timeout: 30_000 });

  const db = serviceClient();
  const slugs = ROADMAP_DRAFTS.map((d) => d.slug);
  const { data: roadmaps } = await db.from("roadmaps").select("id, slug, is_published").in("slug", slugs);
  expect(roadmaps).toHaveLength(ROADMAP_DRAFTS.length);
  expect(roadmaps!.every((r) => !r.is_published)).toBe(true);

  for (const draft of ROADMAP_DRAFTS) {
    const id = roadmaps!.find((r) => r.slug === draft.slug)!.id;
    const { data: nodes } = await db.from("roadmap_nodes").select("id, slug, parent_id").eq("roadmap_id", id);
    expect(nodes).toHaveLength(draft.nodes.length);
    const bySlug = new Map(nodes!.map((n) => [n.slug, n]));
    for (const node of draft.nodes) {
      expect(bySlug.get(node.slug)!.parent_id).toBe(node.parent ? bySlug.get(node.parent)!.id : null);
    }
    const { count } = await db.from("node_resources").select("id", { count: "exact", head: true }).in("node_id", nodes!.map((n) => n.id));
    const expected = draft.nodes.reduce((sum, n) => sum + new Set(n.resources.map((r) => r.url)).size, 0);
    expect(count).toBe(expected);
  }
});
