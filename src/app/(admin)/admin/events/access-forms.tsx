"use client";

import { startTransition, useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckboxField, TextField } from "@/components/ui/field";
import { TextAreaField } from "../roadmaps/fields";
import { addRecording, setJoinLink, type FormState } from "./actions";

/** The online joining link. Only people going (and hosts) ever see it. */
export function JoinLinkForm({ eventId, format, joinUrl }: { eventId: string; format: string; joinUrl: string | null }) {
  const [state, action, pending] = useActionState<FormState, FormData>(setJoinLink, {});
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);
        startTransition(() => action(data));
      }}
      className="flex flex-col gap-3"
      noValidate
    >
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && <Alert tone="success">Link saved.</Alert>}
      <input type="hidden" name="event_id" value={eventId} />
      <input type="hidden" name="format" value={format} />
      <TextField
        id="join_url"
        label="Joining link"
        type="url"
        inputMode="url"
        placeholder="https://"
        hint="Shown only to people going. Leave empty to remove it."
        defaultValue={joinUrl ?? ""}
        error={state.errors?.join_url}
      />
      <Button type="submit" variant="secondary" disabled={pending} className="self-start">
        {pending ? "Saving…" : "Save link"}
      </Button>
    </form>
  );
}

/** Add a recording; it stays hidden until published. */
export function RecordingForm({ eventId, slug }: { eventId: string; slug: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(addRecording, {});
  const e = state.errors ?? {};
  return (
    <form
      key={state.saved ?? 0}
      onSubmit={(ev) => {
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);
        startTransition(() => action(data));
      }}
      className="flex flex-col gap-3"
      noValidate
    >
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && <Alert tone="success">Recording added.</Alert>}
      <input type="hidden" name="event_id" value={eventId} />
      <input type="hidden" name="slug" value={slug} />
      <TextField id="rec_title" name="title" label="Title" error={e.title} maxLength={160} />
      <TextField id="video_url" label="Video link" type="url" inputMode="url" placeholder="https://" error={e.video_url} />
      <TextField id="duration_minutes" label="Length in minutes" type="number" inputMode="numeric" min={1} error={e.duration_minutes} />
      <TextAreaField id="rec_summary" name="summary" label="Summary" error={e.summary} maxLength={2000} />
      <CheckboxField id="is_published">Publish now (shows in the recordings library)</CheckboxField>
      <Button type="submit" variant="secondary" disabled={pending} className="self-start">
        {pending ? "Adding…" : "Add recording"}
      </Button>
    </form>
  );
}
