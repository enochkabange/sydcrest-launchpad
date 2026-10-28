"use client";

import { useActionState, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextAreaField } from "@/components/ui/field";
import { ANSWER_MAX, type ScreeningQuestion, type Specialization } from "@/lib/programme-apply/screening";
import { submitApplication, withdrawApplication, type ApplyState, type WithdrawState } from "./actions";

type CohortOption = { id: string; label: string };

export function ApplicationForm({
  questions,
  specializations,
  cohorts,
}: {
  questions: ScreeningQuestion[];
  specializations: Specialization[];
  cohorts: CohortOption[];
}) {
  const [state, action, pending] = useActionState<ApplyState, FormData>(submitApplication, {});
  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {questions.map((q) => {
        const id = `answer_${q.id}`;
        if (q.kind === "text") {
          return <TextAreaField
              key={q.id}
              id={id}
              label={q.required ? q.prompt : `${q.prompt} (optional)`}
              rows={5}
              maxLength={ANSWER_MAX}
              required={q.required}
              error={e[`answer_${q.id}`]}
              defaultValue={v[id]}
            />;
        }
        return (
          <SelectField
            key={q.id}
            id={id}
            label={q.required ? q.prompt : `${q.prompt} (optional)`}
            defaultValue={v[id] ?? ""}
            error={e[`answer_${q.id}`]}
            required={q.required}
          >
            <option value="" disabled={q.required}>
              Choose an answer
            </option>
            {q.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </SelectField>
        );
      })}
      {specializations.length > 0 && (
        <SelectField
          id="specialization"
          label="Which specialisation interests you most?"
          hint="You choose for real after the shared weeks, so a guess is fine."
          defaultValue={v.specialization ?? ""}
          error={e.specialization}
        >
          <option value="">Not sure yet</option>
          {specializations.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.label}
            </option>
          ))}
        </SelectField>
      )}
      {cohorts.length > 0 && (
        <SelectField
          id="preferred_cohort_id"
          label="Which cohort would you like to join?"
          defaultValue={v.preferred_cohort_id ?? ""}
          error={e.preferred_cohort_id}
        >
          <option value="">Any cohort</option>
          {cohorts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </SelectField>
      )}
      <Button type="submit" disabled={pending} className="w-full sm:w-auto sm:self-start">
        {pending ? "Sending…" : "Send my application"}
      </Button>
    </form>
  );
}

/** Withdraw with a second tap to confirm, so a stray tap does not end an application. */
export function WithdrawButton({ applicationId }: { applicationId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [state, action, pending] = useActionState<WithdrawState, FormData>(
    withdrawApplication.bind(null, applicationId),
    {},
  );

  if (!confirming) {
    return (
      <Button variant="secondary" onClick={() => setConfirming(true)}>
        Withdraw application
      </Button>
    );
  }
  return (
    <form action={action} className="flex flex-col gap-3">
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <p className="text-sm text-content-2">Withdraw this application? You can apply again later.</p>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" variant="secondary" disabled={pending}>
          {pending ? "Withdrawing…" : "Yes, withdraw"}
        </Button>
        <Button variant="ghost" onClick={() => setConfirming(false)}>
          Keep my application
        </Button>
      </div>
    </form>
  );
}
