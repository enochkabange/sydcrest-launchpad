import { describe, expect, it } from "vitest";
import { extractBakedBadge, extractFromSvg } from "./baked";
import { bakedPng } from "./fixtures";

describe("baked PNG badges", () => {
  it("reads an Open Badges 2.0 assertion URL", () => {
    const png = bakedPng("openbadges", "https://badges.example.com/assertions/1.json");
    expect(extractBakedBadge(png)).toBe("https://badges.example.com/assertions/1.json");
  });

  it("reads a compressed Open Badges 3.0 credential", () => {
    const png = bakedPng("openbadgecredential", '{"type":["OpenBadgeCredential"]}', true);
    expect(extractBakedBadge(png)).toBe('{"type":["OpenBadgeCredential"]}');
  });

  it("ignores other text chunks and plain images", () => {
    expect(extractBakedBadge(bakedPng("Comment", "hello"))).toBeNull();
    expect(extractBakedBadge(Buffer.from("just some bytes"))).toBeNull();
  });

  it("stops at a truncated file instead of reading past it", () => {
    const png = bakedPng("openbadges", "https://badges.example.com/a");
    expect(extractBakedBadge(png.subarray(0, 40))).toBeNull();
  });
});

describe("baked SVG badges", () => {
  it("reads the verify URL of a 2.0 assertion", () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:openbadges="https://openbadges.org"><openbadges:assertion verify="https://badges.example.com/a/1?x=1&amp;y=2"/></svg>`;
    expect(extractFromSvg(svg)).toBe("https://badges.example.com/a/1?x=1&y=2");
  });

  it("prefers JSON inside the assertion", () => {
    const svg = `<svg><openbadges:assertion verify="https://x.example/a"><![CDATA[{"type":"Assertion"}]]></openbadges:assertion></svg>`;
    expect(extractFromSvg(svg)).toBe('{"type":"Assertion"}');
  });

  it("reads a 3.0 credential", () => {
    const svg = `<svg><openbadges:credential><![CDATA[aaa.bbb.ccc]]></openbadges:credential></svg>`;
    expect(extractBakedBadge(Buffer.from(svg))).toBe("aaa.bbb.ccc");
  });

  it("returns null for an SVG without a badge", () => {
    expect(extractFromSvg("<svg><circle r='4'/></svg>")).toBeNull();
  });
});
