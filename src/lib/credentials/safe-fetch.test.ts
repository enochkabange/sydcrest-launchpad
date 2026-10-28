import { describe, expect, it, vi } from "vitest";
import type { LookupAddress } from "node:dns";

vi.mock("server-only", () => ({}));

const { guardedLookup, safeFetch } = await import("./safe-fetch");

function fakeDns(answers: Record<string, LookupAddress[]>) {
  return (hostname: string, cb: (err: NodeJS.ErrnoException | null, addresses: LookupAddress[]) => void) => cb(null, answers[hostname] ?? []);
}

function run(lookup: ReturnType<typeof guardedLookup>, host: string, all = false) {
  return new Promise<{ err: NodeJS.ErrnoException | null; address: unknown }>((resolve) =>
    lookup(host, { all }, (err, address) => resolve({ err, address })),
  );
}

describe("guardedLookup (the connect time check)", () => {
  const lookup = guardedLookup(
    fakeDns({
      "badges.example.com": [{ address: "93.184.216.34", family: 4 }],
      "rebind.example.com": [{ address: "169.254.169.254", family: 4 }],
      "mixed.example.com": [
        { address: "93.184.216.34", family: 4 },
        { address: "10.0.0.5", family: 4 },
      ],
      "v6.example.com": [{ address: "fd12::1", family: 6 }],
    }),
  );

  it("passes a public address through", async () => {
    expect(await run(lookup, "badges.example.com")).toEqual({ err: null, address: "93.184.216.34" });
    expect((await run(lookup, "badges.example.com", true)).address).toEqual([{ address: "93.184.216.34", family: 4 }]);
  });

  it("refuses a name that resolves to metadata, private or unique local addresses", async () => {
    for (const host of ["rebind.example.com", "mixed.example.com", "v6.example.com", "nothing.example.com"]) {
      const { err } = await run(lookup, host);
      expect(err?.code).toBe("EBLOCKED");
    }
  });
});

describe("safeFetch", () => {
  it("refuses blocked URLs before any connection", async () => {
    await expect(safeFetch("http://example.com/")).rejects.toMatchObject({ reason: "bad_url" });
    await expect(safeFetch("https://169.254.169.254/latest/meta-data/")).rejects.toMatchObject({ reason: "blocked" });
    await expect(safeFetch("https://localhost/")).rejects.toMatchObject({ reason: "blocked" });
  });
});
