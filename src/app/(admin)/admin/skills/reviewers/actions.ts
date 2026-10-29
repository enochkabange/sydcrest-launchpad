"use server";

import { refresh } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { isEmail } from "@/lib/mentor/progress";
import { findUserIdByEmail } from "@/lib/mentor/staff-lookup";

/**
 * Appointing skill portfolio reviewers (issue #248, founder decision D3:
 * admin appointed reviewers now, verified experts later). Every action
 * re-checks the admin role; admin_set_skill_reviewer checks it again in the
 * database. Reviewers get "Portfolio reviews" in their Learn menu.
 */

export type ReviewerFormState = { ok?: string; message?: string; errors?: { email?: string }; at?: number };

export async function appointReviewer(_prev: ReviewerFormState, form: FormData): Promise<ReviewerFormState> {
  const { supabase } = await requireAdmin();
  const email = String(form.get("email") ?? "").trim();
  if (!isEmail(email)) return { errors: { email: "Enter the email they sign in with." } };

  const id = await findUserIdByEmail(supabase, email);
  if (!id) return { errors: { email: "No account uses that email. Ask them to sign up first." } };

  const { error } = await supabase.rpc("admin_set_skill_reviewer", { p_profile_id: id, p_reviewer: true });
  if (error) {
    console.error("appointReviewer failed", { code: error.code, message: error.message });
    return { message: "We could not appoint them. Try again." };
  }
  refresh();
  return { ok: "Appointed. They now see Portfolio reviews in their Learn menu.", at: Date.now() };
}

export async function removeReviewer(profileId: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.rpc("admin_set_skill_reviewer", { p_profile_id: profileId, p_reviewer: false });
  if (error) throw new Error(`Could not remove the reviewer: ${error.message}`);
  refresh();
}
