"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { runAccountDeletions } from "@/lib/data-rights/deletion";
import { createAdminClient } from "@/lib/messaging/admin";
import { createClient } from "@/lib/supabase/server";

/**
 * "Delete my account" (issue #333): deletes the account straight away, with
 * no grace period (founder decision, 13 Nov 2026). The request is recorded
 * first; the deletion runs at once with the secret key, then the person is
 * signed out. Without the key the request waits for the daily step.
 */
export async function requestAccountDeletion() {
  const user = await requireUser();
  const supabase = await createClient();
  const { error } = await supabase.rpc("request_account_deletion");
  if (error) {
    console.error("[data-rights] request deletion failed", { code: error.code, message: error.message });
    redirect(`/profile/delete?error=${error.code === "22023" ? "last-admin" : "failed"}`);
  }
  const admin = createAdminClient();
  if (!admin) {
    revalidatePath("/profile");
    redirect("/profile?deletion=requested#your-data");
  }
  const result = await runAccountDeletions(admin);
  const { data: still } = await admin.from("deletion_requests").select("id").eq("profile_id", user.id).eq("status", "pending").maybeSingle();
  if (!result.ok || still) {
    revalidatePath("/profile");
    redirect("/profile?deletion=requested#your-data");
  }
  // The account is gone: clear the session cookies and leave.
  await supabase.auth.signOut();
  redirect("/?account=deleted");
}

/** Keep my account: cancels a pending deletion. */
export async function cancelAccountDeletion() {
  await requireUser();
  const supabase = await createClient();
  const { error } = await supabase.rpc("cancel_account_deletion");
  if (error) {
    console.error("[data-rights] cancel deletion failed", { code: error.code, message: error.message });
    redirect("/profile?deletion=cancel-failed#your-data");
  }
  revalidatePath("/profile");
  redirect("/profile?deletion=cancelled#your-data");
}
