import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Service role client for the two writes learners may not make themselves:
 * inserting into personalized_paths and minting achievements
 * (docs/data-model.md). Server only; never import from a Client Component.
 * Returns null when SUPABASE_SECRET_KEY is not configured, so callers can
 * degrade to showing an unsaved result.
 */
export function createServiceClient() {
  const key = process.env.SUPABASE_SECRET_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!key || !url) return null;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
