"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { parseChapterForm, profileSlugFrom } from "@/lib/chapters/model";
import { revalidateChapters } from "@/lib/chapters/public";

/**
 * Admin chapter editor. Every action re-checks the admin role, and RLS
 * (private.is_admin) checks it again. Admins create and edit chapters
 * directly and set member roles; leads are appointed here, never by leads.
 */

export type FormState = {
  errors?: Record<string, string | undefined>;
  message?: string;
  saved?: number;
  /** What was sent, so a form that comes back with an error keeps it (React resets forms after an action). */
  values?: Record<string, string>;
};

function sent(form: FormData) {
  return Object.fromEntries([...form.entries()].flatMap(([k, v]) => (typeof v === "string" ? [[k, v]] : [])));
}

const UNIQUE_VIOLATION = "23505";

function field(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
}

export async function createChapter(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const { data, errors } = parseChapterForm(form);
  if (Object.keys(errors).length) return { errors, values: sent(form) };
  const { data: row, error } = await supabase.from("chapters").insert(data).select("id").single();
  if (error?.code === UNIQUE_VIOLATION) return { errors: { slug: "Another chapter already uses this slug." }, values: sent(form) };
  if (error) return { message: "We couldn't create the chapter. Check the fields and try again.", values: sent(form) };
  revalidateChapters(data.slug);
  redirect(`/admin/chapters/${row.id}`);
}

export async function updateChapter(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const { data, errors } = parseChapterForm(form);
  if (Object.keys(errors).length) return { errors, values: sent(form) };
  const id = field(form, "id");
  const { data: before } = await supabase.from("chapters").select("slug").eq("id", id).maybeSingle();
  const { error } = await supabase.from("chapters").update(data).eq("id", id);
  if (error?.code === UNIQUE_VIOLATION) return { errors: { slug: "Another chapter already uses this slug." }, values: sent(form) };
  if (error) return { message: "We couldn't save the chapter. Check the fields and try again.", values: sent(form) };
  revalidateChapters(data.slug, ...(before?.slug && before.slug !== data.slug ? [before.slug] : []));
  refresh();
  return { saved: Date.now() };
}

async function chapterSlug(chapterId: string) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("chapters").select("slug").eq("id", chapterId).maybeSingle();
  return data?.slug;
}

/** Make a member a lead, or a lead a member again. */
export async function setMemberRole(chapterId: string, profileId: string, role: "member" | "lead") {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("chapter_members").update({ role }).eq("chapter_id", chapterId).eq("profile_id", profileId);
  if (error) throw new Error(`Could not change the role: ${error.message}`);
  const slug = await chapterSlug(chapterId);
  if (slug) revalidateChapters(slug);
  refresh();
}

export async function removeFromChapter(chapterId: string, profileId: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("chapter_members").delete().eq("chapter_id", chapterId).eq("profile_id", profileId);
  if (error) throw new Error(`Could not remove the member: ${error.message}`);
  const slug = await chapterSlug(chapterId);
  if (slug) revalidateChapters(slug);
  refresh();
}

/**
 * Appoint a lead who is not in the chapter yet. Profiles are private, so an
 * admin names the person by their public profile address; anyone without a
 * public profile joins the chapter first and is promoted from the list.
 */
export async function appointLeadBySlug(chapterId: string, _prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const slug = profileSlugFrom(field(form, "profile"));
  if (!slug) return { errors: { profile: "Paste their public profile address." } };
  const { data: person } = await supabase.from("public_profiles").select("id, display_name").eq("public_slug", slug).maybeSingle();
  if (!person?.id) {
    return {
      errors: {
        profile: "No public profile has that address. Ask them to join the chapter, then make them a lead from the list.",
      },
    };
  }
  // Not an upsert: the column grants allow updating role only.
  const { data: existing } = await supabase
    .from("chapter_members")
    .select("role")
    .eq("chapter_id", chapterId)
    .eq("profile_id", person.id)
    .maybeSingle();
  const { error } = existing
    ? await supabase.from("chapter_members").update({ role: "lead" }).eq("chapter_id", chapterId).eq("profile_id", person.id)
    : await supabase.from("chapter_members").insert({ chapter_id: chapterId, profile_id: person.id, role: "lead" });
  if (error) return { message: "We couldn't appoint them. Try again." };
  const chapter = await chapterSlug(chapterId);
  if (chapter) revalidateChapters(chapter);
  refresh();
  return { saved: Date.now(), message: `${person.display_name ?? "They"} now leads this chapter.` };
}
