import { CheckCircle2, Clock } from "lucide-react";
import { formatMinutes } from "@/lib/roadmaps/estimate";
import {
  complexityText,
  DIFFICULTY_LABEL,
  type Complexity,
  type Difficulty,
} from "@/lib/roadmaps/levels";

/**
 * The lesson's header strip (issue #255): difficulty, complexity and time.
 * Every value is written out in words, so nothing depends on colour, and the
 * strip keeps one fixed height whether or not a value is known (no layout shift).
 */

const DIFFICULTY_STYLE: Record<Difficulty, string> = {
  beginner: "bg-success-bg text-success-fg",
  intermediate: "bg-info-bg text-info-fg",
  advanced: "bg-warning-bg text-warning-fg",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      data-testid="difficulty-badge"
      className={`inline-flex min-h-7 items-center rounded-full px-3 text-sm font-semibold ${DIFFICULTY_STYLE[difficulty]}`}
    >
      {DIFFICULTY_LABEL[difficulty]}
    </span>
  );
}

/** Five pips, the filled ones showing the rating, plus the rating as text. */
export function ComplexityMeter({ value }: { value: Complexity }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-content-2" data-testid="complexity">
      <span className="flex gap-1" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={`size-2.5 rounded-full border ${n <= value ? "border-content-2 bg-content-2" : "border-line-strong bg-transparent"}`}
          />
        ))}
      </span>
      <span>{complexityText(value)}</span>
    </span>
  );
}

export function LessonMetaStrip({
  difficulty,
  complexity,
  minutes,
}: {
  difficulty: Difficulty | null;
  complexity: Complexity | null;
  minutes: number | null;
}) {
  if (!difficulty && !complexity && !minutes) return null;
  return (
    <ul aria-label="About this lesson" className="flex min-h-7 flex-wrap items-center gap-x-4 gap-y-2">
      {difficulty && (
        <li>
          <span className="sr-only">Difficulty: </span>
          <DifficultyBadge difficulty={difficulty} />
        </li>
      )}
      {complexity && (
        <li>
          <ComplexityMeter value={complexity} />
        </li>
      )}
      {minutes && (
        <li className="inline-flex items-center gap-1.5 text-sm text-content-2">
          <Clock aria-hidden className="size-4 text-content-3" />
          <span>
            <span className="sr-only">Time to complete: </span>
            {formatMinutes(minutes)}
          </span>
        </li>
      )}
    </ul>
  );
}

/** "You will be able to": the lesson's outcomes, short and checkable. */
export function LessonOutcomes({ outcomes, id, headingLevel = 2 }: { outcomes: readonly string[]; id?: string; headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as const;
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className="scroll-mt-24 rounded-lg border border-line bg-surface-sunken p-4 md:p-5"
      data-testid="lesson-outcomes"
    >
      <Heading id={id ? `${id}-heading` : undefined} className="text-base font-semibold text-content">
        You will be able to
      </Heading>
      <ul className="mt-3 flex flex-col gap-2">
        {outcomes.map((o) => (
          <li key={o} className="flex gap-2.5 text-content-2">
            <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-content-3" />
            <span>{o}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
