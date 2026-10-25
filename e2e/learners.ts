/**
 * Test setup through the LOCAL Supabase stack with the secret key: create
 * confirmed learners and promote admins. Never point this at hosted projects.
 */
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "http://127.0.0.1:54321";
const KEY = process.env.SUPABASE_SECRET_KEY ?? "";

export const PASSWORD = "Tamale-2027-pilot";

function headers() {
  if (!KEY) throw new Error("SUPABASE_SECRET_KEY is not set (supabase status -o json | jq -r .SECRET_KEY)");
  return { apikey: KEY, "Content-Type": "application/json" };
}

export type Learner = { id: string; email: string; name: string };

/** A confirmed adult learner who has agreed to the terms, ready to sign in. */
export async function createLearner(name: string): Promise<Learner> {
  const email = `${name.split(" ")[0].toLowerCase()}.${crypto.randomUUID().slice(0, 8)}@example.test`;
  const res = await fetch(`${URL}/auth/v1/admin/users`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      email,
      password: PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: name, date_of_birth: "2000-03-14", terms_version: "e2e" },
    }),
  });
  if (!res.ok) throw new Error(`createLearner failed: ${res.status} ${await res.text()}`);
  const { id } = (await res.json()) as { id: string };
  return { id, email, name };
}

export async function promoteToAdmin(id: string) {
  const res = await fetch(`${URL}/rest/v1/profiles?id=eq.${id}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ role: "admin" }),
  });
  if (!res.ok) throw new Error(`promoteToAdmin failed: ${res.status} ${await res.text()}`);
}

/** Mints a streak achievement the way server code does, and returns its id. */
export async function mintStreak(profileId: string, days: number): Promise<string> {
  const mint = await fetch(`${URL}/rest/v1/rpc/mint_achievement`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ p_profile_id: profileId, p_type: "streak", p_ref_id: String(days) }),
  });
  if (!mint.ok) throw new Error(`mint_achievement failed: ${mint.status} ${await mint.text()}`);
  const res = await fetch(`${URL}/rest/v1/achievements?profile_id=eq.${profileId}&type=eq.streak&select=id`, {
    headers: headers(),
  });
  const rows = (await res.json()) as { id: string }[];
  return rows[0].id;
}
