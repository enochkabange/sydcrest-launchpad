/**
 * Select — a styled NATIVE <select>, deliberately.
 *
 * This is not a compromise. On Android the native picker is a full-screen
 * wheel that is faster and more accurate one-handed than any custom listbox,
 * and it comes with keyboard support, typeahead, and screen-reader semantics
 * that a div-based replacement has to reimplement and usually gets wrong.
 *
 * The trade is that the option list cannot be styled. For choosing a cohort,
 * a timezone, or a mentor, that is a trade worth making. If a future case
 * genuinely needs rich options — avatars beside mentor names, say — that is
 * the moment to build a real listbox, not before.
 */
import { useId } from "react";
import Icon from "./Icon.jsx";

export default function Select({
  label,
  hint,
  error,
  id,
  options = [],
  placeholder,
  required = false,
  className = "",
  ...props
}) {
  const auto = useId();
  const fieldId = id ?? auto;
  const hintId = `${fieldId}-hint`;
  const errId = `${fieldId}-error`;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={fieldId} className="text-sm font-semibold text-content">
          {label}
          {required && <span className="text-danger-fg ml-0.5" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={fieldId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={[hint && hintId, error && errId].filter(Boolean).join(" ") || undefined}
          className={[
            "h-11 w-full appearance-none rounded-md border bg-surface pl-3 pr-10 text-base",
            "text-content transition-colors duration-150",
            "disabled:bg-surface-sunken disabled:text-content-3 disabled:cursor-not-allowed",
            error ? "border-danger-fg" : "border-line-strong hover:border-line-strong",
          ].join(" ")}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevronDown"
          size="sm"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-content-3"
        />
      </div>

      {hint && !error && <p id={hintId} className="text-xs text-content-2">{hint}</p>}
      {error && (
        <p id={errId} role="alert" className="text-xs font-medium text-danger-fg">{error}</p>
      )}
    </div>
  );
}
