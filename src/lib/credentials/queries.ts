import "server-only";
import { cache } from "react";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import { CREDENTIALS_BUCKET, type ExternalCredential } from "./model";

/**
 * Request time reads for the credentials wallet (issue #253). Public reads
 * use the cookie free anon client, so a page shows a signed in viewer
 * exactly what a stranger sees (RLS: public, not hidden credentials of public
 * profiles). Files are private; each read signs fresh short lived URLs.
 */

const COLUMNS =
  "id, profile_id, title, issuer_name, issued_on, expires_on, credential_id, verification_url, file_path, visibility, source, verification, verified_at, verification_note, hidden_at, created_at";

/** Signed URLs for attached files live for an hour; pages are request time. */
const SIGNED_URL_SECONDS = 3600;

type Client = Awaited<ReturnType<typeof createClient>> | Awaited<ReturnType<typeof createPublicClient>>;

async function withFileUrls(supabase: Client, rows: Omit<ExternalCredential, "file_url">[]): Promise<ExternalCredential[]> {
  const paths = rows.map((r) => r.file_path).filter((p): p is string => !!p);
  const urls = new Map<string, string>();
  if (paths.length) {
    const { data } = await supabase.storage.from(CREDENTIALS_BUCKET).createSignedUrls(paths, SIGNED_URL_SECONDS);
    for (const item of data ?? []) if (item.path && item.signedUrl) urls.set(item.path, item.signedUrl);
  }
  return rows.map((r) => ({ ...r, file_url: r.file_path ? (urls.get(r.file_path) ?? null) : null }));
}

function sortCredentials<T extends { issued_on: string | null; created_at: string }>(rows: T[]) {
  return [...rows].sort((a, b) => (b.issued_on ?? b.created_at).localeCompare(a.issued_on ?? a.created_at));
}

/** Public, not hidden external credentials on a public profile. Empty otherwise. */
export const getPublicExternalCredentials = cache(async (profileId: string): Promise<ExternalCredential[]> => {
  const supabase = await createPublicClient();
  const { data, error } = await supabase.from("external_credentials").select(COLUMNS).eq("profile_id", profileId);
  if (error) throw new Error(`Could not load credentials: ${error.message}`);
  return withFileUrls(supabase, sortCredentials(data ?? []));
});

/** One public credential with its owner's public name, for share cards. */
export const getSharedCredential = cache(async (id: string) => {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const supabase = await createPublicClient();
  const { data } = await supabase.from("external_credentials").select(COLUMNS).eq("id", id).maybeSingle();
  if (!data) return null;
  const { data: owner } = await supabase.from("public_profiles").select("display_name, public_slug").eq("id", data.profile_id).maybeSingle();
  if (!owner?.public_slug) return null;
  return { credential: data, owner };
});

/** The signed in person's own credentials, every one, with file links. */
export const getMyExternalCredentials = cache(async (): Promise<ExternalCredential[]> => {
  const user = await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase.from("external_credentials").select(COLUMNS).eq("profile_id", user.id);
  if (error) throw new Error(`Could not load your credentials: ${error.message}`);
  return withFileUrls(supabase, sortCredentials(data ?? []));
});
