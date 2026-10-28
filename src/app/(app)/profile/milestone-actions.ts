"use server";

import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export type MilestonePostsState = { enabled?: boolean; message?: string; saved?: number };

/** Turns automatic milestone posts on or off for the signed in learner only. */
export async function setMilestonePosts(_prev: MilestonePostsState, form: FormData): Promise<MilestonePostsState> {
  // Re-check the session inside the action; never trust the form for identity.
  const user = await requireUser();
  const want = form.get("milestone_posts") === "on";
  const supabase = await createClient();
  const { error } = await supabase.from("profiles").update({ milestone_posts: want }).eq("id", user.id);
  if (error) return { enabled: !want, message: "We couldn't save your choice. Try again." };
  return { enabled: want, saved: Date.now() };
}
