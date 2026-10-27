"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";
import { checkInAction, type ActionState } from "@/lib/events/actions";

/** Enter the code shown at the venue or read out in the webinar. The database checks it. */
export function CheckInForm({ eventId }: { eventId: string }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(checkInAction, {});
  return (
    <form action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <input type="hidden" name="event_id" value={eventId} />
      <TextField
        id="code"
        label="Check in code"
        hint="Eight letters and numbers, for example ABCD 2345. Capitals, spaces and hyphens do not matter."
        error={state.errors?.code}
        autoComplete="off"
        autoCapitalize="characters"
        autoCorrect="off"
        spellCheck={false}
        maxLength={12}
        required
        className="min-h-14 w-full rounded-md border border-line-strong bg-surface px-3 font-mono text-2xl tracking-[0.2em] text-content uppercase aria-invalid:border-danger-fg"
      />
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Checking…" : "Check in"}
      </Button>
    </form>
  );
}
