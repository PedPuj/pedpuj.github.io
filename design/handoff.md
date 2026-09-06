# Handoff: Bedro — photography portfolio

## Overview

Bedro is a personal portfolio for a street, documentary and analogue photographer working
mostly on film. It is not a client-acquisition site. Its audience is other photographers
and the photographer himself. It should read as a working archive kept by someone with
taste: warm, printed, quiet around the photographs, lightly funny in the writing and
labelling.

The site has six screens: homepage, series index (`Work`), series page, full-screen photo
view, `Loose`, and `About`. Three curated series (Workers, China, Japan) plus one loose
dump. Series pages are strictly sequential — one photograph at a time, like turning pages
in a book. **The only grid on the entire site is the Loose page.**

Reference points: Japanese photobook design, Daido Moriyama, Cartier-Bresson, Vivian
Maier, contact sheets and darkroom paperwork. Not a Squarespace template, not a glossy
agency site, not a design-award experiment.

## About the design files

The files in this bundle are **design references created in HTML** — a prototype showing
intended look and behaviour, not production code to copy directly.

`Bedro.dc.html` is a single canvas containing every artboard side by side (desktop 1440
and mobile 390 for each screen), plus an interaction-states board. It is **not** a
site — it is the spec, drawn.

The task is to **build these designs as an Astro site** using Astro's own patterns:
`.astro` components, content collections for series and frames, `astro:assets` for
images, `<ClientRouter />` for view transitions, and small client islands only where an
interaction genuinely needs JS. Do not port the prototype's React-ish logic class; it
exists only to make the artboards demonstrable.

Every photograph in the prototype is an empty `<image-slot>` placeholder. `image-slot.js`
is bundled only so the artboards render — **it has no place in the production site.**
Real photographs must be supplied by the photographer.

## Fidelity

**High-fidelity.** Colours, typography, spacing, grid, image treatment, transition
durations and interaction states are all final and specified exactly below. Build it
pixel-accurately. Where the prototype and this README disagree, this README wins.

---

## Design tokens

### Colour

| Token | Hex | Use |
|---|---|---|
| Paper | `#F5F2EC` | Warm bone. The default ground. |
| Paper (Japan) | `#FBFAF7` | Cooler, brighter near-white. Japan series pages only. |
| Ink | `#1A1815` | Warm near-black. All primary text. |
| Secondary ink | `#6B655C` | Metadata, inactive nav. |
| Hairline | `#DDD8CE` | Rules and borders. |
| Mount | `#FFFFFF` | Workers photo mount only. |
| Loading block | `#EAE6DE` | Empty image slot. Slightly darker than paper. |
| Lightbox ground | `#141210` | Full-screen photo view. |
| Lightbox metadata | `#8C877E` | Metadata + close mark on the lightbox. |

**Series accents — one per series.** Used *only* in: the frame counter, the active nav
underline, the series title on its own page, and the hover rule on the series index.
**Never on or over a photograph.**

| Series | Accent | Note |
|---|---|---|
| Workers | `#3A3733` | Warm graphite, no hue. It is black-and-white work; it earns the restraint. |
| China | `#9E2B25` | Deep vermilion. |
| Japan | *none* | No accent hue at all. Instead the page ground shifts to `#FBFAF7` and the counter and rules use `#8C877E`. Japan is the series where colour drains out of the interface. |

**Light mode only. Do not build a dark mode or a theme toggle.**

### Typography

Two families only.

**Switzer** (Fontshare) — wordmark, navigation, series titles, all running text.
Regular (400) and Medium (500) only. **Never bold, never black.**
`https://api.fontshare.com/v2/css?f[]=switzer@400,500&display=swap` — self-host the woff2
in production.

**IBM Plex Mono** (Google Fonts) — all metadata, frame counters, labels, years, locations
and captions. Always uppercase, `letter-spacing: 0.06em`, always at small sizes.

| Element | Desktop | Mobile |
|---|---|---|
| Wordmark | 15px Switzer Medium, ls `0.02em` | 14px |
| Nav | 13px Switzer Regular | 13px |
| Series title (index) | 34px Switzer Regular, lh 1.1 | 26px |
| Series title (page header) | 15px Switzer Regular | — (mobile header shows wordmark + counter only) |
| Body | 16px, lh 1.6, max measure 60ch | 16px, lh 1.6 |
| Mono labels | 11px, ls 0.06em, uppercase | 10–11px |
| Frame counter | 12px mono, ls 0.06em | 11px |

**All text is left-aligned.** Type is never centred, never justified. The only centring
anywhere is the photographs' own optical centring on the page. No all-caps headlines
(mono labels are a different thing — they are always caps).

### Grid and spacing

- **Desktop:** 1440px artboard, 12-column grid, **64px** outer margins, **24px** gutters.
  Column width at 1440 = `(1440 - 128 - 11×24) / 12 = 87.33px`.
- **Mobile:** 390px artboard, single column, **20px** outer margins.
- Spacing on an **8px** base.
- Be generous. The site should feel underfilled rather than packed. **Do not fill empty
  space. Emptiness is the design.**

### Image treatment

- All photographs sit at a consistent **maximum height of 78vh**, so horizontals and
  verticals read as equal objects on the page. **Never scaled to fill.**
- **Workers** (b&w): each photograph gets a **32px `#FFFFFF` mount** and a **1px
  `#DDD8CE` hairline border**, referencing Japanese photobook printing.
- **China and Japan** (colour): no border, no mount. The image sits directly on the paper.
- **Loose:** small thumbnails, no borders, tight grid.
- **No drop shadows. No rounded corners. No filters, overlays, gradients or vignettes over
  any photograph.** (`border-radius: 0` everywhere on the site.)

---

## Screens

### 1. Homepage — `/`

**Purpose:** one photograph, at full strength, and nothing else.

A single full-bleed photograph filling the entire viewport (`100vw × 100vh`,
`object-fit: cover`). Over it:

- Wordmark `Bedro`, top-left, `#F5F2EC`, 15px Switzer Medium ls `0.02em`. Desktop at
  `top: 34px; left: 64px`. Mobile `top: 26px; left: 20px`, 14px.
- Nav top-right, 13px, `#F5F2EC`, gap 30px desktop / 18px mobile. All three items at full
  paper colour here (no active state on the homepage).
- One mono line bottom-left: `SEVILLA, SPAIN — 35MM`. 11px desktop / 10px mobile,
  `#F5F2EC`, `bottom: 34px / 26px`.

**Nothing else.** No scroll indicator arrow, no headline, no button, no scroll-down
affordance of any kind.

Legibility scrim: a faint vertical gradient at **top and bottom only**, 180px tall
desktop / 140px mobile, `linear-gradient(180deg, rgba(0,0,0,0.25), transparent)` and its
mirror. **At most 25% opacity black.** `pointer-events: none`.

This is the *only* place on the site where text sits over a photograph.

### 2. Series index — `/work`

**Purpose:** choose a series. Three of them.

Bone paper. Fixed header (96px tall desktop / 72px mobile): wordmark left, nav right with
`Work` active.

Three full-width rows stacked vertically, separated by 1px `#DDD8CE` hairline rules
(`border-top` on each row, `border-bottom` on the last).

**Each desktop row:** `height: 540px` (≈60vh), 12-col grid, 24px gap, 64px padding,
`align-items: center`.
- Cover photograph: `grid-column: span 7`, `height: 392px`, `object-fit: cover`.
- Right block: `grid-column: 9 / span 4`, flex column, gap 14px:
  1. Series title, 34px Switzer Regular, `#1A1815`, lh 1.1
  2. The hover rule (1px, `width: 0`, series accent) — see interaction states
  3. Mono line, 11px, `#6B655C`, lh 1.7

**Mobile rows:** cover image full width (350px, `height: 233px`), then title 26px, then
the mono line, stacked, 16px gaps. 32px top / 40px bottom padding per row.

**Row content, verbatim:**

| Title | Mono line |
|---|---|
| Workers | `SEVILLA & ELSEWHERE — 2025 — 24 FRAMES` / `BLACK AND WHITE. PEOPLE AT WORK.` (two lines) |
| China | `BEIJING, XI'AN, SHANGHAI, GUILIN — 2026 — 38 FRAMES` |
| Japan | `TOKYO, OSAKA, KYOTO — 2025 — 31 FRAMES` |

The whole row is the click target and goes to that series page.

### 3. Series page — `/work/[series]`

**Purpose:** read the sequence, one frame at a time.

Persistent thin header, **72px** tall desktop / 64px mobile, `position: sticky; top: 0`,
background `rgba(245,242,236,0.92)` (or the Japan equivalent). **The header background
stays transparent** — no border, no shadow, no solid bar.

- Wordmark top-left (`left: 64px`)
- Series title centre-left, 15px Switzer Regular, `#1A1815`, 120px after the wordmark
- Frame counter top-right, 12px mono, **in the series accent**: `014 / 38`

Below: photographs stacked vertically, one per screen, **each separated by roughly 25vh of
empty paper** (225px at 900px viewport height). 120px paper above the first frame.
Photographs are horizontally centred, each at most 78vh tall.

**Occasionally two photographs sit side by side as a pair**, matched in height, 24px
gutter, to break the rhythm. In the prototype: frame 1 single (1000×660), frames 2–3 as a
pair (700×500 + 360×500), frame 4 single vertical (470×702).

**No captions in this view.** No thumbnail strip, no grid, no index. Series are sequential
only.

At the end of the sequence, one mono line, left-aligned at the margin, 140px below the
last frame: `NEXT SERIES — JAPAN · 31 FRAMES →`

**Mobile:** same sequence, one image per screen, ~180px separation; header collapses to
**wordmark and counter only** (no series title).

**Per-series treatment:**
- **Workers** — ground `#F5F2EC`; each photograph in a 32px `#FFFFFF` mount with a 1px
  `#DDD8CE` border; counter `#3A3733`.
- **China** — ground `#F5F2EC`; photographs bare on the paper; counter `#9E2B25`.
- **Japan** — ground `#FBFAF7`; photographs bare; counter and rules `#8C877E`; no accent
  hue anywhere.

### 4. Full-screen photo view (lightbox) — `/frame/[id]`

**Purpose:** one frame, its technical facts, and nothing competing.

Ground `#141210`. Photograph centred, **at most 88% of viewport height** (792px at 900px),
`object-fit: contain`.

Chrome:
- Close mark `✕`, 15px, `#8C877E`, top-right corner (`top: 26px; right: 32px`).
- Frame counter, 12px mono, series accent, immediately left of the close mark
  (`top: 28px; right: 76px`).
- One mono line at the bottom edge, 11px, **`#8C877E`**, left-aligned at
  `bottom: 34px; left: 64px`:
  `CANON EOS 500 · 50MM F/1.4 · KODAK PORTRA 400 · GUILIN, 2026`
- Left and right arrow affordances `‹` `›` at the edges, 22px,
  `rgba(245,242,236,0.28)` — deliberately low contrast, vertically centred, 28px inset.

**Metadata and chrome fade to invisible after three seconds of stillness** and return on
any cursor movement (opacity transition 300ms).

**Mobile:** same, chrome minimal (no arrows), image 350×520. Swipe left/right between
frames, swipe down to close.

**Sample metadata lines — vary them across frames:**

```
CANON EOS 500 · 50MM F/1.4 · KODAK PORTRA 400 · SHANGHAI, 2026
CANON EOS 500 · 50MM F/1.4 · LUCKY 200 · XI'AN, 2026
CANON EOS 500 · 50MM F/1.4 · KODAK GOLD 200 · TOKYO, 2025
CANON EOS 500 · 50MM F/1.4 · ILFORD HP5 PLUS 400 · SEVILLA, 2025
```

### 5. Loose — `/loose`

**Purpose:** everything that didn't make a series. Deliberately dense and unprecious, in
direct contrast to the series pages.

Bone paper. Header as elsewhere, `Loose` active.

One mono line above the grid, 40px of space beneath it:
`LOOSE — FRAMES THAT DIDN'T MAKE A SERIES`

Then a dense contact-sheet grid: **five columns desktop, three mobile, 8px gutters**,
reverse chronological. Thumbnails at 3:2 (`aspect-ratio: 3 / 2`, `object-fit: cover`);
column width at 1440 = `(1440 - 128 - 4×8) / 5 = 256px`.

**No titles, no captions, no metadata visible.** Clicking any thumbnail opens the
full-screen view.

This is the only grid on the site.

### 6. About and contact — `/about`

**Purpose:** who this is, what he shoots with, how to reach him.

Bone paper, **no accent colour anywhere on this page**. Header as elsewhere, `About`
active. 88px of paper below the header.

12-col grid, 24px gap, 64px margins:
- **Left:** `grid-column: span 4`, one photograph of the photographer, `height: 520px`,
  moderate size, not full-bleed. **No headshot in a circle.**
- **Right:** `grid-column: 6 / span 5`, `max-width: 60ch`, flex column, gap 32px:
  1. Paragraph 1, 16px, lh 1.6, `#1A1815`
  2. Paragraph 2, same
  3. Mono block, 11px, `#6B655C`, `line-height: 2`, `border-top: 1px solid #DDD8CE`,
     8px top padding
  4. Two text links, 16px, gap 24px

**Mobile:** stacked — photo full width (`height: 420px`), then text, mono block, links,
32px gaps, 48px above the photo.

**Copy — use this voice exactly, do not rewrite:**

> I just try to have fun with the camera and learn a bunch of stuff. I look like I'm
> serious, but really I don't know what to photograph apart from old people, like everyone
> else.

> Based in Sevilla. Mostly film, mostly street. I shoot in series because a single
> photograph rarely says enough on its own, and because I like the way a sequence forces
> me to make decisions.

**Contact block (mono, uppercase, three lines):**

```
CANON EOS 500 · 50MM F/1.4
PORTRA 400 / GOLD 200 / LUCKY 200 / HP5
HELLO@BEDRO.COM
```

Then two text links: **Instagram** and **Email**.

**No form. No map. No headshot in a circle.**

---

## Interactions and behaviour

| Interaction | Spec |
|---|---|
| **Nav default** | Inactive items `#6B655C`, 13px Switzer Regular. |
| **Nav hover** | Raises to full ink `#1A1815`. 150ms colour transition. Nothing else moves. |
| **Nav active** | A 1px underline in the current series accent that **slides horizontally between items over 200ms** (transition `left` and `width`, not a fade). Underline colour also transitions. |
| **Series index row hover** | The cover photograph lifts in brightness very slightly — `filter: brightness(1.04)`, 250ms — **and** a 1px rule in that series' accent draws from left to right beneath the title, `width: 0 → 100%` over 250ms. **No scaling, no shadow.** |
| **Series page scroll** | The frame counter increments as each photograph passes the **vertical centre** of the viewport (IntersectionObserver, `rootMargin: "-50% 0px -50% 0px"`). Header background stays transparent; the counter's accent is the only moving colour on screen. |
| **Lightbox open** | The paper ground **cross-dissolves** to `#141210` over 300ms while the thumbnail scales up into position. Closing reverses it. |
| **Lightbox navigation** | ← / → move between frames with a **250ms cross-dissolve, never a slide**. `Escape` closes. |
| **Lightbox idle** | Chrome fades to `opacity: 0` after 3s of no cursor movement, 300ms; returns on any movement. |
| **Loading state** | Each image slot holds a flat `#EAE6DE` block — **no spinner, no skeleton shimmer**. The photograph fades in over 400ms when ready. |
| **Mobile nav** | **No hamburger.** Three text items inline in the header at 13px. |
| **Mobile lightbox** | Swipe left/right between frames, swipe down to close. |

### Explicitly forbidden

No parallax. No scroll-jacking. No zoom-on-hover. No images that scale on scroll. No dark
mode, theme toggle or language switcher. No mailing-list signup, newsletter modal, cookie
banner, shop, pricing table, testimonials, client logos, awards row or blog. No accent
colour on or over a photograph. No thumbnail grid on series pages. No text over
photographs anywhere except the homepage hero. No drop shadows, rounded corners,
glassmorphism, gradients or blur effects. No typeface other than Switzer and IBM Plex
Mono. No bold weights.

---

## Astro implementation

### Suggested structure

```
src/
  content/
    config.ts               # collections: series, loose
    series/
      workers.md            # frontmatter below; body unused
      china.md
      japan.md
  data/
    frames.ts               # or per-series JSON — see shape below
  layouts/
    Base.astro              # <head>, fonts, <ClientRouter />, ground colour
  components/
    Wordmark.astro
    Nav.astro               # takes activeItem + accent
    SeriesHeader.astro      # sticky, wordmark + title + counter slot
    Frame.astro             # one photograph; variant="bare" | "mount"
    FramePair.astro
    MonoLine.astro
    FrameCounter.astro      # island: client:visible
    Lightbox.astro          # island: client:load
  pages/
    index.astro             # homepage
    work/index.astro        # series index
    work/[series].astro     # sequential series page
    loose.astro
    frame/[id].astro        # full-screen view as a real route
    about.astro
```

### Content shape

```ts
// series
{
  slug: "china",
  title: "China",
  monoLine: "BEIJING, XI'AN, SHANGHAI, GUILIN — 2026 — 38 FRAMES",
  frameCount: 38,
  accent: "#9E2B25" | null,      // null for Japan
  ground: "#F5F2EC" | "#FBFAF7",
  counterColor: "#9E2B25" | "#3A3733" | "#8C877E",
  treatment: "bare" | "mount",   // mount = Workers
  cover: <image>,
  next: "japan"
}

// frame
{
  id: "china-014",
  index: 14,
  series: "china",             // or null for loose
  image: <image>,              // astro:assets ImageMetadata
  orientation: "h" | "v",
  pairWith: "china-015" | null,
  metadata: "CANON EOS 500 · 50MM F/1.4 · KODAK PORTRA 400 · GUILIN, 2026"
}
```

Series ordering is the *edit* — it is authored, never sorted. Keep frame order explicit in
the collection, do not derive it from filenames or dates. Loose is the one exception:
reverse chronological.

### Astro specifics worth using

- **`<ClientRouter />`** with `transition:name={frame.id}` on both the Loose thumbnail and
  the lightbox image. That gives you the real thumbnail→frame morph and the 300ms
  paper→`#141210` cross-dissolve as a *page navigation*, so every frame is a real
  shareable URL with correct back-button behaviour, and almost none of it is JS you wrote.
  Use `transition:animate` with a fade for the ←/→ frame-to-frame move — never a slide.
- **`astro:assets` `<Image />`** for every photograph: it gives you intrinsic
  width/height, so the flat `#EAE6DE` block never reflows and the 400ms fade-in is honest
  rather than simulated. `loading="eager"` for the homepage hero and the first frame of
  each series; `lazy` for the rest.
- **`prefetch`** on series-index rows (`data-astro-prefetch="hover"`) so hovering a row
  warms the first frames of that series. The sequence should turn like paper.
- **Islands, small and few.** Only three interactions need client JS:
  1. `FrameCounter` — IntersectionObserver, `client:visible`
  2. `Lightbox` — keyboard + idle-fade + swipe, `client:load` (or skip it entirely if you
     go all-in on view-transition routes, in which case you only need the key handler and
     the idle timer)
  3. `Nav` underline — `client:idle`, or do it in pure CSS by measuring at build time
     since the three labels are fixed-width and known
  Everything else is static HTML.
- **Fonts:** self-host Switzer 400/500 and IBM Plex Mono 400 as woff2 in `public/fonts`
  with `font-display: swap` and `<link rel="preload">`. The nav underline measures text
  width, so a font swap after paint would visibly shift it.
- **`prefers-reduced-motion`:** drop the cross-dissolves to instant and disable the
  brightness lift. Keep the counter.

### Styling

The prototype uses inline styles because of how it was authored — **do not carry that
over.** Use scoped `<style>` in each `.astro` component (or Tailwind if the codebase
already does), with the tokens above as CSS custom properties on `:root`, and the series
ground/accent set per-page on the layout element.

---

## Assets

**None included.** Every photograph in the prototype is an empty drag-and-drop
placeholder, and `image-slot.js` exists purely to make the artboards demonstrable.

Real photographs must come from the photographer. What each slot needs is written inside
it — e.g. *"Workers cover — apron, wide horizontal, b&w"*, *"Market stall, Xi'an —
horizontal"*, *"Commuters, Osaka — colour, Gold 200"*.

Art direction for imagery: street and documentary photographs — people at work in aprons
and overalls, market stalls, older people on benches and in doorways, Chinese and Japanese
street scenes, shopfronts, transit, hands, weather. Grainy, film-like, imperfect. **No
stock-photo models, no drone shots, no landscapes without people, no long-exposure light
trails.**

Fonts: Switzer from [Fontshare](https://www.fontshare.com/fonts/switzer), IBM Plex Mono
from Google Fonts. Both free to self-host.

## Files in this bundle

| File | What it is |
|---|---|
| `README.md` | This document. Self-sufficient — build from this. |
| `Bedro.dc.html` | The design canvas. Open in a browser: every artboard, desktop and mobile, plus the interaction-states board. Reference only. |
| `image-slot.js` | Placeholder component the artboards depend on. **Not for production.** |

To see the live interactions in the prototype: hover the series-index rows (brightness
lift + accent rule) and click the nav items on the states board (sliding underline).
