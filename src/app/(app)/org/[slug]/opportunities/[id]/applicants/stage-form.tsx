"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/field";
import { EMPLOYER_STAGES } from "@/lib/opportunities/applications";
import { moveApplicant, type StageState } from "./actions";

/** Stage picker for one applicant. Hired is final and files a job outcome. */
export function StageForm({ applicationId, name, stage, path }: { applicationId: string; name: string; stage: string; path: string }) {
  const [state, action, pending] = useActionState<StageState, FormData>(moveApplicant.bind(null, applicationId, path), {});
  if (stage === "hired") return <p className="text-sm font-semibold text-success-fg">Hired</p>;
  return (
    <form action={action} className="flex flex-wrap items-end gap-3" aria-label={`Stage for ${name}`}>
      <SelectField id={`stage-${applicationId}`} name="stage" label="Stage" defaultValue={stage}>
        {EMPLOYER_STAGES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </SelectField>
      <Button type="submit" variant="secondary" disabled={pending}>
        {pending ? "Saving…" : "Update"}
      </Button>
      {state.message && <p className="w-full text-sm text-danger-fg">{state.message}</p>}
      {state.saved && !state.message && <p className="w-full text-sm text-content-2" role="status">Saved. They have been told.</p>}
    </form>
  );
}
