import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  addMonths,
  chooseToSend,
  dueCheckin,
  EARNINGS_BANDS,
  finishWindow,
  parseCheckin,
  parseCheckinMonths,
  planCheckins,
  responseRate,
  shapeReport,
  WORK_STATUS_VALUES,
  type Finish,
} from "./checkins";
import { runOutcomeCheckins, type CheckinStore, type CreatedCheckin } from "./checkins-run";

const WUMPINI = "10000000-0000-0000-0000-000000000001";
const MARIAMA = "10000000-0000-0000-0000-000000000002";
const COHORT = "0d000000-0000-0000-0000-000000000001";
const ROADMAP = "0f000000-0000-0000-0000-000000000001";

const cohortFinish = (profile_id: string, finished_on: string): Finish => ({
  profile_id,
  source: "cohort",
  cohort_id: COHORT,
  roadmap_id: null,
  finished_on,
  baseline_status: "looking",
});

describe("addMonths", () => {
  it("adds calendar months", () => {
    expect(addMonths("2026-03-30", 3)).toBe("2026-06-30");
    expect(addMonths("2026-03-30", 12)).toBe("2027-03-30");
  });
  it("keeps the 31st inside shorter months", () => {
    expect(addMonths("2026-08-31", 6)).toBe("2027-02-28");
    expect(addMonths("2027-08-31", 6)).toBe("2028-02-29");
    expect(addMonths("2026-05-31", 3)).toBe("2026-08-31");
  });
});

describe("dueCheckin", () => {
  it("is nothing before three months", () => {
    expect(dueCheckin("2026-03-30", "2026-06-29")).toBeNull();
  });
  it("is the 3 month check in on its due date", () => {
    expect(dueCheckin("2026-03-30", "2026-06-30")).toEqual({ months: 3, dueOn: "2026-06-30" });
  });
  it("catches up within 30 days of the due date", () => {
    expect(dueCheckin("2026-03-30", "2026-07-30")).toEqual({ months: 3, dueOn: "2026-06-30" });
    expect(dueCheckin("2026-03-30", "2026-07-31")).toBeNull();
  });
  it("moves on to 6 and 12 months", () => {
    expect(dueCheckin("2026-03-30", "2026-10-01")).toEqual({ months: 6, dueOn: "2026-09-30" });
    expect(dueCheckin("2026-03-30", "2027-03-30")).toEqual({ months: 12, dueOn: "2027-03-30" });
  });
  it("stops after the 12 month window", () => {
    expect(dueCheckin("2026-03-30", "2027-05-01")).toBeNull();
    expect(dueCheckin("2024-01-01", "2026-11-13")).toBeNull();
  });
});

describe("finishWindow", () => {
  it("covers every finish that can be due today", () => {
    const today = "2026-11-13";
    const { from, to } = finishWindow(today);
    for (const finished of ["2026-08-13", "2026-05-13", "2025-11-13", "2025-10-14"]) {
      expect(dueCheckin(finished, today)).not.toBeNull();
      expect(finished >= from && finished <= to).toBe(true);
    }
  });
});

describe("planCheckins", () => {
  const today = "2026-10-01";
  it("plans the due milestone for each finish", () => {
    const plan = planCheckins([cohortFinish(WUMPINI, "2026-03-30")], [], today);
    expect(plan).toEqual([{ ...cohortFinish(WUMPINI, "2026-03-30"), months: 6, due_on: "2026-09-30" }]);
  });
  it("skips a milestone that already exists, or a later one", () => {
    const existing = [{ profile_id: WUMPINI, source: "cohort" as const, cohort_id: COHORT, roadmap_id: null, months: 6 }];
    expect(planCheckins([cohortFinish(WUMPINI, "2026-03-30")], existing, today)).toEqual([]);
    const later = [{ ...existing[0], months: 12 }];
    expect(planCheckins([cohortFinish(WUMPINI, "2026-03-30")], later, today)).toEqual([]);
  });
  it("plans the next milestone once the earlier one exists", () => {
    const existing = [{ profile_id: WUMPINI, source: "cohort" as const, cohort_id: COHORT, roadmap_id: null, months: 3 }];
    expect(planCheckins([cohortFinish(WUMPINI, "2026-03-30")], existing, today)).toHaveLength(1);
  });
  it("keeps a cohort and a track for the same learner apart", () => {
    const track: Finish = { ...cohortFinish(WUMPINI, "2026-03-30"), source: "track", cohort_id: null, roadmap_id: ROADMAP };
    expect(planCheckins([cohortFinish(WUMPINI, "2026-03-30"), track], [], today)).toHaveLength(2);
  });
});

describe("chooseToSend", () => {
  const today = "2026-10-01";
  it("sends one per learner per run, the earliest due", () => {
    const created = [
      { id: "b", profile_id: WUMPINI, due_on: "2026-09-30" },
      { id: "a", profile_id: WUMPINI, due_on: "2026-09-20" },
      { id: "c", profile_id: MARIAMA, due_on: "2026-09-30" },
    ];
    const { send, skip } = chooseToSend(created, new Map(), today);
    expect(send.map((c) => c.id)).toEqual(["a", "c"]);
    expect(skip.map((c) => c.id)).toEqual(["b"]);
  });
  it("skips a learner sent one in the last 60 days", () => {
    const created = [{ id: "a", profile_id: WUMPINI, due_on: "2026-09-30" }];
    expect(chooseToSend(created, new Map([[WUMPINI, "2026-08-10"]]), today).skip).toHaveLength(1);
    expect(chooseToSend(created, new Map([[WUMPINI, "2026-08-01"]]), today).send).toHaveLength(1);
  });
});

describe("runOutcomeCheckins", () => {
  function fakeStore(finishes: Finish[]) {
    const calls = { notified: [] as string[], sent: [] as string[], skipped: [] as string[], events: [] as number[] };
    let n = 0;
    const store: CheckinStore = {
      finishes: async () => finishes,
      existing: async () => [],
      create: async (rows) => rows.map((r) => ({ id: `c${++n}`, profile_id: r.profile_id, months: r.months, due_on: r.due_on })),
      lastSentOn: async () => new Map(),
      markSent: async (id) => void calls.sent.push(id),
      markSkipped: async (ids) => void calls.skipped.push(...ids),
      whatsappNumbers: async () => new Map([[MARIAMA, { phone: "+233200000000", displayName: "Mariama Seidu" }]]),
      notify: async (profileId) => void calls.notified.push(profileId),
      recordSent: async (months) => void calls.events.push(...months),
    };
    return { store, calls };
  }

  it("creates, notifies, messages consenting learners and records the event", async () => {
    const { store, calls } = fakeStore([cohortFinish(WUMPINI, "2026-03-30"), cohortFinish(MARIAMA, "2026-03-30")]);
    const whatsapp: { phone: string; checkin: CreatedCheckin }[] = [];
    const summary = await runOutcomeCheckins({
      store,
      today: "2026-10-01",
      sendWhatsApp: async (phone, checkin) => {
        whatsapp.push({ phone, checkin });
        return { status: "skipped", reason: "not_configured" };
      },
    });
    expect(summary).toEqual({ created: 2, sent: 2, skipped: 0, whatsapp: 0, failed: 0 });
    expect(calls.notified).toEqual([WUMPINI, MARIAMA]);
    expect(whatsapp.map((w) => w.phone)).toEqual(["+233200000000"]);
    expect(calls.events).toEqual([6, 6]);
  });

  it("does nothing when no finish is due", async () => {
    const { store, calls } = fakeStore([cohortFinish(WUMPINI, "2026-09-01")]);
    const summary = await runOutcomeCheckins({ store, today: "2026-10-01", sendWhatsApp: async () => ({ status: "sent", sid: "x" }) });
    expect(summary.created).toBe(0);
    expect(calls.notified).toEqual([]);
  });
});

describe("parseCheckin", () => {
  const form = (entries: [string, string][]) => {
    const f = new FormData();
    for (const [k, v] of entries) f.append(k, v);
    return f;
  };
  it("needs a status", () => {
    expect(parseCheckin(form([]), []).errors?.work_status).toBeDefined();
  });
  it("accepts a full answer", () => {
    const parsed = parseCheckin(
      form([
        ["work_status", "freelance"],
        ["organisation", " Shea Butter Collective "],
        ["earnings_band", "1000_2000"],
        ["skills", "data-analyst"],
        ["share", "on"],
      ]),
      ["data-analyst"],
    );
    expect(parsed.data).toEqual({
      work_status: "freelance",
      organisation: "Shea Butter Collective",
      earnings_band: "1000_2000",
      skills: ["data-analyst"],
      share: true,
    });
  });
  it("refuses skills that are not the learner's own", () => {
    expect(parseCheckin(form([["work_status", "employed"], ["skills", "brain-surgery"]]), ["data-analyst"]).errors?.skills).toBeDefined();
  });
  it("leaves optional answers empty and sharing off", () => {
    expect(parseCheckin(form([["work_status", "looking"]]), []).data).toEqual({
      work_status: "looking",
      organisation: null,
      earnings_band: null,
      skills: [],
      share: false,
    });
  });
});

describe("reports", () => {
  it("shapes the rows and orders the buckets", () => {
    const report = shapeReport([
      { metric: "sent", bucket: "all", people: 8 },
      { metric: "answered", bucket: "all", people: 5 },
      { metric: "after", bucket: "looking", people: 1 },
      { metric: "after", bucket: "employed", people: 4 },
    ]);
    expect(report.sent).toBe(8);
    expect(report.learners).toBeNull();
    expect(report.after.map((r) => r.bucket)).toEqual(["employed", "looking"]);
  });
  it("shows the response rate honestly", () => {
    expect(responseRate(5, 8)).toBe("5 of 8 (63%)");
    expect(responseRate(0, 0)).toBe("No check ins sent yet");
    expect(responseRate(null, 6)).toBe("Too few to show yet");
  });
  it("reads the months search param, 6 by default", () => {
    expect(parseCheckinMonths("12")).toBe(12);
    expect(parseCheckinMonths("7")).toBe(6);
    expect(parseCheckinMonths(undefined)).toBe(6);
  });
});

describe("the migration", () => {
  const sql = readFileSync(join(process.cwd(), "supabase/migrations/20261114500000_outcome_checkins.sql"), "utf8");
  const list = (column: string) => {
    const m = new RegExp(`${column}\\s+text check \\(${column} = any \\(array\\[([^\\]]+)\\]`).exec(sql);
    return m ? [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]) : [];
  };
  it("accepts the same statuses and earnings bands as the form", () => {
    expect(list("work_status")).toEqual(WORK_STATUS_VALUES);
    expect(list("earnings_band")).toEqual(EARNINGS_BANDS.map((b) => b.value));
  });
});
