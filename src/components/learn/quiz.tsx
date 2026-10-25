"use client";

import { useActionState, useState } from "react";
import { Check, X } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { answerField, type CompletionState, type QuizQuestion } from "./quiz-data";
import { Celebration, type NextNode } from "./celebration";

/**
 * The checkpoint quiz. Only questions and options reach the browser; the
 * server grades through submit_node_quiz and sends back the score, the pass
 * flag and which questions were right. The correct options are never shown.
 */
export function Quiz({
  nodeId,
  questions,
  passThreshold,
  passedBefore,
  bestScore,
  roadmapTitle,
  next,
  action,
}: {
  nodeId: string;
  questions: QuizQuestion[];
  passThreshold: number;
  passedBefore: boolean;
  bestScore: number | null;
  roadmapTitle: string;
  next: NextNode;
  action: (prev: CompletionState, form: FormData) => Promise<CompletionState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  // Controlled, so a failed attempt keeps the learner's choices (React resets uncontrolled form fields after an action).
  const [choices, setChoices] = useState<Record<string, number>>({});
  const outcome = state.outcome;

  return (
    <div className="flex flex-col gap-5">
      <p className="text-content-2">
        {questions.length === 1 ? "One question" : `${questions.length} questions`}. Score {passThreshold}% or more to
        complete this topic. You can try as many times as you like.
      </p>

      {passedBefore && !outcome?.passed && (
        <Alert tone="success">
          You passed this checkpoint{bestScore !== null ? ` with ${bestScore}%` : ""}. Retaking it will not lower your
          score.
        </Alert>
      )}

      <form action={formAction} className="flex flex-col gap-5">
        <input type="hidden" name="node_id" value={nodeId} />
        {questions.map((q, qi) => {
          const result = outcome?.results[q.id];
          return (
            <fieldset key={q.id} className="flex flex-col gap-2 rounded-lg border border-line p-4">
              <legend className="px-1 text-base font-semibold text-content">
                {qi + 1}. {q.prompt}
              </legend>
              {q.options.map((option, oi) => (
                <label
                  key={oi}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-content has-[:checked]:bg-surface-sunken"
                >
                  <input
                    type="radio"
                    name={answerField(q.id)}
                    value={oi}
                    checked={choices[q.id] === oi}
                    onChange={() => setChoices((c) => ({ ...c, [q.id]: oi }))}
                    required
                    className="size-5 shrink-0 accent-blue-600"
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

        {outcome && !outcome.passed && (
          <Alert tone="info">
            You scored {outcome.score}%. You need {passThreshold}% to pass. Read the explanation again and have another
            go.
          </Alert>
        )}

        <Button type="submit" disabled={pending} className="self-start">
          {pending ? "Checking" : outcome ? "Check again" : "Check my answers"}
        </Button>
      </form>

      {outcome?.passed && (
        <Celebration
          key={state.at}
          heading={`You passed with ${outcome.score}%`}
          roadmapTitle={roadmapTitle}
          unlocked={state.unlocked}
          next={next}
        />
      )}
    </div>
  );
}
