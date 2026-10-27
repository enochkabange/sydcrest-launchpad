# Security policy

## Reporting a vulnerability

Please report security problems privately through GitHub: **Security → Report a
vulnerability** on this repository. Do not open a public issue. We aim to reply
within 7 days.

## How secrets are kept out of this public repository

- Secrets live only in GitHub Actions secrets, Vercel and Supabase, never in code.
- Every commit runs `secretlint` on staged files (pre-commit hook), and every pull
  request runs `gitleaks` in CI. `pnpm secrets` scans the whole tree.
- Deploys run only from merged pull requests; workflows never expose secrets to
  pull requests from forks.
