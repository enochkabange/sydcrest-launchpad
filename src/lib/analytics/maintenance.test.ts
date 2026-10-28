import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
const { runAnalyticsMaintenance } = await import("./maintenance");

type Admin = Parameters<typeof runAnalyticsMaintenance>[0];
const client = (rpc: (...args: unknown[]) => unknown) => ({ rpc }) as unknown as Admin;

describe("runAnalyticsMaintenance", () => {
  it("refreshes the last three days by default and returns the summary", async () => {
    const rpc = vi.fn(async () => ({ data: { purged: 0 }, error: null }));
    expect(await runAnalyticsMaintenance(client(rpc))).toEqual({ ok: true, result: { purged: 0 } });
    expect(rpc).toHaveBeenCalledWith("run_analytics_maintenance", { p_days: 3 });
  });

  it("never throws, so the job it shares keeps going", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const failing = client(async () => ({ data: null, error: { code: "XX000", message: "boom" } }));
    expect(await runAnalyticsMaintenance(failing)).toEqual({ ok: false, error: "XX000" });
    const throwing = client(async () => {
      throw new Error("network");
    });
    expect(await runAnalyticsMaintenance(throwing)).toEqual({ ok: false, error: "failed" });
  });
});
