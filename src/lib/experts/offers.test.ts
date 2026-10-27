import { describe, expect, it } from "vitest";
import { formatDuration, offerFacts, offerKindLabel, offerSummary, requestPath } from "./offers";

const base = { duration_minutes: null, delivery_days: null, max_participants: null, cadence: null, revisions_included: null };

describe("offer facts", () => {
  it("formats durations", () => {
    expect(formatDuration(45)).toBe("45 minutes");
    expect(formatDuration(60)).toBe("1 hour");
    expect(formatDuration(90)).toBe("1 hour 30 minutes");
    expect(formatDuration(120)).toBe("2 hours");
  });

  it("lists only the terms an offer sets", () => {
    expect(offerFacts({ kind: "one_to_one", ...base, duration_minutes: 30 })).toEqual([{ label: "Length", value: "30 minutes" }]);
    expect(
      offerFacts({ kind: "gig", ...base, delivery_days: 5, revisions_included: 0 }).map((f) => f.value),
    ).toEqual(["5 days", "None included"]);
    expect(
      offerFacts({ kind: "recurring", ...base, cadence: "fortnightly", max_participants: 6, revisions_included: 2 }).map(
        (f) => f.value,
      ),
    ).toEqual(["Up to 6 people", "Every two weeks", "2 revisions included"]);
  });

  it("summarises an offer for a card", () => {
    expect(offerSummary({ kind: "one_to_one", ...base, duration_minutes: 45 })).toBe("One to one session, 45 minutes");
    expect(offerSummary({ kind: "project", ...base })).toBe("Project help");
    expect(offerKindLabel("nonsense")).toBe("Offer");
  });

  it("links to the booking route owned by #151", () => {
    expect(requestPath("fuseini-iddrisu", "abc")).toBe("/experts/fuseini-iddrisu/offers/abc/request");
  });
});
