"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { trackRefusal, trackResult } from "@/lib/analytics/track";
import { requireUser } from "@/lib/auth";
import { matchingForEmployers } from "@/lib/matching/flags";
import { parseApplyForm, type ApplyFormValues } from "@/lib/opportunities/applications";
import { createClient } from "@/lib/supabase/server";

export type ApplyState = { errors?: Partial<Record<keyof ApplyFormValues, string>>; message?: string; values?: ApplyFormValues };

/**
 * Applies on SydCrest (#306). The database checks the listing takes
 * applications here and is still open, the learner is an adult, and one
 * application per listing (23505).
 */
export async function applyToOpportunity(opportunityId: string, slug: string, _prev: ApplyState, form: FormData): Promise<ApplyState> {
  await requireUser();
  const { data, errors } = parseApplyForm(form);
  if (Object.keys(errors).length) {
    await trackRefusal("opportunity_applied", "validation");
    return { errors, values: data };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("opportunity_applications").insert({
    opportunity_id: opportunityId,
    note: data.note,
    portfolio_url: data.portfolio_url || null,
    contact_consent: data.contact_consent,
    // Only when the box can show (READINESS_FOR_EMPLOYERS=on); otherwise the column default, off.
    share_readiness: matchingForEmployers() && data.share_readiness,
  });
  // A duplicate (23505) is not a new application, so it is not counted either way.
  if (error?.code !== "23505") await trackResult("opportunity_applied", error, { opportunity_id: opportunityId });
  if (error) {
    if (error.code === "23505") redirect("/opportunities/applications");
    if (error.code === "42501") return { message: "This listing is no longer taking applications.", values: data };
    console.error("apply failed", { code: error.code, message: error.message });
    return { message: "We couldn't send your application. Try again.", values: data };
  }
  revalidatePath("/opportunities/applications");
  revalidatePath(`/opportunities/${slug}`);
  redirect("/opportunities/applications?sent=1");
}
