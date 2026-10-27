"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/field";
import { reportOpportunity, type ReportState } from "@/lib/opportunities/actions";
import { OPPORTUNITY_REPORT_REASONS } from "@/lib/opportunities/model";

/** Flag a post for the admin reports queue (signed in learners). */
export function ReportOpportunity({ opportunityId, back }: { opportunityId: string; back: string }) {
  const [state, action, pending] = useActionState<ReportState, FormData>(reportOpportunity, {});
  if (state.done) return <Alert tone="success">Thanks. Our team will review this post.</Alert>;

  return (
    <details className="text-sm">
      <summary className="inline-flex min-h-11 cursor-pointer items-center text-content-2 hover:text-content">Report this opportunity</summary>
      <form action={action} className="mt-2 flex flex-col gap-3">
        <input type="hidden" name="opportunity_id" value={opportunityId} />
        <input type="hidden" name="back" value={back} />
        {state.error && <Alert tone="danger">{state.error}</Alert>}
        <SelectField id="reason" label="Reason" defaultValue="" required>
          <option value="" disabled>
            Choose a reason
          </option>
          {OPPORTUNITY_REPORT_REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </SelectField>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="report-details" className="text-sm font-semibold text-content">
            Details (optional)
          </label>
          <textarea
            id="report-details"
            name="details"
            maxLength={900}
            className="min-h-24 w-full rounded-md border border-line-strong bg-surface px-3 py-2.5 text-base text-content"
          />
        </div>
        <Button type="submit" variant="secondary" disabled={pending} className="self-start">
          {pending ? "Sending…" : "Send report"}
        </Button>
      </form>
    </details>
  );
}
