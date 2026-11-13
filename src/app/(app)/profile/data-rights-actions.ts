"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

/** "Delete my account": starts the 30 day grace period (issue #333). Re-checks the user. */
export async function requestAccountDeletion() {
  await requireUser();
  const supabase = await createClient();
  const { error } = await supabase.rpc("request_account_deletion");
  if (error) {
    console.error("[data-rights] request deletion failed", { code: error.code, message: error.message });
    redirect(`/profile/delete?error=${error.code === "22023" ? "last-admin" : "failed"}`);
  }
  revalidatePath("/profile");
  redirect("/profile?deletion=requested#your-data");
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
