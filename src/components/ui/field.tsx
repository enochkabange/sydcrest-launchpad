import type { ComponentProps, ReactNode } from "react";

const CONTROL =
  "min-h-11 w-full rounded-md border border-line-strong bg-surface px-3 text-base text-content placeholder:text-content-3 aria-invalid:border-danger-fg";

/** Label, control and error wired together for screen readers. */
function FieldShell({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-content">
        {label}
      </label>
      {children}
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

function describedBy(id: string, hint?: string, error?: string) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined;
}

export function TextField({
  id,
  label,
  hint,
  error,
  ...props
}: { id: string; label: string; hint?: string; error?: string } & ComponentProps<"input">) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={CONTROL}
        {...props}
      />
    </FieldShell>
  );
}

/** Native select on purpose: the Android picker beats any custom listbox. */
export function SelectField({
  id,
  label,
  hint,
  error,
  children,
  ...props
}: { id: string; label: string; hint?: string; error?: string } & ComponentProps<"select">) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <select
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={CONTROL}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}
