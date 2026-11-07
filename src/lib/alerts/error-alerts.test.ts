import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("@/lib/messaging/admin", () => ({ createAdminClient: () => null }));

import { alertChannels, errorFingerprint, formatErrorAlert, sendErrorAlert, type ErrorAlert } from "./error-alerts";

const serverAlert: ErrorAlert = { source: "server", route: "/roadmaps/[slug]", error: "TypeError", digest: "1234567890" };
const both = { SLACK_ALERT_WEBHOOK_URL: "https://hooks.slack.com/services/T/B/X", ALERT_EMAIL: "admin@example.test", RESEND_API_KEY: "re_test" };

function ok() {
  return vi.fn(async () => new Response(null, { status: 200 }));
}

describe("alertChannels", () => {
  it("needs a Slack webhook, or an address and a Resend key for email", () => {
    expect(alertChannels({})).toEqual({ slack: null, email: null, any: false });
    expect(alertChannels({ ALERT_EMAIL: "admin@example.test" }).any).toBe(false);
    expect(alertChannels(both)).toEqual({ slack: both.SLACK_ALERT_WEBHOOK_URL, email: "admin@example.test", any: true });
  });
});

describe("errorFingerprint", () => {
  it("groups by source, route and error name, not the digest", () => {
    expect(errorFingerprint(serverAlert)).toBe("server /roadmaps/[slug] TypeError");
    expect(errorFingerprint({ ...serverAlert, digest: "other" })).toBe(errorFingerprint(serverAlert));
    expect(errorFingerprint({ source: "client", route: null })).toBe("client unknown Error");
  });
});

describe("formatErrorAlert", () => {
  it("names the page and error, the digest for the logs, and links to Reliability", () => {
    const { subject, text } = formatErrorAlert(serverAlert, 0, "https://sydcrest.com");
    expect(subject).toBe("[SydCrest] Server error on /roadmaps/[slug] (TypeError)");
    expect(text).toContain("Digest: 1234567890");
    expect(text).toContain("https://sydcrest.com/admin/insights/reliability");
    expect(text).not.toContain("more time");
  });

  it("says how many repeats were held back", () => {
    expect(formatErrorAlert(serverAlert, 1).text).toContain("1 more time since the last alert");
    expect(formatErrorAlert(serverAlert, 12).text).toContain("12 more times since the last alert");
  });

  it("labels browser errors", () => {
    expect(formatErrorAlert({ source: "client", route: "/learn" }, 0).subject).toBe("[SydCrest] Browser error on /learn");
  });
});

describe("sendErrorAlert", () => {
  it("does nothing, not even the claim, when no channel is set up", async () => {
    const claim = vi.fn();
    expect(await sendErrorAlert(serverAlert, { env: {}, claim })).toBe("off");
    expect(claim).not.toHaveBeenCalled();
  });

  it("sends to Slack and by email when the hourly slot is free", async () => {
    const fetch = ok();
    const result = await sendErrorAlert(serverAlert, { env: both, claim: async () => ({ send: true, heldBack: 3 }), fetch });
    expect(result).toBe("sent");
    const calls = fetch.mock.calls as unknown as [string, RequestInit][];
    expect(calls.map(([url]) => url)).toEqual([both.SLACK_ALERT_WEBHOOK_URL, "https://api.resend.com/emails"]);
    expect(JSON.parse(String(calls[0][1].body)).text).toContain("3 more times");
    const email = JSON.parse(String(calls[1][1].body));
    expect(email).toMatchObject({ to: ["admin@example.test"], subject: "[SydCrest] Server error on /roadmaps/[slug] (TypeError)" });
    expect((calls[1][1].headers as Record<string, string>).Authorization).toBe("Bearer re_test");
  });

  it("holds the alert back inside the hour", async () => {
    const fetch = ok();
    expect(await sendErrorAlert(serverAlert, { env: both, claim: async () => ({ send: false, heldBack: 4 }), fetch })).toBe("held");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("never throws, whatever fails", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const down = vi.fn(async () => new Response(null, { status: 500 }));
    expect(await sendErrorAlert(serverAlert, { env: both, claim: async () => ({ send: true, heldBack: 0 }), fetch: down })).toBe("failed");
    expect(
      await sendErrorAlert(serverAlert, {
        env: both,
        claim: async () => {
          throw new Error("database down");
        },
      }),
    ).toBe("failed");
    expect(await sendErrorAlert(serverAlert, { env: both, claim: async () => null })).toBe("failed");
    error.mockRestore();
  });

  it("counts a half delivered alert as sent", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const fetch = vi.fn(async (url: string) => new Response(null, { status: url.includes("resend") ? 500 : 200 }));
    expect(await sendErrorAlert(serverAlert, { env: both, claim: async () => ({ send: true, heldBack: 0 }), fetch: fetch as unknown as typeof globalThis.fetch })).toBe("sent");
    error.mockRestore();
  });
});
