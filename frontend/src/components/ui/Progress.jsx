/**
 * Progress — the most-used component in a 12-week cohort product.
 *
 * Learning state has its own vocabulary, separate from status colour:
 *   none → neutral · active → blue · complete → green · overdue → red
 * Brand orange is not a progress state; it is reserved for brand accent, so
 * "in progress" can never be misread as "warning".
 */

const states = {
  none:     "bg-neutral-400",
  active:   "bg-blue-500",
  complete: "bg-success-500",
  overdue:  "bg-danger-500",
};

export default function Progress({
  value = 0,
  max = 100,
  state = "active",
  label,
  showValue = true,
  size = "md",
  className = "",
  ...props
}) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  const height = size === "sm" ? "h-1.5" : size === "lg" ? "h-3" : "h-2";

  return (
    <div className={`flex flex-col gap-1.5 ${className}`} {...props}>
      {(label || showValue) && (
        <div className="flex items-baseline justify-between gap-3">
          {label && (
            <span className="text-sm font-medium text-content-2">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-semibold text-content tabular-nums">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
        className={`w-full ${height} rounded-full bg-line overflow-hidden`}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-300 ${states[state] ?? states.active}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* Twelve small blocks — the cohort's week-by-week shape at a glance.
   Each week carries a title attribute so state is available without colour. */
export function WeekTrack({ weeks = [], className = "" }) {
  return (
    <ol className={`flex gap-1 ${className}`} aria-label="Cohort week progress">
      {weeks.map((state, i) => (
        <li
          key={i}
          title={`Week ${i + 1}: ${state}`}
          className={`h-2 flex-1 rounded-sm ${states[state] ?? states.none}`}
        >
          <span className="sr-only">{`Week ${i + 1}: ${state}`}</span>
        </li>
      ))}
    </ol>
  );
}
