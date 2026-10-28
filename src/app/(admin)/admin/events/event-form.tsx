"use client";

import { startTransition, useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/field";
import { EVENT_FORMATS, EVENT_KINDS, EVENT_STATUSES } from "@/lib/events/labels";
import { toDateTimeInput } from "@/lib/events/time";
import { REGIONS } from "@/lib/regions";
import { createEvent, updateEvent, type FormState } from "./actions";

export type EditableEvent = {
  id: string;
  slug: string;
  kind: string;
  title: string;
  summary: string | null;
  description: string | null;
  format: string;
  starts_at: string;
  ends_at: string;
  venue_name: string | null;
  venue_address: string | null;
  city: string | null;
  region: string | null;
  chapter_id: string | null;
  capacity: number | null;
  status: string;
};

/** Create an event (no `event`) or edit one. Times are Ghana time (GMT). */
export function EventForm({ event, chapters }: { event?: EditableEvent; chapters: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(event ? updateEvent : createEvent, {});
  const e = state.errors ?? {};

  return (
    <form
      // Submitted by hand so React does not reset the fields after an error.
      onSubmit={(ev) => {
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);
        startTransition(() => action(data));
      }}
      className="flex flex-col gap-4"
      noValidate
    >
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && <Alert tone="success">Saved.</Alert>}
      {Object.keys(e).length > 0 && <Alert tone="danger">Check the highlighted fields.</Alert>}
      {event && <input type="hidden" name="id" value={event.id} />}
      <TextField id="title" label="Title" defaultValue={event?.title} error={e.title} required maxLength={120} />
      <TextField
        id="slug"
        label="Slug"
        hint={event ? "Used in the event's address. Changing it breaks shared links." : "Used in the address. Leave empty to make one from the title."}
        defaultValue={event?.slug}
        error={e.slug}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField id="kind" label="Type" defaultValue={event?.kind ?? ""} error={e.kind}>
          <option value="" disabled>
            Choose a type
          </option>
          {EVENT_KINDS.map((k) => (
            <option key={k.value} value={k.value}>
              {k.label}
            </option>
          ))}
        </SelectField>
        <SelectField id="format" label="How people attend" defaultValue={event?.format ?? ""} error={e.format}>
          <option value="" disabled>
            Choose a format
          </option>
          {EVENT_FORMATS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </SelectField>
        <TextField id="starts_at" label="Starts (Ghana time)" type="datetime-local" defaultValue={toDateTimeInput(event?.starts_at)} error={e.starts_at} />
        <TextField id="ends_at" label="Ends (Ghana time)" type="datetime-local" defaultValue={toDateTimeInput(event?.ends_at)} error={e.ends_at} />
      </div>
      <TextAreaField
        id="summary"
        label="Summary"
        hint="One or two sentences for lists, search results and share cards."
        defaultValue={event?.summary ?? ""}
        error={e.summary}
        maxLength={500}
      />
      <TextAreaField
        id="description"
        label="Description"
        hint="The programme and what to bring. Leave a blank line between paragraphs."
        defaultValue={event?.description ?? ""}
        error={e.description}
        maxLength={8000}
        rows={8}
      />
      <fieldset className="flex flex-col gap-4 rounded-lg border border-line p-4">
        <legend className="px-1 text-sm font-semibold text-content">Venue (in person and hybrid events)</legend>
        <TextField id="venue_name" label="Venue name" defaultValue={event?.venue_name ?? ""} error={e.venue_name} maxLength={120} />
        <TextField id="venue_address" label="Address or directions" defaultValue={event?.venue_address ?? ""} error={e.venue_address} maxLength={300} />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField id="city" label="City" defaultValue={event?.city ?? ""} error={e.city} maxLength={80} />
          <SelectField id="region" label="Region" defaultValue={event?.region ?? ""} error={e.region}>
            <option value="">No region</option>
            {REGIONS.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.label}
              </option>
            ))}
          </SelectField>
        </div>
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-3">
        <SelectField id="chapter_id" label="Chapter" defaultValue={event?.chapter_id ?? ""} error={e.chapter_id}>
          <option value="">No chapter</option>
          {chapters.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </SelectField>
        <TextField
          id="capacity"
          label="Seats"
          hint="Empty for no limit."
          type="number"
          inputMode="numeric"
          min={1}
          defaultValue={event?.capacity ?? ""}
          error={e.capacity}
        />
        <SelectField id="status" label="Status" defaultValue={event?.status ?? "draft"} error={e.status}>
          {EVENT_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </SelectField>
      </div>
      <p className="text-sm text-content-2">
        Drafts are only visible to hosts. Changing the time, venue or status of a published event tells everyone going or on the waitlist.
      </p>
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving…" : event ? "Save event" : "Create event"}
      </Button>
    </form>
  );
}
