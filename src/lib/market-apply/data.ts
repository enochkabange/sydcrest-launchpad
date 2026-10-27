import "server-only";
import { cache } from "react";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { ApplicationStatus, ExpertStatus } from "./expert";

/**
 * The signed in user's expert profile and latest application. Reads the
 * session, so callers sit inside <Suspense>. RLS limits both to the owner.
 */
export const getMyExpertState = cache(async () => {
  const user = await requireUser();
  const supabase = await createClient();
  const [{ data: expert, error: expertError }, { data: applications, error: appError }] = await Promise.all([
    supabase.from("expert_profiles").select("*").eq("profile_id", user.id).maybeSingle(),
    supabase
      .from("expert_applications")
      .select("id, motivation, experience, evidence_links, fast_track, status, decision_note, decided_at, created_at")
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1),
  ]);
  if (expertError) throw new Error(`Could not load your expert profile: ${expertError.message}`);
  if (appError) throw new Error(`Could not load your application: ${appError.message}`);
  const latest = applications?.[0] ?? null;
  return {
    user,
    expert: expert ? { ...expert, status: expert.status as ExpertStatus } : null,
    application: latest ? { ...latest, status: latest.status as ApplicationStatus } : null,
  };
});

/** Postgres error codes the expert forms turn into plain words. */
export const PG = {
  uniqueViolation: "23505",
  checkViolation: "23514",
  rlsViolation: "42501",
} as const;

export const ADULTS_ONLY_MESSAGE =
  "The expert market is for adults aged 18 and over. If you are 18 or over, check the date of birth on your account and try again.";
