#!/usr/bin/env bash
# Starts the local Supabase stack in CI without failing on registry throttling.
# Authenticated pulls from ghcr.io get far higher limits than anonymous ones,
# and if ghcr.io still refuses, the same images are pulled from AWS ECR Public.
# Usage: scripts/ci/supabase-start.sh -x studio,mailpit,...
set -uo pipefail

if [ -n "${GITHUB_TOKEN:-}" ]; then
  echo "$GITHUB_TOKEN" | docker login ghcr.io -u "${GITHUB_ACTOR:-github-actions}" --password-stdin >/dev/null 2>&1 \
    && echo "Logged in to ghcr.io" || echo "ghcr.io login failed; pulling anonymously"
fi

for registry in ghcr.io ghcr.io public.ecr.aws public.ecr.aws; do
  export SUPABASE_INTERNAL_IMAGE_REGISTRY="$registry"
  if supabase start "$@"; then
    # Later steps (type generation) pull more images; keep them on the registry that worked.
    [ -n "${GITHUB_ENV:-}" ] && echo "SUPABASE_INTERNAL_IMAGE_REGISTRY=$registry" >> "$GITHUB_ENV"
    exit 0
  fi
  echo "supabase start failed using $registry; retrying in 30s"
  supabase stop --no-backup >/dev/null 2>&1 || true
  sleep 30
done
echo "supabase start failed on every registry" >&2
exit 1
