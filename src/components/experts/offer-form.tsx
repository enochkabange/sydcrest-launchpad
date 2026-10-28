"use client";

import { useActionState, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckboxField, SelectField, TextAreaField, TextField } from "@/components/ui/field";
import type { FieldErrors } from "@/lib/validation";
import {
  CADENCE_LABELS,
  CADENCES,
  KIND_FIELDS,
  OFFER_KIND_HINTS,
  OFFER_KIND_LABELS,
  OFFER_KINDS,
  OFFER_LIMITS,
  SOFT_LAUNCH_NOTE,
  isOfferKind,
  type OfferFields,
  type OfferValues,
} from "@/lib/market-apply/offers";

/** `values` echoes what was submitted, so a rejected form keeps what the expert typed. */
export type OfferFormState = { errors?: FieldErrors<OfferFields>; message?: string; values?: OfferValues };

const num = (n: number | null) => (n == null ? "" : String(n));

/**
 * Create or edit an offer, including fixed scope gigs. The kind decides which
 * extra fields show (a gig needs a scope and a delivery time; a group session
 * needs a size). `action` is a Server Action that validates again with
 * parseOffer and returns errors, or redirects when saved.
 *
 * There is no payment here: every offer is free during the soft launch, and
 * the optional price is shown only as indicative.
 */
export function OfferForm({
  action,
  initial,
  submitLabel = "Save offer",
}: {
  action: (state: OfferFormState, form: FormData) => Promise<OfferFormState>;
  initial: OfferValues;
  submitLabel?: string;
}) {
  // Each response gets a stamp, and the form remounts on it, so the fields
  // start again from what was submitted (React resets a form after an action).
  const [state, formAction, pending] = useActionState<OfferFormState & { at?: number }, FormData>(
    async (prev, form) => ({ ...(await action(prev, form)), at: Date.now() }),
    {},
  );
  return (
    <form key={state.at ?? 0} action={formAction} className="flex flex-col gap-5" noValidate>
      <OfferFields state={state} initial={state.values ?? initial} pending={pending} submitLabel={submitLabel} />
    </form>
  );
}

function OfferFields({
  state,
  initial,
  pending,
  submitLabel,
}: {
  state: OfferFormState;
  initial: OfferValues;
  pending: boolean;
  submitLabel: string;
}) {
  const [kind, setKind] = useState<OfferValues["kind"]>(initial.kind);
  const rules = isOfferKind(kind) ? KIND_FIELDS[kind] : {};
  const e = state.errors ?? {};

  return (
    <>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {Object.keys(e).length > 0 && !state.message && <Alert tone="danger">Check the highlighted fields and try again.</Alert>}

      <SelectField
        id="kind"
        label="Kind of offer"
        defaultValue={initial.kind}
        onChange={(event) => setKind(event.target.value as OfferValues["kind"])}
        hint={isOfferKind(kind) ? OFFER_KIND_HINTS[kind] : "Pick the one closest to what you offer."}
        error={e.kind}
        required
      >
        <option value="" disabled>
          Choose a kind
        </option>
        {OFFER_KINDS.map((k) => (
          <option key={k} value={k}>
            {OFFER_KIND_LABELS[k]}
          </option>
        ))}
      </SelectField>

      <TextField
        id="title"
        label="Title"
        hint="For example: Review your first data dashboard."
        maxLength={OFFER_LIMITS.title}
        defaultValue={initial.title}
        error={e.title}
        required
      />
      <TextAreaField
        id="description"
        label="Description"
        hint="Who it is for and what they leave with."
        maxLength={OFFER_LIMITS.description}
        defaultValue={initial.description}
        error={e.description}
        required
      />

      {rules.scope && (
        <TextAreaField
          id="scope"
          label={rules.scope === "required" ? "Scope" : "Scope (optional)"}
          hint="Exactly what you will deliver, so there are no surprises."
          maxLength={OFFER_LIMITS.scope}
          defaultValue={initial.scope ?? ""}
          error={e.scope}
          required={rules.scope === "required"}
        />
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {rules.duration && (
          <TextField
            id="duration_minutes"
            label={rules.duration === "required" ? "Length in minutes" : "Length in minutes (optional)"}
            inputMode="numeric"
            defaultValue={num(initial.duration_minutes)}
            hint={`From ${OFFER_LIMITS.duration[0]} to ${OFFER_LIMITS.duration[1]}.`}
            error={e.duration_minutes}
            required={rules.duration === "required"}
          />
        )}
        {rules.participants && (
          <TextField
            id="max_participants"
            label="Most learners per session"
            inputMode="numeric"
            defaultValue={num(initial.max_participants)}
            error={e.max_participants}
            required
          />
        )}
        {rules.cadence && (
          <SelectField id="cadence" label="How often" defaultValue={initial.cadence ?? ""} error={e.cadence} required>
            <option value="" disabled>
              Choose how often
            </option>
            {CADENCES.map((c) => (
              <option key={c} value={c}>
                {CADENCE_LABELS[c]}
              </option>
            ))}
          </SelectField>
        )}
        {rules.delivery && (
          <TextField
            id="delivery_days"
            label={rules.delivery === "required" ? "Delivery time in days" : "Delivery time in days (optional)"}
            inputMode="numeric"
            defaultValue={num(initial.delivery_days)}
            error={e.delivery_days}
            required={rules.delivery === "required"}
          />
        )}
        {rules.revisions && (
          <TextField
            id="revisions_included"
            label="Revisions included (optional)"
            inputMode="numeric"
            defaultValue={num(initial.revisions_included)}
            error={e.revisions_included}
          />
        )}
      </div>

      <TextField
        id="skills"
        label="Skills (optional)"
        hint="Separate skills with commas, so learners can find this offer."
        defaultValue={initial.skills.join(", ")}
        error={e.skills}
      />

      <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-4">
        <p className="text-sm font-semibold text-content">{SOFT_LAUNCH_NOTE}</p>
        <p className="text-sm text-content-2">
          Nobody pays for offers yet. You can add an indicative price so learners know what it may cost later. It is shown
          as indicative and is never charged.
        </p>
        <TextField
          id="indicative_price_ghs"
          label="Indicative price in cedis (optional)"
          inputMode="numeric"
          defaultValue={num(initial.indicative_price_ghs)}
          error={e.indicative_price_ghs}
        />
      </div>

      <CheckboxField id="is_active" defaultChecked={initial.is_active}>
        Show this offer on my expert page
      </CheckboxField>

      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
      </div>
    </>
  );
}
