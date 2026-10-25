import { describe, expect, it } from "vitest";
import { decideLegalGate, legalConsentState, termsVersionFromMetadata } from "./consent";

const live = (kind: string) => ({ kind, revoked_at: null });
const revoked = (kind: string) => ({ kind, revoked_at: "2026-10-20T10:00:00Z" });
const agreed = { date_of_birth: "2000-03-14", terms_version: "2026-10-draft" };

describe("legalConsentState", () => {
  it("needs a live terms and privacy record", () => {
    expect(legalConsentState([live("terms"), live("privacy")]).granted).toBe(true);
    expect(legalConsentState([live("terms")])).toEqual({ granted: false, revoked: [], missing: ["privacy"] });
    expect(legalConsentState([revoked("terms"), live("privacy")]).revoked).toEqual(["terms"]);
  });

  it("a later live record outranks an earlier revoked one", () => {
    expect(legalConsentState([revoked("terms"), live("terms"), live("privacy")]).granted).toBe(true);
  });

  it("ignores WhatsApp consent", () => {
    expect(legalConsentState([live("whatsapp")]).missing).toEqual(["terms", "privacy"]);
  });
});

describe("decideLegalGate", () => {
  it("allows someone with records and a date of birth", () => {
    expect(decideLegalGate([live("terms"), live("privacy")], agreed)).toEqual({ action: "allow" });
  });

  it("backfills from metadata, keeping the version they agreed to", () => {
    expect(decideLegalGate([], agreed)).toEqual({
      action: "backfill",
      version: "2026-10-draft",
      kinds: ["terms", "privacy"],
    });
    expect(decideLegalGate([live("terms")], agreed)).toEqual({
      action: "backfill",
      version: "2026-10-draft",
      kinds: ["privacy"],
    });
  });

  it("sends Google sign ups without a date of birth to /welcome", () => {
    expect(decideLegalGate([], { full_name: "Abdul-Rahman Seidu" })).toEqual({ action: "welcome" });
    expect(decideLegalGate([live("terms"), live("privacy")], {})).toEqual({ action: "welcome" });
  });

  it("never resurrects a revoked consent from metadata", () => {
    expect(decideLegalGate([revoked("terms"), revoked("privacy")], agreed)).toEqual({ action: "welcome" });
  });

  it("asks again when there is neither a record nor metadata consent", () => {
    expect(decideLegalGate([], { date_of_birth: "2000-03-14" })).toEqual({ action: "welcome" });
  });
});

describe("termsVersionFromMetadata", () => {
  it("reads only a sensible string", () => {
    expect(termsVersionFromMetadata(agreed)).toBe("2026-10-draft");
    expect(termsVersionFromMetadata({ terms_version: "" })).toBeNull();
    expect(termsVersionFromMetadata({ terms_version: "x".repeat(41) })).toBeNull();
    expect(termsVersionFromMetadata(null)).toBeNull();
  });
});
