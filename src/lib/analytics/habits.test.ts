import { describe, expect, it } from "vitest";
import { daysSince, hourBand, localDay, sessionProps, weekday } from "./habits";
import { validateProps } from "./events";

const at = (iso: string) => new Date(iso); // no Z: local time

describe("hourBand", () => {
  it.each([
    ["2026-11-13T00:30:00", "night"],
    ["2026-11-13T04:59:00", "night"],
    ["2026-11-13T05:00:00", "morning"],
    ["2026-11-13T11:59:00", "morning"],
    ["2026-11-13T12:00:00", "afternoon"],
    ["2026-11-13T17:00:00", "evening"],
    ["2026-11-13T21:00:00", "late"],
  ])("%s is %s", (iso, band) => expect(hourBand(at(iso))).toBe(band));
});

describe("days since the last session", () => {
  it("counts whole local days", () => {
    expect(daysSince("2026-11-13", at("2026-11-13T23:00:00"))).toBe(0);
    expect(daysSince("2026-11-12", at("2026-11-13T00:10:00"))).toBe(1);
    expect(daysSince("2026-10-14", at("2026-11-13T09:00:00"))).toBe(30);
  });
  it("is null for a first session, junk or a future date, and capped", () => {
    expect(daysSince(null, at("2026-11-13T09:00:00"))).toBeNull();
    expect(daysSince("yesterday", at("2026-11-13T09:00:00"))).toBeNull();
    expect(daysSince("2026-11-20", at("2026-11-13T09:00:00"))).toBeNull();
    expect(daysSince("2020-01-01", at("2026-11-13T09:00:00"))).toBe(999);
  });
  it("round trips with localDay", () => {
    const now = at("2026-03-01T08:00:00");
    expect(daysSince(localDay(now), now)).toBe(0);
  });
});

describe("sessionProps", () => {
  it("describes a returning session and passes the taxonomy", () => {
    const props = sessionProps(at("2026-11-13T19:30:00"), "2026-11-10");
    expect(props).toEqual({ hour_band: "evening", weekday: weekday(at("2026-11-13T19:30:00")), days_since_last: 3, returning: true });
    expect(validateProps("session_started", props)).toEqual(props);
  });
  it("describes a first session", () => {
    expect(sessionProps(at("2026-11-13T07:00:00"), null)).toEqual({ hour_band: "morning", weekday: "fri", returning: false });
  });
});
