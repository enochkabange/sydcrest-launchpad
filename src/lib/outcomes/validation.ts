import { parseIsoDate, todayInAccra, type FieldErrors } from "@/lib/validation";
import { isOutcomeType, type OutcomeType } from "./labels";

export type OutcomeField = "type" | "title" | "organisation_name" | "started_on" | "evidence_url" | "evidence_note";

/** Exactly the columns learners may write (the insert and update grants on public.outcomes). */
export type OutcomeInput = {
  type: OutcomeType;
  title: string | null;
  organisation_name: string;
  started_on: string;
  evidence_url: string | null;
  evidence_note: string | null;
};

/** Mirrors private.url_ok: http or https, no spaces or angle brackets, at most 2000 characters. */
const URL_OK = /^https?:\/\/[^\s<>"]+$/i;
/** The earliest date the table accepts. */
const EARLIEST = "2020-01-01";

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Today in Ghana as YYYY-MM-DD, the form a date input and a date column use. */
export function todayIso(now: Date = new Date()) {
  const t = todayInAccra(now);
  return `${t.year}-${pad(t.month)}-${pad(t.day)}`;
}

/**
 * Checks a reported outcome the same way the database will, so a learner
 * gets a clear message beside the field instead of a failed save. An outcome
 * needs evidence (a link, a note, or both) because an admin has to check it,
 * and it must already have started or been awarded (dates in Ghana time).
 */
export function parseOutcome(form: FormData, now: Date = new Date()) {
  const errors: FieldErrors<OutcomeField> = {};

  const type = text(form, "type");
  if (!isOutcomeType(type)) errors.type = "Choose what kind of outcome this is.";

  const title = text(form, "title");
  if (title.length > 140) errors.title = "Keep the role or award name under 140 characters.";

  const organisation_name = text(form, "organisation_name");
  if (!organisation_name) errors.organisation_name = "Enter the organisation, client or funder.";
  else if (organisation_name.length > 120) errors.organisation_name = "Keep the name under 120 characters.";

  const started_on = text(form, "started_on");
  const date = parseIsoDate(started_on);
  const today = todayIso(now);
  if (!date) errors.started_on = "Enter the date it started or was awarded.";
  else if (started_on < EARLIEST) errors.started_on = "Enter a date from 2020 onwards.";
  else if (started_on > today) errors.started_on = "Report it once it has started or been awarded.";

  const evidence_url = text(form, "evidence_url");
  if (evidence_url && (evidence_url.length > 2000 || !URL_OK.test(evidence_url))) {
    errors.evidence_url = "Enter a full link starting with https://";
  }

  const evidence_note = text(form, "evidence_note");
  if (evidence_note.length > 1000) errors.evidence_note = "Keep the note under 1000 characters.";
  if (!evidence_url && !evidence_note && !errors.evidence_url) {
    errors.evidence_note = "Add a link or a note so we can check it.";
  }

  if (Object.keys(errors).length) return { errors } as const;
  return {
    errors,
    data: {
      type: type as OutcomeType,
      title: title || null,
      organisation_name,
      started_on,
      evidence_url: evidence_url || null,
      evidence_note: evidence_note || null,
    } satisfies OutcomeInput,
  } as const;
}
