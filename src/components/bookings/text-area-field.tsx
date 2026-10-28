import type { ComponentProps } from "react";

/** A labelled multi line field, styled like the shared text field, with hint and error wired for screen readers. */
export function TextAreaField({
  id,
  label,
  hint,
  error,
  required,
  rows = 4,
  ...props
}: { id: string; label: string; hint?: string; error?: string } & ComponentProps<"textarea">) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-content">
        {label}
        {!required && <span className="font-normal text-content-3"> (optional)</span>}
      </label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="min-h-24 w-full rounded-md border border-line-strong bg-surface px-3 py-2 text-base text-content placeholder:text-content-3 aria-invalid:border-danger-fg"
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
