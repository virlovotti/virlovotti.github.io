# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro, static output suitable for GitHub Pages (`virlovotti.github.io`).

## Users

**Primary:** Employers and recruiters evaluating Virginia as a performance-focused paid social creative.

**Situation:** They are scanning proof of craft and outcomes—hook strength, conversion efficiency, segment-aware messaging—not just aesthetics.

**Job:** Quickly understand what Virginia has shipped, how it performed, and whether she is a strong hire or partner for performance creative work.

**Secondary (future):** Other portfolio visitors as additional case studies are added; structure should scale to multiple cases without rewriting the product story.

## Product Purpose

A web portfolio that presents Virginia’s paid social work as evidence-backed case studies. Success means a hiring evaluator can grasp her approach, see real ad artifacts and metrics, and leave with confidence in her performance creative ability—starting with Dr. Woof as the first featured case.

## Positioning

Case studies lead with **account-relative performance** (ROAS, CPA, CTR, hook rate, days on air) and **creative taxonomy** (segment · angle · awareness), not generic “campaign recap” prose. The site treats ads as measurable products: conversion winners and scroll-stopping hooks are distinct card types with rules for what to show and what to omit (e.g. no spend/revenue on the Dr. Woof surface).

## Operating Context

- **Deploy:** GitHub Pages from this repository.
- **Content workflow:** Case data and designer notes live in repo content (e.g. `content/ads.md`); media in `public/ads/`.
- **First case:** Dr. Woof ads portfolio (dated Oct 19, 2026 in source notes), authored as @Virginia.
- **Evaluation scene:** Desktop-first review is likely; mobile should remain readable for link sharing.

## Capabilities and Constraints

**Confirmed (Dr. Woof case):**

- Two card types: **conversion** (five ads, priority-ordered; “The Sign” is headline) and **hook** (scroll-stop focus, visible “Hook” label).
- Metrics display rules: percentages in parentheses vs account average; days on air only (no date ranges); hide spend and revenue.
- “The Sign” includes secondary line: ROAS 3.91 on its first day (smaller than primary metrics).
- Assets include static images and video (`.jpg`, `.png`, `.mp4`, `.mov`) under `public/ads/`.

**Product scope:**

- Multi-case portfolio over time; Dr. Woof is the first featured case, not the only planned surface.

**Undecided / open:**

- Contact or application CTA pattern (email, LinkedIn, form).
- Additional cases, ordering, and navigation IA beyond “first case + room to grow.”
- Analytics or privacy policy for the public site.

## Brand Commitments

- **Identity:** Virginia; handle @Virginia in case copy.
- **Repository / URL:** `virlovotti.github.io`.
- **Voice (inferred from source brief):** Direct, metrics-literate, designer-to-designer clarity in internal notes; public copy should stay factual and proof-led (confirm tone in later copy passes).

## Evidence on Hand

| Asset                                             | Path                           |
| ------------------------------------------------- | ------------------------------ |
| Dr. Woof case copy, metrics tables, display rules | `content/ads.md`               |
| Ad creatives (image/video)                        | `public/ads/`                  |
| Layout reference (visual intent)                  | `content/layout-reference.png` |

**Do not fabricate:** client testimonials, logos beyond what is provided, revenue/spend figures, or performance numbers not present in `content/ads.md`.

## Product Principles

1. **Proof before polish** — Lead with measurable outcomes and labeled creative strategy; decoration supports comprehension.
2. **Honest metrics** — Show only agreed fields; respect omissions (spend/revenue) and relative benchmarks as documented.
3. **Two jobs of an ad** — Separate conversion proof from hook proof; never collapse hook cards into conversion framing.
4. **Portfolio scales** — First case sets patterns (card types, metric grammar) that later cases can reuse.
5. **Employer scan path** — Optimize for fast evaluation: headline case, priority order, scannable labels and numbers.

## Accessibility & Inclusion

No product-specific accessibility standard confirmed yet. Future builds should meet baseline WCAG for text, contrast, and media alternatives (alt text / transcripts for video hooks where feasible).
