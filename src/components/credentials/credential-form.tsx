"use client";

import { Paperclip, X } from "lucide-react";
import { useActionState, useId, useState, type ChangeEvent } from "react";
import { saveCredential, type SaveCredentialState } from "@/app/(app)/profile/credentials-actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";
import { createClient } from "@/lib/supabase/client";
import { CREDENTIALS_BUCKET, credentialFilePath, FILE_TYPES, MAX_FILE_BYTES } from "@/lib/credentials/model";

export type CredentialFormValues = {
  title: string;
  issuer_name: string;
  issued_on: string;
  expires_on: string;
  credential_id: string;
  verification_url: string;
  visibility: "private" | "public";
  file_path: string | null;
};

const EMPTY: CredentialFormValues = {
  title: "",
  issuer_name: "",
  issued_on: "",
  expires_on: "",
  credential_id: "",
  verification_url: "",
  visibility: "private",
  file_path: null,
};

/**
 * Add a certificate by hand, or edit one. An optional PDF or image goes
 * straight from the browser to the private bucket in the learner's own
 * folder (the bucket checks type, size and a daily limit), then the path is
 * sent with the form. Private unless the learner ticks "Show on my public
 * wallet".
 */
export function CredentialForm({
  profileId,
  credentialId = null,
  initial,
  onDone,
  submitLabel = "Add certificate",
}: {
  profileId: string;
  credentialId?: string | null;
  initial?: Partial<CredentialFormValues>;
  onDone?: () => void;
  submitLabel?: string;
}) {
  // Controlled, so a refused save never wipes what the learner typed.
  const [values, setValues] = useState<CredentialFormValues>({ ...EMPTY, ...initial });
  const [removeFile, setRemoveFile] = useState(false);
  const [newFile, setNewFile] = useState<{ path: string; name: string } | null>(null);
  const [state, action, pending] = useActionState<SaveCredentialState, FormData>(async (prev, form) => {
    const next = await saveCredential(credentialId, prev, form);
    if (next.done) {
      if (!credentialId) {
        setValues(EMPTY);
        setNewFile(null);
      }
      onDone?.();
    }
    return next;
  }, {});
  const [upload, setUpload] = useState<{ busy: boolean; error?: string }>({ busy: false });
  const ids = useId();
  const id = (name: string) => `${ids}-${name}`;
  const errors = state.errors ?? {};

  const set = (key: keyof CredentialFormValues) => (e: ChangeEvent<HTMLInputElement>) => setValues((v) => ({ ...v, [key]: e.target.value }));

  async function onFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const path = credentialFilePath(profileId, file.type, crypto.randomUUID());
    if (!path) {
      setUpload({ busy: false, error: "Choose a PDF, PNG, JPEG or WebP file." });
      event.target.value = "";
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setUpload({ busy: false, error: "That file is over 5 MB. Choose a smaller one." });
      event.target.value = "";
      return;
    }
    setUpload({ busy: true });
    const { error } = await createClient().storage.from(CREDENTIALS_BUCKET).upload(path, file, { contentType: file.type, upsert: false });
    event.target.value = "";
    if (error) {
      setUpload({ busy: false, error: "That upload did not finish. Check your connection and try again, or wait if you have added many files today." });
      return;
    }
    setNewFile({ path, name: file.name });
    setUpload({ busy: false });
  }

  const hasExisting = !!values.file_path && !removeFile && !newFile;

  return (
    <form action={action} className="flex flex-col gap-4" noValidate aria-busy={pending || upload.busy || undefined}>
      {errors.form && <Alert tone="danger">{errors.form}</Alert>}
      {state.done && !credentialId && <Alert tone="success">Saved to your wallet.</Alert>}
      <TextField id={id("title")} name="title" label="Certificate name" required maxLength={200} value={values.title} onChange={set("title")} error={errors.title} />
      <TextField
        id={id("issuer")}
        name="issuer_name"
        label="Issued by"
        hint="The organisation that awarded it, such as Google, Cisco or your university."
        required
        maxLength={200}
        value={values.issuer_name}
        onChange={set("issuer_name")}
        error={errors.issuer_name}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id={id("issued")} name="issued_on" type="date" label="Issue date (optional)" value={values.issued_on} onChange={set("issued_on")} error={errors.issued_on} />
        <TextField
          id={id("expires")}
          name="expires_on"
          type="date"
          label="Expiry date (optional)"
          value={values.expires_on}
          onChange={set("expires_on")}
          error={errors.expires_on}
        />
      </div>
      <TextField
        id={id("credential-id")}
        name="credential_id"
        label="Credential ID (optional)"
        maxLength={200}
        value={values.credential_id}
        onChange={set("credential_id")}
        error={errors.credential_id}
      />
      <TextField
        id={id("url")}
        name="verification_url"
        type="url"
        inputMode="url"
        label="Issuer's verification link (optional)"
        hint="The https link where the issuer shows this certificate, so anyone can check it with them."
        value={values.verification_url}
        onChange={set("verification_url")}
        error={errors.verification_url}
      />

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-content" id={id("file-label")}>
          Certificate file (optional)
        </span>
        <p className="text-sm text-content-3" id={id("file-hint")}>
          A PDF or an image (PNG, JPEG or WebP), up to 5 MB. It stays private unless the certificate is public.
        </p>
        {newFile ? (
          <p className="flex items-center gap-2 text-sm text-content">
            <Paperclip aria-hidden="true" className="size-4" /> {newFile.name}
            <Button type="button" variant="ghost" onClick={() => setNewFile(null)} aria-label={`Remove ${newFile.name}`}>
              <X aria-hidden="true" className="size-4" />
            </Button>
          </p>
        ) : hasExisting ? (
          <p className="flex items-center gap-2 text-sm text-content">
            <Paperclip aria-hidden="true" className="size-4" /> A file is attached
            <Button type="button" variant="ghost" onClick={() => setRemoveFile(true)}>
              Remove file
            </Button>
          </p>
        ) : null}
        <label
          htmlFor={id("file")}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 self-start rounded-md border border-line-strong px-4 text-sm font-semibold text-content hover:bg-surface-sunken focus-within:outline-2 focus-within:outline-offset-2"
        >
          <Paperclip aria-hidden="true" className="size-4" />
          {upload.busy ? "Uploading…" : newFile || hasExisting ? "Replace the file" : "Choose a file"}
          <input
            id={id("file")}
            type="file"
            accept={Object.keys(FILE_TYPES).join(",")}
            className="sr-only"
            aria-describedby={upload.error ? id("file-error") : id("file-hint")}
            disabled={upload.busy}
            onChange={onFile}
          />
        </label>
        {(upload.error || errors.file_path) && (
          <p id={id("file-error")} className="text-sm text-danger-fg">
            {upload.error ?? errors.file_path}
          </p>
        )}
        <input type="hidden" name="file_path" value={newFile?.path ?? ""} />
        <input type="hidden" name="remove_file" value={removeFile && !newFile ? "1" : ""} />
      </div>

      <label htmlFor={id("public")} className="flex min-h-11 items-start gap-3 py-1 text-sm text-content">
        <input
          id={id("public")}
          type="checkbox"
          name="visibility"
          value="public"
          checked={values.visibility === "public"}
          onChange={(e) => setValues((v) => ({ ...v, visibility: e.target.checked ? "public" : "private" }))}
          className="mt-0.5 size-5 shrink-0 accent-line-selected"
        />
        <span>
          Show on my public wallet
          <span className="block text-content-3">Shown only while your profile is public. Organisations in the talent directory see it too.</span>
        </span>
      </label>

      <Button type="submit" disabled={pending || upload.busy} className="self-start">
        {pending ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
