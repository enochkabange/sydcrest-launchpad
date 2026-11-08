"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export type StoryState = { error?: string; saved?: boolean; values?: { story: string; show_name: boolean } };

const STORY_MIN = 40;
const STORY_MAX = 1500;

/** Saves the learner's story for sponsors (#307). Only sponsors of their cohort, programme or chapter see it. */
export async function saveStory(_prev: StoryState, form: FormData): Promise<StoryState> {
  const user = await requireUser();
  const story = typeof form.get("story") === "string" ? (form.get("story") as string).trim() : "";
  const show_name = form.get("show_name") === "on";
  const values = { story, show_name };
  if (story.length < STORY_MIN) return { error: `Write at least ${STORY_MIN} characters.`, values };
  if (story.length > STORY_MAX) return { error: `Keep it under ${STORY_MAX} characters.`, values };
  const supabase = await createClient();
  const { data: existing } = await supabase.from("learner_stories").select("profile_id").eq("profile_id", user.id).maybeSingle();
  const { error } = existing
    ? await supabase.from("learner_stories").update({ story, show_name }).eq("profile_id", user.id)
    : await supabase.from("learner_stories").insert({ story, show_name });
  if (error) {
    console.error("story save failed", { code: error.code, message: error.message });
    return { error: "We couldn't save your story. Try again.", values };
  }
  revalidatePath("/profile");
  return { saved: true, values };
}

/** Withdraws the story: sponsors no longer see it. */
export async function deleteStory() {
  const user = await requireUser();
  const supabase = await createClient();
  const { error } = await supabase.from("learner_stories").delete().eq("profile_id", user.id);
  if (error) throw new Error(`Could not remove the story: ${error.message}`);
  revalidatePath("/profile");
}
