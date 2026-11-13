"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckboxField, TextAreaField, TextField } from "@/components/ui/field";
import { NOTE_MAX } from "@/lib/opportunities/applications";
import { applyToOpportunity, type ApplyState } from "./actions";

export function ApplyForm({
  opportunityId,
  slug,
  organisation,
  defaultPortfolio,
  canShareReadiness = false,
}: {
  opportunityId: string;
  slug: string;
  organisation: string;
  defaultPortfolio: string | null;
  /** READINESS_FOR_EMPLOYERS=on: offer the readiness sharing box (#336). */
  canShareReadiness?: boolean;
}) {
  const [state, action, pending] = useActionState<ApplyState, FormData>(applyToOpportunity.bind(null, opportunityId, slug), {});
  const v = state.values;
  return (
    <form action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <TextAreaField
        id="note"
        label="Why you are a good fit"
        hint="A few sentences: what you have done that matches the role, and when you could start."
        rows={6}
        maxLength={NOTE_MAX}
        defaultValue={v?.note}
        error={state.errors?.note}
        required
      />
      <TextField
        id="portfolio_url"
        label="Portfolio or work sample (optional)"
        type="url"
        inputMode="url"
        placeholder="https://"
        defaultValue={v?.portfolio_url ?? defaultPortfolio ?? ""}
        error={state.errors?.portfolio_url}
      />
      <CheckboxField id="contact_consent" defaultChecked={v?.contact_consent} error={state.errors?.contact_consent}>
        If {organisation} shortlists me, they can see my phone number and email to contact me.
      </CheckboxField>
      {canShareReadiness && (
      <CheckboxField id="share_readiness" defaultChecked={v?.share_readiness ?? false}>
        Share my readiness band for this role with {organisation} (optional).{" "}
        <span className="text-content-2">
          They see a band (Getting started, Building or Job ready) and the verified skills and approved portfolio pieces behind
          it, never a score. You can turn this off on My applications.
        </span>
      </CheckboxField>
      )}
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Sending…" : "Send application"}
      </Button>
    </form>
  );
}
