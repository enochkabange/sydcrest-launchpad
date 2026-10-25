"use client";

import { useActionState } from "react";
import { reportProfile, type ReportState } from "./actions";
import { REPORT_REASONS } from "@/lib/social/public-profile";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/field";

export function ReportForm({ profileId }: { profileId: string }) {
  const [state, action, pending] = useActionState<ReportState, FormData>(reportProfile.bind(null, profileId), {});

  if (state.done) return <Alert tone="success">Thanks. Our team will review this report.</Alert>;

  return (
    <details className="self-start text-sm">
      <summary className="inline-flex min-h-11 cursor-pointer items-center text-content-2 hover:text-content">
        Report this profile
      </summary>
      <form action={action} className="mt-2 flex w-full max-w-md flex-col gap-3 rounded-lg border border-line p-4">
        {state.error && <Alert tone="danger">{state.error}</Alert>}
        <SelectField id="reason" label="Reason" defaultValue="" required>
          <option value="" disabled>
            Choose a reason
          </option>
          {REPORT_REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </SelectField>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="details" className="text-sm font-semibold text-content">
            Details (optional)
          </label>
          <textarea
            id="details"
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
