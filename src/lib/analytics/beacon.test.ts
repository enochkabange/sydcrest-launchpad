import { describe, expect, it } from "vitest";
import { BEACON_MAX_BYTES, BEACON_MAX_EVENTS, batchBodies, parseBeacon, sameOrigin } from "./beacon";

const SID = "5b2b1f0a-1111-4222-8333-944455556666";

describe("parseBeacon", () => {
  it("keeps browser events with checked props and route patterns", () => {
    const parsed = parseBeacon(
      JSON.stringify({
        sid: SID,
        events: [
          { n: "page_view", r: "/roadmaps/[slug]" },
          { n: "web_vital", p: { metric: "LCP", value: 2140.5, rating: "good", email: "x@y.z" }, r: "/dashboard" },
          { n: "form_started", p: { form: "programme_apply" } },
        ],
      }),
    );
    expect(parsed).toEqual({
      sessionId: SID,
      events: [
        { name: "page_view", props: {}, route: "/roadmaps/[slug]" },
        { name: "web_vital", props: { metric: "LCP", value: 2140.5, rating: "good" }, route: "/dashboard" },
        { name: "form_started", props: { form: "programme_apply" }, route: null },
      ],
    });
  });

  it("drops server only events, unknown names and junk rows", () => {
    const parsed = parseBeacon(
      JSON.stringify({ sid: "nope", events: [{ n: "booking_requested" }, { n: "made_up" }, null, "x", { n: "page_view", r: "https://evil.test" }] }),
    );
    expect(parsed).toEqual({ sessionId: null, events: [{ name: "page_view", props: {}, route: null }] });
  });

  it("caps the batch", () => {
    const events = Array.from({ length: 40 }, () => ({ n: "page_view" }));
    expect(parseBeacon(JSON.stringify({ events }))?.events).toHaveLength(BEACON_MAX_EVENTS);
  });

  it("refuses what is not a beacon", () => {
    expect(parseBeacon("")).toBeNull();
    expect(parseBeacon("not json")).toBeNull();
    expect(parseBeacon("[]")).toBeNull();
    expect(parseBeacon(JSON.stringify({ events: "x" }))).toBeNull();
    expect(parseBeacon("x".repeat(BEACON_MAX_BYTES + 1))).toBeNull();
  });
});

describe("batchBodies", () => {
  it("splits by event count and by bytes, and drops an event too big alone", () => {
    const events = Array.from({ length: 30 }, () => ({ n: "page_view", r: "/" }));
    const bodies = batchBodies(SID, events);
    expect(bodies).toHaveLength(2);
    expect(bodies.map((b) => JSON.parse(b).events.length)).toEqual([25, 5]);
    expect(JSON.parse(bodies[0]).sid).toBe(SID);

    const big = { n: "client_error", p: { message: "x".repeat(BEACON_MAX_BYTES) } };
    const mixed = batchBodies(SID, [{ n: "page_view" }, big, { n: "page_view" }]);
    expect(mixed.map((b) => JSON.parse(b).events.length)).toEqual([1, 1]);
    for (const body of mixed) expect(body.length).toBeLessThanOrEqual(BEACON_MAX_BYTES);
  });

  it("sends nothing for nothing", () => {
    expect(batchBodies(SID, [])).toEqual([]);
  });
});

describe("sameOrigin", () => {
  const h = (values: Record<string, string>) => ({ get: (name: string) => values[name] ?? null });
  it("accepts the site's own pages only", () => {
    expect(sameOrigin(h({ origin: "https://sydcrest.org", host: "sydcrest.org" }))).toBe(true);
    expect(sameOrigin(h({ origin: "http://localhost:3242", host: "localhost:3242", "sec-fetch-site": "same-origin" }))).toBe(true);
    expect(sameOrigin(h({ origin: "https://evil.test", host: "sydcrest.org" }))).toBe(false);
    expect(sameOrigin(h({ origin: "https://sydcrest.org", host: "sydcrest.org", "sec-fetch-site": "cross-site" }))).toBe(false);
    expect(sameOrigin(h({ host: "sydcrest.org" }))).toBe(false);
  });
});
