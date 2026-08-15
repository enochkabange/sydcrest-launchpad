/**
 * Auth state — token + profile, hydrated from /api/auth/me on boot so a
 * page refresh doesn't lose the session (only the token is persisted;
 * the profile is always re-fetched, so a role change on the backend takes
 * effect on next load instead of being stuck in stale localStorage).
 */
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api, tokenStore, onUnauthorized, ApiError } from "../lib/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | authed | anon

  const clear = useCallback(() => {
    tokenStore.clear();
    setProfile(null);
    setStatus("anon");
  }, []);

  useEffect(() => {
    if (!tokenStore.get()) {
      setStatus("anon");
      return;
    }
    api.get("/api/auth/me")
      .then(({ profile }) => { setProfile(profile); setStatus("authed"); })
      .catch(() => clear());
  }, [clear]);

  useEffect(() => onUnauthorized(clear), [clear]);

  const login = useCallback(async (email, password) => {
    const { token, profile } = await api.post("/api/auth/login", { email, password });
    tokenStore.set(token);
    setProfile(profile);
    setStatus("authed");
  }, []);

  const register = useCallback(async (fields) => {
    const { token, profile } = await api.post("/api/auth/register", fields);
    tokenStore.set(token);
    setProfile(profile);
    setStatus("authed");
  }, []);

  const logout = useCallback(() => clear(), [clear]);

  return (
    <AuthContext.Provider value={{ profile, status, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export { ApiError };
