import { describe, expect, it } from "vitest";
import { classifyReferrer, normaliseTag, visitProps, withShareTags } from "./attribution";
import { validateProps } from "./events";

describe("normaliseTag", () => {
  it("makes a short lowercase slug", () => {
    expect(normaliseTag("WhatsApp")).toBe("whatsapp");
    expect(normaliseTag("  DMP 2027 / Tamale  ")).toBe("dmp-2027-tamale");
    expect(normaliseTag("chapter_poster")).toBe("chapter-poster");
    expect(normaliseTag("Café")).toBe("cafe");
  });

  it("caps the length without a trailing hyphen", () => {
    const tag = normaliseTag(`${"a".repeat(59)} b`)!;
    expect(tag.length).toBeLessThanOrEqual(60);
    expect(tag.endsWith("-")).toBe(false);
  });

  it("drops empty tags, emails and phone numbers", () => {
    expect(normaliseTag(null)).toBeNull();
    expect(normaliseTag("")).toBeNull();
    expect(normaliseTag("---")).toBeNull();
    expect(normaliseTag("wumpini@example.com")).toBeNull();
    expect(normaliseTag("+233 24 123 4567")).toBeNull();
    expect(normaliseTag("dmp-2027")).toBe("dmp-2027");
  });

  it("passes the taxonomy's slug check", () => {
    for (const raw of ["WhatsApp", "dmp 2027", "Tamale Chapter!!", "x".repeat(200)]) {
      const tag = normaliseTag(raw)!;
      expect(validateProps("visit_started", { utm_source: tag, referrer: "direct", deep_link: false })).toEqual({
        utm_source: tag,
        referrer: "direct",
        deep_link: false,
      });
    }
  });
});

describe("classifyReferrer", () => {
  const own = "sydcrest.com";
  it.each([
    [null, "direct"],
    ["", "direct"],
    ["not a url", "direct"],
    ["https://sydcrest.com/learn", "internal"],
    ["https://www.sydcrest.com/", "internal"],
    ["https://www.google.com/", "search"],
    ["https://www.google.com.gh/", "search"],
    ["https://duckduckgo.com/", "search"],
    ["https://web.whatsapp.com/", "whatsapp"],
    ["https://l.facebook.com/l.php", "facebook"],
    ["https://m.facebook.com/", "facebook"],
    ["https://l.instagram.com/", "instagram"],
    ["https://www.linkedin.com/feed/", "linkedin"],
    ["https://lnkd.in/abc", "linkedin"],
    ["https://t.co/abc", "x"],
    ["https://x.com/", "x"],
    ["https://www.tiktok.com/", "tiktok"],
    ["https://www.youtube.com/", "youtube"],
    ["https://t.me/sydcrest", "telegram"],
    ["https://mail.google.com/", "email"],
    ["https://outlook.live.com/", "email"],
    ["android-app://com.whatsapp/", "whatsapp"],
    ["android-app://com.google.android.gm/", "email"],
    ["android-app://com.google.android.googlequicksearchbox/", "search"],
    ["https://someone.github.io/", "other"],
    ["https://notgoogle.example/", "other"],
  ])("%s is %s", (referrer, kind) => {
    expect(classifyReferrer(referrer, own)).toBe(kind);
  });

  it("matches our host on any deployment", () => {
    expect(classifyReferrer("http://localhost:3000/about", "localhost:3000")).toBe("internal");
  });
});

describe("visitProps", () => {
  it("reads the tags and the referrer kind, and marks deep links", () => {
    expect(
      visitProps(
        { search: "?utm_source=WhatsApp&utm_medium=chapter&utm_campaign=Tamale&fbclid=abc", host: "sydcrest.com", pathname: "/chapters/tamale" },
        "",
      ),
    ).toEqual({ utm_source: "whatsapp", utm_medium: "chapter", utm_campaign: "tamale", referrer: "direct", deep_link: true });
  });

  it("is a plain visit to the home page with no tags", () => {
    expect(visitProps({ search: "", host: "sydcrest.com", pathname: "/" }, "https://www.google.com/")).toEqual({
      referrer: "search",
      deep_link: false,
    });
  });
});

describe("withShareTags", () => {
  it("adds the share tags and keeps the address", () => {
    expect(withShareTags("https://sydcrest.com/roadmaps/data-analyst", "copy", "roadmap")).toBe(
      "https://sydcrest.com/roadmaps/data-analyst?utm_source=copy&utm_medium=share&utm_campaign=roadmap",
    );
  });

  it("replaces tags already in the link", () => {
    expect(withShareTags("https://sydcrest.com/c/1?utm_source=whatsapp", "share", "certificate")).toBe(
      "https://sydcrest.com/c/1?utm_source=share&utm_medium=share&utm_campaign=certificate",
    );
  });

  it("leaves something that is not a full URL alone", () => {
    expect(withShareTags("/relative", "copy", "roadmap")).toBe("/relative");
  });
});
