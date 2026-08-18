/**
 * GuardianConsent — public, PLATFORM_SPEC.md §5. Reached via a token link
 * an admin relays directly to a guardian (no email service exists to send
 * it automatically — see backend/src/routes/onboarding.js's header
 * comment). Deliberately shows only what a guardian needs to recognize
 * the request, not any of the enrollment's internal state.
 */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, ApiError } from "../lib/api.js";
import { Logo, Button, Alert, PageLoader } from "../components/ui/index.js";

export default function GuardianConsent() {
  const { token } = useParams();
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    api.get(`/api/onboarding/guardian-consent/${token}`)
      .then((data) => {
        setInfo(data);
        setConfirmed(data.already_confirmed);
      })
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load this consent request."));
  }, [token]);

  const confirm = async () => {
    setConfirming(true);
    setError("");
    try {
      await api.post(`/api/onboarding/guardian-consent/${token}`);
      setConfirmed(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't confirm this.");
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-sunken px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <Logo size={40} className="mx-auto" />

        <div className="flex flex-col gap-4 bg-surface border border-line rounded-lg p-6">
          <div>
            <h1 className="text-xl font-bold text-content">Guardian consent</h1>
            <p className="text-sm text-content-2 mt-1">
              SydCrest Launchpad needs a guardian's consent for a mentee under 18 to take part in the program.
            </p>
          </div>

          {error && <Alert tone="danger">{error}</Alert>}

          {!info && !error && <PageLoader message="Loading…" />}

          {info && (
            confirmed ? (
              <Alert tone="success" title="Consent confirmed">
                Thank you — {info.mentee_name} is all set to continue with {info.cohort_name}.
              </Alert>
            ) : (
              <>
                <p className="text-sm text-content">
                  <span className="font-semibold">{info.mentee_name}</span> has been enrolled in{" "}
                  <span className="font-semibold">{info.cohort_name}</span> and needs your consent to fully participate.
                </p>
                <Button onClick={confirm} loading={confirming} fullWidth>I give my consent</Button>
              </>
            )
          )}
        </div>

        <p className="text-center text-sm text-content-2">
          <Link to="/login" className="text-content-link font-medium">Back to log in</Link>
        </p>
      </div>
    </div>
  );
}
