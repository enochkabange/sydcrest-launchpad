"use client";

import { Paperclip, X } from "lucide-react";
import { useActionState, useId, useState, type ChangeEvent } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";
import { createClient } from "@/lib/supabase/client";
import { FILE_ACCEPT, MAX_BODY_CHARS, SUBMISSIONS_BUCKET } from "@/lib/submissions/config";
import { displayFileName, fileProblem, submissionObjectPath } from "@/lib/submissions/files";
import { canSaveDraft, isSent, type SubmissionStatus } from "@/lib/submissions/status";
import { saveSubmission, type SubmissionFormState } from "./actions";

export type SubmissionFormProps = {
  weekId: string;
  profileId: string;
  status: SubmissionStatus | null;
  bodyText: string | null;
  linkUrl: string | null;
  filePath: string | null;
};

const TEXTAREA =
  "min-h-48 w-full rounded-md border border-line-strong bg-surface px-3 py-2.5 text-base text-content placeholder:text-content-3 aria-invalid:border-danger-fg lg:min-h-64";

/**
 * Text, a link or a file (or any mix) for one week. Files go straight from
 * the browser to the private bucket under the learner's own folder, then the
 * path is sent with the form. Sending again after a review is a resubmission
 * (a new attempt); graded work is not editable here.
 */
export function SubmissionForm(props: SubmissionFormProps) {
  const { weekId, profileId, status } = props;
  const [state, action, pending] = useActionState<SubmissionFormState, FormData>(saveSubmission, {});
  const [filePath, setFilePath] = useState<string | null>(props.filePath);
  const [upload, setUpload] = useState<{ busy: boolean; error?: string }>({ busy: false });
  // Controlled, so a failed save never wipes what the learner typed (React resets forms after an action).
  const [body, setBody] = useState(props.bodyText ?? "");
  const [link, setLink] = useState(props.linkUrl ?? "");
  const ids = useId();
  const bodyId = `${ids}-body`;
  const fileId = `${ids}-file`;

  const sent = isSent(status);
  const draftAllowed = canSaveDraft(status);
  const submitLabel = sent || status === "returned" ? "Submit again" : "Submit work";

  async function onFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const problem = fileProblem(file);
    if (problem) {
      setUpload({ busy: false, error: problem });
      event.target.value = "";
      return;
    }
    setUpload({ busy: true });
    const path = submissionObjectPath(profileId, weekId, file.name);
    const { error } = await createClient()
      .storage.from(SUBMISSIONS_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });
    event.target.value = "";
    if (error) {
      setUpload({ busy: false, error: "That upload didn't finish. Check your connection and try again." });
      return;
    }
    setFilePath(path);
    setUpload({ busy: false });
  }

  return (
    <form action={action} className="flex flex-col gap-5" noValidate aria-busy={pending || upload.busy || undefined}>
      <input type="hidden" name="week_id" value={weekId} />
      <input type="hidden" name="file_path" value={filePath ?? ""} />

      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.errors?.form && <Alert tone="danger">{state.errors.form}</Alert>}
      {state.saved && (
        <Alert tone="success">
          {state.saved.status === "draft" || state.saved.status === "returned"
            ? "Draft saved. Submit it when you are ready."
            : "Submitted. Your mentor can see it now."}
        </Alert>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor={bodyId} className="text-sm font-semibold text-content">
          Your answer
        </label>
        <textarea
          id={bodyId}
          name="body_text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={MAX_BODY_CHARS}
          aria-invalid={state.errors?.body_text ? true : undefined}
          aria-describedby={state.errors?.body_text ? `${bodyId}-error` : `${bodyId}-hint`}
          className={TEXTAREA}
        />
        {state.errors?.body_text ? (
          <p id={`${bodyId}-error`} className="text-sm text-danger-fg">
            {state.errors.body_text}
          </p>
        ) : (
          <p id={`${bodyId}-hint`} className="text-sm text-content-3">
            Write your answer here, or add a link or a file below. Written answers also get quick AI feedback.
          </p>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <TextField
          id="link_url"
          label="Link (optional)"
          type="url"
          inputMode="url"
          placeholder="https://"
          hint="A shared document, design, site or video. Check that anyone with the link can view it."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          error={state.errors?.link_url}
        />

        <div className="flex flex-col gap-1.5">
          <span id={`${fileId}-label`} className="text-sm font-semibold text-content">
            File (optional)
          </span>
          {filePath ? (
            <div className="flex min-h-11 items-center justify-between gap-2 rounded-md border border-line bg-surface-sunken px-3">
              <span className="flex min-w-0 items-center gap-2 text-sm text-content">
                <Paperclip aria-hidden className="size-4 shrink-0 text-content-3" />
                <span className="truncate">{displayFileName(filePath)}</span>
              </span>
              <Button
                variant="ghost"
                className="-mr-3 shrink-0"
                aria-label={`Remove ${displayFileName(filePath)}`}
                onClick={() => setFilePath(null)}
              >
                <X aria-hidden className="size-4" />
                Remove
              </Button>
            </div>
          ) : (
            <label
              htmlFor={fileId}
              className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-dashed border-line-strong bg-surface px-3 text-sm font-semibold text-content transition-colors hover:bg-surface-sunken focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-600"
            >
              <Paperclip aria-hidden className="size-4 text-content-3" />
              {upload.busy ? "Uploading…" : "Choose a file"}
              <input
                id={fileId}
                type="file"
                accept={FILE_ACCEPT}
                className="sr-only"
                aria-labelledby={`${fileId}-label`}
                aria-describedby={upload.error ? `${fileId}-error` : `${fileId}-hint`}
                disabled={upload.busy}
                onChange={onFile}
              />
            </label>
          )}
          {upload.error || state.errors?.file_path ? (
            <p id={`${fileId}-error`} className="text-sm text-danger-fg" role="alert">
              {upload.error ?? state.errors?.file_path}
            </p>
          ) : (
            <p id={`${fileId}-hint`} className="text-sm text-content-3">
              PDF, image, short video, text, Word, PowerPoint or Excel, up to 50 MB.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" name="intent" value="submit" disabled={pending || upload.busy}>
          {pending ? "Saving…" : submitLabel}
        </Button>
        {draftAllowed && (
          <Button type="submit" name="intent" value="draft" variant="secondary" disabled={pending || upload.busy}>
            Save draft
          </Button>
        )}
        {sent && (
          <p className="text-sm text-content-3">
            Submitting again replaces this version and starts a fresh review.
          </p>
        )}
      </div>
    </form>
  );
}
