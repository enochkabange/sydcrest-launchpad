"use server";

import { trackResult } from "@/lib/analytics/track";
import { refresh } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export type SpecializationState = { message?: string; saved?: { slug: string; at: number } };

/**
 * Picks the learner's specialization for weeks 7 to 9 through the
 * choose_specialization function, which checks the membership is theirs and
 * active, the slug belongs to the programme, and refuses a change once work
 * for a specialization week has been sent.
 */
export async function chooseSpecialization(_prev: SpecializationState, form: FormData): Promise<SpecializationState> {
  await requireUser();
  const memberId = form.get("member_id");
  const slug = form.get("specialization");
  if (typeof memberId !== "string" || !memberId || typeof slug !== "string" || !slug) {
    return { message: "Choose a specialization first." };
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("choose_specialization", {
    p_cohort_member_id: memberId,
    p_specialization: slug,
  });
  await trackResult("specialisation_chosen", error, { specialisation: slug });
  if (error) {
    if (error.code === "42501") {
      return {
        message: /sent work|locked/i.test(error.message)
          ? "Your specialization is set now that you have sent work for it. Talk to your mentor if it needs to change."
          : "Only active learners in this cohort can choose a specialization.",
      };
    }
    if (error.code === "22023") return { message: "That specialization is not part of this programme." };
    if (error.code === "P0002") return { message: "We could not find your place in this cohort." };
    return { message: "We could not save your choice. Try again." };
  }
  refresh();
  return { saved: { slug, at: Date.now() } };
}
