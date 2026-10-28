"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { parseEventForm, parseJoinUrl, parseRecordingForm, type Errors } from "@/lib/events/forms";
import { revalidateEvents } from "@/lib/events/revalidate";

/**
 * Admin event editor. Every action re-checks the admin role, and RLS checks
 * hosting again. Ids come from hidden fields and are only used as filters.
 * Changing the time, venue or status of a published event notifies everyone
 * going or waitlisted (a database trigger), and more seats fill from the
 * waitlist.
 */

export type FormState = { errors?: Errors; message?: string; saved?: number };

const UNIQUE_VIOLATION = "23505";

function field(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
}

export async function createEvent(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const { data, errors } = parseEventForm(form);
  if (Object.keys(errors).length) return { errors };
  const { data: row, error } = await supabase.from("community_events").insert(data).select("id").single();
  if (error?.code === UNIQUE_VIOLATION) return { errors: { slug: "Another event already uses this slug." } };
  if (error) return { message: "We could not create the event. Try again." };
  revalidateEvents(data.slug);
  redirect(`/admin/events/${row.id}`);
}

export async function updateEvent(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const { data, errors } = parseEventForm(form);
  if (Object.keys(errors).length) return { errors };
  const id = field(form, "id");
  const { data: before } = await supabase.from("community_events").select("slug").eq("id", id).maybeSingle();
  const { error } = await supabase.from("community_events").update(data).eq("id", id);
  if (error?.code === UNIQUE_VIOLATION) return { errors: { slug: "Another event already uses this slug." } };
  if (error) return { message: "We could not save the event. Try again." };
  revalidateEvents(...new Set([before?.slug, data.slug].filter((s): s is string => Boolean(s))));
  refresh();
  return { saved: Date.now() };
}

export async function setJoinLink(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const { joinUrl, error: invalid } = parseJoinUrl(form, field(form, "format"));
  if (invalid) return { errors: { join_url: invalid } };
  const { error } = await supabase.from("event_access").update({ join_url: joinUrl }).eq("event_id", field(form, "event_id"));
  if (error) return { message: "We could not save the link. Try again." };
  refresh();
  return { saved: Date.now() };
}

export async function addRecording(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const { data, errors } = parseRecordingForm(form);
  if (Object.keys(errors).length) return { errors };
  const { error } = await supabase.from("event_recordings").insert({ ...data, event_id: field(form, "event_id") });
  if (error) return { message: "We could not add the recording. Try again." };
  revalidateEvents(field(form, "slug"));
  refresh();
  return { saved: Date.now() };
}

export async function setRecordingPublished(form: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("event_recordings")
    .update({ is_published: field(form, "publish") === "true" })
    .eq("id", field(form, "id"));
  if (error) throw new Error(`Could not change the recording: ${error.message}`);
  revalidateEvents(field(form, "slug"));
  refresh();
}

export async function deleteRecording(form: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("event_recordings").delete().eq("id", field(form, "id"));
  if (error) throw new Error(`Could not remove the recording: ${error.message}`);
  revalidateEvents(field(form, "slug"));
  refresh();
}
