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

  it("counts an emailed link's otp session only when the reset cookie holds its id", () => {
    const otp = { amr: [{ method: "otp", timestamp: 1 }], session_id: "s1" };
    expect(isRecoverySession(otp, "s1")).toBe(true);
    // A sign up confirmation also signs in with "otp": without the cookie it is not a reset.
    expect(isRecoverySession(otp)).toBe(false);
    expect(isRecoverySession(otp, "s2")).toBe(false);
    expect(isRecoverySession({ amr: [{ method: "otp", timestamp: 1 }] }, "s1")).toBe(false);
  });
});

describe("reset pages", () => {
  it("stay public, so a signed out visitor sees them rather than /login", () => {
    expect(isSignedInPath("/forgot-password")).toBe(false);
    expect(isSignedInPath("/reset-password")).toBe(false);
  });
});
