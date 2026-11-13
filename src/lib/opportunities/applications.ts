import { isUrl } from "./form";

/**
 * Applying on SydCrest (#306): stage names and the apply form, shared by the
 * learner pages, the employer's applicant list and the tests. The database
 * (opportunity_applications, set_application_stage) stays the authority.
 */

export const APPLICATION_STAGES = [
  { value: "new", label: "New", learner: "Sent. The employer has not looked at it yet." },
  { value: "shortlisted", label: "Shortlisted", learner: "Shortlisted. The employer can now see your phone and email." },
  { value: "interview", label: "Interview", learner: "Interview stage. Expect the employer to contact you." },
  { value: "offer", label: "Offer", learner: "You have an offer. The employer will contact you about it." },
  { value: "hired", label: "Hired", learner: "Hired. Congratulations! It is recorded as a job outcome for us to verify." },
  { value: "not_selected", label: "Not this time", learner: "Not selected this time. Keep applying: every application is practice." },
  { value: "withdrawn", label: "Withdrawn", learner: "You withdrew this application." },
] as const;

export type ApplicationStage = (typeof APPLICATION_STAGES)[number]["value"];

/** The stages an employer can move an application to (not withdrawn, which is the learner's). */
export const EMPLOYER_STAGES = APPLICATION_STAGES.filter((s) => s.value !== "withdrawn");

export function stageCopy(stage: string) {
  return APPLICATION_STAGES.find((s) => s.value === stage) ?? APPLICATION_STAGES[0];
}

/** Applications the learner can still withdraw. */
export function canWithdraw(stage: string) {
  return stage !== "hired" && stage !== "withdrawn";
}

/** Contact details reach the employer from this stage on (the database decides; this is for wording). */
export function sharesContact(stage: string) {
  return ["shortlisted", "interview", "offer", "hired"].includes(stage);
}

export const NOTE_MIN = 20;
export const NOTE_MAX = 1500;

/**
 * share_readiness (#336): the employer may see the learner's readiness band
 * for the opportunity's track and why. Optional, off by default.
 */
export type ApplyFormValues = { note: string; portfolio_url: string; contact_consent: boolean; share_readiness: boolean };

export function parseApplyForm(form: FormData) {
  const get = (k: string) => (typeof form.get(k) === "string" ? (form.get(k) as string).trim() : "");
  const data: ApplyFormValues = {
    note: get("note"),
    portfolio_url: get("portfolio_url"),
    contact_consent: form.get("contact_consent") === "on",
    share_readiness: form.get("share_readiness") === "on",
  };
  const errors: Partial<Record<keyof ApplyFormValues, string>> = {};
  if (data.note.length < NOTE_MIN) errors.note = `Write at least ${NOTE_MIN} characters about why you fit.`;
  else if (data.note.length > NOTE_MAX) errors.note = `Keep this under ${NOTE_MAX} characters.`;
  if (data.portfolio_url && !isUrl(data.portfolio_url)) errors.portfolio_url = "Enter a full link starting with https://";
  if (!data.contact_consent) errors.contact_consent = "Tick the box to apply. The employer needs a way to reach you if they shortlist you.";
  return { data, errors };
}
