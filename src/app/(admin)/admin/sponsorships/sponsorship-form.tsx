"use client";

import { useActionState, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextField } from "@/components/ui/field";
import { SPONSOR_SCOPES, SPONSOR_TIERS } from "@/lib/sponsorships";
import { recordSponsorship, type SponsorshipState } from "./actions";

type Option = { id: string; label: string };

export function SponsorshipForm({ organisations, programmes, cohorts, chapters }: { organisations: Option[]; programmes: Option[]; cohorts: Option[]; chapters: Option[] }) {
  const [state, action, pending] = useActionState<SponsorshipState, FormData>(recordSponsorship, {});
  const [scope, setScope] = useState("cohort");
  const targets = { programme: programmes, cohort: cohorts, chapter: chapters }[scope] ?? [];
  return (
    <form action={action} className="flex flex-col gap-4">
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && <Alert tone="success">Sponsorship recorded. The organisation sees it under Impact.</Alert>}
      <SelectField id="organisation_id" label="Sponsor" defaultValue="" required>
        <option value="" disabled>
          Choose an organisation
        </option>
        {organisations.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </SelectField>
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField id="scope" label="They sponsor a" value={scope} onChange={(e) => setScope(e.target.value)}>
          {SPONSOR_SCOPES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </SelectField>
        <SelectField id={`${scope}_id`} key={scope} label={SPONSOR_SCOPES.find((s) => s.value === scope)?.label ?? "Target"} defaultValue="" required>
          <option value="" disabled>
            Choose one
          </option>
          {targets.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </SelectField>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField id="tier" label="Tier" defaultValue="gold">
          {SPONSOR_TIERS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </SelectField>
        <TextField id="seats" label="Seats funded (optional)" inputMode="numeric" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="starts_on" label="From" type="date" required />
        <TextField id="ends_on" label="Until (optional)" type="date" />
      </div>
      <TextField id="note" label="Note (admins only, optional)" maxLength={500} />
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving…" : "Record sponsorship"}
      </Button>
    </form>
  );
}
