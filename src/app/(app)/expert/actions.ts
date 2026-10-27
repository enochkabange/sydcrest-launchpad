"use server";

import { refresh, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { FieldErrors } from "@/lib/validation";
import type { OfferFormState } from "@/components/experts/offer-form";
import { parseExpertProfile, type ExpertProfileUpdate, type ProfileFields } from "@/lib/market-apply/expert";
import { parseOffer } from "@/lib/market-apply/offers";
import { PG } from "@/lib/market-apply/data";

export type ExpertProfileState = {
  errors?: FieldErrors<ProfileFields>;
  message?: string;
  saved?: number;
  /** What was submitted, so a rejected form keeps the expert's edits. */
  values?: ExpertProfileUpdate;
};

/** Saves the editable parts of the caller's expert profile. Status, verified and featured stay admin only. */
export async function updateExpertProfile(_prev: ExpertProfileState, form: FormData): Promise<ExpertProfileState> {
  const user = await requireUser();
  const { data, errors } = parseExpertProfile(form);
  if (Object.keys(errors).length) return { errors, values: data };

  const supabase = await createClient();
  const { data: row, error } = await supabase
    .from("expert_profiles")
    .update(data)
    .eq("profile_id", user.id)
    .select("slug")
    .maybeSingle();
  if (error) {
    if (error.code === PG.uniqueViolation) return { errors: { slug: "That link name is taken. Try another." }, values: data };
    if (error.code === PG.checkViolation) {
      return { message: "Some of those details don't fit. Check the fields and try again.", values: data };
    }
    return { message: "We couldn't save your profile. Try again.", values: data };
  }
  if (!row) return { message: "Apply to become an expert first." };
  revalidatePath(`/experts/${row.slug}`);
  refresh();
  return { saved: Date.now() };
}

function offerError(error: { code?: string }): OfferFormState {
  if (error.code === PG.rlsViolation) {
    return { message: "Offers can be added once you have applied, and not while your expert page is delisted. Experts must be 18 or over." };
  }
  if (error.code === PG.checkViolation) return { message: "Some of those details don't fit. Check the fields and try again." };
  return { message: "We couldn't save the offer. Try again." };
}

function echo(form: FormData) {
  const { data, errors } = parseOffer(form);
  return { data, errors, values: { ...data, kind: errors.kind ? ("" as const) : data.kind } };
}

export async function createOffer(_prev: OfferFormState, form: FormData): Promise<OfferFormState> {
  const user = await requireUser();
  const { data, errors, values } = echo(form);
  if (Object.keys(errors).length) return { errors, values };

  const supabase = await createClient();
  const { count } = await supabase.from("offers").select("id", { count: "exact", head: true }).eq("expert_id", user.id);
  const { error } = await supabase.from("offers").insert({ ...data, expert_id: user.id, position: count ?? 0 });
  if (error) return { ...offerError(error), values };

  revalidatePath("/expert");
  redirect("/expert?offer=added");
}

export async function updateOffer(offerId: string, _prev: OfferFormState, form: FormData): Promise<OfferFormState> {
  const user = await requireUser();
  const { data, errors, values } = echo(form);
  if (Object.keys(errors).length) return { errors, values };

  const supabase = await createClient();
  const { data: row, error } = await supabase
    .from("offers")
    .update(data)
    .eq("id", offerId)
    .eq("expert_id", user.id)
    .select("id")
    .maybeSingle();
  if (error) return { ...offerError(error), values };
  if (!row) return { message: "That offer no longer exists.", values };

  revalidatePath("/expert");
  redirect("/expert?offer=saved");
}

export async function setOfferActive(offerId: string, active: boolean) {
  const user = await requireUser();
  const supabase = await createClient();
  const { error } = await supabase.from("offers").update({ is_active: active }).eq("id", offerId).eq("expert_id", user.id);
  if (error) throw new Error(`Could not update the offer: ${error.message}`);
  revalidatePath("/expert");
}

export async function deleteOffer(offerId: string) {
  const user = await requireUser();
  const supabase = await createClient();
  const { error } = await supabase.from("offers").delete().eq("id", offerId).eq("expert_id", user.id);
  if (error) throw new Error(`Could not delete the offer: ${error.message}`);
  revalidatePath("/expert");
  redirect("/expert?offer=deleted");
}
