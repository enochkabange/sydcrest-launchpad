import { expect, test, type Page } from "@playwright/test";
import { chooseTrack } from "../src/lib/path/recommend";
import type { PathAnswers } from "../src/lib/path/quiz";
import { accraToday, addDays } from "../src/lib/opportunities/model";
import { createLearner, PASSWORD, promoteToAdmin, type Learner } from "./learners";
import { admin, insert } from "./supabase-admin";

/**
 * Opportunities board (issue #159) against the LOCAL stack: public board and
 * detail with filters and structured data, expired posts hidden, a learner
 * saves and marks applied and sees a suggestion from their path, and an
 * admin posts through the shared form.
 */

const ANSWERS: PathAnswers = {
  v: 1,
  interests: ["data"],
  confidence: "some",
  experience: "none",
  goal: "first-job",
  hours: "3-6",
  device: "own-computer",
  data: "okay",
};
const TRACK = chooseTrack(ANSWERS).track;

type Seeded = { id: string; slug: string; title: string };
let seeded: Seeded[] = [];

async function seed(project: string) {
  const tag = `${project}-${crypto.randomUUID().slice(0, 6)}`;
  const today = accraToday();
  seeded = await insert<Seeded>("opportunities", [
    {
      slug: `data-intern-${tag}`,
      kind: "internship",
      title: `Data intern ${tag}`,
      summary: "Clean and chart survey data for a farmers' cooperative.",
      description: "Help the team in Tamale keep survey records tidy.\n\nYou will learn to build simple dashboards.",
      organisation_name: "Savannah Data Hub",
      apply_url: "https://example.org/apply",
      location: "Tamale",
      region: "northern",
      deadline: addDays(today, 10),
      fields: ["data"],
      tracks: [TRACK],
      skills: ["Google Sheets"],
      status: "open",
    },
    {
      slug: `design-grant-${tag}`,
      kind: "grant",
      title: `Creative grant ${tag}`,
      description: "A small grant for young designers.",
      organisation_name: "Wa Arts Fund",
      apply_instructions: "Email a short portfolio to Mariama.",
      is_remote: true,
      fields: ["design"],
      status: "open",
    },
    {
      slug: `expired-job-${tag}`,
      kind: "job",
      title: `Expired job ${tag}`,
      description: "This one closed yesterday.",
      organisation_name: "Bolga Traders",
      apply_url: "https://example.org/old",
      deadline: addDays(today, -1),
      status: "open",
    },
  ]);
  return { tag, intern: seeded[0], grant: seeded[1], expired: seeded[2] };
}

test.afterEach(async () => {
  for (const o of seeded) await admin(`/rest/v1/opportunities?id=eq.${o.id}`, { method: "DELETE" });
  seeded = [];
});

async function signIn(page: Page, learner: Learner, next = "") {
  await page.goto(`/login${next ? `?next=${encodeURIComponent(next)}` : ""}`);
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(next ? new RegExp(`${next}$`) : /\/dashboard$/);
}

test("the public board filters, shows details with JobPosting data and hides expired posts", async ({ page }, testInfo) => {
  const { intern, grant, expired } = await seed(testInfo.project.name);

  await page.goto("/opportunities");
  await expect(page.getByRole("heading", { level: 1, name: "Opportunities" })).toBeVisible();
  await expect(page.getByRole("link", { name: intern.title })).toBeVisible();
  await expect(page.getByRole("link", { name: grant.title })).toBeVisible();
  await expect(page.getByText(expired.title)).toHaveCount(0);

  await page.getByLabel("Type").selectOption("grant");
  await page.getByRole("button", { name: "Show results" }).click();
  await expect(page).toHaveURL(/type=grant/);
  await expect(page.getByRole("link", { name: grant.title })).toBeVisible();
  await expect(page.getByRole("link", { name: intern.title })).toHaveCount(0);

  await page.goto("/opportunities?location=remote&view=table");
  await expect(page.locator("table caption", { hasText: "Open opportunities" })).toHaveCount(1);
  await expect(page.getByRole("link", { name: grant.title })).toBeVisible();

  await page.goto("/opportunities");
  await page.getByRole("link", { name: intern.title }).click();
  await expect(page).toHaveURL(new RegExp(`/opportunities/${intern.slug}$`));
  await expect(page.getByRole("heading", { level: 1, name: intern.title })).toBeVisible();
  await expect(page.getByRole("link", { name: /Apply with Savannah Data Hub/ })).toHaveAttribute("href", "https://example.org/apply");
  const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
  expect(ld).toMatchObject({ "@type": "JobPosting", title: intern.title, employmentType: "INTERN" });
  await expect(page.getByRole("link", { name: "Sign in to save this" })).toBeVisible();

  await page.goto(`/opportunities/${grant.slug}`);
  await expect(page.getByText("Email a short portfolio to Mariama.")).toBeVisible();
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);

  const gone = await page.goto(`/opportunities/${expired.slug}`);
  expect(gone?.status()).toBe(404);
});

test("a learner saves, marks applied and sees a suggestion from their path", async ({ page }, testInfo) => {
  const { intern, grant } = await seed(testInfo.project.name);
  const learner = await createLearner("Hawa Issahaku");
  await insert("personalized_paths", [{ profile_id: learner.id, quiz_answers: ANSWERS }]);

  await signIn(page, learner, `/opportunities/${grant.slug}`);
  await page.getByRole("button", { name: `Save ${grant.title}` }).click();
  await expect(page.getByText("Saved to your list. Only you can see this.")).toBeVisible();
  await page.getByRole("button", { name: `Mark ${grant.title} as applied` }).click();
  await expect(page.getByText("You marked this as applied. Only you can see this.")).toBeVisible();

  await page.goto("/opportunities/saved");
  await expect(page.getByRole("heading", { level: 1, name: "Saved opportunities" })).toBeVisible();
  const row = page.locator("tr").filter({ hasText: grant.title });
  await expect(row.getByText("Applied", { exact: true })).toBeVisible();

  // The internship is tagged with the learner's track, so it is suggested (on phones below the list).
  const suggested = page.getByRole("complementary", { name: "Suggested for you" });
  await expect(suggested.getByRole("link", { name: intern.title })).toBeVisible();

  await page.goto("/opportunities");
  await expect(page.getByRole("region", { name: "Suggested for you" }).getByRole("link", { name: intern.title })).toBeVisible();
});

test("an admin posts an opportunity that appears on the board", async ({ page }, testInfo) => {
  const learner = await createLearner("Abdul-Rahman Sumaila");
  await promoteToAdmin(learner.id);
  await signIn(page, learner);
  const title = `Field officer ${testInfo.project.name} ${crypto.randomUUID().slice(0, 6)}`;

  await page.goto("/admin/opportunities/new");
  await page.getByLabel("Title").fill(title);
  await page.getByLabel("Type").selectOption("job");
  await page.getByLabel("Status").selectOption("open");
  await page.getByLabel("Offered by").fill("Northern Farmers Network");
  await page.getByLabel("Description").fill("Visit farms around Damongo and record harvest data.");
  await page.getByRole("button", { name: "Post opportunity" }).click();
  await expect(page.getByText("Add an application link or instructions")).toBeVisible();
  await expect(page.getByLabel("Title")).toHaveValue(title);

  await page.getByLabel("Application link").fill("https://example.org/field-officer");
  await page.getByLabel("Region").selectOption("savannah");
  await page.getByRole("button", { name: "Post opportunity" }).click();
  await expect(page.getByText("Posted. It is on the public board now.")).toBeVisible();
  const id = new URL(page.url()).pathname.split("/").pop()!;
  seeded.push({ id, slug: "", title });

  await page.goto("/opportunities?location=savannah");
  await expect(page.getByRole("link", { name: title })).toBeVisible();
});
