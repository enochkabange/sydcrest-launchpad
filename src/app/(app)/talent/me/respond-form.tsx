"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";
import { SHARED_CONTACT_MAX } from "@/lib/talent/forms";
import { respondToRequest, type RespondState } from "../actions";

/** Accept (optionally sharing one contact detail) or decline a request. Nothing is shared on decline. */
export function RespondForm({ requestId, organisation }: { requestId: string; organisation: string }) {
  const [state, action, pending] = useActionState<RespondState, FormData>(respondToRequest.bind(null, requestId), {});
  const id = `shared_contact-${requestId}`;
  return (
    <form action={action} className="flex flex-col gap-3" aria-label={`Reply to ${organisation}`}>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <TextField
        id={id}
        name="shared_contact"
        label="What should they use to reach you? (optional)"
        hint={`An email address or phone number you are happy to give ${organisation}. Leave it empty to share nothing yet.`}
        error={state.error}
        maxLength={SHARED_CONTACT_MAX}
      />
      <div className="flex flex-wrap gap-2">
        <Button type="submit" name="answer" value="accept" disabled={pending}>
          Accept
        </Button>
        <Button type="submit" name="answer" value="decline" variant="secondary" disabled={pending}>
          Decline
        </Button>
      </div>
    </form>
  );
}
