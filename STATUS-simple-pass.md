# Simple-language pass (GLM-5.3)

**Date:** 2026-09-18 (PT)  
**Engine:** Z.ai GLM-5.3 via Anthropic-compatible `/v1/messages` (`/workspace/glm-engine`)  
**Scope:** Lesson bodies, curriculum titles/summaries, path step titles, lab titles/summaries/notes, homepage, ship checklist, lessons/labs index blurbs.  
**Not in scope:** 96 use-case gallery MD files; API shapes / endpoints / code samples left accurate to docs.typesafe.ai.

## Result

- **Commit SHA (copy rewrite):** `5246ccf74aafb52464a7af1d1989066bb9c15c2d`
- **Tip of main:** `5c597a067cd44b6e20c217155bbc653d598e8dc3`
- `npm run build` passes
- Pushed to `main` on `Btheriot83/jev-academy`
- Copy rewritten with short sentences, everyday words, and one analogy per lesson

## Files changed

- `src/lib/lesson-bodies.ts`
- `src/lib/curriculum.ts`
- `src/lib/labs.ts`
- `src/app/page.tsx`
- `src/app/ship/page.tsx`
- `src/app/lessons/page.tsx`
- `src/app/labs/page.tsx`
- `STATUS-simple-pass.md` (this file)

## Sample before / after (lesson `noul`)

### Before
**Title:** Noul  
**Summary:** P(yes) in [0,1]; optional true/false criteria; no confidence field.

```markdown
## Noul

A yes/no question. Returns **`noul`** ∈ [0, 1] as P(yes). Optional `criteria.true` / `criteria.false`.

**No `confidence` field** on Noul answers — use the probability and your own thresholds ([Noul](https://docs.typesafe.ai/primitives/noul.md), [CORE](https://docs.typesafe.ai/primitives.md)).

Tip: Noul 0.5 ≠ “medium skill” — that needs a **Score** with defined levels.

Open the [Noul lab](/labs/noul) for copy-paste curl + JS.

### Next
[Choice](/lessons/choice) → [Score](/lessons/score).
```

### After (GLM-5.3)
**Title:** Noul: yes or no questions  
**Summary:** Noul answers a yes/no question with a number from 0 to 1. Higher means more likely yes. Optional criteria fields let you define yes and no. There is no confidence field.

```markdown
## Noul

**Noul** asks a yes/no question.

The answer is **`noul`**, a number from 0 to 1. That number is the chance the answer is yes. 0 means definitely no. 1 means definitely yes.

It's like asking a friend for a gut check. They don't just say yes or no. They say, "I'm about 80% sure that's a yes."

You can add optional `criteria.true` and `criteria.false` fields. They spell out what counts as a yes and what counts as a no.

Noul answers have **no `confidence` field**. Use the probability itself, with thresholds you pick. ([Noul](https://docs.typesafe.ai/primitives/noul.md), [CORE](https://docs.typesafe.ai/primitives.md))

### Watch out

A Noul of 0.5 does not mean "medium skill". For graded levels like that, use **Score** with defined levels.

Open the [Noul lab](/labs/noul) for copy-paste curl and JS.

### Next

[Choice](/lessons/choice), then [Score](/lessons/score).
```

## Notes

- Code fences in lesson bodies were verified identical to pre-rewrite samples.
- No arrows in the rewritten prose files.
- No TypeSafe endorsement claims added; disclaimer retained on ship page.
- Rewrites produced by GLM-5.3 (not hand-invented as primary copy).
