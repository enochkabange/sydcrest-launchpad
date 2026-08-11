/**
 * Input — text field with label, hint and error.
 *
 * The error message is wired to the control with aria-describedby and the
 * field is marked aria-invalid, so screen readers announce the reason rather
 * than just "invalid". Colour alone never carries the error.
 */
import { useId } from "react";

export default function Input({
  label,
  hint,
  error,
  id,
  type = "text",
  className = "",
  required = false,
  ...props
}) {
  const auto = useId();
  const inputId = id ?? auto;
  const hintId = `${inputId}-hint`;
  const errId = `${inputId}-error`;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-content">
          {label}
          {required && (
            <span className="text-danger-fg ml-0.5" aria-hidden="true">*</span>
          )}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hint && hintId, error && errId].filter(Boolean).join(" ") || undefined}
        className={[
          "h-11 w-full rounded-md border px-3 text-base bg-surface",
          "text-content placeholder:text-content-3",
          "transition-colors duration-150",
          "disabled:bg-surface-sunken disabled:text-content-3 disabled:cursor-not-allowed",
          error
            ? "border-danger-fg focus-visible:outline-danger-700"
            : "border-line-strong hover:border-line-strong",
        ].join(" ")}
        {...props}
      />

      {hint && !error && (
        <p id={hintId} className="text-xs text-content-2">{hint}</p>
      )}
      {error && (
        <p id={errId} role="alert" className="text-xs font-medium text-danger-fg">
          {error}
        </p>
      )}
    </div>
  );
}
