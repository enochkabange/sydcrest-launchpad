"use client";

import { useActionState } from "react";
import { setWhatsAppConsent, type WhatsAppState } from "./whatsapp-actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckboxField } from "@/components/ui/field";
import { WHATSAPP_CONSENT_PROMISE } from "@/lib/messaging/consent";

export function WhatsAppToggle({
  enabled,
  hasPhone,
  numberChanged = false,
  outdated = false,
}: {
  enabled: boolean;
  hasPhone: boolean;
  /** Consent was turned off because the profile number changed. */
  numberChanged?: boolean;
  /** Consent is live but for older wording, so nothing is sent until they confirm. */
  outdated?: boolean;
}) {
  const [state, action, pending] = useActionState<WhatsAppState, FormData>(setWhatsAppConsent, { enabled });
  const current = state.enabled ?? enabled;

  return (
    <form key={state.saved ?? 0} action={action} className="flex flex-col gap-3">
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && <Alert tone="success">{current ? "WhatsApp updates are on." : "WhatsApp updates are off."}</Alert>}
      {!state.saved && !current && numberChanged && (
        <Alert tone="info">Updates stopped when your number changed. Tick the box and save to get them on your new number.</Alert>
      )}
      {!state.saved && !current && outdated && (
        <Alert tone="info">
          WhatsApp updates now also cover bookings and briefs you take part in. Tick the box and save to confirm the updated
          wording; until then we send you nothing on WhatsApp.
        </Alert>
      )}
      <CheckboxField id="whatsapp" defaultChecked={current}>
        {WHATSAPP_CONSENT_PROMISE}
      </CheckboxField>
      <p className="text-sm text-content-3">
        {hasPhone
          ? "Sent to the phone number above. Reply STOP to any message to turn them off."
          : "Save a phone number above first. We only message numbers you give us."}
      </p>
      <Button type="submit" variant="secondary" disabled={pending} className="self-start">
        {pending ? "Saving…" : "Save WhatsApp choice"}
      </Button>
    </form>
  );
}
