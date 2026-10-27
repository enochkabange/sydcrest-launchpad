import { describe, expect, it } from "vitest";
import { displayFileName, fileProblem, isOwnPath, safeFileName, submissionObjectPath } from "./files";
import { aiReviewState, canSaveDraft, canSubmit, friendlyError, REVIEW_GIVE_UP_MS } from "./status";

const ME = "11111111-1111-4111-8111-111111111111";

describe("files", () => {
  it("checks type and size like the bucket does", () => {
    expect(fileProblem({ size: 1000, type: "application/pdf" })).toBeNull();
    expect(fileProblem({ size: 1000, type: "application/zip" })).toMatch(/not accepted/);
    expect(fileProblem({ size: 51 * 1024 * 1024, type: "video/mp4" })).toMatch(/50 MB/);
    expect(fileProblem({ size: 0, type: "text/plain" })).toMatch(/empty/);
  });

  it("builds a fresh path in the owner's folder for every upload", () => {
    const a = submissionObjectPath(ME, "w", "../My Plan (final).pdf", 1);
    const b = submissionObjectPath(ME, "w", "../My Plan (final).pdf", 2);
    expect(a).not.toBe(b);
    expect(a.startsWith(`${ME}/w/`)).toBe(true);
    expect(isOwnPath(ME, a)).toBe(true);
    expect(safeFileName("../../etc/passwd")).toBe("passwd");
    expect(safeFileName("Mariama's plan.docx")).toBe("Mariama_s_plan.docx");
    expect(displayFileName(a)).toBe("My_Plan_final_.pdf");
    expect(isOwnPath("other", a)).toBe(false);
  });
});

describe("status rules", () => {
  it("mirror save_submission", () => {
    expect(canSaveDraft(null)).toBe(true);
    expect(canSaveDraft("returned")).toBe(true);
    expect(canSaveDraft("submitted")).toBe(false);
    expect(canSaveDraft("ai_reviewed")).toBe(false);
    expect(canSubmit("graded")).toBe(false);
    expect(canSubmit("ai_reviewed")).toBe(true);
  });

  it("say where the AI review stands", () => {
    const base = { status: "submitted" as const, hasText: true, feedback: null, configured: true, submittedAt: new Date(0).toISOString(), now: 1000 };
    expect(aiReviewState(base)).toBe("pending");
    expect(aiReviewState({ ...base, configured: false })).toBe("resting");
    expect(aiReviewState({ ...base, hasText: false })).toBe("mentor_only");
    expect(aiReviewState({ ...base, now: REVIEW_GIVE_UP_MS + 1 })).toBe("unavailable");
    expect(aiReviewState({ ...base, feedback: { summary: "s", criteria: [] } })).toBe("ready");
    expect(aiReviewState({ ...base, status: "graded" })).toBe("none");
  });

  it("put database errors in plain words", () => {
    expect(friendlyError("42501", "x")).toMatch(/can't do that/);
    expect(friendlyError(undefined, "fallback")).toBe("fallback");
  });
});
