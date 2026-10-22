---
name: Virginia · Paid social creative
description: Paid social creative presented as measured cases, each ad beside its own proof.
colors:
  white: "#ffffff"
  paper: "#fafafa"
  mist: "#f2f2f2"
  hairline: "#e6e6e6"
  rule-strong: "#cfcfcf"
  pewter: "#a6a6a6"
  graphite-muted: "#636363"
  graphite: "#333333"
  ink: "#111111"
  chartreuse: "#a6c23f"
typography:
  display:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.375rem, 1.5rem + 2.4vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.5rem + 1.8vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.05rem + 0.6vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body-lg:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
  metric:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "tnum"
rounded:
  thumb: "4px"
  control: "10px"
  inset: "12px"
  screen: "14px"
  panel: "18px"
  card: "20px"
  stage: "28px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "28px"
  2xl: "40px"
  gutter: "clamp(20px, 4vw, 40px)"
  page-max: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "46px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "46px"
  button-ghost-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  button-ghost-compact:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 14px"
    height: "38px"
  tag:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 10px"
    height: "26px"
  play-control:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 12px 0 10px"
    height: "32px"
  case-card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "12px"
  case-index:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.panel}"
  screen-frame:
    backgroundColor: "{colors.mist}"
    rounded: "{rounded.screen}"
---

# Design System: Virginia · Paid social creative

## Overview

**Creative North Star: "The Measured Showroom"**

A monochrome product-marketing world (catalog id `digital-design-canon-monochrome-product-marketing`) where each ad is treated like a product on a plinth: a 9:16 screen set on a soft radial ground, with its proof in a hairline-ruled panel beside it. The interface itself is gray from #fafafa paper to #111 ink; every saturated pixel on the page belongs to the creatives. Satoshi in two weights carries everything in sentence case, and numbers are always tabular.

Density is calm and even. Cases sit in an equal two-column grid with no hero case, so the eye compares like with like. Depth is quiet and physical: white surfaces lifted by a one-pixel ring and a long, low ambient shadow, and gray grounds lit from above by radial gradients. A single chartreuse accent marks the moments that matter (the primary action, the account-average marker, the case you navigated to) and nothing else.

**Key Characteristics:**
- Neutral-only chrome; color comes from the work.
- Creatives framed as 9:16 screens on radial light grounds.
- Hairline-ruled metric panels with tabular numerals and parenthetical deltas.
- Ghost buttons by default; one solid ink primary with a chartreuse dot.
- Ring-plus-ambient shadows instead of borders on lifted surfaces.
- Soft rise-in motion on a long ease-out curve.

## Colors

A ten-step neutral scale with one restrained yellow-green signal.

### Primary
- **Signal Chartreuse** (chartreuse): the system's only hue. Used as the hollow-then-filled dot inside the primary button, the marker beside the account-average delta in the reading key, and the tag dot on a case card reached from the index (`:target`). When it glows, it uses a 3px halo at 22% opacity of itself.

### Neutral
- **White** (white): lifted surfaces: case cards, the case index, tags, ghost-button hover fill.
- **Paper** (paper): page background; text on ink; index header row and row hover fill.
- **Mist** (mist): radial-ground base, screen placeholder fill, the faintest row divider inside the index.
- **Hairline** (hairline): every structural rule: panel rows, section borders, footer rule, the 1px ring around cards.
- **Strong Rule** (rule-strong): ghost-button and tag borders; scrollbar thumb.
- **Pewter** (pewter): tiny taxonomy separator dots only.
- **Muted Graphite** (graphite-muted): secondary text: decks, nav links, metric labels, deltas, footer.
- **Graphite** (graphite): default body text.
- **Ink** (ink): headings, metric values, primary button fill, focus ring, selection background.

### Named Rules
**The Work Is The Color Rule.** The interface never introduces a hue of its own beyond chartreuse. Saturated color on a page must come from an ad creative.

**The Four Signals Rule.** Chartreuse appears only as a small dot or marker, never as a fill, text color, or background panel, and only where it marks action, benchmark, or arrival.

## Typography

**Display Font:** Satoshi (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Satoshi, same family
**Label/Mono Font:** none; tabular numerals (`font-variant-numeric: tabular-nums`) stand in for mono on figures.

**Character:** One geometric grotesk in Regular 400 and Medium 500, self-hosted. Large sizes tighten hard (-0.02em to -0.035em) and balance their wraps; small sizes stay at normal tracking.

### Hierarchy
- **Display** (500, clamp 38–56px, 1.04): the hero headline only.
- **Headline** (500, clamp 32–48px, 1.05): section titles. The closing card's title sits between headline and title (clamp 28–40px, 1.08, -0.03em).
- **Title** (500, clamp 20–24px, 1.15): case names.
- **Body Large** (400, 18px, 1.55): hero deck and section intros, capped at 44–52ch, in muted graphite.
- **Body** (400, 16px, 1.55): default copy.
- **Body Small** (400, 14px, 1.5): index rows, taxonomy, reading-key definitions, nav CTA.
- **Label** (500, 13px): tags, play control, metric labels (at 400), footer, deltas.
- **Metric** (500, 16px, tabular): metric values in panels; the delta follows in parentheses at 13px/400 muted.

### Named Rules
**The Two Weights Rule.** Only 400 and 500 exist. Hierarchy comes from size, tracking, and the ink-versus-muted color split, never from bold.

**The Sentence Case Rule.** Headings, buttons, tags, and table heads are sentence case. No uppercase labels, no letter-spaced small caps.

**The Tabular Figures Rule.** Every number that can be compared (metrics, deltas, days, counts) is set in tabular numerals.

## Layout

A centered column of `min(100% - 2 × gutter, 1240px)` with a fluid gutter (20–40px). The top bar is 84px tall: wordmark left, text links and a compact ghost button right. The hero is a 5:6 two-column grid (copy left, case-index stage right) that collapses to one column at 1080px. A full-width reading-key strip follows, ruled top and bottom in hairline, split 3:9 with its three items separated by vertical hairlines. Cases sit in an equal two-column grid with a 20px gap, collapsing to one column at 1080px; each case card is itself a 42%/58% split of screen and proof that stacks below 560px. Section padding is fluid (roughly 80–136px above the case section). Nav links hide below 760px. Breakpoints are 1080px, 760px, and 560px.

## Elevation & Depth

Hybrid: tonal radial grounds for stages, plus a ring-and-ambient shadow vocabulary for white surfaces. Lifted surfaces never use a CSS border; a 1px hairline-colored spread shadow draws the edge, and a long negative-spread shadow gives lift. Grounds are lit from above with a white radial highlight falling to mist or #e2–#e9 gray.

### Shadow Vocabulary
- **Ring** (`box-shadow: 0 0 0 1px var(--n-2)`): the edge of any lifted white surface or ground card.
- **Card rest** (`box-shadow: 0 0 0 1px var(--n-2), 0 1px 2px rgb(17 17 17 / 0.04)`): case cards at rest.
- **Card arrived** (`box-shadow: 0 0 0 1px var(--n-7), 0 18px 40px -20px rgb(17 17 17 / 0.3)`): a case card reached via its anchor.
- **Stage float** (`box-shadow: 0 0 0 1px var(--n-2), 0 2px 4px rgb(17 17 17 / 0.03), 0 32px 64px -32px rgb(17 17 17 / 0.28)`): the case index floating on its stage.
- **Screen** (`box-shadow: 0 0 0 1px rgb(17 17 17 / 0.08), 0 1px 2px rgb(17 17 17 / 0.06), 0 12px 32px -12px rgb(17 17 17 / 0.28)`): the 9:16 creative frame.
- **Signal halo** (`box-shadow: 0 0 0 3px rgb(166 194 63 / 0.22)`): around a chartreuse marker.

### Named Rules
**The Ring Not Border Rule.** Lifted surfaces are edged with a 1px spread shadow, not a border. Borders are reserved for controls (buttons, tags) and structural rules.

**The Lit Ground Rule.** A creative or a showcase panel sits on a radial gradient that is brightest near the top, never on a flat fill.

## Shapes

Soft, nested rounding that grows with container size: 4px thumbnails, 10px controls, 12px inset grounds, 14px screens, 18px index panel, 20px cards, 28px hero stage, and full pills for tags and the play control. Nested radii step down inward (20px card holding a 12px ground holding a 14px screen at reduced width). Small circles (3px separators, 6px tag dots, 8px markers, 12px button dot) are the only ornament. Empty media use a fine 135° hatch over mist.

## Components

### Buttons
Quiet, physical, and few.
- **Shape:** gently rounded rectangle (10px), 46px tall, 20px horizontal padding, 15px Medium label, 10px gap to an inline SVG icon.
- **Primary:** ink fill, paper text, ink border, with a 12px hollow chartreuse ring before the label. One per view region (hero and closing card).
- **Ghost (default):** transparent with a strong-rule border and ink text; trailing 14px arrow.
- **Hover / Focus:** ghost fills white and its border darkens to ink; primary deepens to pure black and its dot fills chartreuse. Icons nudge 2px along their direction. Press shifts down 1px. Transitions are 160ms on the ease-out curve. Focus is a 2px ink outline offset 3px.
- **Compact ghost:** 38px tall, 14px padding, 14px label, used in the top bar.

### Chips
- **Style:** the type tag: white pill, strong-rule border, 26px tall, 13px Medium ink label, led by a 6px dot.
- **State:** a conversion tag has a solid ink dot; a hook tag has a hollow ink ring. On an arrived case the dot turns chartreuse with its halo.

### Cards / Containers
- **Case card:** white, 20px corners, 12px padding, ring-plus-faint-shadow at rest. Left: a lit ground (12px radius) holding the screen. Right: name, tag and taxonomy row (middle-dot separators in pewter), then a metric panel pinned to the bottom.
- **Arrived state:** on `:target` the ring turns ink and a long ambient shadow lifts it (240ms).
- **Closing card:** shares the grid cell size, uses a lit gray ground with a ring, bottom-aligned title, body, and primary button.

### Navigation
- **Style:** 84px bar inside the page column. Wordmark is an inline SVG mark plus 18px Medium "Virginia". Links are 15px muted graphite, ink on hover (140ms). A compact ghost button closes the row. Below 760px the links hide and only the wordmark and CTA remain.

### Metric Panel (signature)
A definition list of rows divided by top hairlines with 10px vertical padding. Label left in 13px muted graphite; value right in 16px Medium ink with tabular numerals, followed by the account-relative delta in parentheses at 13px Regular muted. Days on air closes every panel.

### Case Index (signature)
A white panel (18px, stage-float shadow) on a 28px lit stage. A caption bar (title and type counts), a 36px paper header row in 12px muted text, then one 64px row per case: 27×48 thumbnail (4px radius, ring), name, type, lead result with delta, days. Rows are anchors to their case card, hover to paper. Below 560px it reduces to name with type and days beneath, and result right-aligned.

### Screen (signature)
The 9:16 frame every creative lives in: 14px radius, mist base, screen shadow, `object-fit: cover`. Video screens carry a frosted paper pill play control bottom-left (32px, 13px Medium, scales to 0.97 on press) that disappears once playing. A missing creative shows a hatched mist field with an outline image icon and "Creative not on file".

### Motion
Everything eases on `cubic-bezier(0.16, 1, 0.3, 1)`. Cards rise 24px and fade in as they enter the viewport (opacity 700ms, transform 900ms), alternating 0 and 90ms delays. Reduced motion disables the rise and smooth scrolling.

## Do's and Don'ts

### Do:
- **Do** keep chrome on the neutral scale (#fafafa paper to #111 ink) and let creatives supply color.
- **Do** frame every creative as a 9:16 screen on a top-lit radial ground.
- **Do** set every comparable number in tabular numerals, with account-relative deltas in parentheses at a smaller, muted size.
- **Do** edge lifted white surfaces with a 1px hairline ring shadow and give lift with a long negative-spread ambient shadow.
- **Do** default to ghost buttons; reserve the solid ink button with its chartreuse dot for the contact action.
- **Do** give peer cases equal size and weight in an even grid.

### Don't:
- **Don't** use chartreuse as a fill, text color, or surface; it is a dot or marker only.
- **Don't** introduce weights beyond 400 and 500, or uppercase, letter-spaced labels.
- **Don't** single out one case with a larger card or hero treatment when cases are peers.
- **Don't** place a creative on a flat fill or without its screen frame.
- **Don't** add hues to UI chrome (colored badges, tinted panels, gradient text).
