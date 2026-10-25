import { describe, expect, it } from "vitest";
import { accraDay, capStatus, LIMIT_MESSAGE } from "./cap";
import { DAILY_MESSAGE_LIMIT } from "./config";

describe("capStatus", () => {
  it("allows about 30 messages a day", () => {
    expect(DAILY_MESSAGE_LIMIT).toBe(30);
  });

  it("allows a learner with no usage yet", () => {
    expect(capStatus(null)).toEqual({ used: 0, limit: 30, remaining: 30, allowed: true });
    expect(capStatus(undefined).allowed).toBe(true);
  });

  it("counts down and blocks at the limit", () => {
    expect(capStatus(29)).toMatchObject({ remaining: 1, allowed: true });
    expect(capStatus(30)).toMatchObject({ remaining: 0, allowed: false });
    expect(capStatus(45)).toMatchObject({ remaining: 0, allowed: false });
  });

  it("respects a custom limit and ignores nonsense counts", () => {
    expect(capStatus(2, 3)).toMatchObject({ remaining: 1, allowed: true });
    expect(capStatus(-4)).toMatchObject({ used: 0, remaining: 30 });
  });

  it("has a friendly limit message without dashes", () => {
    expect(LIMIT_MESSAGE).toMatch(/midnight/);
    expect(LIMIT_MESSAGE).not.toMatch(/[–—]| - /);
  });
});

describe("accraDay", () => {
  it("uses the UTC calendar day, which is Accra time", () => {
    expect(accraDay(new Date("2026-10-25T23:59:59Z"))).toBe("2026-10-25");
    expect(accraDay(new Date("2026-10-26T00:00:01Z"))).toBe("2026-10-26");
  });
});
