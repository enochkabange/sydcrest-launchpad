import { useState } from "react";
import { Link } from "react-router-dom";
import { api, ApiError } from "../lib/api.js";
import { Logo, Input, Button, Alert } from "../components/ui/index.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api.post("/api/auth/forgot-password", { email });
      setSent(true);
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

        <form onSubmit={submit} className="flex flex-col gap-4 bg-surface border border-line rounded-lg p-6">
          <div>
            <h1 className="text-xl font-bold text-content">Reset your password</h1>
            <p className="text-sm text-content-2 mt-1">We'll email you a link to set a new one.</p>
          </div>

          {error && <Alert tone="danger">{error}</Alert>}
          {sent ? (
            <Alert tone="success">If that email exists, a reset link has been sent — check your inbox.</Alert>
          ) : (
            <>
              <Input
                label="Email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" loading={busy} fullWidth>Send reset link</Button>
            </>
          )}
        </form>

        <p className="text-center text-sm text-content-2">
          <Link to="/login" className="text-content-link font-medium">Back to log in</Link>
        </p>
      </div>
    </div>
  );
}
