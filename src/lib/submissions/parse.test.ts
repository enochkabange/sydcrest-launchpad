import { describe, expect, it } from "vitest";
import { parseGradeForm, parseSubmissionForm } from "./parse";

const ME = "11111111-1111-4111-8111-111111111111";
const WEEK = "22222222-2222-4222-8222-222222222222";

function form(fields: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}

describe("parseSubmissionForm", () => {
  it("accepts text, a link or a file in the learner's own folder", () => {
    const ok = parseSubmissionForm(
      form({ week_id: WEEK, body_text: " My answer ", link_url: "https://docs.example.com/x", file_path: `${ME}/${WEEK}/a-plan.pdf`, intent: "submit" }),
      ME,
    );
    expect(ok).toEqual({
      ok: true,
      data: { weekId: WEEK, bodyText: "My answer", linkUrl: "https://docs.example.com/x", filePath: `${ME}/${WEEK}/a-plan.pdf`, submit: true },
    });
  });

  it("allows an empty draft but not an empty submission", () => {
    expect(parseSubmissionForm(form({ week_id: WEEK, intent: "draft" }), ME).ok).toBe(true);
    const empty = parseSubmissionForm(form({ week_id: WEEK, intent: "submit" }), ME);
    expect(empty.ok === false && empty.errors.form).toMatch(/Add your answer/);
  });

  it("rejects a bad link, someone else's file and a bad week", () => {
    const bad = parseSubmissionForm(
      form({ week_id: "nope", link_url: "javascript:alert(1)", file_path: `33333333-3333-4333-8333-333333333333/x.pdf` }),
      ME,
    );
    expect(bad.ok).toBe(false);
    if (bad.ok) return;
    expect(bad.errors.link_url).toBeDefined();
    expect(bad.errors.file_path).toBeDefined();
    expect(bad.errors.form).toBeDefined();
    const traversal = parseSubmissionForm(form({ week_id: WEEK, file_path: `${ME}/../other/x.pdf` }), ME);
    expect(traversal.ok).toBe(false);
  });

  it("caps the answer length", () => {
    const long = parseSubmissionForm(form({ week_id: WEEK, body_text: "a".repeat(20001) }), ME);
    expect(long.ok === false && long.errors.body_text).toBeTruthy();
  });
});

describe("parseGradeForm", () => {
  const id = "44444444-4444-4444-8444-444444444444";

  it("needs a whole score from 0 to 100 to grade", () => {
    expect(parseGradeForm(form({ submission_id: id, final_score: "72", intent: "grade" }))).toEqual({
      ok: true,
      data: { submissionId: id, finalScore: 72, feedback: null, returnWork: false },
    });
    for (const s of ["", "101", "-1", "7.5", "abc"]) {
      expect(parseGradeForm(form({ submission_id: id, final_score: s })).ok).toBe(false);
    }
  });

  it("needs feedback, not a score, to return work", () => {
    expect(parseGradeForm(form({ submission_id: id, intent: "return" })).ok).toBe(false);
    expect(parseGradeForm(form({ submission_id: id, intent: "return", mentor_feedback: "Add a real post." }))).toEqual({
      ok: true,
      data: { submissionId: id, finalScore: null, feedback: "Add a real post.", returnWork: true },
    });
  });
});
