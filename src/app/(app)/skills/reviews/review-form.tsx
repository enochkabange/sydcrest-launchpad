"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { ReviewState } from "../actions";

/** Approve, or send back with a note on what to improve (the note is required to send back). */
export function ReviewForm({
  attemptId,
  action,
}: {
  attemptId: string;
  action: (prev: ReviewState, form: FormData) => Promise<ReviewState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const noteId = `note-${attemptId}`;
  const error = state.errors?.note;

  if (state.done) {
    return <Alert tone="success">{state.done === "approved" ? "Approved. The badge is on their profile." : "Sent back with your note."}</Alert>;
  }

  return (
    <form action={formAction} className="flex flex-col gap-3 border-t border-line pt-3" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <div className="flex flex-col gap-1.5">
        <label htmlFor={noteId} className="text-sm font-semibold text-content">
          Note to the person
        </label>
        <textarea
          id={noteId}
          name="note"
          rows={3}
          maxLength={2000}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${noteId}-error` : `${noteId}-hint`}
          className="min-h-20 w-full rounded-md border border-line-strong bg-surface px-3 py-2 text-base text-content placeholder:text-content-3 aria-invalid:border-danger-fg"
        />
        {error ? (
          <p id={`${noteId}-error`} className="text-sm text-danger-fg">
            {error}
          </p>
        ) : (
          <p id={`${noteId}-hint`} className="text-sm text-content-3">
            Optional when you approve. Needed when you send the work back.
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" name="decision" value="approve" disabled={pending}>
          Approve and verify
        </Button>
        <Button type="submit" name="decision" value="reject" variant="secondary" disabled={pending}>
          Send back
        </Button>
      </div>
    </form>
  );
}
