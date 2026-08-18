/**
 * Mentor marketplace — browsing and paid session bookings.
 *
 * Payment itself is the unverified part: see services/hubtel.js's header.
 * Browsing and the booking record are real and fully testable without any
 * payment provider — a booking is created in `payment_status: 'pending'`
 * either way, so nothing here is faked to look more finished than it is.
 * The webhook has no signature verification (Hubtel's mechanism for that
 * isn't confirmed without live docs access) — flagged below, not hidden.
 */
const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { auth } = require('../middleware/auth');
const { initiateMoMoPayment, enabled: hubtelEnabled } = require('../services/hubtel');
const { isMinorMentee } = require('../utils/age');
const video = require('../services/video');

router.use(auth);

// GET /api/marketplace – active listings, most-booked first. Each listing
// gets mentee_count (distinct mentees who've ever booked) and is_full
// (PLATFORM_SPEC.md §4 hard caseload cap) computed here rather than via a
// DB view — listing counts are small at pilot scale, and one batched
// query for all bookings is simpler than a Postgres function for a
// "distinct count per group" that only this route needs.
router.get('/', async (req, res) => {
  const { data: listings, error } = await supabase
    .from('mentor_listings')
    .select('*, profiles!mentor_id(full_name, avatar_url, bio)')
    .eq('is_active', true)
    .order('total_sessions', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });

  const listingIds = listings.map((l) => l.id);
  const { data: bookings } = listingIds.length
    ? await supabase.from('bookings').select('listing_id, mentee_id').in('listing_id', listingIds)
    : { data: [] };

  const menteesByListing = new Map();
  for (const b of bookings ?? []) {
    if (!menteesByListing.has(b.listing_id)) menteesByListing.set(b.listing_id, new Set());
    menteesByListing.get(b.listing_id).add(b.mentee_id);
  }

  const enriched = listings.map((l) => {
    const mentee_count = menteesByListing.get(l.id)?.size ?? 0;
    return { ...l, mentee_count, is_full: l.max_mentees != null && mentee_count >= l.max_mentees };
  });

  res.json({ listings: enriched });
});

// POST /api/marketplace/book – mentee books a paid session with a listed mentor
router.post('/book', async (req, res) => {
  if (req.user.role !== 'mentee') return res.status(403).json({ error: 'Only mentees book marketplace sessions' });

  const { listing_id, scheduled_at, duration_mins = 60, session_focus, payment_method } = req.body;
  if (!listing_id || !scheduled_at || !payment_method)
    return res.status(400).json({ error: 'listing_id, scheduled_at, and payment_method required' });

  const { data: listing } = await supabase.from('mentor_listings').select('*').eq('id', listing_id).eq('is_active', true).single();
  if (!listing) return res.status(404).json({ error: 'Listing not found or inactive' });

  // Safeguarding (PLATFORM_SPEC.md §11): minors never get a private 1:1
  // video session. The marketplace has no group-booking concept, so
  // unlike sessions.js there's no group fallback here — booking is
  // simply blocked, pointing the mentee at their mentor's group sessions.
  if (await isMinorMentee(supabase, req.user.id))
    return res.status(403).json({ error: "Private paid sessions aren't available for accounts under 18 — ask your mentor to schedule a group session instead." });

  // Hard caseload cap (PLATFORM_SPEC.md §4): only blocks a genuinely new
  // mentee. An existing mentee can always book again — the cap limits how
  // many distinct mentees a mentor takes on, not total session volume.
  if (listing.max_mentees != null) {
    const { data: priorBooking } = await supabase.from('bookings').select('id').eq('listing_id', listing_id).eq('mentee_id', req.user.id).limit(1).maybeSingle();
    if (!priorBooking) {
      const { data: distinctMentees } = await supabase.from('bookings').select('mentee_id').eq('listing_id', listing_id);
      const menteeCount = new Set((distinctMentees ?? []).map((b) => b.mentee_id)).size;
      if (menteeCount >= listing.max_mentees)
        return res.status(409).json({ error: 'This mentor is at capacity. Check back later or pick another mentor.' });
    }
  }

  const total_amount = Number((listing.hourly_rate * (duration_mins / 60)).toFixed(2));

  const { data: booking, error } = await supabase
    .from('bookings')
    .insert({
      mentor_id: listing.mentor_id,
      mentee_id: req.user.id,
      listing_id,
      session_focus,
      scheduled_at,
      duration_mins,
      total_amount,
      status: 'pending',
      payment_method,
      payment_status: 'pending',
    })
    .select().single();
  if (error) return res.status(400).json({ error: error.message });

  const payment = await initiateMoMoPayment({
    amount: total_amount,
    phone: req.user.phone,
    paymentMethod: payment_method,
    reference: booking.id,
    description: `SydCrest session with ${listing.mentor_id}`,
    callbackUrl: `${req.protocol}://${req.get('host')}/api/marketplace/webhook/hubtel`,
  });

  if (payment.transactionId) {
    await supabase.from('bookings').update({ payment_ref: payment.transactionId }).eq('id', booking.id);
  }

  const room = await video.createRoom(`booking-${booking.id}`, { expiresAt: new Date(new Date(scheduled_at).getTime() + duration_mins * 60000) });
  if (room.configured && room.url) {
    await supabase.from('bookings').update({ daily_room_url: room.url, daily_room_name: room.name }).eq('id', booking.id);
    booking.daily_room_url = room.url;
    booking.daily_room_name = room.name;
  }

  res.status(201).json({
    booking,
    payment: hubtelEnabled
      ? (payment.error ? { status: 'failed', message: payment.error } : { status: 'initiated', message: 'Check your phone to approve the payment prompt.' })
      : { status: 'pending_setup', message: 'Payment is not yet configured on this platform. Your booking is held; you will be contacted to complete payment.' },
  });
});

// POST /api/marketplace/webhook/hubtel – payment status callback.
// NO SIGNATURE VERIFICATION — Hubtel's callback auth mechanism (IP
// allowlist? shared secret in the URL?) isn't confirmed without live
// docs access. Do not treat this endpoint as trusted without adding one.
router.post('/webhook/hubtel', async (req, res) => {
  const { ClientReference, Status } = req.body || {};
  if (!ClientReference) return res.status(400).json({ error: 'Missing ClientReference' });

  const { data: booking } = await supabase.from('bookings').select('id').eq('id', ClientReference).maybeSingle();
  if (!booking) return res.status(200).json({ received: true }); // ack anyway, nothing to act on

  const isSuccess = String(Status).toLowerCase() === 'success';
  await supabase
    .from('bookings')
    .update({
      payment_status: isSuccess ? 'held_escrow' : 'failed',
      status: isSuccess ? 'confirmed' : 'pending',
      confirmed_at: isSuccess ? new Date().toISOString() : null,
    })
    .eq('id', ClientReference);

  res.status(200).json({ received: true });
});

// POST /api/marketplace/bookings/:id/join – mirrors sessions.js's join
// route: participant-gated, issues a Daily meeting token, stamps a
// server-side joined_at at issuance time.
router.post('/bookings/:id/join', async (req, res) => {
  const { data: booking } = await supabase.from('bookings').select('*').eq('id', req.params.id).single();
  if (!booking) return res.status(404).json({ error: 'Booking not found' });

  const isMentee = booking.mentee_id === req.user.id;
  const isMentor = booking.mentor_id === req.user.id;
  if (!isMentee && !isMentor) return res.status(404).json({ error: 'Booking not found' });

  if (!booking.daily_room_url) return res.status(404).json({ error: 'No video room for this booking' });

  const result = await video.createMeetingToken(booking.daily_room_name, { userName: req.user.full_name, isOwner: isMentor });
  if (!result.configured || result.error) return res.status(503).json({ error: result.error || 'Video is not configured' });

  const now = new Date().toISOString();
  await supabase.from('bookings').update(isMentor ? { mentor_joined_at: now } : { mentee_joined_at: now }).eq('id', booking.id);

  res.json({ url: booking.daily_room_url, token: result.token });
});

module.exports = router;
