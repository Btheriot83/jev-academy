# Jev Academy — X gallery update

**Shipped:** 2026-09-19 PT  
**Repo:** https://github.com/Btheriot83/jev-academy (`main`)  
**Build:** `npm run build` succeeded (166 static routes)

## Counts
| Metric | Value |
|--------|------:|
| New X-cited entries this pass | 35 |
| Total X-cited | 40 |
| Other public (GitHub / directories) | 4 |
| Open source flagged | 12 |
| Docs-sourced (unchanged body set) | 91 |
| **Total gallery ideas** | **135** |

## What changed
- Merged `_browser-harvest.json` (~36 posts): verified each status via `api.fxtwitter.com`; skipped 1× 404 (`elberacasa`) and 1× idea-dup of UC-002 (`51bodila` jev-trader).
- Added known OSS projects after `gh`/`WebFetch` verification:
  - `browser-use/jev-ultrafast` (X: @gregpr07)
  - `jkudish/jev-browser` (GitHub + systemonemodels.org)
  - `w3cj/jev-chat`
  - `dabit3/jev-experiments`
  - `mkotlikov/jev-grug`
- Gallery UI: minimal **Open source** badge + X / Public source badges; sort = X first (OSS within X first), then other, then docs.
- `_x-harvest-2026-09-19.json` did **not** appear during this pass (nothing extra to merge).

## Sample titles (new / OSS-forward)
- Open-source Jev Ultrafast browser agent
- Open-source jev-chat command bar (no text generation)
- Open-source Jev Browser (MCP/CLI + Playwright)
- Open-source jev-experiments (~20 latency demos)
- Open-source jev-grug Choice word tournament chat
- Open-source Rust port of Jev SDKs
- Open-source unkillable Mario (Jev + microsandbox)
- Fast context compaction scoring (ecosystem roundup)
- Parallel support-ticket questions vs sequential LLM
- Multilingual family-assistant routing

## Commit
- SHA: `2346b58ca9a6657f8ea57e5deba8bc4e5d7dbd97`

## Notes
- Public sources only; no fabricated URLs/quotes; no endorsement claim; no API keys.
- `user-X` `search_posts_all` still client-forbidden; fxtwitter used for verification only.
