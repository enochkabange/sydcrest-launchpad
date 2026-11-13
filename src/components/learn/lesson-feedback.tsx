"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { LessonFeedbackReason } from "@/lib/analytics/events";
import { REASON_LABELS, REASONS } from "@/lib/content-quality/reasons";

export type LessonFeedbackValue = { clear?: boolean; reason?: LessonFeedbackReason | null; message?: string };

/**
 * "Was this lesson clear?" at the end of a lesson (#326): one tap, yes or not
 * really. After not really, an optional reason from a fixed list; nothing is
 * typed. Tapping again changes the answer.
 */
export function LessonFeedback({
  nodeId,
  initial,
  action,
}: {
  nodeId: string;
  initial: LessonFeedbackValue | null;
  action: (prev: LessonFeedbackValue, form: FormData) => Promise<LessonFeedbackValue>;
}) {
  const [state, formAction, pending] = useActionState(action, initial ?? {});
  const answered = state.clear !== undefined;

  return (
    <form action={formAction} className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4" aria-labelledby="lesson-feedback-heading">
      <input type="hidden" name="node_id" value={nodeId} />
      <h2 id="lesson-feedback-heading" className="text-subtitle text-content">
        Was this lesson clear?
      </h2>
      <div className="flex flex-wrap gap-2">
        <Button
          type="submit"
          name="clear"
          value="yes"
          variant={state.clear === true ? "primary" : "secondary"}
          aria-pressed={state.clear === true}
          disabled={pending}
        >
          Yes
        </Button>
        <Button
          type="submit"
          name="clear"
          value="no"
          variant={state.clear === false ? "primary" : "secondary"}
          aria-pressed={state.clear === false}
          disabled={pending}
        >
          Not really
        </Button>
      </div>

      {state.clear === false && (
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm text-content-2">What would help most? You can skip this.</legend>
          <div className="flex flex-wrap gap-2">
            {REASONS.map((reason) => (
              <button
                key={reason}
                type="submit"
                name="reason"
                value={reason}
                // A reason on its own means not really (the action reads it that way).
                aria-pressed={state.reason === reason}
                disabled={pending}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  state.reason === reason
                    ? "border-action bg-action text-action-fg"
                    : "border-line-strong bg-surface text-content hover:bg-surface-sunken"
                }`}
              >
                {REASON_LABELS[reason]}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <p role="status" className="text-sm text-content-2">
        {answered && !state.message
          ? state.clear
            ? "Thanks for telling us."
            : state.reason
              ? "Thanks. We will use this to improve the lesson."
              : "Thanks for telling us. We will look at this lesson."
          : ""}
      </p>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
    </form>
  );
}
