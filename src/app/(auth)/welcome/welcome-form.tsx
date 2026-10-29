"use client";

import { useActionState } from "react";
import { completeWelcome, type AuthState } from "../actions";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { AgeConsentFields } from "../age-consent-fields";
import { NextField } from "../next-field";

/** `askDateOfBirth` is false when a date of birth is already on file (re-agreeing after revoking, #251). */
export function WelcomeForm({ askDateOfBirth }: { askDateOfBirth: boolean }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(completeWelcome, {});

  return (
    <form data-analytics-form="welcome" action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <NextField />
      <AgeConsentFields askDateOfBirth={askDateOfBirth} defaultDateOfBirth={state.values?.date_of_birth} errors={state.errors} />
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Saving…" : "Continue"}
      </Button>
    </form>
  );
}
