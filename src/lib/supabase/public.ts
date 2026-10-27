import "server-only";
import { createClient } from "@supabase/supabase-js";
import { connection } from "next/server";
import type { Database } from "./database.types";

/**
 * A cookie free client for public reads (public profiles, achievements,
 * leaderboards) and anonymous writes (waitlist sign ups). It acts as the anon
 * role whoever is viewing, so a page can never show a signed in viewer more
 * than a stranger would see.
 */
export async function createPublicClient() {
  await connection();
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
