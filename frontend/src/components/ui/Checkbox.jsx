/**
 * Checkbox — a real <input type="checkbox">, visually hidden and drawn with a
 * sibling box. Keeping the native input means keyboard, form submission and
 * screen-reader semantics all work without reimplementation.
 *
 * The tick scales in over 100ms; on a checkbox anything slower feels laggy
 * rather than polished.
 */
import { useId } from "react";
import Icon from "./Icon.jsx";

export default function Checkbox({
  label, hint, id, checked, disabled = false, className = "", ...props
}) {
  const auto = useId();
  const fieldId = id ?? auto;
  const hintId = `${fieldId}-hint`;

  return (
    <div className={`flex gap-2.5 ${className}`}>
      <span className="relative flex shrink-0 items-center">
        <input
          type="checkbox"
          id={fieldId}
          checked={checked}
          disabled={disabled}
          aria-describedby={hint ? hintId : undefined}
          className="peer size-5 cursor-pointer appearance-none rounded-sm border border-line-strong bg-surface transition-colors duration-100 checked:border-blue-500 checked:bg-blue-500 disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:border-line-strong"
          {...props}
        />
        <Icon
          name="check"
          size="sm"
          strokeWidth={3}
          className="pointer-events-none absolute left-0.5 scale-0 text-white transition-transform duration-100 ease-out peer-checked:scale-100"
        />
      </span>

      <span className="flex flex-col gap-0.5">
        {label && (
          <label
            htmlFor={fieldId}
            className={`text-sm leading-5 ${disabled ? "text-content-3" : "text-content"} cursor-pointer`}
          >
            {label}
          </label>
        )}
        {hint && <span id={hintId} className="text-xs text-content-2">{hint}</span>}
      </span>
    </div>
  );
}
