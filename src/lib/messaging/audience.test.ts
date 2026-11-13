import { describe, expect, it } from "vitest";
import {
  buildAudienceFilters,
  describeFilters,
  holdoutShare,
  holdoutSize,
  parseDraft,
  sitePath,
  splitPreview,
  summariseResults,
  whatsappPreview,
} from "./audience";

const CHAPTER = "0b7c6a2e-4c1d-4f3a-9a77-2f8d1c3b5e10";
const OTHER = "9f1e2d3c-4b5a-4678-8899-aabbccddeeff";

function form(entries: [string, string][]) {
  const data = new FormData();
  for (const [k, v] of entries) data.append(k, v);
  return data;
}

describe("buildAudienceFilters", () => {
  it("keeps the filters a composer sends, cleaned", () => {
    expect(
      buildAudienceFilters(
        form([
          ["track", "Data-Analyst"],
          ["region", "northern"],
          ["chapter_id", CHAPTER],
          ["cohort_id", OTHER.toUpperCase()],
          ["stage", "slipping"],
          ["stage", "dormant"],
          ["stage", "slipping"],
          ["inactive_days", "14"],
          ["campaign", "Tamale Skillshop!"],
        ]),
      ),
    ).toEqual({
      track: "data-analyst",
      region: "northern",
      chapter_id: CHAPTER,
      cohort_id: OTHER,
      stages: ["slipping", "dormant"],
      inactive_days: 14,
      campaign: "tamale-skillshop",
    });
  });

  it("drops empty and unknown values, so an empty form means everyone", () => {
    expect(
      buildAudienceFilters(
        form([
          ["track", ""],
          ["region", "atlantis"],
          ["chapter_id", "not-a-uuid"],
          ["stage", "at_risk"],
          ["inactive_days", "-3"],
          ["campaign", "wumpini@example.test"],
        ]),
      ),
    ).toEqual({});
  });

  it("clamps days to a year", () => {
    expect(buildAudienceFilters(form([["inactive_days", "9999"]])).inactive_days).toBe(365);
  });

  it("always uses a lead's own chapter over the form's", () => {
    expect(buildAudienceFilters(form([["chapter_id", OTHER]]), CHAPTER).chapter_id).toBe(CHAPTER);
    expect(buildAudienceFilters(form([]), CHAPTER).chapter_id).toBe(CHAPTER);
  });

  it("describes an audience in plain words", () => {
    expect(describeFilters({ stages: ["slipping", "dormant"], chapter_id: CHAPTER, inactive_days: 14 }, { chapter: "Tamale chapter" })).toBe(
      "Slipping or dormant members of Tamale chapter inactive for 14 days or more",
    );
    expect(describeFilters({})).toBe("Members");
  });
});

describe("holdout split", () => {
  it("reads a share from a form, 0 to 50", () => {
    expect(holdoutShare("10")).toBe(10);
    expect(holdoutShare("80")).toBe(50);
    expect(holdoutShare("-5")).toBe(0);
    expect(holdoutShare("abc")).toBe(0);
    expect(holdoutShare(null)).toBe(0);
  });

  it("holds out round(n * share / 100), as public.send_message does", () => {
    expect(holdoutSize(100, 10)).toBe(10);
    expect(holdoutSize(25, 10)).toBe(3); // 2.5 rounds up, like Postgres
    expect(holdoutSize(4, 10)).toBe(0);
    expect(holdoutSize(7, 0)).toBe(0);
    expect(holdoutSize(7, 50)).toBe(4);
    expect(holdoutSize(0, 50)).toBe(0);
    expect(holdoutSize(10, 90)).toBe(5); // capped at 50 percent
  });

  it("splits the preview into who gets it and who is held out", () => {
    expect(splitPreview(40, 10)).toEqual({ send: 36, held: 4 });
    expect(splitPreview(1, 10)).toEqual({ send: 1, held: 0 });
  });
});

describe("parseDraft", () => {
  it("accepts a message with a site link", () => {
    const { draft, errors } = parseDraft(
      form([
        ["channel", "in_app"],
        ["template", "come_back"],
        ["title", "  Your roadmap   is waiting "],
        ["body", "Pick up where you left off."],
        ["href", "/dashboard"],
      ]),
    );
    expect(errors).toEqual({});
    expect(draft).toEqual({ channel: "in_app", template: "come_back", title: "Your roadmap is waiting", body: "Pick up where you left off.", href: "/dashboard" });
  });

  it("refuses an empty title, a long body and links off the site", () => {
    const { errors } = parseDraft(
      form([
        ["channel", "email"],
        ["title", ""],
        ["body", "x".repeat(301)],
        ["href", "https://example.test"],
      ]),
    );
    expect(Object.keys(errors).sort()).toEqual(["body", "channel", "href", "title"]);
  });

  it("only lets site paths through", () => {
    expect(sitePath("/events")).toBe("/events");
    expect(sitePath("/")).toBe("/");
    expect(sitePath("//evil.test")).toBeNull();
    expect(sitePath("/\\evil.test")).toBeNull();
    expect(sitePath("/javascript:alert(1)")).toBeNull();
    expect(sitePath("events")).toBeNull();
  });

  it("previews WhatsApp in the approved alert wording", () => {
    expect(whatsappPreview({ title: "Skillshop on Saturday", href: "/events" }, "https://launchpad.test/")).toBe(
      "Hi Wumpini, news from SydCrest: Skillshop on Saturday. See it at https://launchpad.test/events Reply STOP to stop these messages.",
    );
  });
});

describe("summariseResults", () => {
  it("compares came back rates with the holdout", () => {
    const r = summariseResults([
      { held_out: false, people: 36, delivered: 36, opened: 18, came_back: 12 },
      { held_out: true, people: 4, delivered: 0, opened: 0, came_back: 1 },
    ]);
    expect(r.openedRate).toBe(50);
    expect(r.sentRate).toBe(33);
    expect(r.heldRate).toBe(25);
    expect(r.lift).toBe(8);
  });

  it("has no lift without a holdout", () => {
    const r = summariseResults([
      { held_out: false, people: 3, delivered: 3, opened: 0, came_back: 0 },
      { held_out: true, people: 0, delivered: 0, opened: 0, came_back: 0 },
    ]);
    expect(r.heldRate).toBeNull();
    expect(r.lift).toBeNull();
  });
});
