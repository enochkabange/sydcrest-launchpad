"use client";

import { useActionState, useCallback, useState } from "react";
import { deleteCredential, setCredentialVisibility, type VisibilityState } from "@/app/(app)/profile/credentials-actions";
import { ShareCard } from "@/components/share/share-card";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { ExternalCredential } from "@/lib/credentials/model";
import type { ShareTarget } from "@/lib/share/card";
import { CredentialCard } from "./credential-card";
import { CredentialForm } from "./credential-form";
import { ShareCredentialExtras } from "./share-credential";

/**
 * One of the learner's own external credentials on /profile#credentials:
 * the card as others see it, who can see it, edit, delete and share.
 * Sharing a card or embed needs the credential and the profile to be public;
 * adding it to LinkedIn works either way (it opens the learner's own LinkedIn).
 */
export function ManageCredential({
  credential,
  profileId,
  share,
  linkedInUrl,
  embed,
  profilePublic,
}: {
  credential: ExternalCredential;
  profileId: string;
  share: ShareTarget | null;
  linkedInUrl: string;
  embed: string | null;
  profilePublic: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [state, action, pending] = useActionState<VisibilityState, FormData>(setCredentialVisibility.bind(null, credential.id), {});
  const close = useCallback(() => setEditing(false), []);
  const isPublic = credential.visibility === "public";
  const hidden = !!credential.hidden_at;

  return (
    <li className="flex flex-col gap-3">
      <CredentialCard credential={credential}>
        {credential.verification_note && <p className="text-sm text-content-3">{credential.verification_note}</p>}
        {hidden && (
          <Alert tone="info">Our team hid this credential after a report, so it stays private. Reply to our email if you think this is a mistake.</Alert>
        )}
        <div className="flex flex-col gap-3 border-t border-line pt-3">
          <p className="text-sm text-content-2">
            <span className="font-semibold text-content">{isPublic ? "Public" : "Private"}.</span>{" "}
            {isPublic
              ? profilePublic
                ? "Anyone with your wallet link can see it."
                : "It shows once your profile is public."
              : "Only you can see it."}
          </p>
          {state.error && <Alert tone="danger">{state.error}</Alert>}
          <div className="flex flex-wrap gap-2">
            {!hidden && (
              <form action={action}>
                <input type="hidden" name="visibility" value={isPublic ? "private" : "public"} />
                <Button type="submit" variant="secondary" disabled={pending}>
                  {isPublic ? "Make private" : "Make public"}
                  <span className="sr-only">: {credential.title}</span>
                </Button>
              </form>
            )}
            <Button variant="ghost" aria-expanded={editing} onClick={() => setEditing((e) => !e)}>
              {editing ? "Close" : "Edit"}
              <span className="sr-only">: {credential.title}</span>
            </Button>
            <form
              action={deleteCredential.bind(null, credential.id)}
              onSubmit={(e) => {
                if (!window.confirm(`Delete ${credential.title} from your wallet?`)) e.preventDefault();
              }}
            >
              <Button type="submit" variant="ghost">
                Delete<span className="sr-only">: {credential.title}</span>
              </Button>
            </form>
          </div>
          {credential.verification === "issuer" && editing && (
            <p className="text-sm text-content-3">Changing the name, issuer, dates, ID or link means it shows as added by you, not verified by the issuer.</p>
          )}
          {editing && (
            <div className="rounded-lg border border-line p-4">
              <CredentialForm
                profileId={profileId}
                credentialId={credential.id}
                submitLabel="Save changes"
                onDone={close}
                initial={{
                  title: credential.title,
                  issuer_name: credential.issuer_name,
                  issued_on: credential.issued_on ?? "",
                  expires_on: credential.expires_on ?? "",
                  credential_id: credential.credential_id ?? "",
                  verification_url: credential.verification_url ?? "",
                  visibility: isPublic ? "public" : "private",
                  file_path: credential.file_path,
                }}
              />
            </div>
          )}
          <ShareCredentialExtras linkedInUrl={linkedInUrl} embed={embed} title={credential.title} />
          {share && (
            <ShareCard
              {...share}
              buttonLabel="Share a card"
              note="The card shows the certificate, who issued it, its label and your name as your public profile shows it. Anyone with the link can see it."
            />
          )}
        </div>
      </CredentialCard>
    </li>
  );
}
