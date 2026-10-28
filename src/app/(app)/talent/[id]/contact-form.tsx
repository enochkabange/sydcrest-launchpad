"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextAreaField } from "@/components/ui/field";
import { CONTACT_MESSAGE_MAX } from "@/lib/talent/forms";
import { requestContact, type ContactState } from "../actions";

export function ContactForm({
  profileId,
  firstName,
  organisations,
}: {
  profileId: string;
  firstName: string;
  organisations: { id: string; name: string }[];
}) {
  const [state, action, pending] = useActionState<ContactState, FormData>(requestContact.bind(null, profileId), {});
  if (state.sent) {
    return <Alert tone="success">Request sent. {firstName} decides whether to share how to reach you; their answer shows on your Talent requests page.</Alert>;
  }
  return (
    <form action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {organisations.length > 1 ? (
        <SelectField id="organisation_id" label="Ask on behalf of">
          {organisations.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </SelectField>
      ) : (
        <input type="hidden" name="organisation_id" value={organisations[0]?.id ?? ""} />
      )}
      <TextAreaField
        id="message"
        label={`Message to ${firstName}`}
        hint="Who you are, the role or project, and why you would like to talk. They see your organisation's name."
        error={state.error}
        maxLength={CONTACT_MESSAGE_MAX}
        required
      />
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Sending…" : "Ask to talk"}
      </Button>
    </form>
  );
}
