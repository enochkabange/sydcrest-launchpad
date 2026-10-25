import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeClient, createTwilioClient } from "./client";
import { resetLogOnce } from "./config";
import { isStopKeyword, phoneFromTwilioAddress } from "./consent";
import { isAuthorizedCron } from "./cron-auth";
import { sendSms, sendWhatsApp } from "./send";
import { expectedSignature, isValidTwilioSignature } from "./signature";
import { firstName, OPT_OUT_LINE, renderTemplate, TEMPLATES } from "./templates";

const ENV = {
  TWILIO_ACCOUNT_SID: "AC_test",
  TWILIO_AUTH_TOKEN: "token_test",
  TWILIO_WHATSAPP_FROM: "+14155238886",
  TWILIO_SMS_FROM: "+233200000000",
};
const FUSEINI = "+233241234567";

beforeEach(() => resetLogOnce());
afterEach(() => vi.restoreAllMocks());

describe("templates", () => {
  it("are short, dash free and end with the opt out line", () => {
    for (const text of Object.values(TEMPLATES)) {
      expect(text).not.toMatch(/[-–—]/);
      expect(text.endsWith(OPT_OUT_LINE)).toBe(true);
      expect(renderTemplate("welcome").length).toBeLessThan(320);
    }
  });

  it("fills names and falls back politely", () => {
    expect(renderTemplate("welcome", { name: firstName("Wumpini Alhassan") })).toMatch(/^Hi Wumpini,/);
    expect(renderTemplate("welcome", { name: null })).toMatch(/^Hi there,/);
    expect(renderTemplate("reengage", { name: "Mariama", url: "sydcrest.com/dashboard" })).toContain("sydcrest.com/dashboard");
  });
});

describe("sendWhatsApp", () => {
  it("sends through the client with whatsapp: addresses", async () => {
    const client = createFakeClient();
    const result = await sendWhatsApp(FUSEINI, "welcome", { name: "Fuseini" }, { client, env: ENV });
    expect(result.status).toBe("sent");
    expect(client.sent).toEqual([
      { to: `whatsapp:${FUSEINI}`, from: "whatsapp:+14155238886", body: expect.stringMatching(/^Hi Fuseini,/) },
    ]);
  });

  it("no ops and logs once without credentials", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const client = createFakeClient();
    for (const env of [{}, { ...ENV, TWILIO_AUTH_TOKEN: "" }, { ...ENV, TWILIO_WHATSAPP_FROM: undefined }]) {
      expect(await sendWhatsApp(FUSEINI, "welcome", {}, { client, env })).toEqual({ status: "skipped", reason: "not_configured" });
    }
    expect(client.sent).toHaveLength(0);
    expect(warn).toHaveBeenCalledTimes(1);
  });

  it("never calls the network without credentials", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    await sendWhatsApp(FUSEINI, "welcome", {}, { env: {} });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("skips numbers that are not E.164", async () => {
    const client = createFakeClient();
    expect(await sendWhatsApp("0241234567", "welcome", {}, { client, env: ENV })).toEqual({ status: "skipped", reason: "invalid_number" });
    expect(client.sent).toHaveLength(0);
  });

  it("reports failures", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await sendWhatsApp(FUSEINI, "welcome", {}, { client: createFakeClient({ fail: true }), env: ENV });
    expect(result.status).toBe("failed");
  });
});

describe("sendSms", () => {
  it("uses the SMS sender without a prefix", async () => {
    const client = createFakeClient();
    await sendSms(FUSEINI, "reengage", { name: "Abdul-Rahman", url: "x" }, { client, env: ENV });
    expect(client.sent[0]).toMatchObject({ to: FUSEINI, from: "+233200000000" });
  });
});

describe("createTwilioClient", () => {
  it("posts form data to the Messages resource with basic auth", async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ sid: "SM123" }), { status: 201 }));
    const result = await createTwilioClient({ accountSid: "AC_test", authToken: "token_test" }, fetchImpl as typeof fetch).send({
      to: `whatsapp:${FUSEINI}`,
      from: "whatsapp:+14155238886",
      body: "Hi",
    });
    expect(result).toEqual({ ok: true, sid: "SM123" });
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.twilio.com/2010-04-01/Accounts/AC_test/Messages.json");
    expect((init.headers as Record<string, string>).Authorization).toBe(`Basic ${Buffer.from("AC_test:token_test").toString("base64")}`);
    expect(String(init.body)).toBe(new URLSearchParams({ To: `whatsapp:${FUSEINI}`, From: "whatsapp:+14155238886", Body: "Hi" }).toString());
  });

  it("returns Twilio's error", async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ code: 21211, message: "Invalid To" }), { status: 400 }));
    const result = await createTwilioClient({ accountSid: "a", authToken: "b" }, fetchImpl as typeof fetch).send({ to: "x", from: "y", body: "z" });
    expect(result).toEqual({ ok: false, error: "Twilio 400 (21211): Invalid To" });
  });
});

describe("Twilio signature", () => {
  const url = "https://sydcrest.com/api/webhooks/twilio";
  const params = { Body: "STOP", From: `whatsapp:${FUSEINI}`, MessageSid: "SM1" };

  it("matches the official twilio package (6.2.0) for the same input", () => {
    // Expected values computed with getExpectedTwilioSignature from twilio 6.2.0.
    const sig = expectedSignature("12345", "https://mycompany.com/myapp.php?foo=1&bar=2", {
      CallSid: "CA1234567890ABCDE",
      Caller: "+12349013030",
      Digits: "1234",
      From: "+12349013030",
      To: "+18005551212",
    });
    expect(sig).toBe("0/KCTR6DLpKmkAf8muzZqo1nDgQ=");
    expect(expectedSignature("tok", url, params)).toBe("9e/u9sPK4c73ewianUB6IkjJMi0=");
  });

  it("accepts a correct signature, with or without the default port", () => {
    expect(isValidTwilioSignature("tok", expectedSignature("tok", url, params), url, params)).toBe(true);
    const portSigned = expectedSignature("tok", "https://sydcrest.com:443/api/webhooks/twilio", params);
    expect(isValidTwilioSignature("tok", portSigned, url, params)).toBe(true);
  });

  it("rejects missing, wrong or tampered signatures", () => {
    const good = expectedSignature("tok", url, params);
    expect(isValidTwilioSignature("tok", null, url, params)).toBe(false);
    expect(isValidTwilioSignature("tok", "short", url, params)).toBe(false);
    expect(isValidTwilioSignature("other", good, url, params)).toBe(false);
    expect(isValidTwilioSignature("tok", good, url, { ...params, From: "whatsapp:+233200000001" })).toBe(false);
    expect(isValidTwilioSignature("tok", good, "https://evil.example/api/webhooks/twilio", params)).toBe(false);
  });
});

describe("opt out parsing", () => {
  it("recognises stop keywords on their own", () => {
    for (const body of ["STOP", "stop", " Stop. ", "unsubscribe", "QUIT"]) expect(isStopKeyword(body)).toBe(true);
    for (const body of ["", null, "please stop sending", "START", "hello"]) expect(isStopKeyword(body)).toBe(false);
  });

  it("extracts the phone from a Twilio address", () => {
    expect(phoneFromTwilioAddress(`whatsapp:${FUSEINI}`)).toBe(FUSEINI);
    expect(phoneFromTwilioAddress(FUSEINI)).toBe(FUSEINI);
    expect(phoneFromTwilioAddress("whatsapp:0241234567")).toBeNull();
  });
});

describe("cron auth", () => {
  it("needs the exact bearer secret", () => {
    expect(isAuthorizedCron("Bearer s3cret", "s3cret")).toBe(true);
    expect(isAuthorizedCron("Bearer wrong!", "s3cret")).toBe(false);
    expect(isAuthorizedCron(null, "s3cret")).toBe(false);
    expect(isAuthorizedCron("Bearer ", undefined)).toBe(false);
    expect(isAuthorizedCron("Bearer ", "")).toBe(false);
  });
});
