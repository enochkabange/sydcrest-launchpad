import "server-only";
import { cache } from "react";
import { getCurrentUser } from "@/lib/auth";
import { chooseTrack, starterFor } from "@/lib/path/recommend";
import { latestSavedAnswers } from "@/lib/path/server";
import { createClient } from "@/lib/supabase/server";
import { OPPORTUNITY_COLUMNS, type Opportunity } from "./model";

/**
 * A signed in learner's own view of the board: their saved and applied
 * markers (private under RLS) and the tracks their path points at. Reads
 * the session, so callers sit inside <Suspense>.
 */

export type SaveStatus = "saved" | "applied";
export type SavedOpportunity = { status: SaveStatus; applied_at: string | null; created_at: string; opportunity: Opportunity };

/** The viewer, or null when signed out or still to finish the age and terms step. */
export const getViewer = cache(async () => {
  const user = await getCurrentUser();
  return user?.hasAgeAndConsent ? user : null;
});

/** opportunity id to status, for marking cards and the detail page. */
export const getMySaveMap = cache(async (): Promise<Map<string, SaveStatus>> => {
  const viewer = await getViewer();
  if (!viewer) return new Map();
  const supabase = await createClient();
  const { data, error } = await supabase.from("opportunity_saves").select("opportunity_id, status").eq("profile_id", viewer.id);
  if (error) console.error("getMySaveMap failed", { message: error.message });
  return new Map((data ?? []).map((s) => [s.opportunity_id, s.status as SaveStatus]));
});

/**
 * Everything the learner saved, newest first, with the opportunity. A post
 * that has since closed or passed its deadline is no longer readable under
 * RLS and drops out of the list, which is what the learner should see.
 */
export async function getMySavedOpportunities(profileId: string): Promise<SavedOpportunity[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("opportunity_saves")
    .select(`status, applied_at, created_at, opportunities(${OPPORTUNITY_COLUMNS})`)
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Could not load saved opportunities: ${error.message}`);
  return (data ?? []).flatMap((row) =>
    row.opportunities
      ? [{ status: row.status as SaveStatus, applied_at: row.applied_at, created_at: row.created_at, opportunity: row.opportunities }]
      : [],
  );
}

/**
 * The tracks to match on: the path's recommended track, then its starter
 * track when there is one. Null when the learner has not taken the quiz.
 * Verified skills join this in #158.
 */
export async function getPathTracks(profileId: string): Promise<string[] | null> {
  const answers = await latestSavedAnswers(profileId);
  if (!answers) return null;
  const { track } = chooseTrack(answers);
  const starter = starterFor(answers, track);
  return starter ? [track, starter.track] : [track];
}
