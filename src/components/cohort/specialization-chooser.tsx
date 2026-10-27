"use client";

import { useActionState } from "react";
import { chooseSpecialization, type SpecializationState } from "@/app/(app)/cohort/actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export type ChooserOption = { slug: string; label: string; weeks: { week_number: number; theme: string }[] };

/**
 * The specialization weeks (DMP weeks 7 to 9). A radio card per option, each
 * listing its week themes (already passed through displayTheme by the
 * server), so the choice is made on what is actually taught.
 */
export function SpecializationChooser({
  memberId,
  current,
  options,
  locked,
  canChoose,
  weeksLabel,
}: {
  memberId: string;
  current: string | null;
  options: ChooserOption[];
  locked: boolean;
  canChoose: boolean;
  /** "Weeks 7 to 9" or "Week 3": the weeks the choice decides. */
  weeksLabel: string;
}) {
  const [state, action, pending] = useActionState<SpecializationState, FormData>(chooseSpecialization, {});
  const chosen = state.saved?.slug ?? current;
  const chosenLabel = options.find((o) => o.slug === chosen)?.label;
  const disabled = locked || !canChoose;

  return (
    <section
      aria-labelledby="specialization-heading"
      className="flex flex-col gap-4 rounded-lg border border-line p-5 xl:p-6"
    >
      <div className="flex flex-col gap-1">
        <h2 id="specialization-heading" className="text-h3 text-content">
          Your specialization for {weeksLabel.toLowerCase()}
        </h2>
        <p className="max-w-reading text-sm text-content-2">
          {locked
            ? `You are on ${chosenLabel ?? "your specialization"}. It is set now that you have sent work for it; talk to your mentor if it needs to change.`
            : chosen
              ? `You are on ${chosenLabel ?? chosen}. You can change it until you send work for one of those weeks.`
              : "Pick the channel you want to go deep on. You can change it until you send work for one of those weeks."}
        </p>
      </div>
      <form key={state.saved?.at ?? 0} action={action} className="flex flex-col gap-4">
        <input type="hidden" name="member_id" value={memberId} />
        {state.message && <Alert tone="danger">{state.message}</Alert>}
        {state.saved && <Alert tone="success">Saved. {weeksLabel} now {weeksLabel.startsWith("Weeks") ? "follow" : "follows"} {chosenLabel ?? "your choice"}.</Alert>}
        <fieldset className="flex flex-col gap-3" disabled={disabled}>
          <legend className="sr-only">Specialization</legend>
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-3">
            {options.map((o) => (
              <label
                key={o.slug}
                className="flex cursor-pointer gap-3 rounded-md border border-line p-4 transition-colors hover:border-line-strong has-[:checked]:border-blue-600 has-[:checked]:bg-surface-sunken has-[:disabled]:cursor-not-allowed has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring"
              >
                <input
                  type="radio"
                  name="specialization"
                  value={o.slug}
                  defaultChecked={o.slug === chosen}
                  required
                  className="mt-1 size-5 shrink-0 accent-blue-600"
                />
                <span className="flex min-w-0 flex-col gap-2">
                  <span className="font-semibold text-content">{o.label}</span>
                  <ul className="flex flex-col gap-1 text-sm text-content-2">
                    {o.weeks.map((w) => (
                      <li key={w.week_number}>
                        <span className="text-content-3">Week {w.week_number}: </span>
                        {w.theme}
                      </li>
                    ))}
                  </ul>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        {!disabled && (
          <Button type="submit" disabled={pending} className="self-start">
            {pending ? "Saving…" : chosen ? "Change specialization" : "Choose this specialization"}
          </Button>
        )}
      </form>
    </section>
  );
}
