import { describe, expect, it } from "vitest";
import { isAnonymousId, newAnonymousId } from "./anonymous-id";

describe("anonymous id", () => {
  it("mints random ids that fit the events column", () => {
    const a = newAnonymousId();
    expect(isAnonymousId(a)).toBe(true);
    expect(a.length).toBeLessThanOrEqual(64);
    expect(newAnonymousId()).not.toBe(a);
  });

  it("only trusts ids it could have minted", () => {
    expect(isAnonymousId("wumpini@example.test")).toBe(false);
    expect(isAnonymousId("")).toBe(false);
    expect(isAnonymousId(undefined)).toBe(false);
  });
});
