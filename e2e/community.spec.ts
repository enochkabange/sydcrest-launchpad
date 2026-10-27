import { expect, test, type Page } from "@playwright/test";
import { createLearner, PASSWORD, type Learner } from "./learners";
import { deleteChapter, fillHourlyLimit, seedChapter, type SeededChapter } from "./community-seed";

/**
 * The in app community feed (#162) at phone and desktop widths (the two
 * Playwright projects). Each test seeds its own chapter, so feeds never mix.
 */

let seeded: SeededChapter | undefined;

test.afterEach(async () => {
  if (seeded) await deleteChapter(seeded);
  seeded = undefined;
});

async function signIn(page: Page, learner: Learner) {
  await page.context().clearCookies();
  await page.goto("/login");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

const posts = (page: Page) => page.getByRole("list", { name: "Posts" }).getByRole("article");

test("a member reads the chapter feed, posts, reacts, replies and reports; the lead moderates", async ({ page }) => {
  test.setTimeout(90_000);
  const member = await createLearner("Wumpini Abukari");
  seeded = await seedChapter([member], 21);
  const feed = `/community?scope=chapter&id=${seeded.chapterId}`;
  await signIn(page, member);

  // The switcher lists the chapter; the WhatsApp group is one tap away.
  await page.goto("/community");
  await expect(page.getByRole("heading", { name: "Community", level: 1 })).toBeVisible();
  await page.getByRole("link", { name: new RegExp(seeded.name) }).first().click();
  await expect(page).toHaveURL(new RegExp(`scope=chapter&id=${seeded.chapterId}`));
  await expect(page.getByRole("link", { name: "Open the chapter group" })).toHaveAttribute("href", seeded.whatsappUrl);

  // Pinned first, then a page of 20; "Load more" brings the rest without repeating the pinned post.
  await expect(posts(page).first()).toContainText("Pinned");
  await expect(posts(page).first()).toContainText("Chapter lead");
  await expect(posts(page)).toHaveCount(20);
  await page.getByRole("button", { name: "Load more" }).click();
  await expect(posts(page)).toHaveCount(22);
  await expect(page.getByText("You have reached the first post.")).toBeVisible();
  await expect(page.getByText("Welcome to the chapter feed.")).toHaveCount(1);

  // Post with safe markdown: bold renders, a script stays text.
  await page.getByRole("textbox", { name: "Your post" }).fill("Who is going to the **Saturday** Skillshop? <script>x</script>");
  await page.getByRole("button", { name: "Post", exact: true }).click();
  const mine = posts(page).filter({ hasText: "Who is going to the" });
  await expect(mine).toBeVisible();
  await expect(mine.locator("strong")).toHaveText("Saturday");
  await expect(mine).toContainText("<script>x</script>");

  // React on the lead's pinned post.
  const pinned = posts(page).first();
  const like = pinned.getByRole("button", { name: /^Like/ });
  await like.click();
  await expect(like).toHaveAttribute("aria-pressed", "true");
  await expect(pinned.getByRole("button", { name: "Like, 1" })).toBeVisible();

  // Reply in the thread.
  await pinned.getByRole("link", { name: "Reply" }).click();
  await expect(page).toHaveURL(new RegExp(`/community/post/${seeded.pinnedId}$`));
  await page.getByLabel("Your reply").fill("I will be there with Mariama.");
  await page.getByRole("button", { name: "Reply", exact: true }).click();
  await expect(page.getByRole("article", { name: "Reply from Wumpini Abukari" })).toContainText("I will be there with Mariama.");
  await expect(page.getByRole("heading", { name: "1 reply" })).toBeVisible();

  // Report the pinned post.
  const thread = page.getByRole("article").first();
  await thread.getByText("Report", { exact: true }).click();
  await thread.getByLabel("Reason").selectOption("Spam or scam");
  await thread.getByRole("button", { name: "Report this post" }).click();
  await expect(page.getByText("Thanks. The moderators of this group will review it.")).toBeVisible();

  // Members cannot open the moderation queue.
  await page.goto("/community/moderation");
  await expect(page.getByRole("heading", { name: "For moderators" })).toBeVisible();

  // The lead sees the report, hides the post with a reason and closes the report.
  await signIn(page, seeded.lead);
  await page.goto("/community/moderation");
  const report = page.getByRole("list", { name: "Open reports" }).getByRole("listitem").first();
  await expect(report).toContainText("Spam or scam");
  await expect(report).toContainText("Reported by:");
  await report.getByText("Hide", { exact: true }).click();
  await report.getByLabel("Why are you hiding it?").fill("Testing the queue");
  await report.getByRole("button", { name: "Hide this post" }).click();
  await expect(report.getByText("Hidden", { exact: true })).toBeVisible();
  await report.getByRole("button", { name: "Actioned" }).click();
  await expect(page.getByText("Nothing open")).toBeVisible();
  await page.getByRole("link", { name: "Actioned" }).click();
  await expect(page.getByRole("list", { name: "Actioned reports" })).toContainText("Spam or scam");

  // The member no longer sees the hidden post in the feed.
  await signIn(page, member);
  await page.goto(feed);
  await expect(page.getByText("Who is going to the")).toBeVisible();
  await expect(page.getByText("Welcome to the chapter feed.")).toHaveCount(0);
});

test("the lead pins a post and the hourly limit says slow down", async ({ page }) => {
  const member = await createLearner("Mariama Seidu");
  seeded = await seedChapter([member], 2);
  await signIn(page, seeded.lead);
  await page.goto(`/community?scope=chapter&id=${seeded.chapterId}`);

  const newest = posts(page).filter({ hasText: "Week 2 notes" });
  await newest.getByRole("button", { name: "Pin to top" }).click();
  await expect(posts(page).filter({ hasText: "Week 2 notes" }).getByRole("button", { name: "Unpin" })).toBeVisible();

  await signIn(page, member);
  await fillHourlyLimit(seeded, member.id);
  await page.goto(`/community?scope=chapter&id=${seeded.chapterId}`);
  await page.getByRole("textbox", { name: "Your post" }).fill("One more note");
  await page.getByRole("button", { name: "Post", exact: true }).click();
  await expect(page.getByText(/^Slow down\./)).toBeVisible();
});

test("someone outside the chapter cannot read its feed", async ({ page }) => {
  seeded = await seedChapter([], 1);
  await signIn(page, await createLearner("Fuseini Mahama"));
  await page.goto(`/community?scope=chapter&id=${seeded.chapterId}`);
  await expect(page.getByRole("heading", { name: "This feed is for chapter members" })).toBeVisible();
  await expect(page.getByText("Week 1 notes")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Open the chapter group" })).toHaveCount(0);
});
