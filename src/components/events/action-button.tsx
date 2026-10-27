"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import type { ActionState } from "@/lib/events/actions";

/**
 * A one button form for an event action (RSVP, cancel, host check in, new
 * code). Hidden fields carry the ids; the action re-checks everything. The
 * error, if any, is announced next to the button.
 */
export function ActionButton({
  action,
  fields,
  label,
  pendingLabel = "Saving…",
  variant = "primary",
  className = "",
  confirm,
  accessibleLabel,
}: {
  action: (prev: ActionState, form: FormData) => Promise<ActionState>;
  fields: Record<string, string>;
  label: string;
  pendingLabel?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  /** Ask before acting, for things that are hard to undo. */
  confirm?: string;
  /** A fuller name for screen readers when the visible label is short ("Check in" in a table row). */
  accessibleLabel?: string;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(action, {});
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
      className={`flex flex-col gap-2 ${className}`}
    >
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <Button type="submit" variant={variant} disabled={pending} aria-label={accessibleLabel}>
        {pending ? pendingLabel : label}
      </Button>
      {state.message && (
        <p role="alert" className="text-sm text-danger-fg">
          {state.message}
        </p>
      )}
    </form>
  );
}
