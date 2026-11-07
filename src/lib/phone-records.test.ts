import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { hasRecordedPhone, phoneFromMetadata, savePhone } = await import("./phone-records");

const maybeSingle = vi.fn();
const updateEq = vi.fn();
const update = vi.fn(() => ({ eq: updateEq }));
const supabase = {
  from: () => ({ select: () => ({ eq: () => ({ maybeSingle }) }), update }),
} as unknown as Parameters<typeof hasRecordedPhone>[0];

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => {});
  updateEq.mockResolvedValue({ error: null });
});

describe("phoneFromMetadata", () => {
  it("reads a valid number from sign up metadata in E.164", () => {
    expect(phoneFromMetadata({ phone: "+233241234567" })).toBe("+233241234567");
    expect(phoneFromMetadata({ phone: "024 123 4567" })).toBe("+233241234567");
    expect(phoneFromMetadata({ phone: "nope" })).toBeNull();
    expect(phoneFromMetadata({})).toBeNull();
    expect(phoneFromMetadata(null)).toBeNull();
  });
});

describe("hasRecordedPhone", () => {
  it("is true when the profile has a number, without writing", async () => {
    maybeSingle.mockResolvedValue({ data: { phone: "+233241234567" }, error: null });
    expect(await hasRecordedPhone(supabase, "wumpini-id", {})).toBe(true);
    expect(update).not.toHaveBeenCalled();
  });

  it("copies an email sign up's number from metadata on the first signed in request", async () => {
    maybeSingle.mockResolvedValue({ data: { phone: null }, error: null });
    expect(await hasRecordedPhone(supabase, "wumpini-id", { phone: "+233241234567" })).toBe(true);
    expect(update).toHaveBeenCalledWith({ phone: "+233241234567" });
  });

  it("is false with no number anywhere, or when the number is on another account", async () => {
    maybeSingle.mockResolvedValue({ data: { phone: null }, error: null });
    expect(await hasRecordedPhone(supabase, "wumpini-id", {})).toBe(false);
    updateEq.mockResolvedValue({ error: { code: "23505", message: "duplicate key" } });
    expect(await hasRecordedPhone(supabase, "wumpini-id", { phone: "+233241234567" })).toBe(false);
  });

  it("lets the user through when the profile cannot be read", async () => {
    maybeSingle.mockResolvedValue({ data: null, error: { code: "57014", message: "timeout" } });
    expect(await hasRecordedPhone(supabase, "wumpini-id", {})).toBe(true);
  });
});

describe("savePhone", () => {
  it("reports saved, taken or failed", async () => {
    expect(await savePhone(supabase, "wumpini-id", "+233241234567")).toBe("saved");
    updateEq.mockResolvedValue({ error: { code: "23505", message: "duplicate key" } });
    expect(await savePhone(supabase, "wumpini-id", "+233241234567")).toBe("taken");
    updateEq.mockResolvedValue({ error: { code: "XX000", message: "boom" } });
    expect(await savePhone(supabase, "wumpini-id", "+233241234567")).toBe("failed");
  });
});
