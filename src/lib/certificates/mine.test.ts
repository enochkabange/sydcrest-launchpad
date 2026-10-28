import { describe, expect, it } from "vitest";
import { splitCertificates } from "./mine";

const cert = (id: string, program_id: string, revoked_at: string | null = null) => ({ id, program_id, revoked_at });

describe("splitCertificates", () => {
  it("gives a certificate its own card when the learner has no cohort for it", () => {
    const result = splitCertificates([cert("a", "dmp")], []);
    expect(result.standalone.map((c) => c.id)).toEqual(["a"]);
    expect(result.revoked).toEqual([]);
    expect(result.hasLive).toBe(true);
  });

  it("leaves a certificate on its cohort card instead of showing it twice", () => {
    const result = splitCertificates([cert("a", "dmp"), cert("b", "other")], ["dmp"]);
    expect(result.standalone.map((c) => c.id)).toEqual(["b"]);
  });

  it("lists revoked certificates apart and never as live", () => {
    const result = splitCertificates([cert("a", "dmp", "2026-10-01T00:00:00Z")], []);
    expect(result.standalone).toEqual([]);
    expect(result.revoked.map((c) => c.id)).toEqual(["a"]);
    expect(result.hasLive).toBe(false);
  });

  it("is empty for a learner with no certificates", () => {
    expect(splitCertificates([], ["dmp"])).toEqual({ standalone: [], revoked: [], hasLive: false });
  });
});
