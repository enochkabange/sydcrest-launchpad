"use server";

import { refresh } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { eventErrorMessage, normaliseCode, parseFeedbackForm, type Errors } from "./forms";
import type { RsvpStatus } from "./labels";

/**
 * Attendee and host actions. Every state change goes through the database
 * functions (rsvp_event, cancel_rsvp, check_in_event, host_check_in,
 * rotate_event_checkin_code), which check who may do what; feedback is a
 * plain insert or update that RLS limits to people who checked in. Ids come
 * from hidden fields, so they are only ever passed to those checks.
 */

export type ActionState = { message?: string; ok?: number; errors?: Errors; rsvp?: RsvpStatus; code?: string };

function field(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
}

async function signedIn() {
  const user = await getCurrentUser();
  if (!user || !user.hasAgeAndConsent) return null;
  return { user, supabase: await createClient() };
}

export async function rsvpAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const session = await signedIn();
  if (!session) return { message: "Sign in to RSVP." };
  const { data, error } = await session.supabase.rpc("rsvp_event", { p_event_id: field(form, "event_id") });
  if (error) return { message: eventErrorMessage(error) };
  refresh();
  return { ok: Date.now(), rsvp: data as RsvpStatus };
}

export async function cancelRsvpAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const session = await signedIn();
  if (!session) return { message: "Sign in first." };
  const { error } = await session.supabase.rpc("cancel_rsvp", { p_event_id: field(form, "event_id") });
  if (error) return { message: eventErrorMessage(error) };
  refresh();
  return { ok: Date.now(), rsvp: "cancelled" };
}

export async function checkInAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const session = await signedIn();
  if (!session) return { message: "Sign in to check in." };
  const code = normaliseCode(field(form, "code"));
  if (!code) return { errors: { code: "Enter the code from the host." } };
  const { error } = await session.supabase.rpc("check_in_event", { p_event_id: field(form, "event_id"), p_code: code });
  if (error) {
    const message = eventErrorMessage(error);
    return error.message?.includes("Wrong code") ? { errors: { code: message } } : { message };
  }
  refresh();
  return { ok: Date.now() };
}

export async function feedbackAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const session = await signedIn();
  if (!session) return { message: "Sign in first." };
  const { data, errors } = parseFeedbackForm(form);
  if (Object.keys(errors).length) return { errors, message: errors.form };
  const eventId = field(form, "event_id");
  const { supabase, user } = session;

  // Insert the first time, update after: an upsert would also try to update
  // event_id and profile_id, which nobody may change.
  const { data: existing } = await supabase
    .from("event_feedback")
    .select("event_id")
    .eq("event_id", eventId)
    .eq("profile_id", user.id)
    .maybeSingle();
  const { error } = existing
    ? await supabase.from("event_feedback").update(data).eq("event_id", eventId).eq("profile_id", user.id)
    : await supabase.from("event_feedback").insert({ ...data, event_id: eventId });
  if (error) {
    return {
      message:
        error.code === "42501"
          ? "Feedback opens to people who checked in, once the event has started."
          : "We could not save your feedback. Try again.",
    };
  }
  refresh();
  return { ok: Date.now() };
}

export async function hostCheckInAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const session = await signedIn();
  if (!session) return { message: "Sign in first." };
  const { error } = await session.supabase.rpc("host_check_in", {
    p_event_id: field(form, "event_id"),
    p_profile_id: field(form, "profile_id"),
  });
  if (error) return { message: eventErrorMessage(error) };
  refresh();
  return { ok: Date.now() };
}

export async function rotateCodeAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const session = await signedIn();
  if (!session) return { message: "Sign in first." };
  const { data, error } = await session.supabase.rpc("rotate_event_checkin_code", { p_event_id: field(form, "event_id") });
  if (error) return { message: eventErrorMessage(error) };
  refresh();
  return { ok: Date.now(), code: data ?? undefined };
}
