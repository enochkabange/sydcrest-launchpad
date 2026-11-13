"use server";

import { revalidatePath } from "next/cache";
import { trackResult } from "@/lib/analytics/track";
import { requireUser } from "@/lib/auth";
import { EMPLOYER_STAGES } from "@/lib/opportunities/applications";
import { createClient } from "@/lib/supabase/server";

export type StageState = { message?: string; saved?: string };

/** Moves an applicant to a stage. set_application_stage checks the caller may manage this listing and tells the learner. */
export async function moveApplicant(applicationId: string, path: string, _prev: StageState, form: FormData): Promise<StageState> {
  await requireUser();
  const stage = form.get("stage");
  if (typeof stage !== "string" || !EMPLOYER_STAGES.some((s) => s.value === stage)) return { message: "Choose a stage." };
  const supabase = await createClient();
  const { error } = await supabase.rpc("set_application_stage", { p_application_id: applicationId, p_stage: stage });
  await trackResult("opportunity_applicant_moved", error, { stage });
  if (error) {
    if (error.code === "55000") return { message: "This application is closed: the applicant was hired or withdrew." };
    if (error.code === "42501") return { message: "You cannot manage applications for this listing." };
    console.error("set stage failed", { code: error.code, message: error.message });
    return { message: "We couldn't save that. Try again." };
  }
  revalidatePath(path);
  return { saved: stage };
}
