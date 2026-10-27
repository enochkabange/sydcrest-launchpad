import { describe, expect, it } from "vitest";
import {
  answeredQuestions,
  decisionErrorMessage,
  isDecision,
  isOpen,
  parseApplication,
  parseScreeningQuestions,
  parseSpecializations,
  statusCopy,
} from "./screening";

const RAW_QUESTIONS = [
  { id: "motivation", prompt: "Why do you want to join?", kind: "text", required: true },
  { id: "device", prompt: "How do you get online?", kind: "choice", options: ["Phone only", "My own computer"], required: true },
  { id: "extra", prompt: "Anything else?", kind: "text" },
];

const QUESTIONS = parseScreeningQuestions(RAW_QUESTIONS);
const SPECS = parseSpecializations([
  { slug: "seo", label: "SEO" },
  { slug: "social", label: "Social media" },
]);

function form(entries: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(entries)) f.set(k, v);
  return f;
}

describe("parseScreeningQuestions", () => {
  it("keeps valid text and choice questions in order", () => {
    expect(QUESTIONS).toEqual([
      { id: "motivation", prompt: "Why do you want to join?", kind: "text", required: true },
      { id: "device", prompt: "How do you get online?", kind: "choice", options: ["Phone only", "My own computer"], required: true },
      { id: "extra", prompt: "Anything else?", kind: "text", required: false },
    ]);
  });

  it("drops malformed entries, unknown kinds, empty choices and duplicate ids", () => {
    expect(
      parseScreeningQuestions([
        null,
        "a string",
        { id: "", prompt: "No id", kind: "text" },
        { id: "a", prompt: "Unknown", kind: "rating" },
        { id: "b", prompt: "No options", kind: "choice", options: [] },
        { id: "c", prompt: "First", kind: "text" },
        { id: "c", prompt: "Second", kind: "text" },
      ]),
    ).toEqual([{ id: "c", prompt: "First", kind: "text", required: false }]);
  });

  it("returns nothing for a non array", () => {
    expect(parseScreeningQuestions({})).toEqual([]);
    expect(parseScreeningQuestions(null)).toEqual([]);
  });
});

describe("parseSpecializations", () => {
  it("keeps entries with a slug and label", () => {
    expect(parseSpecializations([{ slug: "seo", label: "SEO" }, { slug: "x" }, 3])).toEqual([{ slug: "seo", label: "SEO" }]);
  });
});

describe("parseApplication", () => {
  it("accepts a complete application", () => {
    const { data, errors } = parseApplication(
      form({ answer_motivation: "  I sell shea butter in Tamale  ", answer_device: "Phone only", specialization: "seo" }),
      QUESTIONS,
      SPECS,
      [],
    );
    expect(errors).toEqual({});
    expect(data).toEqual({
      screening_answers: { motivation: "I sell shea butter in Tamale", device: "Phone only" },
      specialization: "seo",
      preferred_cohort_id: null,
    });
  });

  it("requires required answers and leaves optional ones out", () => {
    const { errors, data } = parseApplication(form({}), QUESTIONS, SPECS, []);
    expect(errors).toEqual({ answer_motivation: "Answer this question.", answer_device: "Choose an answer." });
    expect(data.screening_answers).toEqual({});
  });

  it("rejects a choice that is not one of the options", () => {
    const { errors } = parseApplication(form({ answer_motivation: "Yes", answer_device: "A tablet" }), QUESTIONS, SPECS, []);
    expect(errors.answer_device).toBe("Choose one of the answers.");
  });

  it("rejects overlong answers", () => {
    const { errors } = parseApplication(
      form({ answer_motivation: "a".repeat(2001), answer_device: "Phone only" }),
      QUESTIONS,
      SPECS,
      [],
    );
    expect(errors.answer_motivation).toMatch(/under 2000/);
  });

  it("checks specialization and preferred cohort against what the programme offers", () => {
    const base = { answer_motivation: "Yes", answer_device: "Phone only" };
    expect(parseApplication(form({ ...base, specialization: "ads" }), QUESTIONS, SPECS, []).errors.specialization).toBeTruthy();
    expect(
      parseApplication(form({ ...base, preferred_cohort_id: "nope" }), QUESTIONS, SPECS, ["c1"]).errors.preferred_cohort_id,
    ).toBeTruthy();
    expect(parseApplication(form({ ...base, preferred_cohort_id: "c1" }), QUESTIONS, SPECS, ["c1"]).data.preferred_cohort_id).toBe("c1");
  });
});

describe("answeredQuestions", () => {
  it("pairs answers with prompts and keeps unknown keys at the end", () => {
    expect(answeredQuestions(QUESTIONS, { device: "Phone only", old: "Kept", motivation: "To grow my shop", blank: "" })).toEqual([
      { prompt: "Why do you want to join?", answer: "To grow my shop" },
      { prompt: "How do you get online?", answer: "Phone only" },
      { prompt: "old", answer: "Kept" },
    ]);
    expect(answeredQuestions(QUESTIONS, null)).toEqual([]);
  });
});

describe("statuses and decisions", () => {
  it("treats submitted and waitlisted as open", () => {
    expect(isOpen("submitted")).toBe(true);
    expect(isOpen("waitlisted")).toBe(true);
    expect(isOpen("accepted")).toBe(false);
    expect(isOpen("withdrawn")).toBe(false);
  });

  it("labels every status without dashes", () => {
    for (const s of ["submitted", "waitlisted", "accepted", "declined", "withdrawn"]) {
      const { label, detail } = statusCopy(s);
      expect(label).toBeTruthy();
      expect(`${label} ${detail}`).not.toMatch(/[–—]| - /);
    }
    expect(statusCopy("odd").label).toBe("odd");
  });

  it("knows the three decisions", () => {
    expect(isDecision("accepted")).toBe(true);
    expect(isDecision("withdrawn")).toBe(false);
    expect(isDecision(undefined)).toBe(false);
  });
});

describe("decisionErrorMessage", () => {
  it("explains a full cohort", () => {
    expect(decisionErrorMessage({ code: "53400", message: "Cohort is full" })).toMatch(/That cohort is full/);
  });

  it("maps the other contract codes", () => {
    expect(decisionErrorMessage({ code: "23505" })).toMatch(/already an active learner/);
    expect(decisionErrorMessage({ code: "P0002" })).toMatch(/no longer exists/);
    expect(decisionErrorMessage({ code: "42501" })).toMatch(/Only admins/);
  });

  it("reads the 22023 message to say which input was wrong", () => {
    expect(decisionErrorMessage({ code: "22023", message: "Choose a cohort to accept into" })).toMatch(/Choose a cohort/);
    expect(decisionErrorMessage({ code: "22023", message: "That cohort is closed" })).toMatch(/closed/);
    expect(decisionErrorMessage({ code: "22023", message: "That cohort is not part of this programme" })).toMatch(/another programme/);
    expect(decisionErrorMessage({ code: "22023", message: "This application was already accepted" })).toMatch(/already decided/);
    expect(decisionErrorMessage({ code: "22023", message: "Unknown decision x" })).toMatch(/not possible/);
  });

  it("falls back to a generic message", () => {
    expect(decisionErrorMessage(null)).toMatch(/Try again/);
    expect(decisionErrorMessage({ code: "XX000" })).toMatch(/Try again/);
  });
});
