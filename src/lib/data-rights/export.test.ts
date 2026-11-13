import { describe, expect, it } from "vitest";
import { EXPORT_SECTIONS, buildExport, exportFileName } from "./export";

const at = new Date("2026-11-14T09:30:00Z");
const account = { id: "11111111-1111-1111-1111-111111111111", email: "wumpini@example.test" };

describe("buildExport", () => {
  it("writes every section, single rows as objects and lists as arrays", () => {
    const file = buildExport({
      generatedAt: at,
      account,
      sections: {
        profile: [{ display_name: "Wumpini Alhassan" }],
        about_you: [],
        learner_attributes: [{ stage: "active" }],
        first_touch: [],
        progress: [{ status: "done" }],
        submissions: [],
        certificates: [{ verification_id: "abc" }],
        verified_skills: [],
        external_credentials: [],
        programme_applications: [],
        cohort_memberships: [],
        chapter_memberships: [],
        opportunity_applications: [],
        outcomes: [],
        consents: [{ kind: "terms", version: "2026-10-01" }],
        deletion_requests: [],
      },
    });
    expect(file.format).toBe("sydcrest-my-data");
    expect(file.version).toBe(1);
    expect(file.generated_at).toBe("2026-11-14T09:30:00.000Z");
    expect(file.account).toEqual(account);
    expect(Object.keys(file.data)).toEqual([...EXPORT_SECTIONS]);
    expect(file.data.profile).toEqual({ display_name: "Wumpini Alhassan" });
    expect(file.data.about_you).toBeNull();
    expect(file.data.progress).toEqual([{ status: "done" }]);
    expect(file.data.submissions).toEqual([]);
    expect(file.missing).toEqual([]);
    expect(file.notes.length).toBeGreaterThan(0);
  });

  it("names the sections that could not be read instead of looking complete", () => {
    const file = buildExport({ generatedAt: at, account, sections: { profile: [{ display_name: "Mariama Seidu" }], consents: null } });
    expect(file.missing).toContain("consents");
    expect(file.missing).toContain("certificates");
    expect(file.missing).not.toContain("profile");
    expect(file.data.consents).toBeNull();
  });

  it("covers what the privacy page promises", () => {
    for (const key of ["profile", "about_you", "learner_attributes", "first_touch", "progress", "submissions", "certificates", "consents", "outcomes", "programme_applications", "opportunity_applications"]) {
      expect(EXPORT_SECTIONS).toContain(key);
    }
  });

  it("is plain JSON that round trips", () => {
    const file = buildExport({ generatedAt: at, account, sections: {} });
    expect(JSON.parse(JSON.stringify(file))).toEqual(file);
  });
});

describe("exportFileName", () => {
  it("dates the file", () => {
    expect(exportFileName(at)).toBe("sydcrest-my-data-2026-11-14.json");
  });
});
