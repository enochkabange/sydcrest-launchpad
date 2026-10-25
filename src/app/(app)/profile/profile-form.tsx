"use client";

import { useActionState } from "react";
import { updateProfile, type ProfileState } from "./actions";
import { Button } from "@/components/ui/button";
import { SelectField, TextField } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";
import { REGIONS } from "@/lib/regions";

export function ProfileForm({
  displayName,
  region,
}: {
  displayName: string | null;
  region: string | null;
}) {
  const [state, action, pending] = useActionState<ProfileState, FormData>(updateProfile, {});
  // React resets a form after its action runs; remount with the saved values
  // so the fields show what was stored rather than what the page loaded with.
  const current = state.saved ?? { display_name: displayName, region };

  return (
    <form key={state.saved?.at ?? 0} action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && <Alert tone="success">Saved.</Alert>}
      <TextField
        id="display_name"
        label="Your name"
        autoComplete="name"
        defaultValue={current.display_name ?? ""}
        error={state.errors?.display_name}
        required
      />
      <SelectField
        id="region"
        label="Region"
        hint="Used for your local chapter and regional events."
        defaultValue={current.region ?? ""}
        error={state.errors?.region}
      >
        <option value="">Choose your region</option>
        {REGIONS.map((r) => (
          <option key={r.slug} value={r.slug}>
            {r.label}
          </option>
        ))}
      </SelectField>
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
