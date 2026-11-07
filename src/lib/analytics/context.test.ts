import { describe, expect, it } from "vitest";
import { cleanRoute, coarseRoute, deviceClass, optedOutRequest, routeFromFilePath, routePattern } from "./context";

const h = (values: Record<string, string>) => ({ get: (name: string) => values[name.toLowerCase()] ?? null });

const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148";
const ANDROID_PHONE = "Mozilla/5.0 (Linux; Android 14; TECNO KJ5) AppleWebKit/537.36 Chrome/130 Mobile Safari/537.36";
const ANDROID_TABLET = "Mozilla/5.0 (Linux; Android 13; SM-X200) AppleWebKit/537.36 Chrome/130 Safari/537.36";
const MAC = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 Chrome/130 Safari/537.36";

describe("deviceClass", () => {
  it("is coarse: phone, tablet, computer, bot or unknown", () => {
    expect(deviceClass(h({ "user-agent": IPHONE }))).toBe("mobile");
    expect(deviceClass(h({ "user-agent": ANDROID_PHONE }))).toBe("mobile");
    expect(deviceClass(h({ "user-agent": ANDROID_TABLET }))).toBe("tablet");
    expect(deviceClass(h({ "user-agent": MAC }))).toBe("desktop");
    expect(deviceClass(h({ "user-agent": MAC, "sec-ch-ua-mobile": "?1" }))).toBe("mobile");
    expect(deviceClass(h({ "user-agent": "Googlebot/2.1" }))).toBe("bot");
    expect(deviceClass(h({}))).toBe("unknown");
  });
});

describe("optedOutRequest", () => {
  it("honours Do Not Track, Global Privacy Control and the visitor's switch", () => {
    expect(optedOutRequest(h({ dnt: "1" }), undefined)).toBe(true);
    expect(optedOutRequest(h({ "sec-gpc": "1" }), undefined)).toBe(true);
    expect(optedOutRequest(h({}), "off")).toBe(true);
    expect(optedOutRequest(h({ dnt: "0" }), undefined)).toBe(false);
    expect(optedOutRequest(h({}), "on")).toBe(false);
  });
});

describe("routePattern", () => {
  it("replaces the route's params, so no slug or id is kept", () => {
    expect(routePattern("/u/wumpini-alhassan", { slug: "wumpini-alhassan" })).toBe("/u/[slug]");
    expect(
      routePattern("/learn/data-analyst/bbbbbbbb-0000-0000-0000-000000000001", {
        slug: "data-analyst",
        node: "bbbbbbbb-0000-0000-0000-000000000001",
      }),
    ).toBe("/learn/[slug]/[node]");
    expect(routePattern("/docs/a/b", { parts: ["a", "b"] })).toBe("/docs/[...parts]");
    expect(routePattern("/roadmaps", {})).toBe("/roadmaps");
    expect(routePattern("/", null)).toBe("/");
  });

  it("falls back to the safe shape for anything params missed", () => {
    expect(routePattern("/bookings/bbbbbbbb-0000-0000-0000-000000000001", {})).toBe("/bookings/[id]");
  });
});

describe("coarseRoute", () => {
  it("keeps sections and plain words, hides ids and slugs", () => {
    expect(coarseRoute("/u/mariama-seidu")).toBe("/u/[slug]");
    expect(coarseRoute("/bookings/bbbbbbbb-0000-0000-0000-000000000001?x=1")).toBe("/bookings/[id]");
    expect(coarseRoute("/cohort/week/3")).toBe("/cohort/week/[id]");
    expect(coarseRoute("/opportunities/new")).toBe("/opportunities/new");
    expect(coarseRoute("/")).toBe("/");
  });
});

describe("routeFromFilePath", () => {
  it("turns Next's route file path into the pattern", () => {
    expect(routeFromFilePath("/(app)/learn/[slug]/[node]/page")).toBe("/learn/[slug]/[node]");
    expect(routeFromFilePath("/api/analytics/route")).toBe("/api/analytics");
    expect(routeFromFilePath("/(marketing)/roadmaps/[slug]/@panel/(.)[node]/page")).toBe("/roadmaps/[slug]/[node]");
    expect(routeFromFilePath("/page")).toBe("/");
    expect(routeFromFilePath(undefined)).toBeNull();
  });
});

describe("cleanRoute", () => {
  it("accepts route patterns only", () => {
    expect(cleanRoute("/learn/[slug]/[node]")).toBe("/learn/[slug]/[node]");
    expect(cleanRoute("/about?email=x@y.z")).toBe("/about");
    expect(cleanRoute("https://example.test/")).toBeNull();
    expect(cleanRoute("/has space")).toBeNull();
    expect(cleanRoute(`/${"a".repeat(250)}`)).toBeNull();
    expect(cleanRoute(1)).toBeNull();
  });
});
