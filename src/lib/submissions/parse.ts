import { MAX_BODY_CHARS, MAX_LINK_CHARS, MAX_MENTOR_FEEDBACK_CHARS } from "./config";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type SubmissionFields = "body_text" | "link_url" | "file_path" | "form";

export type ParsedSubmission =
  | {
      ok: true;
      data: { weekId: string; bodyText: string | null; linkUrl: string | null; filePath: string | null; submit: boolean };
    }
  | { ok: false; errors: Partial<Record<SubmissionFields, string>> };

function text(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v : "";
}

/** Reads the learner's submission form. Only shape checks; save_submission has the final word. */
export function parseSubmissionForm(form: FormData, profileId: string): ParsedSubmission {
  const errors: Partial<Record<SubmissionFields, string>> = {};
  const weekId = text(form, "week_id");
  const submit = text(form, "intent") !== "draft";
  const bodyText = text(form, "body_text").trim() || null;
  const linkUrl = text(form, "link_url").trim() || null;
  const filePath = text(form, "file_path").trim() || null;

  if (!UUID.test(weekId)) errors.form = "Something went wrong with this page. Refresh and try again.";
  if (bodyText && bodyText.length > MAX_BODY_CHARS) {
    errors.body_text = `Keep your answer under ${MAX_BODY_CHARS.toLocaleString("en-GB")} characters, or attach it as a file.`;
  }
  if (linkUrl) {
    if (!/^https?:\/\//i.test(linkUrl) || !URL.canParse(linkUrl)) {
      errors.link_url = "Paste a full link that starts with https://";
    } else if (linkUrl.length > MAX_LINK_CHARS) {
      errors.link_url = "That link is too long. Try a shorter share link.";
    }
  }
  if (filePath && (filePath.split("/")[0] !== profileId || filePath.includes(".."))) {
    errors.file_path = "Upload the file again.";
  }
  if (submit && !bodyText && !linkUrl && !filePath && !errors.form) {
    errors.form = "Add your answer, a link or a file before you submit.";
  }
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data: { weekId, bodyText, linkUrl, filePath, submit } };
}

export type ParsedGrade =
  | { ok: true; data: { submissionId: string; finalScore: number | null; feedback: string | null; returnWork: boolean } }
  | { ok: false; errors: Partial<Record<"final_score" | "mentor_feedback" | "form", string>> };

/** Reads the mentor's grading form: a whole score from 0 to 100, or a return with feedback. */
export function parseGradeForm(form: FormData): ParsedGrade {
  const errors: Partial<Record<"final_score" | "mentor_feedback" | "form", string>> = {};
  const submissionId = text(form, "submission_id");
  const returnWork = text(form, "intent") === "return";
  const feedback = text(form, "mentor_feedback").trim() || null;
  const rawScore = text(form, "final_score").trim();
  let finalScore: number | null = null;

  if (!UUID.test(submissionId)) errors.form = "Something went wrong with this page. Refresh and try again.";
  if (!returnWork) {
    const n = Number(rawScore);
    if (!rawScore || !Number.isInteger(n) || n < 0 || n > 100) errors.final_score = "Give a whole number from 0 to 100.";
    else finalScore = n;
  } else if (!feedback) {
    errors.mentor_feedback = "Say what to change so the learner knows what to do next.";
  }
  if (feedback && feedback.length > MAX_MENTOR_FEEDBACK_CHARS) {
    errors.mentor_feedback = `Keep feedback under ${MAX_MENTOR_FEEDBACK_CHARS.toLocaleString("en-GB")} characters.`;
  }
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data: { submissionId, finalScore, feedback, returnWork } };
}
