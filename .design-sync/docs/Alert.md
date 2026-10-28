---
category: Feedback
---

# Alert

The system reporting what happened: a tinted message in danger, success or info.

## When to use

Use after an action (saved, failed, sent). Danger renders role=alert, the others role=status. It is not a Callout: authored guidance to learners belongs in lesson prose.

## Props

tone: "danger" | "success" | "info"; children: ReactNode.

## Where it is used

src/app/.../admin/applications/decision-form.tsx, /admin/certificates, src/app/.../admin/chapters/chapter-form.tsx, src/app/.../admin/cohorts/forms.tsx, /admin/content, src/app/.../admin/content/content-forms.tsx

## Source

`src/components/ui/alert.tsx`. Exported as `Alert`.
