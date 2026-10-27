/**
 * Programme applications (issue #143): the screening questions a programme
 * asks, the answers an applicant gives, and the friendly messages for the
 * admin decision. Pure functions, so the server actions and the tests share
 * them. Questions and specializations are admin editable JSON on `programs`,
 * so everything here reads them defensively and drops anything malformed.
 */

/** The programme the marketing /programme page sells and the apply form uses. */
export const DMP_SLUG = "dmp";

export const APPLY_PATH = "/programme/apply";

export const ANSWER_MAX = 2000;
export const NOTE_MAX = 2000;

export type ScreeningQuestion =
  | { id: string; prompt: string; kind: "text"; required: boolean }
  | { id: string; prompt: string; kind: "choice"; options: string[]; required: boolean };

export type Specialization = { slug: string; label: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Valid questions from `programs.screening_questions`, in order. Duplicated ids keep the first. */
export function parseScreeningQuestions(raw: unknown): ScreeningQuestion[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: ScreeningQuestion[] = [];
  for (const q of raw) {
    if (!isRecord(q) || !nonEmptyString(q.id) || !nonEmptyString(q.prompt) || seen.has(q.id)) continue;
    const required = q.required === true;
    if (q.kind === "text") {
      out.push({ id: q.id, prompt: q.prompt, kind: "text", required });
    } else if (q.kind === "choice") {
      const options = Array.isArray(q.options) ? q.options.filter(nonEmptyString) : [];
      if (!options.length) continue;
      out.push({ id: q.id, prompt: q.prompt, kind: "choice", options, required });
    } else {
      continue;
    }
    seen.add(q.id);
  }
  return out;
}

/** Valid `{slug, label}` entries from `programs.specializations`. */
export function parseSpecializations(raw: unknown): Specialization[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((s) =>
    isRecord(s) && nonEmptyString(s.slug) && nonEmptyString(s.label) ? [{ slug: s.slug, label: s.label }] : [],
  );
}

export type ApplicationFields = "specialization" | "preferred_cohort_id" | `answer_${string}`;

export type ParsedApplication = {
  data: {
    screening_answers: Record<string, string>;
    specialization: string | null;
    preferred_cohort_id: string | null;
  };
  errors: Partial<Record<ApplicationFields, string>>;
};

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Reads the apply form. Each question's answer comes from `answer_<id>`;
 * required questions must be answered and choices must be one of the
 * options. Specialization and preferred cohort are optional and must be one
 * the programme offers.
 */
export function parseApplication(
  form: FormData,
  questions: ScreeningQuestion[],
  specializations: Specialization[],
  cohortIds: string[],
): ParsedApplication {
  const errors: ParsedApplication["errors"] = {};
  const answers: Record<string, string> = {};

  for (const q of questions) {
    const key = `answer_${q.id}` as const;
    const value = text(form, key);
    if (!value) {
      if (q.required) errors[key] = q.kind === "choice" ? "Choose an answer." : "Answer this question.";
      continue;
    }
    if (q.kind === "choice" && !q.options.includes(value)) {
      errors[key] = "Choose one of the answers.";
      continue;
    }
    if (value.length > ANSWER_MAX) {
      errors[key] = `Keep this under ${ANSWER_MAX} characters.`;
      continue;
    }
    answers[q.id] = value;
  }

  const specialization = text(form, "specialization") || null;
  if (specialization && !specializations.some((s) => s.slug === specialization)) {
    errors.specialization = "Choose one of the specialisations, or not sure yet.";
  }

  const preferred = text(form, "preferred_cohort_id") || null;
  if (preferred && !cohortIds.includes(preferred)) {
    errors.preferred_cohort_id = "Choose one of the cohorts, or any cohort.";
  }

  return {
    data: { screening_answers: answers, specialization, preferred_cohort_id: preferred },
    errors,
  };
}

/** Answers paired with their questions, for showing an application back. Unknown keys come last. */
export function answeredQuestions(questions: ScreeningQuestion[], raw: unknown): { prompt: string; answer: string }[] {
  const answers = isRecord(raw) ? raw : {};
  const known = questions.flatMap((q) => {
    const a = answers[q.id];
    return typeof a === "string" && a ? [{ prompt: q.prompt, answer: a }] : [];
  });
  const ids = new Set(questions.map((q) => q.id));
  const extra = Object.entries(answers).flatMap(([id, a]) =>
    !ids.has(id) && typeof a === "string" && a ? [{ prompt: id, answer: a }] : [],
  );
  return [...known, ...extra];
}

export const APPLICATION_STATUSES = ["submitted", "waitlisted", "accepted", "declined", "withdrawn"] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

/** Statuses an applicant can still withdraw from (and an admin can still decide). */
export function isOpen(status: string): boolean {
  return status === "submitted" || status === "waitlisted";
}

/** Applicant facing label and one line explanation of each status. */
export const STATUS_COPY: Record<ApplicationStatus, { label: string; detail: string }> = {
  submitted: {
    label: "Under review",
    detail: "We have your application. The team reads every one and will update this page with a decision.",
  },
  waitlisted: {
    label: "On the waitlist",
    detail: "The cohort is full for now. If a seat opens, or a new cohort starts, we can offer it to you from here.",
  },
  accepted: {
    label: "Accepted",
    detail: "Welcome to the programme. Your cohort page has your weekly plan, your mentor and your classmates.",
  },
  declined: {
    label: "Not this time",
    detail: "We could not offer you a seat in this cohort. You can apply again for a later one.",
  },
  withdrawn: {
    label: "Withdrawn",
    detail: "You withdrew this application. You can apply again whenever you are ready.",
  },
};

export function statusCopy(status: string) {
  return STATUS_COPY[status as ApplicationStatus] ?? { label: status, detail: "" };
}

export const DECISIONS = ["accepted", "waitlisted", "declined"] as const;
export type Decision = (typeof DECISIONS)[number];

export function isDecision(value: unknown): value is Decision {
  return typeof value === "string" && (DECISIONS as readonly string[]).includes(value);
}

/**
 * Turns an error from `decide_application` into something an admin can act
 * on. Codes come from the schema contract (PR #156): 53400 cohort full,
 * 22023 bad input or wrong state, P0002 not found, 23505 duplicate, 42501
 * not allowed.
 */
export function decisionErrorMessage(error: { code?: string; message?: string } | null | undefined): string {
  const message = error?.message ?? "";
  switch (error?.code) {
    case "53400":
      return "That cohort is full. Choose another cohort, raise its size, or waitlist this applicant.";
    case "23505":
      return "This person is already an active learner in this programme.";
    case "P0002":
      return "That application no longer exists. Reload the queue.";
    case "42501":
      return "Only admins can decide applications.";
    case "22023":
      if (/choose a cohort/i.test(message)) return "Choose a cohort to accept this applicant into.";
      if (/closed/i.test(message)) return "That cohort is closed. Choose a cohort that is planned, enrolling or running.";
      if (/not part of this programme/i.test(message)) return "That cohort belongs to another programme.";
      if (/already/i.test(message)) return "Someone already decided this application. Reload the queue to see it.";
      return "That decision is not possible for this application.";
    default:
      return "We could not save that decision. Try again.";
  }
}
