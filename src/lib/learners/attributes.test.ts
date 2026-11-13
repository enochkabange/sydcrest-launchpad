import { describe, expect, it } from "vitest";
import { daysAgo, deviceLabel, hourBandLabel, isStage, percent, stageLabel, turnUpRate } from "./attributes";

describe("learner attribute labels", () => {
  it("names stages and refuses unknown ones", () => {
    expect(stageLabel("slipping")).toBe("Slipping");
    expect(stageLabel(null)).toBe("Not computed yet");
    expect(isStage("dormant")).toBe(true);
    expect(isStage("asleep")).toBe(false);
  });

  it("names study rhythm and device, or says not known", () => {
    expect(hourBandLabel("evening")).toBe("Evening");
    expect(hourBandLabel(null)).toBe("Not known yet");
    expect(deviceLabel("mobile")).toBe("Phone");
    expect(deviceLabel("bot")).toBe("Not known yet");
  });

  it("formats rates", () => {
    expect(percent(0.756)).toBe("76%");
    expect(percent(null)).toBe("–");
    expect(turnUpRate(3, 1)).toBe(0.75);
    expect(turnUpRate(0, 0)).toBeNull();
  });

  it("says how long ago", () => {
    expect(daysAgo("2026-11-13", "2026-11-13")).toBe("Today");
    expect(daysAgo("2026-11-12", "2026-11-13")).toBe("Yesterday");
    expect(daysAgo("2026-11-01", "2026-11-13")).toBe("12 days ago");
    expect(daysAgo(null, "2026-11-13")).toBe("Never");
  });
});
