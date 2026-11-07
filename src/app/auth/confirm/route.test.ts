import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

vi.mock("server-only", () => ({}));
const verifyOtp = vi.fn();
const getClaims = vi.fn();
vi.mock("@/lib/supabase/server", () => ({ createClient: async () => ({ auth: { verifyOtp, getClaims } }) }));

const { GET } = await import("./route");
const call = (query: string) => GET(new NextRequest(`https://sydcrest.example/auth/confirm${query}`));
const location = async (query: string) => (await call(query)).headers.get("location");
const SESSION = { session: { access_token: "jwt1" } };

describe("/auth/confirm", () => {
  beforeEach(() => {
    verifyOtp.mockReset();
    getClaims.mockReset();
    getClaims.mockResolvedValue({ data: { claims: { session_id: "s1" } } });
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it.each(["signup", "recovery", "email_change", "invite", "magiclink", "email"])("verifies a %s link", async (type) => {
    verifyOtp.mockResolvedValue({ data: SESSION, error: null });
    await location(`?token_hash=hash1&type=${type}&next=%2Fprofile`);
    expect(verifyOtp).toHaveBeenCalledWith({ type, token_hash: "hash1" });
  });

  it("lands a reset link on /reset-password by default", async () => {
    verifyOtp.mockResolvedValue({ data: SESSION, error: null });
    expect(await location("?token_hash=h&type=recovery")).toBe("https://sydcrest.example/reset-password");
    expect(await location("?token_hash=h&type=recovery&next=%2Freset-password")).toBe(
      "https://sydcrest.example/reset-password",
    );
  });

  it("marks only a reset session, with its session id", async () => {
    verifyOtp.mockResolvedValue({ data: SESSION, error: null });
    const reset = await call("?token_hash=h&type=recovery");
    expect(getClaims).toHaveBeenCalledWith("jwt1");
    const cookie = reset.cookies.get("sc_recovery");
    expect(cookie).toMatchObject({ value: "s1", httpOnly: true, secure: true, path: "/", maxAge: 3600 });

    const signup = await call("?token_hash=h&type=email");
    expect(signup.cookies.get("sc_recovery")).toBeUndefined();
  });

  it("lands a sign up on next, or the dashboard", async () => {
    verifyOtp.mockResolvedValue({ data: SESSION, error: null });
    expect(await location("?token_hash=h&type=email")).toBe("https://sydcrest.example/dashboard");
    expect(await location("?token_hash=h&type=email&next=%2Fpath")).toBe("https://sydcrest.example/path");
  });

  it("takes only the local path from the sign up redirect URL", async () => {
    verifyOtp.mockResolvedValue({ data: SESSION, error: null });
    const redirectTo = encodeURIComponent("https://sydcrest.com/auth/callback?next=%2Fbusiness%2Fnew");
    expect(await location(`?token_hash=h&type=email&next=${redirectTo}`)).toBe("https://sydcrest.example/business/new");
    expect(await location(`?token_hash=h&type=email&next=${encodeURIComponent("https://sydcrest.com")}`)).toBe(
      "https://sydcrest.example/dashboard",
    );
    expect(await location(`?token_hash=h&type=email&next=${encodeURIComponent("https://evil.example/path")}`)).toBe(
      "https://sydcrest.example/path",
    );
  });

  it("rejects unsafe next values", async () => {
    verifyOtp.mockResolvedValue({ data: SESSION, error: null });
    for (const next of ["//evil.example", "/\\evil.example", "javascript:alert(1)", "evil.example"]) {
      expect(await location(`?token_hash=h&type=email&next=${encodeURIComponent(next)}`)).toBe(
        "https://sydcrest.example/dashboard",
      );
    }
    const nested = encodeURIComponent("https://sydcrest.com/auth/callback?next=%2F%2Fevil.example");
    expect(await location(`?token_hash=h&type=email&next=${nested}`)).toBe("https://sydcrest.example/dashboard");
  });

  it("sends a dead reset link back to the forgot password form, others to sign in", async () => {
    verifyOtp.mockResolvedValue({ data: { session: null }, error: { code: "otp_expired", status: 403 } });
    expect(await location("?token_hash=h&type=recovery")).toBe("https://sydcrest.example/forgot-password?error=link");
    expect(await location("?token_hash=h&type=email&next=%2Fpath")).toBe("https://sydcrest.example/login?error=link");
  });

  it("refuses a missing token or unknown type without calling Supabase", async () => {
    expect(await location("?type=recovery")).toBe("https://sydcrest.example/forgot-password?error=link");
    expect(await location("?token_hash=h&type=sms")).toBe("https://sydcrest.example/login?error=link");
    expect(await location("?token_hash=h")).toBe("https://sydcrest.example/login?error=link");
    expect(verifyOtp).not.toHaveBeenCalled();
  });
});
