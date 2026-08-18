/**
 * Mentors — wired to GET /api/marketplace and POST /api/marketplace/book.
 *
 * Booking is honest about payment: the backend never pretends a Hubtel
 * charge succeeded when Hubtel isn't configured (see services/hubtel.js) —
 * this page just surfaces whatever message the API actually returns.
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, ApiError } from "../lib/api.js";
import { Page, PageSection, Modal, Select, Input, Textarea, Button, Alert, PageLoader } from "../components/ui/index.js";
import MentorCard from "../components/dashboard/MentorCard.jsx";

const PAYMENT_METHODS = [
  { value: "mtn_momo", label: "MTN Mobile Money" },
  { value: "vodafone_cash", label: "Vodafone Cash" },
  { value: "airteltigo_money", label: "AirtelTigo Money" },
];

// Client-side search/filter — listing counts are small at pilot scale,
// same reasoning marketplace.js's own GET / handler already gives for
// doing aggregation in-process instead of a DB view or endpoint.
function specialtiesFrom(listings) {
  const set = new Set();
  for (const l of listings ?? []) for (const s of l.specialties ?? []) set.add(s);
  return [...set].sort();
}

function filterListings(listings, query, specialty) {
  const q = query.trim().toLowerCase();
  return (listings ?? []).filter((l) => {
    if (specialty && !l.specialties?.includes(specialty)) return false;
    if (!q) return true;
    return l.profiles.full_name.toLowerCase().includes(q) || l.specialties?.some((s) => s.toLowerCase().includes(q));
  });
}

export default function Mentors() {
  const navigate = useNavigate();
  const [listings, setListings] = useState(null);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null); // the listing being booked
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { booking, payment } after a successful POST
  const [form, setForm] = useState({ scheduled_at: "", duration_mins: "60", session_focus: "", payment_method: "mtn_momo" });
  const [query, setQuery] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState(null);

  const message = async (mentorProfileId) => {
    try {
      const { conversation } = await api.post("/api/chat/conversations/dm", { other_profile_id: mentorProfileId });
      navigate(`/messages/${conversation.id}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't start a conversation.");
    }
  };

  useEffect(() => {
    api.get("/api/marketplace")
      .then(({ listings }) => setListings(listings))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load mentors."));
  }, []);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const openBooking = (listing) => {
    setResult(null);
    setBooking(listing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await api.post("/api/marketplace/book", {
        listing_id: booking.id,
        scheduled_at: new Date(form.scheduled_at).toISOString(),
        duration_mins: Number(form.duration_mins),
        session_focus: form.session_focus,
        payment_method: form.payment_method,
      });
      setResult(res);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't book this session.");
    } finally {
      setSubmitting(false);
    }
  };

  if (listings === null && !error) return <PageLoader message="Loading mentors…" />;

  const allSpecialties = specialtiesFrom(listings);
  const filtered = filterListings(listings, query, activeSpecialty);

  return (
    <Page title="Mentors" titleHidden width="wide">
      <div className="mb-8 overflow-hidden rounded-2xl bg-[image:var(--gradient-launch)] px-6 py-10 sm:px-10">
        <p className="text-xs font-bold uppercase tracking-widest text-[#5c2e00]/80">Delta Mentoring Program</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#211d1d] sm:text-4xl">
          Find a mentor who's done it before
        </h1>
        <p className="mt-2 max-w-xl text-[#211d1d]/80">
          Every mentor here is vetted. Browse by specialty, message before you book, or go straight to an intro call.
        </p>
        <div className="mt-6 max-w-md">
          <Input
            placeholder="Search by name or specialty…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-surface"
          />
        </div>
      </div>

      {error && <Alert tone="danger" className="mb-4" onDismiss={() => setError("")}>{error}</Alert>}

      {allSpecialties.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveSpecialty(null)}
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
              activeSpecialty === null ? "border-orange-800 bg-orange-50 text-orange-800" : "border-line text-content-2 hover:border-line-strong"
            }`}
          >
            All
          </button>
          {allSpecialties.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setActiveSpecialty(activeSpecialty === s ? null : s)}
              className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                activeSpecialty === s ? "border-orange-800 bg-orange-50 text-orange-800" : "border-line text-content-2 hover:border-line-strong"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <PageSection>
        {filtered.length === 0 ? (
          <Alert tone="info">No mentors match that search.</Alert>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((l) => (
              <MentorCard
                key={l.id}
                name={l.profiles.full_name}
                photo={l.profiles.avatar_url}
                headline={l.profiles.bio || `${l.specialties?.[0] ?? "Mentor"} · GHS ${l.hourly_rate}/hr`}
                specialties={l.specialties || []}
                rating={l.avg_rating || 0}
                reviewCount={l.total_sessions}
                menteesGuided={l.total_sessions}
                full={l.is_full}
                onBook={() => openBooking(l)}
                onMessage={() => message(l.mentor_id)}
              />
            ))}
          </div>
        )}
      </PageSection>

      <Modal
        open={!!booking}
        onClose={() => setBooking(null)}
        title={result ? "Booking submitted" : `Book with ${booking?.profiles.full_name}`}
        footer={
          result ? (
            <Button onClick={() => setBooking(null)}>Done</Button>
          ) : (
            <>
              <Button variant="secondary" onClick={() => setBooking(null)}>Cancel</Button>
              <Button form="book-session-form" type="submit" loading={submitting}>
                Book — GHS {booking ? (booking.hourly_rate * (Number(form.duration_mins) / 60)).toFixed(2) : "0"}
              </Button>
            </>
          )
        }
      >
        {result ? (
          <Alert tone={result.payment.status === "initiated" ? "success" : "info"} title={result.payment.status === "initiated" ? "Payment initiated" : "Payment pending"}>
            {result.payment.message}
          </Alert>
        ) : (
          <form id="book-session-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input label="Date and time" type="datetime-local" required value={form.scheduled_at} onChange={set("scheduled_at")} />
            <Select
              label="Duration"
              value={form.duration_mins}
              onChange={set("duration_mins")}
              options={[{ value: "30", label: "30 minutes" }, { value: "60", label: "60 minutes" }]}
            />
            <Textarea label="What do you want to cover?" value={form.session_focus} onChange={set("session_focus")} />
            <Select label="Payment method" required value={form.payment_method} onChange={set("payment_method")} options={PAYMENT_METHODS} />
          </form>
        )}
      </Modal>
    </Page>
  );
}
