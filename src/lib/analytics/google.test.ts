import { describe, expect, it } from "vitest";
import { measurementId } from "./google";

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
