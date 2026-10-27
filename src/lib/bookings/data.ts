import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import { isUuid, toThread, type BookingThread } from "./model";

/**
 * Reads for the inbox and the thread, with the signed in user's client.
 * `booking_threads` returns only bookings the caller is a party to (or an
 * admin); the filters here pick the caller's own side of them.
 */

type Client = SupabaseClient<Database>;

const THREAD_COLUMNS =
  "id, status, requester_id, requester_name, requester_avatar, expert_id, expert_name, expert_avatar, expert_slug, offer_id, offer_title, offer_kind, organisation_id, organisation_name, message, preferred_times, status_reason, responded_at, completed_at, has_review, last_message_at, created_at";

function fail(what: string, error: { message: string }): never {
  throw new Error(`Could not load ${what}: ${error.message}`);
}

/** Every booking the viewer sent or received. */
export async function loadMyThreads(supabase: Client, viewerId: string): Promise<BookingThread[]> {
  const { data, error } = await supabase
    .from("booking_threads")
    .select(THREAD_COLUMNS)
    .or(`requester_id.eq.${viewerId},expert_id.eq.${viewerId}`)
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) fail("bookings", error);
  return (data ?? []).flatMap((r) => toThread(r) ?? []);
}

/** One booking the viewer can read, or null. */
export async function loadThread(supabase: Client, id: string): Promise<BookingThread | null> {
  if (!isUuid(id)) return null;
  const { data, error } = await supabase.from("booking_threads").select(THREAD_COLUMNS).eq("id", id).maybeSingle();
  if (error) fail("booking", error);
  return data ? toThread(data) : null;
}

export type ThreadMessage = { id: string; senderId: string; body: string; createdAt: string };

export async function loadMessages(supabase: Client, bookingId: string): Promise<ThreadMessage[]> {
  const { data, error } = await supabase
    .from("booking_messages")
    .select("id, sender_id, body, created_at")
    .eq("booking_id", bookingId)
    .order("created_at")
    .limit(500);
  if (error) fail("messages", error);
  return (data ?? []).map((m) => ({ id: m.id, senderId: m.sender_id, body: m.body, createdAt: m.created_at }));
}

/** The viewer's own review of a booking, if they left one. */
export async function loadMyReview(supabase: Client, bookingId: string, viewerId: string) {
  const { data, error } = await supabase
    .from("expert_reviews")
    .select("rating, body, created_at, is_hidden")
    .eq("booking_id", bookingId)
    .eq("reviewer_id", viewerId)
    .maybeSingle();
  if (error) fail("review", error);
  return data;
}

/** The viewer's request still waiting with this expert, so the form can point to it instead. */
export async function findOpenRequest(supabase: Client, viewerId: string, expertId: string) {
  const { data, error } = await supabase
    .from("booking_requests")
    .select("id")
    .eq("requester_id", viewerId)
    .eq("expert_id", expertId)
    .eq("status", "requested")
    .maybeSingle();
  if (error) fail("requests", error);
  return data?.id ?? null;
}
