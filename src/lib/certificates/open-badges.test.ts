import { describe, expect, it } from "vitest";
import {
  OB_CONTEXT,
  badgeUrls,
  buildAchievementDocument,
  buildCredential,
  buildIssuerProfile,
  normalizeVerificationId,
} from "./open-badges";

const ORIGIN = "https://launchpad.example";
const PROGRAM = {
  slug: "delta-mentoring-program",
  title: "Delta Mentoring Program",
  summary: "A twelve week mentored cohort.",
  certification_summary: "Pass every week and review a classmate's capstone.",
};
const CERT = {
  verification_id: "0123456789abcdef0123456789abcdef",
  recipient_name: "Wumpini Alhassan",
  program_title: "Delta Mentoring Program",
  specialization_label: "SEO and content",
  issued_at: "2027-04-09T10:00:00+00:00",
};

describe("verification ids", () => {
  it("accepts 32 hex characters in any case, trimmed", () => {
    expect(normalizeVerificationId(" 0123456789ABCDEF0123456789abcdef ")).toBe(CERT.verification_id);
  });
  it("rejects anything else", () => {
    for (const bad of ["", "123", `${CERT.verification_id}0`, "g".repeat(32), "../etc/passwd", `${"a".repeat(16)}-${"b".repeat(15)}`]) {
      expect(normalizeVerificationId(bad)).toBeNull();
    }
  });
});

describe("issuer profile", () => {
  it("is a Profile at a stable URL on the site origin", () => {
    const issuer = buildIssuerProfile(`${ORIGIN}/`);
    expect(issuer["@context"]).toEqual(OB_CONTEXT);
    expect(issuer.id).toBe(`${ORIGIN}/badges/issuer.json`);
    expect(issuer.type).toEqual(["Profile"]);
    expect(issuer.url).toBe(ORIGIN);
    expect(issuer.name).toBe("SydCrest Launchpad");
  });
});

describe("achievement", () => {
  it("defines one Certificate achievement per programme with criteria and image", () => {
    const a = buildAchievementDocument(ORIGIN, PROGRAM);
    expect(a.id).toBe(`${ORIGIN}/badges/delta-mentoring-program/achievement.json`);
    expect(a.type).toEqual(["Achievement"]);
    expect(a.achievementType).toBe("Certificate");
    expect(a.criteria.narrative).toBe(PROGRAM.certification_summary);
    expect(a.image.id).toBe(`${ORIGIN}/badges/delta-mentoring-program/image.png`);
    expect(a.creator.id).toBe(`${ORIGIN}/badges/issuer.json`);
  });
  it("falls back to default copy when the programme has none", () => {
    const a = buildAchievementDocument(ORIGIN, { ...PROGRAM, summary: null, certification_summary: "  " });
    expect(a.description.length).toBeGreaterThan(10);
    expect(a.criteria.narrative).toMatch(/capstone/);
  });
});

describe("credential", () => {
  const vc = buildCredential(ORIGIN, CERT, PROGRAM);

  it("follows the OpenBadgeCredential shape on VC 2.0", () => {
    expect(vc["@context"]).toEqual([
      "https://www.w3.org/ns/credentials/v2",
      "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json",
    ]);
    expect(vc.type).toEqual(["VerifiableCredential", "OpenBadgeCredential"]);
    expect(vc.id).toBe(badgeUrls(ORIGIN).credential(CERT.verification_id));
    expect(vc.issuer.id).toBe(`${ORIGIN}/badges/issuer.json`);
    expect(vc.validFrom).toBe("2027-04-09T10:00:00.000Z");
    expect(vc.credentialSubject.type).toEqual(["AchievementSubject"]);
    expect(vc.credentialSubject.achievement.id).toBe(`${ORIGIN}/badges/delta-mentoring-program/achievement.json`);
    expect(vc.name).toBe("Delta Mentoring Program: SEO and content certificate");
  });

  it("names the recipient by display name only, never email or ids", () => {
    expect(vc.credentialSubject.identifier).toEqual([
      { type: "IdentityObject", identityType: "name", hashed: false, identityHash: "Wumpini Alhassan" },
    ]);
    const text = JSON.stringify(vc);
    expect(text).not.toMatch(/[\w.+]+@[\w-]+\.[a-z]/i);
    expect(text).not.toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-/);
    expect(vc.credentialSubject).not.toHaveProperty("id");
  });

  it("uses the snapshot title even if the programme was renamed", () => {
    const renamed = buildCredential(ORIGIN, CERT, { ...PROGRAM, title: "New name" });
    expect(renamed.credentialSubject.achievement.name).toBe("Delta Mentoring Program");
  });

  it("points evidence at the public verification page", () => {
    expect(vc.evidence[0].id).toBe(`${ORIGIN}/verify/${CERT.verification_id}`);
  });

  it("has no dashes in its human readable text", () => {
    const noSpec = buildCredential(ORIGIN, { ...CERT, specialization_label: null }, PROGRAM);
    for (const text of [vc.name, vc.description, noSpec.name, noSpec.description]) expect(text).not.toMatch(/[–—]| - /);
  });
});
