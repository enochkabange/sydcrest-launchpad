import { test } from "@playwright/test";
import { signIn } from "../certificates-fixtures";
import { deleteChapter, seedChapter, type SeededChapter } from "../chapters-seed";
import { createLearner, promoteToAdmin } from "../learners";
import { screensSetup, shoot } from "./shoot";

let chapter: SeededChapter | undefined;

test.afterEach(async () => {
  if (chapter) await deleteChapter(chapter.id);
  chapter = undefined;
});

/** The chapter lead toolkit (#335) and the staff composer (#334) at 390, 1440 and 1920. */
test("lead tools, poster and messages at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const lead = await createLearner("Abdul-Rahman Iddrisu");
  const member = await createLearner("Mariama Seidu");
  const staff = await createLearner("Wumpini Abukari");
  await promoteToAdmin(staff.id);
  chapter = await seedChapter({ status: "active", leads: [lead.id], members: [member.id] });

  await signIn(page, lead.email);
  await shoot(page, testInfo, "chapter-lead-tools", `/chapters/${chapter.slug}/lead`);
  await shoot(page, testInfo, "chapter-poster", `/chapters/${chapter.slug}/poster?target=chapter&content=library`);

  await signIn(page, staff.email);
  await shoot(page, testInfo, "admin-messages", "/admin/messages");
});
