import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { expectedSignature } from "./signature";

// Route handlers run outside Next here: stub the request time guard and the service role client.
vi.mock("server-only", () => ({}));
vi.mock("next/server", () => ({ connection: async () => {} }));
const admin = vi.hoisted(() => ({ current: null as unknown }));
vi.mock("@/lib/messaging/admin", () => ({ createAdminClient: () => admin.current }));

const { POST } = await import("@/app/api/webhooks/twilio/route");
const { GET } = await import("@/app/api/cron/reengage/route");

const URL_ = "https://sydcrest.com/api/webhooks/twilio";
const FUSEINI = "+233241234567";

function inbound(params: Record<string, string>, token = "tok") {
  return new Request(URL_, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-twilio-signature": expectedSignature(token, URL_, params),
    },
    body: new URLSearchParams(params),
  });
}

/** Minimal chainable stand in for the supabase-js query builder. */
function fakeAdmin(profileIds: string[]) {
  const updates: { values: unknown; filters: unknown[][] }[] = [];
  return {
    updates,
    from(table: string) {
      if (table === "profiles") {
        return { select: () => ({ eq: async () => ({ data: profileIds.map((id) => ({ id })), error: null }) }) };
      }
      const entry = { values: undefined as unknown, filters: [] as unknown[][] };
      const chain = {
        in: (...a: unknown[]) => (entry.filters.push(["in", ...a]), chain),
        eq: (...a: unknown[]) => (entry.filters.push(["eq", ...a]), chain),
        is: async (...a: unknown[]) => (entry.filters.push(["is", ...a]), updates.push(entry), { error: null }),
      };
      return { update: (values: unknown) => ((entry.values = values), chain) };
    },
  };
}

beforeEach(() => {
  vi.stubEnv("TWILIO_AUTH_TOKEN", "tok");
  vi.stubEnv("TWILIO_WEBHOOK_URL", URL_);
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  admin.current = null;
});

describe("Twilio webhook", () => {
  it("is a 503 no op without TWILIO_AUTH_TOKEN", async () => {
    vi.stubEnv("TWILIO_AUTH_TOKEN", "");
    expect((await POST(inbound({ Body: "STOP", From: FUSEINI }))).status).toBe(503);
  });

  it("refuses a bad signature", async () => {
    const res = await POST(inbound({ Body: "STOP", From: `whatsapp:${FUSEINI}` }, "not-the-token"));
    expect(res.status).toBe(403);
  });

  it("revokes WhatsApp consent for that phone on STOP and confirms", async () => {
    const fake = fakeAdmin(["u1"]);
    admin.current = fake;
    const res = await POST(inbound({ Body: "stop", From: `whatsapp:${FUSEINI}` }));
    expect(res.status).toBe(200);
    expect(await res.text()).toContain("You will not get any more WhatsApp messages");
    expect(fake.updates).toHaveLength(1);
    expect(fake.updates[0].filters).toEqual([
      ["in", "profile_id", ["u1"]],
      ["eq", "kind", "whatsapp"],
      ["is", "revoked_at", null],
    ]);
  });

  it("ignores other replies", async () => {
    const fake = fakeAdmin(["u1"]);
    admin.current = fake;
    const res = await POST(inbound({ Body: "Thanks!", From: `whatsapp:${FUSEINI}` }));
    expect(await res.text()).toContain("<Response/>");
    expect(fake.updates).toHaveLength(0);
  });
});

describe("re engagement cron", () => {
  it("needs the cron secret", async () => {
    vi.stubEnv("CRON_SECRET", "s3cret");
    const res = await GET(new Request("https://sydcrest.com/api/cron/reengage", { headers: { authorization: "Bearer nope" } }));
    expect(res.status).toBe(401);
  });

  it("is a 503 no op without SUPABASE_SECRET_KEY", async () => {
    vi.stubEnv("CRON_SECRET", "s3cret");
    const res = await GET(new Request("https://sydcrest.com/api/cron/reengage", { headers: { authorization: "Bearer s3cret" } }));
    expect(res.status).toBe(503);
  });
});
