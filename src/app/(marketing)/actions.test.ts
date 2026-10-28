import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const insert = vi.fn();
const from = vi.fn(() => ({ insert }));
const rpc = vi.fn();
const createPublicClient = vi.fn(async () => ({ from, rpc }));
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

  it("saves a valid sign up, with the email lower cased", async () => {
    insert.mockResolvedValue({ error: null });
    expect(await joinWaitlist({}, form())).toEqual({ done: true });
    expect(from).toHaveBeenCalledWith("waitlist");
    expect(insert).toHaveBeenCalledWith({
      name: "Wumpini Alhassan",
      email: "wumpini@example.com",
      region: "northern",
      interest: "dmp_cohort",
    });
  });

  it("answers a repeat address exactly like a new one", async () => {
    insert.mockResolvedValue({ error: null });
    const fresh = await joinWaitlist({}, form());
    insert.mockResolvedValue({ error: { code: "23505", message: "duplicate key value" } });
    const repeat = await joinWaitlist({}, form());
    expect(repeat).toEqual(fresh);
  });

  it("returns field errors and saves nothing when the form is invalid", async () => {
    const state = await joinWaitlist({}, form({ name: "", region: "" }));
    expect(state.errors).toMatchObject({ name: "Tell us your name.", region: "Choose your region." });
    expect(state.done).toBeUndefined();
    expect(createPublicClient).not.toHaveBeenCalled();
  });

  it("says try again, keeping the values, when the insert fails for another reason", async () => {
    insert.mockResolvedValue({ error: { code: "42501", message: "permission denied" } });
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

  it("counts each visitor address and refuses one over the limit, saving nothing", async () => {
    requestHeaders = new Headers({ "x-forwarded-for": "41.66.200.10" });
    rpc.mockResolvedValue({ data: false, error: null });
    const state = await joinWaitlist({}, form());
    expect(rpc).toHaveBeenCalledWith("take_form_rate_limit", expect.objectContaining({ p_bucket: "waitlist" }));
    expect(state.done).toBeUndefined();
    expect(state.message).toMatch(/many times from your connection/);
    expect(insert).not.toHaveBeenCalled();
  });

  it("says so plainly when the waitlist as a whole is taking too many sign ups", async () => {
    insert.mockResolvedValue({ error: { code: "54000", message: "Slow down" } });
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
