import "server-only";
import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import type { Database } from "@/lib/supabase/database.types";
import { summariseImpact, type ImpactSummary } from "./stats";

/** Tag on the cached public impact numbers; see revalidateOutcomeStats. */
export const OUTCOME_STATS_TAG = "outcome-stats";

/**
 * Verified outcome counts for the public /impact page, from
 * public.public_outcome_stats (counts by type, never names). Read anonymously
 * with the publishable key so the result can be cached and prerendered for
 * everyone. At build time without a database it returns an empty summary
 * (the page then shows its honest empty state until the next refresh); at
 * runtime an error throws and is never cached.
 */
export async function getImpactSummary(): Promise<ImpactSummary> {
  "use cache";
  cacheLife("hours");
  cacheTag(OUTCOME_STATS_TAG);

  try {
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } },
    );
    const { data, error } = await supabase.from("public_outcome_stats").select("type, verified_count, verified_people");
    if (error) throw new Error(error.message);
    return summariseImpact(data ?? []);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (process.env.NEXT_PHASE === "phase-production-build") {
      console.warn(`Impact: could not load outcome stats at build time (${message}).`);
      return summariseImpact([]);
    }
    throw new Error(`Could not load outcome stats: ${message}`);
  }
}
