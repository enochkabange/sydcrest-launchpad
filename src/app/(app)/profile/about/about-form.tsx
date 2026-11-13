"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckboxGroup, SelectField } from "@/components/ui/field";
import {
  AVAILABLE_FROM,
  CAREER_STAGES,
  DEVICES,
  EDUCATION,
  EMPLOYMENT,
  EXPERIENCE,
  FIELDS_OF_STUDY,
  HEARD_FROM,
  INDUSTRIES,
  INTERNET,
  LANGUAGES,
  LEARNING_STYLES,
  MAIN_GOALS,
  PAY_BANDS,
  STUDY_HOURS,
  STUDY_TIMES,
  WORK_REGIONS,
  WORK_STYLES,
  type LearnerProfile,
  type SingleKey,
} from "@/lib/learner-profile";
import { saveLearnerProfile, type AboutState } from "./actions";

type Option = { value: string; label: string };

function Single({ name, label, hint, options, value }: { name: SingleKey; label: string; hint?: string; options: Option[]; value: string | null }) {
  return (
    <SelectField id={name} label={label} hint={hint} defaultValue={value ?? ""}>
      <option value="">Prefer not to say</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </SelectField>
  );
}

function Group({ title, lead, children }: { title: string; lead: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-t border-line pt-6 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-1">
        <h2 className="text-h2 text-content">{title}</h2>
        <p className="max-w-reading text-sm text-content-2">{lead}</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-x-8">{children}</div>
    </section>
  );
}

/** Every question optional; "Prefer not to say" clears a single answer, unticking clears a list. */
export function AboutForm({ profile, tracks }: { profile: LearnerProfile; tracks: Option[] }) {
  const [state, action, pending] = useActionState<AboutState, FormData>(saveLearnerProfile, {});
  const p = state.saved?.profile ?? profile;
  return (
    <form data-analytics-form="learner_profile" key={state.saved?.at ?? 0} action={action} className="flex flex-col gap-8" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && <Alert tone="success">Saved. Thank you.</Alert>}

      <Group title="Your goal" lead="So your path and the opportunities we show fit where you are and where you want to go.">
        <Single name="main_goal" label="What do you most want from SydCrest?" options={MAIN_GOALS} value={p.main_goal} />
        <Single name="career_stage" label="Where are you in your career?" options={CAREER_STAGES} value={p.career_stage} />
        <Single name="employment_status" label="What do you do now?" options={EMPLOYMENT} value={p.employment_status} />
        <Single name="experience" label="Work experience" options={EXPERIENCE} value={p.experience} />
        <Single name="education" label="Highest level of education" options={EDUCATION} value={p.education} />
        <Single name="field_of_study" label="What did you study?" options={FIELDS_OF_STUDY} value={p.field_of_study} />
      </Group>

      <Group title="Time and access" lead="So we can pace your plan, remind you at a good time and offer low-data versions.">
        <Single name="main_device" label="What do you mostly study on?" options={DEVICES} value={p.main_device} />
        <Single name="internet" label="How do you usually get online?" options={INTERNET} value={p.internet} />
        <Single name="study_hours" label="Hours a week you can study" options={STUDY_HOURS} value={p.study_hours} />
        <CheckboxGroup name="study_times" legend="Best times to study" legendStyle="field" options={STUDY_TIMES} checked={p.study_times} />
      </Group>

      <Group title="Interests" lead="So we can suggest tracks, opportunities and events you will care about.">
        <div className="lg:col-span-2">
          <CheckboxGroup name="tracks" legend="Tracks you are interested in" legendStyle="field" options={tracks} checked={p.tracks} />
        </div>
        <div className="lg:col-span-2">
          <CheckboxGroup name="industries" legend="Industries you would like to work in" legendStyle="field" options={INDUSTRIES} checked={p.industries} />
        </div>
        <Single name="heard_from" label="How did you hear about SydCrest?" options={HEARD_FROM} value={p.heard_from} />
      </Group>

      <Group title="Languages" lead="So we know which languages to add lessons in, and can match jobs that need a language.">
        <div className="lg:col-span-2">
          <CheckboxGroup name="languages" legend="Languages you speak" legendStyle="field" options={LANGUAGES} checked={p.languages} />
        </div>
      </Group>

      <Group
        title="Work preferences"
        lead="Used only to match you with opportunities. Your pay answer is a filter and is never shown to employers."
      >
        <CheckboxGroup name="work_styles" legend="Ways you would like to work" legendStyle="field" options={WORK_STYLES} checked={p.work_styles} />
        <Single name="available_from" label="When could you start?" options={AVAILABLE_FROM} value={p.available_from} />
        <SelectField id="willing_to_relocate" label="Would you move for the right job?" defaultValue={p.willing_to_relocate === null ? "" : p.willing_to_relocate ? "yes" : "no"}>
          <option value="">Prefer not to say</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </SelectField>
        <Single name="min_pay_band" label="Lowest monthly pay you would accept" options={PAY_BANDS} value={p.min_pay_band} />
        <div className="lg:col-span-2">
          <CheckboxGroup name="work_regions" legend="Regions you would work in" legendStyle="field" options={WORK_REGIONS} checked={p.work_regions} />
        </div>
      </Group>

      <Group title="How you learn" lead="So your lessons lean towards what works for you.">
        <div className="lg:col-span-2">
          <CheckboxGroup name="learning_styles" legend="How you like to learn" legendStyle="field" options={LEARNING_STYLES} checked={p.learning_styles} />
        </div>
      </Group>

      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving…" : "Save answers"}
      </Button>
    </form>
  );
}
