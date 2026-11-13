"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { ContactState } from "@/lib/early-warning/actions";
import { CONTACT_KINDS, CONTACT_LABEL, NOTE_MAX } from "@/lib/early-warning/rules";

type Action = (prev: ContactState, form: FormData) => Promise<ContactState>;

/**
 * One tap logging: each button sends its kind. The short note is optional
 * and folded away so the common case stays one tap.
 */
export function LogContact({ action, name, id }: { action: Action; name: string; id: string }) {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(action, {});
  const noteId = `contact-note-${id}`;
  return (
    <form key={state.at ?? 0} action={formAction} className="flex flex-col gap-2" aria-label={`Log a contact with ${name}`}>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.ok && <Alert tone="success">{state.ok}</Alert>}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Log a contact">
        {CONTACT_KINDS.map((k) => (
          <Button
            key={k}
            type="submit"
            name="kind"
            value={k}
            variant="secondary"
            disabled={pending}
            aria-label={`Log a ${CONTACT_LABEL[k].toLowerCase()} with ${name}`}
          >
            {CONTACT_LABEL[k]}
          </Button>
        ))}
      </div>
      <details className="text-sm">
        <summary className="inline-flex min-h-11 cursor-pointer items-center text-content-link">Add a short note</summary>
        <div className="flex flex-col gap-1 pt-1">
          <label htmlFor={noteId} className="font-semibold text-content">
            Note (optional)
          </label>
          <input
            id={noteId}
            name="note"
            maxLength={NOTE_MAX}
            aria-invalid={state.errors?.note ? true : undefined}
            aria-describedby={state.errors?.note ? `${noteId}-error` : `${noteId}-hint`}
            className="min-h-11 w-full rounded-md border border-line-strong bg-surface px-3 text-base text-content"
          />
          {state.errors?.note ? (
            <p id={`${noteId}-error`} className="text-danger-fg">
              {state.errors.note}
            </p>
          ) : (
            <p id={`${noteId}-hint`} className="text-content-3">
              Staff only. Keep it short and factual, for example what you agreed.
            </p>
          )}
        </div>
      </details>
    </form>
  );
}
