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

/**
 * A Supabase stand in. The ai_usage read returns `messages`; the reservation
 * (record_ai_usage) returns `reservedAs`, the count after this turn.
 */
function supabaseWithUsage(messages: number, reservedAs = messages + 1) {
  const query = {
    select: () => query,
    eq: () => query,
    maybeSingle: async () => ({ data: { messages, title: "Variables", summary: null, roadmaps: null }, error: null }),
  };
  const rpc = vi.fn(async (name: string) =>
    name === "record_ai_usage" ? { data: { messages: reservedAs }, error: null } : { data: null, error: null },
  );
  return { from: vi.fn(() => query), rpc };
}

/** A model client whose stream says one thing and reports usage. */
function fakeAnthropic() {
  const final = { stop_reason: "end_turn", usage: { input_tokens: 10, output_tokens: 4 } };
  const stream = vi.fn(() => ({
    currentMessage: final,
    abort: vi.fn(),
    finalMessage: async () => final,
    async *[Symbol.asyncIterator]() {
      yield { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "Hello" } };
    },
  }));
  anthropicCtor.mockImplementation(function () {
    return { messages: { stream } };
  });
  return stream;
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

  it("reserves the turn before calling the model and adds tokens after", async () => {
    getCurrentUser.mockResolvedValue(learner);
    vi.stubEnv("ANTHROPIC_API_KEY", "test-key");
    const stream = fakeAnthropic();
    const supabase = supabaseWithUsage(29, 30);
    createClient.mockResolvedValue(supabase);
    const res = await POST(post());
    expect(res.status).toBe(200);
    expect(res.headers.get("X-Study-Buddy-Remaining")).toBe("0");
    expect(supabase.rpc).toHaveBeenNthCalledWith(1, "record_ai_usage", { p_input_tokens: 0, p_output_tokens: 0 });
    expect(supabase.rpc.mock.invocationCallOrder[0]).toBeLessThan(stream.mock.invocationCallOrder[0] ?? Infinity);
    expect(await res.text()).toBe("Hello");
    expect(stream).toHaveBeenCalledTimes(1);
    expect(supabase.rpc).toHaveBeenLastCalledWith("record_ai_tokens", { p_input_tokens: 10, p_output_tokens: 4 });
    // The message is counted once, by the reservation only.
    expect(supabase.rpc.mock.calls.filter(([name]) => name === "record_ai_usage")).toHaveLength(1);
  });

  it("returns 429 without calling the model when a parallel request took the last message", async () => {
    getCurrentUser.mockResolvedValue(learner);
    vi.stubEnv("ANTHROPIC_API_KEY", "test-key");
    const stream = fakeAnthropic();
    // The read saw 29 used, but another request reserved first, so this one is the 31st.
    const supabase = supabaseWithUsage(29, 31);
    createClient.mockResolvedValue(supabase);
    const res = await POST(post());
    expect(res.status).toBe(429);
    expect(await res.json()).toMatchObject({ error: "limit_reached", remaining: 0 });
    expect(stream).not.toHaveBeenCalled();
    expect(supabase.rpc).not.toHaveBeenCalledWith("record_ai_tokens", expect.anything());
  });

  it("runs the companion chat without a topic, offering the read only tools", async () => {
    getCurrentUser.mockResolvedValue(learner);
    vi.stubEnv("ANTHROPIC_API_KEY", "test-key");
    const stream = fakeAnthropic();
    const supabase = supabaseWithUsage(3);
    createClient.mockResolvedValue(supabase);
    const res = await POST(post({ messages: [{ role: "user", content: "What should I do next?" }] }));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Hello");
    const params = (stream.mock.calls[0] as unknown[])[0] as { tools: { name: string }[]; system: { text: string }[] };
    expect(params.tools.map((t) => t.name)).toEqual(["my_next_steps", "suggest_mentors", "find_opportunities", "upcoming_events"]);
    expect(params.system[1].text).toMatch(/companion/);
    // No topic lookup happened.
    expect(supabase.from).toHaveBeenCalledWith("ai_usage");
    expect(supabase.from).not.toHaveBeenCalledWith("roadmap_nodes");
  });

  it("returns 400 for a malformed body", async () => {
    getCurrentUser.mockResolvedValue(learner);
    vi.stubEnv("ANTHROPIC_API_KEY", "test-key");
    const res = await POST(post({ nodeId: "nope", messages: [] }));
    expect(res.status).toBe(400);
  });
});
