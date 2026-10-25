import type { ComponentProps } from "react";

/**
 * Multi line text field for the admin editor, styled like TextField in
 * components/ui/field.tsx. Kept here until a second screen needs one.
 */
export function TextAreaField({
  id,
  label,
  hint,
  error,
  ...props
}: { id: string; label: string; hint?: string; error?: string } & ComponentProps<"textarea">) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-content">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={3}
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

const BADGE_TONES = {
  success: "bg-success-bg text-success-fg",
  danger: "bg-danger-bg text-danger-fg",
  neutral: "bg-surface-sunken text-content-2",
  info: "bg-info-bg text-info-fg",
} as const;

/** Small tinted status label. Always carries words, never colour alone. */
export function Badge({ tone, children }: { tone: keyof typeof BADGE_TONES; children: string }) {
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${BADGE_TONES[tone]}`}>{children}</span>;
}
