import { describe, expect, it } from "vitest";
import { normaliseTag } from "../analytics/attribution";
import { chapterCampaignLink, targetPath } from "./campaign-link";

const ORIGIN = "https://launchpad.sydcrest.test";

describe("chapterCampaignLink", () => {
  it("writes the chapter tags", () => {
    expect(chapterCampaignLink({ origin: ORIGIN, path: "/chapters/tamale", chapterSlug: "tamale" })).toBe(
      `${ORIGIN}/chapters/tamale?utm_source=whatsapp&utm_medium=chapter&utm_campaign=tamale`,
    );
  });

  it("adds an optional content label", () => {
    const link = chapterCampaignLink({ origin: ORIGIN, path: "/signup", chapterSlug: "north-east", content: "Nalerigu Library" });
    const url = new URL(link!);
    expect(url.pathname).toBe("/signup");
    expect(Object.fromEntries(url.searchParams)).toEqual({
      utm_source: "whatsapp",
      utm_medium: "chapter",
      utm_campaign: "north-east",
      utm_content: "nalerigu-library",
    });
  });

  it("writes tags the browser reads back unchanged", () => {
    const url = new URL(chapterCampaignLink({ origin: ORIGIN, chapterSlug: "Bolgatanga", content: "Skillshop March!" })!);
    for (const [, value] of url.searchParams) expect(normaliseTag(value)).toBe(value);
    expect(url.searchParams.get("utm_campaign")).toBe("bolgatanga");
  });

  it("drops a content label that looks like a phone number or email", () => {
    const url = new URL(chapterCampaignLink({ origin: ORIGIN, chapterSlug: "wa", content: "+233 24 123 4567" })!);
    expect(url.searchParams.has("utm_content")).toBe(false);
  });

  it("stays on the site", () => {
    expect(new URL(chapterCampaignLink({ origin: ORIGIN, path: "//evil.test/x", chapterSlug: "wa" })!).host).toBe("launchpad.sydcrest.test");
    expect(chapterCampaignLink({ origin: "javascript:alert(1)", chapterSlug: "wa" })).toBeNull();
    expect(chapterCampaignLink({ origin: ORIGIN, chapterSlug: "  " })).toBeNull();
  });

  it("maps targets to pages", () => {
    expect(targetPath("chapter", "tamale")).toBe("/chapters/tamale");
    expect(targetPath("signup", "tamale")).toBe("/signup");
  });
});
