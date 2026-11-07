"use client";

import { useActionState } from "react";
import { completeWelcome, type AuthState } from "../actions";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { TextField } from "@/components/ui/field";
import { AgeConsentFields } from "../age-consent-fields";
import { NextField } from "../next-field";

/**
 * Asks only for what the account is missing: age and terms (`askConsent`,
 * with `askDateOfBirth` false when a date of birth is already on file, #251)
 * and the phone number (`askPhone`, #285).
 */
export function WelcomeForm({ askConsent, askDateOfBirth, askPhone }: { askConsent: boolean; askDateOfBirth: boolean; askPhone: boolean }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(completeWelcome, {});

  return (
    <form data-analytics-form="welcome" action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <NextField />
      {askPhone && (
        <TextField
          id="phone"
          label="Phone number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          hint="So your cohort and mentors can reach you. We won't message you without asking first."
          defaultValue={state.values?.phone}
          error={state.errors?.phone}
          required
        />
      )}
      {askConsent && (
        <AgeConsentFields askDateOfBirth={askDateOfBirth} defaultDateOfBirth={state.values?.date_of_birth} errors={state.errors} />
      )}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Saving…" : "Continue"}
      </Button>
    </form>
  );
}
