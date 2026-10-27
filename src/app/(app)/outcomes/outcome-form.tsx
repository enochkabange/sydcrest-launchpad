"use client";

import { useActionState } from "react";
import Link from "@/components/ui/link";
import { Alert } from "@/components/ui/alert";
import { Button, buttonClasses } from "@/components/ui/button";
import { SelectField, TextField } from "@/components/ui/field";
import { OUTCOME_TYPES } from "@/lib/outcomes/labels";
import type { OutcomeInput } from "@/lib/outcomes/validation";
import type { OutcomeFormState } from "./actions";

/**
 * The report and edit form. Keeps what was typed after a failed check: the
 * action returns the submitted values and the fields remount with them
 * (React resets a form after its action runs).
 */
export function OutcomeForm({
  action,
  initial,
  submitLabel,
  today,
}: {
  action: (prev: OutcomeFormState, form: FormData) => Promise<OutcomeFormState>;
  initial?: Partial<OutcomeInput>;
  submitLabel: string;
  /** Today in Ghana (YYYY-MM-DD), the latest date the field allows. */
  today: string;
}) {
  const [state, formAction, pending] = useActionState<OutcomeFormState, FormData>(action, {});
  const v = (key: keyof OutcomeInput) => state.values?.[key] ?? initial?.[key] ?? "";
  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {Object.keys(errors).length > 0 && <Alert tone="danger">Check the fields marked below.</Alert>}

      <SelectField key={`type-${v("type")}`} id="type" label="What kind of outcome?" defaultValue={v("type")} error={errors.type} required>
        <option value="">Choose one</option>
        {OUTCOME_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </SelectField>

      <div className="grid gap-5 md:grid-cols-2">
        <TextField
          key={`org-${v("organisation_name")}`}
          id="organisation_name"
          label="Organisation, client or funder"
          defaultValue={v("organisation_name")}
          error={errors.organisation_name}
          maxLength={120}
          required
        />
        <TextField
          key={`title-${v("title")}`}
          id="title"
          label="Role or award (optional)"
          hint="For example: Junior web developer, or Graduate scholarship."
          defaultValue={v("title")}
          error={errors.title}
          maxLength={140}
        />
      </div>

      <TextField
        key={`date-${v("started_on")}`}
        id="started_on"
        type="date"
        label="Date it started or was awarded"
        hint="Report it once it has started or been awarded."
        defaultValue={v("started_on")}
        min="2020-01-01"
        max={today}
        error={errors.started_on}
        required
      />

      <fieldset className="flex flex-col gap-4 rounded-lg border border-line p-4 md:p-5">
        <legend className="px-1 text-h3 text-content">Evidence</legend>
        <p className="text-sm text-content-2">
          Add a link, a note, or both. An offer letter, a contract, an award email or a public announcement all work. Only our
          team sees this.
        </p>
        <TextField
          key={`url-${v("evidence_url")}`}
          id="evidence_url"
          type="url"
          inputMode="url"
          label="Link to evidence (optional)"
          hint="A shared document, an announcement or a profile page. Start with https://"
          defaultValue={v("evidence_url")}
          error={errors.evidence_url}
        />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="evidence_note" className="text-sm font-semibold text-content">
            Note for the reviewer (optional)
          </label>
          <textarea
            key={`note-${v("evidence_note")}`}
            id="evidence_note"
            name="evidence_note"
            rows={4}
            maxLength={1000}
            defaultValue={v("evidence_note")}
            aria-invalid={errors.evidence_note ? true : undefined}
            aria-describedby={errors.evidence_note ? "evidence_note-error" : "evidence_note-hint"}
            className="w-full rounded-md border border-line-strong bg-surface px-3 py-2.5 text-base text-content placeholder:text-content-3 aria-invalid:border-danger-fg"
          />
          {errors.evidence_note ? (
            <p id="evidence_note-error" className="text-sm text-danger-fg">
              {errors.evidence_note}
            </p>
          ) : (
            <p id="evidence_note-hint" className="text-sm text-content-3">
              Who to contact, or anything that helps us confirm it.
            </p>
          )}
        </div>
      </fieldset>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
        <Link href="/outcomes" className={buttonClasses("ghost")}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
