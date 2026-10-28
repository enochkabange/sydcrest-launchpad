"use client";

import { useActionState } from "react";
import { updatePassword, type NewPasswordState } from "../password-actions";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";
import { MIN_PASSWORD } from "@/lib/validation";
import { LinkExpired } from "./link-expired";

export function ResetPasswordForm() {
  const [state, action, pending] = useActionState<NewPasswordState, FormData>(updatePassword, {});

  if (state.expired) return <LinkExpired />;

  return (
    <form action={action} className="flex flex-col gap-4" noValidate>
      <p className="text-content-2">You will use it with your email the next time you sign in.</p>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <TextField
        id="password"
        label="New password"
        type="password"
        autoComplete="new-password"
        hint={`At least ${MIN_PASSWORD} characters.`}
        error={state.errors?.password}
        minLength={MIN_PASSWORD}
        required
      />
      <TextField
        id="confirm_password"
        label="Confirm new password"
        type="password"
        autoComplete="new-password"
        error={state.errors?.confirm_password}
        minLength={MIN_PASSWORD}
        required
      />
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Saving…" : "Save new password"}
      </Button>
    </form>
  );
}
