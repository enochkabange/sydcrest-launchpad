import { describe, expect, it } from "vitest";
import { accraDay, capStatus, LIMIT_MESSAGE, reservationStatus } from "./cap";
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

describe("reservationStatus", () => {
  it("allows reservations up to and including the limit", () => {
    expect(reservationStatus(1)).toEqual({ used: 1, limit: 30, remaining: 29, allowed: true });
    expect(reservationStatus(30)).toEqual({ used: 30, limit: 30, remaining: 0, allowed: true });
  });

  it("refuses a reservation past the limit", () => {
    expect(reservationStatus(31)).toMatchObject({ remaining: 0, allowed: false });
    expect(reservationStatus(4, 3)).toMatchObject({ allowed: false });
  });

  it("refuses when nothing was reserved", () => {
    expect(reservationStatus(null).allowed).toBe(false);
    expect(reservationStatus(0).allowed).toBe(false);
  });

  it("lets exactly the remaining allowance through when requests race", async () => {
    // Stand in for record_ai_usage: the row lock means each caller gets a distinct count.
    let messages = 27;
    const reserve = async () => {
      await Promise.resolve();
      messages += 1;
      return messages;
    };
    const results = await Promise.all(Array.from({ length: 10 }, async () => reservationStatus(await reserve())));
    expect(results.filter((r) => r.allowed)).toHaveLength(3);
    expect(results.filter((r) => r.allowed).map((r) => r.remaining).sort()).toEqual([0, 1, 2]);
  });
});
