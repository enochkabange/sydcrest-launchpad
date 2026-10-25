import { describe, expect, it, vi } from "vitest";
import { createFakeClient } from "./client";
import { runReengage, shouldNudge, type AuthInfo, type Candidate, type ReengageStore } from "./reengage";
import { sendWhatsApp } from "./send";

const NOW = new Date("2026-11-10T09:00:00Z");
const daysAgo = (n: number) => new Date(NOW.getTime() - n * 86_400_000).toISOString();
const ENV = { TWILIO_ACCOUNT_SID: "AC", TWILIO_AUTH_TOKEN: "tok", TWILIO_WHATSAPP_FROM: "+14155238886" };

describe("shouldNudge", () => {
  const base = { lastSignInAt: daysAgo(10), createdAt: daysAgo(30), lastNudgeAt: null, lastProgressAt: null };

  it("nudges after 7 quiet days", () => expect(shouldNudge(base, NOW)).toBe(true));
  it("waits if they signed in recently", () => expect(shouldNudge({ ...base, lastSignInAt: daysAgo(3) }, NOW)).toBe(false));
  it("waits if they made progress recently", () => expect(shouldNudge({ ...base, lastProgressAt: daysAgo(2) }, NOW)).toBe(false));
  it("waits for new accounts", () => expect(shouldNudge({ ...base, lastSignInAt: null, createdAt: daysAgo(1) }, NOW)).toBe(false));
  it("sends at most once a week", () => {
    expect(shouldNudge({ ...base, lastNudgeAt: daysAgo(6) }, NOW)).toBe(false);
    expect(shouldNudge({ ...base, lastNudgeAt: daysAgo(7) }, NOW)).toBe(true);
  });
});

function fakeStore(candidates: Candidate[], auth: Record<string, AuthInfo>, progress: Record<string, string> = {}) {
  const marked: string[] = [];
  const store: ReengageStore = {
    consentingLearners: vi.fn(async () => candidates),
    lastProgressAt: async () => new Map(Object.entries(progress)),
    authInfo: async (id) => auth[id] ?? null,
    markNudged: async (id, at) => {
      marked.push(id);
      auth[id] = { ...auth[id], lastNudgeAt: at.toISOString() };
    },
  };
  return { store, marked };
}

describe("runReengage", () => {
  const wumpini = { profileId: "u1", phone: "+233241234567", displayName: "Wumpini Alhassan" };
  const mariama = { profileId: "u2", phone: "+233501234567", displayName: "Mariama Iddrisu" };
  const quiet: AuthInfo = { lastSignInAt: daysAgo(9), createdAt: daysAgo(40), lastNudgeAt: null };

  it("only messages the learners the store says consented, and only the inactive ones", async () => {
    const client = createFakeClient();
    const { store, marked } = fakeStore([wumpini, mariama], { u1: { ...quiet }, u2: { ...quiet } }, { u2: daysAgo(1) });
    const summary = await runReengage({
      store,
      version: "2026-10",
      now: NOW,
      send: (c) => sendWhatsApp(c.phone, "reengage", { name: "x", url: "y" }, { client, env: ENV }),
    });
    expect(store.consentingLearners).toHaveBeenCalledWith("2026-10");
    expect(summary).toEqual({ considered: 2, sent: 1, skipped: 1, failed: 0 });
    expect(client.sent.map((m) => m.to)).toEqual(["whatsapp:+233241234567"]);
    expect(marked).toEqual(["u1"]);
  });

  it("does not nudge the same learner twice in a week", async () => {
    const client = createFakeClient();
    const { store } = fakeStore([wumpini], { u1: { ...quiet } });
    const send = (c: Candidate) => sendWhatsApp(c.phone, "reengage", {}, { client, env: ENV });
    await runReengage({ store, version: "v", now: NOW, send });
    await runReengage({ store, version: "v", now: new Date(NOW.getTime() + 86_400_000), send });
    expect(client.sent).toHaveLength(1);
  });

  it("does not record a nudge when Twilio is not configured", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const { store, marked } = fakeStore([wumpini, mariama], { u1: { ...quiet }, u2: { ...quiet } });
    const summary = await runReengage({ store, version: "v", now: NOW, send: (c) => sendWhatsApp(c.phone, "reengage", {}, { env: {} }) });
    expect(summary).toEqual({ considered: 2, sent: 0, skipped: 2, failed: 0 });
    expect(marked).toEqual([]);
  });

  it("does not record a nudge when the send fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { store, marked } = fakeStore([wumpini], { u1: { ...quiet } });
    const summary = await runReengage({
      store,
      version: "v",
      now: NOW,
      send: (c) => sendWhatsApp(c.phone, "reengage", {}, { client: createFakeClient({ fail: true }), env: ENV }),
    });
    expect(summary.failed).toBe(1);
    expect(marked).toEqual([]);
  });
});
