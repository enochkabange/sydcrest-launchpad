import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext.jsx";
import { AppShell, PageLoader } from "./components/ui/index.js";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Learn from "./pages/Learn.jsx";
import PathDetail from "./pages/PathDetail.jsx";
import Projects from "./pages/Projects.jsx";
import Mentors from "./pages/Mentors.jsx";
import Community from "./pages/Community.jsx";
import Showcase from "./Showcase.jsx";

const NAV = [
  { id: "learn", label: "Learn", icon: "lesson", path: "/" },
  { id: "mentors", label: "Mentors", icon: "mentor", path: "/mentors" },
  { id: "projects", label: "Projects", icon: "project", path: "/projects" },
  { id: "community", label: "Community", icon: "community", path: "/community" },
];

/* AppShell's nav is controlled and router-unaware by design (see its own
   header comment) — this is the adapter, not a reason to touch AppShell. */
function AuthedLayout({ children }) {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const current = NAV.find((n) => n.path === "/" ? location.pathname === "/" : location.pathname.startsWith(n.path))?.id
    ?? (location.pathname.startsWith("/learn") ? "learn" : undefined);

  return (
    <AppShell
      nav={NAV}
      current={current}
      onNavigate={(id) => {
        if (id === "logout") return logout();
        const item = NAV.find((n) => n.id === id);
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

          <Route path="/" element={<RequireAuth><Learn /></RequireAuth>} />
          <Route path="/learn/:pathId" element={<RequireAuth><PathDetailRoute /></RequireAuth>} />
          <Route path="/mentors" element={<RequireAuth><Mentors /></RequireAuth>} />
          <Route path="/projects" element={<RequireAuth><Projects /></RequireAuth>} />
          <Route path="/community" element={<RequireAuth><Community /></RequireAuth>} />

          {/* Design-system build harness — see docs/design-system.md. Not a
              product screen; not linked from the real nav. */}
          {import.meta.env.DEV && <Route path="/kit" element={<Showcase />} />}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
