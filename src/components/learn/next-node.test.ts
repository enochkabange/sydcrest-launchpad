import { describe, expect, it } from "vitest";
import { byPosition, nextByPosition, nextUnfinished, requiredProgress, type OrderedNode } from "./next-node";

const node = (id: string, position: number, is_optional = false, slug = id): OrderedNode => ({
  id,
  slug,
  title: id.toUpperCase(),
  position,
  is_optional,
});

// Deliberately out of order, as the database may return them.
const NODES = [node("sql", 2), node("power-bi", 3, true), node("spreadsheets", 1), node("portfolio", 4)];

describe("byPosition", () => {
  it("orders by position", () => {
    expect(byPosition(NODES).map((n) => n.id)).toEqual(["spreadsheets", "sql", "power-bi", "portfolio"]);
  });

  it("breaks ties on slug so the order is stable", () => {
    const tied = [node("b", 1, false, "beta"), node("a", 1, false, "alpha")];
    expect(byPosition(tied).map((n) => n.slug)).toEqual(["alpha", "beta"]);
  });

  it("does not mutate the input", () => {
    const input = [...NODES];
    byPosition(input);
    expect(input).toEqual(NODES);
  });
});

describe("nextByPosition", () => {
  it("returns the following node", () => {
    expect(nextByPosition(NODES, "spreadsheets")?.id).toBe("sql");
  });

  it("includes optional nodes in the sequence", () => {
    expect(nextByPosition(NODES, "sql")?.id).toBe("power-bi");
  });

  it("returns null after the last node", () => {
    expect(nextByPosition(NODES, "portfolio")).toBeNull();
  });

  it("returns null for a node that is not in the roadmap", () => {
    expect(nextByPosition(NODES, "html")).toBeNull();
  });

  it("returns null for an empty roadmap", () => {
    expect(nextByPosition([], "sql")).toBeNull();
  });
});

describe("nextUnfinished", () => {
  it("starts at the first node when nothing is done", () => {
    expect(nextUnfinished(NODES, new Set())?.id).toBe("spreadsheets");
  });

  it("skips done nodes", () => {
    expect(nextUnfinished(NODES, new Set(["spreadsheets"]))?.id).toBe("sql");
  });

  it("prefers the next required node over an unfinished optional one", () => {
    expect(nextUnfinished(NODES, new Set(["spreadsheets", "sql"]))?.id).toBe("portfolio");
  });

  it("finds an earlier gap when later nodes were done first", () => {
    expect(nextUnfinished(NODES, new Set(["sql", "portfolio"]))?.id).toBe("spreadsheets");
  });

  it("falls back to optional nodes once every required one is done", () => {
    expect(nextUnfinished(NODES, new Set(["spreadsheets", "sql", "portfolio"]))?.id).toBe("power-bi");
  });

  it("returns null when everything is done", () => {
    expect(nextUnfinished(NODES, new Set(NODES.map((n) => n.id)))).toBeNull();
  });
});

describe("requiredProgress", () => {
  it("counts required nodes only", () => {
    expect(requiredProgress(NODES, new Set(["spreadsheets", "power-bi"]))).toEqual({
      done: 1,
      total: 3,
      complete: false,
    });
  });

  it("is complete when every required node is done, even with optional ones open", () => {
    expect(requiredProgress(NODES, new Set(["spreadsheets", "sql", "portfolio"])).complete).toBe(true);
  });

  it("is never complete for a roadmap without required nodes", () => {
    expect(requiredProgress([node("extra", 1, true)], new Set(["extra"])).complete).toBe(false);
  });
});
