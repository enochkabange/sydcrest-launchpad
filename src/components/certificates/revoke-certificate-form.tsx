"use client";

import { useActionState, useId } from "react";
import { Button } from "@/components/ui/button";
import { revokeCertificate, type CertificateActionState } from "./actions";

/** Admin only: revoke a live certificate with a reason. Collapsed until opened, so it is never one tap away by accident. */
export function RevokeCertificateForm({ certificateId, recipientName }: { certificateId: string; recipientName: string }) {
  const [state, action, pending] = useActionState<CertificateActionState, FormData>(revokeCertificate, null);
  const id = useId();
  if (state?.ok) {
    return (
      <p role="status" className="text-sm text-success-fg">
        {state.ok}
      </p>
    );
  }
  return (
    <details className="group">
      <summary className="inline-flex min-h-11 cursor-pointer items-center rounded-md px-3 text-sm font-semibold text-danger-fg hover:bg-danger-bg">
        Revoke
      </summary>
      <form action={action} className="mt-2 flex flex-col gap-2">
        <input type="hidden" name="certificate_id" value={certificateId} />
        <label htmlFor={`${id}-reason`} className="text-sm font-semibold text-content">
          Reason for revoking {recipientName}&apos;s certificate
        </label>
        <textarea
          id={`${id}-reason`}
          name="reason"
          required
          maxLength={1000}
          rows={3}
          aria-describedby={`${id}-hint`}
          className="w-full rounded-md border border-line-strong bg-surface px-3 py-2 text-base text-content"
        />
        <p id={`${id}-hint`} className="text-sm text-content-3">
          Kept on record for admins. The public page only says the certificate was revoked.
        </p>
        <div>
          <Button type="submit" variant="secondary" disabled={pending}>
            {pending ? "Revoking" : "Revoke certificate"}
          </Button>
        </div>
        {state?.error && (
          <p role="alert" className="text-sm text-danger-fg">
            {state.error}
          </p>
        )}
      </form>
    </details>
  );
}
