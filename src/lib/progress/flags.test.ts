import { describe, expect, it } from "vitest";
import { readinessForLearners } from "./flags";

describe("readinessForLearners", () => {
  it("is off unless READINESS_FOR_LEARNERS is on", () => {
    expect(readinessForLearners({})).toBe(false);
    expect(readinessForLearners({ READINESS_FOR_LEARNERS: "" })).toBe(false);
    expect(readinessForLearners({ READINESS_FOR_LEARNERS: "true" })).toBe(false);
    expect(readinessForLearners({ READINESS_FOR_LEARNERS: "on" })).toBe(true);
    expect(readinessForLearners({ READINESS_FOR_LEARNERS: " ON " })).toBe(true);
  });
});
