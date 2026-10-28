import { describe, expect, it } from "vitest";
import { answerField, parseAnswers } from "@/components/learn/quiz-data";
import { RESERVED_SKILL_SLUGS, parseAssessmentForm, parseRevokeReason, parseSkillForm } from "./admin";
import {
  attemptGate,
  authoringField,
  describeWait,
  isHttpsLink,
  keyMatchesQuestions,
  parseAnswerKey,
  parsePortfolioForm,
  parseQuizAuthoring,
  retryOpensAt,
  type Attempt,
} from "./assessment";
import { skillErrorMessage } from "./errors";
import { fromVerifiedSkillRows, parseVerifiedSkills, sourceLabel } from "./verified";

function form(entries: Record<string, string | number>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(entries)) f.set(k, String(v));
  return f;
}

describe("parseVerifiedSkills", () => {
  it("keeps well formed entries, one per slug, sorted by name", () => {
    const skills = parseVerifiedSkills([
      { slug: "spreadsheets", name: "Spreadsheets", source: "assessment", issued_at: "2026-10-02T10:00:00Z" },
      { slug: "mobile-money-records", name: "Mobile money records", source: "portfolio_review", issued_at: "2026-10-01T10:00:00Z" },
      { slug: "spreadsheets", name: "Spreadsheets again", source: "path_completion", issued_at: "2026-10-03T10:00:00Z" },
      { slug: "bought", name: "Bought", source: "payment", issued_at: "2026-10-03T10:00:00Z" },
      { slug: "", name: "No slug", source: "assessment", issued_at: "2026-10-03T10:00:00Z" },
      "nonsense",
      null,
    ]);
    expect(skills.map((s) => s.slug)).toEqual(["mobile-money-records", "spreadsheets"]);
    expect(skills[1]).toEqual({ slug: "spreadsheets", name: "Spreadsheets", source: "assessment", issuedAt: "2026-10-02T10:00:00Z" });
  });

  it("returns nothing for anything but an array", () => {
    expect(parseVerifiedSkills(null)).toEqual([]);
    expect(parseVerifiedSkills({ slug: "x" })).toEqual([]);
  });

  it("drops revoked rows and rows whose skill is hidden", () => {
    const rows = fromVerifiedSkillRows([
      { id: "a", source: "assessment", issued_at: "2026-10-01T00:00:00Z", revoked_at: null, skill: { slug: "sql", name: "SQL" } },
      { id: "b", source: "assessment", issued_at: "2026-10-01T00:00:00Z", revoked_at: "2026-10-05T00:00:00Z", skill: { slug: "css", name: "CSS" } },
      { id: "c", source: "path_completion", issued_at: "2026-10-01T00:00:00Z", skill: null },
    ]);
    expect(rows.map((r) => r.id)).toEqual(["a"]);
  });

  it("labels every source in plain words", () => {
    expect(sourceLabel("path_completion")).toBe("Completed the path");
    expect(sourceLabel("assessment")).toBe("Passed the assessment");
    expect(sourceLabel("portfolio_review")).toBe("Portfolio reviewed");
  });
});

describe("quiz answers sent to submit_skill_quiz", () => {
  const questions = [
    { id: "q1", prompt: "Mariama sells shea butter in Tamale. Which column total gives her weekly sales?", options: ["Price", "Quantity times price", "Date", "Customer name"] },
    { id: "q2", prompt: "Fuseini wants to share a sheet without letting people edit it. What does he choose?", options: ["Editor", "Viewer"] },
  ];

  it("sends options as numbers, because the grader compares jsonb values", () => {
    const answers = parseAnswers(form({ [answerField("q1")]: "1", [answerField("q2")]: "1" }), questions);
    expect(answers).toEqual({ q1: 1, q2: 1 });
    expect(typeof answers!.q1).toBe("number");
  });

  it("refuses a missing or out of range answer", () => {
    expect(parseAnswers(form({ [answerField("q1")]: "1" }), questions)).toBeNull();
    expect(parseAnswers(form({ [answerField("q1")]: "1", [answerField("q2")]: "5" }), questions)).toBeNull();
  });
});

describe("attemptGate", () => {
  const assessment = { id: "quiz-1", retry_after_hours: 24 };
  const attempt = (over: Partial<Attempt>): Attempt => ({
    id: crypto.randomUUID(),
    assessment_id: "quiz-1",
    kind: "quiz",
    status: "failed",
    score: 60,
    portfolio_url: null,
    review_note: null,
    reviewed_at: null,
    submitted_at: "2026-10-27T10:00:00Z",
    ...over,
  });
  const now = new Date("2026-10-27T20:00:00Z");

  it("is ready with no attempts", () => {
    expect(attemptGate([], assessment, now)).toEqual({ state: "ready", last: null });
  });

  it("waits 24 hours after a failed quiz, using the latest attempt", () => {
    const old = attempt({ submitted_at: "2026-10-20T10:00:00Z" });
    const last = attempt({});
    const gate = attemptGate([old, last], assessment, now);
    expect(gate.state).toBe("wait");
    expect(gate.state === "wait" && gate.until.toISOString()).toBe("2026-10-28T10:00:00.000Z");
    expect(attemptGate([last], assessment, new Date("2026-10-28T10:00:01Z")).state).toBe("ready");
  });

  it("ignores attempts at other assessments", () => {
    expect(attemptGate([attempt({ assessment_id: "other" })], assessment, now).state).toBe("ready");
  });

  it("holds while a portfolio is pending and counts the wait from the review", () => {
    const pending = attempt({ kind: "portfolio", status: "pending_review", score: null });
    expect(attemptGate([pending], assessment, now).state).toBe("pending");
    const rejected = attempt({ kind: "portfolio", status: "rejected", score: null, reviewed_at: "2026-10-27T19:00:00Z" });
    const gate = attemptGate([rejected], assessment, now);
    expect(gate.state === "wait" && gate.until.toISOString()).toBe("2026-10-28T19:00:00.000Z");
  });

  it("has no wait when the assessment allows instant retries", () => {
    expect(attemptGate([attempt({})], { id: "quiz-1", retry_after_hours: 0 }, now).state).toBe("ready");
  });

  it("computes the retry time and describes waits", () => {
    expect(retryOpensAt({ submitted_at: "2026-10-27T10:00:00Z", reviewed_at: null }, 2).toISOString()).toBe("2026-10-27T12:00:00.000Z");
    expect(describeWait(24)).toBe("one day");
    expect(describeWait(48)).toBe("2 days");
    expect(describeWait(1)).toBe("one hour");
    expect(describeWait(36)).toBe("36 hours");
  });
});

describe("portfolio form", () => {
  it("needs a full https link", () => {
    expect(isHttpsLink("https://github.com/wumpini/stock-sheet")).toBe(true);
    expect(isHttpsLink("http://github.com/wumpini")).toBe(false);
    expect(isHttpsLink("https://localhost/x")).toBe(false);
    expect(isHttpsLink(["https://", "wumpini", "@example.com"].join(""))).toBe(false);
    expect(isHttpsLink("github.com/wumpini")).toBe(false);
    expect(parsePortfolioForm(form({ portfolio_url: "  https://example.com/abdul-rahman  ", note: "" })).data).toEqual({
      url: "https://example.com/abdul-rahman",
      note: null,
    });
    expect(parsePortfolioForm(form({ portfolio_url: "" })).errors.portfolio_url).toBeTruthy();
  });
});

describe("parseQuizAuthoring", () => {
  it("numbers questions, drops empty options and re-indexes the right answer", () => {
    const { data, errors } = parseQuizAuthoring(
      form({
        [authoringField.count]: 2,
        [authoringField.prompt(0)]: "Hawa records each sale in a notebook. What is the first step to put it in a sheet?",
        [authoringField.option(0, 0)]: "Pick column headings",
        [authoringField.option(0, 1)]: "",
        [authoringField.option(0, 2)]: "Buy a laptop",
        [authoringField.correct(0)]: 0,
        [authoringField.prompt(1)]: "Issahaku's sheet has a blank row in the middle. What can that break?",
        [authoringField.option(1, 0)]: "The font",
        [authoringField.option(1, 1)]: "",
        [authoringField.option(1, 2)]: "Sorting and filtering",
        [authoringField.correct(1)]: 2,
      }),
    );
    expect(errors).toEqual({});
    expect(data.questions.map((q) => q.id)).toEqual(["q1", "q2"]);
    expect(data.questions[1].options).toEqual(["The font", "Sorting and filtering"]);
    expect(data.answerKey).toEqual({ q1: 0, q2: 1 });
    expect(keyMatchesQuestions(data.questions, data.answerKey)).toBe(true);
  });

  it("needs a prompt, two different options and a right answer that is one of them", () => {
    const { errors } = parseQuizAuthoring(
      form({
        [authoringField.count]: 3,
        [authoringField.prompt(0)]: "",
        [authoringField.option(0, 0)]: "Only one",
        [authoringField.prompt(1)]: "Which is right?",
        [authoringField.option(1, 0)]: "Same",
        [authoringField.option(1, 1)]: "same",
        [authoringField.correct(1)]: 0,
        [authoringField.prompt(2)]: "Which is right?",
        [authoringField.option(2, 0)]: "A",
        [authoringField.option(2, 1)]: "B",
        [authoringField.correct(2)]: 3,
      }),
    );
    expect(errors[authoringField.prompt(0)]).toBeTruthy();
    expect(errors["options:0"]).toBeTruthy();
    expect(errors[authoringField.correct(0)]).toBeTruthy();
    expect(errors["options:1"]).toBe("Each option must be different.");
    expect(errors[authoringField.correct(2)]).toBeTruthy();
  });

  it("refuses an empty quiz", () => {
    expect(parseQuizAuthoring(form({ [authoringField.count]: 0 })).errors.form).toBeTruthy();
  });

  it("checks a stored key covers exactly the questions", () => {
    const questions = [
      { id: "q1", prompt: "One", options: ["a", "b"] },
      { id: "q2", prompt: "Two", options: ["a", "b"] },
    ];
    expect(keyMatchesQuestions(questions, { q1: 0, q2: 1 })).toBe(true);
    expect(keyMatchesQuestions(questions, { q1: 0 })).toBe(false);
    expect(keyMatchesQuestions(questions, { q1: 0, q2: 1, q3: 0 })).toBe(false);
    expect(keyMatchesQuestions(questions, { q1: 0, q2: 2 })).toBe(false);
    expect(keyMatchesQuestions(questions, { q1: 0, q2: "1" })).toBe(false);
    expect(parseAnswerKey({ q1: 1, q2: "x" })).toEqual({ q1: 1 });
  });
});

describe("admin forms", () => {
  it("makes a slug from the name and keeps it within the database rule", () => {
    const { data, errors } = parseSkillForm(form({ name: "Mobile Money Records!", summary: "" }));
    expect(errors).toEqual({});
    expect(data).toEqual({ name: "Mobile Money Records!", slug: "mobile-money-records", summary: null });
    const long = parseSkillForm(form({ name: "a".repeat(70) }));
    expect(long.data.slug.length).toBeLessThanOrEqual(50);
    expect(long.errors.slug).toBeUndefined();
  });

  it("reserves slugs used by static routes under /skills", () => {
    expect(RESERVED_SKILL_SLUGS.has("reviews")).toBe(true);
    expect(parseSkillForm(form({ name: "Reviews" })).errors.slug).toMatch(/another page/);
    expect(parseSkillForm(form({ name: "SQL", slug: "Bad Slug" })).errors.slug).toBeTruthy();
  });

  it("parses assessment settings with defaults and bounds", () => {
    expect(parseAssessmentForm(form({ kind: "quiz", title: "Spreadsheet check" })).data).toEqual({
      kind: "quiz",
      title: "Spreadsheet check",
      instructions: null,
      pass_threshold: 80,
      retry_after_hours: 24,
    });
    const bad = parseAssessmentForm(form({ kind: "exam", title: "", pass_threshold: "101", retry_after_hours: "-1" }));
    expect(Object.keys(bad.errors).sort()).toEqual(["kind", "pass_threshold", "retry_after_hours", "title"]);
    expect(parseAssessmentForm(form({ kind: "quiz", title: "Portfolio" }), "portfolio").data.kind).toBe("portfolio");
  });

  it("needs a reason to revoke", () => {
    expect(parseRevokeReason(form({ reason: "  " })).error).toBeTruthy();
    expect(parseRevokeReason(form({ reason: "Approved by mistake" })).error).toBeUndefined();
  });
});

describe("skillErrorMessage", () => {
  it("passes known messages through as friendly copy and hides the rest", () => {
    expect(skillErrorMessage({ code: "22023", message: "Try again later" })).toMatch(/Try again later/);
    expect(skillErrorMessage({ code: "42501", message: "You cannot review your own work" })).toBe("You cannot review your own work.");
    expect(skillErrorMessage({ code: "P0002", message: "Assessment not found" })).toBe("This assessment is not open right now.");
    expect(skillErrorMessage({ code: "XX000", message: "relation does not exist" })).toBe("Something went wrong. Try again.");
    expect(skillErrorMessage(null)).toBe("Something went wrong. Try again.");
  });

  it("never uses dashes in user copy", () => {
    for (const msg of [
      skillErrorMessage({ message: "Try again later" }),
      skillErrorMessage({ message: "Your portfolio is waiting for review" }),
      skillErrorMessage({ code: "42501" }),
    ]) {
      expect(msg).not.toMatch(/[–—]| - /);
    }
  });
});
