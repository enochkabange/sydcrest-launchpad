"use client";

import { useActionState } from "react";
import { createRoadmap, updateRoadmap, type FormState } from "./actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextField } from "@/components/ui/field";
import { FIELD_CATEGORIES, LOCALES, TRACKS } from "@/lib/roadmap-admin";
import { TextAreaField } from "./fields";

type Roadmap = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  track: string | null;
  field_category: string | null;
  locale: string;
  display_order: number;
};

/** Create a roadmap (no `roadmap`) or edit one. Publishing is a separate button. */
export function RoadmapForm({ roadmap }: { roadmap?: Roadmap }) {
  const [state, action, pending] = useActionState<FormState, FormData>(roadmap ? updateRoadmap : createRoadmap, {});
  const e = state.errors ?? {};

  return (
    <form key={state.saved ?? 0} action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && <Alert tone="success">Saved.</Alert>}
      {roadmap && <input type="hidden" name="id" value={roadmap.id} />}
      <TextField id="title" label="Title" defaultValue={roadmap?.title} error={e.title} required maxLength={120} />
      <TextField
        id="slug"
        label="Slug"
        hint={roadmap ? "Used in the roadmap's address. Changing it breaks shared links." : "Used in the address. Leave empty to make one from the title."}
        defaultValue={roadmap?.slug}
        error={e.slug}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />
      <TextAreaField id="description" label="Description" defaultValue={roadmap?.description ?? ""} error={e.description} maxLength={2000} />
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField id="track" label="Track" defaultValue={roadmap?.track ?? ""} error={e.track}>
          <option value="">No track</option>
          {TRACKS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </SelectField>
        <SelectField id="field_category" label="Field" defaultValue={roadmap?.field_category ?? ""} error={e.field_category}>
          <option value="">No field</option>
          {FIELD_CATEGORIES.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </SelectField>
        <SelectField id="locale" label="Locale" defaultValue={roadmap?.locale ?? "en-GH"} error={e.locale}>
          {LOCALES.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </SelectField>
        <TextField
          id="display_order"
          label="Display order"
          hint="Lower numbers show first."
          type="number"
          inputMode="numeric"
          defaultValue={roadmap?.display_order ?? 0}
          error={e.display_order}
        />
      </div>
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving…" : roadmap ? "Save roadmap" : "Create roadmap"}
      </Button>
    </form>
  );
}
