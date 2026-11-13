import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { EVENTS } from "@/lib/analytics/events";
import { CONTACT_KINDS, RISK_REASONS, reasonText, riskLevel, riskReasons, sortCaseload, usualGap, type RiskInput } from "./rules";

const base: RiskInput = {
  stage: "active",
  daysQuiet: 1,
  active14: 3,
  active56: 10,
  topicsRecent: 2,
  topicsPrior: 6,
  quizFails: 0,
  topicsStarted: 4,
  pathAge: 30,
  deadlinesMissed: 0,
};

// The same cases are in supabase/tests/database/early_warning.test.sql, so the SQL and this mirror agree.
const CASES: [string, Partial<RiskInput>, string[], string][] = [
  ["on track", {}, [], "none"],
  ["streak broken after a habit", { daysQuiet: 4, active14: 6, active56: 20 }, ["streak_broken"], "watch"],
  ["quiet against their own rhythm", { stage: "slipping", daysQuiet: 10, active14: 2, active56: 14 }, ["went_quiet", "slipping"], "at_risk"],
  ["a rare visitor is not quiet yet", { stage: "slipping", daysQuiet: 10, active14: 1, active56: 3 }, ["slipping"], "watch"],
  ["dormant", { stage: "dormant", daysQuiet: 30, active14: 1, active56: 2 }, ["dormant"], "at_risk"],
  ["gone too long to flag", { stage: "dormant", daysQuiet: 90, active14: 1, active56: 8 }, [], "none"],
  ["pace slowing", { topicsRecent: 1, topicsPrior: 8 }, ["pace_slowing"], "watch"],
  ["quiz stuck", { quizFails: 3 }, ["quiz_stuck"], "watch"],
  ["path saved, no first topic", { stage: "not_started", topicsStarted: 0, pathAge: 9, topicsPrior: 0, topicsRecent: 0 }, ["no_first_topic"], "watch"],
  ["path saved recently", { stage: "new", topicsStarted: 0, pathAge: 3, topicsPrior: 0, topicsRecent: 0 }, [], "none"],
  ["missed deadlines", { deadlinesMissed: 2 }, ["missed_deadlines"], "at_risk"],
  ["two watch reasons make at risk", { quizFails: 4, topicsRecent: 0, topicsPrior: 5 }, ["pace_slowing", "quiz_stuck"], "at_risk"],
  ["never active", { stage: "not_started", daysQuiet: null, active14: 0, active56: 0, topicsStarted: 0, pathAge: null, topicsPrior: 0, topicsRecent: 0 }, [], "none"],
];

describe("risk rules", () => {
  it.each(CASES)("%s", (_name, over, reasons, level) => {
    const got = riskReasons({ ...base, ...over });
    expect(got).toEqual(reasons);
    expect(riskLevel(got)).toBe(level);
  });

  it("works out the usual gap only from three active days", () => {
    expect(usualGap(2)).toBeNull();
    expect(usualGap(3)).toBe(19);
    expect(usualGap(28)).toBe(2);
  });

  it("explains every reason in plain words, without dashes", () => {
    for (const r of RISK_REASONS) {
      const plain = reasonText(r);
      const detailed = reasonText(r, { days_quiet: 12, usual_gap_days: 3, topics_recent: 1, topics_prior: 8, quiz_fails: 4, deadlines_missed: 2 });
      for (const text of [plain, detailed]) {
        expect(text).toMatch(/^[A-Z].*\.$/);
        expect(text).not.toMatch(/[–—]| - /);
      }
    }
    expect(reasonText("went_quiet", { days_quiet: 12, usual_gap_days: 3 })).toBe("Quiet for 12 days, when they usually come back every 3 days.");
  });
});

describe("the caseload order", () => {
  it("puts risk first, then the longest since contact, then the nearest deadline", () => {
    const rows = [
      { display_name: "Mariama", level: "none", last_contact_at: null, next_due_on: "2026-11-20" },
      { display_name: "Fuseini", level: "watch", last_contact_at: "2026-11-10T10:00:00Z", next_due_on: null },
      { display_name: "Wumpini", level: "at_risk", last_contact_at: "2026-11-12T10:00:00Z", next_due_on: null },
      { display_name: "Abdul-Rahman", level: "at_risk", last_contact_at: null, next_due_on: "2026-11-21" },
      { display_name: "Hawa", level: "watch", last_contact_at: "2026-11-10T10:00:00Z", next_due_on: "2026-11-15" },
    ];
    expect(sortCaseload(rows).map((r) => r.display_name)).toEqual(["Abdul-Rahman", "Wumpini", "Hawa", "Fuseini", "Mariama"]);
  });
});

describe("the database", () => {
  const sql = readFileSync(join(process.cwd(), "supabase/migrations/20261114200000_early_warning.sql"), "utf8");

  it("allows exactly the reason codes the rules use", () => {
    const check = sql.match(/reasons\s+text\[\] not null default '\{\}' check \(reasons <@ array\[([^\]]+)\]/);
    expect(check).not.toBeNull();
    const codes = [...check![1].matchAll(/'([a-z_]+)'/g)].map((m) => m[1]);
    expect(codes).toEqual([...RISK_REASONS]);
  });

  it("allows exactly the contact kinds the event records", () => {
    expect(sql).toContain(`kind in (${CONTACT_KINDS.map((k) => `'${k}'`).join(", ")})`);
    expect(EVENTS.mentor_contact_logged.props.kind.values).toEqual(CONTACT_KINDS);
  });
});
