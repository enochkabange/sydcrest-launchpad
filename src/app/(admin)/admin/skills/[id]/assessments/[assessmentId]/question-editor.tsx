"use client";

import { startTransition, useActionState, useId, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { QuizQuestion } from "@/components/learn/quiz-data";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { MAX_OPTIONS, MAX_QUESTIONS, authoringField } from "@/lib/skills/assessment";
import { saveQuizQuestions, type FormState } from "../../../actions";

type Draft = { key: number; prompt: string; options: string[]; correct: number | null };

let nextKey = 0;
const blank = (): Draft => ({ key: nextKey++, prompt: "", options: ["", "", "", ""], correct: null });

function fromSaved(questions: QuizQuestion[], answerKey: Record<string, number>): Draft[] {
  if (questions.length === 0) return [blank()];
  return questions.map((q) => ({
    key: nextKey++,
    prompt: q.prompt,
    options: q.options.length < 4 ? [...q.options, ...Array(4 - q.options.length).fill("")] : [...q.options],
    correct: answerKey[q.id] ?? null,
  }));
}

/**
 * Write the quiz: each question with its options and the one right answer.
 * Controlled and submitted through onSubmit, so a validation error keeps
 * everything typed (React resets a form after its action runs). Field names
 * come from `authoringField`, which `parseQuizAuthoring` reads on the server.
 */
export function QuestionEditor({
  assessmentId,
  questions,
  answerKey,
}: {
  assessmentId: string;
  questions: QuizQuestion[];
  answerKey: Record<string, number>;
}) {
  const [drafts, setDrafts] = useState<Draft[]>(() => fromSaved(questions, answerKey));
  const [state, action, pending] = useActionState<FormState, FormData>(saveQuizQuestions, {});
  const e = state.errors ?? {};
  const uid = useId();

  const update = (index: number, change: Partial<Draft>) =>
    setDrafts((list) => list.map((d, i) => (i === index ? { ...d, ...change } : d)));

  return (
    <form
      className="flex flex-col gap-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(() => action(data));
      }}
    >
      <input type="hidden" name="id" value={assessmentId} />
      <input type="hidden" name={authoringField.count} value={drafts.length} />
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && !state.message && <Alert tone="success">Questions and answers saved.</Alert>}

      <ol className="flex flex-col gap-4">
        {drafts.map((d, i) => {
          const promptId = `${uid}-prompt-${i}`;
          const promptError = e[authoringField.prompt(i)];
          const optionsError = e[`options:${i}`];
          const correctError = e[authoringField.correct(i)];
          return (
            <li key={d.key}>
              <fieldset className="flex flex-col gap-3 rounded-lg border border-line p-4">
                <legend className="px-1 font-semibold text-content">Question {i + 1}</legend>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor={promptId} className="text-sm font-semibold text-content">
                    Question
                  </label>
                  <textarea
                    id={promptId}
                    name={authoringField.prompt(i)}
                    rows={2}
                    maxLength={500}
                    value={d.prompt}
                    onChange={(ev) => update(i, { prompt: ev.target.value })}
                    aria-invalid={promptError ? true : undefined}
                    aria-describedby={promptError ? `${promptId}-error` : undefined}
                    className="min-h-16 w-full rounded-md border border-line-strong bg-surface px-3 py-2 text-base text-content aria-invalid:border-danger-fg"
                  />
                  {promptError && (
                    <p id={`${promptId}-error`} className="text-sm text-danger-fg">
                      {promptError}
                    </p>
                  )}
                </div>

                <fieldset className="flex flex-col gap-2">
                  <legend className="mb-1 text-sm font-semibold text-content">Options (choose the right answer)</legend>
                  {d.options.map((option, j) => {
                    const optionId = `${uid}-option-${i}-${j}`;
                    return (
                      <div key={j} className="flex items-center gap-2">
                        <label className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center">
                          <input
                            type="radio"
                            name={authoringField.correct(i)}
                            value={j}
                            checked={d.correct === j}
                            onChange={() => update(i, { correct: j })}
                            className="size-5 accent-blue-600"
                          />
                          <span className="sr-only">Option {j + 1} is the right answer</span>
                        </label>
                        <label htmlFor={optionId} className="sr-only">
                          Option {j + 1}
                        </label>
                        <input
                          id={optionId}
                          name={authoringField.option(i, j)}
                          value={option}
                          maxLength={300}
                          placeholder={`Option ${j + 1}`}
                          onChange={(ev) =>
                            update(i, { options: d.options.map((o, k) => (k === j ? ev.target.value : o)) })
                          }
                          className="min-h-11 w-full rounded-md border border-line-strong bg-surface px-3 text-base text-content placeholder:text-content-3"
                        />
                      </div>
                    );
                  })}
                  {(optionsError || correctError) && (
                    <p className="text-sm text-danger-fg">{[optionsError, correctError].filter(Boolean).join(" ")}</p>
                  )}
                </fieldset>

                <div className="flex flex-wrap gap-2">
                  {d.options.length < MAX_OPTIONS && (
                    <Button variant="ghost" onClick={() => update(i, { options: [...d.options, ""] })}>
                      <Plus aria-hidden className="size-4" />
                      Add an option
                    </Button>
                  )}
                  {drafts.length > 1 && (
                    <Button variant="ghost" onClick={() => setDrafts((list) => list.filter((_, k) => k !== i))}>
                      <Trash2 aria-hidden className="size-4" />
                      Remove question {i + 1}
                    </Button>
                  )}
                </div>
              </fieldset>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap gap-2">
        {drafts.length < MAX_QUESTIONS && (
          <Button variant="secondary" onClick={() => setDrafts((list) => [...list, blank()])}>
            <Plus aria-hidden className="size-4" />
            Add a question
          </Button>
        )}
        <Button type="submit" disabled={pending}>
          {pending ? "Saving" : "Save questions and answers"}
        </Button>
      </div>
    </form>
  );
}
