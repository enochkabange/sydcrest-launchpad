import { describe, expect, it } from "vitest";
import { DEFAULT_PREFS, newerPrefs, parseDisplayPrefs, parseStoredPrefs } from "./prefs";

describe("parseDisplayPrefs", () => {
  it("keeps valid values", () => {
    const p = { theme: "dark", textSize: 125, motion: "reduce", contrast: "more", underlineLinks: true, spacing: "wide", font: "system", updatedAt: 5 };
    expect(parseDisplayPrefs(p)).toEqual(p);
  });

  it("falls back per field and drops unknown keys", () => {
    expect(parseDisplayPrefs({ theme: "sepia", textSize: "125", evil: 1, updatedAt: -3 })).toEqual(DEFAULT_PREFS);
    expect(parseDisplayPrefs(null)).toEqual(DEFAULT_PREFS);
    expect(parseDisplayPrefs([1, 2])).toEqual(DEFAULT_PREFS);
  });

  it("reads stored text safely", () => {
    expect(parseStoredPrefs(null)).toEqual(DEFAULT_PREFS);
    expect(parseStoredPrefs("{oops")).toEqual(DEFAULT_PREFS);
    expect(parseStoredPrefs('{"theme":"light"}').theme).toBe("light");
  });
});

describe("newerPrefs", () => {
  const at = (updatedAt: number) => ({ ...DEFAULT_PREFS, updatedAt });
  it("takes the newer copy", () => {
    expect(newerPrefs(at(1), at(2))).toBe("remote");
    expect(newerPrefs(at(3), at(2))).toBe("local");
    expect(newerPrefs(at(2), at(2))).toBe("same");
  });
  it("never lets an unset profile override the device", () => {
    expect(newerPrefs(at(0), null)).toBe("same");
    expect(newerPrefs(at(4), at(0))).toBe("local");
    expect(newerPrefs(at(0), at(0))).toBe("same");
  });
});
