import { test } from "@playwright/test";
import { deleteNavPeople, seedNavPeople, signInAs } from "../nav-seed";
import { screensSetup, shoot } from "./shoot";

/** The navigation for each kind of viewer (issue #190), at 390, 1440 and 1920. */
test("screenshots of the navigation for visitors and every role", async ({ page }, testInfo) => {
  screensSetup(testInfo, 480_000);
  const people = await seedNavPeople();
  try {
    await shoot(page, testInfo, "nav-visitor-home", "/");
    await shoot(page, testInfo, "nav-visitor-experts", "/experts");

    await signInAs(page, people.learner);
    await shoot(page, testInfo, "nav-learner-dashboard", "/dashboard");
    await shoot(page, testInfo, "nav-learner-learn", "/learn");
    await shoot(page, testInfo, "nav-learner-experts", "/experts");

    await signInAs(page, people.mentor);
    await shoot(page, testInfo, "nav-mentor-mentors", "/mentors");

    await signInAs(page, people.expert);
    await shoot(page, testInfo, "nav-expert-mentors", "/mentors");

    await signInAs(page, people.business);
    await shoot(page, testInfo, "nav-business-earn", "/earn");

    await signInAs(page, people.admin);
    await shoot(page, testInfo, "nav-admin-dashboard", "/dashboard");
  } finally {
    await deleteNavPeople(people);
  }
});
