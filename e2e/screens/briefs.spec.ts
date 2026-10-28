import { test } from "@playwright/test";
import { deleteBriefsSeed, seedBriefs } from "../briefs-seed";
import { signIn } from "../certificates-fixtures";
import { insert } from "../supabase-admin";
import { screensSetup, shoot } from "./shoot";

test("brief screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const seed = await seedBriefs();
  const { tag, poster, expert, otherExpert, owner, org } = seed;
  try {
    // Real (test) rows: an advice brief with two pitches and a job brief.
    const [advice, job] = await insert<{ id: string }>("briefs", [
      {
        poster_id: poster.id,
        title: "Help me clean a farm survey sheet",
        description:
          "I collected 300 survey rows from farmers in Savelugu for a cooperative report. Some farmers appear twice and the village names are spelt in different ways. I need a clean sheet and a short note on what changed.",
        skills: ["Excel", "Data cleaning", tag],
        categories: ["data"],
        indicative_budget_ghs: 400,
        location: "Savelugu",
        deadline: "2027-01-15",
      },
      {
        kind: "job",
        poster_id: owner.id,
        organisation_id: org.id,
        title: "Weekly stock sheet for our shea store",
        description: "We sell shea butter and need a simple stock sheet our staff can update every Friday, with a short training session.",
        skills: ["Google Sheets", tag],
        categories: ["data", "product-business"],
        indicative_budget_ghs: 1500,
        is_remote: false,
        location: "Savelugu",
      },
    ]);
    await insert("pitches", [
      {
        brief_id: advice.id,
        expert_id: expert.id,
        offer_id: expert.gigId,
        message: "I have cleaned survey data for three NGOs in the Northern Region. I would remove duplicates, standardise the village names and send you a change log.",
        proposed_timeline: "Two days",
        indicative_price_ghs: 350,
      },
      {
        brief_id: advice.id,
        expert_id: otherExpert.id,
        message: "I train shop owners and cooperatives to keep tidy sheets. I can clean this with you on a call so you learn how to do it next time.",
        indicative_price_ghs: 300,
      },
    ]);

    await signIn(page, poster.email);
    await shoot(page, testInfo, "briefs-detail-poster", `/briefs/${advice.id}`);
    await shoot(page, testInfo, "briefs-new", "/briefs/new");
    await shoot(page, testInfo, "briefs-mine", "/briefs/mine");

    await signIn(page, expert.email);
    await shoot(page, testInfo, "briefs-board", `/briefs?skill=${tag}`);
    await shoot(page, testInfo, "briefs-detail-expert", `/briefs/${job.id}`);
  } finally {
    await deleteBriefsSeed(seed);
  }
});
