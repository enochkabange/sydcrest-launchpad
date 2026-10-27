"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckboxField, SelectField, TextField } from "@/components/ui/field";
import { TextAreaField } from "@/components/business/bits";
import { REGIONS } from "@/lib/regions";
import { TRACKS } from "@/lib/roadmap-admin";
import { AVAILABILITY, MAX_TRACKS } from "@/lib/talent/forms";
import { saveListing, type ListingState } from "../actions";

export type ListingValues = {
  headline: string;
  summary: string | null;
  skills: string[];
  tracks: string[];
  region: string | null;
  availability: string;
  open_to_remote: boolean;
  portfolio_url: string | null;
  is_active: boolean;
};

export function ListingForm({ values, isNew }: { values: ListingValues; isNew: boolean }) {
  const [state, action, pending] = useActionState<ListingState, FormData>(saveListing, {});
  return (
    <form key={state.saved ?? 0} action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && <Alert tone="success">Saved. {values.is_active ? "Verified organisations can find you." : "Your listing is hidden."}</Alert>}
      <TextField
        id="headline"
        label="Headline"
        hint="One line organisations read first, such as Junior data analyst in Tamale."
        defaultValue={values.headline}
        error={state.errors?.headline}
        maxLength={120}
        required
      />
      <TextAreaField
        id="summary"
        label="About you (optional)"
        hint="What you have built, what you want to do next."
        defaultValue={values.summary ?? ""}
        error={state.errors?.summary}
        maxLength={2000}
      />
      <TextField
        id="skills"
        label="Skills (optional)"
        hint="Separate skills with commas. Organisations filter by these."
        defaultValue={values.skills.join(", ")}
        error={state.errors?.skills}
      />
      <fieldset className="flex flex-col gap-2" aria-describedby={state.errors?.tracks ? "tracks-error" : "tracks-hint"}>
        <legend className="text-sm font-semibold text-content">Tracks (optional)</legend>
        <p id="tracks-hint" className="text-sm text-content-3">
          Choose up to {MAX_TRACKS}.
        </p>
        <div className="grid gap-x-4 sm:grid-cols-2 xl:grid-cols-3">
          {TRACKS.map((t) => (
            <CheckboxField key={t.value} id={`track-${t.value}`} name="tracks" value={t.value} defaultChecked={values.tracks.includes(t.value)}>
              {t.label}
            </CheckboxField>
          ))}
        </div>
        {state.errors?.tracks && (
          <p id="tracks-error" className="text-sm text-danger-fg">
            {state.errors.tracks}
          </p>
        )}
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField id="region" label="Region (optional)" defaultValue={values.region ?? ""} error={state.errors?.region}>
          <option value="">Choose your region</option>
          {REGIONS.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.label}
            </option>
          ))}
        </SelectField>
        <SelectField id="availability" label="Open to" defaultValue={values.availability} error={state.errors?.availability}>
          {AVAILABILITY.map((a) => (
            <option key={a.value} value={a.value}>
              {a.label}
            </option>
          ))}
        </SelectField>
      </div>
      <CheckboxField id="open_to_remote" defaultChecked={values.open_to_remote}>
        I am open to remote work
      </CheckboxField>
      <TextField
        id="portfolio_url"
        label="Portfolio link (optional)"
        type="url"
        inputMode="url"
        defaultValue={values.portfolio_url ?? ""}
        error={state.errors?.portfolio_url}
      />
      <SelectField id="is_active" label="Visibility" defaultValue={values.is_active ? "on" : "off"}>
        <option value="on">Show me to verified organisations</option>
        <option value="off">Hide my listing</option>
      </SelectField>
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving…" : isNew ? "Join the directory" : "Save listing"}
      </Button>
    </form>
  );
}
