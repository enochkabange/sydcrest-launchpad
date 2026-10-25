"use client";

import { useActionState } from "react";
import { importDrafts, type FormState } from "./actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

/** Imports src/content/roadmaps as unpublished drafts. Safe to run again: it matches on slug. */
export function ImportForm() {
  const [state, action, pending] = useActionState<FormState>(importDrafts, {});
  return (
    <form action={action} className="flex flex-col items-start gap-3">
      {state.message && <Alert tone={state.saved ? "success" : "danger"}>{state.message}</Alert>}
      <Button type="submit" variant="secondary" disabled={pending}>
        {pending ? "Importing…" : "Import draft roadmaps"}
      </Button>
    </form>
  );
}
