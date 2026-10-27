import { test } from "@playwright/test";
import { signIn } from "../certificates-fixtures";
import { deleteMentorCohort, seedMentorCohort } from "../mentor-seed";
import { insert } from "../supabase-admin";
import { screensSetup, shoot } from "./shoot";

test("screenshots of the mentor console and peer review at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const seed = await seedMentorCohort();
  try {
    const [review] = await insert("peer_reviews", [
      { submission_id: seed.capstoneSubmissionId, reviewer_id: seed.learners.wumpini.id, assigned_by: seed.mentor.id },
    ]);
    await signIn(page, seed.mentor.email);
    await shoot(page, testInfo, "mentor", `/mentor?cohort=${seed.cohort.id}`);
    await shoot(page, testInfo, "mentor-submission", `/mentor/submissions/${seed.capstoneSubmissionId}`);
    await shoot(page, testInfo, "mentor-learner", `/mentor/learners/${seed.learners.wumpini.memberId}`);
    await signIn(page, seed.learners.wumpini.email);
    await shoot(page, testInfo, "peer-reviews", "/cohort/reviews");
    await shoot(page, testInfo, "peer-review", `/cohort/reviews/${review.id}`);
  } finally {
    await deleteMentorCohort(seed);
  }
});
