"use client";

import { useActionState, useId } from "react";
import { reportCredential, type ReportCredentialState } from "@/app/(app)/profile/credentials-actions";
import { CREDENTIAL_REPORT_REASONS } from "@/lib/credentials/model";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/field";

/** Report one credential to the team; same pattern as reporting a profile. */
export function ReportCredentialForm({ credentialId, title }: { credentialId: string; title: string }) {
  const [state, action, pending] = useActionState<ReportCredentialState, FormData>(reportCredential.bind(null, credentialId), {});
  const id = useId();

  if (state.done) return <Alert tone="success">Thanks. Our team will review this report.</Alert>;

  return (
    <details className="self-start text-sm">
      <summary className="inline-flex min-h-11 cursor-pointer items-center text-content-2 hover:text-content">
        Report<span className="sr-only"> {title}</span>
      </summary>
      <form action={action} className="mt-2 flex w-full max-w-md flex-col gap-3 rounded-lg border border-line p-4">
        {state.error && <Alert tone="danger">{state.error}</Alert>}
        <SelectField id={`${id}-reason`} name="reason" label="Reason" defaultValue="" required>
          <option value="" disabled>
            Choose a reason
          </option>
          {CREDENTIAL_REPORT_REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </SelectField>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-details`} className="text-sm font-semibold text-content">
            Details (optional)
          </label>
          <textarea
            id={`${id}-details`}
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
