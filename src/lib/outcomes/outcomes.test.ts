import { describe, expect, it } from "vitest";
import { formatDay, isOutcomeType, outcomeTypeLabel } from "./labels";
import { cohortPhase, formatRate, parseMonths, rate, summariseImpact, totalCohorts } from "./stats";
import { parseOutcome } from "./validation";

// Noon in Accra on 27 October 2026.
const NOW = new Date("2026-10-27T12:00:00Z");

function form(fields: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}

const valid = {
  type: "internship",
  title: "Data analyst intern",
  organisation_name: "Tamale Teaching Hospital",
  started_on: "2026-09-01",
  evidence_url: "https://example.com/offer-letter",
  evidence_note: "",
};

describe("parseOutcome", () => {
  it("accepts a complete outcome and keeps only the learner's columns", () => {
    const { data, errors } = parseOutcome(form(valid), NOW);
    expect(errors).toEqual({});
    expect(data).toEqual({
      type: "internship",
      title: "Data analyst intern",
      organisation_name: "Tamale Teaching Hospital",
      started_on: "2026-09-01",
      evidence_url: "https://example.com/offer-letter",
      evidence_note: null,
    });
  });

  it("turns blank optional fields into null", () => {
    const { data } = parseOutcome(form({ ...valid, title: "  ", evidence_url: "", evidence_note: "Offer letter shown to Mariama" }), NOW);
    expect(data?.title).toBeNull();
    expect(data?.evidence_url).toBeNull();
    expect(data?.evidence_note).toBe("Offer letter shown to Mariama");
  });

  it("needs a known type, an organisation and a date", () => {
    const { errors, data } = parseOutcome(form({ ...valid, type: "promotion", organisation_name: "", started_on: "" }), NOW);
    expect(data).toBeUndefined();
    expect(Object.keys(errors).sort()).toEqual(["organisation_name", "started_on", "type"]);
  });

  it("needs some evidence", () => {
    const { errors } = parseOutcome(form({ ...valid, evidence_url: "", evidence_note: "" }), NOW);
    expect(errors.evidence_note).toMatch(/link or a note/);
  });

  it("rejects links the database would reject", () => {
    for (const url of ["example.com/offer", "ftp://example.com", "https://exa mple.com", `https://example.com/${"a".repeat(2000)}`]) {
      expect(parseOutcome(form({ ...valid, evidence_url: url }), NOW).errors.evidence_url).toBeDefined();
    }
  });

  it("rejects impossible, early and future dates, using Ghana time", () => {
    expect(parseOutcome(form({ ...valid, started_on: "2026-02-30" }), NOW).errors.started_on).toBeDefined();
    expect(parseOutcome(form({ ...valid, started_on: "2019-12-31" }), NOW).errors.started_on).toBeDefined();
    expect(parseOutcome(form({ ...valid, started_on: "2026-10-28" }), NOW).errors.started_on).toMatch(/once it has started/);
    expect(parseOutcome(form({ ...valid, started_on: "2026-10-27" }), NOW).errors.started_on).toBeUndefined();
  });

  it("limits lengths to the table's checks", () => {
    const { errors } = parseOutcome(
      form({ ...valid, title: "a".repeat(141), organisation_name: "b".repeat(121), evidence_note: "c".repeat(1001) }),
      NOW,
    );
    expect(Object.keys(errors).sort()).toEqual(["evidence_note", "organisation_name", "title"]);
  });
});

describe("labels", () => {
  it("knows the five database types", () => {
    for (const t of ["job", "internship", "freelance_contract", "scholarship", "grant"]) expect(isOutcomeType(t)).toBe(true);
    expect(isOutcomeType("promotion")).toBe(false);
    expect(outcomeTypeLabel("freelance_contract")).toBe("Freelance contract");
  });

  it("formats a calendar date without shifting the day", () => {
    expect(formatDay("2027-01-04")).toBe("4 Jan 2027");
  });
});

describe("summariseImpact", () => {
  it("is empty when nothing is verified", () => {
    expect(summariseImpact([])).toEqual({ total: 0, byType: [] });
  });

  it("totals outcomes, keeps the type order and drops unknown or empty types", () => {
    const summary = summariseImpact([
      { type: "scholarship", verified_count: 2, verified_people: 2 },
      { type: "job", verified_count: 3, verified_people: 2 },
      { type: "grant", verified_count: 0, verified_people: 0 },
      { type: "promotion", verified_count: 9, verified_people: 9 },
    ]);
    expect(summary.total).toBe(5);
    expect(summary.byType.map((t) => [t.value, t.count, t.people])).toEqual([
      ["job", 3, 2],
      ["scholarship", 2, 2],
    ]);
  });
});

describe("North Star helpers", () => {
  it("computes whole percentages and says so when there is no one to count", () => {
    expect(rate(1, 3)).toBe(33);
    expect(rate(0, 0)).toBeNull();
    expect(formatRate(2, 8)).toBe("25%");
    expect(formatRate(0, 0)).toBe("No learners yet");
  });

  it("places a cohort on the outcome clock", () => {
    const row = { starts_on: "2027-01-11", ends_on: "2027-04-05", window_ends_on: "2027-10-05" };
    expect(cohortPhase(row, "2026-12-01")).toBe("not_started");
    expect(cohortPhase(row, "2027-04-05")).toBe("running");
    expect(cohortPhase(row, "2027-10-05")).toBe("window_open");
    expect(cohortPhase(row, "2027-10-06")).toBe("window_closed");
  });

  it("adds up cohorts", () => {
    expect(
      totalCohorts([
        { learners: 25, completed: 20, certified: 18, placed: 7 },
        { learners: 10, completed: 8, certified: 8, placed: 2 },
      ]),
    ).toEqual({ learners: 35, completed: 28, certified: 26, placed: 9 });
  });

  it("only allows the offered windows and defaults to six months", () => {
    expect(parseMonths("12")).toBe(12);
    expect(parseMonths(["3"])).toBe(3);
    expect(parseMonths("7")).toBe(6);
    expect(parseMonths(undefined)).toBe(6);
  });
});
