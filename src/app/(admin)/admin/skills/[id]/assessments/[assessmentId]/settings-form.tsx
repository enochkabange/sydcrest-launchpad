"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextAreaField, TextField } from "@/components/ui/field";
import { setAssessmentPublished, updateAssessment, type FormState } from "../../../actions";

type Assessment = {
  id: string;
  kind: string;
  title: string;
  instructions: string | null;
  pass_threshold: number;
  retry_after_hours: number;
};

export function AssessmentSettingsForm({ assessment }: { assessment: Assessment }) {
  const [state, action, pending] = useActionState<FormState, FormData>(updateAssessment, {});
  const e = state.errors ?? {};
  const isQuiz = assessment.kind === "quiz";
  return (
    <form key={state.saved ?? 0} action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && <Alert tone="success">Saved.</Alert>}
      <input type="hidden" name="id" value={assessment.id} />
      <TextField id="title" label="Title" defaultValue={assessment.title} error={e.title} required maxLength={120} />
      <TextAreaField
        id="instructions"
        label="Instructions"
        hint={isQuiz ? "Shown before the questions." : "What the work must show, and what kind of link to send."}
        defaultValue={assessment.instructions ?? ""}
        error={e.instructions}
        maxLength={4000}
        rows={5}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {isQuiz ? (
          <TextField
            id="pass_threshold"
            label="Pass mark (%)"
            inputMode="numeric"
            defaultValue={String(assessment.pass_threshold)}
            error={e.pass_threshold}
          />
        ) : (
          <input type="hidden" name="pass_threshold" value={assessment.pass_threshold} />
        )}
        <TextField
          id="retry_after_hours"
          label={isQuiz ? "Wait after a fail (hours)" : "Wait after sending back (hours)"}
          inputMode="numeric"
          defaultValue={String(assessment.retry_after_hours)}
          error={e.retry_after_hours}
        />
      </div>
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving" : "Save settings"}
      </Button>
    </form>
  );
}

/** Publishing a quiz checks there are questions and a right answer for each. */
export function PublishAssessment({ id, published }: { id: string; published: boolean }) {
  const [state, action, pending] = useActionState<FormState, FormData>(setAssessmentPublished, {});
  return (
    <form action={action} className="flex flex-col gap-2">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="publish" value={published ? "false" : "true"} />
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <Button type="submit" variant={published ? "secondary" : "primary"} disabled={pending} className="self-start">
        {published ? "Unpublish" : "Publish"}
      </Button>
    </form>
  );
}
