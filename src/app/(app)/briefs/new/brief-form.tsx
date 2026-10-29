"use client";

import { useActionState, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/field";
import { BRIEF_KINDS, CATEGORIES_MAX, DESCRIPTION_MAX, LOCATION_MAX, TITLE_MAX } from "@/lib/briefs/briefs";
import { createBrief, type FormState } from "../actions";

type Org = { id: string; name: string };

export function BriefForm({
  orgs,
  unverifiedOrgs,
  categories,
}: {
  orgs: Org[];
  unverifiedOrgs: string[];
  categories: { slug: string; label: string }[];
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(createBrief, {});
  const v = state.values ?? {};
  const e = state.errors ?? {};
  const str = (key: string) => (typeof v[key] === "string" ? (v[key] as string) : undefined);
  const [kind, setKind] = useState(str("kind") ?? "advice");
  const [remote, setRemote] = useState(state.values ? v.is_remote === "on" : true);
  const chosen = new Set(Array.isArray(v.categories) ? v.categories : []);
  const canPostJobs = orgs.length > 0;

  return (
    <form data-analytics-form="brief" action={action} className="flex flex-col gap-6" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1.5 text-sm font-semibold text-content">What kind of brief is this?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {BRIEF_KINDS.map((k) => {
            const disabled = k.kind === "job" && !canPostJobs;
            return (
              <label
                key={k.kind}
                className={`flex min-h-11 items-start gap-3 rounded-md border p-4 ${
                  kind === k.kind ? "border-line-selected bg-info-bg" : "border-line-strong bg-surface"
                } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
              >
                <input
                  type="radio"
                  name="kind"
                  value={k.kind}
                  checked={kind === k.kind}
                  disabled={disabled}
                  onChange={() => setKind(k.kind)}
                  className="mt-1 size-5 shrink-0 accent-line-selected"
                />
                <span className="flex flex-col gap-0.5">
                  <span className="font-semibold text-content">{k.label}</span>
                  <span className="text-sm text-content-2">{k.detail}</span>
                </span>
              </label>
            );
          })}
        </div>
        {!canPostJobs && (
          <p className="text-sm text-content-3">
            {unverifiedOrgs.length > 0
              ? `Job briefs open once ${unverifiedOrgs[0]} is verified by the SydCrest team.`
              : "Job briefs are for verified organisations. Owners, admins and recruiters post them."}
          </p>
        )}
        {e.kind && <p className="text-sm text-danger-fg">{e.kind}</p>}
      </fieldset>

      {kind === "job" && canPostJobs && (
        <SelectField id="organisation_id" label="Organisation" defaultValue={str("organisation_id") ?? orgs[0]?.id} error={e.organisation_id} required>
          {orgs.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </SelectField>
      )}

      <TextField
        id="title"
        label="Title"
        hint="What do you want done, in one line."
        maxLength={TITLE_MAX}
        required
        defaultValue={str("title")}
        error={e.title}
        placeholder="Set up stock records for my Tamale shop"
      />

      <TextAreaField
        id="description"
        label="Describe what you need"
        hint="What you have, what you have tried and what a good result looks like."
        maxLength={DESCRIPTION_MAX}
        rows={7}
        required
        defaultValue={str("description")}
        error={e.description}
      />

      <TextField
        id="skills"
        label="Skills it takes"
        hint="Separate them with commas, for example Excel, data cleaning."
        required
        defaultValue={str("skills")}
        error={e.skills}
      />

      <fieldset className="flex flex-col gap-2" aria-describedby={e.categories ? "categories-error" : "categories-hint"}>
        <legend className="mb-1.5 text-sm font-semibold text-content">
          Categories <span className="font-normal text-content-3">(optional, up to {CATEGORIES_MAX})</span>
        </legend>
        <div className="grid gap-x-4 sm:grid-cols-2">
          {categories.map((c) => (
            <label key={c.slug} className="flex min-h-11 items-center gap-3 text-sm text-content">
              <input type="checkbox" name="categories" value={c.slug} defaultChecked={chosen.has(c.slug)} className="size-5 shrink-0 accent-line-selected" />
              {c.label}
            </label>
          ))}
        </div>
        {e.categories ? (
          <p id="categories-error" className="text-sm text-danger-fg">
            {e.categories}
          </p>
        ) : (
          <p id="categories-hint" className="text-sm text-content-3">
            Experts in these categories hear about it when no one lists the same skill.
          </p>
        )}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="budget"
          label="Indicative budget in cedis (optional)"
          hint="A guide for experts. Nobody pays through SydCrest."
          inputMode="numeric"
          defaultValue={str("budget")}
          error={e.budget}
          placeholder="500"
        />
        <TextField id="deadline" label="Needed by (optional)" type="date" defaultValue={str("deadline")} error={e.deadline} />
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="is_remote" className="flex min-h-11 items-center gap-3 text-sm text-content">
          <input
            id="is_remote"
            name="is_remote"
            type="checkbox"
            checked={remote}
            onChange={(ev) => setRemote(ev.target.checked)}
            className="size-5 shrink-0 accent-line-selected"
          />
          This can be done remotely
        </label>
        <TextField
          id="location"
          label={remote ? "Town or region (optional)" : "Where does the work happen?"}
          maxLength={LOCATION_MAX}
          defaultValue={str("location")}
          error={e.location}
          placeholder="Tamale"
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-content-3">Only approved experts and your own side can read briefs.</p>
        <Button type="submit" disabled={pending}>
          {pending ? "Posting" : "Post brief"}
        </Button>
      </div>
    </form>
  );
}
