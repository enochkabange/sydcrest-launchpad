"use server";

import { trackResult } from "@/lib/analytics/track";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";

/**
 * Admin decisions on experts. Each calls a security definer function that
 * checks the caller is an admin again; nothing here writes status, verified
 * or featured columns directly.
 */

function note(form: FormData, key: string) {
  const value = form.get(key);
  const text = typeof value === "string" ? value.trim().slice(0, 1000) : "";
  return text || undefined;
}

function done(slug?: string | null) {
  revalidatePath("/admin/experts");
  revalidatePath("/experts");
  if (slug) revalidatePath(`/experts/${slug}`);
}

export async function decideApplication(applicationId: string, decision: "approved" | "rejected", form: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.rpc("decide_expert_application", {
    p_application_id: applicationId,
    p_decision: decision,
    p_note: note(form, "note"),
  });
  await trackResult("expert_application_decided", error, { decision });
  if (error) throw new Error(`Could not record the decision: ${error.message}`);
  done();
}

export async function setExpertStatus(profileId: string, status: "approved" | "delisted", form: FormData) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.rpc("admin_set_expert_status", {
    p_profile_id: profileId,
    p_status: status,
    p_reason: status === "delisted" ? note(form, "reason") : undefined,
  });
  if (error) throw new Error(`Could not change the expert's status: ${error.message}`);
  done(data?.slug);
}

export async function setExpertFlags(profileId: string, flags: { verified?: boolean; featured?: boolean }) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.rpc("admin_set_expert_flags", {
    p_profile_id: profileId,
    p_is_verified: flags.verified,
    p_is_featured: flags.featured,
  });
  if (error) throw new Error(`Could not change the expert's badges: ${error.message}`);
  done(data?.slug);
}
