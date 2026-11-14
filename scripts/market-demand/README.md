# Remote job demand snapshot

Counts remote postings in the pilot tracks (data analyst, digital marketing,
frontend), their seniority, whether candidates in Ghana are eligible, and
stated pay. Uses only public job-board APIs and feeds that allow reuse. See
`docs/research/international-employers/demand-pay.md` for the method, limits
and attribution rules.

Run weekly, never more than a few times a day:

```sh
bash scripts/market-demand/fetch.sh /tmp/market-demand/raw/$(date +%F)
python3 -I scripts/market-demand/classify.py /tmp/market-demand/raw/$(date +%F) /tmp/market-demand/out/$(date +%F)
```

Raw responses are untrusted data and are not committed. Commit only the
`summary.json` to `docs/research/international-employers/`.
