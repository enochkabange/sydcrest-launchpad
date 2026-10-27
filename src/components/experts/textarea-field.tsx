import type { ComponentProps } from "react";

const TEXTAREA =
  "min-h-28 w-full rounded-md border border-line-strong bg-surface px-3 py-2.5 text-base text-content placeholder:text-content-3 aria-invalid:border-danger-fg";

/** A labelled textarea with hint and error, matching TextField in src/components/ui/field. */
export function TextAreaField({
  id,
  label,
  hint,
  error,
  ...props
}: { id: string; label: string; hint?: string; error?: string } & ComponentProps<"textarea">) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-content">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={TEXTAREA}
        {...props}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-content-3">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-danger-fg">
          {error}
        </p>
      )}
    </div>
  );
}
