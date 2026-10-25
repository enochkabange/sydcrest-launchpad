/**
 * Service role access to the LOCAL Supabase stack, for seeding test data.
 * CI puts the local stack's secret key in SUPABASE_SECRET_KEY for the E2E
 * step only. Never point this at a hosted project, and never import it from
 * app code.
 */
const API = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "http://127.0.0.1:54321";

function secretKey() {
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!key) throw new Error("SUPABASE_SECRET_KEY is not set (the local stack's secret key, from `supabase status`).");
  if (!/^https?:\/\/(127\.0\.0\.1|localhost)[:/]/.test(API)) throw new Error(`Refusing to seed a non local Supabase at ${API}.`);
  return key;
}

export async function admin<T = unknown>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const key = secretKey();
  const res = await fetch(`${API}${path}`, {
    method: init.method ?? "GET",
    headers: {
      apikey: key,
      // Legacy JWT keys also need the bearer header; sb_secret_ keys must not use it.
      ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}),
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${init.method ?? "GET"} ${path} failed with ${res.status}: ${text}`);
  return (text ? JSON.parse(text) : null) as T;
}

/**
 * Insert rows through PostgREST and return them in order. One request per
 * row: a bulk insert needs every row to have the same keys, and leaving a
 * key out is how a row gets the column default.
 */
export async function insert<T extends Record<string, unknown>>(table: string, rows: Record<string, unknown>[]) {
  const out: (T & { id: string })[] = [];
  for (const row of rows) {
    const [created] = await admin<(T & { id: string })[]>(`/rest/v1/${table}`, { method: "POST", body: row });
    out.push(created);
  }
  return out;
}
