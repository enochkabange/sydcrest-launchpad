import { expect as baseExpect, test } from "@playwright/test";
import { deleteOrganisation, deleteUser, signIn, verifiedOrganisation } from "./earn-business";
import { createLearner, type Learner } from "./learners";
import { deleteRoadmap, seedRoadmap, type SeededRoadmap } from "./seed";
import { admin, insert } from "./supabase-admin";

/**
 * Matching explanations (#336) stay switched off until the founder approves
 * the readiness weights: with READINESS_FOR_LEARNERS and
 * READINESS_FOR_EMPLOYERS unset (as in CI), a scored learner sees no fit
 * block, the apply form offers no sharing box, and an employer sees no band
 * even for an applicant whose application says they share it. That employers
 * see a band only with consent is checked at function level in
 * supabase/tests/database/matching.test.sql. Readiness comes from the daily
 * maintenance, after each learner starts a topic on the opportunity's track.
 */

const expect = baseExpect.configure({ timeout: 15_000 });

/** A seeded roadmap on the Data track, with each learner having started its first topic, then scored. */
async function scoredOnDataTrack(roadmap: SeededRoadmap, learners: Learner[]) {
  await admin(`/rest/v1/roadmaps?id=eq.${roadmap.id}`, { method: "PATCH", body: { track: "data" } });
  const [node] = await admin<{ id: string }[]>(
    `/rest/v1/roadmap_nodes?roadmap_id=eq.${roadmap.id}&slug=eq.${roadmap.quizNode.slug}&select=id`,
  );
  await insert(
    "roadmap_progress",
    learners.map((l) => ({ profile_id: l.id, node_id: node.id, status: "in_progress" })),
  );
  await admin("/rest/v1/rpc/run_analytics_maintenance", { method: "POST", body: { p_days: 1 } });
}

test("with the switch off, a scored learner sees no fit block on a matching opportunity", async ({ page }) => {
  test.setTimeout(120_000);
  const tag = crypto.randomUUID().slice(0, 6);
  const roadmap = await seedRoadmap();
  const learner = await createLearner("Fuseini Mahama");
  const slug = `data-clerk-${tag}`;
  const [opp] = await insert<{ id: string }>("opportunities", [
    {
      slug,
      kind: "job",
      title: `Data entry clerk ${tag}`,
      description: "Enter and check survey records for a research team in Tamale.",
      organisation_name: "Northern Research Hub",
      status: "open",
      tracks: ["data"],
    },
  ]);
  try {
    await scoredOnDataTrack(roadmap, [learner]);
    await signIn(page, learner);
    await page.goto(`/opportunities/${slug}`);
    await expect(page.getByRole("heading", { name: `Data entry clerk ${tag}`, level: 1 })).toBeVisible();
    // The save controls are the signed in island beside it, so the page has finished streaming.
    await expect(page.getByRole("button", { name: `Save Data entry clerk ${tag}` })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Why this fits you" })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "What would improve your fit" })).toHaveCount(0);
    await expect(page.getByText(/Your readiness for/)).toHaveCount(0);
  } finally {
    await admin(`/rest/v1/opportunities?id=eq.${opp.id}`, { method: "DELETE" }).catch(() => undefined);
    await deleteRoadmap(roadmap.id).catch(() => undefined);
    await deleteUser(learner.id).catch(() => undefined);
  }
});

test("with the switch off, the apply form offers no sharing box and employers see no band", async ({ page }) => {
  test.setTimeout(120_000);
  const tag = crypto.randomUUID().slice(0, 6);
  const roadmap = await seedRoadmap();
  const [owner, sharer, private_] = await Promise.all([
    createLearner("Ayishetu Abukari"),
    createLearner("Wumpini Alhassan"),
    createLearner("Abdul-Rahman Issah"),
  ]);
  const orgName = `Savannah Surveys ${tag}`;
  const org = { ...(await verifiedOrganisation(owner, orgName)), name: orgName };
  const title = `Survey data assistant ${tag}`;
  const [opp] = await insert<{ id: string }>("opportunities", [
    {
      slug: `survey-data-${tag}`,
      kind: "job",
      title,
      description: "Clean and check household survey data across the Northern Region.",
      organisation_id: org.id,
      organisation_name: org.name,
      posted_by: owner.id,
      status: "open",
      apply_on_sydcrest: true,
      tracks: ["data"],
    },
  ]);
  try {
    await scoredOnDataTrack(roadmap, [sharer, private_]);

    // Nobody is asked to consent to something that is not live.
    await signIn(page, private_);
    await page.goto(`/opportunities/survey-data-${tag}/apply`);
    await expect(page.getByLabel(new RegExp(`If ${org.name} shortlists me`))).toBeVisible();
    await expect(page.getByLabel(/Share my readiness band/)).toHaveCount(0);
    await page.context().clearCookies();

    // Even an application stored as sharing shows no band while the switch is off.
    await insert("opportunity_applications", [
      {
        opportunity_id: opp.id,
        profile_id: sharer.id,
        note: "I cleaned survey data for an NGO in Tamale for a year.",
        contact_consent: true,
        share_readiness: true,
      },
      {
        opportunity_id: opp.id,
        profile_id: private_.id,
        note: "I keep the records for my family shop in spreadsheets.",
        contact_consent: true,
      },
    ]);

    await signIn(page, owner);
    await page.goto(`/org/${org.slug}/opportunities/${opp.id}/applicants`);
    await expect(page.getByRole("heading", { name: `Applicants: ${title}` })).toBeVisible();
    const shared = page.getByRole("listitem").filter({ has: page.getByRole("heading", { name: "Wumpini Alhassan" }) });
    const unshared = page.getByRole("listitem").filter({ has: page.getByRole("heading", { name: "Abdul-Rahman Issah" }) });
    await expect(shared.getByText("I cleaned survey data for an NGO in Tamale")).toBeVisible();
    await expect(unshared.getByText("I keep the records for my family shop")).toBeVisible();
    await expect(page.getByTestId("applicant-readiness")).toHaveCount(0);
    await expect(page.getByText(/Getting started in|Building in|Job ready in/)).toHaveCount(0);
    await expect(page.getByText(/\b\d{1,3} of 100\b/)).toHaveCount(0);
  } finally {
    await admin(`/rest/v1/opportunities?id=eq.${opp.id}`, { method: "DELETE" }).catch(() => undefined);
    await deleteOrganisation(org.slug).catch(() => undefined);
    await deleteRoadmap(roadmap.id).catch(() => undefined);
    await Promise.all([owner, sharer, private_].map((u) => deleteUser(u.id))).catch(() => undefined);
  }
});
