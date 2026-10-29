import { beforeEach, describe, expect, it, vi } from "vitest";
import { addressKey, signInPairKey, SIGN_IN_LIMIT_MESSAGE } from "@/lib/rate-limit";

vi.mock("server-only", () => ({}));

const signInWithPassword = vi.fn();
const signInWithOAuth = vi.fn();
const getClaims = vi.fn();
const updateUser = vi.fn();
const refreshSession = vi.fn();
const signOut = vi.fn();
const rpc = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => ({ auth: { signInWithPassword, signInWithOAuth, getClaims, updateUser, refreshSession, signOut }, rpc }),
}));
vi.mock("@/lib/site-url", () => ({ siteOrigin: async () => "https://sydcrest.example" }));
vi.mock("@/lib/analytics/track", () => ({ track: vi.fn(), trackNow: vi.fn(), trackRefusal: vi.fn() }));
const recordSignUpConsents = vi.fn();
vi.mock("@/lib/consent-records", () => ({ recordSignUpConsents: (...args: unknown[]) => recordSignUpConsents(...args) }));
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

const { completeWelcome, signIn, signInWithGoogle } = await import("./actions");

function form(fields: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}

const VISITOR = "41.66.200.10";
const BAD_PASSWORD = { data: {}, error: { code: "invalid_credentials", status: 400, message: "Invalid login credentials" } };

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => {});
  requestHeaders = new Headers({ "x-forwarded-for": VISITOR });
  rpc.mockResolvedValue({ data: true, error: null });
  signInWithPassword.mockResolvedValue({ data: {}, error: null });
  signInWithOAuth.mockResolvedValue({ data: { url: "https://accounts.google.example/o" }, error: null });
});

describe("signIn", () => {
  it("refuses a limited visitor before asking Supabase, with copy that does not reveal the account", async () => {
    rpc.mockResolvedValue({ data: false, error: null });
    const state = await signIn({}, form({ email: "Wumpini@Example.com", password: "guess" }));
    expect(state).toEqual({ message: SIGN_IN_LIMIT_MESSAGE, values: { email: "wumpini@example.com" } });
    expect(signInWithPassword).not.toHaveBeenCalled();
    expect(rpc).toHaveBeenCalledTimes(1);
    expect(rpc).toHaveBeenCalledWith("sign_in_allowed", {
      p_address_key: await addressKey(VISITOR),
      p_pair_key: await signInPairKey(VISITOR, "wumpini@example.com"),
    });
  });

  it("records a failure for the visitor and the visitor with this email when Supabase refuses", async () => {
    signInWithPassword.mockResolvedValue(BAD_PASSWORD);
    const state = await signIn({}, form({ email: "mariama@example.com", password: "wrong" }));
    expect(state).toEqual({ message: "That email and password don't match an account.", values: { email: "mariama@example.com" } });
    expect(rpc).toHaveBeenLastCalledWith("record_sign_in_failure", {
      p_address_key: await addressKey(VISITOR),
      p_pair_key: await signInPairKey(VISITOR, "mariama@example.com"),
    });
  });

  it("counts an unconfirmed email as a failure too, keeping its own message", async () => {
    signInWithPassword.mockResolvedValue({ data: {}, error: { code: "email_not_confirmed", status: 400, message: "x" } });
    const state = await signIn({}, form({ email: "fuseini@example.com", password: "right" }));
    expect(state.message).toBe("Confirm your email first. Check your inbox for the link we sent.");
    expect(rpc).toHaveBeenCalledWith("record_sign_in_failure", expect.anything());
  });

  it("signs in and records nothing on success", async () => {
    await expect(signIn({}, form({ email: "abdul@example.com", password: "right", next: "/paths" }))).rejects.toMatchObject({
      to: "/paths",
    });
    expect(rpc).toHaveBeenCalledTimes(1);
    expect(rpc).toHaveBeenCalledWith("sign_in_allowed", expect.anything());
  });

  it("keys the email per visitor, so failures elsewhere never block the owner", async () => {
    const here = await signInPairKey(VISITOR, "abdul@example.com");
    expect(here).toMatch(/^[0-9a-f]{64}$/);
    expect(await signInPairKey(VISITOR, " Abdul@Example.com ")).toBe(here);
    expect(await signInPairKey("102.176.9.4", "abdul@example.com")).not.toBe(here);
    expect(await signInPairKey(VISITOR, "hawa@example.com")).not.toBe(here);
    expect(here).not.toBe(await addressKey(VISITOR));
  });

  it("never limits loopback (local dev and e2e)", async () => {
    signInWithPassword.mockResolvedValue(BAD_PASSWORD);
    for (const address of ["127.0.0.1", "::1"]) {
      requestHeaders = new Headers({ "x-forwarded-for": address });
      await signIn({}, form({ email: "mariama@example.com", password: "wrong" }));
    }
    requestHeaders = new Headers();
    await signIn({}, form({ email: "mariama@example.com", password: "wrong" }));
    expect(rpc).not.toHaveBeenCalled();
    expect(signInWithPassword).toHaveBeenCalledTimes(3);
  });

  it("lets the attempt through when the limiter itself fails, logging without the email", async () => {
    rpc.mockResolvedValue({ data: null, error: { code: "PGRST202", message: "not found" } });
    await expect(signIn({}, form({ email: "abdul@example.com", password: "right" }))).rejects.toMatchObject({ to: "/dashboard" });
    expect(signInWithPassword).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith("sign in limit failed", expect.not.objectContaining({ email: expect.anything() }));
  });

  it("checks fields before the limiter", async () => {
    const state = await signIn({}, form({ email: "wumpini@", password: "" }));
    expect(state.errors?.email).toBeDefined();
    expect(rpc).not.toHaveBeenCalled();
    expect(signInWithPassword).not.toHaveBeenCalled();
  });
});

describe("signInWithGoogle", () => {
  it("is not limited", async () => {
    await expect(signInWithGoogle()).rejects.toMatchObject({ to: "https://accounts.google.example/o" });
    expect(rpc).not.toHaveBeenCalled();
  });
});

describe("completeWelcome", () => {
  const claims = (user_metadata: Record<string, unknown>) => ({ data: { claims: { sub: "wumpini-id", user_metadata } } });

  beforeEach(() => {
    updateUser.mockResolvedValue({ data: {}, error: null });
    refreshSession.mockResolvedValue({ data: {}, error: null });
  });

  it("re-agreeing keeps the date of birth on file and never sends another one (#251)", async () => {
    getClaims.mockResolvedValue(claims({ date_of_birth: "1999-03-14", terms_version: "old" }));
    await expect(
      completeWelcome({}, form({ date_of_birth: "1990-01-01", terms: "on", adult: "on", next: "/dashboard" })),
    ).rejects.toMatchObject({ to: "/dashboard" });
    const sent = updateUser.mock.calls[0][0].data as Record<string, unknown>;
    expect(sent).not.toHaveProperty("date_of_birth");
    expect(sent).toMatchObject({ terms_version: expect.any(String), age_confirmed_at: expect.any(String) });
    expect(recordSignUpConsents).toHaveBeenCalledTimes(1);
  });

  it("asks a first time Google sign up for their date of birth and saves it", async () => {
    getClaims.mockResolvedValue(claims({ full_name: "Mariama Seidu" }));
    const missing = await completeWelcome({}, form({ terms: "on", adult: "on" }));
    expect(missing.errors?.date_of_birth).toBe("Enter your date of birth.");
    expect(updateUser).not.toHaveBeenCalled();

    await expect(completeWelcome({}, form({ date_of_birth: "2000-03-14", terms: "on", adult: "on" }))).rejects.toMatchObject({
      to: "/dashboard",
    });
    expect(updateUser.mock.calls[0][0].data).toMatchObject({ date_of_birth: "2000-03-14" });
  });

  it("needs the 18 or over tick (D1)", async () => {
    getClaims.mockResolvedValue(claims({ date_of_birth: "1999-03-14" }));
    const state = await completeWelcome({}, form({ terms: "on" }));
    expect(state.errors?.adult).toBe("Tick the box to confirm you are 18 or over.");
    expect(updateUser).not.toHaveBeenCalled();
  });

  it("signs an under 18 out without saving anything", async () => {
    getClaims.mockResolvedValue(claims({}));
    await expect(completeWelcome({}, form({ date_of_birth: "2015-01-01", terms: "on", adult: "on" }))).rejects.toMatchObject({
      to: "/login?error=age",
    });
    expect(signOut).toHaveBeenCalled();
    expect(updateUser).not.toHaveBeenCalled();
  });
});
