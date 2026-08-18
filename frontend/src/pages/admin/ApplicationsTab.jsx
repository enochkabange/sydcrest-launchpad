/**
 * ApplicationsTab — the review queue, PLATFORM_SPEC.md §3 (learners) and
 * §4 (mentors). Visible to reviewer/platform_admin/super_admin (not
 * cohort_admin — matches the backend's requireRole gate exactly; vetting
 * applicants/mentors is a different job from running cohorts).
 *
 * Two independent queues, one tab: a Learners/Mentors toggle switches
 * both the API path and which review modal renders, since the two
 * decision flows genuinely differ (mentor acceptance is blocked server-
 * side until references are checked — see MentorReviewModal).
 */
import { useEffect, useState } from "react";
import { api, ApiError } from "../../lib/api.js";
import { Card, CardHeader, CardTitle, CardBody, Badge, Button, Select, Textarea, Modal, Alert, PageLoader, EmptyState } from "../../components/ui/index.js";

const STATUS_TONE = {
  applied: "info",
  under_review: "info",
  accepted: "success",
  waitlisted: "warning",
  rejected: "danger",
};

const STATUS_FILTERS = [
  { value: "", label: "All statuses" },
  { value: "applied", label: "Applied" },
  { value: "under_review", label: "Under review" },
  { value: "accepted", label: "Accepted" },
  { value: "waitlisted", label: "Waitlisted" },
  { value: "rejected", label: "Rejected" },
];

const QUEUES = {
  learners: { endpoint: "/api/applications", label: "Learners" },
  mentors: { endpoint: "/api/mentor-applications", label: "Mentors" },
};

export default function ApplicationsTab() {
  const [queueType, setQueueType] = useState("learners");
  const [applications, setApplications] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [error, setError] = useState("");
  const [reviewTarget, setReviewTarget] = useState(null);

  const load = () => {
    const qs = statusFilter ? `?status=${statusFilter}` : "";
    return api.get(`${QUEUES[queueType].endpoint}${qs}`).then(({ applications }) => setApplications(applications));
  };

  useEffect(() => {
    setApplications(null);
    load().catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load applications."));
  }, [statusFilter, queueType]);

  if (error && !applications) return <Alert tone="danger" className="mt-4">{error}</Alert>;

  return (
    <div className="flex flex-col gap-4">
      {error && <Alert tone="danger" onDismiss={() => setError("")}>{error}</Alert>}

      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-md border border-line overflow-hidden">
          {Object.entries(QUEUES).map(([key, q]) => (
            <button
              key={key}
              type="button"
              onClick={() => setQueueType(key)}
              className={`px-3 py-1.5 text-sm font-semibold transition-colors ${
                queueType === key ? "bg-blue-500 text-white" : "bg-surface text-content-2 hover:bg-surface-sunken"
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>
        <Select className="max-w-xs" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} options={STATUS_FILTERS} />
      </div>

      {applications === null ? (
        <PageLoader message="Loading applications…" />
      ) : applications.length === 0 ? (
        <EmptyState icon="document" title="No applications" description="Nothing matches this filter yet." />
      ) : (
        <div className="flex flex-col gap-3">
          {applications.map((a) => (
            <Card key={a.id}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{a.full_name}</CardTitle>
                  <Badge tone={STATUS_TONE[a.status] ?? "neutral"}>{a.status.replace(/_/g, " ")}</Badge>
                </div>
              </CardHeader>
              <CardBody className="flex flex-col gap-2 text-sm">
                <p className="text-content-2">{a.email}{a.programs?.name ? ` · ${a.programs.name}` : ""}</p>
                {queueType === "learners" ? (
                  <p className="text-content-2">
                    {a.region && <>Region: <span className="text-content font-medium">{a.region}</span> · </>}
                    {a.gender && <>Gender: <span className="text-content font-medium">{a.gender}</span> · </>}
                    {a.is_underserved && <Badge tone="info">Underserved</Badge>}
                  </p>
                ) : (
                  <p className="text-content-2">
                    {(a.expertise_areas ?? []).join(", ") || "No expertise listed"}
                    {a.references_checked && <Badge tone="success" className="ml-2">References checked</Badge>}
                  </p>
                )}
                {a.screening_score != null && (
                  <p className="text-content-2">Screening score: <span className="text-content font-medium">{a.screening_score}</span></p>
                )}
                <Button size="sm" variant="secondary" className="self-start mt-1" onClick={() => setReviewTarget(a)}>
                  Review
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {queueType === "learners" ? (
        <ReviewModal application={reviewTarget} onClose={() => setReviewTarget(null)} onReviewed={load} />
      ) : (
        <MentorReviewModal application={reviewTarget} onClose={() => setReviewTarget(null)} onReviewed={load} />
      )}
    </div>
  );
}

function ReviewModal({ application, onClose, onReviewed }) {
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(null); // which status is in flight
  const [error, setError] = useState("");

  useEffect(() => {
    if (application) { setNotes(application.reviewer_notes ?? ""); setError(""); }
  }, [application]);

  const decide = async (status) => {
    setSubmitting(status);
    setError("");
    try {
      await api.patch(`/api/applications/${application.id}`, { status, reviewer_notes: notes });
      onReviewed();
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't save this decision.");
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <Modal
      open={!!application}
      onClose={onClose}
      title={`Review — ${application?.full_name ?? ""}`}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button variant="danger" loading={submitting === "rejected"} onClick={() => decide("rejected")}>Reject</Button>
          <Button variant="secondary" loading={submitting === "waitlisted"} onClick={() => decide("waitlisted")}>Waitlist</Button>
          <Button variant="accent" loading={submitting === "accepted"} onClick={() => decide("accepted")}>Accept</Button>
        </>
      }
    >
      {error && <Alert tone="danger" className="mb-3">{error}</Alert>}
      {application && (
        <div className="flex flex-col gap-3 text-sm">
          <p className="text-content-2">{application.email}</p>
          {application.essay && (
            <div className="rounded-md border border-line bg-surface-sunken p-3">
              <p className="font-semibold text-content mb-1">Essay</p>
              <p className="text-content-2 whitespace-pre-wrap">{application.essay}</p>
            </div>
          )}
          <Textarea label="Reviewer notes" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      )}
    </Modal>
  );
}

// Mentor review differs from learner review in one load-bearing way: the
// backend refuses status: 'accepted' unless references_checked is already
// true (or sent in the same call). This checkbox is a UI convenience that
// mirrors that rule — the server enforces it regardless of what this
// button's disabled state does.
function MentorReviewModal({ application, onClose, onReviewed }) {
  const [notes, setNotes] = useState("");
  const [referencesChecked, setReferencesChecked] = useState(false);
  const [submitting, setSubmitting] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (application) {
      setNotes(application.reviewer_notes ?? "");
      setReferencesChecked(application.references_checked ?? false);
      setError("");
    }
  }, [application]);

  const decide = async (status) => {
    setSubmitting(status);
    setError("");
    try {
      await api.patch(`/api/mentor-applications/${application.id}`, { status, reviewer_notes: notes, references_checked: referencesChecked });
      onReviewed();
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't save this decision.");
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <Modal
      open={!!application}
      onClose={onClose}
      title={`Review — ${application?.full_name ?? ""}`}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button variant="danger" loading={submitting === "rejected"} onClick={() => decide("rejected")}>Reject</Button>
          <Button variant="secondary" loading={submitting === "waitlisted"} onClick={() => decide("waitlisted")}>Waitlist</Button>
          <Button variant="accent" loading={submitting === "accepted"} disabled={!referencesChecked} onClick={() => decide("accepted")}>
            Accept
          </Button>
        </>
      }
    >
      {error && <Alert tone="danger" className="mb-3">{error}</Alert>}
      {application && (
        <div className="flex flex-col gap-3 text-sm">
          <p className="text-content-2">{application.email}{application.portfolio_url && <> · <a href={application.portfolio_url} target="_blank" rel="noreferrer" className="text-content-link">Portfolio</a></>}</p>
          {application.bio && (
            <div className="rounded-md border border-line bg-surface-sunken p-3">
              <p className="font-semibold text-content mb-1">Bio</p>
              <p className="text-content-2 whitespace-pre-wrap">{application.bio}</p>
            </div>
          )}
          <div className="rounded-md border border-line bg-surface-sunken p-3">
            <p className="font-semibold text-content mb-1">References</p>
            <p className="text-content-2">{application.reference_1_name} — {application.reference_1_contact}</p>
            <p className="text-content-2">{application.reference_2_name} — {application.reference_2_contact}</p>
          </div>
          <label className="flex items-center gap-2 font-medium text-content">
            <input type="checkbox" checked={referencesChecked} onChange={(e) => setReferencesChecked(e.target.checked)} />
            I've contacted these references
          </label>
          <Textarea label="Reviewer notes" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      )}
    </Modal>
  );
}
