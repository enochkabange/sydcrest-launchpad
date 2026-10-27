import { describe, expect, it } from "vitest";
import {
  isJoinable,
  isWhatsappUrl,
  parseChapterDetails,
  parseChapterForm,
  PLANNED_CHAPTERS,
  plannedFor,
  plannedWithoutChapter,
  profileSlugFrom,
  slugify,
  sortChapters,
  statusCopy,
  suggestChapter,
} from "./model";

function form(values: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(values)) f.set(k, v);
  return f;
}

const chapter = (slug: string, region: string, city: string, status: string) => ({ slug, name: `${city} chapter`, region, city, status });

describe("planned chapters", () => {
  it("are the five northern capitals, Tamale first", () => {
    expect(PLANNED_CHAPTERS.map((p) => p.city)).toEqual(["Tamale", "Bolgatanga", "Wa", "Damongo", "Nalerigu"]);
    expect(PLANNED_CHAPTERS[0].region).toBe("northern");
    expect(PLANNED_CHAPTERS[4].region).toBe("north_east");
  });

  it("drop out once their region has a chapter", () => {
    const left = plannedWithoutChapter([chapter("tamale", "northern", "Tamale", "launching")]);
    expect(left.map((p) => p.city)).toEqual(["Bolgatanga", "Wa", "Damongo", "Nalerigu"]);
  });

  it("are found by region", () => {
    expect(plannedFor("upper_west")?.city).toBe("Wa");
    expect(plannedFor("greater_accra")).toBeNull();
    expect(plannedFor(null)).toBeNull();
  });
});

describe("status", () => {
  it("is joinable only when launching or active", () => {
    expect(isJoinable("launching")).toBe(true);
    expect(isJoinable("active")).toBe(true);
    for (const s of ["draft", "paused", "closed"]) expect(isJoinable(s)).toBe(false);
  });

  it("has honest copy without dashes", () => {
    expect(statusCopy("launching").label).toBe("Being set up");
    for (const s of ["draft", "launching", "active", "paused", "closed"]) {
      const { label, summary } = statusCopy(s);
      expect(`${label} ${summary}`).not.toMatch(/[–—]| - /);
    }
  });
});

describe("sortChapters", () => {
  it("puts the capitals in launch order, others by name, closed last", () => {
    const sorted = sortChapters([
      chapter("accra", "greater_accra", "Accra", "active"),
      chapter("wa", "upper_west", "Wa", "launching"),
      chapter("old", "northern", "Yendi", "closed"),
      chapter("tamale", "northern", "Tamale", "active"),
    ]);
    expect(sorted.map((c) => c.slug)).toEqual(["tamale", "wa", "accra", "old"]);
  });
});

describe("suggestChapter", () => {
  const list = [
    chapter("tamale", "northern", "Tamale", "launching"),
    chapter("tamale-central", "northern", "Tamale", "active"),
    chapter("bolga", "upper_east", "Bolgatanga", "paused"),
  ];

  it("prefers an active chapter in the learner's region", () => {
    expect(suggestChapter(list, "northern")?.slug).toBe("tamale-central");
  });

  it("still suggests a paused chapter so the learner can see it", () => {
    expect(suggestChapter(list, "upper_east")?.slug).toBe("bolga");
  });

  it("returns null without a region or a chapter there", () => {
    expect(suggestChapter(list, null)).toBeNull();
    expect(suggestChapter(list, "volta")).toBeNull();
  });

  it("never suggests a draft", () => {
    expect(suggestChapter([chapter("wa", "upper_west", "Wa", "draft")], "upper_west")).toBeNull();
  });
});

describe("validation", () => {
  it("accepts WhatsApp invite links the database accepts", () => {
    expect(isWhatsappUrl("https://chat.whatsapp.com/AbC123xyz")).toBe(true);
    expect(isWhatsappUrl("https://wa.me/233201234567")).toBe(true);
    expect(isWhatsappUrl("https://whatsapp.com/channel/0029Va")).toBe(true);
    expect(isWhatsappUrl("http://chat.whatsapp.com/AbC")).toBe(false);
    expect(isWhatsappUrl("https://example.com/AbC")).toBe(false);
    expect(isWhatsappUrl("https://chat.whatsapp.com/<script>")).toBe(false);
  });

  it("slugifies a city", () => {
    expect(slugify("Tamale")).toBe("tamale");
    expect(slugify("  Bolgatanga Central! ")).toBe("bolgatanga-central");
  });

  it("parses lead details and rejects a bad link", () => {
    expect(parseChapterDetails(form({ summary: " Hi ", whatsapp_url: "" }))).toEqual({
      data: { summary: "Hi", whatsapp_url: "" },
      errors: {},
    });
    expect(parseChapterDetails(form({ summary: "", whatsapp_url: "https://t.me/x" })).errors.whatsapp_url).toBeTruthy();
    expect(parseChapterDetails(form({ summary: "a".repeat(2001), whatsapp_url: "" })).errors.summary).toBeTruthy();
  });

  it("parses the admin form, making the slug from the city", () => {
    const { data, errors } = parseChapterForm(
      form({ name: "Tamale chapter", city: "Tamale", region: "northern", status: "launching", slug: "", summary: "", whatsapp_url: "" }),
    );
    expect(errors).toEqual({});
    expect(data).toMatchObject({ slug: "tamale", status: "launching", summary: null, whatsapp_url: null });
  });

  it("reports every missing field", () => {
    const { errors } = parseChapterForm(form({ name: "", city: "", region: "mars", status: "open", slug: "" }));
    expect(Object.keys(errors).sort()).toEqual(["city", "name", "region", "slug", "status"]);
  });

  it("reads a public profile slug from what an admin pastes", () => {
    expect(profileSlugFrom("https://launchpad.sydcrest.org/u/wumpini-abukari")).toBe("wumpini-abukari");
    expect(profileSlugFrom("/u/mariama?x=1")).toBe("mariama");
    expect(profileSlugFrom(" @Fuseini ")).toBe("fuseini");
  });
});
