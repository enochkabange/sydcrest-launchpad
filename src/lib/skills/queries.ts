import "server-only";
import { cache } from "react";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import type { Attempt } from "./assessment";
import { fromVerifiedSkillRows } from "./verified";

/**
 * Request time reads for verified skills. Public reads use the cookie free
 * anon client, so a page shows a signed in viewer exactly what a stranger
 * sees (RLS: live badges of public profiles, published skills only). The
 * learner's own reads use their session and must sit inside <Suspense>.
 */

const VERIFIED_COLUMNS = "id, source, issued_at, revoked_at, skill:skills(slug, name)";

/** Live verified skills on a public profile. Empty for private profiles. */
export const getPublicVerifiedSkills = cache(async (profileId: string) => {
  const supabase = await createPublicClient();
  const { data, error } = await supabase
    .from("verified_skills")
    .select(VERIFIED_COLUMNS)
    .eq("profile_id", profileId)
    .is("revoked_at", null);
  if (error) throw new Error(`Could not load verified skills: ${error.message}`);
  return fromVerifiedSkillRows(data ?? []);
});

/** The signed in person's live verified skills. */
export const getMyVerifiedSkills = cache(async () => {
  const user = await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("verified_skills")
    .select(VERIFIED_COLUMNS)
    .eq("profile_id", user.id)
    .is("revoked_at", null);
  if (error) throw new Error(`Could not load your verified skills: ${error.message}`);
  return fromVerifiedSkillRows(data ?? []);
});

const ATTEMPT_COLUMNS = "id, assessment_id, kind, status, score, portfolio_url, review_note, reviewed_at, submitted_at";

/** The signed in person's attempts at one skill's assessments, newest first. */
export const getMyAttempts = cache(async (skillId: string): Promise<Attempt[]> => {
  const user = await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skill_assessment_attempts")
    .select(ATTEMPT_COLUMNS)
    .eq("profile_id", user.id)
    .eq("skill_id", skillId)
    .order("submitted_at", { ascending: false })
    .limit(50);
  if (error) throw new Error(`Could not load your attempts: ${error.message}`);
  return data ?? [];
});

/** Portfolios the signed in person has waiting for review, with the skill. */
export const getMyPendingPortfolios = cache(async () => {
  const user = await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skill_assessment_attempts")
    .select("id, submitted_at, skill:skills(slug, name)")
    .eq("profile_id", user.id)
    .eq("status", "pending_review")
    .order("submitted_at", { ascending: false });
  if (error) throw new Error(`Could not load your submissions: ${error.message}`);
  return (data ?? []).flatMap((r) => (r.skill ? [{ id: r.id, submittedAt: r.submitted_at, skill: r.skill }] : []));
});

/**
 * Whether the signed in person reviews skill portfolios: an admin, or someone
 * an admin appointed (profiles.is_skill_reviewer, issue #248). The legacy
 * profiles.role 'mentor' still counts, as in private.is_skill_reviewer.
 */
export const getMyReviewerStatus = cache(async () => {
  const user = await requireUser();
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("role, is_skill_reviewer").eq("id", user.id).single();
  return { userId: user.id, reviewer: isSkillReviewer(data) };
});

export const isSkillReviewer = (profile: { role: string; is_skill_reviewer: boolean } | null | undefined) =>
  Boolean(profile && (profile.is_skill_reviewer || profile.role === "mentor" || profile.role === "admin"));
