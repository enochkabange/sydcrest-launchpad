#!/usr/bin/env python3
"""SydCrest demand and pay snapshot classifier.

Reads raw API/feed responses written by fetch.sh (untrusted data; run with `python3 -I`),
normalises postings, keeps the three SydCrest tracks, and classifies seniority,
location eligibility, Ghana eligibility and salary (annual USD).

Usage:
    python3 -I classify.py RAWDIR OUTDIR

Writes OUTDIR/jobs.csv (one row per in-track posting, for audit) and OUTDIR/summary.json,
and prints markdown tables. Rerun weekly against a fresh RAWDIR.
"""
import csv
import glob
import html
import json
import os
import re
import statistics
import sys
import xml.etree.ElementTree as ET

# ---------------------------------------------------------------- helpers

def strip_html(s):
    if not s:
        return ""
    s = re.sub(r"(?s)<(script|style)[^>]*>.*?</\1>", " ", s)
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", html.unescape(s)).strip()


def load_json(path):
    try:
        with open(path, encoding="utf-8", errors="replace") as f:
            return json.load(f)
    except Exception:
        return None


def num(x):
    try:
        v = float(x)
        return v if v > 0 else None
    except (TypeError, ValueError):
        return None


def rec(**kw):
    base = dict(source="", id="", url="", title="", company="", desc="", loc_text="",
                loc_list=None, tz=None, seniority_src="", sal_min=None, sal_max=None,
                currency=None, period=None, salary_text="", date="")
    base.update(kw)
    return base

# ---------------------------------------------------------------- loaders

def load_remotive(raw):
    out = []
    d = load_json(os.path.join(raw, "remotive_all.json")) or {}
    for j in d.get("jobs", []):
        out.append(rec(source="Remotive", id=str(j.get("id")), url=j.get("url", ""),
                       title=j.get("title", ""), company=j.get("company_name", ""),
                       desc=strip_html(j.get("description")),
                       loc_text=j.get("candidate_required_location") or "",
                       salary_text=j.get("salary") or "", date=j.get("publication_date", "")))
    return out


def load_remoteok(raw):
    out = []
    d = load_json(os.path.join(raw, "remoteok.json")) or []
    for j in d:
        if not isinstance(j, dict) or "position" not in j:
            continue  # first element is the legal notice
        out.append(rec(source="Remote OK", id=str(j.get("id")), url=j.get("url", ""),
                       title=j.get("position", ""), company=j.get("company", ""),
                       desc=strip_html(j.get("description")), loc_text=j.get("location") or "",
                       sal_min=num(j.get("salary_min")), sal_max=num(j.get("salary_max")),
                       currency="USD", period="annual", date=j.get("date", "")))
    return out


def load_arbeitnow(raw):
    out = []
    for p in sorted(glob.glob(os.path.join(raw, "arbeitnow_p*.json"))):
        d = load_json(p) or {}
        for j in d.get("data", []):
            if not j.get("remote"):
                continue  # remote only
            out.append(rec(source="Arbeitnow", id=j.get("slug", ""), url=j.get("url", ""),
                           title=j.get("title", ""), company=j.get("company_name", ""),
                           desc=strip_html(j.get("description")),
                           loc_text="Arbeitnow (Europe board): " + (j.get("location") or ""),
                           date=str(j.get("created_at", ""))))
    return out


def load_himalayas(raw):
    out = []
    for p in sorted(glob.glob(os.path.join(raw, "himalayas_*.json"))):
        d = load_json(p) or {}
        for j in d.get("jobs", []) or []:
            out.append(rec(source="Himalayas", id=j.get("guid", ""), url=j.get("guid", ""),
                           title=j.get("title", ""), company=j.get("companyName", ""),
                           desc=strip_html(j.get("description") or j.get("excerpt")),
                           loc_list=j.get("locationRestrictions") or [],
                           tz=j.get("timezoneRestrictions"),
                           seniority_src=",".join(j.get("seniority") or []),
                           sal_min=num(j.get("minSalary")), sal_max=num(j.get("maxSalary")),
                           currency=j.get("currency"), period=j.get("salaryPeriod") or "annual",
                           date=str(j.get("pubDate", ""))))
    return out


def load_jobicy(raw):
    out = []
    files = sorted(glob.glob(os.path.join(raw, "jobicy_p*.json")))
    for p in files:
        d = load_json(p) or {}
        for j in d.get("jobs", []) or []:
            geo = j.get("jobGeo")
            if isinstance(geo, list):
                geo = ", ".join(map(str, geo))
            lvl = j.get("jobLevel")
            if isinstance(lvl, list):
                lvl = ", ".join(map(str, lvl))
            out.append(rec(source="Jobicy", id=str(j.get("id")), url=j.get("url", ""),
                           title=html.unescape(j.get("jobTitle", "")), company=j.get("companyName", ""),
                           desc=strip_html(j.get("jobDescription") or j.get("jobExcerpt")),
                           loc_text=geo or "", seniority_src=lvl or "",
                           sal_min=num(j.get("salaryMin") or j.get("annualSalaryMin")),
                           sal_max=num(j.get("salaryMax") or j.get("annualSalaryMax")),
                           currency=j.get("salaryCurrency") or "USD",
                           period=j.get("salaryPeriod") or "annual", date=j.get("pubDate", "")))
    return out


def load_wwr(raw):
    out = []
    for p in sorted(glob.glob(os.path.join(raw, "wwr_*.rss"))):
        try:
            root = ET.parse(p).getroot()
        except Exception:
            continue
        for it in root.iter("item"):
            g = lambda t: (it.findtext(t) or "").strip()
            t = g("title")
            company, _, title = t.partition(": ")
            if not title:
                company, title = "", t
            out.append(rec(source="We Work Remotely", id=g("guid"), url=g("link"),
                           title=title, company=company, desc=strip_html(g("description")),
                           # region is the eligibility field; country/state are usually the employer HQ
                           loc_text=g("region"),
                           date=g("pubDate")))
    return out

# ---------------------------------------------------------------- tracks

TRACKS = {
    "Data Analyst": re.compile(
        r"\b(data|analytics|bi|business intelligence|reporting|insights?|product|marketing|"
        r"growth|sql|tableau|power ?bi|web|digital|operations data|commercial)\s+(analyst|analytics (specialist|associate))\b"
        r"|\bdata analytics?\b(?!.*engineer)|\banalytics (analyst|specialist|associate)\b|\bbi (developer|specialist)\b",
        re.I),
    "Digital Marketing": re.compile(
        r"\b(digital|performance|growth|content|email|lifecycle|crm|social media|paid (media|social|search)|"
        r"search engine|seo|sem|ppc|affiliate|influencer|community|brand|product|field|demand gen\w*|b2b|b2c|"
        r"partner|event)?\s*marketing\b|\bmarketer\b|\bseo\b|\bsem\b|\bppc\b|\bsocial media\b|"
        r"\bpaid (media|social|search)\b|\bmedia buyer\b|\bgrowth (hacker|manager|lead|specialist)\b|"
        r"\bcontent (strategist|specialist|creator)\b",
        re.I),
    "Frontend Developer": re.compile(
        r"\bfront[\s-]?end\b|\bfrontend\b|\breact(\.js|js)?\s+(native\s+)?(developer|engineer)\b|"
        r"\b(vue|angular|next\.?js|javascript|typescript|ui|web)\s+(developer|engineer)\b|\bwordpress developer\b|"
        r"\bshopify developer\b|\bwebflow developer\b",
        re.I),
}
TRACK_EXCLUDE = {
    # "marketing analyst" is counted under Data Analyst, not Digital Marketing
    "Digital Marketing": re.compile(r"\banalyst\b|\bengineer\b|\bdeveloper\b|\bsales (representative|executive|development)\b", re.I),
    "Frontend Developer": re.compile(r"\bback[\s-]?end\b(?!.*front)|\bfull[\s-]?stack\b", re.I),
    "Data Analyst": re.compile(r"\bdata engineer\b|\bscientist\b|\bsecurity\b|\bsoc analyst\b|\bfinancial analyst\b", re.I),
}


def track_of(title):
    for name, rx in TRACKS.items():
        if rx.search(title) and not TRACK_EXCLUDE[name].search(title):
            return name
    return None

# ---------------------------------------------------------------- seniority

JUNIOR_T = re.compile(r"\b(junior|jr\.?|entry[\s-]?level|entry|intern(ship)?|graduate|grad|trainee|apprentice(ship)?|"
                      r"working student|werkstudent|praktikum|praktikant\w*|assistant|associate|level (i|1)|i)\b(?!\s*-?\s*(ii|iii))",
                      re.I)
SENIOR_T = re.compile(r"\b(senior|sr\.?|lead|principal|staff|head|director|vp|vice president|chief|architect|"
                      r"expert|ii|iii|iv|level (ii|iii|2|3))\b", re.I)
YEARS = re.compile(r"(\d{1,2})\s*(?:\+|plus)?\s*(?:(?:-|–|to)\s*\d{1,2}\s*)?\+?\s*years?\s+(?:of\s+)?"
                   r"(?:\w+\s+){0,3}?(?:experience|exp\\b|in a|as a|working)", re.I)


def seniority_of(r):
    t = r["title"]
    if re.search(r"\bsenior associate\b", t, re.I):
        return "senior", "title"
    sen = SENIOR_T.search(t)
    jun = JUNIOR_T.search(t)
    # a bare roman "I" only counts at the end of the title (e.g. "Data Analyst I")
    if jun and jun.group(0).strip().lower() == "i" and not re.search(r"\bI\s*$", t):
        jun = None
    if sen and not jun:
        return "senior", "title"
    if jun and not sen:
        return "junior", "title"
    src = (r["seniority_src"] or "").lower()
    if src:
        if "entry" in src or "junior" in src or "intern" in src:
            return "junior", "board field"
        if any(k in src for k in ("senior", "director", "manager", "executive")):
            return "senior", "board field"
        if "mid" in src:
            return "mid", "board field"
    yrs = [int(m.group(1)) for m in YEARS.finditer(r["desc"][:6000]) if int(m.group(1)) <= 20]
    if yrs:
        y = min(yrs)
        if y <= 2:
            # never call a posting junior from years alone (too noisy); flag it instead
            return "mid", "<=2 yrs in text (junior?)"
        if y >= 5:
            return "senior", "years in text"
        return "mid", "years in text"
    return "mid", "default"

# ---------------------------------------------------------------- location

AFRICA = ["ghana", "nigeria", "kenya", "south africa", "egypt", "morocco", "rwanda", "uganda", "tanzania",
          "ethiopia", "senegal", "cote d'ivoire", "côte d'ivoire", "ivory coast", "cameroon", "tunisia", "zambia",
          "zimbabwe", "botswana", "mauritius", "algeria", "namibia", "malawi", "benin", "togo", "sierra leone",
          "liberia", "gambia", "mozambique", "angola", "burkina faso", "mali", "niger"]
EUROPE = ["united kingdom", "uk", "england", "scotland", "wales", "ireland", "germany", "france", "spain", "portugal",
          "italy", "netherlands", "belgium", "luxembourg", "switzerland", "austria", "poland", "czechia",
          "czech republic", "slovakia", "hungary", "romania", "bulgaria", "greece", "croatia", "slovenia",
          "serbia", "denmark", "sweden", "norway", "finland", "estonia", "latvia", "lithuania", "iceland",
          "malta", "cyprus", "europe", "eu", "eea", "ukraine", "bosnia", "albania", "north macedonia",
          "montenegro", "moldova", "armenia", "turkey", "türkiye"]
US = ["united states", "usa", "us", "u.s.", "america", "any state"]


def _has(text, words):
    return any(re.search(r"(?<![a-z])" + re.escape(w) + r"(?![a-z])", text) for w in words)


def loc_from_text(t):
    """Map a free-text location field to a category."""
    t = (t or "").lower().strip()
    if not t or t in ("remote", "remote job", "anywhere"):
        return "worldwide" if t == "anywhere" else "unclear"
    if re.search(r"anywhere in the world|worldwide|world ?wide|global(ly)?\b|anywhere\b|all countries", t):
        return "worldwide"
    if _has(t, ["ghana"]):
        return "africa"
    if re.search(r"\bafrica\b", t) or _has(t, AFRICA):
        if not re.search(r"emea", t):
            return "africa"
    if re.search(r"\bemea\b", t):
        return "emea"
    has_us = _has(t, US) or re.search(r"\b(usa only|us only|north america)\b", t)
    has_uk = _has(t, ["united kingdom", "uk", "england", "scotland", "wales", "london"])
    has_eu = _has(t, [w for w in EUROPE if w not in ("united kingdom", "uk", "england", "scotland", "wales")])
    other = re.search(r"latam|latin america|apac|asia|canada|australia|oceania|mexico|brazil|india|philippines|"
                      r"singapore|japan|new zealand|argentina|colombia|pakistan|south america", t)
    if has_us and not (has_uk or has_eu or other):
        return "us-only"
    if has_uk and not (has_us or has_eu or other):
        return "uk-only"
    if (has_eu or has_uk) and not (has_us or other):
        return "europe-only"
    if has_us or has_uk or has_eu or other:
        return "other-multi"
    if "arbeitnow" in t:
        return "europe-board-default"
    # a bare city / state name: treat as a country restriction we cannot place
    return "unclear"


GH_TZ = 0  # Ghana is UTC+0, no DST


def location_of(r):
    if r["source"] == "Himalayas":
        lst = [str(x).lower() for x in (r["loc_list"] or [])]
        tz = r["tz"]
        tz_ok = (not tz) or any(abs(float(x) - GH_TZ) < 0.01 for x in tz)
        if not lst:
            return ("worldwide" if tz_ok else "other-multi"), tz_ok
        if "ghana" in lst:
            return "africa", tz_ok
        cat = loc_from_text(", ".join(lst))
        if cat in ("unclear", "worldwide"):
            cat = "other-multi"  # an explicit country list without Ghana
        return cat, False
    if r["source"] == "Arbeitnow":
        cat = loc_from_text(r["loc_text"].split(":", 1)[-1])
        if cat == "unclear":
            cat = "europe-board-default"
    else:
        cat = loc_from_text(r["loc_text"])
    return cat, None


DESC_ANYWHERE = re.compile(r"work from anywhere|anywhere in the world|fully remote,? (worldwide|globally)|"
                           r"open to (candidates|applicants) (from )?(anywhere|worldwide|globally)|hire globally|"
                           r"location[- ]independent", re.I)
DESC_US_ONLY = re.compile(r"(authori[sz]ed|eligible|legally able) to work in the (u\.?s\.?|united states)|"
                          r"must (be )?(reside|based|located|live) in the (u\.?s\.?|united states)|"
                          r"u\.?s\.? (residents?|citizens?|based) only|us[- ]based candidates only", re.I)
DESC_UK_ONLY = re.compile(r"right to work in the uk|must be (based|located|living) in the uk|uk[- ]based only", re.I)
DESC_EU_ONLY = re.compile(r"(must be|based|located|reside) in (the )?(eu|europe|european union)\b|"
                          r"eu work (permit|authori[sz]ation)|right to work in (the )?(eu|europe)", re.I)
DESC_GHANA = re.compile(r"\bghana\b|\baccra\b|\bkumasi\b", re.I)
DESC_AFRICA = re.compile(r"\bafrica\b|\bafrican\b", re.I)


def eligibility(r):
    cat, tz_ok = location_of(r)
    d = r["desc"]
    flags = []
    if DESC_GHANA.search(d) or DESC_GHANA.search(r["loc_text"]) or "ghana" in [str(x).lower() for x in (r["loc_list"] or [])]:
        flags.append("ghana-mentioned")
    if DESC_AFRICA.search(d) or DESC_AFRICA.search(r["loc_text"]):
        flags.append("africa-mentioned")
    us = DESC_US_ONLY.search(d)
    uk = DESC_UK_ONLY.search(d)
    eu = DESC_EU_ONLY.search(d)
    if cat == "unclear" and r["source"] != "Himalayas":
        if us and not (uk or eu):
            cat = "us-only"
        elif uk and not (us or eu):
            cat = "uk-only"
        elif eu and not (us or uk):
            cat = "europe-only"
        elif DESC_ANYWHERE.search(d):
            cat = "worldwide"
    conflict = cat == "worldwide" and bool(us or uk or eu)
    if conflict:
        flags.append("worldwide-but-text-restricts")
    # Ghana eligibility
    if cat == "worldwide" and not conflict:
        # WWR "Anywhere in the World" is a self-declared board field that is often loose -> likely, not yes
        gh = "likely" if r["source"] == "We Work Remotely" else "yes"
    elif cat == "africa":
        # yes only if Ghana is named, or Africa as a whole is allowed; a list of other African countries = no
        if "ghana-mentioned" in flags and (r["source"] != "Himalayas" or tz_ok is not False or "ghana" in
                                           [str(x).lower() for x in (r["loc_list"] or [])]):
            gh = "yes"
        elif r["source"] != "Himalayas" and re.search(r"\bafrica\b", r["loc_text"], re.I):
            gh = "yes"
        else:
            gh = "no"
    elif cat == "emea":
        gh = "likely"
    elif cat == "worldwide" and conflict:
        gh = "check"
    elif cat == "unclear":
        gh = "unclear"
    else:
        gh = "no"
    return cat, gh, flags

# ---------------------------------------------------------------- salary

PER = {"annual": 1, "yearly": 1, "year": 1, "monthly": 12, "month": 12, "weekly": 52, "week": 52,
       "fortnightly": 26, "daily": 260, "day": 260, "hourly": 2080, "hour": 2080}


def parse_salary_text(s):
    """Parse strings like '$35,3k- $52k', '$14 - $20/hour', '70K-80K', '$3.5k–$5k/month'."""
    if not s:
        return None
    t = re.sub(r"(\d),(\d{3})\b", r"\1\2", s.lower()).replace(",", ".")
    if re.search(r"per task|per word|per article|equity only|ote", t):
        return None
    cur = "USD"
    if "€" in t or "eur" in t:
        cur = "EUR"
    elif "£" in t or "gbp" in t:
        cur = "GBP"
    period = "annual"
    if re.search(r"/\s*h|hour|hr\b", t):
        period = "hourly"
    elif re.search(r"month|/\s*mo\b", t):
        period = "monthly"
    vals = []
    for m in re.finditer(r"(\d+(?:\.\d+)?)\s*(k)?", t):
        v = float(m.group(1))
        if m.group(2):
            v *= 1000
        vals.append(v)
    vals = [v for v in vals if v > 0]
    if not vals:
        return None
    return min(vals), max(vals), cur, period


def salary_usd(r, fx):
    lo, hi, cur, period = r["sal_min"], r["sal_max"], r["currency"], r["period"]
    if lo is None and hi is None and r["salary_text"]:
        p = parse_salary_text(r["salary_text"])
        if p:
            lo, hi, cur, period = p
    if lo is None and hi is None:
        return None
    lo = lo or hi
    hi = hi or lo
    mult = PER.get(str(period or "annual").lower(), 1)
    cur = (cur or "USD").upper()
    if cur != "USD":
        rate = fx.get(cur)
        if not rate:
            return None
        lo, hi = lo / rate, hi / rate
    lo, hi = lo * mult, hi * mult
    if hi < 3000 or lo > 1_000_000:
        return None  # implausible / unit error
    return round(lo), round(hi), round((lo + hi) / 2)

# ---------------------------------------------------------------- stats


def pct(vals, q):
    if not vals:
        return None
    v = sorted(vals)
    if len(v) == 1:
        return v[0]
    k = (len(v) - 1) * q
    f = int(k)
    c = min(f + 1, len(v) - 1)
    return v[f] + (v[c] - v[f]) * (k - f)


def fmt(x):
    return "-" if x is None else f"${x/1000:,.0f}k"


def norm_key(r):
    t = re.sub(r"[^a-z0-9]+", " ", r["title"].lower()).strip()
    c = re.sub(r"[^a-z0-9]+", " ", (r["company"] or "").lower()).strip()
    return (t, c)


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    raw, outdir = sys.argv[1], sys.argv[2]
    os.makedirs(outdir, exist_ok=True)
    fxd = load_json(os.path.join(raw, "fx_usd.json")) or {}
    fx = fxd.get("rates", {})

    loaders = [load_himalayas, load_jobicy, load_remotive, load_remoteok, load_wwr, load_arbeitnow]
    allrecs, per_source_total = [], {}
    for L in loaders:
        rs = L(raw)
        if rs:
            per_source_total[rs[0]["source"]] = len({x["id"] for x in rs})
        allrecs += rs

    # dedupe: by source id first, then title+company across sources (keep first; Himalayas first
    # because it has structured location + salary fields)
    seen_id, seen_key, recs = set(), {}, []
    for r in allrecs:
        sid = (r["source"], r["id"])
        if sid in seen_id:
            continue
        seen_id.add(sid)
        k = norm_key(r)
        if k in seen_key:
            seen_key[k]["also_on"].add(r["source"])
            continue
        r["also_on"] = set()
        seen_key[k] = r
        recs.append(r)

    rows = []
    for r in recs:
        tr = track_of(r["title"])
        if not tr:
            continue
        sen, sen_basis = seniority_of(r)
        cat, gh, flags = eligibility(r)
        sal = salary_usd(r, fx)
        rows.append(dict(track=tr, source=r["source"], also_on=";".join(sorted(r["also_on"])),
                         title=r["title"], company=r["company"], url=r["url"], date=r["date"],
                         seniority=sen, seniority_basis=sen_basis, location=cat,
                         loc_raw=(r["loc_text"] or ", ".join(map(str, r["loc_list"] or [])) or "")[:120],
                         ghana=gh, flags=";".join(flags),
                         sal_lo=sal[0] if sal else "", sal_hi=sal[1] if sal else "",
                         sal_mid=sal[2] if sal else "",
                         sal_raw=(r["salary_text"] or (f"{r['sal_min']}-{r['sal_max']} {r['currency']} {r['period']}"
                                  if (r["sal_min"] or r["sal_max"]) else ""))))

    with open(os.path.join(outdir, "jobs.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()) if rows else ["track"])
        w.writeheader()
        w.writerows(rows)

    tracks = list(TRACKS)
    locs = ["worldwide", "africa", "emea", "europe-only", "europe-board-default", "uk-only", "us-only", "other-multi", "unclear"]
    summary = {"sources_total_unique_ids": per_source_total, "deduped_total": len(recs),
               "fx_date": fxd.get("date"), "tracks": {}}
    P = print
    P(f"# Snapshot from {raw}\n")
    P("Postings loaded per source (all roles, unique IDs):", per_source_total, "| after cross-source de-dup:", len(recs))
    P("\n## Counts by track and source\n")
    srcs = sorted({r["source"] for r in rows})
    P("| Track | " + " | ".join(srcs) + " | Total |")
    P("|---|" + "---|" * (len(srcs) + 1))
    for t in tracks:
        tr = [r for r in rows if r["track"] == t]
        P(f"| {t} | " + " | ".join(str(sum(1 for r in tr if r['source'] == s)) for s in srcs) + f" | {len(tr)} |")

    for t in tracks:
        tr = [r for r in rows if r["track"] == t]
        n = len(tr)
        s = {"n": n}
        P(f"\n## {t} (n={n})\n")
        if not n:
            continue
        P("| Seniority | n | share |\n|---|---|---|")
        for k in ("junior", "mid", "senior"):
            c = sum(1 for r in tr if r["seniority"] == k)
            s[f"sen_{k}"] = c
            P(f"| {k} | {c} | {c/n:.0%} |")
        P("\n| Location eligibility | n | share |\n|---|---|---|")
        for k in locs:
            c = sum(1 for r in tr if r["location"] == k)
            s[f"loc_{k}"] = c
            P(f"| {k} | {c} | {c/n:.0%} |")
        P("\n| Open to Ghana? | all | junior |\n|---|---|---|")
        jr = [r for r in tr if r["seniority"] == "junior"]
        for k in ("yes", "likely", "check", "unclear", "no"):
            c = sum(1 for r in tr if r["ghana"] == k)
            cj = sum(1 for r in jr if r["ghana"] == k)
            s[f"gh_{k}"] = c
            s[f"gh_{k}_junior"] = cj
            P(f"| {k} | {c} ({c/n:.0%}) | {cj} |")
        s["ghana_mentioned"] = sum(1 for r in tr if "ghana-mentioned" in r["flags"])
        s["africa_mentioned"] = sum(1 for r in tr if "africa-mentioned" in r["flags"])
        s["junior_and_ghana_yes_or_likely"] = sum(1 for r in jr if r["ghana"] in ("yes", "likely"))
        yrs_j = sum(1 for r in tr if r["seniority_basis"].startswith("<=2"))
        s["junior_upper_bound_incl_years"] = s["sen_junior"] + yrs_j
        P(f"\nJunior from title/board field: {s['sen_junior']}; plus {yrs_j} more 'mid' rows whose text asks <=2 years "
          f"(upper bound {s['sen_junior']+yrs_j}, {(s['sen_junior']+yrs_j)/n:.0%})")
        P(f"\nGhana named in posting: {s['ghana_mentioned']}; Africa named: {s['africa_mentioned']}; "
          f"junior AND open to Ghana (yes/likely): {s['junior_and_ghana_yes_or_likely']}")
        summary["tracks"][t] = s

    P("\n## Shares by source (all three tracks pooled)\n")
    P("| Source | n | junior | open to Ghana (yes/likely) | US-only |\n|---|---|---|---|---|")
    bys = {}
    for s_ in srcs:
        rr = [r for r in rows if r["source"] == s_]
        n_ = len(rr)
        j_ = sum(1 for r in rr if r["seniority"] == "junior")
        g_ = sum(1 for r in rr if r["ghana"] in ("yes", "likely"))
        u_ = sum(1 for r in rr if r["location"] == "us-only")
        bys[s_] = dict(n=n_, junior=j_, ghana=g_, us=u_)
        P(f"| {s_} | {n_} | {j_} ({j_/n_:.0%}) | {g_} ({g_/n_:.0%}) | {u_} ({u_/n_:.0%}) |")
    summary["by_source"] = bys
    P("\n## Pay (annual USD, midpoint of stated range)\n")
    P("| Track | Seniority | n with salary | p25 | median | p75 | min-max |\n|---|---|---|---|---|---|---|")
    pay = {}
    for t in tracks:
        for k in ("junior", "mid", "senior", "all"):
            v = [r["sal_mid"] for r in rows if r["track"] == t and r["sal_mid"] != ""
                 and (k == "all" or r["seniority"] == k)]
            pay[f"{t}|{k}"] = {"n": len(v), "p25": pct(v, .25), "median": pct(v, .5), "p75": pct(v, .75),
                               "min": min(v) if v else None, "max": max(v) if v else None}
            P(f"| {t} | {k} | {len(v)} | {fmt(pct(v,.25))} | {fmt(pct(v,.5))} | {fmt(pct(v,.75))} | "
              f"{fmt(min(v) if v else None)}-{fmt(max(v) if v else None)} |")
    P("\n## Pay, postings open to Ghana only (yes/likely)\n")
    P("| Track | n with salary | p25 | median | p75 |\n|---|---|---|---|---|")
    for t in tracks:
        v = [r["sal_mid"] for r in rows if r["track"] == t and r["sal_mid"] != "" and r["ghana"] in ("yes", "likely")]
        pay[f"{t}|ghana-open"] = {"n": len(v), "p25": pct(v, .25), "median": pct(v, .5), "p75": pct(v, .75)}
        P(f"| {t} | {len(v)} | {fmt(pct(v,.25))} | {fmt(pct(v,.5))} | {fmt(pct(v,.75))} |")
    summary["pay"] = pay

    # ---- Ghana-open pool: Himalayas search with country=GH (board's own eligibility rule)
    gh = []
    seen = set()
    totals = {}
    for p in sorted(glob.glob(os.path.join(raw, "hgh_*.json"))):
        d = load_json(p) or {}
        name = os.path.basename(p)
        if name.endswith("_p1.json") or not re.search(r"_p\d+\.json$", name):
            totals[name] = d.get("totalCount")
        if "_GH_p" not in name:
            continue
        for j in d.get("jobs", []) or []:
            if j.get("guid") in seen:
                continue
            seen.add(j.get("guid"))
            r = rec(source="Himalayas", id=j.get("guid", ""), url=j.get("guid", ""), title=j.get("title", ""),
                    company=j.get("companyName", ""), desc=strip_html(j.get("description") or j.get("excerpt")),
                    loc_list=j.get("locationRestrictions") or [], tz=j.get("timezoneRestrictions"),
                    seniority_src=",".join(j.get("seniority") or []), sal_min=num(j.get("minSalary")),
                    sal_max=num(j.get("maxSalary")), currency=j.get("currency"),
                    period=j.get("salaryPeriod") or "annual")
            tr = track_of(r["title"])
            if not tr:
                continue
            sen, basis = seniority_of(r)
            sal = salary_usd(r, fx)
            explicit = bool(r["loc_list"])
            gh.append(dict(track=tr, title=r["title"], company=r["company"], url=r["url"], seniority=sen,
                           seniority_basis=basis, explicit_country_list=explicit,
                           countries=", ".join(map(str, r["loc_list"]))[:200],
                           sal_mid=sal[2] if sal else ""))
    with open(os.path.join(outdir, "ghana_pool.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(gh[0].keys()) if gh else ["track"])
        w.writeheader()
        w.writerows(gh)
    P("\n## Himalayas totalCount per query (estimate, capped at 5000)\n")
    for k, v in totals.items():
        P(f"- {k}: {v}")
    P("\n## Ghana-open pool (Himalayas country=GH, in-track titles only)\n")
    P("| Track | n | junior | mid | senior | explicit country list incl. GH | with salary | median pay | p25-p75 |")
    P("|---|---|---|---|---|---|---|---|---|")
    ghs = {}
    for t in tracks:
        g = [x for x in gh if x["track"] == t]
        v = [x["sal_mid"] for x in g if x["sal_mid"] != ""]
        jn = sum(1 for x in g if x["seniority"] == "junior")
        md = sum(1 for x in g if x["seniority"] == "mid")
        sn = sum(1 for x in g if x["seniority"] == "senior")
        ex = sum(1 for x in g if x["explicit_country_list"])
        ghs[t] = dict(n=len(g), junior=jn, mid=md, senior=sn, explicit=ex, n_sal=len(v), median=pct(v, .5),
                      p25=pct(v, .25), p75=pct(v, .75))
        P(f"| {t} | {len(g)} | {jn} | {md} | {sn} | {ex} | {len(v)} | {fmt(pct(v,.5))} | {fmt(pct(v,.25))}-{fmt(pct(v,.75))} |")
    for t in tracks:
        for k in ("junior", "mid", "senior"):
            v = [x["sal_mid"] for x in gh if x["track"] == t and x["seniority"] == k and x["sal_mid"] != ""]
            ghs[t][f"pay_{k}"] = dict(n=len(v), median=pct(v, .5), p25=pct(v, .25), p75=pct(v, .75))
            P(f"  - {t} / {k}: n={len(v)} median {fmt(pct(v,.5))} (p25 {fmt(pct(v,.25))}, p75 {fmt(pct(v,.75))})")
    summary["ghana_pool"] = ghs
    summary["himalayas_totals"] = totals
    with open(os.path.join(outdir, "summary.json"), "w") as f:
        json.dump(summary, f, indent=1, default=str)


if __name__ == "__main__":
    main()
