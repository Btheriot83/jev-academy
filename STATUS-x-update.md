# Jev Academy — X gallery update

**Shipped:** 2026-09-19 PT  
**Repo:** https://github.com/Btheriot83/jev-academy (`main`)  
**Build:** `npm run build` succeeded (190 static routes)

## Counts
| Metric | Value |
|--------|------:|
| Harvest posts in `_x-harvest-2026-09-19.json` | 25 |
| Already present (skipped as dup) | 1 |
| **New X-cited entries this pass** | **24** |
| Total X-cited | 64 |
| Other public (GitHub / directories) | 4 |
| Open source flagged | 24 |
| Docs-sourced (unchanged body set) | 91 |
| **Total gallery ideas** | **159** |

## What changed
- Merged `_x-harvest-2026-09-19.json` (25 unique posts, 13 marked OSS in harvest).
- De-duped by X status ID against existing `UC-*.md` / `catalog.json`.
- Skipped 1 already-present: OpenAgents Rust Jev SDK port (`UC-130` / `2101096899755266306`).
- Verified all 24 new statuses via `api.fxtwitter.com` (0× 404).
- Added UC-136 … UC-159; rebuilt `INDEX.md` + `catalog.json` (X first, OSS within X first).
- Synced into `site/content/use-cases/`; Open source badge behavior unchanged.

## Sample titles (new / OSS-forward)
- Jev Tweet Radar Chrome extension
- CUA-S1-FORMS specialist / CUA-S1 open-source release
- Realtime brain scanner
- NotHotDog multimodal decision app
- Stateful Jev / Jev One
- Verdict OSS-Jev benchmark update
- Laya open-source System One alternative
- Jev practice speed harness
- Kalshi trading lab
- Classifier.dev over Jev for routing and RAG filters

## Commit
- SHA: 

## Notes
- Public sources only; no fabricated URLs/quotes; no endorsement claim; no API keys.
- `user-X` `search_posts_all` still client-forbidden; fxtwitter used for verification only.
