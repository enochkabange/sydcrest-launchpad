import "server-only";
import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import type { Database } from "@/lib/supabase/database.types";
import { OPPORTUNITY_COLUMNS, accraToday, secondsToAccraMidnight, sortForBoard, type Opportunity } from "./model";

/**
 * Open opportunities for the public board and detail pages, cached with
 * `use cache`. Reads are anonymous (publishable key, no cookies), so row
 * level security returns only open posts before their deadline, and drafts
 * never reach these pages.
 *
 * The cache expires at the next Accra midnight, so a post disappears the
 * day after its deadline even with no edits; admin edits refresh it at once
 * (revalidateOpportunities).
 */

export const OPPORTUNITIES_TAG = "opportunities";

function anonClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } },
  );
}

/** Until Accra midnight, at most an hour between background refreshes. */
function untilMidnight() {
  const expire = Math.max(300, secondsToAccraMidnight());
  cacheLife({ stale: 300, revalidate: Math.min(3600, expire - 1), expire });
}

/** At build time (no database in CI) a failed read is empty; at runtime it throws and is not cached. */
async function guarded<T>(what: string, empty: T, run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (process.env.NEXT_PHASE === "phase-production-build") {
      console.warn(`Opportunities: could not load ${what} at build time (${message}); rendering on demand.`);
      return empty;
    }
    throw new Error(`Could not load ${what}: ${message}`);
  }
}

/** Every open opportunity, soonest deadline first. The board filters this list. */
export async function getOpenOpportunities(): Promise<Opportunity[]> {
  "use cache";
  untilMidnight();
  cacheTag(OPPORTUNITIES_TAG);

  return guarded("opportunities", [], async () => {
    const { data, error } = await anonClient()
      .from("opportunities")
      .select(OPPORTUNITY_COLUMNS)
      .eq("status", "open")
      .or(`deadline.is.null,deadline.gte.${accraToday()}`)
      .limit(500);
    if (error) throw new Error(error.message);
    return sortForBoard(data ?? []);
  });
}

/** One open opportunity by slug, or null when it is a draft, closed, past its deadline or missing. */
export async function getOpenOpportunity(slug: string): Promise<Opportunity | null> {
  "use cache";
  untilMidnight();
  cacheTag(OPPORTUNITIES_TAG);

  return guarded("opportunity", null, async () => {
    const { data, error } = await anonClient()
      .from("opportunities")
      .select(OPPORTUNITY_COLUMNS)
      .eq("slug", slug)
      .eq("status", "open")
      .or(`deadline.is.null,deadline.gte.${accraToday()}`)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  });
}

/**
 * Today's Accra date for prerendered pages ("Closes tomorrow"), cached until
 * Accra midnight like the posts themselves, since a prerender may not read
 * the clock directly.
 */
export async function getAccraToday(): Promise<string> {
  "use cache";
  untilMidnight();
  return accraToday();
}
