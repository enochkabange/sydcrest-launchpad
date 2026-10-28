"use server";

import { refresh } from "next/cache";
import { getMyProfile, requireUser } from "@/lib/auth";
import { loadThread } from "@/lib/bookings/data";
import {
  ACTION_STATUS,
  isBookingAction,
  messageErrorMessage,
  otherParty,
  parseMessage,
  parseReason,
  parseReview,
  reviewErrorMessage,
  statusErrorMessage,
  type BookingThread,
} from "@/lib/bookings/model";
import { notifyBookingEvent } from "@/lib/bookings/notify";
import type { Database } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/server";

type ReviewInsert = Database["public"]["Tables"]["expert_reviews"]["Insert"];

export type FormState = { errors?: Record<string, string>; message?: string; values?: Record<string, string>; ok?: boolean };

async function context(bookingId: string) {
  const user = await requireUser();
  const supabase = await createClient();
  const thread = await loadThread(supabase, bookingId);
  return { user, supabase, thread };
}

/** The other side of the booking hears about it; the expert hears about everything the requester side does. */
async function tellOtherParty(thread: BookingThread, viewerId: string, event: Parameters<typeof notifyBookingEvent>[1]) {
  const me = await getMyProfile();
  const recipient = otherParty(thread, viewerId).id;
  await notifyBookingEvent(recipient, event, { id: thread.id, offerTitle: thread.offerTitle }, me.display_name ?? "A SydCrest member");
}

/** Accept, decline, cancel or complete, only through set_booking_status. */
export async function changeStatus(bookingId: string, _prev: FormState, form: FormData): Promise<FormState> {
  const action = form.get("action");
  if (!isBookingAction(action)) return { message: statusErrorMessage(null) };
  const { data, errors } = parseReason(form);
  if (Object.keys(errors).length) return { errors, values: { reason: String(form.get("reason") ?? "") } };

  const { user, supabase, thread } = await context(bookingId);
  if (!thread) return { message: statusErrorMessage({ code: "P0002" }) };

  const status = ACTION_STATUS[action];
  const { error } = await supabase.rpc("set_booking_status", {
    p_booking_id: bookingId,
    p_status: status,
    // Completion takes no reason.
    ...(action !== "complete" && data.reason ? { p_reason: data.reason } : {}),
  });
  refresh();
  if (error) return { message: statusErrorMessage(error) };
  await tellOtherParty(thread, user.id, status as "accepted" | "declined" | "cancelled" | "completed");
  return { ok: true };
}

/** Appends a message. RLS checks the sender is a party and the booking is still open for messages. */
export async function sendMessage(bookingId: string, _prev: FormState, form: FormData): Promise<FormState> {
  const { data, errors } = parseMessage(form);
  if (Object.keys(errors).length) return { errors, values: { body: data.body } };

  const { user, supabase, thread } = await context(bookingId);
  if (!thread) return { message: messageErrorMessage(null) };

  const { error } = await supabase.from("booking_messages").insert({ booking_id: bookingId, sender_id: user.id, body: data.body });
  if (error) {
    refresh();
    return { message: messageErrorMessage(error), values: { body: data.body } };
  }
  refresh();
  await tellOtherParty(thread, user.id, "message");
  return { ok: true };
}

/** The booker reviews a completed booking, once. It shows on the expert's public page straight away. */
export async function leaveReview(bookingId: string, _prev: FormState, form: FormData): Promise<FormState> {
  const { data, errors } = parseReview(form);
  if (Object.keys(errors).length) return { errors, values: { rating: String(form.get("rating") ?? ""), review: data.body ?? "" } };

  const { user, supabase, thread } = await context(bookingId);
  if (!thread) return { message: reviewErrorMessage(null) };

  const { error } = await supabase
    .from("expert_reviews")
    // expert_id is copied from the booking by a trigger; the column grant does not let us send it.
    .insert({ booking_id: bookingId, reviewer_id: user.id, rating: data.rating, body: data.body } as ReviewInsert);
  refresh();
  if (error) return { message: reviewErrorMessage(error), values: { rating: String(data.rating), review: data.body ?? "" } };
  await tellOtherParty(thread, user.id, "review");
  return { ok: true };
}
