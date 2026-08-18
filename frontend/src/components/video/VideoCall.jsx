/**
 * VideoCall — embeds a Daily.co room via a same-origin-agnostic iframe.
 * No daily-js SDK needed for this v1: Daily's prebuilt call UI iframes
 * cleanly on its own. `joinFn` is whatever `/sessions/:id/join` or
 * `/marketplace/bookings/:id/join` returns `{ url, token }` from — the
 * call isn't started (no camera/mic grabbed) until the user taps Join,
 * same "don't do it until asked" reasoning as chat's not-auto-polling a
 * closed thread. Callers only render this when the session/booking has a
 * `daily_room_url` — the meet_link-only fallback (Daily unconfigured) is
 * a plain link rendered by the caller instead, not by this component.
 */
import { useState } from "react";
import { Button, Alert } from "../ui/index.js";
import { ApiError } from "../../lib/api.js";

export default function VideoCall({ joinFn }) {
  const [call, setCall] = useState(null); // { url, token }
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const join = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await joinFn();
      setCall(result);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't start the call.");
    } finally {
      setLoading(false);
    }
  };

  if (call) {
    return (
      <iframe
        title="Video call"
        src={`${call.url}?t=${call.token}`}
        allow="camera; microphone; fullscreen; display-capture"
        className="w-full h-[70vh] rounded-lg border border-line"
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {error && <Alert tone="danger" onDismiss={() => setError("")}>{error}</Alert>}
      <Button onClick={join} loading={loading}>Join call</Button>
    </div>
  );
}
