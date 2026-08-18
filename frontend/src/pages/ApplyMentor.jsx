/**
 * ApplyMentor — public mentor-application form, PLATFORM_SPEC.md §4.
 * Same structural pattern as Apply.jsx (public, no auth, reference-code
 * confirmation on submit) but no program lookup — mentor vetting isn't
 * scoped to one program's cohort the way learner admissions is.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { api, ApiError } from "../lib/api.js";
import { Page, PageSection, Card, CardBody, Input, Textarea, Button, Alert } from "../components/ui/index.js";
import PublicShell from "../components/public/PublicShell.jsx";

export default function ApplyMentor() {
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "", expertise_areas: "", portfolio_url: "", bio: "",
    reference_1_name: "", reference_1_contact: "", reference_2_name: "", reference_2_contact: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [referenceCode, setReferenceCode] = useState(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const { reference_code } = await api.post("/api/mentor-applications", {
        ...form,
        expertise_areas: form.expertise_areas.split(",").map((s) => s.trim()).filter(Boolean),
      });
      setReferenceCode(reference_code);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't submit your application. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicShell>
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
        {referenceCode ? (
          <Card>
            <CardBody className="flex flex-col gap-3">
              <Alert tone="success" title="Application submitted">
                We'll review your application and references, then let you know. Save your reference code below.
              </Alert>
              <div className="rounded-md border border-line bg-surface-sunken px-4 py-3 text-center">
                <p className="text-xs uppercase tracking-widest text-content-3">Reference code</p>
                <p className="mt-1 text-2xl font-black tracking-wide text-content">{referenceCode}</p>
              </div>
              <p className="text-sm text-content-2">
                Check your status anytime at <Link to="/apply/status" className="text-content-link font-medium">the status page</Link>{" "}
                using this code and the email you applied with.
              </p>
            </CardBody>
          </Card>
        ) : (
          <Page title="Become a mentor" description="Guide the next cohort of tech talent in Ghana." width="wide" className="!px-0 !py-0">
            {error && <Alert tone="danger" className="mb-4">{error}</Alert>}

            <PageSection>
              <Card><CardBody>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <Input label="Full name" required value={form.full_name} onChange={set("full_name")} />
                  <Input label="Email" type="email" required value={form.email} onChange={set("email")} />
                  <Input label="Phone" type="tel" placeholder="+233…" value={form.phone} onChange={set("phone")} />
                  <Input label="Areas of expertise" placeholder="React, Node.js, product design…" hint="Comma-separated." value={form.expertise_areas} onChange={set("expertise_areas")} />
                  <Input label="Portfolio / LinkedIn URL" type="url" value={form.portfolio_url} onChange={set("portfolio_url")} />
                  <Textarea label="Tell us about yourself" required rows={4} value={form.bio} onChange={set("bio")} />

                  <div className="flex flex-col gap-4 rounded-md border border-line p-4">
                    <p className="text-sm font-bold text-content">Professional references</p>
                    <p className="text-sm text-content-2 -mt-2">We'll contact these before confirming you as a mentor.</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input label="Reference 1 — name" value={form.reference_1_name} onChange={set("reference_1_name")} />
                      <Input label="Reference 1 — contact" value={form.reference_1_contact} onChange={set("reference_1_contact")} />
                      <Input label="Reference 2 — name" value={form.reference_2_name} onChange={set("reference_2_name")} />
                      <Input label="Reference 2 — contact" value={form.reference_2_contact} onChange={set("reference_2_contact")} />
                    </div>
                  </div>

                  <Button type="submit" variant="accent" loading={submitting}>Submit application</Button>
                </form>
              </CardBody></Card>
            </PageSection>
          </Page>
        )}
      </div>
    </PublicShell>
  );
}
