"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/field";
import { REGIONS } from "@/lib/regions";
import { applyToStartChapter, type StartChapterState } from "./actions";

export function StartChapterForm({ defaultRegion }: { defaultRegion: string | null }) {
  const [state, action, pending] = useActionState<StartChapterState, FormData>(applyToStartChapter, {});
  const v = state.values;
  return (
    <form action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <TextField id="town" label="Town or city" autoComplete="address-level2" defaultValue={v?.town} error={state.errors?.town} required />
      <SelectField id="region" label="Region" defaultValue={v?.region ?? defaultRegion ?? ""} error={state.errors?.region} required>
        <option value="" disabled>
          Choose a region
        </option>
        {REGIONS.map((r) => (
          <option key={r.slug} value={r.slug}>
            {r.label}
          </option>
        ))}
      </SelectField>
      <TextAreaField
        id="motivation"
        label="Why do you want to start a chapter there?"
        hint="Who would come, and what they need."
        rows={4}
        defaultValue={v?.motivation}
        error={state.errors?.motivation}
        required
      />
      <TextAreaField
        id="plan"
        label="How would you run it?"
        hint="Where people could meet, how often, and who could help you. A school, church, library or business that would host is a big plus."
        rows={4}
        defaultValue={v?.plan}
        error={state.errors?.plan}
        required
      />
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Sending…" : "Send application"}
      </Button>
    </form>
  );
}
