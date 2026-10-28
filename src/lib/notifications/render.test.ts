import { describe, expect, it } from "vitest";
import { formatWhen, renderNotification, safeHref, timeAgo } from "./render";

const POST = "6f9619ff-8b86-4d11-b42d-00c04fc964ff";

describe("renderNotification: database kinds", () => {
  it("community_reply links to the post", () => {
    expect(renderNotification("community_reply", { post_id: POST, reply_id: POST, scope: "everyone" })).toMatchObject({
      title: "Someone replied to your post",
      href: `/community/post/${POST}`,
      icon: "reply",
    });
  });

  it("chapter_post names the chapter", () => {
    const r = renderNotification("chapter_post", { post_id: POST, chapter_name: "Tamale", chapter_slug: "tamale" });
    expect(r.title).toBe("New post from your Tamale lead");
    expect(r.href).toBe(`/community/post/${POST}`);
  });

  it("event_waitlist_promoted gives the seat and the time in Ghana", () => {
    const r = renderNotification("event_waitlist_promoted", {
      event_slug: "tamale-skillshop",
      event_title: "Spreadsheet skillshop",
      starts_at: "2026-11-07T10:00:00+00:00",
    });
    expect(r.title).toBe("You have a seat at Spreadsheet skillshop");
    expect(r.body).toContain("Saturday 7 November at 10:00");
    expect(r.href).toBe("/events/tamale-skillshop");
  });

  it("event_update says cancelled or moved", () => {
    const base = { event_slug: "x", event_title: "Bolgatanga meetup", starts_at: "2026-11-08T15:30:00Z" };
    expect(renderNotification("event_update", { ...base, status: "cancelled" })).toMatchObject({
      title: "Bolgatanga meetup is cancelled",
      icon: "event-cancelled",
    });
    const moved = renderNotification("event_update", { ...base, status: "published" });
    expect(moved.title).toBe("Bolgatanga meetup has changed");
    expect(moved.body).toContain("Sunday 8 November at 15:30");
  });

  it("verified_skill and skill_review link to the skill", () => {
    expect(renderNotification("verified_skill", { skill_slug: "excel", skill_name: "Excel basics" })).toMatchObject({
      title: "You earned a verified skill: Excel basics",
      href: "/skills/excel",
    });
    expect(renderNotification("skill_review", { skill_slug: "excel", skill_name: "Excel basics", approved: true }).title).toBe(
      "Your Excel basics portfolio was approved",
    );
    expect(renderNotification("skill_review", { skill_slug: "excel", skill_name: "Excel basics", approved: false }).body).toMatch(
      /try again/,
    );
  });

  it("survives a payload with missing or bad fields", () => {
    expect(renderNotification("community_reply", {})).toMatchObject({ href: "/community" });
    expect(renderNotification("event_update", { event_slug: "../../admin", starts_at: "soon" })).toMatchObject({
      title: "An event you joined has changed",
      href: "/events",
    });
    expect(renderNotification("verified_skill", null).title).toBe("You earned a verified skill");
  });
});

describe("renderNotification: server sent and unknown kinds", () => {
  it("uses the payload's own title, body and href (event reminders send kind system)", () => {
    expect(
      renderNotification("system", { title: "Reminder: Spreadsheet skillshop", body: "Starts tomorrow.", href: "/events/tamale-skillshop" }),
    ).toEqual({ title: "Reminder: Spreadsheet skillshop", body: "Starts tomorrow.", href: "/events/tamale-skillshop", icon: "general" });
  });

  it("gives booking, review, cohort and opportunity a sensible title when the payload has none", () => {
    expect(renderNotification("booking", { booking_id: POST })).toMatchObject({ title: "Update on a booking", href: `/bookings/${POST}`, icon: "booking" });
    expect(renderNotification("opportunity", {})).toMatchObject({ title: "A new opportunity for you", href: "/opportunities" });
  });

  it("keeps the copy bookings send (#186) and fills gaps from the ids", () => {
    const sent = {
      event: "accepted",
      booking_id: POST,
      actor_name: "Fuseini Alhassan",
      offer_title: "CV review",
      title: "Fuseini Alhassan accepted your request",
      body: "About CV review.",
      href: `/bookings/${POST}`,
    };
    expect(renderNotification("booking", sent)).toEqual({ title: sent.title, body: sent.body, href: sent.href, icon: "booking" });
    expect(renderNotification("booking", { event: "message", booking_id: POST, actor_name: "Mariama Seidu" })).toMatchObject({
      title: "New message from Mariama Seidu",
      href: `/bookings/${POST}`,
    });
    expect(renderNotification("review", { event: "review", booking_id: POST, actor_name: "Wumpini Abukari", offer_title: "Portfolio review" })).toMatchObject({
      title: "Wumpini Abukari left you a review",
      body: "About Portfolio review.",
    });
  });

  it("links brief and pitch notices (#187) to the brief", () => {
    expect(renderNotification("opportunity", { brief_id: POST })).toMatchObject({ title: "A new brief matches your skills", href: `/briefs/${POST}` });
    expect(renderNotification("booking", { brief_id: POST, title: "Abdul-Rahman pitched on your brief", href: `/briefs/${POST}#pitches` })).toMatchObject({
      href: `/briefs/${POST}#pitches`,
    });
    expect(renderNotification("booking", { brief_id: POST, title: "x", href: "https://evil.example" }).href).toBe(`/briefs/${POST}`);
  });

  it("shows pitch news as brief news until the pitch becomes a booking", () => {
    expect(renderNotification("booking", { brief_id: POST, title: "Abdul-Rahman pitched on your brief" }).icon).toBe("opportunity");
    expect(renderNotification("booking", { brief_id: POST })).toMatchObject({ title: "News about a brief", icon: "opportunity" });
    expect(renderNotification("booking", { brief_id: POST, booking_id: POST, title: "Your pitch was accepted" })).toMatchObject({
      href: `/bookings/${POST}`,
      icon: "booking",
    });
  });

  it("falls back safely for a kind it has never seen", () => {
    expect(renderNotification("payout_sent", { amount: 5 })).toEqual({
      title: "Something new on SydCrest",
      body: null,
      href: null,
      icon: "general",
    });
    expect(renderNotification("constructor", {}).title).toBe("Something new on SydCrest");
    expect(renderNotification("brand_new", { title: "Wumpini followed you", href: "/u/wumpini" })).toMatchObject({
      title: "Wumpini followed you",
      href: "/u/wumpini",
    });
  });

  it("never links off site", () => {
    for (const href of ["https://evil.example", "//evil.example", "javascript:alert(1)", "/\\evil.example", " /ok path", "/x\"onclick"]) {
      expect(renderNotification("system", { title: "x", href }).href).toBeNull();
    }
  });
});

describe("helpers", () => {
  it("safeHref keeps site paths with queries and hashes", () => {
    expect(safeHref("/briefs/abc#pitches")).toBe("/briefs/abc#pitches");
    expect(safeHref("/opportunities?kind=gig")).toBe("/opportunities?kind=gig");
    expect(safeHref(42)).toBeNull();
  });

  it("formatWhen rejects non dates", () => {
    expect(formatWhen("not a date")).toBeNull();
    expect(formatWhen(undefined)).toBeNull();
  });

  it("timeAgo reads naturally", () => {
    const now = new Date("2026-10-27T12:00:00Z");
    expect(timeAgo("2026-10-27T11:59:30Z", now)).toBe("just now");
    expect(timeAgo("2026-10-27T11:00:00Z", now)).toBe("1 hour ago");
    expect(timeAgo("2026-10-26T11:00:00Z", now)).toBe("yesterday");
    expect(timeAgo("2026-09-01T11:00:00Z", now)).toBe("1 September");
  });

  it("writes no dashes in any copy", () => {
    const kinds = ["community_reply", "chapter_post", "event_waitlist_promoted", "event_update", "verified_skill", "skill_review", "booking", "review", "cohort", "opportunity", "system", "unknown"];
    for (const kind of kinds) {
      const r = renderNotification(kind, { event_title: "Meetup", skill_name: "Excel", chapter_name: "Tamale", starts_at: "2026-11-07T10:00:00Z" });
      expect(`${r.title} ${r.body ?? ""}`).not.toMatch(/[–—]| - /);
    }
  });
});
