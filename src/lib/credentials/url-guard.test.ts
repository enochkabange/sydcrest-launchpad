import { describe, expect, it, vi } from "vitest";
import { checkRemoteUrl, isBlockedAddress, SafeFetchError } from "./url-guard";

vi.mock("server-only", () => ({}));

describe("isBlockedAddress", () => {
  it.each([
    "127.0.0.1",
    "127.10.0.5",
    "10.1.2.3",
    "172.16.0.1",
    "172.31.255.255",
    "192.168.1.10",
    "169.254.169.254",
    "100.64.0.1",
    "0.0.0.0",
    "224.0.0.1",
    "255.255.255.255",
    "::1",
    "::",
    "fe80::1",
    "fd00::1",
    "fc00::abcd",
    "::ffff:127.0.0.1",
    "::ffff:169.254.169.254",
    "::ffff:a9fe:a9fe",
    "64:ff9b::a9fe:a9fe",
    "2002:7f00:1::",
    "not an ip",
  ])("blocks %s", (ip) => {
    expect(isBlockedAddress(ip)).toBe(true);
  });

  it.each(["8.8.8.8", "41.66.0.1", "172.32.0.1", "2606:4700:4700::1111", "::ffff:8.8.8.8"])("allows public %s", (ip) => {
    expect(isBlockedAddress(ip)).toBe(false);
  });
});

describe("checkRemoteUrl", () => {
  const reason = (url: string) => {
    try {
      checkRemoteUrl(url);
      return "ok";
    } catch (e) {
      return e instanceof SafeFetchError ? e.reason : "other";
    }
  };

  it("accepts a public https URL", () => {
    expect(reason("https://badges.example.com/assertions/1")).toBe("ok");
  });

  it("refuses anything but https", () => {
    expect(reason("http://badges.example.com/a")).toBe("bad_url");
    expect(reason("file:///etc/passwd")).toBe("bad_url");
    expect(reason("gopher://example.com")).toBe("bad_url");
    expect(reason("not a url")).toBe("bad_url");
  });

  it("refuses credentials and odd ports", () => {
    expect(reason(`https://${"user"}:${"pw"}@example.com/`)).toBe("bad_url");
    expect(reason("https://example.com:8443/")).toBe("blocked");
  });

  it("refuses internal names and metadata hosts", () => {
    for (const url of [
      "https://localhost/",
      "https://api.localhost/",
      "https://metadata.google.internal/computeMetadata/v1/",
      "https://printer.local/",
      "https://intranet/",
    ]) {
      expect(reason(url)).toBe("blocked");
    }
  });

  it("refuses private and metadata IP literals in every spelling", () => {
    for (const url of [
      "https://127.0.0.1/",
      "https://169.254.169.254/latest/meta-data/",
      "https://[::1]/",
      "https://[::ffff:127.0.0.1]/",
      "https://2130706433/", // 127.0.0.1 as a number
      "https://0x7f.0.0.1/",
      "https://10.0.0.1/",
    ]) {
      expect(reason(url)).toBe("blocked");
    }
  });
});
