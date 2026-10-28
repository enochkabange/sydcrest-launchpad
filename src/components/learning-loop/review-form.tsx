"use client";

import { startTransition, useActionState, useState } from "react";
import { Check, X } from "lucide-react";
import Link from "@/components/ui/link";
import { Alert } from "@/components/ui/alert";
import { Button, buttonClasses } from "@/components/ui/button";
import { submitReview } from "@/lib/learning-loop/actions";
import { reviewAnswerField, reviewKey, type ReviewState } from "@/lib/learning-loop/review-data";

export type ReviewFormItem = {
  nodeId: string;
  questionId: string;
  nodeTitle: string;
  href: string;
  prompt: string;
  options: string[];
};

/**
 * The 5 minute review. Only questions and options reach the browser; the
 * database grades through submit_review and sends back which questions were
 * right. Like the checkpoint quiz, the correct options are never shown.
 */
export function ReviewForm({ items: initialItems }: { items: ReviewFormItem[] }) {
  // Keep the questions this review asked, whatever the server renders next.
  const [items] = useState(initialItems);
  const [state, formAction, pending] = useActionState<ReviewState, FormData>(submitReview, {});
  const [choices, setChoices] = useState<Record<string, number>>({});
  const outcome = state.outcome;
  const missed = outcome ? items.filter((i) => outcome.results[reviewKey(i)] === false) : [];
  const missedTopics = [...new Map(missed.map((i) => [i.nodeId, i])).values()];

  return (
    <div className="flex flex-col gap-5">
      <form
        className="flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (outcome) return;
          const data = new FormData(event.currentTarget);
          startTransition(() => formAction(data));
        }}
      >
        <input
          type="hidden"
          name="items"
          value={JSON.stringify(items.map((i) => ({ nodeId: i.nodeId, questionId: i.questionId })))}
        />
        {items.map((q, qi) => {
          const key = reviewKey(q);
          const result = outcome?.results[key];
          return (
            <fieldset key={key} className="flex flex-col gap-2 rounded-lg border border-line p-4 xl:p-5" disabled={!!outcome}>
              <legend className="px-1 text-base font-semibold text-content">
                {qi + 1}. {q.prompt}
              </legend>
              <p className="px-1 text-sm text-content-3">From {q.nodeTitle}</p>
              {q.options.map((option, oi) => (
                <label
                  key={oi}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-content has-[:checked]:bg-surface-sunken"
                >
                  <input
                    type="radio"
                    name={reviewAnswerField(q)}
                    value={oi}
                    checked={choices[key] === oi}
                    onChange={() => setChoices((c) => ({ ...c, [key]: oi }))}
                    required
                    className="size-5 shrink-0 accent-line-selected"
                  />
                  <span>{option}</span>
                </label>
              ))}
              {result !== undefined && (
                <p className={`flex items-center gap-1.5 text-sm font-semibold ${result ? "text-success-fg" : "text-danger-fg"}`}>
                  {result ? <Check className="size-4" aria-hidden="true" /> : <X className="size-4" aria-hidden="true" />}
                  {result ? "Correct" : "Not quite"}
                </p>
              )}
            </fieldset>
          );
        })}

        {state.message && <Alert tone="danger">{state.message}</Alert>}

        {!outcome && (
          <Button type="submit" disabled={pending} className="self-start">
            {pending ? "Checking" : "Check my answers"}
          </Button>
        )}
      </form>

      {outcome && (
        <section aria-labelledby="review-result" className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5">
          <h2 id="review-result" className="text-h3 text-content" tabIndex={-1}>
            {outcome.correct === outcome.total
              ? `All ${outcome.total} right. Well done.`
              : `You got ${outcome.correct} of ${outcome.total} right`}
          </h2>
          <p className="text-content-2">
            Review done. It counts toward your learning streak today.
            {missed.length > 0 && " The questions you missed will come back sooner in your next review."}
          </p>
          {missedTopics.length > 0 && (
            <ul className="flex flex-col">
              {missedTopics.map((t) => (
                <li key={t.nodeId}>
                  <Link href={t.href} className="inline-flex min-h-11 items-center text-sm font-semibold">
                    Read {t.nodeTitle} again
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link href="/dashboard" className={buttonClasses("primary", "self-start")}>
            Back to home
          </Link>
        </section>
      )}
    </div>
  );
}
