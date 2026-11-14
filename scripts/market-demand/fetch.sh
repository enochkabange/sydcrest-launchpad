#!/bin/bash
# SydCrest remote-jobs snapshot fetcher. Rerun weekly (never more than a few times a day:
# Remotive asks max 4 calls/day, Jobicy max one sync pass/hour, Himalayas data refreshes daily).
# Public APIs/feeds only, no keys, no sign-ups. Raw output is untrusted data: parse with python3 -I.
# Usage: bash fetch.sh [RAWDIR]
set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
RAW="${1:-$HERE/raw/$(date +%Y-%m-%d)}"
mkdir -p "$RAW"
UA="SydCrest-research/0.1 (one-off desk research; low volume)"
get(){ # out url
  curl -sS -A "$UA" -m 60 --retry 2 --retry-delay 5 -o "$RAW/$1" -w "$1 %{http_code} %{size_download}\n" "$2"
  sleep "${PAUSE:-2}"
}
jget(){ python3 -I -c 'import json,sys
try:
  d=json.load(open(sys.argv[1])); v=d
  for k in sys.argv[2].split("."): v=v.get(k) if isinstance(v,dict) else None
  print(v if v is not None else "")
except Exception: print("")' "$1" "$2"; }
enc(){ python3 -I -c 'import sys,urllib.parse;print(urllib.parse.quote(sys.argv[1],safe=""))' "$1"; }

# 1. Remotive (whole public feed, 1 call)
get remotive_all.json "https://remotive.com/api/remote-jobs"

# 2. Remote OK (whole public feed, 1 call)
get remoteok.json "https://remoteok.com/api"

# 3. Arbeitnow (paginated, 300/page; Europe-centric ATS feed)
for p in 1 2 3 4 5 6 7 8 9 10; do
  get "arbeitnow_p$p.json" "https://www.arbeitnow.com/api/job-board-api?page=$p"
  n=$(jget "$RAW/arbeitnow_p$p.json" "links.next"); [ -z "$n" ] && break
done

# 4. Himalayas search API (20/page), keyword queries per track, capped pages
PAUSE=3
i=0
for q in "data analyst" "analytics analyst" "business intelligence analyst" "reporting analyst" \
         "digital marketing" "marketing specialist" "marketing coordinator" "marketing assistant" "seo" "social media" "performance marketing" "content marketing" "growth marketing" "paid media" \
         "frontend developer" "front end developer" "frontend engineer" "react developer" "web developer"; do
  qe=$(enc "$q"); slug=$(echo "$q" | tr ' ' '_')
  for sort in recent relevant; do
    pre="himalayas_${slug}"; [ "$sort" = "relevant" ] && pre="himalayas_rel_${slug}"
    for page in 1 2 3 4 5; do
      get "${pre}_p$page.json" "https://himalayas.app/jobs/api/search?q=$qe&sort=$sort&page=$page"
      c=$(python3 -I -c 'import json,sys
try: print(len(json.load(open(sys.argv[1])).get("jobs") or []))
except Exception: print(0)' "$RAW/${pre}_p$page.json")
      [ "$c" -lt 20 ] && break
    done
  done
done

# 4b. Himalayas Ghana-open pool (board-native filter: country=GH includes worldwide roles open to GH)
#     plus page-1 totalCount for GH-only (exclude_worldwide) and unfiltered, per query
for q in "data analyst" "digital marketing" "marketing" "front end" "frontend developer" "react developer"; do
  qe=$(enc "$q"); slug=$(echo "$q" | tr ' ' '_')
  get "hgh_${slug}_GHonly.json" "https://himalayas.app/jobs/api/search?q=$qe&country=GH&exclude_worldwide=true"
  get "hgh_${slug}_all.json" "https://himalayas.app/jobs/api/search?q=$qe"
  for page in $(seq 1 20); do
    get "hgh_${slug}_GH_p$page.json" "https://himalayas.app/jobs/api/search?q=$qe&country=GH&page=$page"
    c=$(python3 -I -c 'import json,sys
try: print(len(json.load(open(sys.argv[1])).get("jobs") or []))
except Exception: print(0)' "$RAW/hgh_${slug}_GH_p$page.json")
    [ "$c" -lt 20 ] && break
  done
done

# 5. Jobicy (last 7 days, full cursor walk, 200/page, sequential = one sync pass)
PAUSE=2
if [ -z "${SKIP_JOBICY:-}" ]; then
get jobicy_p1.json "https://jobicy.com/api/jobs?count=200"
p=1
while :; do
  cur=$(jget "$RAW/jobicy_p$p.json" "nextCursor"); [ -z "$cur" ] || [ "$cur" = "None" ] && break
  p=$((p+1)); [ $p -gt 30 ] && break
  get "jobicy_p$p.json" "https://jobicy.com/api/jobs?count=200&cursor=$(enc "$cur")"
done
fi

# 6. We Work Remotely RSS (category feeds + main feed)
for f in remote-jobs remote-front-end-programming-jobs remote-full-stack-programming-jobs remote-programming-jobs remote-back-end-programming-jobs remote-sales-and-marketing-jobs remote-management-and-finance-jobs all-other-remote-jobs; do
  if [ "$f" = "remote-jobs" ]; then get "wwr_$f.rss" "https://weworkremotely.com/remote-jobs.rss"
  else get "wwr_$f.rss" "https://weworkremotely.com/categories/$f.rss"; fi
done

# 7. FX rates (ECB reference rates via Frankfurter, base USD)
get fx_usd.json "https://api.frankfurter.dev/v1/latest?base=USD"
echo "done -> $RAW"
