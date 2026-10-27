"use client";

import { useActionState, useEffect, useRef } from "react";
import { createPost, createReply, type FormState } from "@/lib/community/actions";
import { POST_MAX, REPLY_MAX } from "@/lib/community/model";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const TEXTAREA =
  "min-h-28 w-full rounded-md border border-line-strong bg-surface px-3 py-2.5 text-base text-content placeholder:text-content-3 aria-invalid:border-danger-fg";
const INPUT =
  "min-h-11 w-full rounded-md border border-line-strong bg-surface px-3 text-base text-content placeholder:text-content-3";

const FORMAT_HINT = "Plain text. **bold**, *italic*, `code`, lists and [links](https://example.com) work.";

/** Clears the form after a successful send. */
function useResetOnSuccess(state: FormState) {
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.ok) ref.current?.reset();
  }, [state]);
  return ref;
}

/** Write a post in one feed. The server re checks membership and the hourly limit. */
export function PostComposer({ scope, scopeId, groupLabel }: { scope: string; scopeId: string | null; groupLabel: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(createPost.bind(null, scope, scopeId), {});
  const ref = useResetOnSuccess(state);
  const id = `compose-${scope}-${scopeId ?? "all"}`;
  return (
    <form ref={ref} action={action} aria-labelledby={`${id}-heading`} className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 xl:p-5">
      <h2 id={`${id}-heading`} className="text-h3 text-content">
        Post to {groupLabel}
      </h2>
      {state.error && <Alert tone="danger">{state.error}</Alert>}
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-body`} className="sr-only">
          Your post
        </label>
        <textarea
          id={`${id}-body`}
          name="body"
          required
          maxLength={POST_MAX}
          placeholder="Share a win, ask a question or post something useful"
          aria-describedby={`${id}-hint`}
          aria-invalid={state.error ? true : undefined}
          className={TEXTAREA}
        />
        <p id={`${id}-hint`} className="text-sm text-content-3">
          {FORMAT_HINT}
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor={`${id}-link`} className="text-sm font-semibold text-content">
            Link (optional)
          </label>
          <input id={`${id}-link`} name="link" type="url" inputMode="url" placeholder="https://" className={INPUT} />
        </div>
        <Button type="submit" disabled={pending} className="sm:self-end">
          {pending ? "Posting…" : "Post"}
        </Button>
      </div>
      {state.ok && <p className="sr-only" role="status">Posted.</p>}
    </form>
  );
}

export function ReplyComposer({ postId }: { postId: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(createReply.bind(null, postId), {});
  const ref = useResetOnSuccess(state);
  return (
    <form ref={ref} action={action} className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4">
      {state.error && <Alert tone="danger">{state.error}</Alert>}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="reply-body" className="text-sm font-semibold text-content">
          Your reply
        </label>
        <textarea
          id="reply-body"
          name="body"
          required
          maxLength={REPLY_MAX}
          aria-describedby="reply-hint"
          aria-invalid={state.error ? true : undefined}
          className={TEXTAREA}
        />
        <p id="reply-hint" className="text-sm text-content-3">
          {FORMAT_HINT}
        </p>
      </div>
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Sending…" : "Reply"}
      </Button>
      {state.ok && <p className="sr-only" role="status">Reply sent.</p>}
    </form>
  );
}
