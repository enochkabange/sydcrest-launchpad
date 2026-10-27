import "server-only";
import { createClient } from "@supabase/supabase-js";
import { cacheLife } from "next/cache";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Approved expert slugs for the sitemap, cached for an hour (a sitemap can
 * lag; the pages themselves read at request time). The CI build has no
 * database, so a failed read at build time is an empty list.
 */
export async function getExpertSitemapEntries(): Promise<{ slug: string; approvedAt: string | null }[]> {
  "use cache";
  cacheLife("hours");
  try {
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } },
    );
    const { data, error } = await supabase.from("public_experts").select("slug, approved_at");
    if (error) throw new Error(error.message);
    return (data ?? []).flatMap((r) => (r.slug ? [{ slug: r.slug, approvedAt: r.approved_at }] : []));
  } catch (error) {
    if (process.env.NEXT_PHASE === "phase-production-build") return [];
    throw error;
  }
}
