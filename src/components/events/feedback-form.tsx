"use client";

import { startTransition, useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckboxField } from "@/components/ui/field";
import { feedbackAction, type ActionState } from "@/lib/events/actions";
import { FEEDBACK_SCALES, type FeedbackInput } from "@/lib/events/forms";

/** A row of numbered choices as real radio buttons, each a 44px target. */
function Scale({
  name,
  legend,
  min,
  max,
  low,
  high,
  defaultValue,
  error,
}: {
  name: string;
  legend: string;
  min: number;
  max: number;
  low: string;
  high: string;
  defaultValue: number | null;
  error?: string;
}) {
  const values = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  return (
    <fieldset
      className="flex flex-col gap-2"
      aria-describedby={error ? `${name}-error` : undefined}
    >
      <legend className="text-sm font-semibold text-content">{legend}</legend>
      <div className="flex w-fit max-w-full flex-col gap-1">
        <div className="flex flex-wrap gap-1.5">
          {values.map((v) => (
            <label key={v} className="relative">
              <input
                type="radio"
                name={name}
                value={v}
                defaultChecked={defaultValue === v}
                className="peer sr-only"
              />
              <span className="flex size-11 cursor-pointer items-center justify-center rounded-md border border-line-strong bg-surface text-sm font-semibold text-content transition-colors peer-checked:border-line-selected peer-checked:bg-action peer-checked:text-action-fg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring hover:bg-surface-sunken peer-checked:hover:bg-action-hover">
                {v}
              </span>
            </label>
          ))}
        </div>
        <p className="flex justify-between text-xs text-content-3" aria-hidden>
          <span>
            {min} {low}
          </span>
          <span>
            {max} {high}
          </span>
        </p>
      </div>
      {error && (
        <p id={`${name}-error`} className="text-sm text-danger-fg">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function FeedbackForm({
  eventId,
  saved,
}: {
  eventId: string;
  saved: FeedbackInput | null;
}) {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    feedbackAction,
    {},
  );
  const e = state.errors ?? {};
  return (
    <form
      // Submitted by hand so React does not reset the fields after an error.
      onSubmit={(ev) => {
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);
        startTransition(() => action(data));
      }}
      className="flex flex-col gap-6"
      noValidate
    >
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.ok && (
        <Alert tone="success">Thank you. Your feedback is saved.</Alert>
      )}
      <input type="hidden" name="event_id" value={eventId} />
      {FEEDBACK_SCALES.map((s) => (
        <Scale
          key={s.key}
          name={s.key}
          legend={s.question}
          min={1}
          max={5}
          low="Not at all"
          high="Very"
          defaultValue={saved?.[s.key] ?? null}
          error={e[s.key]}
        />
      ))}
      <Scale
        name="recommend"
        legend="How likely are you to recommend SydCrest events to a friend?"
        min={0}
        max={10}
        low="Not likely"
        high="Very likely"
        defaultValue={saved?.recommend ?? null}
        error={e.recommend}
      />
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-semibold text-content">
          Would you come to another SydCrest event?
        </legend>
        <div className="flex flex-wrap gap-2">
          {[
            ["yes", "Yes"],
            ["no", "No"],
          ].map(([value, label]) => (
            <label
              key={value}
              className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-line-strong px-4 text-sm font-semibold text-content has-checked:border-line-selected has-checked:bg-info-bg"
            >
              <input
                type="radio"
                name="attend_again"
                value={value}
                defaultChecked={saved?.attend_again === (value === "yes")}
                className="size-4 accent-line-selected"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="comment" className="text-sm font-semibold text-content">
          Anything else? What worked, and what should we fix next time?
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          maxLength={2000}
          defaultValue={saved?.comment ?? ""}
          aria-invalid={e.comment ? true : undefined}
          aria-describedby={e.comment ? "comment-error" : undefined}
          className="min-h-28 w-full rounded-md border border-line-strong bg-surface px-3 py-2 text-base text-content placeholder:text-content-3 aria-invalid:border-danger-fg"
        />
        {e.comment && (
          <p id="comment-error" className="text-sm text-danger-fg">
            {e.comment}
          </p>
        )}
      </div>
      <CheckboxField
        id="quote_consent"
        defaultChecked={saved?.quote_consent ?? false}
      >
        SydCrest may quote my comment, with my first name, in event reports and
        on the website. Leave this unticked and your comment stays with the
        organisers.
      </CheckboxField>
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Sending…" : saved ? "Update feedback" : "Send feedback"}
      </Button>
    </form>
  );
}
