"use client";

import { useActionState } from "react";
import { completeWelcome, type AuthState } from "../actions";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { AgeConsentFields } from "../age-consent-fields";
import { NextField } from "../next-field";

export function WelcomeForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(completeWelcome, {});

  return (
    <form data-analytics-form="welcome" action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <NextField />
      <AgeConsentFields defaultDateOfBirth={state.values?.date_of_birth} errors={state.errors} />
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Saving…" : "Continue"}
      </Button>
    </form>
  );
}
