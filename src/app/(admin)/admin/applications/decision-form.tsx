"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/field";
import { NOTE_MAX } from "@/lib/programme-apply/screening";
import { decideApplication, type DecisionState } from "./actions";

export type CohortChoice = { id: string; label: string };

/**
 * One form, three submit buttons (the button's value is the decision). The
 * seat counts in the cohort labels are a hint; the database enforces the cap
 * and a full cohort comes back as a message here.
 */
export function DecisionForm({
  applicationId,
  applicantName,
  cohorts,
  defaultCohortId,
}: {
  applicationId: string;
  applicantName: string;
  cohorts: CohortChoice[];
  defaultCohortId?: string;
}) {
  const [state, action, pending] = useActionState<DecisionState, FormData>(
    decideApplication.bind(null, applicationId),
    {},
  );
  const cohortId = `cohort-${applicationId}`;
  const noteId = `note-${applicationId}`;

  return (
    <form action={action} className="flex flex-col gap-4" aria-label={`Decide on ${applicantName}`}>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {cohorts.length > 0 ? (
        <SelectField id={cohortId} name="cohort_id" label="Cohort" defaultValue={defaultCohortId ?? cohorts[0].id}>
          {cohorts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </SelectField>
      ) : (
        <p className="rounded-md border border-line bg-surface-sunken px-3 py-2.5 text-sm text-content-2">
          There is no open cohort to accept into yet. You can still waitlist or decline.
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        <label htmlFor={noteId} className="text-sm font-semibold text-content">
          Note to the applicant <span className="font-normal text-content-3">(optional, they can read it)</span>
        </label>
        <textarea
          id={noteId}
          name="note"
          rows={2}
          maxLength={NOTE_MAX}
          className="min-h-20 w-full rounded-md border border-line-strong bg-surface px-3 py-2 text-base text-content"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" name="decision" value="accepted" disabled={pending || cohorts.length === 0}>
          Accept
        </Button>
        <Button type="submit" name="decision" value="waitlisted" variant="secondary" disabled={pending}>
          Waitlist
        </Button>
        <Button type="submit" name="decision" value="declined" variant="ghost" disabled={pending}>
          Decline
        </Button>
      </div>
    </form>
  );
}
