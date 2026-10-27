"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { FieldErrors } from "@/lib/validation";
import { parseOutcome, type OutcomeField } from "@/lib/outcomes/validation";
import { revalidateOutcomeStats } from "@/lib/outcomes/revalidate";

export type OutcomeFormState = {
  errors?: FieldErrors<OutcomeField>;
  message?: string;
  /** What was submitted, so the form can show it again after a failed check. */
  values?: Record<string, string>;
};

function submitted(form: FormData) {
  return Object.fromEntries([...form.entries()].map(([k, v]) => [k, typeof v === "string" ? v : ""]));
}

/** Report a new outcome. It starts as pending; only an admin can verify it. */
export async function reportOutcome(_prev: OutcomeFormState, form: FormData): Promise<OutcomeFormState> {
  // Identity comes from the session, never the form.
  const user = await requireUser();
  const parsed = parseOutcome(form);
  if (!parsed.data) return { errors: parsed.errors, values: submitted(form) };

  const supabase = await createClient();
  const { error } = await supabase.from("outcomes").insert({ ...parsed.data, profile_id: user.id });
  if (error) return { message: "We couldn't save your outcome. Try again.", values: submitted(form) };
  revalidatePath("/outcomes");
  redirect("/outcomes?reported=1");
}

/**
 * Edit a pending or rejected outcome. The database sends an edited rejected
 * outcome back to review and refuses any change to a verified one.
 */
export async function editOutcome(id: string, _prev: OutcomeFormState, form: FormData): Promise<OutcomeFormState> {
  const user = await requireUser();
  const parsed = parseOutcome(form);
  if (!parsed.data) return { errors: parsed.errors, values: submitted(form) };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("outcomes")
    .update(parsed.data)
    .eq("id", id)
    .eq("profile_id", user.id)
    .neq("verification_status", "verified")
    .select("id");
  if (error || !data?.length) return { message: "We couldn't save your changes. A verified outcome can't be edited.", values: submitted(form) };
  revalidatePath("/outcomes");
  redirect("/outcomes?updated=1");
}

/** Delete one of your own outcomes. A verified one also leaves the public counts. */
export async function deleteOutcome(id: string) {
  const user = await requireUser();
  const supabase = await createClient();
  const { error } = await supabase.from("outcomes").delete().eq("id", id).eq("profile_id", user.id);
  if (error) throw new Error(`Could not delete the outcome: ${error.message}`);
  revalidateOutcomeStats();
  revalidatePath("/outcomes");
  redirect("/outcomes?deleted=1");
}
