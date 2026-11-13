"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { track, trackRefusal } from "@/lib/analytics/track";
import { requireUser } from "@/lib/auth";
import { checkinSkillOptions } from "@/lib/outcomes/checkin-options";
import { parseCheckin, type CheckinField } from "@/lib/outcomes/checkins";
import { isRateLimited, RATE_LIMIT_MESSAGE } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";

export type CheckinFormState = {
  errors?: Partial<Record<CheckinField, string>>;
  message?: string;
};

/** Answer (or change the answer to) one of your own check ins. */
export async function answerCheckin(id: string, _prev: CheckinFormState, form: FormData): Promise<CheckinFormState> {
  const user = await requireUser();
  const supabase = await createClient();
  const { data: checkin } = await supabase
    .from("outcome_checkins")
    .select("id, roadmap_id")
    .eq("id", id)
    .eq("profile_id", user.id)
    .maybeSingle();
  if (!checkin) return { message: "We could not find that check in." };

  const allowed = (await checkinSkillOptions(supabase, user.id, checkin.roadmap_id)).map((o) => o.value);
  const parsed = parseCheckin(form, allowed);
  if (!parsed.data) {
    await trackRefusal("outcome_checkin_answered", "validation");
    return { errors: parsed.errors };
  }

  const answer = parsed.data;
  const { data: months, error } = await supabase.rpc("answer_outcome_checkin", {
    p_id: id,
    p_work_status: answer.work_status,
    p_organisation: answer.organisation ?? undefined,
    p_earnings_band: answer.earnings_band ?? undefined,
    p_skills: answer.skills,
    p_share: answer.share,
  });
  if (error) {
    await trackRefusal("outcome_checkin_answered", isRateLimited(error) ? "rate_limited" : "server_error", error.code);
    return { message: isRateLimited(error) ? RATE_LIMIT_MESSAGE : "We could not save your answers. Try again." };
  }
  await track("outcome_checkin_answered", { months, status: answer.work_status, shared: answer.share });
  revalidatePath("/outcomes");
  redirect("/outcomes?checked_in=1");
}
