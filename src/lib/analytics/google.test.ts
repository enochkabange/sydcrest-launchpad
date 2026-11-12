import { describe, expect, it } from "vitest";
import { gaPageLocation, gaPageTitle, measurementId } from "./google";

describe("measurementId", () => {
  it("accepts a GA4 id and trims it", () => {
    expect(measurementId(" G-ABC123XYZ ")).toBe("G-ABC123XYZ");
  });

  it("is off when unset or not a GA4 id", () => {
    expect(measurementId(undefined)).toBeNull();
    expect(measurementId("")).toBeNull();
    expect(measurementId("UA-12345-1")).toBeNull();
    expect(measurementId("G-abc<script>")).toBeNull();
  });
});

describe("gaPageLocation", () => {
  it("keeps only campaign tags and the Ads click id", () => {
    expect(
      gaPageLocation(
        "https://sydcrest.com",
        "/programme",
        "?utm_source=whatsapp&utm_medium=chapter&email=amina%40example.com&gclid=abc",
      ),
    ).toBe("https://sydcrest.com/programme?utm_source=whatsapp&utm_medium=chapter&gclid=abc");
  });

  it("sends the route pattern with no query when there are no tags", () => {
    expect(gaPageLocation("https://sydcrest.com", "/u/[slug]", "?tab=posts")).toBe("https://sydcrest.com/u/[slug]");
  });

  it("cuts long tag values", () => {
    const long = "x".repeat(300);
    expect(gaPageLocation("https://sydcrest.com", "/", `?utm_campaign=${long}`)).toBe(
      `https://sydcrest.com/?utm_campaign=${"x".repeat(100)}`,
    );
  });
});

describe("gaPageTitle", () => {
  it("keeps the title of a fixed page", () => {
    expect(gaPageTitle("/programme", "Programme · SydCrest")).toBe("Programme · SydCrest");
  });

  it("uses the route on pages that may name a person", () => {
    expect(gaPageTitle("/u/[slug]", "Abdul-Rahman Iddrisu · SydCrest")).toBe("/u/[slug]");
  });
});
