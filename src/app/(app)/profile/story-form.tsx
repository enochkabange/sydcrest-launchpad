"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckboxField, TextAreaField } from "@/components/ui/field";
import { saveStory, type StoryState } from "./story-actions";

export function StoryForm({ story, showName }: { story: string; showName: boolean }) {
  const [state, action, pending] = useActionState<StoryState, FormData>(saveStory, {});
  const v = state.values;
  return (
    <form action={action} className="flex flex-col gap-4" noValidate>
      {state.saved && <Alert tone="success">Saved. Sponsors of your cohort or chapter can read it.</Alert>}
      <TextAreaField
        id="story"
        label="Your story"
        hint="What you learned and what changed for you. A few sentences is plenty."
        rows={5}
        maxLength={1500}
        defaultValue={v?.story ?? story}
        error={state.error}
      />
      <CheckboxField id="show_name" defaultChecked={v?.show_name ?? showName}>
        Show my name with my story. Without this, sponsors see the story but not who wrote it.
      </CheckboxField>
      <Button type="submit" variant="secondary" disabled={pending} className="self-start">
        {pending ? "Saving…" : "Save story"}
      </Button>
    </form>
  );
}
