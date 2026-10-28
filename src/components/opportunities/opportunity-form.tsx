"use client";

import { useActionState, type ComponentProps } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextField } from "@/components/ui/field";
import {
  LIMITS,
  type OpportunityFormMode,
  type OpportunityFormState,
  type OpportunityFormValues,
} from "@/lib/opportunities/form";
import { OPPORTUNITY_KINDS, OPPORTUNITY_STATUSES } from "@/lib/opportunities/model";
import { REGIONS } from "@/lib/regions";
import { FIELD_CATEGORIES, TRACKS } from "@/lib/roadmap-admin";

/**
 * The form to post or edit an opportunity. Shared by the admin area and the
 * organisation area (#161): pass a Server Action that runs
 * `parseOpportunityForm(form, { mode })` from `@/lib/opportunities/form`,
 * writes the row and returns OpportunityFormState.
 *
 * `mode="organisation"` leaves out the poster name (the database uses the
 * organisation's own) and the admin only source link.
 *
 * Layout: one column of fields on phones; from lg the matching tags (fields
 * and tracks) move into a second column beside the main details, so the
 * form never runs 1280px wide.
 */
export function OpportunityForm({
  action,
  mode,
  opportunity,
  submitLabel,
}: {
  action: (state: OpportunityFormState, form: FormData) => Promise<OpportunityFormState>;
  mode: OpportunityFormMode;
  opportunity?: OpportunityFormValues;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const e = state.errors ?? {};
  // After a rejected submit, show what was typed (React has reset the form).
  const o = { ...opportunity, ...state.values };
  const editing = !!o.id;

  return (
    <form key={state.at ?? 0} action={formAction} noValidate className="flex flex-col gap-6">
      {state.message && <Alert tone={state.saved ? "success" : "danger"}>{state.message}</Alert>}
      {state.saved && !state.message && <Alert tone="success">Saved.</Alert>}
      {Object.keys(e).length > 0 && <Alert tone="danger">Check the fields marked below.</Alert>}
      {o.id && <input type="hidden" name="id" value={o.id} />}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-10">
        <div className="flex min-w-0 flex-col gap-4">
          <fieldset className="flex flex-col gap-4">
            <legend className="mb-1 text-h3 text-content">The opportunity</legend>
            <TextField id="title" label="Title" defaultValue={o.title} error={e.title} required maxLength={LIMITS.title} />
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField id="kind" label="Type" defaultValue={o.kind ?? ""} error={e.kind} required>
                <option value="" disabled>
                  Choose a type
                </option>
                {OPPORTUNITY_KINDS.map((k) => (
                  <option key={k.value} value={k.value}>
                    {k.label}
                  </option>
                ))}
              </SelectField>
              <SelectField id="status" label="Status" defaultValue={o.status ?? "draft"} error={e.status} hint="Open posts show on the board until their deadline.">
                {OPPORTUNITY_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </SelectField>
            </div>
            {mode === "admin" && (
              <TextField
                id="organisation_name"
                label="Offered by"
                hint="The organisation people will apply to."
                defaultValue={o.organisation_name}
                error={e.organisation_name}
                required
                maxLength={LIMITS.organisation_name}
              />
            )}
            <TextAreaField
              id="summary"
              label="Summary"
              hint="One or two sentences for the board."
              defaultValue={o.summary ?? ""}
              error={e.summary}
              maxLength={LIMITS.summary}
              rows={2}
            />
            <TextAreaField
              id="description"
              label="Description"
              hint="What it is, what the person will do and what they get. Blank lines start new paragraphs."
              defaultValue={o.description ?? ""}
              error={e.description}
              required
              maxLength={LIMITS.description}
              rows={8}
            />
            <TextAreaField
              id="eligibility"
              label="Who can apply"
              defaultValue={o.eligibility ?? ""}
              error={e.eligibility}
              maxLength={LIMITS.eligibility}
            />
            <TextField
              id="compensation_note"
              label="Pay or award"
              hint="Display only, for example Paid internship or Fully funded. Nobody pays through SydCrest."
              defaultValue={o.compensation_note ?? ""}
              error={e.compensation_note}
              maxLength={LIMITS.compensation_note}
            />
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            <legend className="mb-1 text-h3 text-content">How to apply</legend>
            {e.apply && (
              <p id="apply-error" className="text-sm text-danger-fg">
                {e.apply}
              </p>
            )}
            <TextField
              id="apply_url"
              label="Application link"
              type="url"
              inputMode="url"
              placeholder="https://"
              defaultValue={o.apply_url ?? ""}
              error={e.apply_url}
              aria-describedby={e.apply ? "apply-error" : undefined}
            />
            <TextAreaField
              id="apply_instructions"
              label="Or instructions"
              hint="For example who to email and what to send."
              defaultValue={o.apply_instructions ?? ""}
              error={e.apply_instructions}
              maxLength={LIMITS.apply_instructions}
            />
            <TextField
              id="deadline"
              label="Deadline"
              type="date"
              hint="Leave empty if there is none. The post leaves the board the day after."
              defaultValue={o.deadline ?? ""}
              error={e.deadline}
            />
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            <legend className="mb-1 text-h3 text-content">Where</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                id="location"
                label="Town or city"
                defaultValue={o.location ?? ""}
                error={e.location}
                maxLength={LIMITS.location}
              />
              <SelectField id="region" label="Region" defaultValue={o.region ?? ""} error={e.region}>
                <option value="">Not in one region</option>
                {REGIONS.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.label}
                  </option>
                ))}
              </SelectField>
            </div>
            <label htmlFor="is_remote" className="flex min-h-11 items-center gap-3 text-sm text-content">
              <input id="is_remote" name="is_remote" type="checkbox" defaultChecked={o.is_remote ?? false} className="size-5 shrink-0 accent-line-selected" />
              Can be done remotely
            </label>
          </fieldset>
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <CheckboxGroup
            name="fields"
            legend="Fields"
            hint={`Up to ${LIMITS.fields}. Used by the board's field filter.`}
            options={FIELD_CATEGORIES}
            checked={o.fields ?? []}
            error={e.fields}
          />
          <CheckboxGroup
            name="tracks"
            legend="Suits these tracks"
            hint={`Up to ${LIMITS.tracks}. Learners on these tracks see it in Suggested for you.`}
            options={TRACKS}
            checked={o.tracks ?? []}
            error={e.tracks}
          />
          <TextAreaField
            id="skills"
            label="Skills"
            hint="Separate with commas, for example Excel, Canva, customer service."
            defaultValue={(o.skills ?? []).join(", ")}
            error={e.skills}
            rows={2}
          />
          <fieldset className="flex flex-col gap-4">
            <legend className="mb-1 text-h3 text-content">Address</legend>
            <TextField
              id="slug"
              label="Slug"
              hint={editing ? "The end of the page address. Changing it breaks shared links." : "The end of the page address. Leave empty to make one from the title."}
              defaultValue={o.slug ?? ""}
              error={e.slug}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
            {mode === "admin" && (
              <TextField
                id="source_url"
                label="Where you found it"
                hint="Not shown publicly. A link to check the opportunity is real."
                type="url"
                inputMode="url"
                placeholder="https://"
                defaultValue={o.source_url ?? ""}
                error={e.source_url}
              />
            )}
          </fieldset>
        </div>
      </div>

      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving…" : (submitLabel ?? (editing ? "Save changes" : "Post opportunity"))}
      </Button>
    </form>
  );
}

function TextAreaField({
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

function CheckboxGroup({
  name,
  legend,
  hint,
  options,
  checked,
  error,
}: {
  name: string;
  legend: string;
  hint: string;
  options: readonly { value: string; label: string }[];
  checked: string[];
  error?: string;
}) {
  return (
    <fieldset className="flex flex-col gap-2" aria-describedby={`${name}-${error ? "error" : "hint"}`}>
      <legend className="text-h3 text-content">{legend}</legend>
      <p id={`${name}-hint`} className="text-sm text-content-3">
        {hint}
      </p>
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
