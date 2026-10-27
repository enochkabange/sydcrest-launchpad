import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeClient } from "@/lib/messaging/client";

vi.mock("server-only", () => ({}));

const USER = { id: "aaaaaaaa-0000-0000-0000-000000000003", email: "fuseini@example.test" };
vi.mock("@/lib/auth", () => ({ requireUser: async () => USER }));

// Real templates and send path, with the fake Twilio client and test credentials.
const fake = vi.hoisted(() => ({ client: null as unknown }));
vi.mock("@/lib/messaging/send", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/messaging/send")>();
  const env = { TWILIO_ACCOUNT_SID: "AC", TWILIO_AUTH_TOKEN: "tok", TWILIO_WHATSAPP_FROM: "+14155238886" };
  return {
    ...actual,
    sendWhatsApp: (to: string, template: "welcome", vars: Record<string, string | null>) =>
      actual.sendWhatsApp(to, template, vars, { client: fake.client as ReturnType<typeof createFakeClient>, env }),
  };
});

type Row = { version: string; revoked_at: string | null; phone: string | null };
const db = vi.hoisted(() => ({ phone: null as string | null, consents: [] as unknown[], inserts: [] as unknown[] }));
vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => ({
    rpc: async () => ({ error: null }),
    from(table: string) {
      if (table === "profiles") {
        return { select: () => ({ eq: () => ({ single: async () => ({ data: { phone: db.phone, display_name: "Fuseini Abukari" } }) }) }) };
      }
      return {
        select: () => ({ eq: () => ({ eq: async () => ({ data: db.consents, error: null }) }) }),
        insert: async (row: unknown) => (db.inserts.push(row), { error: null }),
      };
    },
  }),
}));

const { setWhatsAppConsent } = await import("./whatsapp-actions");

const FUSEINI = "+233241234567";
const NEW_NUMBER = "+233501234567";
const on = () => {
  const form = new FormData();
  form.set("whatsapp", "on");
  return form;
};
const revoked = (phone: string | null): Row => ({ version: "2026-10", revoked_at: "2026-10-20T10:00:00Z", phone });

let client: ReturnType<typeof createFakeClient>;
beforeEach(() => {
  client = createFakeClient();
  fake.client = client;
  db.phone = FUSEINI;
  db.consents = [];
  db.inserts = [];
});

describe("setWhatsAppConsent", () => {
  it("records consent without naming a number and welcomes a first opt in", async () => {
    expect(await setWhatsAppConsent({}, on())).toMatchObject({ enabled: true });
    expect(db.inserts).toEqual([{ kind: "whatsapp", version: "2026-10" }]);
    expect(client.sent).toHaveLength(1);
    expect(client.sent[0]).toMatchObject({ to: `whatsapp:${FUSEINI}`, body: expect.stringMatching(/^Hi Fuseini,/) });
  });

  it("does not welcome the same number twice", async () => {
    db.consents = [revoked(FUSEINI)];
    await setWhatsAppConsent({}, on());
    expect(db.inserts).toHaveLength(1);
    expect(client.sent).toHaveLength(0);
  });

  it("welcomes a new number after a number change", async () => {
    db.phone = NEW_NUMBER;
    db.consents = [revoked(FUSEINI)];
    await setWhatsAppConsent({}, on());
    expect(client.sent.map((m) => m.to)).toEqual([`whatsapp:${NEW_NUMBER}`]);
  });

  it("needs a saved phone number", async () => {
    db.phone = null;
    expect(await setWhatsAppConsent({}, on())).toMatchObject({ enabled: false });
    expect(db.inserts).toHaveLength(0);
    expect(client.sent).toHaveLength(0);
  });
});
