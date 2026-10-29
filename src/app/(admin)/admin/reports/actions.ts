"use server";

import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { getMyProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

const STATUSES = ["open", "reviewing", "actioned", "dismissed"] as const;

async function requireAdmin() {
  const profile = await getMyProfile();
  if (profile.role !== "admin") notFound();
}

export async function setReportStatus(reportId: string, status: string) {
  await requireAdmin();
  if (!STATUSES.includes(status as (typeof STATUSES)[number])) throw new Error("Unknown status");
  const supabase = await createClient();
  // RLS also limits this to admins; status is the only column admins can change.
  const { error } = await supabase.from("reports").update({ status }).eq("id", reportId);
  if (error) throw new Error(`Could not update the report: ${error.message}`);
  revalidatePath("/admin/reports");
}

/** Take the reported public profile down and mark the report actioned. */
export async function unpublishReportedProfile(reportId: string, profileId: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.rpc("admin_unpublish_profile", { p_profile_id: profileId });
  if (error) throw new Error(`Could not unpublish the profile: ${error.message}`);
  await supabase.from("reports").update({ status: "actioned" }).eq("id", reportId);
  revalidatePath("/admin/reports");
}

/** Hide a reported credential from every public view (or show it again), and mark the report actioned when hiding. */
export async function setCredentialHidden(reportId: string, credentialId: string, hidden: boolean) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.rpc("admin_set_credential_hidden", { p_credential_id: credentialId, p_hidden: hidden });
  if (error) throw new Error(`Could not update the credential: ${error.message}`);
  if (hidden) await supabase.from("reports").update({ status: "actioned" }).eq("id", reportId);
  revalidatePath("/admin/reports");
}
