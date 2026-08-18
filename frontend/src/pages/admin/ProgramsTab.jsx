/**
 * ProgramsTab — PLATFORM_SPEC.md §2's "programs" entity, platform_admin+
 * only (creating a program is a bigger structural decision than creating a
 * cohort, matching the backend's own POST /programs gate). Cards use the
 * same gradient-strip treatment as LessonCard/Learn.jsx path cards, for a
 * consistent brand language across admin and learner-facing screens.
 */
import { useEffect, useState } from "react";
import { api, ApiError } from "../../lib/api.js";
import { Card, CardHeader, CardTitle, CardBody, Badge, Button, Input, Textarea, Modal, Alert, PageLoader, EmptyState } from "../../components/ui/index.js";

export default function ProgramsTab() {
  const [programs, setPrograms] = useState(null);
  const [error, setError] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const load = () => api.get("/api/admin/programs").then(({ programs }) => setPrograms(programs));

  useEffect(() => {
    load().catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load programs."));
  }, []);

  if (error && !programs) return <Alert tone="danger" className="mt-4">{error}</Alert>;
  if (programs === null) return <PageLoader message="Loading programs…" />;

  return (
    <div className="flex flex-col gap-4">
      {error && <Alert tone="danger" onDismiss={() => setError("")}>{error}</Alert>}

      <Button icon="add" className="self-end" onClick={() => setCreateOpen(true)}>New program</Button>

      {programs.length === 0 ? (
        <EmptyState
          icon="curriculum"
          title="No programs yet"
          description="A program is the top-level entity a cohort attaches to — its own duration, eligibility, and certification criteria."
          action="New program"
          onAction={() => setCreateOpen(true)}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {programs.map((p) => (
            <Card key={p.id} className="overflow-hidden p-0">
              <div className="h-[3px] bg-[image:var(--gradient-launch)]" />
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{p.name}</CardTitle>
                  <Badge tone={p.is_active ? "success" : "neutral"}>{p.is_active ? "Active" : "Inactive"}</Badge>
                </div>
              </CardHeader>
              <CardBody className="flex flex-col gap-2 text-sm">
                {p.description && <p className="text-content-2">{p.description}</p>}
                <p className="text-content-2">Duration: <span className="text-content font-medium">{p.duration_weeks} weeks</span></p>
                {(p.eligibility_min_age || p.eligibility_max_age) && (
                  <p className="text-content-2">
                    Eligibility: <span className="text-content font-medium">{p.eligibility_min_age ?? "any"}–{p.eligibility_max_age ?? "any"} years</span>
                  </p>
                )}
                {p.certification_criteria?.min_completion_pct != null && (
                  <p className="text-content-2">
                    Certification: <span className="text-content font-medium">{p.certification_criteria.min_completion_pct}% completion</span>
                    {p.certification_criteria.requires_peer_review && <span className="text-content font-medium">, peer review</span>}
                  </p>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <CreateProgramModal open={createOpen} onClose={() => setCreateOpen(false)} onCreated={load} />
    </div>
  );
}

function CreateProgramModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    name: "", slug: "", description: "", duration_weeks: "12",
    eligibility_min_age: "", eligibility_max_age: "", eligibility_notes: "",
    min_completion_pct: "80", requires_all_projects: true, requires_peer_review: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const set = (key) => (e) => {
    const value = e?.target ? (e.target.type === "checkbox" ? e.target.checked : e.target.value) : e;
    setForm((f) => ({ ...f, [key]: value, ...(key === "name" && !f.slug ? { slug: slugify(value) } : {}) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.post("/api/admin/programs", {
        name: form.name,
        slug: form.slug,
        description: form.description || undefined,
        duration_weeks: Number(form.duration_weeks),
        eligibility_min_age: form.eligibility_min_age ? Number(form.eligibility_min_age) : undefined,
        eligibility_max_age: form.eligibility_max_age ? Number(form.eligibility_max_age) : undefined,
        eligibility_notes: form.eligibility_notes || undefined,
        certification_criteria: {
          min_completion_pct: Number(form.min_completion_pct),
          requires_all_projects: form.requires_all_projects,
          requires_peer_review: form.requires_peer_review,
        },
      });
      onCreated();
      onClose();
      setForm({ name: "", slug: "", description: "", duration_weeks: "12", eligibility_min_age: "", eligibility_max_age: "", eligibility_notes: "", min_completion_pct: "80", requires_all_projects: true, requires_peer_review: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't create program.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New program"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button form="create-program-form" type="submit" loading={submitting}>Create</Button>
        </>
      }
    >
      <form id="create-program-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <Alert tone="danger">{error}</Alert>}
        <Input label="Name" required value={form.name} onChange={set("name")} />
        <Input label="Slug" required hint="Used in URLs — auto-filled from name, editable." value={form.slug} onChange={set("slug")} />
        <Textarea label="Description" value={form.description} onChange={set("description")} />
        <Input label="Duration (weeks)" type="number" min="1" required value={form.duration_weeks} onChange={set("duration_weeks")} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Min age" type="number" min="0" value={form.eligibility_min_age} onChange={set("eligibility_min_age")} />
          <Input label="Max age" type="number" min="0" value={form.eligibility_max_age} onChange={set("eligibility_max_age")} />
        </div>
        <Textarea label="Eligibility notes" value={form.eligibility_notes} onChange={set("eligibility_notes")} />
        <Input label="Certification: minimum completion %" type="number" min="0" max="100" value={form.min_completion_pct} onChange={set("min_completion_pct")} />
        <label className="flex items-center gap-2 text-sm text-content">
          <input type="checkbox" checked={form.requires_all_projects} onChange={set("requires_all_projects")} />
          Requires all projects submitted
        </label>
        <label className="flex items-center gap-2 text-sm text-content">
          <input type="checkbox" checked={form.requires_peer_review} onChange={set("requires_peer_review")} />
          Requires peer review
        </label>
      </form>
    </Modal>
  );
}

function slugify(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
