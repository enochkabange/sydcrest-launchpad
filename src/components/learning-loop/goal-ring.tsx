/**
 * This week's goal as a ring: topics passed out of the goal. Server safe.
 * The ring is drawn with the progress tokens; the numbers in the middle and
 * the progressbar role carry the meaning for screen readers.
 */
export function GoalRing({ done, target }: { done: number; target: number }) {
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const share = Math.min(1, target ? done / target : 0);
  const met = done >= target;
  return (
    <div
      role="progressbar"
      aria-label="Weekly goal"
      aria-valuemin={0}
      aria-valuemax={target}
      aria-valuenow={Math.min(done, target)}
      aria-valuetext={`${done} of ${target} ${target === 1 ? "topic" : "topics"} passed this week`}
      className="relative size-32 shrink-0 xl:size-36"
    >
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="10" style={{ stroke: "var(--progress-track)" }} />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - share)}
          style={{ stroke: met ? "var(--progress-complete)" : "var(--progress-active)" }}
          className={share === 0 ? "hidden" : ""}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
        <span className="text-h3 font-semibold text-content">
          {done} of {target}
        </span>
        <span className="text-xs text-content-3">{target === 1 ? "topic" : "topics"}</span>
      </div>
    </div>
  );
}
