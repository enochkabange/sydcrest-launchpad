"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { isUuid } from "@/lib/talent/forms";

const DECISIONS = ["verified", "rejected", "suspended", "unverified"] as const;

export type DecisionState = { message?: string; done?: string };

/** Verify, reject, suspend or reset an organisation through admin_set_organisation_verification. */
export async function decideOrganisation(organisationId: string, _prev: DecisionState, form: FormData): Promise<DecisionState> {
  const { supabase } = await requireAdmin();
  if (!isUuid(organisationId)) return { message: "That organisation is not valid." };
  const status = form.get("decision");
  if (!DECISIONS.includes(status as (typeof DECISIONS)[number])) return { message: "Choose a decision." };
  const noteRaw = form.get("note");
  const note = typeof noteRaw === "string" && noteRaw.trim() ? noteRaw.trim().slice(0, 1000) : null;
  if ((status === "rejected" || status === "suspended") && !note) {
    return { message: "Add a note so the organisation knows what to fix." };
  }
  const { error } = await supabase.rpc("admin_set_organisation_verification", {
    p_organisation_id: organisationId,
    p_status: status as string,
    ...(note ? { p_note: note } : {}),
  });
  if (error) return { message: `Could not save: ${error.message}` };
  revalidatePath("/admin/organisations");
  return { done: String(status) };
}
