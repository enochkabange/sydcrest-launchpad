import { test } from "@playwright/test";
import { certify, deleteOrganisation, signIn, verifiedOrganisation } from "../earn-business";
import { createLearner, promoteToAdmin } from "../learners";
import { insert } from "../supabase-admin";
import { screensSetup, shoot } from "./shoot";

test("screenshots of business and talent screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  // An owner of a verified organisation who is also a certified, listed learner and an admin, so one
  // session reaches every screen. Only the local stack; removed afterwards.
  const owner = await createLearner("Abdul-Rahman Mahama");
  await promoteToAdmin(owner.id);
  await certify(owner);
  const listed = await createLearner("Mariama Iddrisu");
  await certify(listed);
  await insert("talent_listings", [
    { profile_id: listed.id, headline: "Junior data analyst", skills: ["Excel", "SQL"], tracks: ["data"], region: "northern", availability: "open_to_internships" },
  ]);
  const org = await verifiedOrganisation(owner, "Savannah Agritech");
  try {
    await shoot(page, testInfo, "business", "/business");
    await signIn(page, owner);
    for (const [name, path] of [
      ["business-new", "/business/new"],
      ["org-hub", "/org"],
      ["org-manage", `/org/${org.slug}/manage`],
      ["org-team", `/org/${org.slug}/team`],
      ["org-requests", `/org/${org.slug}/requests`],
      ["org-public", `/org/${org.slug}`],
      ["talent", "/talent"],
      ["talent-person", `/talent/${listed.id}`],
      ["talent-me", "/talent/me"],
      ["admin-organisations", "/admin/organisations?status=all"],
    ] as [string, string][]) {
      await shoot(page, testInfo, name, path);
    }
  } finally {
    await deleteOrganisation(org.slug);
  }
});
