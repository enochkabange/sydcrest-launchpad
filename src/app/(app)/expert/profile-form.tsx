"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckboxField, SelectField, TextField } from "@/components/ui/field";
import { TextAreaField } from "@/components/experts/textarea-field";
import { LIMITS } from "@/lib/market-apply/expert";
import { REGIONS } from "@/lib/regions";
import { updateExpertProfile, type ExpertProfileState } from "./actions";

export type ExpertProfileValues = {
  slug: string;
  headline: string;
  bio: string | null;
  skills: string[];
  links: string[];
  languages: string[];
  region: string | null;
  availability_note: string | null;
  accepting_requests: boolean;
  offers_free_intro: boolean;
};

/** Edits what learners see on the expert page. Saved values come back from the page on refresh. */
export function ExpertProfileForm({ initial: saved, origin }: { initial: ExpertProfileValues; origin: string }) {
  // Stamp each response and remount the form on it, so every field (the region select too) starts from
  // what was submitted after an error, or from the saved profile after a save.
  const [state, action, pending] = useActionState<ExpertProfileState & { at?: number }, FormData>(
    async (prev, form) => ({
      ...(await updateExpertProfile(prev, form)),
      at: Date.now(),
    }),
    {},
  );
  const e = state.errors ?? {};
  const initial: ExpertProfileValues = state.values ?? saved;

  return (
    <form key={state.at ?? 0} action={action} className="flex flex-col gap-5" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && <Alert tone="success">Expert profile saved.</Alert>}
      <TextField id="headline" label="Headline" maxLength={LIMITS.headline} defaultValue={initial.headline} error={e.headline} required />
      <TextField
        id="slug"
        label="Expert page link name"
        hint={`Your page is ${origin}/experts/${initial.slug}`}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        defaultValue={initial.slug}
        error={e.slug}
        required
      />
      <TextAreaField
        id="bio"
        label="About you (optional)"
        hint="Your background and how you like to work with learners."
        maxLength={LIMITS.bio}
        defaultValue={initial.bio ?? ""}
        error={e.bio}
        rows={5}
      />
      <TextField
        id="skills"
        label="Skills"
        hint="Separate skills with commas."
        defaultValue={initial.skills.join(", ")}
        error={e.skills}
        required
      />
      <TextAreaField
        id="links"
        label="Links (optional)"
        hint="One per line: a portfolio, a professional profile or your website."
        defaultValue={initial.links.join("\n")}
        error={e.links}
        rows={3}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="languages"
          label="Languages (optional)"
          hint="For example: English, Dagbani, Twi."
          defaultValue={initial.languages.join(", ")}
          error={e.languages}
        />
        <SelectField id="region" label="Region (optional)" defaultValue={initial.region ?? ""} error={e.region}>
          <option value="">Not shown</option>
          {REGIONS.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.label}
            </option>
          ))}
        </SelectField>
      </div>
      <TextField
        id="availability_note"
        label="Availability note (optional)"
        hint="When you are usually free, for example: Weekday evenings and Saturday mornings."
        maxLength={LIMITS.availabilityNote}
        defaultValue={initial.availability_note ?? ""}
        error={e.availability_note}
      />
      <div className="flex flex-col gap-1">
        <CheckboxField id="accepting_requests" defaultChecked={initial.accepting_requests}>
          I am accepting new requests
        </CheckboxField>
        <CheckboxField id="offers_free_intro" defaultChecked={initial.offers_free_intro}>
          I offer a free intro call
        </CheckboxField>
      </div>
      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save expert profile"}
        </Button>
      </div>
    </form>
  );
}
