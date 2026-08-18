/**
 * Onboarding — PLATFORM_SPEC.md §5. Authenticated mentee self-service:
 * device/connectivity check, an async orientation checklist, buddy
 * display once paired, and a guardian-consent-pending notice when
 * applicable. Advisory, not a hard gate — Learn.jsx links here via a
 * banner, it doesn't redirect.
 *
 * Live orientation sessions and the checklist content itself are static
 * copy, not database-driven (matching how dmp-curriculum.js content is
 * code, not admin-editable, at this scale) — the video-conferencing
 * dependency (§11) doesn't exist yet, so "orientation" here is a
 * self-paced checklist, not a scheduled session.
 */
import { useEffect, useState } from "react";
import { api, ApiError } from "../lib/api.js";
import { Page, PageSection, Card, CardHeader, CardTitle, CardBody, Badge, Checkbox, Select, Input, Button, Alert, PageLoader } from "../components/ui/index.js";

const DATA_PLANS = [
  { value: "", label: "Select…" },
  { value: "Unlimited / broadband", label: "Unlimited / broadband" },
  { value: "5GB+/month", label: "5GB+/month" },
  { value: "2-5GB/month", label: "2-5GB/month" },
  { value: "Under 2GB/month", label: "Under 2GB/month" },
  { value: "No regular data access", label: "No regular data access" },
];

const ORIENTATION_ITEMS = [
  "Read the cohort handbook and code of conduct",
  "Set up your profile and introduce yourself in Community",
  "Review the 12-week curriculum structure on your learning path",
  "Know how to reach your mentor and cohort admin if you're stuck",
];

function DeviceCheckForm({ enrollment, onSaved }) {
  const [deviceType, setDeviceType] = useState(enrollment.device_type ?? "");
  const [dataPlan, setDataPlan] = useState(enrollment.data_plan ?? "");
  const [availability, setAvailability] = useState(enrollment.availability_hours ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { enrollment: updated } = await api.post("/api/onboarding/device-check", {
        device_type: deviceType, data_plan: dataPlan, availability_hours: availability,
      });
      onSaved(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't save this.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 max-w-md">
      {error && <Alert tone="danger">{error}</Alert>}
      <Input label="What device will you mostly use?" placeholder="e.g. Android phone, shared laptop" value={deviceType} onChange={(e) => setDeviceType(e.target.value)} />
      <Select label="Data plan" value={dataPlan} onChange={(e) => setDataPlan(e.target.value)} options={DATA_PLANS} />
      <Input label="When are you usually available?" placeholder="e.g. Weekday evenings, weekends" value={availability} onChange={(e) => setAvailability(e.target.value)} />
      <Button type="submit" loading={busy} className="self-start">
        {enrollment.device_check_completed_at ? "Update" : "Save"}
      </Button>
    </form>
  );
}

function OrientationChecklist({ enrollment, onSaved }) {
  const [checked, setChecked] = useState(() => new Set(enrollment.orientation_completed_at ? ORIENTATION_ITEMS.map((_, i) => i) : []));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const toggle = (i) => setChecked((prev) => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  const allChecked = checked.size === ORIENTATION_ITEMS.length;

  const complete = async () => {
    setBusy(true);
    setError("");
    try {
      const { enrollment: updated } = await api.post("/api/onboarding/orientation-complete");
      onSaved(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't save this.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {error && <Alert tone="danger">{error}</Alert>}
      {enrollment.orientation_completed_at ? (
        <Alert tone="success">You've completed orientation.</Alert>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {ORIENTATION_ITEMS.map((item, i) => (
              <Checkbox key={item} label={item} checked={checked.has(i)} onChange={() => toggle(i)} />
            ))}
          </div>
          <Button onClick={complete} loading={busy} disabled={!allChecked} className="self-start">
            Mark orientation complete
          </Button>
        </>
      )}
    </div>
  );
}

export default function Onboarding() {
  const [enrollment, setEnrollment] = useState(null);
  const [error, setError] = useState("");

  // device-check/orientation-complete return the raw enrollments row, not
  // the /me endpoint's enriched shape (buddy_name, cohorts) — merge rather
  // than replace, or a save would silently drop the buddy display.
  const mergeEnrollment = (updated) => setEnrollment((prev) => ({ ...prev, ...updated }));

  useEffect(() => {
    api.get("/api/onboarding/me")
      .then(({ enrollment }) => setEnrollment(enrollment))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load your onboarding status."));
  }, []);

  if (error) {
    return (
      <Page title="Onboarding">
        <Alert tone="danger" title="Something went wrong">{error}</Alert>
      </Page>
    );
  }

  if (enrollment === null) return <PageLoader message="Loading…" />;

  return (
    <Page
      eyebrow={enrollment.cohorts?.name}
      title="Get set up"
      description="A few quick things to help you get the most out of your cohort."
    >
      {enrollment.guardian_consent_required && (
        <Alert tone={enrollment.guardian_consent_confirmed_at ? "success" : "warning"} className="mb-6">
          {enrollment.guardian_consent_confirmed_at
            ? "Your guardian has confirmed their consent."
            : "Since you're under 18, we need your guardian's consent before you can fully start. Your cohort admin will send them a confirmation link."}
        </Alert>
      )}

      <PageSection title="Device & connectivity check">
        <Card>
          <CardBody>
            <DeviceCheckForm enrollment={enrollment} onSaved={mergeEnrollment} />
          </CardBody>
        </Card>
      </PageSection>

      <PageSection title="Orientation checklist">
        <Card>
          <CardBody>
            <OrientationChecklist enrollment={enrollment} onSaved={mergeEnrollment} />
          </CardBody>
        </Card>
      </PageSection>

      <PageSection title="Your buddy">
        <Card>
          <CardHeader>
            <CardTitle>{enrollment.buddy_name ?? "Not paired yet"}</CardTitle>
          </CardHeader>
          <CardBody>
            {enrollment.buddy_name ? (
              <p className="text-content-2 text-sm">
                <Badge tone="info">Buddy</Badge>{" "}
                Say hello — pairing up with a peer makes the first few weeks easier.
              </p>
            ) : (
              <p className="text-content-2 text-sm">Your cohort admin pairs up buddies once your cohort starts.</p>
            )}
          </CardBody>
        </Card>
      </PageSection>
    </Page>
  );
}
