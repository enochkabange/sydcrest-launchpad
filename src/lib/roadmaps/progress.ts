import "server-only";
import { cache } from "react";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { ProgressStatus } from "./tree";

/**
 * The signed in learner's node statuses, or null for visitors. Request time
 * (reads cookies), so callers sit inside <Suspense>. Deduplicated per request
 * so every progress mark on a page shares one query. RLS returns only the
 * learner's own rows.
 */
export const getMyProgress = cache(async (): Promise<Map<string, ProgressStatus> | null> => {
  const user = await getCurrentUser();
  if (!user) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.from("roadmap_progress").select("node_id, status");
  // Progress marks are a nicety on a public page; never fail the page over them.
  if (error) return new Map();
  return new Map(data.map((row) => [row.node_id, row.status as ProgressStatus]));
});
