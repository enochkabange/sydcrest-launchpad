import { describe, expect, it } from "vitest";
import { isConstrainedConnection } from "./connection";

describe("isConstrainedConnection", () => {
  it("treats a missing API as a normal connection", () => {
    expect(isConstrainedConnection(undefined)).toBe(false);
    expect(isConstrainedConnection(null)).toBe(false);
    expect(isConstrainedConnection({})).toBe(false);
  });

  it("respects the data saver setting whatever the link speed", () => {
    expect(isConstrainedConnection({ saveData: true, effectiveType: "4g" })).toBe(true);
  });

  it("flags 2G class links", () => {
    expect(isConstrainedConnection({ effectiveType: "2g" })).toBe(true);
    expect(isConstrainedConnection({ effectiveType: "slow-2g" })).toBe(true);
  });

  it("leaves 3G and 4G alone", () => {
    expect(isConstrainedConnection({ effectiveType: "3g", saveData: false })).toBe(false);
    expect(isConstrainedConnection({ effectiveType: "4g" })).toBe(false);
  });
});
