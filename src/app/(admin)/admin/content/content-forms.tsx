"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckboxField, SelectField, TextField } from "@/components/ui/field";
import { collectContent, estimateContent, submitContent, type ContentActionState } from "./actions";

function Result({ state }: { state: ContentActionState }) {
  if (!state.message) return null;
  const tone = state.status === 200 ? "success" : state.status === 503 ? "info" : "danger";
  return (
    <div className="flex flex-col gap-2">
      <Alert tone={tone}>{state.message}</Alert>
      {state.details && state.details.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-sm text-content-2">
          {state.details.map((d) => (
            <li key={d} className="break-words">
              {d}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function GenerateForm({ roadmaps }: { roadmaps: { slug: string; title: string }[] }) {
  const [estimate, estimateAction, estimating] = useActionState(estimateContent, {});
  const [submitted, submitAction, submitting] = useActionState(submitContent, {});
  const pending = estimating || submitting;

  return (
    <form action={estimateAction} className="flex flex-col gap-4">
      <SelectField id="roadmap" label="Roadmap" hint="Leave on all roadmaps to fill every node that has no content yet." defaultValue="">
        <option value="">All roadmaps</option>
        {roadmaps.map((r) => (
          <option key={r.slug} value={r.slug}>
            {r.title}
          </option>
        ))}
      </SelectField>
      <TextField id="node" label="Or one node id" hint="For regenerating a single node." autoComplete="off" spellCheck={false} />
      <CheckboxField id="regenerate">
        Regenerate nodes that already have content (needs a roadmap or a node). Each one gets a new content version.
      </CheckboxField>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="secondary" disabled={pending}>
          {estimating ? "Estimating…" : "Estimate cost"}
        </Button>
        <Button type="submit" formAction={submitAction} disabled={pending}>
          {submitting ? "Submitting…" : "Submit batch"}
        </Button>
      </div>
      <Result state={estimate} />
      <Result state={submitted} />
    </form>
  );
}

export type BatchOption = { id: string; label: string };

export function CollectForm({ batches }: { batches: BatchOption[] }) {
  const [state, action, pending] = useActionState(collectContent, {});
  return (
    <form action={action} className="flex flex-col gap-4">
      {batches.length > 0 && (
        <SelectField id="batch_id" label="Recent batch" defaultValue={batches[0].id}>
          {batches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.label}
            </option>
          ))}
        </SelectField>
      )}
      <TextField
        id="batch_id_typed"
        label={batches.length ? "Or paste a batch id" : "Batch id"}
        autoComplete="off"
        spellCheck={false}
      />
      <Button type="submit" variant="secondary" disabled={pending} className="self-start">
        {pending ? "Checking…" : "Collect results"}
      </Button>
      <Result state={state} />
    </form>
  );
}
