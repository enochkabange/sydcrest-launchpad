/**
 * Icon — a semantic layer over Lucide.
 *
 * Components ask for what a thing MEANS (`<Icon name="lesson" />`), not which
 * glyph it happens to be. Swapping the picture for "project" is then one line
 * here rather than a find-and-replace across the app.
 *
 * Only the icons listed below are bundled — the import list is what the
 * bundler tree-shakes against, so keep this vocabulary tight and deliberate.
 * Adding an icon is a design decision, not a convenience.
 */
import {
  BookOpen, FolderGit2, ListChecks, GraduationCap, Award, Target,
  UserRound, Users, Briefcase, Flame, CalendarDays, MessagesSquare,
  MessageCircle, Sparkles, TrendingUp, Bell, Send, Play, Clock, Lock,
  CircleCheck, CircleAlert, TriangleAlert, Info, CircleX, Check,
  ChevronRight, ChevronDown, ChevronLeft, X, Menu, Search, Settings,
  LogOut, Download, Upload, ExternalLink, Plus, Trash2, Pencil, Eye,
  FileText, CircleHelp, Sun, Moon, Paperclip,
} from "lucide-react";

/* Domain vocabulary first, interface vocabulary second. */
const registry = {
  // Learning
  lesson: BookOpen,
  curriculum: GraduationCap,
  project: FolderGit2,
  quiz: ListChecks,
  certificate: Award,
  goal: Target,
  progress: TrendingUp,
  streak: Flame,

  // People
  mentor: UserRound,
  cohort: Users,
  community: MessagesSquare,
  session: CalendarDays,

  // Opportunities + AI
  opportunity: Briefcase,
  studyBuddy: Sparkles,
  ai: Sparkles,
  chat: MessageCircle,

  // Status — pairs with the tones in Badge and Alert
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleAlert,
  info: Info,
  locked: Lock,
  pending: Clock,

  // Interface
  notification: Bell,
  submit: Send,
  start: Play,
  search: Search,
  settings: Settings,
  logout: LogOut,
  download: Download,
  upload: Upload,
  external: ExternalLink,
  add: Plus,
  delete: Trash2,
  edit: Pencil,
  view: Eye,
  document: FileText,
  help: CircleHelp,
  themeLight: Sun,
  themeDark: Moon,
  attachment: Paperclip,
  check: Check,
  close: X,
  menu: Menu,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  clear: CircleX,
};

const sizes = { sm: 16, md: 20, lg: 24, xl: 32 };

export default function Icon({
  name,
  size = "md",
  className = "",
  label,
  strokeWidth = 2,
  ...props
}) {
  const Glyph = registry[name];

  /* Fail loudly. A silently-missing icon is the same class of bug as a
     Tailwind class that never generates — invisible in review, obvious to
     a user. In dev this throws; in production it renders a visible marker. */
  if (!Glyph) {
    const msg = `Icon: unknown name "${name}". Add it to the registry in Icon.jsx.`;
    if (import.meta.env?.DEV) throw new Error(msg);
    console.error(msg);
    return (
      <span
        role="img"
        aria-label={`Missing icon: ${name}`}
        title={msg}
        className={`inline-block bg-danger-700 text-white text-[9px] font-bold px-1 rounded-sm ${className}`}
      >
        ?
      </span>
    );
  }

  const px = sizes[size] ?? sizes.md;

  return (
    <Glyph
      width={px}
      height={px}
      strokeWidth={strokeWidth}
      className={`shrink-0 ${className}`}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      {...props}
    />
  );
}

export const iconNames = Object.keys(registry);
