"use server";

import { trackRefusal, trackResult } from "@/lib/analytics/track";
import { redirect } from "next/navigation";
import { getMyProfile, requireUser } from "@/lib/auth";
import { notifyBookingEvent } from "@/lib/bookings/notify";
import { bookingPath, parseRequest, requestErrorMessage } from "@/lib/bookings/model";
import { getOffer } from "@/lib/experts/queries";
import { createClient } from "@/lib/supabase/server";

export type RequestState = {
  errors?: Record<string, string>;
  message?: string;
  values?: { message?: string; preferred_times?: string };
};

/**
 * Sends a booking request for one active offer. RLS checks the requester is
 * an adult asking as themselves; the insert trigger checks the offer is
 * active and the expert is approved and taking requests. No payment.
 */
export async function submitRequest(slug: string, offerId: string, _prev: RequestState, form: FormData): Promise<RequestState> {
  const user = await requireUser();
  const { data, errors } = parseRequest(form);
  const values = { message: data.message, preferred_times: data.preferred_times ?? "" };
  if (Object.keys(errors).length) {
    await trackRefusal("booking_requested", "validation");
    return { errors, values };
  }

  const found = await getOffer(slug, offerId);
  if (!found || !found.expert.acceptingRequests) return { message: requestErrorMessage({ code: "22023" }), values };
  const { expert, offer } = found;

  const supabase = await createClient();
  const { data: booking, error } = await supabase
    .from("booking_requests")
    .insert({ requester_id: user.id, expert_id: expert.profileId, offer_id: offer.id, ...data })
    .select("id")
    .single();
  await trackResult("booking_requested", error ?? (booking ? null : { code: "P0002" }));
  if (error || !booking) return { message: requestErrorMessage(error), values };

  const me = await getMyProfile();
  await notifyBookingEvent(expert.profileId, "requested", { id: booking.id, offerTitle: offer.title }, me.display_name ?? "A SydCrest member");
  redirect(bookingPath(booking.id));
}
