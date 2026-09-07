# Project notes and decisions

Context for future sessions. Set up on **6 September 2026**.

---

## What this is

A photo portfolio for Pedro (photographer, **does not write code** — all
terminal, git and file work is done for him; anything that must happen in a
browser gets click-by-click instructions).

Live at **https://pedpuj.github.io/**

Session 1 was **setup only** (below). Session 2 built the design — see the
second half of this file.

---

## Decisions and why

### Repo type: user site, not a project repo

The repo is named `pedpuj.github.io`, which matches the GitHub username
`PedPuj`. GitHub treats that as a **user site** and serves it from the root of
the address.

- Chosen because it needs **no `base` path** in the config. A project repo
  would live at `/reponame/`, meaning every internal link and image path has to
  carry that prefix — a common and annoying source of "works locally, broken
  live" bugs — and the prefix has to be removed again when a custom domain is
  added.
- The repo was originally named `bedrofoto.github.io`, which would **not** have
  worked as a user site (the name must match the *username*, not the brand). It
  was renamed during this session. GitHub redirects the old name, and also
  **lowercased** it automatically — `PedPuj.github.io` became
  `pedpuj.github.io`. That's normal and harmless.

### Framework: Astro 7

Picked over Eleventy, mainly for **built-in image optimisation** — the single
most valuable feature for an image-heavy site, and the thing least worth
maintaining by hand. Astro's `<Image />` component generates responsive sizes
and modern formats (WebP/AVIF) from a full-size source, and emits correct
`width`/`height` so pages don't reflow while loading.

Also: zero JavaScript shipped by default, and content collections available
later to give galleries a typed, validated structure.

Trade-off accepted: a larger dependency tree than Eleventy, and occasional
migration work on major versions.

Template used: `minimal`. No integrations, no CSS framework, no UI library —
deliberately, per instruction to keep dependencies minimal. **186 packages
total, 0 vulnerabilities.**

The scaffold's `AGENTS.md` and `.vscode/` were dropped to keep the folder
legible for a non-developer.

### Deployment: GitHub Actions, hand-written workflow

`.github/workflows/deploy.yml` builds and publishes on every push to `main`,
plus a manual trigger from the Actions tab.

- Uses **only GitHub's own actions** (`checkout`, `setup-node`,
  `configure-pages`, `upload-pages-artifact`, `deploy-pages`) rather than the
  third-party `withastro/action`. Slightly more lines, but one less dependency
  to trust and much easier to debug.
- `npm ci` (not `npm install`) so builds are reproducible from
  `package-lock.json`.
- `concurrency: pages` with `cancel-in-progress: false` — two quick pushes both
  finish in order instead of one being cancelled mid-deploy.

**Gotcha hit during setup:** GitHub Pages defaulted to `build_type: legacy`
("deploy from a branch"), which would have published the raw source instead of
the built site. Switched to `workflow` via
`gh api -X PUT repos/PedPuj/pedpuj.github.io/pages -f build_type=workflow`.
Worth re-checking if deploys ever start serving the wrong thing.

There is currently **no test or lint step** in CI. Not needed yet; worth adding
if the site grows.

### Custom domain: planned as "maybe", set up to be painless

Nothing is configured yet, but nothing blocks it either. To add one later:

1. Change `site` in `astro.config.mjs` to the new address, e.g.
   `https://www.bedrofoto.com`. It's the only line that needs changing and is
   commented as such.
2. At the domain registrar, add a `CNAME` record for `www` pointing to
   `pedpuj.github.io`. (For a bare domain, `A` records to GitHub's four Pages
   IPs instead.)
3. In the repo: **Settings → Pages → Custom domain**, enter it, save, then tick
   **Enforce HTTPS** once the certificate is issued (can take up to 24h).
4. No `base` path to remove — that's the payoff of the user-site choice.

Because a user site serves from the root, the switch does not touch any
internal links.

---

## Environment as found

The Mac (M4, Apple Silicon) had **only git** — no Node, no npm, no `gh`, no
Homebrew. Installed this session via Homebrew:

| Tool | Version |
|---|---|
| Homebrew | 6.0.22 |
| Node | 26.8.1 |
| npm | 11.19.0 |
| gh | 2.100.0 |
| git | 2.50.1 (Apple, pre-existing) |

Homebrew was added to `PATH` via a new `~/.zprofile` (it did not exist before).
`gh` is authenticated as `PedPuj` with `repo`, `workflow`, `gist`, `read:org`
scopes — the `workflow` scope is required to push changes to
`.github/workflows/`.

**Note for future sessions:** anything launched outside an interactive login
shell may not inherit the Homebrew `PATH`. `.claude/launch.json` runs the dev
server through `/bin/zsh -lc` for exactly this reason. That file is gitignored —
it's local tooling, not part of the site.

CI pins Node 22 while local is Node 26. Both satisfy `engines: >=22.12.0`.
Worth aligning at some point, but not urgent.

---

## Deliberately not done

Not set up: analytics, sitemap, RSS, image licensing or watermarking, a contact
form. (No contact form is a design decision, not an omission — the handoff
forbids one.)


---

# Session 2 — the design, built

**6 September 2026.** Built the six screens from the *Bedro design system
canvas* handoff (`Bedro.dc.html` + `README.md`, produced in Claude Design).
The handoff is high-fidelity and prescriptive: colours, type, spacing,
transition durations and interaction states were all specified exactly, and it
states that where the prototype and its README disagree, the README wins. Built
to the README.

The placeholder homepage from session 1 was replaced wholesale, as planned.

## What got built

Six routes: `/`, `/work`, `/work/[series]`, `/loose`, `/frame/[id]`, `/about`.
54 pages at build time.

Design tokens live as CSS custom properties on `:root` in
`src/styles/global.css`; ground colour and series accent are set per page as
inline custom properties on `<html>` by `Base.astro`, which is what lets the
Japan pages shift ground to `#FBFAF7` and drain the accent hue to `#8C877E`
without a second stylesheet.

## Decisions and why

### Plain TypeScript data, not content collections

The handoff suggests Astro content collections (`src/content/series/*.md` plus a
frames file). Used a single hand-authored `src/data/frames.ts` instead, with
`src/data/catalog.ts` deriving ids, neighbours, metadata strings and resolved
images from it.

Reason: **the person maintaining this file does not write code.** Three series
and one loose dump do not need a validated collection API; they need one list
that reads top-to-bottom in the order the photographs appear, with a comment
block explaining each field. Splitting it across markdown frontmatter and a
separate frames file would have meant editing two files to add one photograph.

The handoff's real requirement — "series ordering is the *edit*, it is authored,
never sorted" — is honoured either way. Nothing is sorted at any point.

Frame counts (`24 FRAMES` etc. in the handoff) are **derived from the list
length**, not hard-coded, so the site can never claim a frame count it doesn't
have. Until real photographs are added, the counts read 10 / 12 / 10.

### Images: missing files are a designed state, not an error

Every photograph is resolved through `import.meta.glob` over `src/images/`. If
the file named in `frames.ts` isn't on disk, the frame renders as the flat
`#EAE6DE` block from the handoff's loading-state spec, at the correct aspect
ratio, reserving exactly the space the photograph will take. In `astro dev` only,
it also prints the slot description and the missing path.

This means the whole sequence can be laid out before a single file exists, and
adding a photograph never reflows the page.

### Sizing: width is derived from the height cap, not the other way round

The handoff's rule is a single **78vh maximum height** so horizontals and
verticals read as equal objects. The obvious CSS for that —
`max-height: 78vh; width: auto; height: auto` — is a **trap**: author `width`
and `height` declarations override the presentational hints that Astro's
`<Image />` width/height attributes provide, so an unloaded image measures 0×0
and the whole page reflows as photographs arrive. This was hit and fixed during
the build.

Instead each frame's wrapper is sized
`width: min(100%, calc(var(--max-h) * <aspect ratio> + <mount chrome>))` with the
image at `width: 100%; height: auto`. The ratio is read from the real file at
build time (falling back to the declared orientation when there is no file yet).
Definite width plus the intrinsic ratio means the box is correct before the
bytes arrive.

Side-by-side pairs use the same idea: `flex: <aspect ratio>` on each item and a
container capped at `calc((r1 + r2) * 56vh + gutter)`. Widths in proportion to
the ratios means the two photographs are **always exactly the same height**,
which is what the handoff asks for and what a fixed height per image cannot
guarantee. On mobile the pair container becomes `display: contents`, so the two
frames drop into the parent stack as ordinary siblings and inherit its spacing —
one photograph per screen, as specified, with no duplicate markup.

### Interactions: three small scripts, no framework

`client:*` directives need a UI framework; plain `<script>` tags do not, and
nothing here needs one.

1. **Frame counter** — IntersectionObserver at `rootMargin: -50% 0px -50% 0px`,
   so the count changes as a photograph crosses the vertical centre.
2. **Nav underline** — measured from the active link's `offsetLeft`/`offsetWidth`
   and re-measured on `document.fonts.ready` (the handoff warns that a font swap
   after paint would visibly shift it) and on resize. The nav carries
   `transition:persist`, so the underline is the *same DOM node* across a
   navigation and genuinely slides between items over 200ms rather than fading.
   Two persist keys (`nav-paper`, `nav-photo`) keep the homepage's white-on-photo
   nav from persisting onto a paper page.
   Because the node persists, the active item is recomputed from
   `location.pathname` rather than read from markup — the markup would be stale.
3. **Lightbox** — keyboard (←/→/Escape), swipe (left/right between frames, down
   to close) and the 3-second idle fade. Navigation goes through Astro's
   `navigate()` so each frame stays a real, shareable URL with correct
   back-button behaviour.

The paper→`#141210` cross-dissolve and the thumbnail→frame morph are view
transitions, not hand-written animation: `transition:name={frame.id}` on both the
Loose thumbnail and the lightbox image.

**One knowing deviation:** the handoff asks for 300ms on lightbox open/close and
250ms on frame-to-frame. Both are the same root cross-dissolve, and the duration
is set once in CSS, so both are **300ms**. Splitting them would have meant
hand-rolling what the view-transition API does for free. It is a cross-dissolve,
never a slide, which is the part that matters.

### Series photographs link to the full-screen view

The handoff only says the Loose thumbnails open `/frame/[id]`, but it also
specifies that the lightbox counter uses the *series* accent — so series frames
have to be reachable. Made the photographs themselves the link. This adds no
visible UI: no caption, no icon, no hover effect on the image, nothing over the
photograph. The series page still reads as a sequence and nothing else.

### Fonts from the CDN, not self-hosted (yet)

The handoff says self-host Switzer and IBM Plex Mono as woff2 in `public/fonts`.
They are currently loaded from Fontshare and Google Fonts with `preconnect` and
`display=swap`.

The stated reason for self-hosting was that a font swap after paint would shift
the measured nav underline — that is solved directly instead, by re-measuring on
`document.fonts.ready`. Self-hosting remains worth doing (privacy, one less
third party, no flash of fallback) and needs downloading four woff2 files into
`public/fonts` and swapping the two `<link>` tags in `Base.astro` for
`@font-face` rules. Not done because downloading assets wasn't authorised in
this session.

### Series accent vs. Japan

The series data carries both `accent` (null for Japan) and `counterColor`.
Components use `counterColor` — for Workers and China it is the accent, for Japan
it is `#8C877E`. That is the handoff's "colour drains out of the interface"
rule expressed once, in data, rather than as a conditional in every component.

The token table says the accent is used for the series title on its own page;
the screen spec for that same title says `#1A1815`. Followed the screen spec,
which is the more specific of the two.

## Verified in the browser

Ground colours, counter colours per series, 25vh frame separation, 120px above
the first frame, 140px before the next-series line, the 5-column loose grid, the
About grid, lightbox chrome and metadata, mobile at 375px, the sliding underline
across a real navigation, keyboard navigation and the idle fade.

Verification used generated placeholder images so the layout could be measured
with real intrinsic dimensions. **Those were deleted afterwards** — no fake
photographs are committed. `src/images/*/.gitkeep` keeps the six folders in git.

## Still open

- Real photographs. Every frame is a grey block until then.
- `hello@bedro.com` and the Instagram link in `src/data/site.ts` are the
  handoff's placeholders and are almost certainly wrong.
- Self-hosting the fonts (above).
- The frame counts in the handoff (24 / 38 / 31) describe a bigger edit than the
  10 / 12 / 10 currently listed. Add lines to `frames.ts` as photographs arrive;
  the counts follow automatically.


---

# Session 3 — the China edit

**6 September 2026.** First real photographs on the site: 37 frames from
`~/Documents/Photography/Portfolio/China`, imported as the China series.

## What the files turned out to be

Not what the design mock assumed. The handoff's sample metadata line was
`CANON EOS 500 · 50MM F/1.4 · KODAK PORTRA 400 · GUILIN, 2026` for every frame.
The actual folder is:

| Source | Count | EXIF |
|---|---|---|
| Fujifilm X-T5, XF 50mm f/2 | 14 | full |
| Fujifilm X-T5, XF 27mm f/2.8 | 18 | full |
| iPhone 15 Pro Max | 1 | full |
| Film scans (`Pedro Pujol_00xx`, Lightroom, 240dpi, 3:2) | 4 | **none** |

So a single global camera line would have been a lie on 36 of 37 frames. Added
an optional per-frame `gear` field that overrides `site.camera`, and a `film`
field that is simply omitted for digital frames. The metadata line composes from
whichever parts exist, so a digital frame reads
`FUJIFILM X-T5 · XF 27MM F/2.8 · GUILIN, 2026` with no film stock invented.

Camera, lens and aperture came from Spotlight metadata (`mdls`), not from
guesswork. Dates came from `kMDItemContentCreationDate`.

## The sequence

Chronological, which for a trip is also the narrative: Beijing (12) → Xi'an (11)
→ Guilin (7) → Hangzhou (5) → Shanghai (2). Every frame was looked at before
being placed; the order is not filename order.

Five pairs, chosen where two frames genuinely rhyme rather than to fill space —
the two Summer Palace lake views, two Forbidden City verticals, the stall and
the prayer ribbons, the dashboard flowers and the slippers on the millstone, the
two West Lake boats.

Cover is `dscf2433.jpg` (Forbidden City roofs over the red wall) — it crops well
to the 7-column band and its red sits next to the series accent `#9E2B25`
without fighting it.

`places` on the series is now the real itinerary, so the mono line reads
`BEIJING, XI'AN, GUILIN, HANGZHOU, SHANGHAI — 2026 — 37 FRAMES`. The count is
derived, as before.

## Filenames

Kept the camera's own stems, lowercased: `dscf2327.jpg`, `img6469.jpg`. The film
scans were renamed `film-0015.jpg` etc. (the originals had a space and capitals
in the name). Keeping the stem means any frame on the site can be traced back to
the raw file in Lightroom.

## Guessed, and needs confirming

Flagged to Pedro rather than presented as fact:

- The four film scans have no EXIF at all. Their camera line falls back to
  `site.camera` (`CANON EOS 500 · 50MM F/1.4`) and their stock is the placeholder
  `COLOUR NEGATIVE`.
- Locations were read off the pictures. Beijing, Xi'an and Guilin are certain
  (Seventeen-Arch Bridge, terracotta pit, Muslim Quarter signage, Li River
  karst). **Hangzhou and Shanghai are inference from dates and subject**, and the
  film frames' locations are the least certain of all.
- Sources are 2048px on the long edge, which is modest for the full-screen view.
  Fine at the sizes used; worth re-exporting larger if a frame is ever printed
  or wanted full-bleed.

## Size

`dist` is now 88MB (198 generated WebP renditions from 37 sources). Well within
GitHub Pages limits, but worth watching once Workers and Japan are filled in.

---

# The China layout — chapters and the margin rail (7 Sep 2026)

## What was wrong

/work/china was 37 frames in one uniform centred column: every photograph capped
at 78vh, 25vh of paper between each, 32 screens of scrolling, and the only
variation in the whole page was the five side-by-side pairs. Three specific
faults:

1. **The journey was invisible.** The edit runs Beijing → Xi'an → Guilin →
   Hangzhou → Shanghai and `frames.ts` already had comment dividers for it. The
   page named all five cities once, in the header, and then never again.
2. **`001 / 37` was the only orientation.** No shape to the whole, no way to
   move around inside it.
3. **The accent red `#9E2B25` barely appeared** — a 12px counter and two hover
   rules, on a series whose subject is saturated with that colour.

## What was built

### Chapters, derived rather than declared

`SeriesInput` gained an optional `chapters` record keyed by the `place` already
written on every frame. Frames sharing a place, consecutively, become a chapter.
Nothing is indexed by position, so re-ordering the edit re-orders the journey
with no other edit — which matters, because re-ordering the edit is the single
thing Pedro does most.

Rejected: a `chapter: 'Beijing'` field on the frame that opens each one (two
sources of truth for the same fact, and it goes stale on the first re-order),
and deriving chapters from `place` unconditionally (Japan's three cities
interleave every other frame, which would have produced ten chapters for ten
photographs).

Each chapter is drawn as a hairline across the full measure, the city's
characters at up to 150px in a 26% tint of the series accent, the Latin name
under them, and the frame range pushed to the far edge of the measure. Type only
— nothing is ever drawn over a photograph, which is the same rule the hover
frame-number already follows.

### The rail

A fixed spine in the left margin: one mark per frame, 15px wide for a landscape
and 8px for a portrait, so the rail literally draws the shape of the edit.
Gathered into five clusters, one per city. The current frame's mark takes the
accent and reaches further out; the city you are in lifts out of the hairline.
Every mark is a real `<a>` to a real anchor, so it works with JavaScript off;
with it, the click centres the frame instead of dropping it under the header.

City names are set **vertically** (`writing-mode: vertical-rl`) and appear on
hover. They started horizontal and had to move: at 11px they ran from x=49 to
x=100, and a width-limited photograph starts at x=64, so a hovered label sat on
top of the picture. Vertical keeps them inside the 64px margin at every window
size. The gap between clusters is 20px rather than the 8px pitch because a short
cluster's name, stood on its end, is taller than the cluster itself — Hangzhou's
five marks are 40px and its name is 50px.

Hidden below 1025px wide or 620px tall: there is no margin to stand in.

### The paper

Each city shifts `--ground` a few units and cross-fades over 900ms — Beijing
greyer (winter, haze, snow), Xi'an warmer (brick, food), Guilin greener (river),
Shanghai warmest (lanterns). All within ~6 units of the base `#F5F2EC`. Meant to
be felt on a long scroll, not noticed.

### The counter

Now reads `BEIJING · 004 / 37`. Only on a series that has chapters — Japan was
briefly showing `KYOTO · 004 / 10` and flickering city names every other frame,
which is why the place is gated on the chapter set rather than on `place`
existing.

## The bug worth remembering

The counter was driven purely by an IntersectionObserver with a
`-50% 0px -50% 0px` root margin, i.e. it only ever hears about what *crosses*
the middle of the screen. Anything that arrives somewhere without scrolling past
— a rail click, a `/work/china/#f24` link, a restored reading position on the
way back from a full-screen view — left it reading whatever it read before.
Jumping to the Guilin chapter gave `GUILIN · 001 / 37`.

Fixed with a `sync()` that just looks at what is nearest the centre of the
screen, run on load, again 400ms later once the photographs have taken their
real heights, and 120ms after scrolling settles. The observer still does the
live updating; `sync()` only corrects it.

## Known, not fixed

Holding or hammering the arrow keys advances one frame, not one per press: each
press measures "where you are" from the current scroll position, which during a
`behavior: 'smooth'` animation has not arrived yet. Pre-existing, unchanged by
this work, and invisible at a reading pace — three paced presses step three
pages correctly. Fixing it means tracking a target index rather than reading the
scroll position.

## Not built

Two other directions were considered and set aside:

- **Asymmetric editorial grid** — frames pushed off-centre, some full-bleed,
  spreads changing shape the way a photobook's do. The strongest answer to the
  monotony, but it needs a decision per photograph from Pedro, and derived
  automatically it would read as a template.
- **Contact-sheet overture** — open the series with all 37 as thumbnails, then
  run the sequence full size. Very photographer-native; rejected for now only
  because it puts type and grid before the first photograph.
