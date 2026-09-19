---
id: "UC-001"
title: "Remote browser agent loop (Stagehand + Jev)"
summary: "Observe a page, send the a11y tree as state with actions as questions; Jev picks the next operation/targets, Stagehand executes\u2014~$0.001 per task at near-instant speed."
category: "routing"
primitives:
  - "choice"
  - "noul"
  - "score"
source: "x"
source_urls:
  - "https://x.com/kylejeong/status/2100622054945095934"
date: "2026-09-17"
docs_related:
  - "https://docs.typesafe.ai/patterns/confidence-routing.md"
---

# Remote browser agent loop (Stagehand + Jev)

Observe a page, send the a11y tree as state with actions as questions; Jev picks the next operation/targets, Stagehand executes—~$0.001 per task at near-instant speed.

**Category:** `routing`  
**Primitives:** `choice`, `noul`, `score`  
**Source type:** `x`
  
**Date:** 2026-09-17

## Citations
- https://x.com/kylejeong/status/2100622054945095934

## Related docs
- https://docs.typesafe.ai/patterns/confidence-routing.md
