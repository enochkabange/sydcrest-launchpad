/**
 * ApplicationStatus — public status lookup, PLATFORM_SPEC.md §3. Requires
 * the reference code, not just email — same reasoning as the backend
 * route (GET /api/applications/status): prevents probing another
 * applicant's status by guessing an email address.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { api, ApiError } from "../lib/api.js";
import { Logo, Input, Button, Alert } from "../components/ui/index.js";

const STATUS_COPY = {
  applied: { tone: "info", label: "Received", body: "Your application has been received and is waiting for review." },
  under_review: { tone: "info", label: "Under review", body: "A reviewer is looking at your application now." },
  accepted: { tone: "success", label: "Accepted", body: "Congratulations — you're in! Register with the same email to get started." },
  waitlisted: { tone: "warning", label: "Waitlisted", body: "You're on the waitlist. We'll reach out if a seat opens up." },
  rejected: { tone: "danger", label: "Not selected this time", body: "You weren't selected for this cycle, but you're welcome to apply again next time." },
};

export default function ApplicationStatus() {
  const [email, setEmail] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const { application } = await api.get(`/api/applications/status?email=${encodeURIComponent(email)}&reference_code=${encodeURIComponent(referenceCode)}`);
      setResult(application);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't look up your application.");
    } finally {
      setLoading(false);
    }
  };

  const copy = result ? STATUS_COPY[result.status] : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-sunken px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <Logo size={40} className="mx-auto" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-surface border border-line rounded-lg p-6">
          <div>
            <h1 className="text-xl font-bold text-content">Check your application</h1>
            <p className="text-sm text-content-2 mt-1">Enter the email you applied with and your reference code.</p>
          </div>

          {error && <Alert tone="danger">{error}</Alert>}

          {copy && (
            <Alert tone={copy.tone} title={copy.label}>{copy.body}</Alert>
          )}

          <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Reference code" required value={referenceCode} onChange={(e) => setReferenceCode(e.target.value.toUpperCase())} />

          <Button type="submit" loading={loading} fullWidth>Check status</Button>
        </form>

        <p className="text-center text-sm text-content-2">
          <Link to="/login" className="text-content-link font-medium">Back to log in</Link>
        </p>
      </div>
    </div>
  );
}
