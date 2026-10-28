import { describe, expect, it } from "vitest";
import { displayCode, eventErrorMessage, normaliseCode, parseEventForm, parseFeedbackForm, parseJoinUrl, parseRecordingForm } from "./forms";

function form(values: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(values)) f.set(k, v);
  return f;
}

const valid = {
  title: "Wa Skillshop: spreadsheets for traders",
  slug: "",
  kind: "skillshop",
  format: "in_person",
  status: "published",
  starts_at: "2026-12-19T09:00",
  ends_at: "2026-12-19T13:00",
  venue_name: "Wa Youth Centre",
  city: "Wa",
  region: "upper_west",
  capacity: "45",
};

describe("parseEventForm", () => {
  it("accepts a complete event and makes a slug from the title", () => {
    const { data, errors } = parseEventForm(form(valid));
    expect(errors).toEqual({});
    expect(data).toMatchObject({
      slug: "wa-skillshop-spreadsheets-for-traders",
      starts_at: "2026-12-19T09:00:00.000Z",
      ends_at: "2026-12-19T13:00:00.000Z",
      capacity: 45,
      chapter_id: null,
      status: "published",
    });
  });

  it("needs an end after the start and a venue before an in person event goes out", () => {
    const { errors } = parseEventForm(form({ ...valid, ends_at: "2026-12-19T08:00", venue_name: "" }));
    expect(errors.ends_at).toBe("The end must be after the start.");
    expect(errors.venue_name).toBe("Add the venue before publishing an in person event.");
  });

  it("lets a draft or an online event go without a venue, and drops venue fields for online events", () => {
    expect(parseEventForm(form({ ...valid, venue_name: "", status: "draft" })).errors).toEqual({});
    const online = parseEventForm(form({ ...valid, format: "online", venue_name: "Somewhere" }));
    expect(online.errors).toEqual({});
    expect(online.data.venue_name).toBeNull();
  });

  it("rejects reserved slugs, bad capacities and unknown values", () => {
    const { errors } = parseEventForm(form({ ...valid, slug: "recordings", capacity: "0", kind: "party", region: "lagos" }));
    expect(Object.keys(errors).sort()).toEqual(["capacity", "kind", "region", "slug"]);
  });

  it("treats an empty capacity as no limit", () => {
    expect(parseEventForm(form({ ...valid, capacity: "" })).data.capacity).toBeNull();
  });
});

describe("parseJoinUrl", () => {
  it("accepts https links for online events and clears with an empty value", () => {
    expect(parseJoinUrl(form({ join_url: "https://meet.example.org/abc" }), "online")).toEqual({ joinUrl: "https://meet.example.org/abc" });
    expect(parseJoinUrl(form({ join_url: "" }), "online")).toEqual({ joinUrl: null });
    expect(parseJoinUrl(form({ join_url: "http://insecure.example.org" }), "hybrid").error).toBeDefined();
    expect(parseJoinUrl(form({ join_url: "https://meet.example.org" }), "in_person").error).toBeDefined();
  });
});

describe("parseRecordingForm", () => {
  it("validates the link and the length", () => {
    const ok = parseRecordingForm(form({ title: "How to become a data analyst", video_url: "https://video.example.org/1", duration_minutes: "62", is_published: "on" }));
    expect(ok.errors).toEqual({});
    expect(ok.data).toMatchObject({ duration_minutes: 62, is_published: true });
    const bad = parseRecordingForm(form({ title: "", video_url: "ftp://x", duration_minutes: "2000" }));
    expect(Object.keys(bad.errors).sort()).toEqual(["duration_minutes", "title", "video_url"]);
  });
});

describe("parseFeedbackForm", () => {
  it("reads the impact snapshot answers", () => {
    const { data, errors } = parseFeedbackForm(
      form({ confidence: "5", usefulness: "4", logistics: "2", recommend: "9", attend_again: "yes", comment: "Start on time, please.", quote_consent: "on" }),
    );
    expect(errors).toEqual({});
    expect(data).toEqual({
      confidence: 5,
      usefulness: 4,
      clarity: null,
      logistics: 2,
      recommend: 9,
      attend_again: true,
      comment: "Start on time, please.",
      quote_consent: true,
    });
  });

  it("needs at least one answer and keeps scores in range", () => {
    expect(parseFeedbackForm(form({})).errors.form).toBeDefined();
    expect(parseFeedbackForm(form({ confidence: "6" })).errors.confidence).toBeDefined();
    expect(parseFeedbackForm(form({ recommend: "0" })).data.recommend).toBe(0);
  });

  it("drops consent to quote when there is no comment to quote", () => {
    expect(parseFeedbackForm(form({ clarity: "3", quote_consent: "on" })).data.quote_consent).toBe(false);
  });
});

describe("check in codes", () => {
  it("normalises what people type and splits the code for reading out", () => {
    expect(normaliseCode(" abcd-ef 2h ")).toBe("ABCDEF2H");
    expect(displayCode("ABCDEF2H")).toBe("ABCD EF2H");
  });
});

describe("eventErrorMessage", () => {
  it("turns database errors into sentences", () => {
    expect(eventErrorMessage({ code: "22023", message: "Wrong code" })).toMatch(/does not match/);
    expect(eventErrorMessage({ code: "22023", message: "Check in is not open" })).toMatch(/two hours before/);
    expect(eventErrorMessage({ code: "22023", message: "This event is not taking RSVPs" })).toMatch(/no longer taking/);
    expect(eventErrorMessage({ code: "P0002", message: "Event not found" })).toMatch(/could not find/);
    expect(eventErrorMessage({ code: "XX000", message: "boom" })).toBe("Something went wrong. Try again.");
  });
});
