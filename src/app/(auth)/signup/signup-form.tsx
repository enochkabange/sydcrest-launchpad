"use client";

import { useActionState } from "react";
import { signUp, type AuthState } from "../actions";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";
import { MIN_PASSWORD } from "@/lib/validation";
import { AgeConsentFields } from "../age-consent-fields";
import { NextField } from "../next-field";

export function SignupForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(signUp, {});

  if (state.sentTo) {
    return (
      <Alert tone="success">
        We sent a confirmation link to <strong>{state.sentTo}</strong>. Open it on this device to
        finish creating your account. It can take a minute to arrive, so check spam too.
      </Alert>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <NextField />
      <TextField
        id="full_name"
        label="Your name"
        autoComplete="name"
        defaultValue={state.values?.full_name}
        error={state.errors?.full_name}
        required
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        defaultValue={state.values?.email}
        error={state.errors?.email}
        required
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        hint={`At least ${MIN_PASSWORD} characters.`}
        error={state.errors?.password}
        minLength={MIN_PASSWORD}
        required
      />
      <AgeConsentFields
        defaultDateOfBirth={state.values?.date_of_birth}
        defaultTerms={state.values?.terms}
        errors={state.errors}
      />
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Creating your account…" : "Create account"}
      </Button>
    </form>
  );
}
