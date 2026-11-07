import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CLIENT_EVENT_NAMES,
  EVENT_NAMES,
  EVENTS,
  LEGACY_EVENT_NAMES,
  PERSONAL_KEY,
  isClientEventName,
  isEventName,
  sanitizePath,
  sanitizeProps,
  scrubMessage,
  validateProps,
  type Field,
} from "./events";

/** The names private.is_event_name() accepts, from the newest migration that defines it. */
function databaseNames(): string[] {
  const dir = join(process.cwd(), "supabase/migrations");
  const latest = readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort()
    .filter((f) => readFileSync(join(dir, f), "utf8").includes("function private.is_event_name"))
    .at(-1);
  expect(latest, "a migration defines private.is_event_name").toBeDefined();
  const sql = readFileSync(join(dir, latest!), "utf8");
  const body = sql.slice(sql.indexOf("function private.is_event_name"), sql.indexOf("$$;", sql.indexOf("function private.is_event_name")));
  return [...body.replace(/--.*$/gm, "").matchAll(/'([a-z_]+)'/g)].map((m) => m[1]);
}

describe("event taxonomy", () => {
  it("covers every feature with about sixty or more events", () => {
    expect(EVENT_NAMES.length).toBeGreaterThanOrEqual(60);
    const features = new Set(Object.values(EVENTS).map((e) => e.feature));
    for (const feature of [
      "learn",
      "review",
      "study_buddy",
      "path",
      "experts",
      "bookings",
      "briefs",
      "opportunities",
      "outcomes",
      "community",
      "events",
      "chapters",
      "cohort",
      "certificates",
      "sharing",
      "notifications",
      "auth",
      "settings",
      "failures",
      "experience",
    ]) {
      expect(features, feature).toContain(feature);
    }
  });

  it("matches the database's list exactly (plus the Phase 1 names it still accepts)", () => {
    expect([...databaseNames()].sort()).toEqual([...EVENT_NAMES, ...LEGACY_EVENT_NAMES].sort());
  });

  it("names are snake case and unique", () => {
    for (const name of EVENT_NAMES) expect(name).toMatch(/^[a-z][a-z0-9_]{1,39}$/);
    expect(new Set([...EVENT_NAMES, ...LEGACY_EVENT_NAMES]).size).toBe(EVENT_NAMES.length + LEGACY_EVENT_NAMES.length);
  });

  it("rejects names outside the list", () => {
    expect(isEventName("signup")).toBe(true);
    expect(isEventName("made_up")).toBe(false);
    expect(isEventName("toString")).toBe(false);
    expect(isEventName(undefined)).toBe(false);
  });

  it("lets the browser send only browser events", () => {
    expect([...CLIENT_EVENT_NAMES].sort()).toEqual(
      ["client_error", "form_started", "form_submitted", "page_view", "share_clicked", "web_vital"].sort(),
    );
    expect(isClientEventName("page_view")).toBe(true);
    expect(isClientEventName("booking_requested")).toBe(false);
    expect(isClientEventName("action_failed")).toBe(false);
  });
});

describe("no personal data in props (enforced by the spec)", () => {
  const specs = Object.entries(EVENTS) as [string, { props: Record<string, Field> }][];

  it("no event declares a personal key", () => {
    for (const [name, spec] of specs) {
      for (const key of Object.keys(spec.props)) expect(PERSONAL_KEY.test(key), `${name}.${key}`).toBe(false);
    }
  });

  it("every prop is an id, slug, enum, count, measure, duration, flag or code; free text only on error events", () => {
    for (const [name, spec] of specs) {
      for (const [key, field] of Object.entries(spec.props)) {
        expect(["id", "slug", "enum", "count", "num", "ms", "flag", "code", "digest", "message"], `${name}.${key}`).toContain(field.kind);
        if (field.kind === "message" || field.kind === "digest") expect(name, `${name}.${key}`).toMatch(/_error$/);
        if (field.kind === "enum") expect(field.values.length, `${name}.${key}`).toBeGreaterThan(0);
      }
      expect(Object.keys(spec.props).length, name).toBeLessThanOrEqual(12);
    }
  });
});

describe("validateProps", () => {
  it("keeps the props the spec names, checked by kind", () => {
    expect(
      validateProps("node_completed", {
        roadmap: "data-analyst",
        node_id: "BBBBBBBB-0000-0000-0000-000000000001",
        via: "quiz",
      }),
    ).toEqual({ roadmap: "data-analyst", node_id: "bbbbbbbb-0000-0000-0000-000000000001", via: "quiz" });
  });

  it("drops unknown keys and values of the wrong kind", () => {
    expect(
      validateProps("node_completed", {
        roadmap: "Wumpini Alhassan",
        node_id: "not-a-uuid",
        via: "magic",
        email: "wumpini@example.test",
        extra: 1,
      }),
    ).toEqual({});
    expect(validateProps("booking_reviewed", { rating: 4.5 })).toEqual({});
    expect(validateProps("booking_reviewed", { rating: -1 })).toEqual({});
    expect(validateProps("booking_reviewed", { rating: 5 })).toEqual({ rating: 5 });
    expect(validateProps("event_rsvp", { going: "yes" })).toEqual({});
  });

  it("keeps a slug only if it does not look like an email or phone number", () => {
    expect(validateProps("lesson_opened", { roadmap: "0241234567" })).toEqual({});
    expect(validateProps("lesson_opened", { roadmap: "fuseini@example" })).toEqual({});
  });

  it("scrubs error messages and keeps short codes", () => {
    expect(
      validateProps("client_error", {
        kind: "error",
        message: "Cannot read 'x' for wumpini@example.test at https://example.test/a?b=1 code 0241234567\n    at stack",
        error: "TypeError",
        digest: "12345",
      }),
    ).toEqual({ kind: "error", message: "Cannot read [text] for [email] at [link] code #", error: "TypeError", digest: "12345" });
    expect(validateProps("action_failed", { action: "booking_requested", refusal: "rate_limited", code: "54000" })).toEqual({
      action: "booking_requested",
      refusal: "rate_limited",
      code: "54000",
    });
    expect(validateProps("action_failed", { refusal: "because I said so" })).toEqual({});
  });

  it("ignores anything that is not a plain object", () => {
    expect(validateProps("page_view", null)).toEqual({});
    expect(validateProps("page_view", [1])).toEqual({});
  });
});

describe("scrubMessage", () => {
  it("never keeps more than the first line or 120 characters", () => {
    expect(scrubMessage(`${"a".repeat(200)}\nsecond`)).toHaveLength(120);
    expect(scrubMessage("Failed\n    at Object.<anonymous> (/app/page.js:1:2)")).toBe("Failed");
    expect(scrubMessage("")).toBeNull();
    expect(scrubMessage(42)).toBeNull();
  });
});

describe("sanitizeProps", () => {
  it("keeps flat ids, slugs, counts and flags", () => {
    expect(
      sanitizeProps({
        roadmap: "data-analyst",
        node_id: "bbbbbbbb-0000-0000-0000-000000000001",
        score: 80,
        passed: true,
      }),
    ).toEqual({ roadmap: "data-analyst", node_id: "bbbbbbbb-0000-0000-0000-000000000001", score: 80, passed: true });
  });

  it("drops personal keys and values that look like an email or phone number", () => {
    expect(
      sanitizeProps({
        email: "wumpini@example.test",
        name: "Wumpini Alhassan",
        display_name: "Mariama",
        phone: "0241234567",
        note: "reach me at fuseini@example.test",
        referrer: "+233 24 123 4567",
        method: "email",
      }),
    ).toEqual({ method: "email" });
  });

  it("drops nested values, odd keys, long strings and non finite numbers", () => {
    expect(
      sanitizeProps({
        nested: { a: 1 },
        list: [1],
        "Bad Key": "x",
        long: "x".repeat(201),
        nan: Number.NaN,
        ok: 1,
      }),
    ).toEqual({ ok: 1 });
  });

  it("caps the number of keys", () => {
    const many = Object.fromEntries(Array.from({ length: 20 }, (_, i) => [`k${i}`, i]));
    expect(Object.keys(sanitizeProps(many))).toHaveLength(12);
  });

  it("ignores anything that is not a plain object", () => {
    expect(sanitizeProps(null)).toEqual({});
    expect(sanitizeProps("x")).toEqual({});
    expect(sanitizeProps([1, 2])).toEqual({});
  });
});

describe("sanitizePath", () => {
  it("strips the query string and fragment", () => {
    expect(sanitizePath("/programme?email=abdul@example.test#apply")).toBe("/programme");
  });

  it("refuses other sites and junk", () => {
    expect(sanitizePath("https://example.test/")).toBeNull();
    expect(sanitizePath("//example.test")).toBeNull();
    expect(sanitizePath(42)).toBeNull();
    expect(sanitizePath(`/${"a".repeat(300)}`)).toBeNull();
  });

  it("keeps ordinary paths", () => {
    expect(sanitizePath("/")).toBe("/");
    expect(sanitizePath("/about")).toBe("/about");
  });
});
