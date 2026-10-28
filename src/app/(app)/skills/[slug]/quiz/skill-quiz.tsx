"use client";

import { startTransition, useActionState, useState } from "react";
import { BadgeCheck } from "lucide-react";
import { answerField, type QuizQuestion } from "@/components/learn/quiz-data";
import { Alert } from "@/components/ui/alert";
import { Button, buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { formatWhen } from "@/lib/skills/assessment";
import type { SkillQuizState } from "../../actions";

/**
 * The skill assessment. Only questions and options reach the browser; the
 * database grades against a key nobody else can read and returns the score
 * and whether it passed. Unlike a topic checkpoint, it never says which
 * answers were right, and a fail starts the retry wait.
 */
export function SkillQuiz({
  questions,
  passThreshold,
  skillName,
  skillSlug,
  action,
}: {
  questions: QuizQuestion[];
  passThreshold: number;
  skillName: string;
  skillSlug: string;
  action: (prev: SkillQuizState, form: FormData) => Promise<SkillQuizState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  // Controlled, so choices survive an error message (React resets a form after its action runs).
  const [choices, setChoices] = useState<Record<string, number>>({});
  const outcome = state.outcome;

  if (outcome?.passed) {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-lg border border-success-fg/30 bg-success-bg p-5 xl:p-6">
        <p className="flex items-center gap-2 text-h3 text-success-fg">
          <BadgeCheck aria-hidden className="size-7" />
          You passed with {outcome.score}%
        </p>
        <p className="text-content">
          {skillName} is now a verified skill on your profile. It shows on your public profile and expert page, and in the
          talent directory if you list yourself there.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/profile" className={buttonClasses("primary")}>
            See it on your profile
          </Link>
          <Link href="/skills" className={buttonClasses("secondary")}>
            Explore more skills
          </Link>
        </div>
      </div>
    );
  }

  if (outcome) {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5 xl:p-6">
        <p className="text-h3 text-content">You scored {outcome.score}%</p>
        <p className="text-content-2">
          You need {passThreshold}% to pass.{" "}
          {outcome.retryAt ? `You can try again from ${formatWhen(outcome.retryAt)}.` : "You can try again now."} Use the
          time to practise the parts you were unsure of.
        </p>
        <Link href={`/skills/${skillSlug}`} className={buttonClasses("secondary", "self-start")}>
          Back to {skillName}
        </Link>
      </div>
    );
  }

  const answered = questions.filter((q) => choices[q.id] !== undefined).length;

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(() => formAction(data));
      }}
    >
      {questions.map((q, qi) => (
        <fieldset key={q.id} className="flex flex-col gap-2 rounded-lg border border-line p-4 xl:p-5">
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
        </fieldset>
      ))}

      {state.message && <Alert tone="danger">{state.message}</Alert>}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Checking" : "Submit my answers"}
        </Button>
        <p className="text-sm text-content-3" aria-live="polite">
          {answered} of {questions.length} answered
        </p>
      </div>
    </form>
  );
}
