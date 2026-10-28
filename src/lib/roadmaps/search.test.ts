import { describe, expect, it } from "vitest";
import { normalise, searchTopics, type SearchItem } from "./search";

const item = (id: string, title: string, number: string, sectionTitle: string, summary: string | null = null): SearchItem => ({
  id,
  slug: id,
  title,
  summary,
  number,
  sectionTitle,
  optional: false,
});

const ITEMS = [
  item("records", "Keeping records", "1", "Keeping records"),
  item("sheets", "Spreadsheets for traders", "1.1", "Keeping records", "Rows, columns and formulas for Mariama's shop."),
  item("sharing", "Sharing prices", "2", "Sharing prices"),
  item("whatsapp", "Sharing on WhatsApp", "2.1", "Sharing prices", "Send a price list to customers in Tamale."),
  item("cafe", "Café bookkeeping", "2.2", "Sharing prices"),
];

describe("searchTopics", () => {
  it("is empty for an empty query", () => {
    expect(searchTopics(ITEMS, "  ")).toEqual([]);
  });

  it("matches word starts in the title first, then summary and section", () => {
    expect(searchTopics(ITEMS, "sh").map((r) => r.id)).toEqual(["sharing", "whatsapp", "sheets", "cafe"]);
    expect(searchTopics(ITEMS, "tamale").map((r) => r.id)).toEqual(["whatsapp"]);
  });

  it("needs every word to match", () => {
    expect(searchTopics(ITEMS, "sharing whatsapp").map((r) => r.id)).toEqual(["whatsapp"]);
    expect(searchTopics(ITEMS, "sharing excel")).toEqual([]);
  });

  it("ignores case and accents and finds a topic by its number", () => {
    expect(searchTopics(ITEMS, "CAFE")[0].id).toBe("cafe");
    expect(searchTopics(ITEMS, "2.1")[0].id).toBe("whatsapp");
    expect(normalise("Café, Wa!")).toBe("cafe wa");
  });

  it("keeps reading order for ties and respects the limit", () => {
    expect(searchTopics(ITEMS, "keeping").map((r) => r.id)).toEqual(["records", "sheets"]);
    expect(searchTopics(ITEMS, "s", 2)).toHaveLength(2);
  });
});
