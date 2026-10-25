"use client";

import { useActionState } from "react";
import { updatePublicProfile, type PublicProfileState } from "./public-profile-actions";
import { Button } from "@/components/ui/button";
import { CheckboxField, TextField } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";
import Link from "@/components/ui/link";
import { MAX_GOALS, type PublicProfileData } from "@/lib/social/public-profile";

const TEXTAREA =
  "min-h-28 w-full rounded-md border border-line-strong bg-surface px-3 py-2.5 text-base text-content placeholder:text-content-3 aria-invalid:border-danger-fg";

export function PublicProfileForm({ initial, origin }: { initial: PublicProfileData; origin: string }) {
  const [state, action, pending] = useActionState<PublicProfileState, FormData>(updatePublicProfile, {});
  const current = state.saved ?? initial;
  const goalsError = state.errors?.goals;

  return (
    <form key={state.saved?.at ?? 0} action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && <Alert tone="success">Public profile updated.</Alert>}
      <TextField
        id="public_slug"
        label="Profile link name"
        hint={`Your page will be ${origin}/u/${current.public_slug ?? "your-name"}`}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        defaultValue={current.public_slug ?? ""}
        error={state.errors?.public_slug}
      />
      <TextField
        id="headline"
        label="Headline (optional)"
        hint="One line about you, for example: Learning data analysis in Tamale."
        defaultValue={current.headline ?? ""}
        error={state.errors?.headline}
      />
      <TextField
        id="skills"
        label="Skills (optional)"
        hint="Separate skills with commas."
        defaultValue={current.skills.join(", ")}
        error={state.errors?.skills}
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="goals" className="text-sm font-semibold text-content">
          Goals (optional)
        </label>
        <textarea
          id="goals"
          name="goals"
          maxLength={MAX_GOALS}
          defaultValue={current.goals ?? ""}
          aria-invalid={goalsError ? true : undefined}
          aria-describedby={goalsError ? "goals-error" : undefined}
          className={TEXTAREA}
        />
        {goalsError && (
          <p id="goals-error" className="text-sm text-danger-fg">
            {goalsError}
          </p>
        )}
      </div>
      <CheckboxField id="is_public" defaultChecked={current.is_public} error={state.errors?.is_public}>
        Make my profile public
      </CheckboxField>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save public profile"}
        </Button>
        {current.is_public && current.public_slug && (
          <Link href={`/u/${current.public_slug}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-content-link underline">
            View my public profile
          </Link>
        )}
      </div>
    </form>
  );
}
