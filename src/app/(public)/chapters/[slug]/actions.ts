"use server";

import { trackResult } from "@/lib/analytics/track";
import { refresh } from "next/cache";
import { requireUser } from "@/lib/auth";
import { parseChapterDetails } from "@/lib/chapters/model";
import { revalidateChapters } from "@/lib/chapters/public";
import { createClient } from "@/lib/supabase/server";

/**
 * Chapter membership and lead tools. Every action re-checks the user, and row
 * level security decides the rest: learners join launching or active
 * chapters as members and leave; leads remove members (never other leads)
 * and edit the summary and link through set_chapter_details. Ids come from
 * bound arguments or hidden fields, so they are only ever used as filters.
 */

export type ActionState = {
  error?: string;
  saved?: number;
  errors?: Record<string, string | undefined>;
  /** What was sent, so a form that comes back with an error keeps the text (React resets forms after an action). */
  values?: { summary: string; whatsapp_url: string };
};

export async function joinChapter(chapterId: string): Promise<ActionState> {
  const user = await requireUser();
  const supabase = await createClient();
  // profile_id and role default to the caller and 'member'. A repeat join is a no op.
  const { error } = await supabase.from("chapter_members").insert({ chapter_id: chapterId, profile_id: user.id });
  await trackResult("chapter_joined", error && error.code !== "23505" ? error : null);
  if (error && error.code !== "23505") {
    return { error: error.code === "42501" ? "This chapter is not taking new members right now." : "We couldn't add you. Try again." };
  }
  refresh();
  return { saved: Date.now() };
}

export async function leaveChapter(chapterId: string, slug: string): Promise<ActionState> {
  const user = await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chapter_members")
    .delete()
    .eq("chapter_id", chapterId)
    .eq("profile_id", user.id)
    .select("role");
  await trackResult("chapter_left", error);
  if (error) return { error: "We couldn't take you out of the chapter. Try again." };
  // A lead leaving changes the public lead list.
  if (data?.some((r) => r.role === "lead")) revalidateChapters(slug);
  refresh();
  return { saved: Date.now() };
}

export async function removeMember(chapterId: string, profileId: string): Promise<ActionState> {
  const user = await requireUser();
  if (profileId === user.id) return { error: "Use Leave chapter to leave." };
  const supabase = await createClient();
  // RLS lets a lead delete member rows of their own chapter only; the role
  // filter keeps a lead from ever touching another lead.
  const { data, error } = await supabase
    .from("chapter_members")
    .delete()
    .eq("chapter_id", chapterId)
    .eq("profile_id", profileId)
    .eq("role", "member")
    .select("profile_id");
  if (error || !data?.length) return { error: "We couldn't remove them. Only chapter leads can remove members." };
  refresh();
  return { saved: Date.now() };
}

export async function saveChapterDetails(chapterId: string, slug: string, _prev: ActionState, form: FormData): Promise<ActionState> {
  await requireUser();
  const { data, errors } = parseChapterDetails(form);
  const values = data;
  if (Object.keys(errors).length) return { errors, values };
  const supabase = await createClient();
  const { error } = await supabase.rpc("set_chapter_details", {
    p_chapter_id: chapterId,
    p_summary: data.summary,
    p_whatsapp_url: data.whatsapp_url,
  });
  if (error?.code === "42501") return { error: "Only this chapter's leads can edit its page.", values };
  if (error?.code === "23514") {
    return { errors: { whatsapp_url: "That WhatsApp link was not accepted. Copy the invite link again." }, values };
  }
  if (error) return { error: "We couldn't save the chapter page. Try again.", values };
  revalidateChapters(slug);
  refresh();
  return { saved: Date.now() };
}
