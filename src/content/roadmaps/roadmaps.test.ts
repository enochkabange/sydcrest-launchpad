import { describe, expect, it } from "vitest";
import { ROADMAP_DRAFTS } from "./index";

const DASHES = /[-‐‑‒–—―−]/;
const SENTENCE_END = /[.!?](?=\s|$)/g;

describe("roadmap drafts", () => {
  it("covers the original seven tracks, each track once, with unique slugs", () => {
    const tracks = ROADMAP_DRAFTS.map((r) => r.track);
    expect(new Set(tracks).size).toBe(tracks.length);
    expect(tracks).toEqual(
      expect.arrayContaining(["backend", "data", "digital-marketing", "digital-skills-bridge", "frontend", "product", "ui-ux"]),
    );
    const slugs = ROADMAP_DRAFTS.map((r) => r.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  for (const roadmap of ROADMAP_DRAFTS) {
    describe(roadmap.slug, () => {
      it("is an en-GH draft with dash free meta copy", () => {
        expect(roadmap.status).toBe("draft");
        expect(roadmap.locale).toBe("en-GH");
        expect(roadmap.title.trim()).not.toBe("");
        expect(roadmap.description.trim()).not.toBe("");
        expect(roadmap.title).not.toMatch(DASHES);
        expect(roadmap.description).not.toMatch(DASHES);
      });

      it("has 15 to 30 nodes", () => {
        expect(roadmap.nodes.length).toBeGreaterThanOrEqual(15);
        expect(roadmap.nodes.length).toBeLessThanOrEqual(30);
      });

      it("has unique node slugs", () => {
        const slugs = roadmap.nodes.map((n) => n.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
        for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      });

      it("has parents that exist, appear earlier, and form no cycles", () => {
        const bySlug = new Map(roadmap.nodes.map((n) => [n.slug, n]));
        const seen = new Set<string>();
        for (const node of roadmap.nodes) {
          if (node.parent !== null) {
            expect(bySlug.has(node.parent), `${node.slug} parent ${node.parent} missing`).toBe(true);
            expect(seen.has(node.parent), `${node.slug} parent must come first`).toBe(true);
          }
          seen.add(node.slug);
        }
        for (const node of roadmap.nodes) {
          const path = new Set<string>([node.slug]);
          let current = node.parent;
          while (current !== null) {
            expect(path.has(current), `cycle at ${node.slug}`).toBe(false);
            path.add(current);
            current = bySlug.get(current)?.parent ?? null;
          }
        }
        expect(roadmap.nodes[0].parent).toBeNull();
      });

      it("has two sentence, dash free summaries and titles", () => {
        for (const node of roadmap.nodes) {
          expect(node.summary.trim(), node.slug).not.toBe("");
          expect(node.summary, node.slug).not.toMatch(DASHES);
          expect(node.title, node.slug).not.toMatch(DASHES);
          expect(node.summary.match(SENTENCE_END)?.length, node.slug).toBe(2);
        }
      });

      it("has at most three https resources per node with dash free labels", () => {
        for (const node of roadmap.nodes) {
          expect(node.resources.length, node.slug).toBeLessThanOrEqual(3);
          for (const r of node.resources) {
            expect(r.url, node.slug).toMatch(/^https:\/\/[^\s]+$/);
            expect(() => new URL(r.url)).not.toThrow();
            expect(r.label, node.slug).not.toMatch(DASHES);
            expect(["article", "video", "practice"]).toContain(r.kind);
          }
        }
      });
    });
  }
});
