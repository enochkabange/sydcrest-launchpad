/**
 * Projects — wired to GET/POST /api/projects.
 *
 * Mentee-facing: submit a project, see its review status, get AI feedback,
 * attach a file. The mentor-side review UI (POST /:id/review) lives in
 * MentorDashboard.jsx instead of here.
 */
import { useEffect, useState } from "react";
import { api, ApiError } from "../lib/api.js";
import { Page, PageSection, Card, CardHeader, CardTitle, CardBody, CardFooter, Badge, Button, Input, Textarea, FileUpload, Modal, EmptyState, Alert, PageLoader, Icon } from "../components/ui/index.js";

const STATUS_TONE = {
  draft: "neutral",
  submitted: "info",
  ai_reviewed: "info",
  mentor_reviewed: "success",
  revision_requested: "warning",
  approved: "success",
};

export default function Projects() {
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ week_number: "", title: "", description: "", submission_url: "" });
  const [files, setFiles] = useState([]);
  const [assessingId, setAssessingId] = useState(null);
  const [aiUnconfigured, setAiUnconfigured] = useState(false);

  const load = () => api.get("/api/projects").then(({ projects }) => setProjects(projects));

  useEffect(() => {
    load().catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load your projects."));
  }, []);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const requestAiFeedback = async (id) => {
    setAssessingId(id);
    setError("");
    try {
      const { project } = await api.post(`/api/projects/${id}/ai-assess`, {});
      setProjects((ps) => ps.map((p) => (p.id === project.id ? project : p)));
    } catch (err) {
      if (err instanceof ApiError && err.status === 503) setAiUnconfigured(true);
      else setError(err instanceof ApiError ? err.message : "Couldn't get AI feedback.");
    } finally {
      setAssessingId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const { project } = await api.post("/api/projects", { ...form, week_number: Number(form.week_number) });
      if (files[0]) {
        const body = new FormData();
        body.append("file", files[0]);
        // The submission itself is what matters — a failed attachment upload
        // shouldn't roll back an otherwise-successful submission, just surface.
        await api.postForm(`/api/projects/${project.id}/upload`, body).catch((err) => {
          setError(err instanceof ApiError ? `Submitted, but the file didn't upload: ${err.message}` : "Submitted, but the file didn't upload.");
        });
      }
      setModalOpen(false);
      setForm({ week_number: "", title: "", description: "", submission_url: "" });
      setFiles([]);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't submit this project.");
    } finally {
      setSubmitting(false);
    }
  };

  if (projects === null && !error) return <PageLoader message="Loading your projects…" />;

  return (
    <Page
      title="Projects"
      description="Everything you build during the cohort."
      actions={<Button icon="add" onClick={() => setModalOpen(true)}>Submit a project</Button>}
    >
      {error && <Alert tone="danger" className="mb-4" onDismiss={() => setError("")}>{error}</Alert>}

      {projects?.length === 0 ? (
        <EmptyState
          icon="project"
          title="No projects yet"
          description="Submit your first project whenever it's ready — it doesn't have to wait for a specific week to open."
          action="Submit a project"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <PageSection>
          <div className="flex flex-col gap-4">
            {projects?.map((p) => (
              <Card key={p.id}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle>Week {p.week_number} — {p.title}</CardTitle>
                    <Badge tone={STATUS_TONE[p.status] ?? "neutral"}>{p.status.replace(/_/g, " ")}</Badge>
                  </div>
                </CardHeader>
                <CardBody className="flex flex-col gap-2">
                  {p.description && <p className="text-sm text-content-2">{p.description}</p>}
                  {p.submission_url && (
                    <a href={p.submission_url} target="_blank" rel="noreferrer" className="text-sm font-medium text-content-link">
                      {p.submission_url}
                    </a>
                  )}
                  {p.file_url && (
                    <a href={p.file_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-content-link">
                      <Icon name="attachment" size="sm" /> Attached file
                    </a>
                  )}
                  {p.mentor_feedback && (
                    <div className="rounded-md bg-surface-sunken border border-line p-3 text-sm">
                      <span className="font-semibold text-content">Mentor feedback: </span>
                      <span className="text-content-2">{p.mentor_feedback}</span>
                      {p.final_score != null && <span className="ml-2 font-semibold text-content">({p.final_score}/100)</span>}
                    </div>
                  )}
                  {p.ai_feedback && (
                    <div className="rounded-md bg-info-bg border border-blue-200 p-3 text-sm">
                      <p className="font-semibold text-content mb-1">AI first pass{p.ai_feedback.suggested_score != null ? ` (${p.ai_feedback.suggested_score}/100)` : ""}</p>
                      <p className="text-content-2 mb-2">{p.ai_feedback.summary}</p>
                      {p.ai_feedback.strengths?.length > 0 && (
                        <ul className="list-disc pl-5 text-content-2">
                          {p.ai_feedback.strengths.map((s, i) => <li key={`s${i}`}>{s}</li>)}
                        </ul>
                      )}
                      {p.ai_feedback.areas_to_improve?.length > 0 && (
                        <ul className="list-disc pl-5 text-content-2 mt-1">
                          {p.ai_feedback.areas_to_improve.map((s, i) => <li key={`a${i}`}>{s}</li>)}
                        </ul>
                      )}
                    </div>
                  )}
                  {!p.ai_feedback && p.status === "submitted" && !aiUnconfigured && (
                    <Button variant="secondary" size="sm" loading={assessingId === p.id} onClick={() => requestAiFeedback(p.id)}>
                      Get AI feedback
                    </Button>
                  )}
                </CardBody>
                <CardFooter>
                  <span className="text-sm text-content-2">
                    Submitted {new Date(p.submitted_at).toLocaleDateString()}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </PageSection>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Submit a project"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button form="submit-project-form" type="submit" loading={submitting}>Submit</Button>
          </>
        }
      >
        <form id="submit-project-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Week number" type="number" min="1" required value={form.week_number} onChange={set("week_number")} />
          <Input label="Title" required value={form.title} onChange={set("title")} />
          <Textarea label="Description" value={form.description} onChange={set("description")} />
          <Input label="Link to your work" type="url" placeholder="https://github.com/…" value={form.submission_url} onChange={set("submission_url")} />
          <FileUpload
            label="Attach a file (optional)"
            hint="A screenshot, zip, or PDF — whatever a link alone doesn't cover."
            value={files}
            onChange={setFiles}
          />
        </form>
      </Modal>
    </Page>
  );
}
