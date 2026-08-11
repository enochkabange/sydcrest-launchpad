/**
 * CheckQuestion — the beat that ends a lesson step.
 *
 * Borrowed from how Brilliant paces a lesson: a step finishes with a question,
 * not a "Next" button, so the learner has to retrieve the idea before moving
 * on. Retrieval is what makes it stick; passive scrolling is what makes a
 * course get abandoned.
 *
 * Two rules in the feedback design:
 *   1. A wrong answer is never a dead end — you retry, you are not scored.
 *   2. The explanation shows on a correct answer too. Being right for the
 *      wrong reason is the failure mode nobody catches.
 *
 * For a coding curriculum the highest-value shapes are "what does this print?"
 * and "spot the bug" — both plain text, both cheap on mobile data.
 */
import { useId, useState } from "react";
import Icon from "./Icon.jsx";

export default function CheckQuestion({
  question,
  options = [],
  answer,
  explanation,
  onCorrect,
  className = "",
}) {
  const base = useId();
  const [picked, setPicked] = useState(null);
  const solved = picked === answer;

  const choose = (i) => {
    if (solved) return;
    setPicked(i);
    if (i === answer) onCorrect?.();
  };

  return (
    <section
      className={`full-bleed my-6 rounded-lg border border-line bg-surface p-5 ${className}`}
      aria-labelledby={`${base}-q`}
    >
      <p id={`${base}-q`} className="flex items-start gap-2 font-bold text-content">
        <Icon name="quiz" size="md" className="mt-0.5 text-blue-700" />
        <span className="text-pretty">{question}</span>
      </p>

      <div role="group" aria-labelledby={`${base}-q`} className="mt-4 flex flex-col gap-2">
        {options.map((opt, i) => {
          const isPicked = picked === i;
          const isAnswer = i === answer;
          let tone = "border-line-strong hover:border-line-strong hover:bg-surface-sunken";
          if (solved && isAnswer) tone = "border-success-fg bg-success-bg";
          else if (isPicked && !isAnswer) tone = "border-danger-fg bg-danger-bg";

          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              disabled={solved}
              aria-pressed={isPicked}
              className={`flex items-center gap-3 rounded-md border px-3.5 py-2.5 text-left text-[0.9375rem] transition-colors duration-150 disabled:cursor-default ${tone}`}
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold text-content-3">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 text-content">{opt}</span>
              {solved && isAnswer && <Icon name="success" size="sm" className="text-success-fg" />}
              {isPicked && !isAnswer && <Icon name="close" size="sm" className="text-danger-fg" />}
            </button>
          );
        })}
      </div>

      {/* Polite, not assertive — the learner is mid-thought, not in an error state. */}
      <div aria-live="polite" className="mt-3">
        {picked !== null && !solved && (
          <p className="text-sm font-medium text-danger-fg">
            Not quite — have another look and try again.
          </p>
        )}
        {solved && (
          <div className="rounded-md bg-success-bg p-3 text-sm text-content">
            <p className="font-bold text-success-fg">That's it.</p>
            {explanation && <p className="mt-1 leading-relaxed">{explanation}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
