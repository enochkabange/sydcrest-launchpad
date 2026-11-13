import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
const { sendServiceEmail, SERVICE_FROM } = await import("./email");

const msg = { to: "wumpini@example.test", subject: "Your 6 month check in", text: "Hello" };

describe("sendServiceEmail", () => {
  it("sends through Resend when keyed", async () => {
    const post = vi.fn(async () => new Response(JSON.stringify({ id: "e1" }), { status: 200 }));
    const result = await sendServiceEmail(msg, { env: { RESEND_API_KEY: "re_test" }, post: post as unknown as typeof fetch });
    expect(result).toEqual({ status: "sent", id: "e1" });
    const [url, init] = post.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect(JSON.parse(String(init.body))).toEqual({ from: SERVICE_FROM, to: ["wumpini@example.test"], subject: msg.subject, text: "Hello" });
  });

  it("sends nothing without a key or an address", async () => {
    const post = vi.fn();
    expect(await sendServiceEmail(msg, { env: {}, post: post as unknown as typeof fetch })).toEqual({ status: "skipped", reason: "not_configured" });
    expect(await sendServiceEmail({ ...msg, to: null }, { env: { RESEND_API_KEY: "k" }, post: post as unknown as typeof fetch })).toEqual({
      status: "skipped",
      reason: "no_address",
    });
    expect(post).not.toHaveBeenCalled();
  });

  it("reports a failure and never throws", async () => {
    const post = vi.fn(async () => new Response("no", { status: 500 }));
    expect(await sendServiceEmail(msg, { env: { RESEND_API_KEY: "k" }, post: post as unknown as typeof fetch })).toEqual({ status: "failed", error: "resend 500" });
    const boom = vi.fn(async () => {
      throw new Error("offline");
    });
    expect(await sendServiceEmail(msg, { env: { RESEND_API_KEY: "k" }, post: boom as unknown as typeof fetch })).toEqual({ status: "failed", error: "offline" });
  });
});
