"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { requireUser } from "@/lib/auth";
import { SPONSOR_SCOPES, SPONSOR_TIERS } from "@/lib/sponsorships";

export type SponsorshipState = { message?: string; saved?: boolean };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Records a sponsorship (#307). RLS lets only admins write; the table checks the scope matches its target. */
export async function recordSponsorship(_prev: SponsorshipState, form: FormData): Promise<SponsorshipState> {
  const { supabase } = await requireAdmin();
  const get = (k: string) => (typeof form.get(k) === "string" ? (form.get(k) as string).trim() : "");
  const scope = get("scope");
  const tier = get("tier");
  const organisation_id = get("organisation_id");
  const target = get(`${scope}_id`);
  const seats = get("seats");
  const starts_on = get("starts_on");
  const ends_on = get("ends_on");
  if (!UUID.test(organisation_id)) return { message: "Choose the sponsoring organisation." };
  if (!SPONSOR_SCOPES.some((s) => s.value === scope) || !UUID.test(target)) return { message: "Choose what they sponsor." };
  if (!SPONSOR_TIERS.some((t) => t.value === tier)) return { message: "Choose a tier." };
  if (seats && !/^\d{1,5}$/.test(seats)) return { message: "Seats must be a whole number." };
  if (!DATE.test(starts_on)) return { message: "Enter the start date." };
  if (ends_on && (!DATE.test(ends_on) || ends_on < starts_on)) return { message: "The end date must be after the start date." };

  const { error } = await supabase.from("sponsorships").insert({
    organisation_id,
    scope,
    tier,
    program_id: scope === "programme" ? target : null,
    cohort_id: scope === "cohort" ? target : null,
    chapter_id: scope === "chapter" ? target : null,
    seats: seats ? Number(seats) : null,
    starts_on,
    ends_on: ends_on || null,
    note: get("note") || null,
  });
  if (error) {
    console.error("sponsorship insert failed", { code: error.code, message: error.message });
    return { message: "We couldn't save that. Check the details and try again." };
  }
  revalidatePath("/admin/sponsorships");
  return { saved: true };
}

export async function deleteSponsorship(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("sponsorships").delete().eq("id", id);
  if (error) throw new Error(`Could not delete the sponsorship: ${error.message}`);
  revalidatePath("/admin/sponsorships");
}

/** Hides a learner's story from sponsors, or shows it again. */
export async function setStoryHidden(profileId: string, hide: boolean) {
  const { supabase } = await requireAdmin();
  const user = await requireUser();
  const { error } = await supabase
    .from("learner_stories")
    .update(hide ? { hidden_at: new Date().toISOString(), hidden_by: user.id } : { hidden_at: null, hidden_by: null })
    .eq("profile_id", profileId);
  if (error) throw new Error(`Could not change the story: ${error.message}`);
  revalidatePath("/admin/sponsorships");
}
