import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext.jsx";
import { AppShell, PageLoader } from "./components/ui/index.js";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Learn from "./pages/Learn.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import GuardianConsent from "./pages/GuardianConsent.jsx";
import PathDetail from "./pages/PathDetail.jsx";
import StudyBuddy from "./pages/StudyBuddy.jsx";
import Profile from "./pages/Profile.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Apply from "./pages/Apply.jsx";
import ApplyMentor from "./pages/ApplyMentor.jsx";
import ApplicationStatus from "./pages/ApplicationStatus.jsx";
import Projects from "./pages/Projects.jsx";
import Mentors from "./pages/Mentors.jsx";
import Community from "./pages/Community.jsx";
import MentorDashboard from "./pages/MentorDashboard.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Showcase from "./Showcase.jsx";

// 'reviewer' is included here (not in backend ROLE_LEVELS' admin chain,
// but operationally the same "not a mentee" bucket for nav/routing
// purposes) — otherwise a reviewer-only account can never reach the
// Admin > Applications tab the backend already lets them use.
const ADMIN_ROLES = ["cohort_admin", "platform_admin", "super_admin", "reviewer"];
// Anyone who isn't a mentee lands on MentorDashboard at "/" — see HomeRoute.
const MENTOR_SIDE_ROLES = ["mentor", "cohort_admin", "platform_admin", "super_admin", "reviewer"];

function navFor(role) {
  const base = [
    { id: "learn", label: MENTOR_SIDE_ROLES.includes(role) ? "Dashboard" : "Learn", icon: "lesson", path: "/" },
    { id: "mentors", label: "Mentors", icon: "mentor", path: "/mentors" },
    { id: "projects", label: "Projects", icon: "project", path: "/projects" },
    { id: "community", label: "Community", icon: "community", path: "/community" },
  ];
  // Study Buddy chat_messages is keyed by mentee_id — mentee-side only, same
  // boundary as Learn's own curriculum data.
  if (!MENTOR_SIDE_ROLES.includes(role)) base.splice(1, 0, { id: "study-buddy", label: "Study Buddy", icon: "studyBuddy", path: "/study-buddy" });
  return ADMIN_ROLES.includes(role) ? [...base, { id: "admin", label: "Admin", icon: "settings", path: "/admin" }] : base;
}

/* AppShell's nav is controlled and router-unaware by design (see its own
   header comment) — this is the adapter, not a reason to touch AppShell. */
function AuthedLayout({ children }) {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const nav = navFor(profile?.role);

  const current = nav.find((n) => n.path === "/" ? location.pathname === "/" : location.pathname.startsWith(n.path))?.id
    ?? (location.pathname.startsWith("/learn") ? "learn" : undefined);

  return (
    <AppShell
      nav={nav}
      current={current}
      onNavigate={(id) => {
        if (id === "logout") return logout();
        if (id === "profile") return navigate("/profile");
        const item = nav.find((n) => n.id === id);
        if (item) navigate(item.path);
      }}
      user={{ name: profile?.full_name }}
    >
      {children}
    </AppShell>
  );
}

function RequireAuth({ children }) {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") return <PageLoader message="Loading…" />;
  if (status === "anon") return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  return <AuthedLayout>{children}</AuthedLayout>;
}

function RequireAdmin({ children }) {
  const { profile } = useAuth();
  // RequireAuth (wrapping this) already handles loading/anon — by the time
  // this renders, profile is populated. Hiding the nav item isn't access
  // control on its own; a mentee typing /admin directly must still bounce.
  if (!ADMIN_ROLES.includes(profile?.role)) return <Navigate to="/" replace />;
  return children;
}

function HomeRoute() {
  const { profile } = useAuth();
  return MENTOR_SIDE_ROLES.includes(profile?.role) ? <MentorDashboard /> : <Learn />;
}

function RedirectIfAuthed({ children }) {
  const { status } = useAuth();
  if (status === "loading") return <PageLoader message="Loading…" />;
  if (status === "authed") return <Navigate to="/" replace />;
  return children;
}

function PathDetailRoute() {
  useParams(); // pathId consumed inside PathDetail itself
  return <PathDetail />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<RedirectIfAuthed><Login /></RedirectIfAuthed>} />
          <Route path="/register" element={<RedirectIfAuthed><Register /></RedirectIfAuthed>} />
          <Route path="/forgot-password" element={<RedirectIfAuthed><ForgotPassword /></RedirectIfAuthed>} />
          <Route path="/reset-password" element={<RedirectIfAuthed><ResetPassword /></RedirectIfAuthed>} />

          {/* Public regardless of auth state — a logged-in user should be
              able to read these too, not get bounced like Login/Register. */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/apply/status" element={<ApplicationStatus />} />
          <Route path="/apply-as-mentor" element={<ApplyMentor />} />
          <Route path="/apply/:slug" element={<Apply />} />
          <Route path="/guardian-consent/:token" element={<GuardianConsent />} />

          <Route path="/" element={<RequireAuth><HomeRoute /></RequireAuth>} />
          <Route path="/learn/:pathId" element={<RequireAuth><PathDetailRoute /></RequireAuth>} />
          <Route path="/study-buddy" element={<RequireAuth><StudyBuddy /></RequireAuth>} />
          <Route path="/onboarding" element={<RequireAuth><Onboarding /></RequireAuth>} />
          <Route path="/mentors" element={<RequireAuth><Mentors /></RequireAuth>} />
          <Route path="/projects" element={<RequireAuth><Projects /></RequireAuth>} />
          <Route path="/community" element={<RequireAuth><Community /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/admin" element={<RequireAuth><RequireAdmin><Admin /></RequireAdmin></RequireAuth>} />

          {/* Design-system build harness — see docs/design-system.md. Not a
              product screen; not linked from the real nav. */}
          {import.meta.env.DEV && <Route path="/kit" element={<Showcase />} />}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
