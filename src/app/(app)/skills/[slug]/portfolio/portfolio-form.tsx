"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";
import type { PortfolioState } from "../../actions";

export function PortfolioForm({
  action,
  skillName,
}: {
  action: (prev: PortfolioState, form: FormData) => Promise<PortfolioState>;
  skillName: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const e = state.errors ?? {};

  if (state.sent) {
    return (
      <Alert tone="success">
        Sent. A mentor or admin will review your {skillName} work and you will be told either way.
      </Alert>
    );
  }

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <TextField
        id="portfolio_url"
        label="Link to your work"
        type="url"
        inputMode="url"
        placeholder="https://"
        hint="A project, a repository, a design file or a document. It must open without signing in."
        error={e.portfolio_url}
        required
        maxLength={500}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="note" className="text-sm font-semibold text-content">
          Note for the reviewer (optional)
        </label>
        <textarea
          id="note"
          name="note"
          rows={4}
          maxLength={2000}
          aria-invalid={e.note ? true : undefined}
          aria-describedby={e.note ? "note-error" : "note-hint"}
          className="min-h-24 w-full rounded-md border border-line-strong bg-surface px-3 py-2 text-base text-content placeholder:text-content-3 aria-invalid:border-danger-fg"
        />
        {e.note ? (
          <p id="note-error" className="text-sm text-danger-fg">
            {e.note}
          </p>
        ) : (
          <p id="note-hint" className="text-sm text-content-3">
            What you built, what part you did, and anything the reviewer should look at first.
          </p>
        )}
      </div>
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Sending" : "Send for review"}
      </Button>
    </form>
  );
}
