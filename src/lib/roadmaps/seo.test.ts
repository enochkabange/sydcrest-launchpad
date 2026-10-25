import { describe, expect, it } from "vitest";
import { roadmapMetadata, truncate } from "./seo";

describe("truncate", () => {
  it("leaves short text alone and collapses whitespace", () => {
    expect(truncate("  Learn   SQL  ", 20)).toBe("Learn SQL");
  });

  it("cuts at a word boundary with an ellipsis", () => {
    expect(truncate("Turn messy numbers into clear answers for businesses", 30)).toBe("Turn messy numbers into clear…");
  });
});

describe("roadmapMetadata", () => {
  it("sets canonical, Open Graph and the share image", () => {
    const meta = roadmapMetadata({
      title: "Data Analyst",
      description: "Turn numbers into answers.",
      path: "/roadmaps/data-analyst",
      image: "/og/roadmaps/data-analyst",
    });
    expect(meta.title).toBe("Data Analyst");
    expect(meta.alternates?.canonical).toBe("/roadmaps/data-analyst");
    expect(meta.openGraph).toMatchObject({
      title: "Data Analyst · SydCrest Launchpad",
      url: "/roadmaps/data-analyst",
      images: [{ url: "/og/roadmaps/data-analyst", width: 1200, height: 630 }],
    });
  });
});
