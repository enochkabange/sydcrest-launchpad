#!/usr/bin/env bash
# Starts the local Supabase stack in CI without depending on registry limits.
# 1. Loads images from the GitHub Actions cache when a previous run saved them.
# 2. Otherwise pulls: authenticated ghcr.io first, then AWS ECR Public.
# 3. After a cold start, saves the images so later runs pull nothing.
# Usage: scripts/ci/supabase-start.sh -x studio,mailpit,...
set -uo pipefail

CACHE_DIR="${SUPABASE_IMAGE_CACHE:-/tmp/supabase-image-cache}"
mkdir -p "$CACHE_DIR"
registries=(ghcr.io ghcr.io public.ecr.aws public.ecr.aws)

if [ -f "$CACHE_DIR/images.tar" ]; then
  echo "Loading Supabase images from the cache"
  docker load -i "$CACHE_DIR/images.tar" >/dev/null && cached=1
  grep -q pg_prove "$CACHE_DIR/registry.images" 2>/dev/null || refresh_cache=1
  if [ -f "$CACHE_DIR/registry" ]; then
    registries=("$(cat "$CACHE_DIR/registry")" "${registries[@]}")
  fi
fi

if [ -n "${GITHUB_TOKEN:-}" ]; then
  echo "$GITHUB_TOKEN" | docker login ghcr.io -u "${GITHUB_ACTOR:-github-actions}" --password-stdin >/dev/null 2>&1 \
    && echo "Logged in to ghcr.io" || echo "ghcr.io login failed; pulling anonymously"
fi

for registry in "${registries[@]}"; do
  export SUPABASE_INTERNAL_IMAGE_REGISTRY="$registry"
  if supabase start "$@"; then
    # Later steps (type generation) pull more images; keep them on the registry that worked.
    [ -n "${GITHUB_ENV:-}" ] && echo "SUPABASE_INTERNAL_IMAGE_REGISTRY=$registry" >> "$GITHUB_ENV"
    # supabase test db pulls pg_prove later in the job; fetch it now so it is cached too.
    docker image inspect "$registry/supabase/pg_prove:3.36" >/dev/null 2>&1 || docker pull -q "$registry/supabase/pg_prove:3.36" >/dev/null 2>&1 || true
    if [ -z "${cached:-}" ] || [ -n "${refresh_cache:-}" ]; then
      echo "Saving Supabase images for later runs"
      docker images --format '{{.Repository}}:{{.Tag}}' | grep "^$registry/supabase/" \
        | tee "$CACHE_DIR/registry.images" | xargs docker save -o "$CACHE_DIR/images.tar" && echo "$registry" > "$CACHE_DIR/registry"
    fi
    exit 0
  fi
  echo "supabase start failed using $registry; retrying in 45s"
  supabase stop --no-backup >/dev/null 2>&1 || true
  sleep 45
done
echo "supabase start failed on every registry" >&2
exit 1
