import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

let headerValues: Record<string, string> = {};
let cookieValues: Record<string, string> = {};
vi.mock("next/headers", () => ({
  headers: async () => ({ get: (n: string) => headerValues[n.toLowerCase()] ?? null }),
  cookies: async () => ({ get: (n: string) => (n in cookieValues ? { value: cookieValues[n] } : undefined) }),
}));
// Outside a request `after` throws; track then writes straight away.
vi.mock("next/server", () => ({
  after: () => {
    throw new Error("outside a request");
  },
}));
const rpc = vi.fn();
vi.mock("@/lib/supabase/server", () => ({ createClient: async () => ({ rpc }) }));

const { track, trackRefusal, trackResult } = await import("./track");

const AID = "0d4c3c9e-6d0c-4f6c-9a39-7c0d1e2f3a4b";

beforeEach(() => {
  rpc.mockReset();
  rpc.mockResolvedValue({ data: 1, error: null });
  headerValues = { "user-agent": "Mozilla/5.0 (iPhone) Mobile" };
  cookieValues = { sc_aid: AID, sc_route: "/learn/[slug]/[node]" };
});

describe("track", () => {
  it("sends the event with checked props and the request context, never the person", async () => {
    await track("node_completed", { roadmap: "data-analyst", via: "quiz" });
    expect(rpc).toHaveBeenCalledWith("record_events", {
      p_events: [{ name: "node_completed", props: { roadmap: "data-analyst", via: "quiz" } }],
      p_context: { anonymous_id: AID, session_id: null, device_class: "mobile", source: "server", route: "/learn/[slug]/[node]" },
    });
  });

  it("falls back to a safe route from the referer", async () => {
    cookieValues = {};
    headerValues = { ...headerValues, host: "localhost:3242", referer: "http://localhost:3242/u/wumpini-alhassan?x=1" };
    await track("profile_followed", { on: true });
    expect(rpc.mock.calls[0][1].p_context.route).toBe("/u/[slug]");
  });

  it("records nothing for Do Not Track, Global Privacy Control or the switch", async () => {
    headerValues.dnt = "1";
    await track("sign_out");
    headerValues = { "sec-gpc": "1" };
    await track("sign_out");
    headerValues = {};
    cookieValues = { sc_analytics: "off" };
    await track("sign_out");
    expect(rpc).not.toHaveBeenCalled();
  });

  it("never throws, whatever the database says", async () => {
    rpc.mockRejectedValueOnce(new Error("down"));
    await expect(track("sign_out")).resolves.toBeUndefined();
    rpc.mockResolvedValueOnce({ data: null, error: { code: "54000", message: "Slow down" } });
    await expect(track("sign_out")).resolves.toBeUndefined();
  });
});

describe("trackResult and trackRefusal", () => {
  it("records success as the event and failure as action_failed with a refusal type and code", async () => {
    await trackResult("booking_requested", null);
    await trackResult("booking_requested", { code: "54000", message: "Slow down" });
    await trackResult("booking_requested", { code: "42501", message: "denied" });
    await trackRefusal("signup", "validation");
    const events = rpc.mock.calls.map((c) => c[1].p_events[0]);
    expect(events).toEqual([
      { name: "booking_requested", props: {} },
      { name: "action_failed", props: { action: "booking_requested", refusal: "rate_limited", code: "54000" } },
      { name: "action_failed", props: { action: "booking_requested", refusal: "forbidden", code: "42501" } },
      { name: "action_failed", props: { action: "signup", refusal: "validation" } },
    ]);
  });
});
