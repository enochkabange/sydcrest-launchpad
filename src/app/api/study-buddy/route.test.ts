import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const getCurrentUser = vi.fn();
vi.mock("@/lib/auth", () => ({ getCurrentUser: () => getCurrentUser() }));

const createClient = vi.fn();
vi.mock("@/lib/supabase/server", () => ({ createClient: () => createClient() }));

const anthropicCtor = vi.fn();
vi.mock("@anthropic-ai/sdk", () => ({ default: anthropicCtor }));

const { POST } = await import("./route");

const nodeId = "8f14e45f-ceea-467a-9575-0a1b2c3d4e5f";

function post(body: unknown = { nodeId, messages: [{ role: "user", content: "What is a variable?" }] }) {
  return new Request("http://localhost/api/study-buddy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

/** A Supabase stand in whose ai_usage read returns `messages`. */
function supabaseWithUsage(messages: number) {
  const query = {
    select: () => query,
    eq: () => query,
    maybeSingle: async () => ({ data: { messages }, error: null }),
  };
  return { from: vi.fn(() => query), rpc: vi.fn() };
}

const learner = { id: "1b4e28ba-2fa1-41d2-883f-0016d3cca427", email: "mariama@example.com", hasAgeAndConsent: true };

describe("POST /api/study-buddy", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it("returns 401 when signed out, before anything else", async () => {
    getCurrentUser.mockResolvedValue(null);
    vi.stubEnv("ANTHROPIC_API_KEY", "test-key");
    const res = await POST(post());
    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ error: "signed_out" });
    expect(createClient).not.toHaveBeenCalled();
    expect(anthropicCtor).not.toHaveBeenCalled();
  });

  it("returns 503 when ANTHROPIC_API_KEY is missing", async () => {
    getCurrentUser.mockResolvedValue(learner);
    vi.stubEnv("ANTHROPIC_API_KEY", "");
    const res = await POST(post());
    expect(res.status).toBe(503);
    expect(await res.json()).toMatchObject({ error: "unavailable" });
    expect(anthropicCtor).not.toHaveBeenCalled();
  });

  it("returns 429 with a friendly message at the daily limit, without calling the model", async () => {
    getCurrentUser.mockResolvedValue(learner);
    vi.stubEnv("ANTHROPIC_API_KEY", "test-key");
    const supabase = supabaseWithUsage(30);
    createClient.mockResolvedValue(supabase);
    const res = await POST(post());
    expect(res.status).toBe(429);
    const body = await res.json();
    expect(body).toMatchObject({ error: "limit_reached", remaining: 0 });
    expect(body.message).toMatch(/midnight/);
    expect(supabase.rpc).not.toHaveBeenCalled();
  });

  it("returns 400 for a malformed body", async () => {
    getCurrentUser.mockResolvedValue(learner);
    vi.stubEnv("ANTHROPIC_API_KEY", "test-key");
    const res = await POST(post({ nodeId: "nope", messages: [] }));
    expect(res.status).toBe(400);
  });
});
