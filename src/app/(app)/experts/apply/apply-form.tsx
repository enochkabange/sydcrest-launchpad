"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextAreaField } from "@/components/experts/textarea-field";
import { TextField } from "@/components/ui/field";
import { LIMITS } from "@/lib/market-apply/expert";
import { applyAsExpert, type ApplyState, type ApplyValues } from "./actions";


/** The application. Fieldsets split "about you" from "for the review" so the form reads in two short parts. */
export function ApplyForm({ initial, origin }: { initial: ApplyValues; origin: string }) {
  // Stamp each response and remount the form on it, so the fields start from what was submitted.
  const [state, action, pending] = useActionState<ApplyState & { at?: number }, FormData>(
    async (prev, form) => ({ ...(await applyAsExpert(prev, form)), at: Date.now() }),
    {},
  );
  const v = state.values ?? initial;
  const e = state.errors ?? {};

  return (
    <form key={state.at ?? 0} action={action} className="flex flex-col gap-8" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {Object.keys(e).length > 0 && <Alert tone="danger">Check the highlighted fields and try again.</Alert>}

      <fieldset className="flex flex-col gap-5">
        <legend className="mb-4 text-h3 font-semibold text-content">Your expert profile</legend>
        <TextField
          id="headline"
          label="Headline"
          hint="One line on what you help with, for example: Data analyst helping beginners land their first role."
          maxLength={LIMITS.headline}
          defaultValue={v.headline}
          error={e.headline}
          required
        />
        <TextField
          id="slug"
          label="Expert page link name"
          hint={`Your page will be ${origin}/experts/${v.slug || "your-name"}`}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          defaultValue={v.slug}
          error={e.slug}
          required
        />
        <TextField
          id="skills"
          label="Skills"
          hint="Separate skills with commas, for example: Excel, Power BI, SQL."
          defaultValue={v.skills}
          error={e.skills}
          required
        />
        <TextAreaField
          id="links"
          label="Links about you (optional)"
          hint="One per line: a portfolio, a professional profile or your website."
          defaultValue={v.links}
          error={e.links}
          rows={3}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="mb-4 text-h3 font-semibold text-content">For the review</legend>
        <TextAreaField
          id="evidence_links"
          label="Sample work"
          hint="One link per line to work you have done: a project, a design, a report, a repository."
          defaultValue={v.evidence_links}
          error={e.evidence_links}
          rows={3}
          required
        />
        <TextAreaField
          id="experience"
          label="Your experience (optional)"
          hint="Roles, projects or teaching you have done."
          maxLength={LIMITS.experience}
          defaultValue={v.experience}
          error={e.experience}
        />
        <TextAreaField
          id="motivation"
          label="Why do you want to be an expert on SydCrest?"
          hint="Who you want to help and how."
          maxLength={LIMITS.motivation}
          defaultValue={v.motivation}
          error={e.motivation}
          required
        />
      </fieldset>

      <div className="flex flex-col gap-3">
        <p className="text-sm text-content-2">
          An admin reads every application. Your expert page goes live once you are approved.
        </p>
        <div>
          <Button type="submit" disabled={pending}>
            {pending ? "Sending…" : "Send application"}
          </Button>
        </div>
      </div>
    </form>
  );
}
