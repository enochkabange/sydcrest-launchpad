import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth, ApiError } from "../auth/AuthContext.jsx";
import { Logo, Input, Button, Alert } from "../components/ui/index.js";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(location.state?.from ?? "/", { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-sunken px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <Logo size={40} className="mx-auto" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-surface border border-line rounded-lg p-6">
          <div>
            <h1 className="text-xl font-bold text-content">Welcome back</h1>
            <p className="text-sm text-content-2 mt-1">Log in to continue your cohort.</p>
          </div>

          {error && <Alert tone="danger">{error}</Alert>}

          <Input
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" loading={loading} fullWidth>Log in</Button>
        </form>

        <p className="text-center text-sm text-content-2">
          New here? <Link to="/register" className="text-content-link font-medium">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
