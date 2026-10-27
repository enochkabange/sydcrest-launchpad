"use client";

import { useActionState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/(marketing)/actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextField } from "@/components/ui/field";
import { CONTACT_EMAIL } from "@/content/marketing";
import { REGIONS } from "@/lib/regions";
import { WAITLIST_HONEYPOT, WAITLIST_INTERESTS, type WaitlistInterest } from "@/lib/waitlist";

/** One form for every audience; each page picks the interest it most likely wants. */
export function WaitlistForm({
  defaultInterest = "dmp_cohort",
  submitLabel = "Join the waitlist",
}: {
  defaultInterest?: WaitlistInterest;
  submitLabel?: string;
}) {
  const [state, action, pending] = useActionState<WaitlistState, FormData>(joinWaitlist, {});

  if (state.done) {
    return (
      <Alert tone="success">
        <strong>Thanks, you are on the waitlist.</strong> We will be in touch before the January cohort. If
        something cannot wait, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </Alert>
    );
  }

  return (
    <form action={action} className="relative flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {/* Honeypot: hidden from people and screen readers, filled only by bots. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={WAITLIST_HONEYPOT}>Leave this empty</label>
        <input id={WAITLIST_HONEYPOT} name={WAITLIST_HONEYPOT} type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <TextField
        id="name"
        label="Your name"
        autoComplete="name"
        defaultValue={state.values?.name}
        error={state.errors?.name}
        required
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        defaultValue={state.values?.email}
        error={state.errors?.email}
        required
      />
      <SelectField
        id="region"
        label="Region"
        defaultValue={state.values?.region ?? ""}
        error={state.errors?.region}
        required
      >
        <option value="" disabled>
          Choose your region
        </option>
        {REGIONS.map((r) => (
          <option key={r.slug} value={r.slug}>
            {r.label}
          </option>
        ))}
      </SelectField>
      <SelectField
        id="interest"
        label="I am interested in"
        defaultValue={state.values?.interest ?? defaultInterest}
        error={state.errors?.interest}
        required
      >
        {WAITLIST_INTERESTS.map((i) => (
          <option key={i.value} value={i.value}>
            {i.label}
          </option>
        ))}
      </SelectField>
      <Button type="submit" disabled={pending} className="w-full sm:w-auto sm:self-start">
        {pending ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}
