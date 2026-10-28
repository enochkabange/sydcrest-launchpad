"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextAreaField } from "@/components/bookings/text-area-field";
import { PREFERRED_TIMES_MAX, REQUEST_MESSAGE_MAX } from "@/lib/bookings/model";
import { submitRequest, type RequestState } from "./actions";

export function RequestForm({ slug, offerId, expertFirstName }: { slug: string; offerId: string; expertFirstName: string }) {
  const [state, action, pending] = useActionState<RequestState, FormData>(submitRequest.bind(null, slug, offerId), {});
  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <TextAreaField
        id="message"
        label={`What would you like help with?`}
        hint={`Say where you are now and what you want to get out of it. ${expertFirstName} reads this before accepting.`}
        rows={6}
        maxLength={REQUEST_MESSAGE_MAX}
        required
        defaultValue={v.message}
        error={e.message}
      />
      <TextAreaField
        id="preferred_times"
        label="When suits you?"
        hint="Days and times that work for you, for example Saturday mornings or weekday evenings."
        rows={3}
        maxLength={PREFERRED_TIMES_MAX}
        defaultValue={v.preferred_times}
        error={e.preferred_times}
      />
      <Button type="submit" disabled={pending} className="w-full sm:w-auto sm:self-start">
        {pending ? "Sending…" : "Send request"}
      </Button>
    </form>
  );
}
