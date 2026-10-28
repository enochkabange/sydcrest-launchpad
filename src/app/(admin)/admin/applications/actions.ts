"use server";

import { trackResult } from "@/lib/analytics/track";
import { refresh } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { decisionErrorMessage, isDecision, NOTE_MAX } from "@/lib/programme-apply/screening";

export type DecisionState = { message?: string; decided?: string };

/**
 * Accept (into a cohort), waitlist or decline an application through
 * decide_application, which re-checks the admin role, the application's
 * state and the cohort's size cap under a row lock.
 */
export async function decideApplication(applicationId: string, _prev: DecisionState, form: FormData): Promise<DecisionState> {
  const { supabase } = await requireAdmin();
  const decision = form.get("decision");
  if (!isDecision(decision)) return { message: "Choose accept, waitlist or decline." };

  const cohortId = typeof form.get("cohort_id") === "string" ? String(form.get("cohort_id")) : "";
  if (decision === "accepted" && !cohortId) return { message: "Choose a cohort to accept this applicant into." };
  const note = typeof form.get("note") === "string" ? String(form.get("note")).trim() : "";
  if (note.length > NOTE_MAX) return { message: `Keep the note under ${NOTE_MAX} characters.` };

  const { error } = await supabase.rpc("decide_application", {
    p_application_id: applicationId,
    p_decision: decision,
    ...(decision === "accepted" ? { p_cohort_id: cohortId } : {}),
    ...(note ? { p_note: note } : {}),
  });
  await trackResult("application_decided", error, { decision });
  if (error) return { message: decisionErrorMessage(error) };

  refresh();
  return { decided: decision };
}
