/**
 * ApplicationsTab — the review queue, PLATFORM_SPEC.md §3. Visible to
 * reviewer/platform_admin/super_admin (not cohort_admin — matches the
 * backend's requireRole gate on /api/applications exactly; cohort_admin
 * runs cohorts post-acceptance, a different job from vetting applicants).
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

export default function ApplicationsTab() {
  const [applications, setApplications] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [error, setError] = useState("");
  const [reviewTarget, setReviewTarget] = useState(null);

  const load = () => {
    const qs = statusFilter ? `?status=${statusFilter}` : "";
    return api.get(`/api/applications${qs}`).then(({ applications }) => setApplications(applications));
  };

  useEffect(() => {
    setApplications(null);
    load().catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load applications."));
  }, [statusFilter]);

  if (error && !applications) return <Alert tone="danger" className="mt-4">{error}</Alert>;

  return (
    <div className="flex flex-col gap-4">
      {error && <Alert tone="danger" onDismiss={() => setError("")}>{error}</Alert>}

      <Select className="max-w-xs" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} options={STATUS_FILTERS} />

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
                <p className="text-content-2">{a.email} · {a.programs?.name}</p>
                <p className="text-content-2">
                  {a.region && <>Region: <span className="text-content font-medium">{a.region}</span> · </>}
                  {a.gender && <>Gender: <span className="text-content font-medium">{a.gender}</span> · </>}
                  {a.is_underserved && <Badge tone="info">Underserved</Badge>}
                </p>
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

      <ReviewModal application={reviewTarget} onClose={() => setReviewTarget(null)} onReviewed={load} />
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
