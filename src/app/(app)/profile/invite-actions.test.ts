import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const track = vi.fn(async () => {});
vi.mock("@/lib/analytics/track", () => ({ track: (...args: unknown[]) => track(...(args as [])) }));

const getCurrentUser = vi.fn();
vi.mock("@/lib/auth", () => ({ getCurrentUser: () => getCurrentUser() }));

const { recordInviteSent } = await import("./invite-actions");

const WUMPINI = { id: "aaaaaaaa-0000-0000-0000-000000000001", email: "wumpini@example.test", hasAgeAndConsent: true };

describe("recordInviteSent", () => {
  beforeEach(() => vi.clearAllMocks());

  it("records how the invite was sent, attributed to the learner, with nothing personal", async () => {
    getCurrentUser.mockResolvedValue(WUMPINI);
    await recordInviteSent("copy");
    await recordInviteSent("share");
    expect(track).toHaveBeenNthCalledWith(1, "invite_sent", { method: "copy" }, { profileId: WUMPINI.id });
    expect(track).toHaveBeenNthCalledWith(2, "invite_sent", { method: "share" }, { profileId: WUMPINI.id });
  });

  it("ignores anything other than copy or share", async () => {
    getCurrentUser.mockResolvedValue(WUMPINI);
    await recordInviteSent("wumpini@example.test");
    await recordInviteSent(undefined);
    await recordInviteSent({ method: "copy" });
    expect(track).not.toHaveBeenCalled();
  });

  it("records nothing when signed out", async () => {
    getCurrentUser.mockResolvedValue(null);
    await recordInviteSent("copy");
    expect(track).not.toHaveBeenCalled();
  });
});
