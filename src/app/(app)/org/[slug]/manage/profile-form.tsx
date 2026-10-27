"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { OrganisationFieldset, type OrganisationValues } from "@/components/business/organisation-fields";
import { updateOrganisation, type UpdateOrganisationState } from "../actions";

export function OrganisationProfileForm({
  organisationId,
  values,
  verified,
}: {
  organisationId: string;
  values: OrganisationValues;
  verified: boolean;
}) {
  const [state, action, pending] = useActionState<UpdateOrganisationState, FormData>(
    updateOrganisation.bind(null, organisationId),
    {},
  );
  return (
    <form key={state.saved ?? 0} action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && !state.backToReview && <Alert tone="success">Saved.</Alert>}
      {state.backToReview && (
        <Alert tone="info">Saved. You changed the name or registration number, so our team will review the organisation again.</Alert>
      )}
      {verified && (
        <p className="text-sm text-content-2">
          Changing the name or registration number sends the organisation back for review, and it stops being public until then.
        </p>
      )}
      <OrganisationFieldset values={values} errors={state.errors} slugHint={`Your public page address: /org/${values.slug}`} />
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving…" : "Save profile"}
      </Button>
    </form>
  );
}
