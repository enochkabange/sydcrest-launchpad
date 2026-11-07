import { describe, expect, it } from "vitest";
import { AGE_CONSENT_KIND, decideLegalGate, legalConsentState, needsAgeConfirmationRecord, termsVersionFromMetadata } from "./consent";

const CURRENT = "2026-11";
const EARLIER = "2026-10-draft";
const live = (kind: string, version = CURRENT) => ({ kind, version, revoked_at: null });
const revoked = (kind: string, version = CURRENT) => ({ kind, version, revoked_at: "2026-10-20T10:00:00Z" });
const agreed = { date_of_birth: "2000-03-14", terms_version: CURRENT };

describe("legalConsentState", () => {
  it("needs a live terms and privacy record for the current version", () => {
    expect(legalConsentState([live("terms"), live("privacy")], CURRENT).granted).toBe(true);
    expect(legalConsentState([live("terms")], CURRENT)).toEqual({ granted: false, revoked: [], missing: ["privacy"] });
    expect(legalConsentState([revoked("terms"), live("privacy")], CURRENT).revoked).toEqual(["terms"]);
  });

  it("a later live record outranks an earlier revoked one", () => {
    expect(legalConsentState([revoked("terms"), live("terms"), live("privacy")], CURRENT).granted).toBe(true);
  });

  it("an earlier version is not enough once the terms change (#60)", () => {
    const rows = [live("terms", EARLIER), live("privacy", EARLIER)];
    expect(legalConsentState(rows, CURRENT)).toEqual({ granted: false, revoked: [], missing: ["terms", "privacy"] });
  });

  it("treats the current version agreed and then revoked as revoked, whatever came before", () => {
    const rows = [live("terms", EARLIER), revoked("terms"), live("privacy")];
    expect(legalConsentState(rows, CURRENT).revoked).toEqual(["terms"]);
  });

  it("ignores WhatsApp consent", () => {
    expect(legalConsentState([live("whatsapp")], CURRENT).missing).toEqual(["terms", "privacy"]);
  });
});

describe("decideLegalGate", () => {
  it("allows someone with records and a date of birth", () => {
    expect(decideLegalGate([live("terms"), live("privacy")], agreed, CURRENT)).toEqual({ action: "allow" });
  });

  it("backfills from metadata when they agreed to the current version", () => {
    expect(decideLegalGate([], agreed, CURRENT)).toEqual({ action: "backfill", version: CURRENT, kinds: ["terms", "privacy"] });
    expect(decideLegalGate([live("terms")], agreed, CURRENT)).toEqual({ action: "backfill", version: CURRENT, kinds: ["privacy"] });
  });

  it("sends anyone who agreed only to an earlier version to /welcome (#60)", () => {
    const earlier = { date_of_birth: "2000-03-14", terms_version: EARLIER };
    expect(decideLegalGate([live("terms", EARLIER), live("privacy", EARLIER)], earlier, CURRENT)).toEqual({ action: "welcome" });
    expect(decideLegalGate([], earlier, CURRENT)).toEqual({ action: "welcome" });
  });

  it("sends Google sign ups without a date of birth to /welcome", () => {
    expect(decideLegalGate([], { full_name: "Abdul-Rahman Seidu" }, CURRENT)).toEqual({ action: "welcome" });
    expect(decideLegalGate([live("terms"), live("privacy")], {}, CURRENT)).toEqual({ action: "welcome" });
  });

  it("never resurrects a revoked consent from metadata", () => {
    expect(decideLegalGate([revoked("terms"), revoked("privacy")], agreed, CURRENT)).toEqual({ action: "welcome" });
    expect(decideLegalGate([live("terms", EARLIER), revoked("terms"), live("privacy")], agreed, CURRENT)).toEqual({ action: "welcome" });
  });

  it("asks again when there is neither a record nor metadata consent", () => {
    expect(decideLegalGate([], { date_of_birth: "2000-03-14" }, CURRENT)).toEqual({ action: "welcome" });
  });
});

describe("termsVersionFromMetadata", () => {
  it("reads only a sensible string", () => {
    expect(termsVersionFromMetadata(agreed)).toBe(CURRENT);
    expect(termsVersionFromMetadata({ terms_version: "" })).toBeNull();
    expect(termsVersionFromMetadata({ terms_version: "x".repeat(41) })).toBeNull();
    expect(termsVersionFromMetadata(null)).toBeNull();
  });
});

describe("needsAgeConfirmationRecord (founder decision D1)", () => {
  const ticked = { date_of_birth: "2000-03-14", terms_version: "v1", age_confirmed_at: "2026-10-29T10:00:00Z" };

  it("copies a sign up's 18 or over tick from metadata once", () => {
    expect(needsAgeConfirmationRecord([live("terms")], ticked)).toBe(true);
    expect(needsAgeConfirmationRecord([live(AGE_CONSENT_KIND)], ticked)).toBe(false);
  });

  it("never invents a tick for accounts made before it existed", () => {
    expect(needsAgeConfirmationRecord([], { date_of_birth: "2000-03-14", terms_version: "v1" })).toBe(false);
  });

  it("is not part of the legal gate", () => {
    const rows = [live("terms"), live("privacy")];
    expect(decideLegalGate(rows, { date_of_birth: "2000-03-14", terms_version: CURRENT }, CURRENT)).toEqual({ action: "allow" });
  });
});
