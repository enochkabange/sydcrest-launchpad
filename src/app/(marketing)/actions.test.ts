import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const rpc = vi.fn();
const createPublicClient = vi.fn(async () => ({ rpc }));
vi.mock("@/lib/supabase/public", () => ({ createPublicClient: () => createPublicClient() }));
let requestHeaders = new Headers();
vi.mock("next/headers", () => ({ headers: async () => requestHeaders }));

const { joinWaitlist } = await import("./actions");

function form(fields: Record<string, string> = {}) {
  const f = new FormData();
  const values = {
    name: "Wumpini Alhassan",
    email: "Wumpini@Example.com",
    region: "northern",
    interest: "dmp_cohort",
    ...fields,
  };
  for (const [k, v] of Object.entries(values)) f.set(k, v);
  return f;
}

describe("joinWaitlist", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
    requestHeaders = new Headers();
    rpc.mockResolvedValue({ data: true, error: null });
  });

  it("saves a valid sign up through join_waitlist, with the email lower cased", async () => {
    expect(await joinWaitlist({}, form())).toEqual({ done: true });
    expect(rpc).toHaveBeenCalledWith("join_waitlist", {
      p_key: expect.stringMatching(/^[0-9a-f]{64}$/),
      p_name: "Wumpini Alhassan",
      p_email: "wumpini@example.com",
      p_region: "northern",
      p_interest: "dmp_cohort",
    });
  });

  it("answers a repeat address exactly like a new one", async () => {
    // join_waitlist itself answers true for an address already on the list.
    const fresh = await joinWaitlist({}, form());
    const repeat = await joinWaitlist({}, form());
    expect(repeat).toEqual(fresh);
  });

  it("returns field errors and saves nothing when the form is invalid", async () => {
    const state = await joinWaitlist({}, form({ name: "", region: "" }));
    expect(state.errors).toMatchObject({ name: "Tell us your name.", region: "Choose your region." });
    expect(state.done).toBeUndefined();
    expect(createPublicClient).not.toHaveBeenCalled();
  });

  it("says try again, keeping the values, when the database refuses for another reason", async () => {
    rpc.mockResolvedValue({ data: null, error: { code: "42501", message: "permission denied" } });
    const state = await joinWaitlist({}, form());
    expect(state.done).toBeUndefined();
    expect(state.message).toMatch(/Try again/);
    expect(state.values?.email).toBe("wumpini@example.com");
  });

  it("says try again when Supabase cannot be reached", async () => {
    createPublicClient.mockRejectedValueOnce(new Error("supabaseUrl is required."));
    const state = await joinWaitlist({}, form());
    expect(state.done).toBeUndefined();
    expect(state.message).toMatch(/Try again/);
  });

  it("keys the limit on the hashed visitor address and refuses one over it", async () => {
    requestHeaders = new Headers({ "x-forwarded-for": "41.66.200.10" });
    rpc.mockResolvedValue({ data: false, error: null });
    const state = await joinWaitlist({}, form());
    const { p_key } = rpc.mock.calls[0][1] as { p_key: string };
    rpc.mockClear();
    await joinWaitlist({}, form({ email: "mariama@example.com" }));
    expect((rpc.mock.calls[0][1] as { p_key: string }).p_key).toBe(p_key);
    expect(state.done).toBeUndefined();
    expect(state.message).toMatch(/many times from your connection/);
  });

  it("gives each local visitor a fresh key, so local runs are not limited", async () => {
    await joinWaitlist({}, form());
    await joinWaitlist({}, form());
    const [a, b] = rpc.mock.calls.map((c) => (c[1] as { p_key: string }).p_key);
    expect(a).not.toBe(b);
  });

  it("says so plainly when the waitlist as a whole is taking too many sign ups", async () => {
    rpc.mockResolvedValue({ data: null, error: { code: "54000", message: "Slow down" } });
    const state = await joinWaitlist({}, form());
    expect(state.done).toBeUndefined();
    expect(state.message).toMatch(/Wait a while/);
  });

  it("drops a submission that fills the honeypot, with the same thanks", async () => {
    const state = await joinWaitlist({}, form({ website: "http://spam.example" }));
    expect(state).toEqual({ done: true });
    expect(createPublicClient).not.toHaveBeenCalled();
  });
});
