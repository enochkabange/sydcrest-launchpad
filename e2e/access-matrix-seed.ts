/**
 * Seeds for the access matrix (issue #240): one person per user type, created
 * through the LOCAL stack's secret key only (see supabase-admin.ts). Every
 * helper returns what it made so the test can remove it afterwards.
 */
import { createLearner, PASSWORD, promoteToAdmin, type Learner } from "./learners";
import { admin, insert } from "./supabase-admin";

export { createLearner, promoteToAdmin, PASSWORD, type Learner };

const SUPABASE = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "http://127.0.0.1:54321";
const PUBLISHABLE = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

const tag = () => crypto.randomUUID().slice(0, 8);
const today = () => new Date().toISOString().slice(0, 10);

export async function dmpProgrammeId(): Promise<string> {
  const [program] = await admin<{ id: string }[]>("/rest/v1/programs?slug=eq.dmp&select=id");
  if (!program) throw new Error("The DMP programme is missing: run supabase db reset to apply the seed migration.");
  return program.id;
}

/** A running DMP cohort with the given people in it. Returns the cohort and each membership id. */
export async function seedCohort(people: { id: string; role: "learner" | "mentor" | "coordinator" }[]) {
  const [cohort] = await insert<{ name: string }>("cohorts", [
    { program_id: await dmpProgrammeId(), name: `Access cohort ${tag()}`, starts_on: today(), max_size: 20, status: "running" },
  ]);
  const members = await insert<{ profile_id: string }>(
    "cohort_members",
    people.map((p) => ({ cohort_id: cohort.id, profile_id: p.id, role: p.role })),
  );
  return { id: cohort.id, name: cohort.name, memberIds: members.map((m) => m.id) };
}

export async function seedApplication(profileId: string) {
  await insert("cohort_applications", [{ program_id: await dmpProgrammeId(), profile_id: profileId, status: "submitted" }]);
}

export async function seedExpert(person: Learner, opts: { status: "pending" | "approved"; verified?: boolean }) {
  const slug = `${person.name.split(" ")[0].toLowerCase()}-access-${tag()}`;
  const now = new Date().toISOString();
  await insert("expert_profiles", [
    {
      profile_id: person.id,
      slug,
      headline: "Spreadsheets and reporting for small businesses in Tamale",
      status: opts.status,
      approved_at: opts.status === "approved" ? now : null,
      is_verified: Boolean(opts.verified),
      verified_at: opts.verified ? now : null,
    },
  ]);
  if (opts.status === "pending") {
    await insert("expert_applications", [{ profile_id: person.id, motivation: "I teach Excel to traders at Aboabo market." }]);
  }
  return slug;
}

/** A verified organisation owned by `owner` (the trigger adds the creator as owner), plus extra members. */
export async function seedOrganisation(
  owner: Learner,
  members: { id: string; role: "admin" | "recruiter"; status: "active" | "invited" }[] = [],
) {
  const slug = `savanna-access-${tag()}`;
  const [org] = await insert("organisations", [
    {
      slug,
      name: `Savanna Agro ${slug.slice(-8)}`,
      kind: "business",
      region: "northern",
      created_by: owner.id,
      verification_status: "verified",
      verified_at: new Date().toISOString(),
    },
  ]);
  if (members.length) {
    await insert(
      "organisation_members",
      members.map((m) => ({
        organisation_id: org.id,
        profile_id: m.id,
        role: m.role,
        status: m.status,
        invited_by: owner.id,
        joined_at: m.status === "active" ? new Date().toISOString() : null,
      })),
    );
  }
  return { id: org.id, slug };
}

export async function seedPath(profileId: string) {
  await insert("personalized_paths", [
    {
      profile_id: profileId,
      quiz_answers: {
        v: 1,
        interests: ["data"],
        confidence: "some",
        experience: "none",
        goal: "first-job",
        hours: "3-6",
        device: "own-computer",
        data: "okay",
      },
    },
  ]);
}

/** Best effort clean up: organisations and cohorts first (they reference people), then the people. */
export async function cleanUp(opts: { people?: (Learner | undefined)[]; orgs?: string[]; cohorts?: string[]; chapters?: string[] }) {
  for (const id of opts.orgs ?? []) await admin(`/rest/v1/organisations?id=eq.${id}`, { method: "DELETE" }).catch(() => undefined);
  for (const id of opts.cohorts ?? []) await admin(`/rest/v1/cohorts?id=eq.${id}`, { method: "DELETE" }).catch(() => undefined);
  for (const id of opts.chapters ?? []) await admin(`/rest/v1/chapters?id=eq.${id}`, { method: "DELETE" }).catch(() => undefined);
  await Promise.all(
    (opts.people ?? []).flatMap((p) => (p ? [admin(`/auth/v1/admin/users/${p.id}`, { method: "DELETE" }).catch(() => undefined)] : [])),
  );
}

/** A real sign in through the Auth API, for calling PostgREST as that person. */
export async function accessToken(person: Learner): Promise<string> {
  const res = await fetch(`${SUPABASE}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: PUBLISHABLE, "Content-Type": "application/json" },
    body: JSON.stringify({ email: person.email, password: PASSWORD }),
  });
  if (!res.ok) throw new Error(`sign in for ${person.email} failed: ${res.status} ${await res.text()}`);
  return ((await res.json()) as { access_token: string }).access_token;
}

export type ApiResult = { status: number; body: unknown };

/** PostgREST or Auth as `token` (null: a signed out visitor with the publishable key only). */
export async function api(token: string | null, method: string, path: string, body?: unknown): Promise<ApiResult> {
  const res = await fetch(`${SUPABASE}${path}`, {
    method,
    headers: {
      apikey: PUBLISHABLE,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  let parsed: unknown = text;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    // Keep the raw text.
  }
  return { status: res.status, body: parsed };
}
