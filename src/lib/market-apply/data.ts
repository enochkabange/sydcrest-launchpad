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

export { ADULTS_ONLY_MESSAGE, PG } from "./expert";
