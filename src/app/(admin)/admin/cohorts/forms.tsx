"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextField } from "@/components/ui/field";
import { COHORT_STATUSES, COHORT_STATUS_LABEL } from "@/lib/mentor/progress";
import type { AdminFormState } from "./actions";

type Action = (prev: AdminFormState, form: FormData) => Promise<AdminFormState>;

function Status({ state }: { state: AdminFormState }) {
  return (
    <>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.ok && <Alert tone="success">{state.ok}</Alert>}
    </>
  );
}

export function CohortForm({
  action,
  programs,
  cohort,
  submitLabel,
}: {
  action: Action;
  programs: { id: string; title: string; default_cohort_size: number }[];
  cohort?: { program_id: string; name: string; starts_on: string; max_size: number; status: string };
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<AdminFormState, FormData>(action, {});
  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <Status state={state} />
      {cohort ? (
        <input type="hidden" name="program_id" value={cohort.program_id} />
      ) : (
        <SelectField id="program_id" label="Programme" defaultValue={programs.length === 1 ? programs[0].id : ""} error={state.errors?.program_id}>
          <option value="">Choose a programme</option>
          {programs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </SelectField>
      )}
      <TextField id="name" label="Name" hint="For example, Tamale pilot, January 2027." defaultValue={cohort?.name ?? ""} maxLength={80} error={state.errors?.name} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="starts_on" label="Starts on" type="date" defaultValue={cohort?.starts_on ?? ""} error={state.errors?.starts_on} />
        <TextField
          id="max_size"
          label="Learner places"
          type="number"
          inputMode="numeric"
          min={1}
          max={200}
          defaultValue={cohort?.max_size ?? programs[0]?.default_cohort_size ?? 20}
          error={state.errors?.max_size}
        />
      </div>
      <SelectField id="status" label="Status" defaultValue={cohort?.status ?? "planned"} error={state.errors?.status}>
        {COHORT_STATUSES.map((s) => (
          <option key={s} value={s}>
            {COHORT_STATUS_LABEL[s]}
          </option>
        ))}
      </SelectField>
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving" : submitLabel}
      </Button>
    </form>
  );
}

export function AddStaffForm({ action }: { action: Action }) {
  const [state, formAction, pending] = useActionState<AdminFormState, FormData>(action, {});
  return (
    <form key={state.at ?? 0} action={formAction} className="flex flex-col gap-4" noValidate>
      <Status state={state} />
      <TextField id="email" label="Their sign in email" type="email" autoComplete="off" error={state.errors?.email} hint="They need an account first." />
      <SelectField id="role" label="Role" defaultValue="mentor" error={state.errors?.role}>
        <option value="mentor">Mentor</option>
        <option value="coordinator">Coordinator</option>
      </SelectField>
      <Button type="submit" variant="secondary" disabled={pending} className="self-start">
        {pending ? "Adding" : "Add to cohort"}
      </Button>
    </form>
  );
}
