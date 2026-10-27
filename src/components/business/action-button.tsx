"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";

type Result = { message?: string } | void;

/**
 * One button that runs a bound Server Action and shows its error beside it.
 * For accept, decline, withdraw and similar one click decisions.
 */
export function ActionButton({
  action,
  label,
  pendingLabel,
  variant = "secondary",
  confirm,
}: {
  action: () => Promise<Result>;
  label: string;
  pendingLabel?: string;
  variant?: "primary" | "secondary" | "ghost";
  /** Ask before running (for leaving or removing). */
  confirm?: string;
}) {
  const [state, formAction, pending] = useActionState<{ message?: string }, FormData>(async () => (await action()) ?? {}, {});
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
      className="flex flex-col gap-1"
    >
      <Button type="submit" variant={variant} disabled={pending}>
        {pending ? (pendingLabel ?? label) : label}
      </Button>
      {state.message && (
        <p role="alert" className="text-sm text-danger-fg">
          {state.message}
        </p>
      )}
    </form>
  );
}
