import { describe, expect, it } from "vitest";
import { embedSnippet, formatMonthYear, isExpired, linkedInAddUrl, VERIFICATION_EXPLAINER, VERIFICATION_LABEL } from "./share";

describe("linkedInAddUrl", () => {
  it("builds LinkedIn's add certification link with every field", () => {
    const url = new URL(
      linkedInAddUrl({
        name: "Google Data Analytics",
        organizationName: "Google",
        issuedOn: "2026-05-14",
        expiresOn: "2029-05-14",
        certUrl: "https://www.credly.com/badges/abc",
        certId: "ABC 123",
      }),
    );
    expect(url.origin + url.pathname).toBe("https://www.linkedin.com/profile/add");
    expect(Object.fromEntries(url.searchParams)).toEqual({
      startTask: "CERTIFICATION_NAME",
      name: "Google Data Analytics",
      organizationName: "Google",
      issueYear: "2026",
      issueMonth: "5",
      expirationYear: "2029",
      expirationMonth: "5",
      certUrl: "https://www.credly.com/badges/abc",
      certId: "ABC 123",
    });
  });

  it("leaves out what is unknown and never passes a non https link", () => {
    const url = new URL(linkedInAddUrl({ name: "CCNA", organizationName: "Cisco", certUrl: "javascript:alert(1)" }));
    expect([...url.searchParams.keys()]).toEqual(["startTask", "name", "organizationName"]);
  });

  it("encodes names safely", () => {
    const url = linkedInAddUrl({ name: "R & Python: data", organizationName: "Ashesi" });
    expect(url).toContain("name=R+%26+Python%3A+data");
  });
});

describe("embedSnippet", () => {
  it("is a static link and image with no script", () => {
    const html = embedSnippet({
      pageUrl: "https://sydcrest.example/u/wumpini/credentials#c-1",
      imageUrl: "https://sydcrest.example/og/credentials/1/square",
      title: 'Data "Analytics" <b>',
      label: "Added by the learner",
    });
    expect(html).toMatch(/^<a href="https:\/\/sydcrest\.example\/u\/wumpini\/credentials#c-1"/);
    expect(html).toContain('alt="Data &quot;Analytics&quot; &lt;b&gt;: Added by the learner"');
    expect(html).not.toMatch(/<script|on\w+=/i);
  });
});

describe("labels", () => {
  it("never claims SydCrest checked an external certificate, and has no dashes", () => {
    expect(VERIFICATION_LABEL).toEqual({
      sydcrest: "Verified by SydCrest",
      issuer: "Verified by the issuer",
      learner: "Added by the learner",
    });
    expect(VERIFICATION_EXPLAINER.issuer).toContain("SydCrest did not award it");
    expect(VERIFICATION_EXPLAINER.learner).toContain("SydCrest has not checked this");
    for (const text of [...Object.values(VERIFICATION_LABEL), ...Object.values(VERIFICATION_EXPLAINER)]) {
      expect(text).not.toMatch(/[–—]| - /);
    }
  });
});

describe("dates", () => {
  it("formats a month and year", () => {
    expect(formatMonthYear("2026-05-01")).toBe("May 2026");
    expect(formatMonthYear(null)).toBeNull();
  });

  it("knows when something has expired", () => {
    const now = new Date("2026-10-28T12:00:00Z");
    expect(isExpired("2026-10-27", now)).toBe(true);
    expect(isExpired("2026-10-28", now)).toBe(false);
    expect(isExpired(null, now)).toBe(false);
  });
});
