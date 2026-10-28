import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Finds a person's profile id by their sign in email, for an admin adding a
 * mentor or coordinator. Email lives only in auth.users, so this calls
 * admin_find_profile_by_email with the admin's own session: the database
 * checks the caller is an admin (42501 otherwise) and returns the id and
 * display name, never the email. Callers still check requireAdmin first.
 */
export async function findUserIdByEmail(supabase: SupabaseClient<Database>, email: string): Promise<string | null> {
  const { data, error } = await supabase.rpc("admin_find_profile_by_email", { p_email: email.trim() });
  if (error) throw new Error(`Could not look up users: ${error.message}`);
  return data?.[0]?.id ?? null;
}
