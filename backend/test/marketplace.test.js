const { app, request, supabase, registerUser, deleteUser } = require('./helpers');

// registerUser('mentor') already auto-creates a mentor_listings row
// (mentor_id is unique) — update it rather than inserting a second one.
async function createListing(mentorId, overrides = {}) {
  const { data, error } = await supabase
    .from('mentor_listings')
    .update({ hourly_rate: 50, specialties: ['Testing'], ...overrides })
    .eq('mentor_id', mentorId)
    .select().single();
  if (error) throw error;
  return data;
}

describe('marketplace caseload cap', () => {
  const cleanup = [];
  const listingIds = [];
  const bookingIds = [];

  afterEach(async () => {
    await Promise.all(bookingIds.splice(0).map((id) => supabase.from('bookings').delete().eq('id', id)));
    await Promise.all(listingIds.splice(0).map((id) => supabase.from('mentor_listings').delete().eq('id', id)));
    await Promise.all(cleanup.splice(0).map(deleteUser));
  });

  it('GET /api/marketplace reports mentee_count and is_full per listing', async () => {
    const mentor = await registerUser('mentor');
    const mentee = await registerUser('mentee');
    cleanup.push(mentor.email, mentee.email);
    const listing = await createListing(mentor.profile.id, { max_mentees: 1 });
    listingIds.push(listing.id);

    const before = await request(app).get('/api/marketplace').set('Authorization', `Bearer ${mentee.token}`);
    const beforeListing = before.body.listings.find((l) => l.id === listing.id);
    expect(beforeListing.mentee_count).toBe(0);
    expect(beforeListing.is_full).toBe(false);

    const book = await request(app).post('/api/marketplace/book').set('Authorization', `Bearer ${mentee.token}`).send({
      listing_id: listing.id, scheduled_at: new Date(Date.now() + 86400000).toISOString(), payment_method: 'mtn_momo',
    });
    expect(book.status).toBe(201);
    bookingIds.push(book.body.booking.id);

    const after = await request(app).get('/api/marketplace').set('Authorization', `Bearer ${mentee.token}`);
    const afterListing = after.body.listings.find((l) => l.id === listing.id);
    expect(afterListing.mentee_count).toBe(1);
    expect(afterListing.is_full).toBe(true);
  });

  it('rejects a new mentee once the cap is reached, but allows an existing mentee to book again', async () => {
    const mentor = await registerUser('mentor');
    const menteeA = await registerUser('mentee');
    const menteeB = await registerUser('mentee');
    cleanup.push(mentor.email, menteeA.email, menteeB.email);
    const listing = await createListing(mentor.profile.id, { max_mentees: 1 });
    listingIds.push(listing.id);

    const bookA1 = await request(app).post('/api/marketplace/book').set('Authorization', `Bearer ${menteeA.token}`).send({
      listing_id: listing.id, scheduled_at: new Date(Date.now() + 86400000).toISOString(), payment_method: 'mtn_momo',
    });
    expect(bookA1.status).toBe(201);
    bookingIds.push(bookA1.body.booking.id);

    // New mentee B, at capacity — rejected.
    const bookB = await request(app).post('/api/marketplace/book').set('Authorization', `Bearer ${menteeB.token}`).send({
      listing_id: listing.id, scheduled_at: new Date(Date.now() + 86400000).toISOString(), payment_method: 'mtn_momo',
    });
    expect(bookB.status).toBe(409);

    // Existing mentee A books again — still allowed even though at capacity.
    const bookA2 = await request(app).post('/api/marketplace/book').set('Authorization', `Bearer ${menteeA.token}`).send({
      listing_id: listing.id, scheduled_at: new Date(Date.now() + 2 * 86400000).toISOString(), payment_method: 'mtn_momo',
    });
    expect(bookA2.status).toBe(201);
    bookingIds.push(bookA2.body.booking.id);
  });

  it('a listing with no max_mentees set has no cap', async () => {
    const mentor = await registerUser('mentor');
    const mentee = await registerUser('mentee');
    cleanup.push(mentor.email, mentee.email);
    const listing = await createListing(mentor.profile.id); // max_mentees left null
    listingIds.push(listing.id);

    const book = await request(app).post('/api/marketplace/book').set('Authorization', `Bearer ${mentee.token}`).send({
      listing_id: listing.id, scheduled_at: new Date(Date.now() + 86400000).toISOString(), payment_method: 'mtn_momo',
    });
    expect(book.status).toBe(201);
    bookingIds.push(book.body.booking.id);
  });
});
