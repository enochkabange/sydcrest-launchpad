import { describe, expect, it } from "vitest";
import { matchingForEmployers, matchingForLearners } from "./flags";

describe("matching switches", () => {
  it("are off unless set to on", () => {
    expect(matchingForLearners({})).toBe(false);
    expect(matchingForEmployers({})).toBe(false);
    expect(matchingForLearners({ READINESS_FOR_LEARNERS: "yes" })).toBe(false);
    expect(matchingForEmployers({ READINESS_FOR_EMPLOYERS: "" })).toBe(false);
  });

  it("switch on independently, ignoring case and spaces", () => {
    expect(matchingForLearners({ READINESS_FOR_LEARNERS: " ON " })).toBe(true);
    expect(matchingForEmployers({ READINESS_FOR_LEARNERS: "on" })).toBe(false);
    expect(matchingForEmployers({ READINESS_FOR_EMPLOYERS: "on" })).toBe(true);
  });
});
