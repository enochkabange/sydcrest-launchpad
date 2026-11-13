"use server";

import { refresh } from "next/cache";
import { trackResult } from "@/lib/analytics/track";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { CONTACT_PAST, NOTE_MAX, isContactKind } from "./rules";

export type ContactState = {
  ok?: string;
  message?: string;
  errors?: Partial<Record<"note", string>>;
  /** Changes on every success so the form can reset its note. */
  at?: number;
};

/**
 * Logs a contact with a learner from the caseload (one tap: the button sets
 * the kind). RLS decides who may: cohort staff of a cohort the learner is in,
 * the lead of their chapter, or an admin (private.can_contact_learner).
 */
export async function logContact(learnerId: string, _prev: ContactState, form: FormData): Promise<ContactState> {
  await requireUser();
  const kind = form.get("kind");
  if (!isContactKind(kind)) return { message: "Choose message, call or session." };
  const note = String(form.get("note") ?? "").trim();
  if (note.length > NOTE_MAX) return { errors: { note: `Keep the note under ${NOTE_MAX} characters.` } };
  const supabase = await createClient();
  const { error } = await supabase.from("mentor_contacts").insert({ learner_id: learnerId, kind, note: note || null });
  await trackResult("mentor_contact_logged", error, { kind });
  if (error) return { message: "We could not log that. Try again." };
  refresh();
  return { ok: `${CONTACT_PAST[kind]} today. Logged.`, at: Date.now() };
}
