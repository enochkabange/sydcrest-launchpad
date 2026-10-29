import { expect, test, type Page } from "@playwright/test";
import { UNDER_AGE_MESSAGE } from "../src/lib/legal";
import { deleteChapter, seedChapter } from "./chapters-seed";
import {
  accessToken,
  api,
  cleanUp,
  createLearner,
  deferMember,
  makePublic,
  makeSkillReviewer,
  PASSWORD,
  promoteToAdmin,
  seedApplication,
  seedCohort,
  seedExpert,
  seedOrganisation,
  seedFollow,
  seedPath,
  type ApiResult,
} from "./access-matrix-seed";
import { signInAs } from "./nav-seed";
import { admin } from "./supabase-admin";

/**
 * The access matrix (issue #240, docs/user-types.md): one person per user
 * type signs in for real and we check a representative set of routes they
 * may and may not open, and writes the database must refuse them even when
 * they skip the app and call the API with their own session. These are the
 * rules the redesign must keep.
 *
 * Route checks fetch the page with the browser's cookies (no rendering, so
 * the whole matrix stays fast). Pages stream, so a page that calls notFound()
 * inside <Suspense> still answers 200; the not found boundary's digest in the
 * HTML is the signal. Access does not depend on the viewport, so this runs on
 * the desktop project only.
 */
test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Access rules do not depend on the viewport.");
});
test.describe.configure({ timeout: 90_000 });

const NOT_FOUND = "NEXT_HTTP_ERROR_FALLBACK;404";

async function fetchPage(page: Page, path: string) {
  const res = await page.request.get(path, { maxRedirects: 0 });
  return { status: res.status(), location: res.headers()["location"] ?? "", body: await res.text() };
}

/** Opens for this person, optionally showing `text` and not showing `absent`. */
async function allowed(page: Page, path: string, text?: string, absent?: string) {
  const r = await fetchPage(page, path);
  expect(r.status, `${path} status`).toBe(200);
  expect(r.body.includes(NOT_FOUND), `${path} is not a 404`).toBe(false);
  if (text) expect(r.body, `${path} shows "${text}"`).toContain(text);
  if (absent) expect(r.body, `${path} hides "${absent}"`).not.toContain(absent);
}

/** A 404 for this person; `secret` (text only the right person may see) must not be in the response. */
async function notFound(page: Page, path: string, secret?: string) {
  const r = await fetchPage(page, path);
  expect(r.status === 404 || r.body.includes(NOT_FOUND), `${path} is a 404 (status ${r.status})`).toBe(true);
  if (secret) expect(r.body, `${path} leaks "${secret}"`).not.toContain(secret);
}

/** The proxy sends signed out visitors to `to` before any page renders. */
async function redirected(page: Page, path: string, to = "/login") {
  const r = await fetchPage(page, path);
  expect([307, 308], `${path} redirects`).toContain(r.status);
  expect(new URL(r.location, "http://x").pathname + new URL(r.location, "http://x").search, `${path} goes to ${to}`).toBe(to);
}

/** The database refused: an error status, or RLS filtered every row so nothing changed. */
function refused(r: ApiResult, label: string) {
  const filtered = r.status < 300 && Array.isArray(r.body) && r.body.length === 0;
  expect(r.status >= 400 || filtered, `${label} was refused (got ${r.status} ${JSON.stringify(r.body)})`).toBe(true);
}

const ADMIN_ONLY = ["/admin", "/admin/roadmaps", "/admin/applications", "/admin/funnel", "/admin/reports"];
/** Admin page bodies that used to reach non admins because a layout gate does not stop its page rendering. */
const ADMIN_FORMS: [string, string][] = [
  ["/admin/roadmaps/new", "Create roadmap"],
  ["/admin/opportunities/new", "Post opportunity"],
  ["/admin/events/new", "Create event"],
  ["/admin", "Review programme applications and accept"],
];

async function notAdmin(page: Page) {
  // The admin header's section list is for admins only (#245): a plain logo header above the 404.
  for (const path of ADMIN_ONLY) await notFound(page, path, "Admin sections");
  await notFound(page, "/admin/reports", "Applications");
  for (const [path, secret] of ADMIN_FORMS) await notFound(page, path, secret);
}

test("signed out visitor: public pages open, signed in areas go to sign in, the API refuses writes", async ({ page }) => {
  for (const path of ["/", "/roadmaps", "/programme", "/experts", "/opportunities", "/events", "/chapters", "/skills", "/impact", "/business", "/start", "/settings", "/login", "/signup"]) {
    await allowed(page, path);
  }
  for (const path of [
    "/dashboard", "/learn", "/cohort", "/mentor", "/expert", "/admin", "/admin/roadmaps/new", "/org", "/org/any-org/manage",
    "/talent", "/bookings", "/briefs", "/community", "/notifications", "/certificates/issue", "/programme/apply",
    "/experts/apply", "/skills/reviews", "/outcomes", "/study-buddy",
  ]) {
    await redirected(page, path);
  }
  await redirected(page, "/path", "/signup?next=/path");

  refused(await api(null, "POST", "/rest/v1/organisations", { slug: "anon-org", name: "Anon", created_by: null }), "visitor creates an organisation");
  refused(await api(null, "GET", "/rest/v1/profiles?select=id,phone"), "visitor reads profiles");
  refused(await api(null, "POST", "/rest/v1/rpc/admin_reports", {}), "visitor reads the report queue");
  refused(await api(null, "GET", "/rest/v1/outcomes?select=id"), "visitor reads outcomes");
  // #247: the waitlist and analytics take writes only through their rate limited functions.
  refused(await api(null, "POST", "/rest/v1/waitlist", { email: `script.${crypto.randomUUID().slice(0, 8)}@example.test` }), "visitor inserts into the waitlist directly");
  refused(await api(null, "POST", "/rest/v1/events", { name: "page_view", anonymous_id: "script" }), "visitor inserts an analytics event directly");
  refused(await api(null, "GET", "/rest/v1/follows?select=follower_id"), "visitor reads follows");
});

test("under 18: the sign up form and the Auth API both refuse, and no one can change their age later", async ({ page }) => {
  const sixteen = new Date();
  sixteen.setFullYear(sixteen.getFullYear() - 16);
  const dob = sixteen.toISOString().slice(0, 10);

  await page.goto("/signup");
  await page.getByLabel("Your name").fill("Fuseini Mahama");
  await page.getByLabel("Email").fill(`fuseini.minor.${crypto.randomUUID().slice(0, 8)}@example.test`);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByLabel("Date of birth").fill(dob);
  await page.getByLabel(/I agree to the Terms and Privacy Policy/).check();
  await page.getByLabel("I confirm I am 18 or over").check();
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByText(UNDER_AGE_MESSAGE)).toBeVisible();

  // Skipping the form: the Auth API itself refuses an under 18 date of birth.
  const direct = await api(null, "POST", "/auth/v1/signup", {
    email: `fuseini.api.${crypto.randomUUID().slice(0, 8)}@example.test`,
    password: PASSWORD,
    data: { full_name: "Fuseini Mahama", date_of_birth: dob, terms_version: "e2e" },
  });
  expect(direct.status, "direct sign up is refused").toBeGreaterThanOrEqual(400);
  expect(JSON.stringify(direct.body)).toMatch(/Database error/);

  // An adult cannot rewrite their date of birth (to become someone else) with updateUser.
  const adult = await createLearner("Abdul-Rahman Yakubu");
  try {
    const token = await accessToken(adult);
    refused(await api(token, "PUT", "/auth/v1/user", { data: { date_of_birth: dob } }), "changing the date of birth");
    const ok = await api(token, "PUT", "/auth/v1/user", { data: { terms_version: "e2e-2" } });
    expect(ok.status, "other metadata still saves").toBe(200);
  } finally {
    await cleanUp({ people: [adult] });
  }
});

test("learner without a path: learning and community open, staff areas are 404, the API refuses escalation", async ({ page }) => {
  const learner = await createLearner("Wumpini Alhassan");
  try {
    await signInAs(page, learner);
    await allowed(page, "/dashboard");
    await allowed(page, "/path", "Find your starting point");
    await allowed(page, "/learn");
    await allowed(page, "/community");
    await allowed(page, "/earn");
    await allowed(page, "/cohort", "Your cohort");
    await allowed(page, "/expert", "You are not an expert yet");
    await allowed(page, "/org", "Your organisations");
    await allowed(page, "/briefs", "Open briefs are shared with approved experts");
    await allowed(page, "/talent", undefined, "Show talent");
    // The market is "Experts" (founder decision D5); "Mentor" is only the programme's mentor.
    await allowed(page, "/mentors", "Find an expert", "Find experts");
    await allowed(page, "/learn", undefined, "Portfolio reviews");
    // Staff tools are a 404 for everyone else (founder decision D6, #252).
    await notFound(page, "/community/moderation", "Moderation guide");
    await notFound(page, "/mentor");
    await notFound(page, "/skills/reviews");
    await notFound(page, "/certificates/issue");
    await notAdmin(page);

    const token = await accessToken(learner);
    refused(await api(token, "PATCH", `/rest/v1/profiles?id=eq.${learner.id}`, { role: "admin" }), "learner makes themselves admin");
    refused(await api(token, "GET", "/rest/v1/profiles?select=id,phone&id=neq." + learner.id), "learner reads other profiles");
    refused(await api(token, "POST", "/rest/v1/rpc/admin_set_expert_status", { p_profile_id: learner.id, p_status: "approved", p_reason: null }), "learner approves an expert");
    refused(await api(token, "POST", "/rest/v1/opportunities", { slug: `fake-${learner.id.slice(0, 6)}`, title: "Fake job", kind: "job", posted_by: learner.id, status: "open" }), "learner posts an opportunity");
    refused(await api(token, "POST", "/rest/v1/expert_profiles", { profile_id: learner.id, slug: `w-${learner.id.slice(0, 6)}`, headline: "Self approved", status: "approved" }), "learner lists themselves as an approved expert");
    // #249: no expert profile without an application (it would sell and stay out of the admin queue).
    refused(await api(token, "POST", "/rest/v1/expert_profiles", { profile_id: learner.id, slug: `p-${learner.id.slice(0, 6)}`, headline: "Pending, no application" }), "learner creates an expert profile without applying");
    refused(await api(token, "PATCH", `/rest/v1/profiles?id=eq.${learner.id}`, { is_skill_reviewer: true }), "learner appoints themselves a skill reviewer");
    refused(await api(token, "POST", "/rest/v1/rpc/admin_set_skill_reviewer", { p_profile_id: learner.id, p_reviewer: true }), "learner calls the reviewer appointment");
    refused(await api(token, "GET", "/rest/v1/outcomes?select=id&profile_id=neq." + learner.id), "learner reads other people's outcomes");
    refused(await api(token, "GET", "/rest/v1/waitlist?select=email"), "learner reads the waitlist");
  } finally {
    await cleanUp({ people: [learner] });
  }
});

test("learner with a path: the path page shows their plan", async ({ page }) => {
  const learner = await createLearner("Mariama Seidu");
  try {
    await seedPath(learner.id);
    await signInAs(page, learner);
    await allowed(page, "/path", undefined, "Find your starting point");
  } finally {
    await cleanUp({ people: [learner] });
  }
});

test("cohort member: their cohort opens, the mentor console does not, and they cannot promote themselves", async ({ page }) => {
  const learner = await createLearner("Fuseini Iddrisu");
  const classmate = await createLearner("Ayishetu Abukari");
  const deferred = await createLearner("Rahinatu Seidu");
  const other = await createLearner("Sumaila Yakubu");
  let cohorts: string[] = [];
  try {
    const mine = await seedCohort([
      { id: learner.id, role: "learner" },
      { id: classmate.id, role: "learner" },
      { id: deferred.id, role: "learner" },
    ]);
    await deferMember(mine.memberIds[2]);
    const theirs = await seedCohort([{ id: other.id, role: "learner" }]);
    cohorts = [mine.id, theirs.id];
    await signInAs(page, learner);
    await allowed(page, "/cohort", mine.name);
    await allowed(page, "/cohort/work");
    await notFound(page, "/mentor");
    await notAdmin(page);

    const token = await accessToken(learner);
    refused(await api(token, "POST", "/rest/v1/cohort_members", { cohort_id: mine.id, profile_id: learner.id, role: "mentor" }), "learner joins as a mentor");
    refused(await api(token, "PATCH", `/rest/v1/cohort_members?id=eq.${mine.memberIds[0]}`, { role: "mentor" }), "learner promotes their membership");
    refused(await api(token, "GET", `/rest/v1/cohort_roster?select=member_id&cohort_id=eq.${theirs.id}`), "learner reads another cohort's roster");
    refused(await api(token, "POST", "/rest/v1/rpc/issue_certificate", { p_cohort_member_id: mine.memberIds[0] }), "learner issues their own certificate");

    // #250: classmates' status and deferral are for staff only, in the view and in the table.
    refused(await api(token, "GET", `/rest/v1/cohort_members?select=status,deferred_to&cohort_id=eq.${mine.id}&profile_id=neq.${learner.id}`), "learner reads classmates' memberships");
    const roster = await api(token, "GET", `/rest/v1/cohort_roster?select=profile_id,status,deferred_to&cohort_id=eq.${mine.id}`);
    expect(roster.status).toBe(200);
    const rows = roster.body as { profile_id: string; status: string | null; deferred_to: string | null }[];
    expect(rows.map((r) => r.profile_id).sort(), "the roster names the learner and active classmates, not the deferred one").toEqual(
      [learner.id, classmate.id].sort(),
    );
    expect(rows.find((r) => r.profile_id === classmate.id), "no status or deferral for a classmate").toMatchObject({ status: null, deferred_to: null });
    expect(rows.find((r) => r.profile_id === learner.id)?.status, "a learner sees their own status").toBe("active");
  } finally {
    await cleanUp({ people: [learner, classmate, deferred, other], cohorts });
  }
});

test("programme applicant: sees their application and cannot accept it themselves", async ({ page }) => {
  const applicant = await createLearner("Ayishetu Abukari");
  try {
    await seedApplication(applicant.id);
    await signInAs(page, applicant);
    await allowed(page, "/programme/apply", "Status");
    const token = await accessToken(applicant);
    refused(await api(token, "PATCH", `/rest/v1/cohort_applications?profile_id=eq.${applicant.id}`, { status: "accepted" }), "applicant accepts themselves");
    refused(await api(token, "POST", "/rest/v1/rpc/decide_application", { p_application_id: crypto.randomUUID(), p_decision: "accepted", p_cohort_id: null, p_note: null }), "applicant decides an application");
  } finally {
    await cleanUp({ people: [applicant] });
  }
});

test("cohort mentor: their cohort's learners open, another cohort's learner is a 404 (no IDOR)", async ({ page }) => {
  const mentor = await createLearner("Salifu Iddrisu");
  const mentee = await createLearner("Rahinatu Alhassan");
  const stranger = await createLearner("Abukari Sulemana");
  let cohorts: string[] = [];
  try {
    const mine = await seedCohort([
      { id: mentor.id, role: "mentor" },
      { id: mentee.id, role: "learner" },
    ]);
    const theirs = await seedCohort([{ id: stranger.id, role: "learner" }]);
    cohorts = [mine.id, theirs.id];
    await signInAs(page, mentor);
    await allowed(page, "/mentor", mine.name);
    await allowed(page, `/mentor/learners/${mine.memberIds[1]}`, "Rahinatu");
    await notFound(page, `/mentor/learners/${theirs.memberIds[0]}`, "Abukari");
    await allowed(page, `/certificates/issue?cohort=${mine.id}`, "Issue certificates");
    await notAdmin(page);

    const token = await accessToken(mentor);
    refused(await api(token, "POST", "/rest/v1/cohort_members", { cohort_id: mine.id, profile_id: stranger.id, role: "learner" }), "mentor enrols a learner");
    refused(await api(token, "POST", "/rest/v1/rpc/issue_certificate", { p_cohort_member_id: theirs.memberIds[0] }), "mentor certifies another cohort's learner");
    refused(await api(token, "GET", `/rest/v1/submissions?select=id&profile_id=eq.${stranger.id}`), "mentor reads another cohort's work");
    const roster = await api(token, "GET", `/rest/v1/cohort_roster?select=status&profile_id=eq.${mentee.id}`);
    expect(roster.body, "staff still see their learners' status (#250)").toEqual([{ status: "active" }]);
  } finally {
    await cleanUp({ people: [mentor, mentee, stranger], cohorts });
  }
});

test("expert pending: the dashboard opens, the public page does not, and they cannot approve themselves", async ({ page }) => {
  const expert = await createLearner("Zainab Mahama");
  try {
    const slug = await seedExpert(expert, { status: "pending" });
    await signInAs(page, expert);
    await allowed(page, "/expert", "Expert dashboard", "You are not an expert yet");
    await notFound(page, `/experts/${slug}`);
    const token = await accessToken(expert);
    refused(await api(token, "PATCH", `/rest/v1/expert_profiles?profile_id=eq.${expert.id}`, { status: "approved" }), "pending expert approves themselves");
    refused(await api(token, "PATCH", `/rest/v1/expert_profiles?profile_id=eq.${expert.id}`, { is_verified: true }), "pending expert verifies themselves");
  } finally {
    await cleanUp({ people: [expert] });
  }
});

test("expert approved: public page and open briefs, but no self verification", async ({ page }) => {
  const expert = await createLearner("Iddrisu Mohammed");
  try {
    const slug = await seedExpert(expert, { status: "approved" });
    await signInAs(page, expert);
    await allowed(page, "/expert", "Expert dashboard");
    await allowed(page, `/experts/${slug}`, "Iddrisu", "Verified by SydCrest");
    await allowed(page, "/briefs", "You see open briefs because you are an approved expert");
    const token = await accessToken(expert);
    refused(await api(token, "POST", "/rest/v1/rpc/admin_set_expert_flags", { p_profile_id: expert.id, p_is_verified: true, p_is_featured: true }), "expert features themselves");
  } finally {
    await cleanUp({ people: [expert] });
  }
});

test("expert verified: the public page carries the badge", async ({ page }) => {
  const expert = await createLearner("Hawa Seidu");
  try {
    const slug = await seedExpert(expert, { status: "approved", verified: true });
    await signInAs(page, expert);
    await allowed(page, `/experts/${slug}`, "Verified by SydCrest");
  } finally {
    await cleanUp({ people: [expert] });
  }
});

test("organisation roles: owner, admin, recruiter and invitee each get their own reach", async ({ page }) => {
  const owner = await createLearner("Mariama Seidu");
  const orgAdmin = await createLearner("Abdul-Rahman Yakubu");
  const recruiter = await createLearner("Wumpini Alhassan");
  const invitee = await createLearner("Fuseini Iddrisu");
  let orgId: string | undefined;
  try {
    const org = await seedOrganisation(owner, [
      { id: orgAdmin.id, role: "admin", status: "active" },
      { id: recruiter.id, role: "recruiter", status: "active" },
      { id: invitee.id, role: "recruiter", status: "invited" },
    ]);
    orgId = org.id;

    await test.step("owner", async () => {
      await signInAs(page, owner);
      await allowed(page, "/org", org.slug);
      await allowed(page, `/org/${org.slug}/manage`);
      await allowed(page, `/org/${org.slug}/team`);
      await allowed(page, "/talent", "Show talent");
      await notAdmin(page);
      const token = await accessToken(owner);
      refused(await api(token, "PATCH", `/rest/v1/organisations?id=eq.${org.id}`, { verification_status: "verified" }), "owner sets their own verification");
    });

    await test.step("admin", async () => {
      await signInAs(page, orgAdmin);
      await allowed(page, `/org/${org.slug}/team`);
      const token = await accessToken(orgAdmin);
      refused(await api(token, "PATCH", `/rest/v1/organisation_members?organisation_id=eq.${org.id}&profile_id=eq.${orgAdmin.id}`, { role: "owner" }), "org admin makes themselves owner");
      refused(await api(token, "DELETE", `/rest/v1/organisation_members?organisation_id=eq.${org.id}&profile_id=eq.${owner.id}`), "org admin removes the owner");
    });

    await test.step("recruiter", async () => {
      await signInAs(page, recruiter);
      await allowed(page, `/org/${org.slug}/opportunities`);
      const token = await accessToken(recruiter);
      refused(await api(token, "POST", "/rest/v1/organisation_members", { organisation_id: org.id, profile_id: invitee.id, role: "admin", invited_by: recruiter.id }), "recruiter invites an admin");
      refused(await api(token, "PATCH", `/rest/v1/organisations?id=eq.${org.id}`, { name: "Renamed by a recruiter" }), "recruiter edits the profile");
    });

    await test.step("invitee", async () => {
      await signInAs(page, invitee);
      await allowed(page, "/org", "Invitations");
      await notFound(page, `/org/${org.slug}/manage`);
      await allowed(page, "/talent", undefined, "Show talent");
      const token = await accessToken(invitee);
      const roster = await api(token, "GET", `/rest/v1/organisation_members?select=profile_id&organisation_id=eq.${org.id}`);
      expect(roster.body, "an invitee sees only their own membership").toEqual([{ profile_id: invitee.id }]);
    });
  } finally {
    await cleanUp({ people: [owner, orgAdmin, recruiter, invitee], orgs: orgId ? [orgId] : [] });
  }
});

test("chapter lead: lead tools and the moderation queue open, appointing leads does not", async ({ page }) => {
  const lead = await createLearner("Rahinatu Alhassan");
  const member = await createLearner("Sumaila Yakubu");
  const chapter = await seedChapter({ leads: [lead.id], members: [member.id] });
  const other = await seedChapter();
  try {
    await signInAs(page, lead);
    await allowed(page, `/chapters/${chapter.slug}`, "Edit the chapter page");
    await allowed(page, `/chapters/${other.slug}`, undefined, "Edit the chapter page");
    await allowed(page, "/community/moderation", "Reports on posts and replies in the groups you look after");
    await notAdmin(page);
    const token = await accessToken(lead);
    refused(await api(token, "PATCH", `/rest/v1/chapter_members?chapter_id=eq.${chapter.id}&profile_id=eq.${member.id}`, { role: "lead" }), "lead appoints another lead");
    refused(await api(token, "POST", "/rest/v1/chapter_members", { chapter_id: other.id, profile_id: lead.id, role: "lead" }), "lead makes themselves lead elsewhere");
    refused(await api(token, "POST", "/rest/v1/rpc/set_chapter_details", { p_chapter_id: other.id, p_summary: "Hijacked", p_whatsapp_url: null }), "lead edits another chapter");
  } finally {
    await deleteChapter(chapter.id).catch(() => undefined);
    await deleteChapter(other.id).catch(() => undefined);
    await cleanUp({ people: [lead, member] });
  }
});

test("platform admin: every admin and staff area opens", async ({ page }) => {
  const boss = await createLearner("Abdul-Rahman Yakubu");
  try {
    await promoteToAdmin(boss.id);
    await signInAs(page, boss);
    await allowed(page, "/admin", "Review programme applications and accept");
    for (const path of ["/admin/roadmaps", "/admin/applications", "/admin/funnel", "/admin/reports", "/admin/experts", "/admin/organisations"]) {
      await allowed(page, path);
    }
    for (const [path, text] of ADMIN_FORMS) await allowed(page, path, text);
    await allowed(page, "/mentor");
    await allowed(page, "/skills/reviews", "Portfolio reviews");
    await allowed(page, "/admin/skills/reviewers", "Appoint a reviewer");
    await allowed(page, "/admin", "Admin sections");
    // An admin may always issue; with or without cohorts the page opens (no 404, #252).
    await allowed(page, "/certificates/issue", "Issue certificates");
    await allowed(page, "/community/moderation", "Reports on posts and replies in the groups you look after");
  } finally {
    await cleanUp({ people: [boss] });
  }
});

test("skill reviewer: appointed by an admin, reaches portfolio reviews from the Learn menu", async ({ page }) => {
  const reviewer = await createLearner("Hawa Mahama");
  try {
    await makeSkillReviewer(reviewer);
    await signInAs(page, reviewer);
    await allowed(page, "/skills/reviews", "Portfolio reviews");
    await allowed(page, "/learn", 'href="/skills/reviews"');
    await notFound(page, "/admin/skills/reviewers", "Appoint a reviewer");
    await notAdmin(page);
    const token = await accessToken(reviewer);
    const other = await createLearner("Mohammed Issah");
    try {
      refused(await api(token, "POST", "/rest/v1/rpc/admin_set_skill_reviewer", { p_profile_id: other.id, p_reviewer: true }), "a reviewer appoints another reviewer");
    } finally {
      await cleanUp({ people: [other] });
    }
  } finally {
    await cleanUp({ people: [reviewer] });
  }
});

test("follow graph: visible between two public profiles, private follows only to the two people (D7)", async () => {
  const wumpini = await createLearner("Wumpini Alhassan");
  const mariama = await createLearner("Mariama Seidu");
  const fuseini = await createLearner("Fuseini Mahama");
  const ayishetu = await createLearner("Ayishetu Abukari");
  try {
    await makePublic(wumpini);
    await makePublic(mariama);
    await seedFollow(wumpini, mariama); // both public
    await seedFollow(fuseini, wumpini); // Fuseini is private
    const ids = [wumpini.id, mariama.id, fuseini.id].join(",");
    const graph = `/rest/v1/follows?select=follower_id,following_id&follower_id=in.(${ids})`;

    const bystander = await api(await accessToken(ayishetu), "GET", graph);
    expect(bystander.body, "a bystander sees only the public follow").toEqual([{ follower_id: wumpini.id, following_id: mariama.id }]);
    const followed = (await api(await accessToken(wumpini), "GET", graph)).body as unknown[];
    expect(followed, "the followed person sees the private follower").toHaveLength(2);
    refused(await api(await accessToken(mariama), "GET", `/rest/v1/follows?select=follower_id&follower_id=eq.${fuseini.id}`), "another public person reads a private person's follows");
  } finally {
    await cleanUp({ people: [wumpini, mariama, fuseini, ayishetu] });
  }
});

test("re-agreeing after revoking consent: no date of birth asked, the 18 or over tick, then Home (#251, D1)", async ({ page }) => {
  const learner = await createLearner("Abdul-Rahman Yakubu");
  try {
    await signInAs(page, learner);
    const token = await accessToken(learner);
    const revoked = await api(token, "POST", "/rest/v1/rpc/revoke_consent", { p_kind: "terms" });
    expect(revoked.status).toBe(200);
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/welcome/);
    await expect(page.getByRole("heading", { name: "One more step" })).toBeVisible();
    await expect(page.getByLabel("Date of birth")).toHaveCount(0);
    await page.getByLabel(/I agree to the Terms and Privacy Policy/).check();
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.getByText("Tick the box to confirm you are 18 or over.")).toBeVisible();
    await page.getByLabel("I confirm I am 18 or over").check();
    await page.getByLabel(/I agree to the Terms and Privacy Policy/).check();
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    const consents = await api(token, "GET", "/rest/v1/consents?select=kind&revoked_at=is.null&order=kind");
    expect((consents.body as { kind: string }[]).map((c) => c.kind), "the tick is recorded with the consent records").toEqual(
      expect.arrayContaining(["age_confirmation", "privacy", "terms"]),
    );
  } finally {
    await cleanUp({ people: [learner] });
  }
});

test("an email sign up's 18 or over tick lands in the consent records on the first signed in request (D1)", async ({ page }) => {
  const email = `mariama.age.${crypto.randomUUID().slice(0, 8)}@example.test`;
  // As signUp leaves it: the ticks wait in metadata until there is a session.
  const { id } = await admin<{ id: string }>("/auth/v1/admin/users", {
    method: "POST",
    body: {
      email,
      password: PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: "Mariama Abukari", date_of_birth: "2000-03-14", terms_version: "e2e", age_confirmed_at: new Date().toISOString() },
    },
  });
  const person = { id, email, name: "Mariama Abukari" };
  try {
    await signInAs(page, person);
    const consents = await api(await accessToken(person), "GET", "/rest/v1/consents?select=kind&revoked_at=is.null");
    expect((consents.body as { kind: string }[]).map((c) => c.kind).sort()).toEqual(["age_confirmation", "privacy", "terms"]);
  } finally {
    await cleanUp({ people: [person] });
  }
});
