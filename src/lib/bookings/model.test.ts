import { describe, expect, it } from "vitest";
import {
  allowedActions,
  bookingNotification,
  canMessage,
  canReview,
  countByStatus,
  filterInbox,
  otherParty,
  parseMessage,
  parseReason,
  parseRequest,
  parseReview,
  parseSide,
  parseStatusFilter,
  requestErrorMessage,
  reviewErrorMessage,
  statusErrorMessage,
  toThread,
  type BookingThreadRow,
} from "./model";

const WUMPINI = "11111111-1111-4111-8111-111111111111";
const FUSEINI = "22222222-2222-4222-8222-222222222222";
const MARIAMA = "33333333-3333-4333-8333-333333333333";

function row(over: Partial<BookingThreadRow> = {}): BookingThreadRow {
  return {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    status: "requested",
    requester_id: WUMPINI,
    requester_name: "Wumpini Abukari",
    requester_avatar: null,
    expert_id: FUSEINI,
    expert_name: "Fuseini Iddrisu",
    expert_avatar: null,
    expert_slug: "fuseini",
    offer_id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    offer_title: "Review your first data cleaning project",
    offer_kind: "one_to_one",
    organisation_id: null,
    organisation_name: null,
    message: "I need help with my survey sheet.",
    preferred_times: "Weekday evenings",
    status_reason: null,
    responded_at: null,
    completed_at: null,
    has_review: false,
    last_message_at: null,
    created_at: "2026-10-20T10:00:00Z",
    ...over,
  };
}

function form(entries: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(entries)) f.set(k, v);
  return f;
}

describe("allowedActions mirrors set_booking_status", () => {
  it("lets only the expert answer a new request, and the requester cancel it", () => {
    expect(allowedActions("requested", "expert")).toEqual(["accept", "decline"]);
    expect(allowedActions("requested", "requester")).toEqual(["cancel"]);
  });
  it("lets either party complete or cancel an accepted booking", () => {
    expect(allowedActions("accepted", "expert")).toEqual(["complete", "cancel"]);
    expect(allowedActions("accepted", "requester")).toEqual(["complete", "cancel"]);
  });
  it("offers nothing once a booking has ended", () => {
    for (const s of ["declined", "completed", "cancelled"] as const) {
      expect(allowedActions(s, "expert")).toEqual([]);
      expect(allowedActions(s, "requester")).toEqual([]);
    }
  });
});

describe("thread rules", () => {
  it("keeps the thread open while live and after completion", () => {
    expect(canMessage("requested")).toBe(true);
    expect(canMessage("accepted")).toBe(true);
    expect(canMessage("completed")).toBe(true);
    expect(canMessage("declined")).toBe(false);
    expect(canMessage("cancelled")).toBe(false);
  });
  it("lets only the booker review, once, after completion", () => {
    expect(canReview("completed", "requester", false, true)).toBe(true);
    expect(canReview("completed", "requester", true, true)).toBe(false);
    expect(canReview("completed", "expert", false, false)).toBe(false);
    expect(canReview("accepted", "requester", false, true)).toBe(false);
    // An organisation member on the requester side who did not book.
    expect(canReview("completed", "requester", false, false)).toBe(false);
  });
});

describe("toThread", () => {
  it("narrows a view row and uses the latest activity", () => {
    const t = toThread(row({ last_message_at: "2026-10-21T08:00:00Z" }))!;
    expect(t.status).toBe("requested");
    expect(t.lastActivityAt).toBe("2026-10-21T08:00:00Z");
    expect(toThread(row())!.lastActivityAt).toBe("2026-10-20T10:00:00Z");
  });
  it("drops rows missing what every screen needs", () => {
    expect(toThread(row({ id: null }))).toBeNull();
    expect(toThread(row({ status: "paid" }))).toBeNull();
  });
  it("never shows a blank name", () => {
    expect(toThread(row({ requester_name: " " }))!.requesterName).toBe("A SydCrest member");
  });
});

describe("inbox", () => {
  const threads = [
    toThread(row({ id: "a1aaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", status: "requested" }))!,
    toThread(
      row({
        id: "a2aaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
        status: "accepted",
        requester_id: FUSEINI,
        requester_name: "Fuseini Iddrisu",
        expert_id: MARIAMA,
        expert_name: "Mariama Seidu",
        created_at: "2026-10-22T10:00:00Z",
      }),
    )!,
    toThread(row({ id: "a3aaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", status: "completed", last_message_at: "2026-10-25T10:00:00Z" }))!,
  ];

  it("splits by side for the viewer and sorts newest activity first", () => {
    expect(filterInbox(threads, FUSEINI, "received", null).map((t) => t.status)).toEqual(["completed", "requested"]);
    expect(filterInbox(threads, FUSEINI, "sent", null).map((t) => t.status)).toEqual(["accepted"]);
    expect(filterInbox(threads, FUSEINI, "all", "accepted")).toHaveLength(1);
  });
  it("counts by status", () => {
    expect(countByStatus(threads)).toEqual({ requested: 1, accepted: 1, declined: 0, completed: 1, cancelled: 0 });
  });
  it("names the other person, with their organisation", () => {
    const t = toThread(row({ organisation_name: "Tamale Shea Collective" }))!;
    expect(otherParty(t, FUSEINI).name).toBe("Wumpini Abukari, Tamale Shea Collective");
    expect(otherParty(t, WUMPINI).name).toBe("Fuseini Iddrisu");
  });
  it("reads filters from the query string", () => {
    expect(parseStatusFilter("completed")).toBe("completed");
    expect(parseStatusFilter("paid")).toBeNull();
    expect(parseStatusFilter(["declined", "x"])).toBe("declined");
    expect(parseSide("received")).toBe("received");
    expect(parseSide("nonsense")).toBe("all");
  });
});

describe("forms", () => {
  it("requires a request message and trims", () => {
    expect(parseRequest(form({ message: "  " })).errors.message).toBeTruthy();
    const ok = parseRequest(form({ message: " Help with Excel ", preferred_times: "" }));
    expect(ok.errors).toEqual({});
    expect(ok.data).toEqual({ message: "Help with Excel", preferred_times: null });
    expect(parseRequest(form({ message: "x".repeat(2001) })).errors.message).toBeTruthy();
    expect(parseRequest(form({ message: "hi", preferred_times: "x".repeat(501) })).errors.preferred_times).toBeTruthy();
  });
  it("requires a message body within the limit", () => {
    expect(parseMessage(form({ body: "" })).errors.body).toBeTruthy();
    expect(parseMessage(form({ body: "x".repeat(4001) })).errors.body).toBeTruthy();
    expect(parseMessage(form({ body: "Saturday at 10?" })).data.body).toBe("Saturday at 10?");
  });
  it("keeps the reason optional", () => {
    expect(parseReason(form({})).data.reason).toBeNull();
    expect(parseReason(form({ reason: "x".repeat(1001) })).errors.reason).toBeTruthy();
  });
  it("needs a whole star rating from 1 to 5", () => {
    expect(parseReview(form({ rating: "0" })).errors.rating).toBeTruthy();
    expect(parseReview(form({ rating: "6" })).errors.rating).toBeTruthy();
    expect(parseReview(form({ rating: "4.5" })).errors.rating).toBeTruthy();
    expect(parseReview(form({ rating: "5", review: "  Clear and patient. " })).data).toEqual({ rating: 5, body: "Clear and patient." });
    expect(parseReview(form({ rating: "3" })).data.body).toBeNull();
  });
});

describe("error copy", () => {
  it("explains what the database refused", () => {
    expect(requestErrorMessage({ code: "23505" })).toMatch(/already have a request/);
    expect(requestErrorMessage({ code: "42501" })).toMatch(/18/);
    expect(statusErrorMessage({ code: "22023" })).toMatch(/moved on/);
    expect(reviewErrorMessage({ code: "23505" })).toMatch(/already reviewed/);
  });
  it("never uses dashes in user copy", () => {
    const copy = [
      ...["23505", "23514", "22023", "42501", "x"].map((code) => requestErrorMessage({ code })),
      ...["22023", "42501", "P0002", "x"].map((code) => statusErrorMessage({ code })),
      ...["23505", "42501", "x"].map((code) => reviewErrorMessage({ code })),
    ];
    for (const c of copy) expect(c).not.toMatch(/[-–—]/);
  });
});

describe("bookingNotification", () => {
  const booking = { id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", offerTitle: "Review your first data cleaning project" };
  it("links to the thread and carries ids and names, never contact details", () => {
    const n = bookingNotification("requested", booking, "Wumpini Abukari");
    expect(n.kind).toBe("booking");
    expect(n.payload).toMatchObject({
      event: "requested",
      booking_id: booking.id,
      actor_name: "Wumpini Abukari",
      href: `/bookings/${booking.id}`,
      title: "New request from Wumpini Abukari",
    });
    expect(JSON.stringify(n.payload)).not.toMatch(/@|\+233/);
  });
  it("uses the review kind for reviews and prompts a review on completion", () => {
    expect(bookingNotification("review", booking, "Wumpini").kind).toBe("review");
    expect(bookingNotification("completed", booking, "Fuseini").payload.body).toMatch(/leave a review/);
  });
  it("fits the 4 KB payload limit with long names", () => {
    const n = bookingNotification("message", { ...booking, offerTitle: "x".repeat(120) }, "y".repeat(120));
    expect(new TextEncoder().encode(JSON.stringify(n.payload)).length).toBeLessThan(4096);
  });
});
