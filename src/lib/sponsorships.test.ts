import { describe, expect, it } from "vitest";
import { impactCount, tierLabel } from "./sponsorships";

describe("sponsor portal wording (#307)", () => {
  it("shows a held back count as fewer than five, never as zero", () => {
    expect(impactCount(null)).toBe("Fewer than 5");
    expect(impactCount(1234)).toBe("1,234");
  });

  it("names the tiers", () => {
    expect(tierLabel("gold")).toBe("Gold");
    expect(tierLabel("partner")).toBe("Partner");
  });
});
