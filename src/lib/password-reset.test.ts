import { describe, expect, it } from "vitest";
import { isRecoverySession } from "./password-reset";
import { isSignedInPath } from "./supabase/protected-paths";

describe("isRecoverySession", () => {
  it("is true only when a reset link made the session", () => {
    expect(isRecoverySession({ amr: [{ method: "recovery", timestamp: 1 }] })).toBe(true);
    expect(isRecoverySession({ amr: ["recovery"] })).toBe(true);
    expect(isRecoverySession({ amr: [{ method: "password", timestamp: 1 }] })).toBe(false);
    expect(isRecoverySession({})).toBe(false);
    expect(isRecoverySession(null)).toBe(false);
  });
});

describe("reset pages", () => {
  it("stay public, so a signed out visitor sees them rather than /login", () => {
    expect(isSignedInPath("/forgot-password")).toBe(false);
    expect(isSignedInPath("/reset-password")).toBe(false);
  });
});
