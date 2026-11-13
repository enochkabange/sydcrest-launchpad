import { describe, expect, it } from "vitest";
import { AUDIT_ACTIONS, auditActionLabel, consentLine, onCurrentTerms, parseConsents, parseMemberships, providersLabel } from "./console";

describe("people console helpers", () => {
  it("labels every audit action the database allows", () => {
    expect(Object.keys(AUDIT_ACTIONS).sort()).toEqual(
      ["account_deleted", "account_paused", "account_reactivated", "confirmation_resent", "learner_searched", "learner_viewed", "role_changed", "support_note"].sort(),
    );
    expect(auditActionLabel("support_note")).toBe("Support note");
    expect(auditActionLabel("something_new")).toBe("something_new");
  });

  it("names sign in methods", () => {
    expect(providersLabel(["email", "google"])).toBe("Email and password, Google");
    expect(providersLabel([])).toBe("Not known");
  });

  it("parses consents and memberships defensively", () => {
    const consents = parseConsents([
      { kind: "terms", version: "2026-10-01", granted_at: "2026-10-03T10:00:00Z", revoked_at: null },
      { kind: "whatsapp", version: "1", granted_at: "2026-10-03T10:00:00Z", revoked_at: "2026-11-01T08:00:00Z" },
      "junk",
      { nothing: true },
    ]);
    expect(consents).toHaveLength(2);
    expect(consentLine(consents[0])).toEqual(["Terms 2026-10-01", "agreed 2026-10-03"]);
    expect(consentLine(consents[1])).toEqual(["WhatsApp updates 1", "withdrawn 2026-11-01"]);
    expect(onCurrentTerms(consents, "2026-10-01")).toBe(true);
    expect(onCurrentTerms(consents, "2026-11-20")).toBe(false);
    expect(parseConsents(null)).toEqual([]);

    const memberships = parseMemberships([
      { kind: "cohort", label: "Data Analyst Launchpad, Tamale 1", role: "learner", status: "active", at: "2026-11-01T00:00:00Z" },
      { kind: "other", label: "x", status: "y", at: "z" },
    ]);
    expect(memberships).toEqual([{ kind: "cohort", label: "Data Analyst Launchpad, Tamale 1", role: "learner", status: "active", at: "2026-11-01T00:00:00Z" }]);
  });
});
