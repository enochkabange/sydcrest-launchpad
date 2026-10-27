import { describe, expect, it } from "vitest";
import { resolveSiteUrl } from "./site";

describe("resolveSiteUrl", () => {
  it("uses NEXT_PUBLIC_SITE_URL when set", () => {
    expect(
      resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://sydcrest.com", VERCEL_PROJECT_PRODUCTION_URL: "x.vercel.app" }),
    ).toBe("https://sydcrest.com");
  });

  it("treats an empty NEXT_PUBLIC_SITE_URL as missing", () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "", VERCEL_PROJECT_PRODUCTION_URL: "sydcrest.com" })).toBe(
      "https://sydcrest.com",
    );
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "   " })).toBe("http://localhost:3000");
  });

  it("treats an empty production URL as missing", () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "", VERCEL_PROJECT_PRODUCTION_URL: "" })).toBe(
      "http://localhost:3000",
    );
  });

  it("falls back to localhost with nothing set", () => {
    expect(resolveSiteUrl({})).toBe("http://localhost:3000");
  });

  it("always yields a value new URL accepts", () => {
    for (const env of [{}, { NEXT_PUBLIC_SITE_URL: "" }, { VERCEL_PROJECT_PRODUCTION_URL: "" }]) {
      expect(() => new URL(resolveSiteUrl(env))).not.toThrow();
    }
  });
});
