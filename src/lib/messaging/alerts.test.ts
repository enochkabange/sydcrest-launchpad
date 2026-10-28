import { beforeEach, describe, expect, it, vi } from "vitest";
import { runAlerts, type AlertDeps } from "./alerts";
import { resetLogOnce } from "./config";
import { renderTemplate } from "./templates";

const ENV = { TWILIO_ACCOUNT_SID: "AC_test", TWILIO_AUTH_TOKEN: "token_test", TWILIO_WHATSAPP_FROM: "+14155238886" };
const MESSAGE = { title: "Mariama accepted your booking", href: "/bookings/abc" };

function deps(overrides: Partial<AlertDeps> = {}): AlertDeps {
  return {
    env: ENV,
    consented: async () => [{ profileId: "wumpini", phone: "+233241234567", displayName: "Wumpini Alhassan" }],
    send: vi.fn(async () => ({ status: "sent" as const, sid: "SM1" })),
    siteHost: "sydcrest.com",
    ...overrides,
  };
}

beforeEach(() => {
  resetLogOnce();
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

describe("runAlerts", () => {
  it("sends WhatsApp only to people with a live consent", async () => {
    const d = deps();
    const summary = await runAlerts(["wumpini", "fuseini"], MESSAGE, d);
    expect(summary).toEqual({ whatsapp: 1, skipped: 1, failed: 0 });
    expect(d.send).toHaveBeenCalledWith("+233241234567", { name: "Wumpini", title: MESSAGE.title, url: "sydcrest.com/bookings/abc" });
  });

  it("looks nothing up and sends nothing without Twilio keys", async () => {
    const consented = vi.fn(async () => []);
    const d = deps({ env: {}, consented });
    expect(await runAlerts(["wumpini"], MESSAGE, d)).toEqual({ whatsapp: 0, skipped: 1, failed: 0 });
    expect(consented).not.toHaveBeenCalled();
    expect(d.send).not.toHaveBeenCalled();
  });

  it("never throws when the lookup or a send fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const broken = deps({ consented: async () => Promise.reject(new Error("db down")) });
    expect(await runAlerts(["wumpini"], MESSAGE, broken)).toEqual({ whatsapp: 0, skipped: 0, failed: 1 });
    const failing = deps({ send: async () => Promise.reject(new Error("twilio down")) });
    expect(await runAlerts(["wumpini"], MESSAGE, failing)).toEqual({ whatsapp: 0, skipped: 0, failed: 1 });
  });

  it("does nothing for no recipients", async () => {
    const d = deps();
    expect(await runAlerts([], MESSAGE, d)).toEqual({ whatsapp: 0, skipped: 0, failed: 0 });
    expect(d.send).not.toHaveBeenCalled();
  });
});

describe("alert template", () => {
  it("reads as one plain sentence with the link and the opt out line", () => {
    expect(renderTemplate("alert", { name: "Wumpini", title: MESSAGE.title, url: "sydcrest.com/bookings/abc" })).toBe(
      "Hi Wumpini, news from SydCrest: Mariama accepted your booking. See it at sydcrest.com/bookings/abc Reply STOP to stop these messages.",
    );
  });
});
