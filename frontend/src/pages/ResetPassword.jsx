/**
 * ResetPassword — lands here from the email link sent by
 * POST /api/auth/forgot-password. Supabase's reset link redirects with the
 * session in the URL fragment (`#access_token=...&type=recovery`), not a
 * query string, so this reads location.hash rather than useSearchParams.
 */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, ApiError } from "../lib/api.js";
import { Logo, Input, Button, Alert } from "../components/ui/index.js";

function readAccessToken() {
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  return hash.get("access_token");
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const [accessToken] = useState(readAccessToken);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => navigate("/login", { replace: true }), 2000);
      return () => clearTimeout(t);
    }
  }, [done, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api.post("/api/auth/reset-password", { access_token: accessToken, new_password: password });
      setDone(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-sunken px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <Logo size={40} className="mx-auto" />

        <div className="flex flex-col gap-4 bg-surface border border-line rounded-lg p-6">
          <div>
            <h1 className="text-xl font-bold text-content">Set a new password</h1>
          </div>

          {!accessToken ? (
            <Alert tone="danger" title="This link is invalid or has expired">
              Request a new one from <Link to="/forgot-password" className="text-content-link font-medium">the reset page</Link>.
            </Alert>
          ) : done ? (
            <Alert tone="success">Password reset. Taking you to log in…</Alert>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              {error && <Alert tone="danger">{error}</Alert>}
              <Input
                label="New password"
                type="password"
                autoComplete="new-password"
                hint="At least 8 characters."
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" loading={busy} fullWidth>Reset password</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
