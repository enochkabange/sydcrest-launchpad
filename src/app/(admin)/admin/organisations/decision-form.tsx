"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextAreaField } from "@/components/ui/field";
import { decideOrganisation, type DecisionState } from "./actions";

/** The admin's decision on one organisation: a note and one button per outcome. */
export function DecisionForm({ organisationId, status, name }: { organisationId: string; status: string; name: string }) {
  const [state, action, pending] = useActionState<DecisionState, FormData>(decideOrganisation.bind(null, organisationId), {});
  const id = `note-${organisationId}`;
  return (
    <form action={action} className="flex flex-col gap-3" aria-label={`Decision for ${name}`}>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <TextAreaField id={id} name="note" label="Note to the organisation" hint="Needed when you reject or suspend. Owners see it." maxLength={1000} />
      <div className="flex flex-wrap gap-2">
        {status !== "verified" && (
          <Button type="submit" name="decision" value="verified" disabled={pending}>
            Verify
          </Button>
        )}
        {status !== "rejected" && status !== "verified" && (
          <Button type="submit" name="decision" value="rejected" variant="secondary" disabled={pending}>
            Reject
          </Button>
        )}
        {status !== "suspended" && (
          <Button type="submit" name="decision" value="suspended" variant="secondary" disabled={pending}>
            Suspend
          </Button>
        )}
        {status === "suspended" && (
          <Button type="submit" name="decision" value="unverified" variant="ghost" disabled={pending}>
            Lift suspension
          </Button>
        )}
      </div>
    </form>
  );
}
