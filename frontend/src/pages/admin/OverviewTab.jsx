import { useEffect, useState } from "react";
import { api, ApiError } from "../../lib/api.js";
import { Alert, PageLoader } from "../../components/ui/index.js";
import StatTile from "../../components/dashboard/StatTile.jsx";

export default function OverviewTab() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/admin/stats")
      .then(setStats)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load stats."));
  }, []);

  if (error) return <Alert tone="danger" className="mt-4">{error}</Alert>;
  if (!stats) return <PageLoader message="Loading stats…" />;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatTile icon="cohort" value={stats.mentees} label="Mentees" well="depth" />
      <StatTile icon="mentor" value={stats.mentors} label="Mentors" well="blue" />
      <StatTile icon="community" value={stats.active_cohorts} label="Active cohorts" well="launch" />
      <StatTile icon="certificate" value={stats.approved_projects} label="Approved projects" well="success" />
      <StatTile icon="progress" value={`GHS ${stats.total_gmv}`} label="Total GMV" well="blue" />
      <StatTile icon="rating" value={`GHS ${stats.platform_revenue}`} label="Platform revenue" well="depth" />
    </div>
  );
}
