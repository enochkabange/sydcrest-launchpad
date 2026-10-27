"use client";

import { useActionState } from "react";
import Link from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { issueCertificate, type CertificateActionState } from "./actions";

/**
 * The mentor's final review: one button per eligible learner. The database
 * checks the criteria and the caller's role again, so a stale page cannot
 * issue early. Mount it anywhere staff see a learner (the mentor console).
 */
export function IssueCertificateButton({ cohortMemberId, learnerName }: { cohortMemberId: string; learnerName: string }) {
  const [state, action, pending] = useActionState<CertificateActionState, FormData>(issueCertificate, null);
  if (state?.ok && state.verificationId) {
    return (
      <p role="status" className="text-sm text-success-fg">
        {state.ok}{" "}
        <Link href={`/verify/${state.verificationId}`} className="font-semibold text-content-link underline">
          View certificate
        </Link>
      </p>
    );
  }
  return (
    <form action={action} className="flex flex-col items-start gap-1.5">
      <input type="hidden" name="cohort_member_id" value={cohortMemberId} />
      <Button type="submit" disabled={pending} aria-label={`Issue certificate to ${learnerName}`}>
        {pending ? "Issuing" : "Issue certificate"}
      </Button>
      {state?.error && (
        <p role="alert" className="text-sm text-danger-fg">
          {state.error}
        </p>
      )}
    </form>
  );
}
