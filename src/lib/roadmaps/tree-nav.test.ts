import { describe, expect, it } from "vitest";
import { treeKeyTarget, type TreeNavItem } from "./tree-nav";

const ITEMS: TreeNavItem[] = [
  { level: 1, expanded: true, label: "Keeping records" },
  { level: 2, expanded: null, label: "Notebook" },
  { level: 2, expanded: null, label: "Excel" },
  { level: 1, expanded: false, label: "Sharing prices" },
  { level: 1, expanded: null, label: "Wrap up" },
];

describe("treeKeyTarget", () => {
  it("moves down, up, home and end through visible items", () => {
    expect(treeKeyTarget(ITEMS, 0, "ArrowDown")).toEqual({ focus: 1 });
    expect(treeKeyTarget(ITEMS, 4, "ArrowDown")).toBeNull();
    expect(treeKeyTarget(ITEMS, 2, "ArrowUp")).toEqual({ focus: 1 });
    expect(treeKeyTarget(ITEMS, 0, "ArrowUp")).toBeNull();
    expect(treeKeyTarget(ITEMS, 2, "Home")).toEqual({ focus: 0 });
    expect(treeKeyTarget(ITEMS, 0, "End")).toEqual({ focus: 4 });
  });

  it("opens a closed item and moves into an open one with Right", () => {
    expect(treeKeyTarget(ITEMS, 3, "ArrowRight")).toEqual({ toggle: 3, expand: true });
    expect(treeKeyTarget(ITEMS, 0, "ArrowRight")).toEqual({ focus: 1 });
    expect(treeKeyTarget(ITEMS, 1, "ArrowRight")).toBeNull();
  });

  it("closes an open item and moves to the parent with Left", () => {
    expect(treeKeyTarget(ITEMS, 0, "ArrowLeft")).toEqual({ toggle: 0, expand: false });
    expect(treeKeyTarget(ITEMS, 2, "ArrowLeft")).toEqual({ focus: 0 });
    expect(treeKeyTarget(ITEMS, 4, "ArrowLeft")).toBeNull();
  });

  it("types ahead to the next item starting with a letter, wrapping round", () => {
    expect(treeKeyTarget(ITEMS, 0, "e")).toEqual({ focus: 2 });
    expect(treeKeyTarget(ITEMS, 2, "K")).toEqual({ focus: 0 });
    expect(treeKeyTarget(ITEMS, 0, "z")).toBeNull();
    expect(treeKeyTarget(ITEMS, 0, " ")).toBeNull();
    expect(treeKeyTarget([], 0, "ArrowDown")).toBeNull();
  });
});
