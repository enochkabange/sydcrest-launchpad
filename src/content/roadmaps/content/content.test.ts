import { describe, expect, it } from "vitest";
import { parseGeneratedContent } from "@/lib/content-generation/schema";
import { ROADMAP_DRAFTS } from "@/content/roadmaps";
import type { TrackContent } from "./types";

// Every content file in this folder, without a central index to edit, so
// parallel authors never conflict. The admin import gets its own index later.
const files = import.meta.glob<{ default: TrackContent }>("./*.content.ts", { eager: true });

const contents = Object.entries(files).map(([path, mod]) => ({ path, content: mod.default }));

describe("roadmap lesson content", () => {
  it("has at least the folder wired up", () => {
    expect(Array.isArray(contents)).toBe(true);
  });

  for (const { path, content } of contents) {
    describe(path, () => {
      const draft = ROADMAP_DRAFTS.find((d) => d.slug === content.roadmap);

      it("belongs to a roadmap draft", () => {
        expect(draft, `no roadmap draft with slug ${content.roadmap}`).toBeDefined();
      });

      it("only covers nodes that exist in that roadmap", () => {
        const slugs = new Set(draft?.nodes.map((n) => n.slug));
        for (const slug of Object.keys(content.nodes)) expect(slugs.has(slug), `unknown node ${slug}`).toBe(true);
      });

      for (const [slug, node] of Object.entries(content.nodes)) {
        it(`${slug} passes the content validator (shape, quiz rules, no dashes)`, () => {
          const result = parseGeneratedContent(node);
          expect(result.ok ? [] : result.errors).toEqual([]);
        });

        it(`${slug} explanation is 300 to 600 words`, () => {
          const words = node.explanation_md.split(/\s+/).filter(Boolean).length;
          expect(words).toBeGreaterThanOrEqual(300);
          expect(words).toBeLessThanOrEqual(600);
        });
      }
    });
  }
});
