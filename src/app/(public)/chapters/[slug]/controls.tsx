"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";
import { TextAreaField } from "@/app/(admin)/admin/roadmaps/fields";
import { SUMMARY_MAX } from "@/lib/chapters/model";
import { joinChapter, leaveChapter, removeMember, saveChapterDetails, type ActionState } from "./actions";

/** Join or leave. The page re-renders after either, so the button flips. */
export function MembershipButton({
  chapterId,
  slug,
  member,
  name,
}: {
  chapterId: string;
  slug: string;
  member: boolean;
  name: string;
}) {
  const [state, action, pending] = useActionState<ActionState>(
    () => (member ? leaveChapter(chapterId, slug) : joinChapter(chapterId)),
    {},
  );
  return (
    <form action={action} className="flex flex-col gap-2">
      {state.error && <Alert tone="danger">{state.error}</Alert>}
      <Button type="submit" variant={member ? "secondary" : "primary"} disabled={pending} className="self-start">
        {pending ? (member ? "Leaving…" : "Joining…") : member ? "Leave chapter" : `Join ${name}`}
      </Button>
    </form>
  );
}

/** For leads, beside each member (never beside a lead). */
export function RemoveMemberButton({ chapterId, profileId, name }: { chapterId: string; profileId: string; name: string }) {
  const [state, action, pending] = useActionState<ActionState>(() => removeMember(chapterId, profileId), {});
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(`Remove ${name} from the chapter? They can join again later.`)) e.preventDefault();
      }}
      className="flex shrink-0 flex-col items-end gap-1"
    >
      <Button type="submit" variant="ghost" disabled={pending} aria-label={`Remove ${name}`}>
        {pending ? "Removing…" : "Remove"}
      </Button>
      {state.error && (
        <p role="alert" className="text-sm text-danger-fg">
          {state.error}
        </p>
      )}
    </form>
  );
}

/** The part of the chapter page its leads own. */
export function ChapterDetailsForm({
  chapterId,
  slug,
  summary,
  whatsappUrl,
}: {
  chapterId: string;
  slug: string;
  summary: string | null;
  whatsappUrl: string | null;
}) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveChapterDetails.bind(null, chapterId, slug), {});
  const e = state.errors ?? {};
  return (
    <form action={action} className="flex flex-col gap-4" noValidate>
      {state.error && <Alert tone="danger">{state.error}</Alert>}
      {state.saved && <Alert tone="success">Saved. The chapter page is updated.</Alert>}
      <TextAreaField
        id="summary"
        label="Summary"
        hint="What the chapter does, where it meets and who it is for."
        defaultValue={state.values?.summary ?? summary ?? ""}
        error={e.summary}
        maxLength={SUMMARY_MAX}
        rows={5}
      />
      <TextField
        id="whatsapp_url"
        label="WhatsApp group link"
        hint="The invite link from the group's settings. Anyone who opens the chapter page can see it."
        type="url"
        inputMode="url"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        placeholder="https://chat.whatsapp.com/…"
        defaultValue={state.values?.whatsapp_url ?? whatsappUrl ?? ""}
        error={e.whatsapp_url}
      />
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving…" : "Save chapter page"}
      </Button>
    </form>
  );
}
