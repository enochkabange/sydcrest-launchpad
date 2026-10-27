"use client";

import { useActionState, useState, useTransition } from "react";
import { deleteContent, moderateContent, pinPost, reportContent, type FormState } from "@/lib/community/actions";
import { HIDE_REASON_MAX, REPORT_DETAILS_MAX } from "@/lib/community/model";
import { REPORT_REASONS } from "@/lib/social/public-profile";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/field";

const SUMMARY =
  "inline-flex min-h-11 cursor-pointer list-none items-center rounded-md px-3 text-sm font-semibold text-content-2 hover:bg-surface-sunken hover:text-content [&::-webkit-details-marker]:hidden";
const PANEL = "mt-2 flex w-full max-w-md flex-col gap-3 rounded-lg border border-line bg-surface p-4";
const TEXTAREA = "min-h-24 w-full rounded-md border border-line-strong bg-surface px-3 py-2.5 text-base text-content";

type Target = "post" | "reply";
const noun = (t: Target) => (t === "post" ? "post" : "reply");

/** Report a post or reply to the moderators of its group. */
export function ReportContent({ target, id }: { target: Target; id: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(reportContent.bind(null, target, id), {});
  if (state.ok) return <Alert tone="success">Thanks. The moderators of this group will review it.</Alert>;
  const field = `${target}-${id}`;
  return (
    <details className="text-sm">
      <summary className={SUMMARY}>Report</summary>
      <form action={action} className={PANEL}>
        {state.error && <Alert tone="danger">{state.error}</Alert>}
        <SelectField id={`reason-${field}`} name="reason" label="Reason" defaultValue="" required>
          <option value="" disabled>
            Choose a reason
          </option>
          {REPORT_REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </SelectField>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`details-${field}`} className="text-sm font-semibold text-content">
            Details (optional)
          </label>
          <textarea id={`details-${field}`} name="details" maxLength={REPORT_DETAILS_MAX} className={TEXTAREA} />
        </div>
        <Button type="submit" variant="secondary" disabled={pending} className="self-start">
          {pending ? "Sending…" : `Report this ${noun(target)}`}
        </Button>
      </form>
    </details>
  );
}

/** Hide with a reason, or unhide. Moderators of the group only (the server checks). */
export function HideContent({ target, id, hidden }: { target: Target; id: string; hidden: boolean }) {
  const [state, action, pending] = useActionState<FormState, FormData>(moderateContent.bind(null, target, id, !hidden), {});
  if (hidden) {
    return (
      <form action={action}>
        {state.error && <Alert tone="danger">{state.error}</Alert>}
        <Button type="submit" variant="ghost" disabled={pending}>
          {pending ? "Showing…" : `Show this ${noun(target)} again`}
        </Button>
      </form>
    );
  }
  const field = `hide-${target}-${id}`;
  return (
    <details className="text-sm">
      <summary className={SUMMARY}>Hide</summary>
      <form action={action} className={PANEL}>
        {state.error && <Alert tone="danger">{state.error}</Alert>}
        <div className="flex flex-col gap-1.5">
          <label htmlFor={field} className="text-sm font-semibold text-content">
            Why are you hiding it?
          </label>
          <textarea id={field} name="reason" required maxLength={HIDE_REASON_MAX} className={TEXTAREA} />
          <p className="text-sm text-content-3">Moderators see this reason. The {noun(target)} stays visible to its author.</p>
        </div>
        <Button type="submit" variant="secondary" disabled={pending} className="self-start">
          {pending ? "Hiding…" : `Hide this ${noun(target)}`}
        </Button>
      </form>
    </details>
  );
}

function useSimpleAction() {
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return {
    error,
    pending,
    run: (fn: () => Promise<{ error?: string }>) =>
      start(async () => {
        setError(null);
        const res = await fn();
        if (res.error) setError(res.error);
      }),
  };
}

export function PinPost({ id, pinned }: { id: string; pinned: boolean }) {
  const { error, pending, run } = useSimpleAction();
  return (
    <>
      <Button variant="ghost" disabled={pending} onClick={() => run(() => pinPost(id, !pinned))}>
        {pinned ? "Unpin" : "Pin to top"}
      </Button>
      {error && (
        <p role="alert" className="basis-full text-sm text-danger-fg">
          {error}
        </p>
      )}
    </>
  );
}

/** Delete with a confirm step, for the author (and moderators). */
export function DeleteContent({ target, id }: { target: Target; id: string }) {
  const { error, pending, run } = useSimpleAction();
  const [confirming, setConfirming] = useState(false);
  if (!confirming) {
    return (
      <Button variant="ghost" onClick={() => setConfirming(true)}>
        Delete
      </Button>
    );
  }
  return (
    <span className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-content-2">Delete this {noun(target)} for good?</span>
      <Button variant="secondary" disabled={pending} onClick={() => run(() => deleteContent(target, id))}>
        {pending ? "Deleting…" : "Yes, delete"}
      </Button>
      <Button variant="ghost" onClick={() => setConfirming(false)}>
        Keep it
      </Button>
      {error && (
        <span role="alert" className="text-sm text-danger-fg">
          {error}
        </span>
      )}
    </span>
  );
}
