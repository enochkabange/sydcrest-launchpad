import { describe, expect, it } from "vitest";
import { parseGeneratedContent } from "@/lib/content-generation/schema";
import { QUIZ_BALANCE_MAX, quizBalance } from "@/lib/content-generation/quiz-balance";
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

      it("has a lesson for every node in the roadmap", () => {
        const missing = (draft?.nodes ?? []).map((n) => n.slug).filter((slug) => !(slug in content.nodes));
        expect(missing, "nodes without content").toEqual([]);
      });

      it("only covers nodes that exist in that roadmap", () => {
        const slugs = new Set(draft?.nodes.map((n) => n.slug));
        for (const slug of Object.keys(content.nodes)) expect(slugs.has(slug), `unknown node ${slug}`).toBe(true);
      });

      it("quiz answers cannot be guessed by length or position (#214)", () => {
        const b = quizBalance(Object.values(content.nodes).flatMap((n) => n.quiz.questions));
        expect(b.longestShare, "share of questions whose correct option is strictly the longest").toBeLessThanOrEqual(QUIZ_BALANCE_MAX);
        expect(b.maxPositionShare, `share of correct answers in one position (${b.positions.join("/")})`).toBeLessThanOrEqual(QUIZ_BALANCE_MAX);
      });

      for (const [slug, node] of Object.entries(content.nodes)) {
        it(`${slug} passes the content validator (shape, quiz rules, no dashes)`, () => {
          const result = parseGeneratedContent(node);
          expect(result.ok ? [] : result.errors).toEqual([]);
        });

        it(`${slug} has 3 or 4 "You will be able to" outcomes (#255)`, () => {
          expect(node.outcomes?.length ?? 0).toBeGreaterThanOrEqual(3);
          expect(node.outcomes?.length ?? 0).toBeLessThanOrEqual(4);
          for (const outcome of node.outcomes ?? []) {
            expect(outcome, "starts with a capital, no full stop").toMatch(/^[A-Z].*[^.]$/);
          }
        });

        it(`${slug} explanation is 300 to 900 words (denser lessons, #256)`, () => {
          const words = node.explanation_md.split(/\s+/).filter(Boolean).length;
          expect(words).toBeGreaterThanOrEqual(300);
          expect(words).toBeLessThanOrEqual(900);
        });
      }
    });
  }
});
