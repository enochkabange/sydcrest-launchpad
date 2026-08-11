/**
 * Textarea — project write-ups, reflections, mentor feedback.
 * Same label/hint/error contract as Input, so the two are interchangeable
 * in a form. Optional character counter for anything with a hard limit.
 */
import { useId } from "react";

export default function Textarea({
  label, hint, error, id, rows = 4, maxLength, value,
  required = false, className = "", ...props
}) {
  const auto = useId();
  const fieldId = id ?? auto;
  const hintId = `${fieldId}-hint`;
  const errId = `${fieldId}-error`;
  const count = typeof value === "string" ? value.length : null;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={fieldId} className="text-sm font-semibold text-content">
          {label}
          {required && <span className="text-danger-fg ml-0.5" aria-hidden="true">*</span>}
        </label>
      )}

      <textarea
        id={fieldId}
        rows={rows}
        maxLength={maxLength}
        value={value}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hint && hintId, error && errId].filter(Boolean).join(" ") || undefined}
        className={[
          "w-full rounded-md border px-3 py-2.5 text-base bg-surface resize-y",
          "text-content placeholder:text-content-3 transition-colors duration-150",
          "disabled:bg-surface-sunken disabled:text-content-3 disabled:cursor-not-allowed",
          error ? "border-danger-fg" : "border-line-strong hover:border-line-strong",
        ].join(" ")}
        {...props}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {hint && !error && <p id={hintId} className="text-xs text-content-2">{hint}</p>}
          {error && (
            <p id={errId} role="alert" className="text-xs font-medium text-danger-fg">{error}</p>
          )}
        </div>
        {maxLength && count !== null && (
          <span
            className={`text-xs tabular-nums ${count > maxLength * 0.9 ? "text-warning-fg font-semibold" : "text-content-3"}`}
          >
            {count}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
