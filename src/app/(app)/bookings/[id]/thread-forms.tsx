"use client";

import { useActionState, useState } from "react";
import { TextAreaField } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { MESSAGE_MAX, REASON_MAX, REVIEW_MAX, type BookingAction } from "@/lib/bookings/model";
import { changeStatus, leaveReview, sendMessage, type FormState } from "./actions";

const ACTION_COPY: Record<BookingAction, { button: string; confirm: string; confirmButton: string; reasonLabel?: string }> = {
  accept: { button: "Accept request", confirm: "", confirmButton: "" },
  complete: {
    button: "Mark as completed",
    confirm: "Mark this booking completed? Do this once the session or work is done. The person who booked can then leave a review.",
    confirmButton: "Yes, it is completed",
  },
  decline: {
    button: "Decline",
    confirm: "Decline this request? The thread closes and they can request again later.",
    confirmButton: "Yes, decline",
    reasonLabel: "A short note for them",
  },
  cancel: {
    button: "Cancel booking",
    confirm: "Cancel this booking? The thread closes for both of you.",
    confirmButton: "Yes, cancel",
    reasonLabel: "Why are you cancelling?",
  },
};

/** The status changes this person can make now. Anything that ends or closes a booking asks once more. */
export function StatusActions({ bookingId, actions }: { bookingId: string; actions: BookingAction[] }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(changeStatus.bind(null, bookingId), {});
  const [confirming, setConfirming] = useState<BookingAction | null>(null);

  if (confirming) {
    const copy = ACTION_COPY[confirming];
    return (
      <form action={formAction} className="flex flex-col gap-3">
        <input type="hidden" name="action" value={confirming} />
        <p className="text-sm text-content-2">{copy.confirm}</p>
        {copy.reasonLabel && (
          <TextAreaField id="reason" label={`${copy.reasonLabel} (optional)`} rows={3} maxLength={REASON_MAX} error={state.errors?.reason} />
        )}
        {state.message && <Alert tone="danger">{state.message}</Alert>}
        <div className="flex flex-wrap gap-2">
          <Button type="submit" variant={confirming === "complete" ? "primary" : "secondary"} disabled={pending}>
            {pending ? "Saving…" : copy.confirmButton}
          </Button>
          <Button variant="ghost" onClick={() => setConfirming(null)} disabled={pending}>
            Go back
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <div className="flex flex-wrap gap-2">
        {actions.map((a) =>
          a === "accept" ? (
            <form key={a} action={formAction}>
              <input type="hidden" name="action" value="accept" />
              <Button type="submit" disabled={pending}>
                {pending ? "Saving…" : ACTION_COPY.accept.button}
              </Button>
            </form>
          ) : (
            <Button key={a} variant={a === "complete" ? "primary" : "secondary"} onClick={() => setConfirming(a)}>
              {ACTION_COPY[a].button}
            </Button>
          ),
        )}
      </div>
    </div>
  );
}

export function MessageComposer({ bookingId, otherName }: { bookingId: string; otherName: string }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(sendMessage.bind(null, bookingId), {});
  return (
    <form action={formAction} className="flex flex-col gap-3">
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <TextAreaField
        id="body"
        label={`Message ${otherName}`}
        rows={3}
        maxLength={MESSAGE_MAX}
        required
        defaultValue={state.values?.body}
        error={state.errors?.body}
        hint="Agree a time and how you will meet. Keep money out of it: everything is free during the soft launch."
      />
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

export function ReviewForm({ bookingId, expertFirstName }: { bookingId: string; expertFirstName: string }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(leaveReview.bind(null, bookingId), {});
  const chosen = state.values?.rating;
  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <fieldset className="flex flex-col gap-2" aria-describedby={state.errors?.rating ? "rating-error" : undefined}>
        <legend className="text-sm font-semibold text-content">How was it?</legend>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <label
              key={n}
              className="relative inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-line-strong px-3 text-sm font-semibold text-content has-checked:border-content-link has-checked:bg-info-bg has-checked:text-info-fg has-focus-visible:outline-2 has-focus-visible:outline-offset-2"
            >
              <input type="radio" name="rating" value={n} defaultChecked={chosen === String(n)} required className="sr-only" />
              {n}
              <span className="sr-only">{n === 1 ? "star" : "stars"}</span>
            </label>
          ))}
        </div>
        <p className="text-sm text-content-3">1 is poor, 5 is excellent.</p>
        {state.errors?.rating && (
          <p id="rating-error" className="text-sm text-danger-fg">
            {state.errors.rating}
          </p>
        )}
      </fieldset>
      <TextAreaField
        id="review"
        label={`What should others know about working with ${expertFirstName}? (optional)`}
        rows={4}
        maxLength={REVIEW_MAX}
        defaultValue={state.values?.review}
        error={state.errors?.review}
        hint="Your review shows on their public page with your name if your profile is public."
      />
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving…" : "Post review"}
      </Button>
    </form>
  );
}
