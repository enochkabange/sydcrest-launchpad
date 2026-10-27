"use client";

import { useActionState, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextField } from "@/components/ui/field";
import { TextAreaField } from "./fields";

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

/**
 * Minimal grading form calling grade_submission (through the bound Server
 * Action). Built here because #145's grading component was not on main yet;
 * consolidate with src/components/cohort/submission/ once it lands.
 */
export function GradeForm({
  action,
  defaultScore,
  defaultFeedback,
  passScore,
}: {
  action: Action;
  defaultScore: number | null;
  defaultFeedback: string | null;
  passScore: number;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});
  const [decision, setDecision] = useState<"grade" | "return">("grade");
  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <Status state={state} />
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm font-semibold text-content">Decision</legend>
        <label className="flex min-h-11 items-center gap-3 text-sm text-content">
          <input
            type="radio"
            name="decision"
            value="grade"
            checked={decision === "grade"}
            onChange={() => setDecision("grade")}
            className="size-5 accent-blue-600"
          />
          Grade this work
        </label>
        <label className="flex min-h-11 items-center gap-3 text-sm text-content">
          <input
            type="radio"
            name="decision"
            value="return"
            checked={decision === "return"}
            onChange={() => setDecision("return")}
            className="size-5 accent-blue-600"
          />
          Return it for changes
        </label>
      </fieldset>
      {decision === "grade" && (
        <TextField
          id="score"
          label="Final score (0 to 100)"
          type="number"
          inputMode="numeric"
          min={0}
          max={100}
          step={1}
          defaultValue={defaultScore ?? ""}
          hint={`A week passes at ${passScore}.`}
          error={state.errors?.score}
        />
      )}
      <TextAreaField
        id="feedback"
        label={decision === "return" ? "What to change" : "Feedback for the learner (optional)"}
        defaultValue={defaultFeedback ?? ""}
        maxLength={8000}
        error={state.errors?.feedback}
      />
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving" : decision === "return" ? "Return to learner" : "Save grade"}
      </Button>
    </form>
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
