"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextAreaField, TextField } from "@/components/ui/field";
import { decideChapterApplication, type ChapterDecisionState } from "./actions";

/** Approve with the chapter's name and address (prefilled from the town), or decline with an optional note. */
export function ChapterDecisionForm({ applicationId, town, slug }: { applicationId: string; town: string; slug: string }) {
  const [state, action, pending] = useActionState<ChapterDecisionState, FormData>(
    decideChapterApplication.bind(null, applicationId),
    {},
  );
  return (
    <form action={action} className="flex flex-col gap-4" aria-label={`Decide on the ${town} application`}>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <input type="hidden" name="town" value={town} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id={`name-${applicationId}`} name="name" label="Chapter name" defaultValue={`${town} chapter`} />
        <TextField id={`slug-${applicationId}`} name="slug" label="Address" hint={`sydcrest.com/chapters/${slug}`} defaultValue={slug} />
      </div>
      <TextAreaField
        id={`note-${applicationId}`}
        name="note"
        label="Note to the applicant (optional)"
        hint="Sent with a decline. They can read it."
        rows={2}
        maxLength={1000}
      />
      <div className="flex flex-wrap gap-3">
        <Button type="submit" name="decision" value="approved" disabled={pending}>
          Approve and open the chapter
        </Button>
        <Button type="submit" name="decision" value="declined" variant="secondary" disabled={pending}>
          Decline
        </Button>
      </div>
    </form>
  );
}
