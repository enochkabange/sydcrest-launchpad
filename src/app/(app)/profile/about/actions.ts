"use server";

import { refresh } from "next/cache";
import { trackMany, trackRefusal } from "@/lib/analytics/track";
import { requireUser } from "@/lib/auth";
import { answeredCount, changedFields, fromRow, parseLearnerProfile, type LearnerProfile } from "@/lib/learner-profile";
import { createClient } from "@/lib/supabase/server";
import { classifyError, errorCode } from "@/lib/analytics/refusal";

export type AboutState = { message?: string; saved?: { profile: LearnerProfile; at: number } };

/** Saves the learner profile (every answer optional) and records which fields changed, never the answers. */
export async function saveLearnerProfile(_prev: AboutState, form: FormData): Promise<AboutState> {
  const user = await requireUser();
  const profile = parseLearnerProfile(form);
  const supabase = await createClient();
  const { data: before } = await supabase.from("learner_profiles").select("*").eq("profile_id", user.id).maybeSingle();
  const { error } = await supabase.from("learner_profiles").upsert({ profile_id: user.id, ...profile });
  if (error) {
    await trackRefusal("learner_profile_saved", classifyError(error), errorCode(error));
    return { message: "We couldn't save your answers. Try again." };
  }
  const changed = changedFields(fromRow(before), profile);
  await trackMany([
    { name: "learner_profile_saved", props: { answered: answeredCount(profile), changed: changed.length } },
    ...changed.map((field) => ({ name: "profile_field_updated" as const, props: { field } })),
  ]);
  refresh();
  return { saved: { profile, at: Date.now() } };
}
