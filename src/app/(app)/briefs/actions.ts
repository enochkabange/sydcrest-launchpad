"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { parseBrief, parsePitch } from "@/lib/briefs/briefs";
import { notifyMatchingExperts, notifyNewPitch, notifyPitchDecision } from "@/lib/briefs/notify";
import { getMyActiveOffers, getViewer, isUuid } from "@/lib/briefs/queries";

export type FormState = {
  errors?: Partial<Record<string, string>>;
  message?: string;
  values?: Record<string, string | string[]>;
};

function formValues(form: FormData) {
  const values: Record<string, string | string[]> = {};
  for (const key of new Set(form.keys())) {
    if (key.startsWith("$")) continue;
    const all = form.getAll(key).filter((v): v is string => typeof v === "string");
    values[key] = key === "categories" ? all : (all[0] ?? "");
  }
  return values;
}

/**
 * Posts a brief as the caller. RLS checks they are an adult and, for a job
 * brief, that they may post for that verified organisation. Matching experts
 * are told after the response is sent.
 */
export async function createBrief(_prev: FormState, form: FormData): Promise<FormState> {
  const user = await requireUser();
  const viewer = await getViewer(user.id);
  const { data, errors } = parseBrief(form, viewer.postableOrgs.map((o) => o.id));
  if (!data) return { errors, values: formValues(form) };

  const supabase = await createClient();
  // No RETURNING: the read policy checks the row through a function that
  // cannot see it inside the inserting statement, so read it back after.
  const { error } = await supabase.from("briefs").insert({ ...data, poster_id: user.id });
  const { data: brief } = error
    ? { data: null }
    : await supabase
        .from("briefs")
        .select("id, title, kind, organisation_id, skills, categories")
        .eq("poster_id", user.id)
        .eq("title", data.title)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
  if (error || !brief) {
    const message =
      error?.code === "42501"
        ? data.kind === "job"
          ? "You can post job briefs only for a verified organisation you recruit for."
          : "Briefs are for adults only. Check the date of birth on your account."
        : "We could not post your brief. Try again.";
    return { message, values: formValues(form) };
  }

  after(() =>
    notifyMatchingExperts({
      id: brief.id,
      title: brief.title,
      kind: brief.kind,
      posterId: user.id,
      organisationId: brief.organisation_id,
      skills: brief.skills,
      categories: brief.categories,
    }),
  );
  redirect(`/briefs/${brief.id}?posted=1`);
}

/** An approved expert pitches on an open brief. RLS (`can_pitch`) is the real check. */
export async function submitPitch(briefId: string, _prev: FormState, form: FormData): Promise<FormState> {
  const user = await requireUser();
  if (!isUuid(briefId)) return { message: "This brief is not available." };
  const offers = await getMyActiveOffers(user.id);
  const { data, errors } = parsePitch(form, offers.map((o) => o.id));
  if (!data) return { errors, values: formValues(form) };

  const supabase = await createClient();
  const { error } = await supabase.from("pitches").insert({ ...data, brief_id: briefId, expert_id: user.id });
  if (error) {
    refresh();
    if (error.code === "23505") return { message: "You have already pitched on this brief." };
    if (error.code === "42501") return { message: "This brief is no longer taking pitches, or you cannot pitch on it." };
    return { message: "We could not send your pitch. Try again.", values: formValues(form) };
  }

  // The poster's name and the brief title, for the notification.
  const [{ data: brief }, { data: me }] = await Promise.all([
    supabase.from("briefs").select("title, poster_id").eq("id", briefId).maybeSingle(),
    supabase.from("profiles").select("display_name").eq("id", user.id).maybeSingle(),
  ]);
  if (brief) {
    after(() =>
      notifyNewPitch({
        briefId,
        briefTitle: brief.title,
        posterId: brief.poster_id,
        expertName: me?.display_name?.trim() || "An expert",
      }),
    );
  }
  refresh();
  return {};
}

/** The expert edits nothing here; they can withdraw a pitch that is still waiting. */
export async function withdrawPitch(pitchId: string): Promise<{ message?: string }> {
  await requireUser();
  if (!isUuid(pitchId)) return { message: "That pitch is not available." };
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pitches")
    .update({ status: "withdrawn" })
    .eq("id", pitchId)
    .eq("status", "submitted")
    .select("id");
  refresh();
  if (error || !data?.length) return { message: "This pitch can no longer be withdrawn." };
  return {};
}

/**
 * The poster (or their organisation) accepts a pitch: `accept_pitch` awards
 * the brief, declines the other pitches and opens an accepted booking.
 */
export async function acceptPitch(pitchId: string): Promise<{ message?: string }> {
  await requireUser();
  if (!isUuid(pitchId)) return { message: "That pitch is not available." };
  const supabase = await createClient();

  // Who else pitched, so they hear the outcome too.
  const { data: pitch } = await supabase.from("pitches").select("brief_id, briefs(title)").eq("id", pitchId).maybeSingle();
  const { data: others } = pitch
    ? await supabase.from("pitches").select("expert_id").eq("brief_id", pitch.brief_id).eq("status", "submitted").neq("id", pitchId)
    : { data: [] };

  const { data: booking, error } = await supabase.rpc("accept_pitch", { p_pitch_id: pitchId });
  if (error || !booking) {
    refresh();
    if (error?.code === "42501") return { message: "Only the people who posted this brief can accept a pitch." };
    return { message: "This pitch can no longer be accepted. The brief may already be awarded or closed." };
  }

  const briefTitle = pitch?.briefs?.title ?? "Your brief";
  after(async () => {
    await notifyPitchDecision({ expertId: booking.expert_id, briefId: booking.brief_id ?? "", briefTitle, bookingId: booking.id });
    await Promise.all(
      (others ?? []).map((o) => notifyPitchDecision({ expertId: o.expert_id, briefId: booking.brief_id ?? "", briefTitle })),
    );
  });
  redirect(`/bookings/${booking.id}`);
}

export async function declinePitch(pitchId: string): Promise<{ message?: string }> {
  await requireUser();
  if (!isUuid(pitchId)) return { message: "That pitch is not available." };
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("decline_pitch", { p_pitch_id: pitchId });
  refresh();
  if (error || !data) return { message: "This pitch can no longer be declined." };
  const { data: brief } = await supabase.from("briefs").select("title").eq("id", data.brief_id).maybeSingle();
  after(() => notifyPitchDecision({ expertId: data.expert_id, briefId: data.brief_id, briefTitle: brief?.title ?? "A brief" }));
  return {};
}

/** Close a brief to new pitches, reopen it, or cancel it (RLS: managers, open or closed briefs only). */
export async function setBriefStatus(briefId: string, status: "open" | "closed" | "cancelled"): Promise<{ message?: string }> {
  await requireUser();
  if (!isUuid(briefId)) return { message: "That brief is not available." };
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("briefs")
    .update({ status })
    .eq("id", briefId)
    .in("status", ["open", "closed"])
    .select("id");
  refresh();
  if (error || !data?.length) return { message: "This brief can no longer be changed." };
  return {};
}
