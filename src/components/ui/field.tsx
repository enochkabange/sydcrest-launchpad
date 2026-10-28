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

/**
 * A checkbox with its label beside it. The label wraps the box so the whole
 * row is a 44px target; children may include links (they still open on tap).
 */
export function CheckboxField({
  id,
  children,
  error,
  ...props
}: { id: string; children: ReactNode; error?: string } & Omit<ComponentProps<"input">, "type">) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex min-h-11 items-start gap-3 py-1 text-sm text-content">
        <input
          id={id}
          name={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 accent-line-selected"
          {...props}
        />
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} className="text-sm text-danger-fg">
          {error}
        </p>
      )}
    </div>
  );
}

/** A multi line TextField: label, hint and error wired the same way. Three rows unless `rows` says otherwise. */
export function TextAreaField({
  id,
  label,
  hint,
  error,
  rows = 3,
  ...props
}: { id: string; label: string; hint?: string; error?: string } & ComponentProps<"textarea">) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <textarea
        id={id}
        name={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className="min-h-24 w-full rounded-md border border-line-strong bg-surface px-3 py-2 text-base text-content placeholder:text-content-3 aria-invalid:border-danger-fg"
        {...props}
      />
    </FieldShell>
  );
}

/**
 * A group of checkboxes sharing one name (the form posts every ticked value).
 * One column on phones, two from sm; each row is a 44px target. The legend
 * is a section heading by default; `legendStyle="field"` sizes it like a field
 * label, for a group inside a longer fieldset.
 */
export function CheckboxGroup({
  name,
  legend,
  hint,
  options,
  checked,
  error,
  legendStyle = "section",
}: {
  name: string;
  legend: string;
  legendStyle?: "section" | "field";
  hint?: string;
  options: readonly { value: string; label: string }[];
  checked: readonly string[];
  error?: string;
}) {
  const described = error ? `${name}-error` : hint ? `${name}-hint` : undefined;
  return (
    <fieldset className="flex flex-col gap-2" aria-describedby={described}>
      <legend className={legendStyle === "field" ? "text-sm font-semibold text-content" : "text-h3 text-content"}>{legend}</legend>
      {hint && (
        <p id={`${name}-hint`} className="text-sm text-content-3">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="text-sm text-danger-fg">
          {error}
        </p>
      )}
      <div className="grid gap-x-4 sm:grid-cols-2">
        {options.map((opt) => (
          <label key={opt.value} htmlFor={`${name}-${opt.value}`} className="flex min-h-11 items-center gap-3 text-sm text-content">
            <input
              id={`${name}-${opt.value}`}
              name={name}
              value={opt.value}
              type="checkbox"
              defaultChecked={checked.includes(opt.value)}
              className="size-5 shrink-0 accent-line-selected"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
