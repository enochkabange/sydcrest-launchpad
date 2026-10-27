import { describe, expect, it } from "vitest";
import {
  appendPage,
  checkBody,
  checkLink,
  communityErrorMessage,
  feedHref,
  nextCursor,
  parseFeedRef,
  parseReactionCounts,
  sameFeed,
  timeAgo,
  toggleReaction,
  toPostView,
  toReplyView,
} from "./model";

const CHAPTER = "0d5c4a8e-3b0a-4c1e-9a55-2f1d6b7c8e90";

const row = {
  id: "p1",
  scope: "chapter",
  chapter_id: CHAPTER,
  cohort_id: null,
  author_id: "a1",
  author_name: "Wumpini Abukari",
  author_avatar_url: null,
  author_public_slug: null,
  author_is_lead: true,
  body: "First Skillshop is on Saturday at the Tamale hub.",
  link_url: null,
  pinned_at: "2026-10-27T09:00:00.123456+00:00",
  hidden_at: null,
  edited_at: null,
  created_at: "2026-10-27T08:00:00.654321+00:00",
  reply_count: 3,
  reaction_counts: { like: 2, celebrate: 1 },
  my_reactions: ["like", "bogus"],
};

describe("parseFeedRef", () => {
  it("reads a chapter or cohort feed with a valid id", () => {
    expect(parseFeedRef("chapter", CHAPTER)).toEqual({ scope: "chapter", scopeId: CHAPTER });
    expect(parseFeedRef(["cohort"], [CHAPTER.toUpperCase()])).toEqual({ scope: "cohort", scopeId: CHAPTER });
  });

  it("falls back to everyone for anything else", () => {
    expect(parseFeedRef(undefined, undefined)).toEqual({ scope: "everyone", scopeId: null });
    expect(parseFeedRef("chapter", "not-a-uuid")).toEqual({ scope: "everyone", scopeId: null });
    expect(parseFeedRef("everyone", CHAPTER)).toEqual({ scope: "everyone", scopeId: null });
    expect(parseFeedRef("admin", CHAPTER)).toEqual({ scope: "everyone", scopeId: null });
  });

  it("round trips through feedHref", () => {
    const ref = parseFeedRef("chapter", CHAPTER);
    expect(feedHref(ref)).toBe(`/community?scope=chapter&id=${CHAPTER}`);
    expect(feedHref(parseFeedRef(undefined, undefined))).toBe("/community");
    expect(sameFeed(ref, { scope: "chapter", scopeId: CHAPTER })).toBe(true);
    expect(sameFeed(ref, { scope: "everyone", scopeId: null })).toBe(false);
  });
});

describe("parseReactionCounts", () => {
  it("fills every kind and ignores junk", () => {
    expect(parseReactionCounts({ like: 2, helpful: 1, nope: 9, support: -1 })).toEqual({
      like: 2,
      celebrate: 0,
      helpful: 1,
      support: 0,
    });
    expect(parseReactionCounts(null)).toEqual({ like: 0, celebrate: 0, helpful: 0, support: 0 });
    expect(parseReactionCounts([1, 2])).toEqual({ like: 0, celebrate: 0, helpful: 0, support: 0 });
  });
});

describe("toPostView and toReplyView", () => {
  it("shapes a feed row", () => {
    const post = toPostView(row);
    expect(post).toMatchObject({
      id: "p1",
      scope: "chapter",
      pinned: true,
      hidden: false,
      replyCount: 3,
      author: { name: "Wumpini Abukari", isLead: true, slug: null },
      mine: ["like"],
    });
    expect(post.reactions.like).toBe(2);
    // The timestamp is kept as written, microseconds intact, for the cursor.
    expect(post.createdAt).toBe("2026-10-27T08:00:00.654321+00:00");
  });

  it("names a missing author neutrally", () => {
    expect(toPostView({ ...row, author_name: "  " }).author.name).toBe("A member");
    const reply = toReplyView({
      id: "r1",
      post_id: "p1",
      author_id: "a2",
      author_name: null,
      author_public_slug: "mariama",
      body: "See you there",
      hidden_at: "2026-10-27T10:00:00+00:00",
      edited_at: null,
      created_at: "2026-10-27T09:30:00+00:00",
      reaction_counts: {},
      my_reactions: null,
    });
    expect(reply).toMatchObject({ hidden: true, mine: [], author: { name: "A member", slug: "mariama" } });
  });
});

describe("pagination", () => {
  const page = (n: number) => Array.from({ length: n }, (_, i) => ({ id: `p${i}`, createdAt: `t${i}` }));

  it("has a cursor only for a full page, taken from the last row", () => {
    expect(nextCursor(page(20))).toBe("t19");
    expect(nextCursor(page(19))).toBeNull();
    expect(nextCursor([])).toBeNull();
    expect(nextCursor(page(5), 5)).toBe("t4");
  });

  it("drops posts already shown when a page is appended", () => {
    const shown = [{ id: "pinned-old" }, { id: "a" }, { id: "b" }];
    expect(appendPage(shown, [{ id: "c" }, { id: "pinned-old" }, { id: "d" }]).map((p) => p.id)).toEqual([
      "pinned-old",
      "a",
      "b",
      "c",
      "d",
    ]);
  });
});

describe("toggleReaction", () => {
  const base = { reactions: { like: 1, celebrate: 0, helpful: 0, support: 0 }, mine: ["like" as const] };

  it("removes my reaction and lowers the count", () => {
    expect(toggleReaction(base, "like")).toEqual({ reactions: { ...base.reactions, like: 0 }, mine: [] });
  });

  it("adds my reaction and raises the count", () => {
    expect(toggleReaction(base, "helpful")).toEqual({
      reactions: { ...base.reactions, helpful: 1 },
      mine: ["like", "helpful"],
    });
  });

  it("never goes below zero", () => {
    expect(toggleReaction({ reactions: { ...base.reactions, like: 0 }, mine: ["like"] }, "like").reactions.like).toBe(0);
  });
});

describe("checkBody and checkLink", () => {
  it("trims and limits the body", () => {
    expect(checkBody("  Hello Tamale  ", 100)).toEqual({ body: "Hello Tamale" });
    expect(checkBody("   ", 100)).toEqual({ error: "Write something first." });
    expect(checkBody(null, 100)).toEqual({ error: "Write something first." });
    expect(checkBody("x".repeat(11), 10)).toEqual({ error: "Keep it under 10 characters." });
  });

  it("accepts only http and https links", () => {
    expect(checkLink("")).toEqual({ link: null });
    expect(checkLink(" https://example.com/a ")).toEqual({ link: "https://example.com/a" });
    expect(checkLink("javascript:alert(1)")).toHaveProperty("error");
    expect(checkLink("example.com")).toHaveProperty("error");
    expect(checkLink(`https://example.com/${"a".repeat(600)}`)).toEqual({ error: "That link is too long." });
  });
});

describe("communityErrorMessage", () => {
  it("says slow down when rate limited", () => {
    expect(communityErrorMessage("54000")).toMatch(/^Slow down/);
  });

  it("maps the contract codes and has a fallback", () => {
    expect(communityErrorMessage("42501")).toMatch(/members/);
    expect(communityErrorMessage("P0002")).toMatch(/no longer here/);
    expect(communityErrorMessage(undefined)).toBe("That did not work. Try again.");
  });

  it("never uses dashes in copy", () => {
    for (const code of ["54000", "42501", "P0002", "23505", "23514", "22023", "x"]) {
      expect(communityErrorMessage(code)).not.toMatch(/[-–—]/);
    }
  });
});

describe("timeAgo", () => {
  const now = Date.parse("2026-10-27T12:00:00Z");
  it("reads recent times in words and older ones as a date", () => {
    expect(timeAgo("2026-10-27T11:59:30Z", now)).toBe("just now");
    expect(timeAgo("2026-10-27T11:59:00Z", now)).toBe("1 minute ago");
    expect(timeAgo("2026-10-27T09:00:00Z", now)).toBe("3 hours ago");
    expect(timeAgo("2026-10-25T12:00:00Z", now)).toBe("2 days ago");
    expect(timeAgo("2026-10-01T12:00:00Z", now)).toBe("1 Oct 2026");
    expect(timeAgo("nonsense", now)).toBe("");
  });
});
