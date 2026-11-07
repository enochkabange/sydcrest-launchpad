"use server";

import { trackResult } from "@/lib/analytics/track";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { isVerificationStatus } from "@/lib/outcomes/labels";
import { revalidateOutcomeStats } from "@/lib/outcomes/revalidate";

/**
 * Verify, reject or reopen a reported outcome through admin_verify_outcome,
 * the only way verification columns change. A rejection carries a note the
 * learner sees. Public counts refresh at once.
 */
export async function decideOutcome(outcomeId: string, status: string, form: FormData) {
  const { supabase } = await requireAdmin();
  if (!isVerificationStatus(status)) throw new Error("Unknown status");
  const raw = form.get("note");
  const note = typeof raw === "string" && raw.trim() ? raw.trim().slice(0, 1000) : null;
  const { error } = await supabase.rpc("admin_verify_outcome", {
    p_outcome_id: outcomeId,
    p_status: status,
    ...(note ? { p_note: note } : {}),
  });
  await trackResult("outcome_decided", error, { decision: status as "verified" | "rejected" });
  if (error) throw new Error(`Could not update the outcome: ${error.message}`);
  revalidateOutcomeStats();
  revalidatePath("/admin/outcomes");
  revalidatePath("/admin/impact");
}
