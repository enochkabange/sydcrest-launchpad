"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckboxField, CheckboxGroup, SelectField, TextField } from "@/components/ui/field";
import { EARNINGS_BANDS, WORK_STATUSES } from "@/lib/outcomes/checkins";
import type { CheckinFormState } from "./actions";

export type CheckinInitial = {
  work_status: string | null;
  organisation: string | null;
  earnings_band: string | null;
  skills: string[];
  share_in_reports: boolean;
};

/** The short check in form: one required question, the rest optional. */
export function CheckinForm({
  action,
  initial,
  skillOptions,
}: {
  action: (prev: CheckinFormState, form: FormData) => Promise<CheckinFormState>;
  initial: CheckinInitial;
  skillOptions: { value: string; label: string }[];
}) {
  const [state, formAction, pending] = useActionState<CheckinFormState, FormData>(action, {});
  const errors = state.errors ?? {};

  return (
    <form data-analytics-form="outcome_checkin" action={formAction} className="flex flex-col gap-6" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {Object.keys(errors).length > 0 && <Alert tone="danger">Check the fields marked below.</Alert>}

      <SelectField id="work_status" label="What are you doing now?" defaultValue={initial.work_status ?? ""} error={errors.work_status} required>
        <option value="">Choose one</option>
        {WORK_STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </SelectField>

      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          id="organisation"
          label="Where? (optional)"
          hint="The organisation, your business name or your main client."
          defaultValue={initial.organisation ?? ""}
          error={errors.organisation}
          maxLength={120}
        />
        <SelectField
          id="earnings_band"
          label="Monthly earnings (optional)"
          hint="Reports only ever show totals."
          defaultValue={initial.earnings_band ?? ""}
          error={errors.earnings_band}
        >
          <option value="">Prefer not to say</option>
          {EARNINGS_BANDS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </SelectField>
      </div>

      {skillOptions.length > 0 && (
        <CheckboxGroup
          name="skills"
          legend="Which of your skills do you use? (optional)"
          legendStyle="field"
          options={skillOptions}
          checked={initial.skills}
          error={errors.skills}
        />
      )}

      <CheckboxField id="share" defaultChecked={initial.share_in_reports}>
        Count my answers, without my name, in reports for the organisations that sponsor my cohort or chapter. Reports show
        totals only, and any number under five is hidden.
      </CheckboxField>

      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving" : "Send my answers"}
      </Button>
    </form>
  );
}
