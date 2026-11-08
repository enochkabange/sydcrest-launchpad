import { describe, expect, it } from "vitest";
import { canApply, parseChapterApplication, suggestedChapterSlug } from "./applications";

function form(values: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(values)) f.set(k, v);
  return f;
}

const good = {
  town: " Ho ",
  region: "volta",
  motivation: "Many graduates in Ho want digital skills",
  plan: "Monthly meetups at the library, with two friends helping",
};

describe("parseChapterApplication (#301)", () => {
  it("accepts a complete application, trimmed", () => {
    expect(parseChapterApplication(form(good))).toEqual({ data: { ...good, town: "Ho" }, errors: {} });
  });

  it("asks for each missing or thin answer", () => {
    const { errors } = parseChapterApplication(form({ town: "H", region: "nowhere", motivation: "short", plan: "" }));
    expect(errors).toEqual({
      town: "Enter the town or city.",
      region: "Choose the region.",
      motivation: "Write at least 20 characters.",
      plan: "Write at least 20 characters.",
    });
  });

  it("caps the length of every field", () => {
    const { errors } = parseChapterApplication(form({ ...good, town: "x".repeat(81), plan: "x".repeat(2001) }));
    expect(errors.town).toBe("Keep the town under 80 characters.");
    expect(errors.plan).toBe("Keep this under 2000 characters.");
  });
});

describe("chapter applications", () => {
  it("suggests an address from the town", () => {
    expect(suggestedChapterSlug("Sunyani West")).toBe("sunyani-west");
  });

  it("lets people apply again after a decline or withdrawal, not while one is open or approved", () => {
    expect(canApply(null)).toBe(true);
    expect(canApply("declined")).toBe(true);
    expect(canApply("withdrawn")).toBe(true);
    expect(canApply("submitted")).toBe(false);
    expect(canApply("approved")).toBe(false);
  });
});
