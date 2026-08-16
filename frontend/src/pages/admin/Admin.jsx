/**
 * Admin — the actual operational gap this session kept hitting: every
 * cohort and enrollment up to now was created by hand through the
 * Supabase Management API. This is what a real platform_admin/cohort_admin
 * uses instead.
 *
 * Tab visibility mirrors the backend's own role gate (ROLE_LEVELS in
 * middleware/auth.js) — a cohort_admin only ever sees Cohorts; Overview
 * and Users are platform_admin+ only, matching what those API routes
 * actually allow.
 */
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext.jsx";
import { Page, Tabs, TabPanel } from "../../components/ui/index.js";
import OverviewTab from "./OverviewTab.jsx";
import CohortsTab from "./CohortsTab.jsx";
import UsersTab from "./UsersTab.jsx";

const LEVELS = { mentee: 1, mentor: 2, cohort_admin: 3, platform_admin: 4, super_admin: 5 };

export default function Admin() {
  const { profile } = useAuth();
  const level = LEVELS[profile?.role] ?? 0;
  const isPlatformAdmin = level >= LEVELS.platform_admin;

  const tabs = [
    ...(isPlatformAdmin ? [{ id: "overview", label: "Overview", icon: "progress" }] : []),
    { id: "cohorts", label: "Cohorts", icon: "cohort" },
    ...(isPlatformAdmin ? [{ id: "users", label: "Users", icon: "mentor" }] : []),
  ];
  const [tab, setTab] = useState(tabs[0]?.id);

  return (
    <Page title="Admin" description="Run cohorts and manage the platform.">
      <Tabs tabs={tabs} value={tab} onChange={setTab} />
      <TabPanel id="overview" value={tab}><OverviewTab /></TabPanel>
      <TabPanel id="cohorts" value={tab}><CohortsTab isPlatformAdmin={isPlatformAdmin} /></TabPanel>
      <TabPanel id="users" value={tab}><UsersTab isSuperAdmin={profile?.role === "super_admin"} /></TabPanel>
    </Page>
  );
}
