---
category: Learn
---

# CertificationCard

A learner's certificate panel for one programme: the checklist while they work, then the certificate with its badge, link and sharing.

## When to use

Use on /certificates, one per programme. Server safe; data comes from the caller.

## Props

programTitle: string; programSlug: string; status: CertificationStatus | null; certificate: OwnCertificate | null; headingLevel?: 2 | 3.

## Where it is used

/certificates

## Source

`src/components/certificates/certification-card.tsx`. Exported as `CertificationCard`.

## Notes

- The issued state shows the programme badge image from /badges/<slug>/image.png on the live site, which this system does not carry, so the preview shows the checklist states; ShareCertificate shows the sharing row.
