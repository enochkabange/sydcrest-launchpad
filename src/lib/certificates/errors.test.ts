import { describe, expect, it } from "vitest";
import { issueErrorMessage, revokeErrorMessage } from "./errors";

describe("error copy", () => {
  it("maps the database error codes to plain messages", () => {
    expect(issueErrorMessage("23505")).toMatch(/already holds/);
    expect(issueErrorMessage("22023", "Certification criteria not met: {...}")).toMatch(/criteria/);
    expect(issueErrorMessage("22023", "The learner needs a display name on their profile first")).toMatch(/name/);
    expect(issueErrorMessage("42501")).toMatch(/mentor/);
    expect(issueErrorMessage(undefined)).toMatch(/Try again/);
    expect(revokeErrorMessage("P0002")).toMatch(/already revoked/);
  });
  it("never leaks the raw database message", () => {
    expect(issueErrorMessage("22023", 'Certification criteria not met: {"eligible": false}')).not.toContain("{");
  });
});
