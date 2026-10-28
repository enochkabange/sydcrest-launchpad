"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { Criterion } from "@/lib/mentor/progress";
import { TextAreaField } from "@/components/ui/field";
import type { FormState } from "./forms";

/**
 * A rubric review: one whole number per criterion and a comment. Field names
 * match parseReviewForm (score_<criterion id>, comment).
 */
export function PeerReviewForm({
  action,
  criteria,
  scores,
  comment,
  submitted,
}: {
  action: (prev: FormState, form: FormData) => Promise<FormState>;
  criteria: Criterion[];
  scores: Record<string, unknown>;
  comment: string | null;
  submitted: boolean;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});
  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.ok && <Alert tone="success">{state.ok}</Alert>}
      {criteria.length > 0 && (
        <fieldset className="flex flex-col gap-4">
          <legend className="mb-1 text-sm font-semibold text-content">Rubric</legend>
          {criteria.map((c) => {
            const id = `score_${c.id}`;
            const error = state.errors?.[id];
            return (
              <div key={c.id} className="flex flex-col gap-1.5">
                <label htmlFor={id} className="text-sm font-semibold text-content">
                  {c.label} (0 to {c.max_points})
                </label>
                {c.description && (
                  <p id={`${id}-hint`} className="text-sm text-content-2">
                    {c.description}
                  </p>
                )}
                <input
                  id={id}
                  name={id}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={c.max_points}
                  step={1}
                  defaultValue={typeof scores[c.id] === "number" ? String(scores[c.id]) : ""}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? `${id}-error` : c.description ? `${id}-hint` : undefined}
                  className="min-h-11 w-28 rounded-md border border-line-strong bg-surface px-3 text-base text-content aria-invalid:border-danger-fg"
                />
                {error && (
                  <p id={`${id}-error`} className="text-sm text-danger-fg">
                    {error}
                  </p>
                )}
              </div>
            );
          })}
        </fieldset>
      )}
      <TextAreaField
        id="comment"
        label="Comment for your peer"
        hint="What works, and one thing that would make it stronger. Be kind and specific."
        defaultValue={comment ?? ""}
        maxLength={4000}
        rows={6}
        error={state.errors?.comment}
      />
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Sending" : submitted ? "Update review" : "Send review"}
      </Button>
    </form>
  );
}
