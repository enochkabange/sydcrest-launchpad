import { test } from "@playwright/test";
import { signIn } from "../certificates-fixtures";
import { deleteExperts, seedExperts } from "../experts-seed";
import { createLearner } from "../learners";
import { admin, insert } from "../supabase-admin";
import { screensSetup, shoot } from "./shoot";

test("booking screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);

  const seeded = await seedExperts();
  const { verified } = seeded;
  const [wumpini, abdul, mariama, issahaku, sumaila] = await Promise.all([
    createLearner("Wumpini Abukari"),
    createLearner("Abdul-Rahman Yakubu"),
    createLearner("Mariama Iddrisu"),
    createLearner("Issahaku Alhassan"),
    createLearner("Sumaila Mahama"),
  ]);
  const people = [wumpini, abdul, mariama, issahaku, sumaila];
  const now = Date.now();
  const at = (hoursAgo: number) => new Date(now - hoursAgo * 3_600_000).toISOString();

  try {
    // Fuseini's inbox: one of each state, from real (test) accounts.
    const [accepted, completed] = await insert<{ id: string }>("booking_requests", [
      {
        requester_id: wumpini.id,
        expert_id: verified.id,
        offer_id: verified.sessionId,
        message: "I keep my shop stock in a spreadsheet and the totals never match. Can you look at it with me?",
        preferred_times: "Weekday evenings after 6pm, or Saturday morning",
        status: "accepted",
        responded_at: at(20),
        created_at: at(26),
      },
      {
        requester_id: wumpini.id,
        expert_id: verified.id,
        offer_id: verified.gigId,
        message: "Please clean the survey export from our women's group savings project.",
        status: "completed",
        responded_at: at(200),
        completed_at: at(150),
        created_at: at(220),
      },
    ]);
    await insert("booking_requests", [
      {
        requester_id: abdul.id,
        expert_id: verified.id,
        offer_id: verified.sessionId,
        message: "I am moving from shop records to data work and want a plan for the next three months.",
        preferred_times: "Sunday afternoons",
        created_at: at(3),
      },
      {
        requester_id: mariama.id,
        expert_id: verified.id,
        offer_id: verified.gigId,
        message: "Our NGO field survey has 1,500 rows with many duplicates.",
        status: "declined",
        status_reason: "Fully booked this month.",
        responded_at: at(60),
        created_at: at(70),
      },
      {
        requester_id: issahaku.id,
        expert_id: verified.id,
        offer_id: verified.sessionId,
        message: "Can you review my first dashboard?",
        status: "cancelled",
        cancelled_by: issahaku.id,
        created_at: at(90),
      },
    ]);
    await insert("booking_messages", [
      { booking_id: accepted.id, sender_id: verified.id, body: "Happy to help. Send the sheet before we meet so I can look first.", created_at: at(19) },
      { booking_id: accepted.id, sender_id: wumpini.id, body: "Thank you. I have shared it. Is Saturday at 10am good?", created_at: at(18) },
      { booking_id: accepted.id, sender_id: verified.id, body: "Saturday at 10am works. I will send a video call link here on Friday.", created_at: at(17) },
    ]);

    await signIn(page, wumpini.email);
    await shoot(page, testInfo, "booking-request", `/experts/${verified.slug}/offers/${verified.gigId}/request`);
    await shoot(page, testInfo, "booking-review", `/bookings/${completed.id}`);
    await shoot(page, testInfo, "bookings-sent", "/bookings");

    await signIn(page, (await admin<{ email: string }>(`/auth/v1/admin/users/${verified.id}`)).email);
    await shoot(page, testInfo, "bookings-inbox", "/bookings");
    await shoot(page, testInfo, "booking-thread", `/bookings/${accepted.id}`);

    await signIn(page, sumaila.email);
    await shoot(page, testInfo, "bookings-empty", "/bookings");
  } finally {
    await deleteExperts(seeded);
    for (const p of people) await admin(`/auth/v1/admin/users/${p.id}`, { method: "DELETE" });
  }
});
