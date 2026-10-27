"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { setInPortfolio, type PortfolioState } from "./actions";

/**
 * Adds graded work to the learner's portfolio, or takes it out. Shown only
 * for graded work; the table refuses anything else.
 */
export function PortfolioToggle({
  submissionId,
  inPortfolio,
  compact = false,
}: {
  submissionId: string;
  inPortfolio: boolean;
  compact?: boolean;
}) {
  const [state, action, pending] = useActionState<PortfolioState, FormData>(setInPortfolio, {});
  const current = state.inPortfolio ?? inPortfolio;

  return (
    <form action={action} className="flex flex-col gap-2">
      <input type="hidden" name="submission_id" value={submissionId} />
      <input type="hidden" name="in_portfolio" value={current ? "false" : "true"} />
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {!compact && (
        <p className="text-sm text-content-2" role="status">
          {current
            ? "This work is in your portfolio. People who view your public profile will be able to see it."
            : "Add this work to your portfolio to show what you can do."}
        </p>
      )}
      <Button
        type="submit"
        variant={current ? "secondary" : "primary"}
        aria-pressed={current}
        disabled={pending}
        className="self-start"
      >
        {pending ? "Saving…" : current ? "Remove from portfolio" : "Add to portfolio"}
      </Button>
    </form>
  );
}
