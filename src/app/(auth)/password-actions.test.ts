import { beforeEach, describe, expect, it, vi } from "vitest";
import { FORM_RATE_LIMIT_MESSAGE } from "@/lib/rate-limit";
import { RESET_SENT_MESSAGE } from "@/lib/password-reset";

vi.mock("server-only", () => ({}));

const resetPasswordForEmail = vi.fn();
const updateUser = vi.fn();
const getClaims = vi.fn();
const rpc = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => ({ auth: { resetPasswordForEmail, updateUser, getClaims }, rpc }),
}));
vi.mock("@/lib/site-url", () => ({ siteOrigin: async () => "https://sydcrest.example" }));
let requestHeaders = new Headers();
vi.mock("next/headers", () => ({ headers: async () => requestHeaders }));
class Redirect extends Error {
  constructor(readonly to: string) {
    super(`redirect ${to}`);
  }
}
vi.mock("next/navigation", () => ({
  redirect: (to: string) => {
    throw new Redirect(to);
  },
}));

const { requestPasswordReset, updatePassword } = await import("./password-actions");

function form(fields: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}

const RECOVERY = { data: { claims: { sub: "u1", amr: [{ method: "recovery", timestamp: 1 }] } } };

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => {});
  requestHeaders = new Headers();
  rpc.mockResolvedValue({ data: true, error: null });
  resetPasswordForEmail.mockResolvedValue({ data: {}, error: null });
  updateUser.mockResolvedValue({ data: {}, error: null });
  getClaims.mockResolvedValue(RECOVERY);
});

describe("requestPasswordReset", () => {
  it("sends the link through /auth/callback to /reset-password and shows the neutral message", async () => {
    const state = await requestPasswordReset({}, form({ email: " Hawa@Example.com " }));
    expect(state).toEqual({ sent: RESET_SENT_MESSAGE });
    expect(resetPasswordForEmail).toHaveBeenCalledWith("hawa@example.com", {
      redirectTo: "https://sydcrest.example/auth/callback?next=%2Freset-password",
    });
  });

  it("answers an unknown address, or a Supabase refusal, exactly like a known one", async () => {
    const known = await requestPasswordReset({}, form({ email: "mariama@example.com" }));
    // Supabase answers unknown addresses without an error; its per address
    // email limit only trips for real accounts, so it must not show either.
    resetPasswordForEmail.mockResolvedValue({ data: {}, error: { code: "over_email_send_rate_limit", status: 429, message: "x" } });
    const limitedBySupabase = await requestPasswordReset({}, form({ email: "fuseini@example.com" }));
    expect(limitedBySupabase).toEqual(known);
    expect(console.error).toHaveBeenCalledWith("resetPasswordForEmail failed", expect.not.objectContaining({ email: expect.anything() }));
  });

  it("rejects a malformed email without calling Supabase", async () => {
    const state = await requestPasswordReset({}, form({ email: "wumpini@" }));
    expect(state.errors?.email).toBe("Enter a valid email address.");
    expect(state.sent).toBeUndefined();
    expect(rpc).not.toHaveBeenCalled();
    expect(resetPasswordForEmail).not.toHaveBeenCalled();
  });

  it("counts each visitor address in its own bucket and refuses one over the limit", async () => {
    requestHeaders = new Headers({ "x-forwarded-for": "41.66.200.10" });
    rpc.mockResolvedValue({ data: false, error: null });
    const state = await requestPasswordReset({}, form({ email: "abdul@example.com" }));
    expect(rpc).toHaveBeenCalledWith("take_form_rate_limit", { p_bucket: "password_reset", p_key: expect.stringMatching(/^[0-9a-f]{64}$/) });
    expect(state).toEqual({ message: FORM_RATE_LIMIT_MESSAGE, values: { email: "abdul@example.com" } });
    expect(resetPasswordForEmail).not.toHaveBeenCalled();
  });
});

describe("updatePassword", () => {
  const good = { password: "Tamale-2027-new", confirm_password: "Tamale-2027-new" };

  it("saves the new password and goes to the dashboard with a notice", async () => {
    await expect(updatePassword({}, form(good))).rejects.toMatchObject({ to: "/dashboard?notice=password" });
    expect(updateUser).toHaveBeenCalledWith({ password: "Tamale-2027-new" });
  });

  it("refuses a mismatch or a short password without saving", async () => {
    expect(await updatePassword({}, form({ password: "Tamale-2027-new", confirm_password: "Tamale-2027" }))).toEqual({
      errors: { confirm_password: "The two passwords don't match." },
    });
    expect((await updatePassword({}, form({ password: "short", confirm_password: "short" }))).errors?.password).toBe(
      "Use at least 8 characters.",
    );
    expect(updateUser).not.toHaveBeenCalled();
  });

  it("passes on Supabase's weak and same password refusals in plain words", async () => {
    updateUser.mockResolvedValueOnce({ error: { code: "weak_password", status: 422, message: "x" } });
    expect((await updatePassword({}, form(good))).errors?.password).toBe("Choose a stronger password.");
    updateUser.mockResolvedValueOnce({ error: { code: "same_password", status: 422, message: "x" } });
    expect((await updatePassword({}, form(good))).errors?.password).toMatch(/current password/);
  });

  it("needs the session a reset link signed in", async () => {
    getClaims.mockResolvedValueOnce({ data: null });
    expect(await updatePassword({}, form(good))).toEqual({ expired: true });
    getClaims.mockResolvedValueOnce({ data: { claims: { sub: "u1", amr: [{ method: "password", timestamp: 1 }] } } });
    expect(await updatePassword({}, form(good))).toEqual({ expired: true });
    expect(updateUser).not.toHaveBeenCalled();
  });
});
