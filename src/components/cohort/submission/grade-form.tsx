"use client";

import { useActionState, useId, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";
import { MAX_MENTOR_FEEDBACK_CHARS } from "@/lib/submissions/config";
import { gradeSubmission, type GradeFormState } from "./actions";

export type GradeSubmissionFormProps = {
  submissionId: string;
  /** Prefills the score: the current final score, else the AI suggestion. */
  suggestedScore: number | null;
  mentorFeedback: string | null;
  passScore: number;
  /** Graded work can be re graded or returned; drafts never reach this form. */
  status: "submitted" | "ai_reviewed" | "returned" | "graded";
};

/**
 * The mentor's grading form, for the mentor console (#146). Grade sets the
 * final score (0 to 100); "Return for changes" sends the work back without a
 * score and needs feedback. grade_submission checks the caller is staff for
 * this learner or an admin.
 */
export function GradeSubmissionForm(props: GradeSubmissionFormProps) {
  const [state, action, pending] = useActionState<GradeFormState, FormData>(gradeSubmission, {});
  const [score, setScore] = useState(props.suggestedScore === null ? "" : String(props.suggestedScore));
  const [feedback, setFeedback] = useState(props.mentorFeedback ?? "");
  const ids = useId();
  const feedbackId = `${ids}-feedback`;
  const returned = props.status === "returned";

  return (
    <form action={action} className="flex flex-col gap-4" noValidate>
      <input type="hidden" name="submission_id" value={props.submissionId} />
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.errors?.form && <Alert tone="danger">{state.errors.form}</Alert>}
      {state.saved && (
        <Alert tone="success">
          {state.saved.status === "returned" ? "Returned to the learner with your feedback." : "Grade saved. The learner can see it now."}
        </Alert>
      )}
      {returned && !state.saved && (
        <Alert tone="info">This work is back with the learner. You can still grade it as it stands.</Alert>
      )}

      <TextField
        id="final_score"
        label="Final score (0 to 100)"
        type="number"
        inputMode="numeric"
        min={0}
        max={100}
        step={1}
        value={score}
        onChange={(e) => setScore(e.target.value)}
        hint={`A week passes at ${props.passScore}.`}
        error={state.errors?.final_score}
        className="min-h-11 w-full max-w-40 rounded-md border border-line-strong bg-surface px-3 text-base text-content aria-invalid:border-danger-fg"
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor={feedbackId} className="text-sm font-semibold text-content">
          Feedback for the learner
        </label>
        <textarea
          id={feedbackId}
          name="mentor_feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          maxLength={MAX_MENTOR_FEEDBACK_CHARS}
          aria-invalid={state.errors?.mentor_feedback ? true : undefined}
          aria-describedby={state.errors?.mentor_feedback ? `${feedbackId}-error` : `${feedbackId}-hint`}
          className="min-h-36 w-full rounded-md border border-line-strong bg-surface px-3 py-2.5 text-base text-content aria-invalid:border-danger-fg"
        />
        {state.errors?.mentor_feedback ? (
          <p id={`${feedbackId}-error`} className="text-sm text-danger-fg">
            {state.errors.mentor_feedback}
          </p>
        ) : (
          <p id={`${feedbackId}-hint`} className="text-sm text-content-3">
            What works, and one clear next step. Required when you return work.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" name="intent" value="grade" disabled={pending}>
          {pending ? "Saving…" : "Save grade"}
        </Button>
        <Button type="submit" name="intent" value="return" variant="secondary" disabled={pending}>
          Return for changes
        </Button>
      </div>
    </form>
  );
}
