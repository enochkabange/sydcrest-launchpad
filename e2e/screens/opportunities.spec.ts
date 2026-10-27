import { test } from "@playwright/test";
import { signIn } from "../certificates-fixtures";
import { createLearner } from "../learners";
import { admin, insert } from "../supabase-admin";
import { screensSetup, shoot } from "./shoot";

let opportunity: { id: string; slug: string } | undefined;

test.afterEach(async () => {
  if (opportunity) await admin(`/rest/v1/opportunities?id=eq.${opportunity.id}`, { method: "DELETE" });
  opportunity = undefined;
});

test("opportunities screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  [opportunity] = await insert<{ id: string; slug: string }>("opportunities", [
    {
      slug: `screens-intern-${crypto.randomUUID().slice(0, 6)}`,
      kind: "internship",
      title: "Data and reporting intern",
      summary: "Six months with a farmers' cooperative, cleaning survey data and building simple reports.",
      description: "Help the team in Tamale keep survey records tidy and turn them into weekly reports.\n\nYou will work with Google Sheets and learn to build simple dashboards.",
      organisation_name: "Savannah Data Hub (screenshot sample)",
      apply_url: "https://example.org/apply",
      location: "Tamale",
      region: "northern",
      is_remote: true,
      fields: ["data"],
      skills: ["Google Sheets", "Data cleaning"],
      status: "open",
    },
  ]);

  await shoot(page, testInfo, "opportunities", "/opportunities");
  await shoot(page, testInfo, "opportunity", `/opportunities/${opportunity!.slug}`);
  const learner = await createLearner("Wumpini Abukari");
  await signIn(page, learner.email);
  await shoot(page, testInfo, "opportunities-saved", "/opportunities/saved");
});
