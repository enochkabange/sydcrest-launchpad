---
category: Learn
---

# CertificateList

Live certificates on a public profile, each linking to its verification page.

## When to use

Use on /u/[slug] when the learner opted in. Hide the section when the list is empty.

## Props

certificates: { verification_id: string; program_title: string; specialization_label: string | null; issued_at: string }[].

## Where it is used

/u/[slug]

## Source

`src/components/certificates/certificate-list.tsx`. Exported as `CertificateList`.
