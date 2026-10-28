import {
  Award,
  BadgeCheck,
  Bell,
  Briefcase,
  Building2,
  CalendarCheck,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  Compass,
  GraduationCap,
  Handshake,
  House,
  IdCard,
  LayoutDashboard,
  Map,
  MapPin,
  MessagesSquare,
  Search,
  Settings,
  Shield,
  Sparkles,
  TrendingUp,
  Trophy,
  UserPlus,
  UserRound,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/**
 * The one definition of where things live (issue #190). The app sidebar, the
 * phone tab bar, the hub pages, the avatar menu, the site header and the site
 * footer all read from here, so a destination is added or renamed once.
 *
 * Pure data and pure functions: safe in Server and Client Components. Who the
 * viewer is comes from `src/lib/nav/viewer.ts` (server only).
 */

/** What the viewer is, as far as navigation cares. Everyone signed in is a learner. */
export type NavRoles = {
  /** profiles.role is admin. */
  admin: boolean;
  /** Mentor or coordinator on a cohort (admins count too, as in requireStaff). */
  staff: boolean;
  /** Has an expert profile (any status: the dashboard explains pending and delisted). */
  expert: boolean;
  /** Active or invited member of an organisation. */
  business: boolean;
};

/** A signed in learner with no extra roles; also the shape rendered before roles stream in. */
export const NO_ROLES: NavRoles = { admin: false, staff: false, expert: false, business: false };

/**
 * Who sees an item. `everyone` is every signed in user; the rest need the
 * role. `notExpert` is the way in for people who are not experts yet.
 */
export type Audience = "everyone" | "staff" | "expert" | "notExpert" | "business" | "admin";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  /** One line for the hub card. No dashes (user facing copy). */
  description: string;
  audience?: Audience;
  /**
   * Extra paths that count as this item for the active state. A trailing
   * slash means "only below this path" (`/learn/` lights Roadmaps on a topic
   * page but not on the /learn hub itself).
   */
  match?: string[];
};

export type GroupId = "learn" | "mentors" | "community" | "earn" | "you";

export type NavGroup = {
  id: GroupId;
  label: string;
  /** The hub page a phone tab opens. `you` has none: it is the avatar menu. */
  hub: string | null;
  icon: LucideIcon;
  description: string;
  items: NavItem[];
};

export const HOME: NavItem = {
  href: "/dashboard",
  label: "Home",
  icon: House,
  description: "What to do next, your streak and your community.",
};

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "learn",
    label: "Learn",
    hub: "/learn",
    icon: GraduationCap,
    description: "Roadmaps, your path, your cohort and the skills you can prove.",
    items: [
      {
        href: "/roadmaps",
        label: "Roadmaps",
        icon: Map,
        description: "Every track, topic by topic, written for Ghana.",
        match: ["/learn/"],
      },
      { href: "/path", label: "Your path", icon: Compass, description: "The plan the path quiz made for you." },
      {
        href: "/cohort",
        label: "Cohort",
        icon: Users,
        description: "Your programme week by week, work and peer reviews.",
        match: ["/programme/apply"],
      },
      { href: "/skills", label: "Skills", icon: BadgeCheck, description: "Earn verified skill badges employers can check." },
      { href: "/certificates", label: "Certificates", icon: Award, description: "Certificates you have earned, ready to share." },
      { href: "/study-buddy", label: "Study Buddy", icon: Sparkles, description: "Ask questions and plan your next step." },
    ],
  },
  {
    id: "mentors",
    label: "Mentors",
    hub: "/mentors",
    icon: Handshake,
    description: "Find an expert, book time with them and work on briefs.",
    items: [
      { href: "/experts", label: "Find experts", icon: Search, description: "People in the industry who offer sessions and reviews." },
      { href: "/bookings", label: "Bookings", icon: CalendarCheck, description: "Requests you sent or received, and their messages." },
      { href: "/briefs", label: "Briefs", icon: ClipboardList, description: "Paid and practice briefs to pitch for." },
      {
        href: "/expert",
        label: "Expert dashboard",
        icon: LayoutDashboard,
        description: "Your expert profile, offers and requests.",
        audience: "expert",
      },
      {
        href: "/experts/apply",
        label: "Become an expert",
        icon: UserPlus,
        description: "Share what you know and get paid for sessions.",
        audience: "notExpert",
      },
      {
        href: "/mentor",
        label: "Mentor console",
        icon: ClipboardCheck,
        description: "Your cohorts, learners and submissions to grade.",
        audience: "staff",
      },
    ],
  },
  {
    id: "community",
    label: "Community",
    hub: "/community",
    icon: MessagesSquare,
    description: "Talk with other learners, meet up and see who is leading.",
    items: [
      { href: "/community", label: "Feed", icon: MessagesSquare, description: "Posts and questions from learners near you." },
      { href: "/events", label: "Events", icon: CalendarDays, description: "Meetups, workshops and recordings." },
      { href: "/chapters", label: "Chapters", icon: MapPin, description: "Your regional chapter and its members." },
      { href: "/leaderboards", label: "Leaderboards", icon: Trophy, description: "Who is learning most this week." },
    ],
  },
  {
    id: "earn",
    label: "Earn",
    hub: "/earn",
    icon: Wallet,
    description: "Jobs, internships and gigs, and the results you report.",
    items: [
      { href: "/opportunities", label: "Opportunities", icon: Briefcase, description: "Jobs, internships and gigs open now." },
      { href: "/outcomes", label: "Outcomes", icon: TrendingUp, description: "Report a job, a gig or a promotion." },
      { href: "/talent/me", label: "Talent profile", icon: IdCard, description: "Let businesses find you and get in touch." },
      {
        href: "/org",
        label: "Organisation",
        icon: Building2,
        description: "Your business account, team and requests.",
        audience: "business",
        match: ["/talent", "/business/new"],
      },
    ],
  },
  {
    id: "you",
    label: "You",
    hub: null,
    icon: UserRound,
    description: "Your profile, notifications and settings.",
    items: [
      { href: "/profile", label: "Profile", icon: UserRound, description: "Your details and public profile." },
      { href: "/notifications", label: "Notifications", icon: Bell, description: "Replies, bookings and updates for you." },
      { href: "/settings", label: "Settings", icon: Settings, description: "Theme, text size, accessibility and reminders." },
      { href: "/admin", label: "Admin", icon: Shield, description: "Run the platform.", audience: "admin" },
    ],
  },
];

/** The phone tab bar: Home plus one tab per hub (the founder's decision on #190). */
export type Tab = { id: "home" | GroupId; href: string; label: string; icon: LucideIcon };

export const PHONE_TABS: Tab[] = [
  { id: "home", href: HOME.href, label: HOME.label, icon: HOME.icon },
  ...NAV_GROUPS.filter((g) => g.hub).map((g) => ({ id: g.id, href: g.hub!, label: g.label, icon: g.icon })),
];

/** The site header for visitors: the public areas, in this order. */
export const PUBLIC_NAV: { href: string; label: string }[] = [
  { href: "/roadmaps", label: "Roadmaps" },
  { href: "/programme", label: "Programme" },
  { href: "/experts", label: "Experts" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/events", label: "Events" },
  { href: "/chapters", label: "Chapters" },
  { href: "/skills", label: "Skills" },
  { href: "/impact", label: "Impact" },
  { href: "/business", label: "For business" },
];

/** The site footer: the public areas plus the pages about SydCrest itself. */
export const FOOTER_NAV: { href: string; label: string }[] = [
  ...PUBLIC_NAV,
  { href: "/start", label: "Find your path" },
  { href: "/about", label: "About" },
  { href: "/partners", label: "Partners" },
];

export function canSee(item: NavItem, roles: NavRoles): boolean {
  switch (item.audience ?? "everyone") {
    case "everyone":
      return true;
    case "staff":
      return roles.staff || roles.admin;
    case "expert":
      return roles.expert;
    case "notExpert":
      return !roles.expert;
    case "business":
      return roles.business;
    case "admin":
      return roles.admin;
  }
}

export function visibleItems(group: NavGroup, roles: NavRoles): NavItem[] {
  return group.items.filter((item) => canSee(item, roles));
}

export function groupById(id: GroupId): NavGroup {
  const group = NAV_GROUPS.find((g) => g.id === id);
  if (!group) throw new Error(`Unknown nav group ${id}`);
  return group;
}

function pathOf(href: string): string {
  const i = href.search(/[?#]/);
  return i === -1 ? href : href.slice(0, i);
}

/**
 * How well `path` matches a pattern: 0 for no match, otherwise the length of
 * the matched prefix (longer wins, so /experts/apply beats /experts).
 * `/x` matches /x and /x/..., never /xy; `/x/` matches only below /x.
 */
function score(path: string, pattern: string): number {
  if (pattern.endsWith("/")) return path.startsWith(pattern) ? pattern.length : 0;
  return path === pattern || path.startsWith(`${pattern}/`) ? pattern.length : 0;
}

function itemScore(path: string, item: NavItem): number {
  return Math.max(score(path, pathOf(item.href)), ...(item.match ?? []).map((m) => score(path, m)));
}

/** True when `path` is `href` or below it (never a sibling sharing a prefix). */
export function matchesPath(path: string, href: string): boolean {
  return score(path, pathOf(href)) > 0;
}

/**
 * The href of the item to mark current among `items`, or null. The best
 * (longest) match wins; on a tie the first item does, so /profile lights
 * Profile rather than Settings.
 */
export function activeHref(path: string | null, items: NavItem[]): string | null {
  if (!path) return null;
  let best: NavItem | null = null;
  let bestScore = 0;
  for (const item of items) {
    const s = itemScore(path, item);
    if (s > bestScore) {
      best = item;
      bestScore = s;
    }
  }
  return best?.href ?? null;
}

/**
 * The phone tab to mark current. A group's tab is current on its hub and on
 * every page of its items, whoever the viewer is. `you` pages (profile,
 * notifications) have no tab.
 */
export function activeTab(path: string | null): Tab["id"] | null {
  if (!path) return null;
  if (matchesPath(path, HOME.href)) return "home";
  const all = NAV_GROUPS.flatMap((g) => g.items);
  const href = activeHref(path, all);
  const owner = href ? NAV_GROUPS.find((g) => g.items.some((i) => i.href === href)) : undefined;
  if (owner) return owner.id === "you" ? null : owner.id;
  const hub = NAV_GROUPS.find((g) => g.hub && matchesPath(path, g.hub));
  return hub ? hub.id : null;
}
