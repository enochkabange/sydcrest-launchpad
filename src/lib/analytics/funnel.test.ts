import { describe, expect, it } from "vitest";
import { formatRate, formatWeek, funnelTotals, rate } from "./funnel";

describe("funnel helpers", () => {
  it("rounds rates and refuses to divide by zero", () => {
    expect(rate(1, 3)).toBe(33);
    expect(rate(2, 0)).toBeNull();
    expect(formatRate(1, 4)).toBe("25%");
    expect(formatRate(0, 0)).toBe("None yet");
  });

  it("totals the weeks", () => {
    expect(
      funnelTotals([
        { week_start: "2026-10-19", visits: 10, signups: 3, activations: 1 },
        { week_start: "2026-10-12", visits: 5, signups: 1, activations: 0 },
      ]),
    ).toEqual({ visits: 15, signups: 4, activations: 1 });
  });

  it("formats the week start in UTC", () => {
    expect(formatWeek("2026-10-19")).toBe("19 Oct 2026");
    expect(formatWeek("nonsense")).toBe("nonsense");
  });
});
