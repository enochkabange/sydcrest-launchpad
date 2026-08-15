import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, ApiError } from "../auth/AuthContext.jsx";
import { Logo, Input, Select, Button, Alert } from "../components/ui/index.js";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [fields, setFields] = useState({ full_name: "", email: "", password: "", role: "mentee" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(fields);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-sunken px-4 py-8">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <Logo size={40} className="mx-auto" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-surface border border-line rounded-lg p-6">
          <div>
            <h1 className="text-xl font-bold text-content">Create your account</h1>
            <p className="text-sm text-content-2 mt-1">Join the Delta Mentoring Program.</p>
          </div>

          {error && <Alert tone="danger">{error}</Alert>}

          <Input
            label="Full name"
            required
            value={fields.full_name}
            onChange={set("full_name")}
          />
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={fields.email}
            onChange={set("email")}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="new-password"
            hint="At least 8 characters."
            required
            minLength={8}
            value={fields.password}
            onChange={set("password")}
          />
          <Select
            label="I am a..."
            required
            value={fields.role}
            onChange={set("role")}
            options={[
              { value: "mentee", label: "Mentee — learning to build" },
              { value: "mentor", label: "Mentor — here to guide" },
            ]}
          />

          <Button type="submit" loading={loading} fullWidth>Create account</Button>
        </form>

        <p className="text-center text-sm text-content-2">
          Already have an account? <Link to="/login" className="text-content-link font-medium">Log in</Link>
        </p>
      </div>
    </div>
  );
}
