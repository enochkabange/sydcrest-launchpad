"use server";

import { trackResult } from "@/lib/analytics/track";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { parseOpportunityForm, rejected, type OpportunityFormState } from "@/lib/opportunities/form";
import { revalidateOpportunities } from "@/lib/opportunities/revalidate";
import { adminOpportunitiesPath } from "@/components/opportunities/paths";

/**
 * Admin posting (issue #159). Every action re-checks the admin role, and RLS
 * (private.is_admin) checks it again. Admin posts carry a typed
 * organisation_name and no organisation_id; organisations post their own in
 * #161. Ids from hidden fields are only ever used as filters.
 */

const UNIQUE_VIOLATION = "23505";
const SLUG_TAKEN = { slug: "Another opportunity already uses this slug." };

function id(form: FormData) {
  const value = form.get("id");
  return typeof value === "string" ? value : "";
}

export async function createOpportunity(_prev: OpportunityFormState, form: FormData): Promise<OpportunityFormState> {
  const { supabase } = await requireAdmin();
  const { data, errors } = parseOpportunityForm(form, { mode: "admin" });
  if (Object.keys(errors).length) return rejected(data, form, errors);

  // posted_by defaults to the caller (auth.uid()); RLS requires that.
  const { data: row, error } = await supabase
    .from("opportunities")
    .insert({ ...data, organisation_name: data.organisation_name ?? "" })
    .select("id")
    .single();
  await trackResult("opportunity_created", error, { by: "admin" });
  if (error?.code === UNIQUE_VIOLATION) return rejected(data, form, SLUG_TAKEN);
  if (error) {
    console.error("createOpportunity failed", { code: error.code, message: error.message });
    return rejected(data, form, {}, "We couldn't post the opportunity. Try again.");
  }
  revalidateOpportunities();
  redirect(`${adminOpportunitiesPath}/${row.id}?created=1`);
}

export async function updateOpportunity(_prev: OpportunityFormState, form: FormData): Promise<OpportunityFormState> {
  const { supabase } = await requireAdmin();
  const { data, errors } = parseOpportunityForm(form, { mode: "admin" });
  if (Object.keys(errors).length) return rejected(data, form, errors);

  const { error } = await supabase.from("opportunities").update(data).eq("id", id(form));
  if (error?.code === UNIQUE_VIOLATION) return rejected(data, form, SLUG_TAKEN);
  if (error) {
    console.error("updateOpportunity failed", { code: error.code, message: error.message });
    return rejected(data, form, {}, "We couldn't save the opportunity. Try again.");
  }
  revalidateOpportunities();
  refresh();
  return { saved: Date.now(), at: Date.now() };
}

/** Open or close from the list without opening the editor. */
export async function setOpportunityStatusAsAdmin(form: FormData) {
  const { supabase } = await requireAdmin();
  const status = form.get("status");
  if (status !== "open" && status !== "closed") return;
  const { error } = await supabase.from("opportunities").update({ status }).eq("id", id(form));
  if (error) throw new Error(`Could not change the status: ${error.message}`);
  revalidateOpportunities();
  refresh();
}

export async function deleteOpportunity(form: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("opportunities").delete().eq("id", id(form));
  if (error) throw new Error(`Could not delete the opportunity: ${error.message}`);
  revalidateOpportunities();
  redirect(adminOpportunitiesPath);
}
