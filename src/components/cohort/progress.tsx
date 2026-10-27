import type { CohortHome } from "@/lib/cohort/data";
import { pathProgress } from "@/lib/cohort/schedule";

function Bar({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-content-2">{label}</span>
        <span className="font-semibold text-content">
          {value} of {max}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className="h-2 overflow-hidden rounded-full"
        style={{ background: "var(--progress-track)" }}
      >
        <div
          className="h-full origin-left rounded-full"
          style={{
            background: max && value >= max ? "var(--progress-complete)" : "var(--progress-active)",
            transform: `scaleX(${max ? value / max : 0})`,
          }}
        />
      </div>
    </div>
  );
}

/** Lessons done, work sent and weeks passed along the learner's path. */
export function CohortProgress({ home }: { home: CohortHome }) {
  const p = pathProgress(home.path, home.submissions, home.program.passScore);
  return (
    <section aria-labelledby="progress-heading" className="flex flex-col gap-4 rounded-lg border border-line p-5 xl:p-6">
      <h2 id="progress-heading" className="text-h3 text-content">
        Your progress
      </h2>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
        <Bar label="Lessons done" value={p.lessonsDone} max={p.lessonsTotal} />
        <Bar label="Assignments sent" value={p.sent} max={p.weeksTotal} />
        <Bar label={`Weeks passed (${home.program.passScore} or more)`} value={p.passed} max={p.weeksTotal} />
      </div>
    </section>
  );
}
