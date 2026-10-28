import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

vi.mock("server-only", () => ({}));
const exchangeCodeForSession = vi.fn();
vi.mock("@/lib/supabase/server", () => ({ createClient: async () => ({ auth: { exchangeCodeForSession } }) }));

const { GET } = await import("./route");
const call = (query: string) => GET(new NextRequest(`https://sydcrest.example/auth/callback${query}`));

describe("/auth/callback", () => {
  beforeEach(() => exchangeCodeForSession.mockReset());

  it("lands a reset link on /reset-password", async () => {
    exchangeCodeForSession.mockResolvedValue({ error: null });
    const res = await call("?code=abc&next=%2Freset-password");
    expect(exchangeCodeForSession).toHaveBeenCalledWith("abc");
    expect(res.headers.get("location")).toBe("https://sydcrest.example/reset-password");
  });

  it("only follows local paths", async () => {
    exchangeCodeForSession.mockResolvedValue({ error: null });
    expect((await call("?code=abc&next=%2F%2Fevil.example")).headers.get("location")).toBe("https://sydcrest.example/dashboard");
  });

  it("sends a dead reset link back to the forgot password form, others to sign in", async () => {
    exchangeCodeForSession.mockResolvedValue({ error: { message: "expired" } });
    expect((await call("?code=abc&next=%2Freset-password")).headers.get("location")).toBe(
      "https://sydcrest.example/forgot-password?error=link",
    );
    expect((await call("?code=abc&next=%2Fdashboard")).headers.get("location")).toBe("https://sydcrest.example/login?error=link");
  });
});
