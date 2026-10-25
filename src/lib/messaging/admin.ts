import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Service role Supabase client for jobs and webhooks with no user session.
 * Bypasses RLS: only use it in server code that has already authenticated
 * the caller (cron secret, Twilio signature). Null when SUPABASE_SECRET_KEY
 * is not set. Lives here for now; hoist to src/lib/supabase when another
 * feature needs it.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

export type AdminClient = NonNullable<ReturnType<typeof createAdminClient>>;
