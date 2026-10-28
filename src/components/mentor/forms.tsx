"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextAreaField } from "@/components/ui/field";

/** Same shape as FormState in app/(app)/mentor/actions.ts. */
export type FormState = {
  ok?: string;
  message?: string;
  errors?: Partial<Record<string, string>>;
  at?: number;
};

type Action = (prev: FormState, form: FormData) => Promise<FormState>;

function Status({ state }: { state: FormState }) {
  return (
    <>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.ok && <Alert tone="success">{state.ok}</Alert>}
    </>
  );
}

export function AssignReviewForm({
  action,
  candidates,
}: {
  action: Action;
  candidates: { id: string; name: string }[];
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});
  if (!candidates.length) {
    return <p className="text-sm text-content-2">No other active learner in this cohort can review this work yet.</p>;
  }
  return (
    <form action={formAction} className="flex flex-col gap-3" noValidate>
      <Status state={state} />
      <SelectField id="reviewer_id" label="Reviewer" defaultValue="" error={state.errors?.reviewer_id}>
        <option value="">Choose a learner</option>
        {candidates.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </SelectField>
      <Button type="submit" variant="secondary" disabled={pending} className="self-start">
        {pending ? "Assigning" : "Assign peer review"}
      </Button>
    </form>
  );
}

export function NoteForm({ action }: { action: Action }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});
  return (
    <form key={state.at ?? 0} action={formAction} className="flex flex-col gap-3" noValidate>
      <Status state={state} />
      <TextAreaField
        id="body"
        label="New note"
        hint="Only mentors, coordinators and admins see notes. The learner never does."
        maxLength={4000}
        error={state.errors?.body}
      />
      <Button type="submit" variant="secondary" disabled={pending} className="self-start">
        {pending ? "Saving" : "Save note"}
      </Button>
    </form>
  );
}

export function DeferForm({
  action,
  targets,
}: {
  action: Action;
  targets: { id: string; label: string }[];
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});
  if (state.ok) return <Alert tone="success">{state.ok}</Alert>;
  return (
    <form action={formAction} className="flex flex-col gap-3" noValidate>
      <Status state={state} />
      <SelectField
        id="to_cohort_id"
        label="Move to"
        defaultValue=""
        hint="Only later cohorts of this programme are listed. Their work so far moves with them."
      >
        <option value="">No cohort yet: wait for the next one</option>
        {targets.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </SelectField>
      <TextAreaField
        id="reason"
        label="Reason"
        hint="Saved as a private note for staff."
        maxLength={3800}
        required
        error={state.errors?.reason}
      />
      <Button type="submit" variant="secondary" disabled={pending} className="self-start">
        {pending ? "Deferring" : "Defer learner"}
      </Button>
    </form>
  );
}
