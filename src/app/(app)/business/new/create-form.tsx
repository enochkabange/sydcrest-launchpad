"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckboxField } from "@/components/ui/field";
import { OrganisationFieldset } from "@/components/business/organisation-fields";
import { createOrganisation, type CreateOrganisationState } from "./actions";

export function CreateOrganisationForm() {
  const [state, action, pending] = useActionState<CreateOrganisationState, FormData>(createOrganisation, {});
  return (
    <form data-analytics-form="organisation" key={JSON.stringify(state.values ?? {})} action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <OrganisationFieldset
        values={state.values}
        errors={state.errors}
        slugHint="Your public page will live at /org/your-address once verified. Leave it blank and we make one from the name."
      />
      <CheckboxField id="acts_for" required>
        I am allowed to act for this organisation.
      </CheckboxField>
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Creating…" : "Create business account"}
      </Button>
    </form>
  );
}
