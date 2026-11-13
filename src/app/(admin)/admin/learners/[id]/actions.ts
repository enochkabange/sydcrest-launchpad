"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { createAdminClient } from "@/lib/messaging/admin";
import { siteOrigin } from "@/lib/site-url";

/**
 * People console actions (issue #332). Each one re-checks the admin, runs a
 * security definer function that checks again and writes the audit log, and
 * comes back to the learner page with a one line result.
 */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function back(id: string, key: "done" | "error", value: string): never {
  redirect(`/admin/learners/${id}?${key}=${value}#actions`);
}

function checkedId(id: string): string {
  if (!UUID.test(id)) throw new Error("Unknown member");
  return id;
}

function note(form: FormData): string {
  return String(form.get("note") ?? "").trim().slice(0, 500);
}

function errorKey(error: { code?: string; message: string }): string {
  if (error.message.includes("last admin")) return "last-admin";
  if (error.message.includes("cannot be paused")) return "admin-pause";
  if (error.message.includes("1 to 500")) return "bad-note";
  return "failed";
}

export async function addSupportNote(profileId: string, form: FormData) {
  const id = checkedId(profileId);
  const { supabase } = await requireAdmin();
  const { error } = await supabase.rpc("admin_add_support_note", { p_profile_id: id, p_note: note(form) });
  if (error) back(id, "error", errorKey(error));
  back(id, "done", "note");
}

export async function setRole(profileId: string, form: FormData) {
  const id = checkedId(profileId);
  const { supabase } = await requireAdmin();
  const role = String(form.get("role") ?? "");
  const { error } = await supabase.rpc("admin_set_role", { p_profile_id: id, p_role: role, p_note: note(form) || undefined });
  if (error) back(id, "error", errorKey(error));
  back(id, "done", "role");
}

export async function setPaused(profileId: string, paused: boolean, form: FormData) {
  const id = checkedId(profileId);
  const { supabase } = await requireAdmin();
  const { error } = await supabase.rpc("admin_set_suspended", { p_profile_id: id, p_suspended: paused, p_note: note(form) || undefined });
  if (error) back(id, "error", errorKey(error));
  // Belt and braces: the database ban stops sign in and refresh; when keyed,
  // also tell Auth directly so the ban takes effect through its own API.
  const admin = createAdminClient();
  if (admin) {
    const { error: authError } = await admin.auth.admin.updateUserById(id, { ban_duration: paused ? "876000h" : "none" });
    if (authError) console.error("[people] auth ban update failed", { message: authError.message });
  }
  back(id, "done", paused ? "paused" : "reactivated");
}

/** Resends the sign up confirmation email through Supabase Auth (secret key). No op with a message when unkeyed. */
export async function resendConfirmation(profileId: string) {
  const id = checkedId(profileId);
  const { supabase } = await requireAdmin();
  const admin = createAdminClient();
  if (!admin) back(id, "done", "unkeyed");
  const { data, error } = await admin.auth.admin.getUserById(id);
  if (error || !data.user?.email) back(id, "error", "failed");
  if (data.user.email_confirmed_at) back(id, "done", "confirmed");
  const { error: sendError } = await admin.auth.resend({
    type: "signup",
    email: data.user.email,
    options: { emailRedirectTo: `${await siteOrigin()}/auth/callback?next=${encodeURIComponent("/dashboard")}` },
  });
  if (sendError) {
    console.error("[people] resend confirmation failed", { message: sendError.message });
    back(id, "error", "failed");
  }
  const { error: logError } = await supabase.rpc("admin_log_confirmation_resent", { p_profile_id: id });
  if (logError) console.error("[people] could not log the resend", { message: logError.message });
  back(id, "done", "resent");
}
