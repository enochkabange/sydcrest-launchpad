import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("./track", () => ({ recordEvents: vi.fn() }));
vi.mock("@/lib/messaging/admin", () => ({ createAdminClient: () => null }));

const { serverErrorEvent } = await import("./server-error");

const request = (headers: Record<string, string> = {}) => ({
  path: "/learn/data-analyst/x?email=wumpini@example.test",
  method: "POST",
  headers: { "user-agent": "Mozilla/5.0 (iPhone) Mobile", ...headers },
});

describe("serverErrorEvent", () => {
  it("records the route pattern, route type, error class and digest, never the message", () => {
    const error = Object.assign(new TypeError("boom for wumpini@example.test"), { digest: "1234567890" });
    expect(serverErrorEvent(error, request(), { routePath: "/(app)/learn/[slug]/[node]/page", routeType: "action" })).toEqual({
      event: { name: "server_error", props: { route_type: "action", digest: "1234567890", error: "TypeError" } },
      route: "/learn/[slug]/[node]",
      device: "mobile",
    });
  });

  it("skips redirects and not found, which Next throws on purpose", () => {
    expect(serverErrorEvent({ digest: "NEXT_REDIRECT;replace;/login;307;" }, request(), { routeType: "render" })).toBeNull();
    expect(serverErrorEvent({ digest: "NEXT_HTTP_ERROR_FALLBACK;404" }, request(), { routeType: "render" })).toBeNull();
  });

  it("skips visitors who opted out", () => {
    expect(serverErrorEvent(new Error("x"), request({ dnt: "1" }), { routeType: "route" })).toBeNull();
    expect(serverErrorEvent(new Error("x"), request({ cookie: "a=b; sc_analytics=off" }), { routeType: "route" })).toBeNull();
  });
});
