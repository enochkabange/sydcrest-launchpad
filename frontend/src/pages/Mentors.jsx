/**
 * Mentors — wired to GET /api/marketplace and POST /api/marketplace/book.
 *
 * Booking is honest about payment: the backend never pretends a Hubtel
 * charge succeeded when Hubtel isn't configured (see services/hubtel.js) —
 * this page just surfaces whatever message the API actually returns.
 */
import { useEffect, useState } from "react";
import { api, ApiError } from "../lib/api.js";
import { Page, PageSection, Modal, Select, Input, Textarea, Button, Alert, PageLoader } from "../components/ui/index.js";
import MentorCard from "../components/dashboard/MentorCard.jsx";

const PAYMENT_METHODS = [
  { value: "mtn_momo", label: "MTN Mobile Money" },
  { value: "vodafone_cash", label: "Vodafone Cash" },
  { value: "airteltigo_money", label: "AirtelTigo Money" },
];

export default function Mentors() {
  const [listings, setListings] = useState(null);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null); // the listing being booked
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { booking, payment } after a successful POST
  const [form, setForm] = useState({ scheduled_at: "", duration_mins: "60", session_focus: "", payment_method: "mtn_momo" });

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

  return (
    <Page title="Mentors" description="Book a session with a mentor from the marketplace.">
      {error && <Alert tone="danger" className="mb-4" onDismiss={() => setError("")}>{error}</Alert>}

      <PageSection>
        <div className="grid gap-4 sm:grid-cols-2">
          {listings?.map((l) => (
            <MentorCard
              key={l.id}
              name={l.profiles.full_name}
              photo={l.profiles.avatar_url}
              headline={l.profiles.bio || `${l.specialties?.[0] ?? "Mentor"} · GHS ${l.hourly_rate}/hr`}
              specialties={l.specialties || []}
              rating={l.avg_rating || 0}
              reviewCount={l.total_sessions}
              menteesGuided={l.total_sessions}
              onBook={() => openBooking(l)}
            />
          ))}
        </div>
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
