import { expect, test } from "@playwright/test";
import { deleteChapter, seedChapter, type SeededChapter } from "../chapters-seed";
import { createLearner, PASSWORD, promoteToAdmin } from "../learners";
import { screensSetup, shoot } from "./shoot";

let chapter: SeededChapter | undefined;

test.afterEach(async () => {
  if (chapter) await deleteChapter(chapter.id);
  chapter = undefined;
});

test("chapter screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const lead = await createLearner("Abdul-Rahman Iddrisu");
  const member = await createLearner("Mariama Seidu");
  const admin = await createLearner("Wumpini Abukari");
  await promoteToAdmin(admin.id);
  chapter = await seedChapter({
    leads: [lead.id],
    members: [member.id],
    summary: "Launchpad learners in Tamale. Skillshops at a partner hub, and a WhatsApp group for day to day questions.",
    whatsappUrl: "https://chat.whatsapp.com/ScreensE2E",
  });

  // Signed out: the public list and chapter page.
  await shoot(page, testInfo, "chapters", "/chapters");
  await shoot(page, testInfo, "chapter-public", `/chapters/${chapter.slug}`);

  // The lead: members, remove buttons and the edit form.
  await page.goto("/login");
  await page.getByLabel("Email").fill(lead.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await shoot(page, testInfo, "chapter-lead", `/chapters/${chapter.slug}`);

  // The admin editor.
  await page.context().clearCookies();
  await page.goto("/login");
  await page.getByLabel("Email").fill(admin.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await shoot(page, testInfo, "admin-chapters", "/admin/chapters");
  await shoot(page, testInfo, "admin-chapter", `/admin/chapters/${chapter.id}`);
});
