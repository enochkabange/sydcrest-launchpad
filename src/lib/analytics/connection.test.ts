import { describe, expect, it } from "vitest";
import { connectionProps, currentConnection } from "./connection";
import { validateProps } from "./events";

describe("connectionProps", () => {
  it.each(["slow-2g", "2g", "3g", "4g"] as const)("keeps the effective type %s", (type) => {
    expect(connectionProps({ connection: { effectiveType: type } })).toEqual({ connection: type });
  });

  it("records the data saver setting when the browser gives it", () => {
    expect(connectionProps({ connection: { effectiveType: "2g", saveData: true } })).toEqual({ connection: "2g", save_data: true });
    expect(connectionProps({ connection: { effectiveType: "4g", saveData: false } })).toEqual({ connection: "4g", save_data: false });
  });

  it("is unknown without the Network Information API or with an odd value", () => {
    expect(connectionProps(null)).toEqual({ connection: "unknown" });
    expect(connectionProps({})).toEqual({ connection: "unknown" });
    expect(connectionProps({ connection: null })).toEqual({ connection: "unknown" });
    expect(connectionProps({ connection: { effectiveType: "5g" } })).toEqual({ connection: "unknown" });
    expect(connectionProps({ connection: { effectiveType: 3, saveData: "yes" } })).toEqual({ connection: "unknown" });
  });

  it("never throws, even on a hostile getter", () => {
    const nav = {
      get connection(): never {
        throw new Error("blocked");
      },
    };
    expect(connectionProps(nav)).toEqual({ connection: "unknown" });
  });

  it("is unknown outside a browser", () => {
    expect(currentConnection().connection).toMatch(/^(slow-2g|2g|3g|4g|unknown)$/);
  });
});

describe("connection props survive the event guards", () => {
  it("on web_vital", () => {
    const props = { metric: "LCP", value: 5100, rating: "poor", connection: "slow-2g", save_data: true };
    expect(validateProps("web_vital", props)).toEqual(props);
  });

  it("on session_started", () => {
    const props = { hour_band: "evening", weekday: "mon", returning: false, connection: "3g", save_data: false };
    expect(validateProps("session_started", props)).toEqual(props);
  });

  it("drops a connection type outside the list", () => {
    expect(validateProps("web_vital", { metric: "LCP", value: 1, connection: "wifi" })).toEqual({ metric: "LCP", value: 1 });
  });
});
