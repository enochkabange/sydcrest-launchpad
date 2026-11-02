"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";
import type { ReviewerFormState } from "./actions";

type Action = (prev: ReviewerFormState, form: FormData) => Promise<ReviewerFormState>;

export function AppointReviewerForm({ action }: { action: Action }) {
  const [state, formAction, pending] = useActionState<ReviewerFormState, FormData>(action, {});
  return (
    <form key={state.at ?? 0} action={formAction} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.ok && <Alert tone="success">{state.ok}</Alert>}
      <TextField
        id="email"
        label="Their sign in email"
        type="email"
        autoComplete="off"
        error={state.errors?.email}
        hint="They need an account first."
      />
      <Button type="submit" variant="secondary" disabled={pending} className="self-start">
        {pending ? "Appointing" : "Make reviewer"}
      </Button>
    </form>
  );
}
