/**
 * LessonStepper — one concept per screen instead of one long scroll.
 *
 * The structural lesson from Brilliant: a lesson is a sequence of small steps,
 * each ending in a beat of retrieval, with progress visible the whole way. A
 * 3,000-word page gets abandoned; twelve short steps with a visible "4 of 12"
 * gets finished. Completion rate is the pilot's whole thesis, so this is a
 * product decision, not a layout preference.
 *
 * Steps that carry a `check` gate advancement until it is answered. Steps that
 * do not are free to advance — gating every step turns a lesson into an exam.
 *
 * The control bar is fixed to the bottom on mobile: that is where the thumb
 * is, and it keeps "Continue" reachable without scrolling back.
 */
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon.jsx";
import Button from "./Button.jsx";
import Prose from "./Prose.jsx";
import CheckQuestion from "./CheckQuestion.jsx";

export default function LessonStepper({
  title,
  steps = [],
  onComplete,
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const [unlocked, setUnlocked] = useState(() => new Set());
  const headingRef = useRef(null);

  const step = steps[index];
  const isLast = index === steps.length - 1;
  const gated = Boolean(step?.check) && !unlocked.has(index);
  const pct = steps.length ? ((index + 1) / steps.length) * 100 : 0;

  /* Move focus to the new step's heading. Without this a screen-reader or
     keyboard user presses Continue and lands nowhere — the most common
     accessibility failure in stepped interfaces. Skipped on first render so
     the page does not steal focus on load. */
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    headingRef.current?.focus();
  }, [index]);

  const next = () => {
    if (isLast) onComplete?.();
    else setIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  if (!step) return null;

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Progress is always on screen — the single most motivating element.
          It sticks BELOW the app header (hence top-app-header, not top-0),
          otherwise it slides underneath it and disappears on scroll. Opaque
          rather than blurred: a persistently-blurred bar over a scrolling
          lesson is exactly the compositing cost this system rules out. */}
      <div className="sticky top-app-header z-10 -mx-4 border-b border-line bg-surface px-4 py-3 sm:mx-0 sm:rounded-t-lg sm:px-5">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <p className="truncate text-sm font-semibold text-content">{title}</p>
          <p className="shrink-0 text-xs font-bold tabular-nums text-content-3">
            {index + 1} of {steps.length}
          </p>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Lesson progress: step ${index + 1} of ${steps.length}`}
        >
          <div
            className="h-full rounded-full bg-blue-500 transition-transform duration-300 ease-out origin-left"
            style={{ transform: `scaleX(${pct / 100})`, width: "100%" }}
          />
        </div>
      </div>

      <article className="px-1 pb-6 pt-6 sm:px-5">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl font-extrabold tracking-tight text-content text-balance outline-none"
        >
          {step.title}
        </h2>

        <Prose className="mt-4">{step.content}</Prose>

        {step.check && (
          <CheckQuestion
            {...step.check}
            onCorrect={() => setUnlocked((s) => new Set(s).add(index))}
          />
        )}
      </article>

      {/* Deliberately NOT fixed. AppShell already owns the bottom of a phone
          screen with its tab bar; a second fixed bar there either covers the
          navigation or hides beneath it. The controls sit at the end of the
          step instead, which is where a reader arrives anyway. */}
      <div className="flex items-center gap-3 border-t border-line bg-surface px-4 py-3 sm:rounded-b-lg sm:px-5">
        <Button
          variant="ghost"
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
        >
          <Icon name="chevronLeft" size="sm" />
          Back
        </Button>

        <div className="ml-auto flex items-center gap-3">
          {gated && (
            <p className="hidden text-xs text-content-3 sm:block">
              Answer to continue
            </p>
          )}
          <Button onClick={next} disabled={gated}>
            {isLast ? "Finish lesson" : "Continue"}
            {!isLast && <Icon name="chevronRight" size="sm" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
