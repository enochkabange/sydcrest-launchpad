"use client";

import { useActionState, useId } from "react";
import { importBadge, type ImportState } from "@/app/(app)/profile/credentials-actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";

/**
 * Import an Open Badge from its link or its baked image (PNG or SVG). The
 * server fetches and checks it with the issuer; the result says plainly
 * whether it now reads "Verified by the issuer" or "Added by you", and why.
 */
export function ImportBadgeForm() {
  const [state, action, pending] = useActionState<ImportState, FormData>(importBadge, {});
  const ids = useId();

  return (
    <form action={action} className="flex flex-col gap-4" aria-busy={pending || undefined}>
      {state.error && <Alert tone="danger">{state.error}</Alert>}
      {state.done && (
        <Alert tone={state.done.verified ? "success" : "info"}>
          {state.done.title} is in your wallet, private for now. {state.done.note}
        </Alert>
      )}
      <TextField
        id={`${ids}-url`}
        name="badge_url"
        type="url"
        inputMode="url"
        label="Badge link"
        hint="The https link to the badge's Open Badges data, from Credly, Badgr, Canvas Credentials or the issuer."
      />
      <p className="text-sm text-content-2">Or upload the badge image you downloaded. Badges carry their data inside the image.</p>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${ids}-file`} className="text-sm font-semibold text-content">
          Badge image (PNG or SVG)
        </label>
        <input
          id={`${ids}-file`}
          name="badge_file"
          type="file"
          accept="image/png,image/svg+xml"
          aria-describedby={`${ids}-file-hint`}
          className="min-h-11 text-sm text-content file:mr-3 file:min-h-11 file:rounded-md file:border file:border-line-strong file:bg-surface file:px-4 file:font-semibold file:text-content"
        />
        <p id={`${ids}-file-hint`} className="text-sm text-content-3">
          Up to 900 KB.
        </p>
      </div>
      <Button type="submit" variant="secondary" disabled={pending} className="self-start">
        {pending ? "Checking with the issuer…" : "Import badge"}
      </Button>
    </form>
  );
}
