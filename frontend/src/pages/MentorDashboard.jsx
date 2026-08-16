/**
 * MentorDashboard — the mentor-side home. Same gap as the admin dashboard
 * before it: projects.js and sessions.js are fully built and tested, but
 * nothing before this let a mentor actually review a submission or manage
 * a session without calling the API by hand.
 */
import { useEffect, useState } from "react";
import { api, ApiError } from "../lib/api.js";
import { Page, PageSection, Card, CardHeader, CardTitle, CardBody, CardFooter, Badge, Button, Textarea, Select, Modal, Alert, PageLoader, EmptyState, Avatar } from "../components/ui/index.js";

const PENDING_STATUSES = ["submitted", "ai_reviewed"];

export default function MentorDashboard() {
  const [projects, setProjects] = useState(null);
  const [sessions, setSessions] = useState(null);
  const [error, setError] = useState("");
  const [reviewing, setReviewing] = useState(null);

  const loadProjects = () => api.get("/api/projects").then(({ projects }) => setProjects(projects));
  const loadSessions = () => api.get("/api/sessions").then(({ sessions }) => setSessions(sessions));

  useEffect(() => {
    Promise.all([loadProjects(), loadSessions()])
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load your dashboard."));
  }, []);

  const markAttended = async (sessionId) => {
    try {
      await api.post(`/api/sessions/${sessionId}/attendance`, {});
      await loadSessions();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't update session.");
    }
  };

  if (error && !projects) return <Page title="Dashboard"><Alert tone="danger">{error}</Alert></Page>;
  if (projects === null || sessions === null) return <PageLoader message="Loading your dashboard…" />;

  const pending = projects.filter((p) => PENDING_STATUSES.includes(p.status));
  const upcoming = sessions.filter((s) => s.status === "scheduled");

  return (
    <Page eyebrow="Delta Mentoring Program" title="Your dashboard" description="What needs your attention.">
      {error && <Alert tone="danger" className="mb-4" onDismiss={() => setError("")}>{error}</Alert>}

      <PageSection title={`Projects awaiting review (${pending.length})`}>
        {pending.length === 0 ? (
          <EmptyState icon="project" title="Nothing to review" description="Submissions from your mentees will show up here." />
        ) : (
          <div className="flex flex-col gap-3">
            {pending.map((p) => (
              <Card key={p.id}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle>Week {p.week_number} — {p.title}</CardTitle>
                    <Badge tone="info">{p.status.replace(/_/g, " ")}</Badge>
                  </div>
                </CardHeader>
                <CardBody className="flex flex-col gap-2">
                  <p className="text-sm text-content-2">{p.profiles?.full_name}</p>
                  {p.submission_url && (
                    <a href={p.submission_url} target="_blank" rel="noreferrer" className="text-sm font-medium text-content-link">{p.submission_url}</a>
                  )}
                </CardBody>
                <CardFooter>
                  <Button size="sm" variant="accent" onClick={() => setReviewing(p)}>Review</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </PageSection>

      <PageSection title={`Upcoming sessions (${upcoming.length})`}>
        {upcoming.length === 0 ? (
          <EmptyState icon="session" title="Nothing scheduled" description="Sessions you book with your mentees will show up here." />
        ) : (
          <div className="flex flex-col gap-3">
            {upcoming.map((s) => (
              <Card key={s.id}>
                <CardBody className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={s.mentee?.full_name} size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-content">{s.mentee?.full_name}</p>
                      <p className="text-xs text-content-2">{new Date(s.scheduled_at).toLocaleString()} · {s.duration_mins}min</p>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary" onClick={() => markAttended(s.id)}>Mark attended</Button>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </PageSection>

      <ReviewModal project={reviewing} onClose={() => setReviewing(null)} onReviewed={loadProjects} />
    </Page>
  );
}

const REVIEW_STATUSES = [
  { value: "approved", label: "Approve" },
  { value: "revision_requested", label: "Request revision" },
  { value: "mentor_reviewed", label: "Mark reviewed (no verdict yet)" },
];

function ReviewModal({ project, onClose, onReviewed }) {
  const [status, setStatus] = useState("approved");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (project) { setStatus("approved"); setFeedback(""); setScore(""); setError(""); }
  }, [project]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      await api.post(`/api/projects/${project.id}/review`, {
        status, mentor_feedback: feedback, final_score: score ? Number(score) : undefined,
      });
      onReviewed();
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={!!project}
      onClose={onClose}
      title={project ? `Review: ${project.title}` : ""}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} loading={submitting}>Submit review</Button>
        </>
      }
    >
      {error && <Alert tone="danger" className="mb-3">{error}</Alert>}
      <div className="flex flex-col gap-4">
        <Select label="Decision" value={status} onChange={(e) => setStatus(e.target.value)} options={REVIEW_STATUSES} />
        <Textarea label="Feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={4} />
        <input
          type="number" min="0" max="100" placeholder="Score (optional)"
          value={score} onChange={(e) => setScore(e.target.value)}
          className="h-11 w-full rounded-md border border-line-strong bg-surface px-3 text-base text-content"
        />
      </div>
    </Modal>
  );
}
