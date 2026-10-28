---
category: Learn
---

# CertificateChecklist

The four steps to a certificate as a list, each saying done or not in words as well as with the icon.

## When to use

Use inside CertificationCard and on the mentor's issue page (`audience="staff"`). Exported from the code as ChecklistView.

## Props

status: CertificationStatus; issued?: boolean; audience?: "learner" | "staff"; compact?: boolean.

## Where it is used

/certificates, /certificates/issue

## Source

`src/components/certificates/checklist.tsx` (exported there as `ChecklistView`). Exported as `CertificateChecklist`.
