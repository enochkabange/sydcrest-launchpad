"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";

export type ChapterDecisionState = { message?: string };

/**
 * Approves (creating the chapter, open to join, with the applicant as lead)
 * or declines a chapter application (#301). decide_chapter_application
 * checks the admin role again and notifies the applicant.
 */
export async function decideChapterApplication(
  applicationId: string,
  _prev: ChapterDecisionState,
  form: FormData,
): Promise<ChapterDecisionState> {
  const { supabase } = await requireAdmin();
  const decision = form.get("decision") === "approved" ? "approved" : "declined";
  const text = (key: string) => (typeof form.get(key) === "string" ? (form.get(key) as string).trim() : "");
  const slug = text("slug").toLowerCase();
  if (decision === "approved" && slug === "start") return { message: "That address is used by the Start a chapter page. Choose another." };
  const { error } = await supabase.rpc("decide_chapter_application", {
    p_application_id: applicationId,
    p_decision: decision,
    p_slug: slug || undefined,
    p_name: text("name") || undefined,
    p_note: text("note") || undefined,
  });
  if (error) {
    if (error.code === "23505") return { message: "A chapter already uses that address. Choose another." };
    if (error.code === "23514") return { message: "Use lowercase letters, numbers and single hyphens for the address." };
    if (error.code === "P0002") return { message: "This application was already decided or withdrawn." };
    console.error("chapter decision failed", { code: error.code, message: error.message });
    return { message: "We couldn't save that. Try again." };
  }
  revalidatePath("/admin/chapters/applications");
  revalidatePath("/admin/chapters");
  revalidatePath("/chapters");
  // The decided application leaves the queue, so confirm at the top of the page.
  const town = typeof form.get("town") === "string" ? (form.get("town") as string) : "";
  redirect(`/admin/chapters/applications?${new URLSearchParams({ decided: decision, town })}`);
}
