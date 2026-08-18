/**
 * Profile — self-edit (PATCH /api/auth/me) plus change-password
 * (POST /api/auth/change-password, already existed on the backend with no
 * frontend home until now).
 */
import { useEffect, useState } from "react";
import { useAuth, ApiError } from "../auth/AuthContext.jsx";
import { api, BASE_URL } from "../lib/api.js";
import { Page, PageSection, Card, CardHeader, CardTitle, CardBody, Input, Textarea, Button, Alert, Badge, Avatar, FileUpload } from "../components/ui/index.js";

function AvatarSection() {
  const { profile, updateProfile } = useAuth();
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const upload = async (newFiles) => {
    setFiles(newFiles);
    const file = newFiles[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const { profile: updated } = await api.postForm("/api/auth/me/avatar", body);
      updateProfile(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't upload that photo.");
    } finally {
      setBusy(false);
      setFiles([]);
    }
  };

  return (
    <div className="flex items-center gap-5">
      <Avatar name={profile?.full_name} src={profile?.avatar_url} size="xl" />
      <div className="flex-1">
        {error && <Alert tone="danger" className="mb-2">{error}</Alert>}
        <FileUpload
          label="Profile photo"
          hint="A real photo helps mentees and mentors recognize each other."
          accept="image/*"
          maxSizeMB={5}
          value={files}
          onChange={upload}
          disabled={busy}
        />
      </div>
    </div>
  );
}

function ProfileForm() {
  const { profile, updateProfile } = useAuth();
  const [fields, setFields] = useState({
    full_name: profile?.full_name ?? "",
    phone: profile?.phone ?? "",
    region: profile?.region ?? "",
    bio: profile?.bio ?? "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const set = (key) => (e) => { setSaved(false); setFields((f) => ({ ...f, [key]: e.target.value })); };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { profile: updated } = await api.patch("/api/auth/me", fields);
      updateProfile(updated);
      setSaved(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't save your profile.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 max-w-md">
      {error && <Alert tone="danger" title="Something went wrong">{error}</Alert>}
      {saved && <Alert tone="success">Profile updated.</Alert>}
      <Input label="Full name" required value={fields.full_name} onChange={set("full_name")} />
      <Input label="Phone" type="tel" placeholder="+233…" value={fields.phone} onChange={set("phone")} />
      <Input label="Region" placeholder="e.g. Northern" value={fields.region} onChange={set("region")} />
      <Textarea label="Bio" rows={3} value={fields.bio} onChange={set("bio")} />
      <div>
        <Button type="submit" loading={busy}>Save changes</Button>
      </div>
    </form>
  );
}

function ChangePasswordForm() {
  const [current_password, setCurrent] = useState("");
  const [new_password, setNew] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api.post("/api/auth/change-password", { current_password, new_password });
      setDone(true);
      setCurrent("");
      setNew("");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't change your password.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 max-w-md">
      {error && <Alert tone="danger" title="Something went wrong">{error}</Alert>}
      {done && <Alert tone="success">Password changed. Your other sessions have been logged out.</Alert>}
      <Input
        label="Current password"
        type="password"
        autoComplete="current-password"
        required
        value={current_password}
        onChange={(e) => setCurrent(e.target.value)}
      />
      <Input
        label="New password"
        type="password"
        autoComplete="new-password"
        hint="At least 8 characters."
        required
        minLength={8}
        value={new_password}
        onChange={(e) => setNew(e.target.value)}
      />
      <div>
        <Button type="submit" variant="secondary" loading={busy}>Change password</Button>
      </div>
    </form>
  );
}

// AchievementsSection — PLATFORM_SPEC.md §8's "quiet internal tracking":
// unlike the Learn banner (reserved for accepted/halfway/certified), this
// lists every earned milestone. A minor's rows show a plain badge instead
// of a share link — the public page itself also blocks these, this just
// avoids offering a link that won't work.
function AchievementsSection() {
  const [achievements, setAchievements] = useState(null);

  useEffect(() => {
    api.get("/api/achievements/me").then(({ achievements }) => setAchievements(achievements)).catch(() => setAchievements([]));
  }, []);

  if (!achievements?.length) return null;

  return (
    <PageSection title="Achievements">
      <Card>
        <CardBody className="flex flex-col gap-3">
          {achievements.map((a) => (
            <div key={a.id} className="flex items-center justify-between gap-3 text-sm">
              <div>
                <p className="text-content font-medium">{a.label}</p>
                <p className="text-content-3 text-xs">{new Date(a.earned_at).toLocaleDateString()}</p>
              </div>
              {a.is_minor ? (
                <Badge tone="neutral">Not shareable</Badge>
              ) : (
                <a href={`${BASE_URL}/api/achievements/${a.id}`} target="_blank" rel="noreferrer" className="text-content-link text-sm font-medium">
                  Share
                </a>
              )}
            </div>
          ))}
        </CardBody>
      </Card>
    </PageSection>
  );
}

export default function Profile() {
  return (
    <Page eyebrow="Account" title="Your profile" description="Manage your details and password.">
      <div className="flex flex-col gap-8">
        <PageSection title="Photo">
          <Card><CardBody><AvatarSection /></CardBody></Card>
        </PageSection>
        <PageSection title="Details">
          <Card><CardBody><ProfileForm /></CardBody></Card>
        </PageSection>
        <PageSection title="Password">
          <Card><CardBody><ChangePasswordForm /></CardBody></Card>
        </PageSection>
        <AchievementsSection />
      </div>
    </Page>
  );
}
