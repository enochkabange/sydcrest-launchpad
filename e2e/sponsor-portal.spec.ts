import { expect as baseExpect, test } from "@playwright/test";
import { createLearner, promoteToAdmin } from "./learners";
import { deleteChapter, seedChapter } from "./chapters-seed";
import { deleteOrganisation, deleteUser, signIn, verifiedOrganisation } from "./earn-business";
import { admin } from "./supabase-admin";

/**
 * Sponsor portal (#307): an admin records that an organisation sponsors a
 * chapter, a member shares a story by name, and the sponsor sees the totals
 * (small numbers held back) and the story under Impact.
 */

const expect = baseExpect.configure({ timeout: 15_000 });

test("a sponsor follows the impact of the chapter it funds (#307)", async ({ page }) => {
  const tag = crypto.randomUUID().slice(0, 6);
  const [boss, owner, storyteller, ...others] = await Promise.all([
    createLearner("Issahaku Alhassan"),
    createLearner("Ayishetu Abukari"),
    createLearner("Wumpini Seidu"),
    ...Array.from({ length: 5 }, (_, i) => createLearner(`Member ${i + 1} Yakubu`)),
  ]);
  await promoteToAdmin(boss.id);
  const orgName = `Shea Bank ${tag}`;
  const org = await verifiedOrganisation(owner, orgName);
  const chapter = await seedChapter({ members: [storyteller.id, ...others.map((o) => o.id)] });
  try {
    // The admin records the sponsorship.
    await signIn(page, boss);
    await page.goto("/admin/sponsorships");
    await page.getByRole("combobox", { name: "Sponsor", exact: true }).selectOption({ label: orgName });
    await page.getByRole("combobox", { name: "They sponsor a" }).selectOption("chapter");
    await page.getByRole("combobox", { name: "Chapter", exact: true }).selectOption({ label: chapter.name });
    await page.getByLabel("Seats funded (optional)").fill("25");
    await page.getByLabel("From").fill("2026-11-01");
    await page.getByRole("button", { name: "Record sponsorship" }).click();
    await expect(page.getByText("Sponsorship recorded.")).toBeVisible();

    // A member shares a story by name.
    await page.context().clearCookies();
    await signIn(page, storyteller);
    await page.goto("/profile");
    await page.getByRole("textbox", { name: "Your story" }).fill("The chapter Skillshop taught me to run Facebook ads for my aunt's shop in Tamale.");
    await page.getByLabel(/Show my name with my story/).check();
    await page.getByRole("button", { name: "Save story" }).click();
    await expect(page.getByText("Saved. Sponsors of your cohort or chapter can read it.")).toBeVisible();

    // The sponsor sees totals and the story.
    await page.context().clearCookies();
    await signIn(page, owner);
    await page.goto(`/org/${org.slug}/manage`);
    await page.getByRole("link", { name: "Impact" }).click();
    const card = page.getByRole("region", { name: chapter.name });
    await expect(card.getByText("Gold sponsor since 1 Nov 2026")).toBeVisible();
    const tile = (label: string) => card.locator("div").filter({ has: page.getByText(label, { exact: true }) }).locator("dd");
    await expect(tile("Seats funded")).toHaveText("25");
    await expect(tile("Learners")).toHaveText("6");
    await expect(tile("Certificates")).toHaveText("Fewer than 5");
    await expect(card.getByText("Facebook ads for my aunt's shop")).toBeVisible();
    await expect(card.getByText("Wumpini Seidu")).toBeVisible();
  } finally {
    await admin(`/rest/v1/sponsorships?organisation_id=eq.${org.id}`, { method: "DELETE" }).catch(() => undefined);
    await deleteChapter(chapter.id).catch(() => undefined);
    await deleteOrganisation(org.slug).catch(() => undefined);
    await Promise.all([boss, owner, storyteller, ...others].map((p) => deleteUser(p.id))).catch(() => undefined);
  }
});
