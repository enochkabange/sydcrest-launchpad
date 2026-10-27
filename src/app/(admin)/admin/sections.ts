/**
 * Sections of the admin area, shown in the admin header and on /admin.
 * Each section is a folder beside this file (admin/<href>/page.tsx). Add a
 * line here when you add a section; nothing else needs to change.
 */
export const ADMIN_SECTIONS: { href: string; label: string; description: string }[] = [
  { href: "/admin/roadmaps", label: "Roadmaps", description: "Create and edit roadmaps, their nodes and links, and publish them." },
  { href: "/admin/content", label: "Content", description: "Review explanations and practice tasks for roadmap nodes." },
  { href: "/admin/applications", label: "Applications", description: "Review programme applications and accept, waitlist or decline them." },
  { href: "/admin/opportunities", label: "Opportunities", description: "Post and edit jobs, internships, scholarships, grants and gigs for the public board." },
  { href: "/admin/events", label: "Events", description: "Create events, add joining links and recordings, and open host tools." },
  { href: "/admin/chapters", label: "Chapters", description: "Create regional chapters, set their status and appoint leads." },
  { href: "/admin/reports", label: "Reports", description: "Triage safety reports from learners." },
  { href: "/admin/experts", label: "Experts", description: "Review expert applications, approve, delist, verify and feature experts." },
  { href: "/admin/certificates", label: "Certificates", description: "See issued certificates and revoke one with a reason." },
  { href: "/admin/cohorts", label: "Cohorts", description: "Create programme cohorts and assign their mentors and coordinators." },
  { href: "/admin/outcomes", label: "Outcomes", description: "Verify the jobs, internships, contracts and awards learners report." },
  { href: "/admin/impact", label: "North Star", description: "Completion and verified placements by cohort, within six months of the end." },
  { href: "/admin/organisations", label: "Organisations", description: "Verify business accounts before they post or browse talent." },
  { href: "/admin/funnel", label: "Funnel", description: "See how visitors move from sign up to their first completed node." },
];
