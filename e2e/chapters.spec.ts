import { expect as baseExpect, test, type Page } from "@playwright/test";
import { createLearner, PASSWORD, promoteToAdmin, type Learner } from "./learners";
import { deleteChapter, makePublic, seedChapter, setRegion } from "./chapters-seed";

/**
 * Regional chapters (#163) at phone and desktop widths: an admin creates a
 * chapter and appoints a lead, a learner joins and leaves, a lead edits the
 * page and removes a member, and a visitor sees only the public parts.
 */

/** Server Actions re-render the page before the result shows; give them room on a busy machine. */
const expect = baseExpect.configure({ timeout: 15_000 });

const cleanup: string[] = [];

test.afterEach(async () => {
  while (cleanup.length) await deleteChapter(cleanup.pop()!);
});

async function signIn(page: Page, learner: Learner) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

test("a visitor sees the chapter, its lead and WhatsApp link, but not the members", async ({ page }) => {
  const lead = await createLearner("Abdul-Rahman Iddrisu");
  const member = await createLearner("Mariama Seidu");
  const chapter = await seedChapter({
    leads: [lead.id],
    members: [member.id],
    whatsappUrl: "https://chat.whatsapp.com/TamaleE2E",
    summary: "We meet at the library every second Saturday.",
  });
  cleanup.push(chapter.id);

  await page.goto(`/chapters/${chapter.slug}`);
  await expect(page.getByRole("heading", { name: chapter.name, level: 1 })).toBeVisible();
  await expect(page.getByText("We meet at the library every second Saturday.")).toBeVisible();
  await expect(page.getByText("Being set up").first()).toBeVisible();
  await expect(page.getByText("Abdul-Rahman Iddrisu")).toBeVisible();
  await expect(page.getByRole("link", { name: "Open the WhatsApp group" })).toHaveAttribute("href", "https://chat.whatsapp.com/TamaleE2E");
  await expect(page.getByText("No events are scheduled yet.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign in to join" })).toBeVisible();
  await expect(page.getByText("The member list and chapter posts are for members.")).toBeVisible();
  await expect(page.getByText("Mariama Seidu")).toHaveCount(0);

  // The list shows planned capitals honestly alongside real chapters.
  await page.goto("/chapters");
  await expect(page.getByRole("heading", { name: "Chapters", level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Bolgatanga" })).toBeVisible();
});

test("a learner in the Northern Region joins and leaves the chapter", async ({ page }, testInfo) => {
  const learner = await createLearner("Wumpini Abukari");
  await setRegion(learner.id, "northern");
  const lead = await createLearner("Fuseini Mahama");
  const chapter = await seedChapter({ leads: [lead.id] });
  cleanup.push(chapter.id);
  await signIn(page, learner);

  await page.goto(`/chapters/${chapter.slug}`);
  await page.getByRole("button", { name: `Join ${chapter.name}` }).click();
  await expect(page.getByRole("heading", { name: "You are a member" })).toBeVisible();
  const members = page.getByRole("region", { name: /Members/ });
  await expect(members.getByText("Wumpini Abukari (you)")).toBeVisible();
  await expect(members.getByText("Fuseini Mahama")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Chapter posts" })).toBeVisible();
  // The chapter feed (#162) is mounted for members: they can post to it.
  await expect(page.getByRole("heading", { name: /^Post to / })).toBeVisible();
  // Members cannot remove anyone or edit the page.
  await expect(page.getByRole("button", { name: /^Remove/ })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Edit the chapter page" })).toHaveCount(0);

  // The dashboard rail (lg and up) links the chapter the learner is in.
  if (testInfo.project.name === "desktop") {
    await page.goto("/dashboard");
    await expect(page.getByText(`You are a member of ${chapter.name}.`)).toBeVisible();
    await expect(page.getByRole("link", { name: `Open ${chapter.name}` })).toHaveAttribute("href", `/chapters/${chapter.slug}`);
  }

  await page.goto(`/chapters/${chapter.slug}`);
  await page.getByRole("button", { name: "Leave chapter" }).click();
  await expect(page.getByRole("button", { name: `Join ${chapter.name}` })).toBeVisible();
  await expect(page.getByText("The member list and chapter posts are for members.")).toBeVisible();
});

test("a paused chapter cannot be joined", async ({ page }) => {
  const learner = await createLearner("Hawa Alhassan");
  const chapter = await seedChapter({ status: "paused" });
  cleanup.push(chapter.id);
  await signIn(page, learner);
  await page.goto(`/chapters/${chapter.slug}`);
  await expect(page.getByText("Taking a break.").first()).toBeVisible();
  await expect(page.getByRole("button", { name: /^Join/ })).toHaveCount(0);
});

test("a lead edits the chapter page and removes a member", async ({ page }) => {
  const lead = await createLearner("Issahaku Yakubu");
  const member = await createLearner("Amina Sulemana");
  const chapter = await seedChapter({ leads: [lead.id], members: [member.id] });
  cleanup.push(chapter.id);
  await signIn(page, lead);

  await page.goto(`/chapters/${chapter.slug}`);
  await expect(page.getByRole("heading", { name: "You lead this chapter" })).toBeVisible();

  const summary = "Skillshops at the Tamale library. Bring a phone or a laptop.";
  await page.getByLabel("Summary").fill(summary);
  await page.getByLabel("WhatsApp group link").fill("https://example.com/not-whatsapp");
  await page.getByRole("button", { name: "Save chapter page" }).click();
  await expect(page.getByText(/Use a WhatsApp invite link/)).toBeVisible();

  await page.getByLabel("WhatsApp group link").fill("https://chat.whatsapp.com/LeadE2E");
  await page.getByRole("button", { name: "Save chapter page" }).click();
  await expect(page.getByText("Saved. The chapter page is updated.")).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: chapter.name, level: 1 }).locator("..").getByText(summary)).toBeVisible();
  await expect(page.getByRole("link", { name: "Open the WhatsApp group" })).toHaveAttribute("href", "https://chat.whatsapp.com/LeadE2E");

  page.once("dialog", (d) => d.accept());
  await page.getByRole("button", { name: "Remove Amina Sulemana" }).click();
  await expect(page.getByText("Amina Sulemana")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /^Remove/ })).toHaveCount(0);
});

test("an admin creates a chapter and appoints its lead", async ({ page }) => {
  const adminUser = await createLearner("Sumaila Abdulai");
  await promoteToAdmin(adminUser.id);
  const lead = await createLearner("Wumpini Abukari");
  const slug = `wumpini-${crypto.randomUUID().slice(0, 8)}`;
  await makePublic(lead.id, slug);
  const member = await createLearner("Mariama Seidu");
  await signIn(page, adminUser);

  await page.goto("/admin/chapters/new");
  await expect(page.getByRole("heading", { name: "New chapter", level: 1 })).toBeVisible();
  const tag = crypto.randomUUID().slice(0, 8);
  const name = `Wa test chapter ${tag}`;
  await page.getByLabel("Name").fill(name);
  await page.getByLabel("City").fill("Wa");
  await page.getByLabel("Region").selectOption("upper_west");
  await page.getByLabel("Slug").fill(`wa-e2e-${tag}`);
  await page.getByLabel("Status").selectOption("launching");
  await page.getByRole("button", { name: "Create chapter" }).click();
  await expect(page).toHaveURL(/\/admin\/chapters\/[0-9a-f-]{36}$/);
  const id = page.url().split("/").pop()!;
  cleanup.push(id);
  await expect(page.getByRole("heading", { name, level: 1 })).toBeVisible();
  await expect(page.getByText("No lead yet.")).toBeVisible();

  // Appoint by public profile address.
  await page.getByLabel("Public profile address").fill(`http://localhost/u/${slug}`);
  await page.getByRole("button", { name: "Appoint as lead" }).click();
  await expect(page.getByText("Wumpini Abukari now leads this chapter.")).toBeVisible();
  await expect(page.getByRole("region", { name: "Leads" }).getByText("Wumpini Abukari", { exact: true })).toBeVisible();

  // A member joins, then the admin promotes them from the list.
  await page.context().clearCookies();
  await signIn(page, member);
  await page.goto(`/chapters/wa-e2e-${tag}`);
  await expect(page.getByText("Wumpini Abukari").first()).toBeVisible();
  await page.getByRole("button", { name: `Join ${name}` }).click();
  await expect(page.getByRole("heading", { name: "You are a member" })).toBeVisible();

  await page.context().clearCookies();
  await signIn(page, adminUser);
  await page.goto(`/admin/chapters/${id}`);
  await page.getByRole("button", { name: "Make Mariama Seidu a lead" }).click();
  await expect(page.getByRole("region", { name: "Leads" }).getByText("Mariama Seidu", { exact: true })).toBeVisible();
  await expect(page.getByText("Nobody has joined yet.")).toBeVisible();
});
