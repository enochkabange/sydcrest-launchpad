"use client";

import { useActionState } from "react";
import { addResource, updateResource, type FormState } from "./actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckboxField, SelectField, TextField } from "@/components/ui/field";
import { RESOURCE_KINDS } from "@/lib/roadmap-admin";

type Resource = { id: string; label: string; url: string; kind: string; is_active: boolean };

/** Add a link to a node (no `resource`) or edit one, including its link health flag. */
export function ResourceForm({ nodeId, resource }: { nodeId: string; resource?: Resource }) {
  const [state, action, pending] = useActionState<FormState, FormData>(resource ? updateResource : addResource, {});
  const e = state.errors ?? {};
  // Several of these forms share a page, so every id is unique.
  const f = (name: string) => `${resource ? `r-${resource.id}` : "new"}-${name}`;

  return (
    <form key={state.saved ?? 0} action={action} className="flex flex-col gap-3" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && <Alert tone="success">{resource ? "Saved." : "Link added."}</Alert>}
      <input type="hidden" name="node_id" value={nodeId} />
      {resource && <input type="hidden" name="id" value={resource.id} />}
      <TextField id={f("label")} name="label" label="Link label" defaultValue={resource?.label} error={e.label} required maxLength={200} />
      <TextField
        id={f("url")}
        name="url"
        label="Link address"
        type="url"
        inputMode="url"
        placeholder="https://"
        defaultValue={resource?.url}
        error={e.url}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />
      <SelectField id={f("kind")} name="kind" label="Kind" defaultValue={resource?.kind ?? "article"} error={e.kind}>
        {RESOURCE_KINDS.map((k) => (
          <option key={k.value} value={k.value}>
            {k.label}
          </option>
        ))}
      </SelectField>
      {resource && (
        <CheckboxField id={f("is_active")} name="is_active" defaultChecked={resource.is_active}>
          Link works (untick to mark it broken and hide it from learners)
        </CheckboxField>
      )}
      <Button type="submit" variant={resource ? "secondary" : "primary"} disabled={pending} className="self-start">
        {pending ? "Saving…" : resource ? "Save link" : "Add link"}
      </Button>
    </form>
  );
}
