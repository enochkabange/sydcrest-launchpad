"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/field";
import { MESSAGE_MAX, TIMELINE_MAX } from "@/lib/briefs/briefs";
import { submitPitch, type FormState } from "../actions";

export function PitchForm({ briefId, offers }: { briefId: string; offers: { id: string; label: string }[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitPitch.bind(null, briefId), {});
  const v = state.values ?? {};
  const e = state.errors ?? {};
  const str = (key: string) => (typeof v[key] === "string" ? (v[key] as string) : undefined);

  return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <TextAreaField
        id="message"
        label="Your pitch"
        hint="How you would approach it and similar work you have done."
        rows={6}
        maxLength={MESSAGE_MAX}
        required
        defaultValue={str("message")}
        error={e.message}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="price"
          label="Indicative price in cedis (optional)"
          hint="A guide only. Nobody pays through SydCrest."
          inputMode="numeric"
          defaultValue={str("price")}
          error={e.price}
        />
        <TextField
          id="timeline"
          label="Timeline (optional)"
          placeholder="Within a week"
          maxLength={TIMELINE_MAX}
          defaultValue={str("timeline")}
          error={e.timeline}
        />
      </div>
      {offers.length > 0 && (
        <SelectField
          id="offer_id"
          label="Link one of your offers (optional)"
          hint="A gig or session from your expert page with a fixed scope."
          defaultValue={str("offer_id") ?? ""}
          error={e.offer_id}
        >
          <option value="">No offer</option>
          {offers.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </SelectField>
      )}
      <div className="flex justify-end border-t border-line pt-5">
        <Button type="submit" disabled={pending}>
          {pending ? "Sending" : "Send pitch"}
        </Button>
      </div>
    </form>
  );
}
