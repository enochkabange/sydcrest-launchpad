import { describe, expect, it } from "vitest";
import { EVENT_NAMES, isEventName, sanitizePath, sanitizeProps } from "./events";

describe("event taxonomy", () => {
  it("is the seven funnel events", () => {
    expect([...EVENT_NAMES].sort()).toEqual(
      ["invite_sent", "node_completed", "node_started", "page_view", "path_viewed", "quiz_run", "signup"].sort(),
    );
  });

  it("rejects names outside the list", () => {
    expect(isEventName("signup")).toBe(true);
    expect(isEventName("made_up")).toBe(false);
    expect(isEventName(undefined)).toBe(false);
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
