"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/field";
import {
  createExperiment,
  setExperimentStatus,
  type ExperimentFormState,
} from "./actions";

/** A new experiment, saved as a draft. */
export function NewExperimentForm() {
  const [state, action, pending] = useActionState<
    ExperimentFormState,
    FormData
  >(createExperiment, {});
  return (
    <form
      action={action}
      className="flex flex-col gap-4"
      aria-label="New experiment"
    >
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.done && (
        <Alert tone="success">
          Saved {state.done} as a draft. Start it when the split looks right.
        </Alert>
      )}
      <TextField
        id="key"
        label="Key"
        hint="Lower case letters, numbers and underscores, e.g. new_welcome. The code asks for it by this key."
        required
        maxLength={60}
        autoComplete="off"
      />
      <TextAreaField
        id="description"
        label="What is being tested"
        hint="For admins only."
        maxLength={500}
      />
      <TextField
        id="variants"
        label="Variants and weights"
        hint="The first is the baseline everyone gets when the experiment is off. For a feature flag use off:90, on:10."
        required
        defaultValue="control:50, change:50"
        autoComplete="off"
      />
      <SelectField
        id="metric"
        label="What counts as coming back"
        defaultValue="came_back_7d"
      >
        <option value="came_back_7d">
          Came back on a later day within 7 days (changes people see on the
          platform)
        </option>
        <option value="active_7d">
          Active within 7 days (messages to people who are away)
        </option>
      </SelectField>
      <Button type="submit" disabled={pending} className="self-start">
        Save as draft
      </Button>
    </form>
  );
}

/** Start (draft) or stop (running). Stopped is final. */
export function StatusForm({
  id,
  status,
  label,
}: {
  id: string;
  status: string;
  label: string;
}) {
  const [state, action, pending] = useActionState<
    ExperimentFormState,
    FormData
  >(setExperimentStatus.bind(null, id), {});
  if (status === "stopped") return null;
  return (
    <form
      action={action}
      className="flex flex-col gap-2"
      aria-label={`Status of ${label}`}
    >
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {status === "draft" ? (
        <Button type="submit" name="status" value="running" disabled={pending}>
          Start {label}
        </Button>
      ) : (
        <Button
          type="submit"
          name="status"
          value="stopped"
          variant="secondary"
          disabled={pending}
        >
          Stop {label}
        </Button>
      )}
    </form>
  );
}
