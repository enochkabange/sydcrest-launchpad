import { describe, expect, it } from "vitest";
import { parseCollapsed } from "./roadmap-ui";

describe("parseCollapsed", () => {
  const known = new Set(["a", "b"]);
  it("keeps known section ids only, once each", () => {
    expect(parseCollapsed('["a","x","a",3,"b"]', known)).toEqual(["a", "b"]);
  });
  it("treats anything else as nothing collapsed", () => {
    expect(parseCollapsed(null, known)).toEqual([]);
    expect(parseCollapsed("not json", known)).toEqual([]);
    expect(parseCollapsed('{"a":true}', known)).toEqual([]);
  });
});
