"use client";

import { useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "@/components/ui/link";
import { Alert } from "@/components/ui/alert";
import { Button, buttonClasses } from "@/components/ui/button";
import {
  CONFIDENCE,
  DATA,
  DEVICES,
  EXPERIENCE,
  GOALS,
  HOURS,
  INTEREST_GROUPS,
  INTERESTS,
  QUIZ_VERSION,
  parseAnswers,
  type InterestOption,
  type Option,
  type PathAnswers,
} from "@/lib/path/quiz";
import { writeLocalAnswers } from "@/lib/path/storage";
import { stashAnswers } from "./actions";

type Draft = Partial<Omit<PathAnswers, "v" | "interests">> & { interests: string[] };

const STEPS = ["Interests", "Your level", "Your goal", "Time", "Device and data"] as const;

function OptionCard({
  type,
  name,
  option,
  checked,
  onChange,
}: {
  type: "radio" | "checkbox";
  name: string;
  option: Option<string>;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-md border px-4 py-3 transition-colors ${
        checked ? "border-blue-600 bg-info-bg" : "border-line-strong bg-surface hover:bg-surface-sunken"
      }`}
    >
      <input
        type={type}
        name={name}
        value={option.value}
        checked={checked}
        onChange={onChange}
        className="mt-0.5 size-5 shrink-0 accent-blue-600"
      />
      <span className="flex flex-col gap-0.5">
        <span className="font-semibold text-content">{option.label}</span>
        {option.hint && <span className="text-sm text-content-2">{option.hint}</span>}
      </span>
    </label>
  );
}

function Question({ legend, hint, children }: { legend: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-1 text-h3 font-semibold text-content">{legend}</legend>
      {hint && <p className="-mt-1 text-sm text-content-2">{hint}</p>}
      {children}
    </fieldset>
  );
}

export function StartQuiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>({ interests: [] });
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [pending, startTransition] = useTransition();

  function radios<K extends keyof Omit<Draft, "interests">>(key: K, legend: string, options: readonly Option<string>[]) {
    return (
      <Question legend={legend}>
        {/* One column on phones; side by side from lg so a laptop shows every option at a glance. */}
        <div className="grid gap-3 lg:grid-cols-2">
          {options.map((o) => (
            <OptionCard
              key={o.value}
              type="radio"
              name={key}
              option={o}
              checked={draft[key] === o.value}
              onChange={() => setDraft((d) => ({ ...d, [key]: o.value }))}
            />
          ))}
        </div>
      </Question>
    );
  }

  function toggleInterest(value: string) {
    setDraft((d) => {
      if (value === "unsure") return { ...d, interests: d.interests.includes("unsure") ? [] : ["unsure"] };
      const rest = d.interests.filter((i) => i !== "unsure");
      return { ...d, interests: rest.includes(value) ? rest.filter((i) => i !== value) : [...rest, value] };
    });
  }

  const stepComplete = [
    draft.interests.length > 0,
    Boolean(draft.confidence && draft.experience),
    Boolean(draft.goal),
    Boolean(draft.hours),
    Boolean(draft.device && draft.data),
  ];

  function next() {
    if (!stepComplete[step]) {
      setError(step === 0 ? "Pick at least one, or choose I am not sure yet." : "Choose an answer to carry on.");
      return;
    }
    setError(null);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }
    const answers = parseAnswers({ ...draft, v: QUIZ_VERSION });
    if (!answers) {
      setError("Something in your answers did not save. Go back and check each step.");
      return;
    }
    writeLocalAnswers(answers);
    startTransition(async () => {
      const outcome = await stashAnswers(answers).catch(() => ({ ok: false, signedIn: false }));
      if (outcome.signedIn) router.push("/path");
      else setReady(true);
    });
  }

  if (ready) {
    return (
      <section aria-labelledby="ready-heading" className="flex max-w-3xl flex-col gap-4 rounded-lg border border-line bg-surface-sunken p-5 xl:p-8">
        <h2 id="ready-heading" className="text-h2 text-content">
          Your path is ready
        </h2>
        <p className="text-content-2">
          Create a free account to see your track, where to start, your skill gap and your weekly plan.
          We keep your answers on this device while you sign up.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/signup?next=/path" className={buttonClasses("primary")}>
            Create a free account
          </Link>
          <Link href="/login?next=/path" className={buttonClasses("secondary")}>
            I already have an account
          </Link>
        </div>
        <Button variant="ghost" className="self-start px-0" onClick={() => { setReady(false); setStep(0); }}>
          Change my answers
        </Button>
      </section>
    );
  }

  return (
    // Phones: progress bar, then the question. From lg the steps sit in a column beside the question.
    <form
      className="flex flex-col gap-6 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-start lg:gap-12 xl:grid-cols-[16rem_minmax(0,1fr)] xl:gap-16"
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
      noValidate
    >
      <div className="flex flex-col gap-2 lg:sticky lg:top-8">
        <p className="text-sm font-semibold text-content-2" aria-live="polite">
          Step {step + 1} of {STEPS.length}: {STEPS[step]}
        </p>
        <div className="flex gap-1.5 lg:hidden" aria-hidden="true">
          {STEPS.map((s, i) => (
            <span key={s} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-blue-600" : "bg-line"}`} />
          ))}
        </div>
        <ol className="mt-2 hidden flex-col gap-1 border-l-2 border-line lg:flex" aria-hidden="true">
          {STEPS.map((s, i) => (
            <li
              key={s}
              className={`-ml-0.5 border-l-2 py-2 pl-4 text-sm ${
                i === step
                  ? "border-blue-600 font-semibold text-content"
                  : i < step
                    ? "border-blue-600 text-content-2"
                    : "border-transparent text-content-3"
              }`}
            >
              {s}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex min-w-0 flex-col gap-6">

        {step === 0 && (
          <Question legend="What sounds interesting to you?" hint="Pick as many as you like.">
            {[...INTEREST_GROUPS, undefined].map((group) => (
              <div key={group ?? "other"} className="flex flex-col gap-2">
                {group && <h3 className="mt-2 text-sm font-semibold text-content-2">{group}</h3>}
                <div className={group ? "grid gap-3 md:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-3"}>
                  {INTERESTS.filter((o: InterestOption) => o.group === group).map((o) => (
                    <OptionCard
                      key={o.value}
                      type="checkbox"
                      name="interests"
                      option={o}
                      checked={draft.interests.includes(o.value)}
                      onChange={() => toggleInterest(o.value)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </Question>
        )}
        {step === 1 && (
          <>
            {radios("confidence", "How comfortable are you with a phone or computer for learning?", CONFIDENCE)}
            {radios("experience", "Have you learned any tech skills before?", EXPERIENCE)}
          </>
        )}
        {step === 2 && radios("goal", "What do you want most from learning?", GOALS)}
        {step === 3 && radios("hours", "How much time can you give each week?", HOURS)}
        {step === 4 && (
          <>
            {radios("device", "What will you learn on?", DEVICES)}
            {radios("data", "How is your internet?", DATA)}
          </>
        )}

        {error && <Alert tone="danger">{error}</Alert>}

        <div className="flex gap-3">
          {step > 0 && (
            <Button variant="secondary" onClick={() => { setError(null); setStep(step - 1); }}>
              Back
            </Button>
          )}
          <Button type="submit" className="flex-1 lg:max-w-xs" disabled={pending}>
            {step < STEPS.length - 1 ? "Next" : pending ? "Building your path…" : "See my path"}
          </Button>
      </div>
      </div>
    </form>
  );
}
