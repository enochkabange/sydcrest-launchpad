import { afterEach, describe, expect, it, vi } from "vitest";
import {
  addressKey,
  allowFormSubmission,
  clientAddress,
  FORM_RATE_LIMIT_MESSAGE,
  isLocalAddress,
  isRateLimited,
  RATE_LIMIT_MESSAGE,
} from "./rate-limit";

const headers = (h: Record<string, string>) => new Headers(h);

function client(result: { data: boolean | null; error: { code?: string; message: string } | null }) {
  return { rpc: vi.fn().mockResolvedValue(result) };
}

afterEach(() => vi.restoreAllMocks());

describe("clientAddress", () => {
  it("takes the first x-forwarded-for entry", () => {
    expect(clientAddress(headers({ "x-forwarded-for": "41.66.200.10, 76.76.21.21" }))).toBe("41.66.200.10");
  });
  it("falls back to x-real-ip, then to nothing", () => {
    expect(clientAddress(headers({ "x-real-ip": "41.66.200.11" }))).toBe("41.66.200.11");
    expect(clientAddress(headers({}))).toBeNull();
  });
});

describe("isLocalAddress", () => {
  it("treats loopback and unknown as local", () => {
    for (const a of [null, "127.0.0.1", "::1", "::ffff:127.0.0.1", "localhost"]) expect(isLocalAddress(a)).toBe(true);
  });
  it("treats a public address as remote", () => {
    expect(isLocalAddress("41.66.200.10")).toBe(false);
    expect(isLocalAddress("2c0f:f5c0::1")).toBe(false);
  });
});

describe("addressKey", () => {
  it("is a stable sha256 that never contains the address", async () => {
    const key = await addressKey("41.66.200.10");
    expect(key).toMatch(/^[0-9a-f]{64}$/);
    expect(key).toBe(await addressKey("41.66.200.10"));
    expect(key).not.toBe(await addressKey("41.66.200.11"));
    expect(key).not.toContain("41.66");
  });
});

describe("isRateLimited", () => {
  it("recognises only the limiter's error code", () => {
    expect(isRateLimited({ code: "54000" })).toBe(true);
    expect(isRateLimited({ code: "42501" })).toBe(false);
    expect(isRateLimited(null)).toBe(false);
  });
});

describe("allowFormSubmission", () => {
  const remote = headers({ "x-forwarded-for": "41.66.200.10" });

  it("does not limit local runs or call the database", async () => {
    const c = client({ data: false, error: null });
    expect(await allowFormSubmission(c, "sign_up", headers({ "x-forwarded-for": "127.0.0.1" }))).toBe(true);
    expect(c.rpc).not.toHaveBeenCalled();
  });

  it("sends the bucket and the hashed address, never the address", async () => {
    const c = client({ data: true, error: null });
    expect(await allowFormSubmission(c, "waitlist", remote)).toBe(true);
    expect(c.rpc).toHaveBeenCalledWith("take_form_rate_limit", { p_bucket: "waitlist", p_key: await addressKey("41.66.200.10") });
  });

  it("refuses when the database says the address is over the limit", async () => {
    expect(await allowFormSubmission(client({ data: false, error: null }), "sign_up", remote)).toBe(false);
  });

  it("lets the form through if the limiter itself fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(await allowFormSubmission(client({ data: null, error: { message: "down" } }), "sign_up", remote)).toBe(true);
    const throwing = { rpc: vi.fn().mockRejectedValue(new Error("network")) };
    expect(await allowFormSubmission(throwing, "sign_up", remote)).toBe(true);
  });
});

describe("copy", () => {
  it("is plain and has no dashes", () => {
    for (const m of [RATE_LIMIT_MESSAGE, FORM_RATE_LIMIT_MESSAGE]) expect(m).not.toMatch(/[-–—]/);
  });
});
