"use server";

import { refresh } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { loadProgramme, loadUpcomingCohorts } from "@/lib/programme-apply/data";
import { DMP_SLUG, parseApplication, type ParsedApplication } from "@/lib/programme-apply/screening";

export type ApplyState = {
  errors?: ParsedApplication["errors"];
  message?: string;
  values?: Record<string, string>;
};

function formValues(form: FormData) {
  const values: Record<string, string> = {};
  for (const [k, v] of form.entries()) if (typeof v === "string" && !k.startsWith("$")) values[k] = v;
  return values;
}

/** Inserts the caller's application. RLS checks they apply as themselves to a published programme. */
export async function submitApplication(_prev: ApplyState, form: FormData): Promise<ApplyState> {
  const user = await requireUser();
  const supabase = await createClient();
  const programme = await loadProgramme(supabase, DMP_SLUG);
  if (!programme?.is_published) return { message: "Applications for this programme are not open." };

  const cohorts = await loadUpcomingCohorts(supabase, programme.id);
  const { data, errors } = parseApplication(
    form,
    programme.questions,
    programme.specializations,
    cohorts.map((c) => c.id),
  );
  if (Object.keys(errors).length) return { errors, values: formValues(form) };

  const { error } = await supabase
    .from("cohort_applications")
    .insert({ program_id: programme.id, profile_id: user.id, ...data });
  if (error) {
    if (error.code === "23505") {
      refresh();
      return { message: "You already have an application open for this programme." };
    }
    if (error.code === "22023") return { message: "Some of those choices are no longer available. Check them and try again.", values: formValues(form) };
    return { message: "We could not send your application. Try again.", values: formValues(form) };
  }
  // Re-render the page, which now shows the application's status.
  refresh();
  return {};
}

export type WithdrawState = { message?: string };

/** The applicant withdraws an open application (security definer function checks ownership and status). */
export async function withdrawApplication(applicationId: string): Promise<WithdrawState> {
  await requireUser();
  const supabase = await createClient();
  const { error } = await supabase.rpc("withdraw_application", { p_application_id: applicationId });
  if (error) {
    refresh();
    return { message: "This application can no longer be withdrawn. It may already have a decision." };
  }
  refresh();
  return {};
}
