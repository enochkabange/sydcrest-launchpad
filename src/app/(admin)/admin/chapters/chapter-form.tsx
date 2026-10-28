"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextField } from "@/components/ui/field";
import { CHAPTER_STATUSES, STATUS_COPY, SUMMARY_MAX } from "@/lib/chapters/model";
import { REGIONS } from "@/lib/regions";
import { TextAreaField } from "../roadmaps/fields";
import { appointLeadBySlug, createChapter, updateChapter, type FormState } from "./actions";

export type ChapterFields = {
  id?: string;
  slug: string;
  name: string;
  region: string;
  city: string;
  status: string;
  summary: string | null;
  whatsapp_url: string | null;
};

/** Create a chapter (no `id`) or edit one. */
export function ChapterForm({ chapter }: { chapter: ChapterFields }) {
  const editing = Boolean(chapter.id);
  const [state, action, pending] = useActionState<FormState, FormData>(editing ? updateChapter : createChapter, {});
  const e = state.errors ?? {};
  // After an error, the fields keep what was sent; after a save, what is stored.
  const v = { ...chapter, ...state.values };
  return (
    <form action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && <Alert tone="success">Saved.</Alert>}
      {chapter.id && <input type="hidden" name="id" value={chapter.id} />}
      <TextField id="name" label="Name" defaultValue={v.name} error={e.name} required maxLength={80} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="city" label="City" defaultValue={v.city} error={e.city} required maxLength={80} />
        <SelectField id="region" label="Region" defaultValue={v.region} error={e.region} required>
          <option value="">Choose a region</option>
          {REGIONS.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.label}
            </option>
          ))}
        </SelectField>
      </div>
      <TextField
        id="slug"
        label="Slug"
        hint={editing ? "Used in the chapter's address. Changing it breaks shared links." : "Used in the address. Leave empty to make one from the city."}
        defaultValue={v.slug}
        error={e.slug}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />
      <SelectField
        id="status"
        label="Status"
        hint="Draft is only visible to admins. Chapters that are Being set up or Active take new members."
        defaultValue={v.status}
        error={e.status}
      >
        {CHAPTER_STATUSES.map((s) => (
          <option key={s} value={s}>
            {STATUS_COPY[s].label}
          </option>
        ))}
      </SelectField>
      <TextAreaField
        id="summary"
        label="Summary"
        hint="Leads can edit this too."
        defaultValue={v.summary ?? ""}
        error={e.summary}
        maxLength={SUMMARY_MAX}
        rows={4}
      />
      <TextField
        id="whatsapp_url"
        label="WhatsApp group link"
        hint="Optional. A chat.whatsapp.com or wa.me invite link. Public with the chapter."
        type="url"
        inputMode="url"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        defaultValue={v.whatsapp_url ?? ""}
        error={e.whatsapp_url}
      />
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving…" : editing ? "Save chapter" : "Create chapter"}
      </Button>
    </form>
  );
}

/** Appoint someone who is not in the chapter yet, by their public profile address. */
export function AppointLeadForm({ chapterId }: { chapterId: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(appointLeadBySlug.bind(null, chapterId), {});
  return (
    <form key={state.saved ?? 0} action={action} className="flex flex-col gap-3" noValidate>
      {state.saved && state.message && <Alert tone="success">{state.message}</Alert>}
      {!state.saved && state.message && <Alert tone="danger">{state.message}</Alert>}
      <TextField
        id="profile"
        label="Public profile address"
        hint="For example /u/wumpini-abukari. Without a public profile, they join the chapter first and you make them lead from the list."
        error={state.errors?.profile}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />
      <Button type="submit" variant="secondary" disabled={pending} className="self-start">
        {pending ? "Appointing…" : "Appoint as lead"}
      </Button>
    </form>
  );
}
