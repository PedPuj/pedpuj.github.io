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

Each chapter is one line: a hairline across the full measure, then the city in
its own script at 28px beside the name at 20px, with the frame range pushed to
the far edge. Type only — nothing is ever drawn over a photograph, which is the
same rule the hover frame-number already follows.

It started far bigger — the characters at up to 150px, name and range stacked
beneath — and Pedro cut it as too big and too disruptive. Small has a second
benefit that the big version could not have had: the chapter line now sits
directly above its city's first photograph and they share one screen, so
arriving somewhere new costs no screen of its own. That is what the `.opening`
wrapper is for, and why a photograph that opens a city is capped at 62vh
(46vh for a pair) rather than 78vh — the shorter frame leaves exactly enough
room above it for the line once the page has settled there.

### The margin — two attempts

**What is there now:** five words. The city names down the left margin, set on
their end (`writing-mode: vertical-rl`), 10px mono with wide tracking. The city
you are reading is `--ink`; the other four sit at 20% of it. Each is a real
`<a>` to a real anchor, so it works with JavaScript off; with it, the click
centres the frame instead of dropping it under the header. No line, no marks,
no ornament — the counter in the corner already says how far in you are, so the
margin only has to say where.

Positioned at `left: 23px` so the 17px column of type sits centred in the 64px
margin: as much paper between the names and a full-measure photograph (which
starts at exactly 64px) as there is to the page edge. Vertical, not horizontal,
for that reason — an 11px horizontal "HANGZHOU" runs to x=100 and sits on top
of the picture.

Hidden below 1025px wide or 620px tall: there is no margin to stand in.

**What was there first, and why it went:** a contact-sheet spine — one mark per
frame, 15px wide for a landscape and 8px for a portrait, so the rail drew the
shape of the edit, gathered into five clusters with the current frame's mark in
the accent. Pedro rejected it as too busy, and he was right: 37 marks is a lot
of furniture for a site whose whole character is restraint, and a tick-strip
reads as a widget bolted on rather than as part of the design. Worth remembering
if the impulse to visualise the sequence comes back — the information was
genuinely useful, the ornament was not.

Two other directions were offered at the same time and not taken: a single 1px
hairline broken into five segments proportional to each city's frame count,
filling with the accent as you read; and a full-width hairline under the sticky
header with four notches for the cities (the only one that would also have
worked on a phone).

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

## One photograph at a time

Pedro asked for the page to stop on each photograph rather than scroll freely.
`scroll-snap-type: y mandatory` on the document does most of it, with
`scroll-padding-top` holding the sticky header clear so a frame settles in the
middle of the paper below the bar rather than under it. The rules ship only
with the series page — they are written as `:global(html)` inside its scoped
`<style>`, so `/work`, `/about`, `/loose` and the full-screen view are
untouched (confirmed in `dist`: only the two series pages link the stylesheet
that carries them).

Three things had to be solved on top of it.

**A short wheel gesture did nothing at all.** A photograph is most of a screen
tall, so consecutive snap points are roughly a screen apart, and a mouse-wheel
notch of ~300px never passes the halfway mark — the page springs straight back.
Measured: three notches moved it zero pixels. So the wheel is taken over in JS.
Any gesture, in any direction, turns exactly one page. The snapping underneath
still handles touch on its own.

**One trackpad swipe turned three or four pages.** A flick on a Mac does not end
when your fingers leave the trackpad: momentum keeps firing wheel events for a
second or more. Three attempts before this landed:

1. Release the page after a fixed 650ms — which is *inside* the tail, so the
   tail turned two or three more pages. Reported as one swipe turning three
   or four pages.
2. Release only after 220ms of genuine silence. Correct — one swipe, one page,
   even with an 1800ms tail — but it means being ignored for the whole length
   of the momentum, and Pedro reported *that* as the page getting stuck.

3. Turn again once a fixed 400ms cooldown had passed and the deltas were
   climbing. This is worse than either: a deliberate two-finger drag lasts
   longer than any cooldown worth setting, and its deltas are still rising at
   the end of one, so a single slow swipe turned two pages. Reported as
   "sometimes it does two scrolls in one swipe".

The mistake in (3) was treating elapsed time as evidence about the gesture. It
is not — the gesture is the *run of events*. So: a gesture ends when the events
stop (110ms of silence), and nothing within a run turns a second page. That
alone would be (2) again, sticky for the length of the momentum, so there is
one exception, and it rests on the only property momentum has that a hand does
not — **it only ever decays**. After six consecutive falling deltas the tail is
unmistakably a tail; a delta that then climbs sharply out of it
(`delta > previous * 1.6 + 2`) is fingers back on the glass, and re-arms a
turn at once. A climb *before* that decay is just the same swipe on its way up
to speed, and is ignored. A 350ms floor between turns catches anything else.

The result, all verified with synthetic bursts: a 700ms drag with a 1s tail
turns one page; so does a 1.2s drag with a 1.5s tail and jittery deltas; ten
swipes of random length and strength turned exactly ten pages; and a fresh
swipe landing on top of the previous swipe's momentum still turns at once.

**Every stop settled, paused, then shifted the photograph down.** Frames carried
`scroll-margin-top` (header height + 48px), added as the landing point for a
rail link with JavaScript off. But scroll-margin *grows the box the browser
snaps to* — a margin at the top moved the snap centre up by half of it, so the
photograph came to rest ~60px below where the scroll had just put it, visibly,
a beat later. Removed: `scroll-padding-top` on the container already holds the
header clear for anchors and leaves the snap box alone. Landings are now exact
to the pixel on singles, pairs and chapter openings alike (measured: drift 0).

**A jump from the margin to a distant city did not arrive.** A smooth scroll
that travels past other photographs hands the browser snap points on the way,
and it takes one and abandons the rest of the journey. `centreOn` now lifts
`scroll-snap-type` for the duration of the move and restores it after, and
anything further than two screens is jumped instantly rather than animated —
a long smooth scroll through fifteen photographs is a smear nobody asked for.

Two smaller consequences. The arrows now turn pages on both axes (up/down as
well as left/right), because their native scroll is a few dozen pixels that the
snapping would undo on the spot — the old comment about leaving the vertical
keys to the browser no longer applies. And the line out to the next series
needed a stop of its own (`scroll-snap-align: end`), or mandatory snapping
would have held the foot of the page permanently out of reach; it is handled as
one page *past* the last photograph rather than as a position among them, so
stepping back from it does not skip frame 37.

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

Hammering the arrow keys faster than the smooth scroll can land still advances
one frame rather than one per press: each press measures "where you are" from
the current scroll position, which mid-animation has not arrived yet. Invisible
at a reading pace. Fixing it means tracking a target index rather than reading
the scroll position — worth doing if it ever becomes annoying, since the pager
now owns both axes.

## Not built

Two other directions were considered and set aside:

- **Asymmetric editorial grid** — frames pushed off-centre, some full-bleed,
  spreads changing shape the way a photobook's do. The strongest answer to the
  monotony, but it needs a decision per photograph from Pedro, and derived
  automatically it would read as a template.
- **Contact-sheet overture** — open the series with all 37 as thumbnails, then
  run the sequence full size. Very photographer-native; rejected for now only
  because it puts type and grid before the first photograph.

---

# Three mobile faults (7 Sep 2026)

Pedro, on a phone: taps on a photograph often failed while the page was still
moving; the way out of a full-screen photograph was hard to find and hard to
hit; and closing one flashed white "like a reload".

## The white flash was two bugs, and the worse one was invisible

**A stale identifier in a cleanup handler.** The wheel pager's timer was
renamed `settling` → `idle` when the gesture detection was rewritten, but the
`astro:before-swap` cleanup still cleared `settling`. Astro `<script>` blocks
are transpiled, not type-checked, so the build was clean and it shipped. Every
navigation *away* from a series page threw a ReferenceError inside the swap
handler, which aborted the view transition — hence "like a reload". It went
unnoticed because the tests after that change all stayed on the same page.

Worth remembering: `npm run build` will not catch this. A navigation off the
page, with the console open, will.

**A transition that was never meant to apply between pages.** `html, body {
transition: background-color 900ms }` in global.css was added for the per-city
paper shift, but it caught the paper → lightbox change too: measured, the root
canvas stayed *paper* for 899ms after opening a photograph, so the near-white
ground sat behind the picture for the best part of a second. It now lives in
the series page's own stylesheet, and only under `html.is-reading`, a class
added 60ms after the page settles — without that gate, arriving back from a
photograph would slowly wash the lightbox colour out to paper in full view.
After the fix the ground changes in 35ms.

## Taps were being spent on stopping the scroll

A tap that lands while the page is still moving is swallowed: the browser
spends it stopping the scroll rather than on the link underneath. Snapping made
that window longer, because there is always a glide to the nearest photograph
after you let go.

Taps are now taken from `touchend` on the sequence, which arrives whether or
not the browser means to make a click of it, with `preventDefault` to stop the
duplicate. Only a genuine tap counts — moved less than 12px, held less than
400ms — so a drag is still a scroll and a long press is still a long press.
Pointer devices are left alone entirely; they never had the problem, and taking
their clicks would break modifier-clicks and the middle button.

The trade: a tap meant to stop a moving page now opens a photograph. With
snapping the page settles on its own anyway, so "tap to stop" has little left
to do.

## The way out was invisible for three seconds

The chrome fades after three seconds of stillness and `mousemove` brings it
back. A phone sends no `mousemove` — so three seconds after opening any
photograph the close mark faded out and stayed out. Still tappable, completely
invisible. That, rather than anything about the mark itself, is why closing was
hard. The chrome now only idles where there is a pointer to wake it.

The mark was also the smallest target on the site (15px of type) in the corner
hardest to reach with a thumb. It is now the word `Close` — typographic, like
everything else here — in the bottom right, with a 48px-tall box reaching into
the corner of the screen. The counter moved back onto the margin now that it
has nothing to clear, and the metadata stops 90px short of the corner so a long
camera line wraps rather than running underneath.

Two more ways out on touch: the ground around the photograph closes (the
largest target on the screen, and standard in every lightbox), and the
swipe-down threshold came down from 72 to 64.

Enabling the ground tap needed a guard. A swipe ends with the browser
synthesising a click, and that click lands on *the frame the swipe navigated
to* — so swiping through the sequence would have closed it on arrival. The
timestamp of the last swipe therefore lives outside `setupLightbox`, at module
scope, because the function has already been torn down and set up again by the
time the click arrives.

## The typefaces are the site's own now (7 Sep 2026)

Pedro, still: "it loads the web and then like loads it again on load and on
flicker."

First, what it was *not*. On the live site a walk through every route —
home → work → China → a frame → back → Japan — produces **zero console errors
and exactly one navigation entry**, so nothing is doing a real reload. The
`InvalidStateError: Transition was aborted` seen while testing comes from the
**Astro dev toolbar**: it carries a `view-transition-name` on a zero-sized
element, which Chrome refuses to capture. Dev only; it does not ship. Worth
knowing before chasing it again.

What is left is the fonts. Switzer came from `api.fontshare.com` and IBM Plex
Mono from `fonts.googleapis.com`, as two **render-blocking** stylesheets in the
head. Nothing is drawn until each has been resolved, connected to, fetched and
parsed — measured at 215ms and 118ms from a desktop with warm DNS, and far
worse from a phone on mobile data with nothing cached. Only *then* does the
font file itself start downloading from a third and fourth origin, and with
`display=swap` the page meanwhile renders in the system fonts and reshapes
itself when they arrive. Text appearing, then changing shape, is exactly what
"it loads and then loads again" describes.

All four faces are now in `public/fonts/` — 64KB the lot — declared in
global.css and preloaded in the layout, so they come down the connection that
is already open for the page. There are now **no external requests at all** on
any page (verified: `performance.getEntriesByType('resource')` filtered to
non-local returns an empty array).

Licences are in `public/fonts/LICENSES.md`. Switzer is ITF Free Font Licence
and IBM Plex Mono is SIL OFL 1.1; both permit self-hosting. The mono is subset
to Latin and Latin Extended, as Google serves it, and the Extended cut is
deliberately not preloaded — nothing on the site reaches it yet.

Note that the Chinese characters in the chapter marks are in neither typeface
and never were: they fall back to the system CJK face, which is the intention.

**Unconfirmed.** This could not be reproduced locally — every cache here is
warm and the connection is fast, and with everything cached the page paints
complete on the first frame. It is the strongest remaining candidate rather
than a proven diagnosis, and wants confirming on Pedro's phone.

## The flicker, found (7 Sep 2026)

Pedro: *"when closing a photo, the first photo does not flicker, the rest of
them flicker."*

That one sentence gives the whole answer, and it was never the fonts.

Every photograph is `opacity: 0` until its `load` fires, then fades in over
400ms — the deliberate no-spinner loading state. On a series page exactly one
frame is `loading="eager"`: the first. So:

- Close the **first** photograph → you land at the top of the page → its frame
  is the eager one, already complete when the fade script runs, so it takes the
  `img.complete` branch and appears instantly. No flicker.
- Close **any other** → you land back at your reading position, where every
  frame is lazy. The browser only begins fetching the picture you were looking
  at one second ago once layout has settled, and then it dissolves in over
  400ms from the empty block. About half a second of visible "loading" on a
  photograph that never left the cache — which is precisely "it loads the web
  and then like loads it again".

Invisible on a desktop with a warm cache and a fast decode. Obvious on a phone.

Two changes:

**The photograph you are returning to is fetched at once.** `astro:after-swap`
knows the frame you came from, so it finds that link's image on the incoming
page and sets `loading="eager"`, `fetchpriority="high"`, `decoding="sync"`
before the browser has laid anything out.

**A photograph out of the cache is not faded in at all.** `fadeIn` now times
the wait: under 150ms and it is shown at once, with the transition suppressed,
exactly as an already-complete image is. Only a photograph that genuinely took
a moment to arrive gets the fade. This is the general fix — it covers the
neighbouring frames on screen too, not just the one returned to.

Also, while in there: the scroll restore now lifts `scroll-snap-type` across
the `scrollTo` and re-asserts the position on the next frame. A hand-set scroll
and a mandatory snap container disagree on some browsers — the position is
taken and then quietly corrected a frame or two later, which reads as the page
jumping on arrival. Belt and braces; not proven to be part of this.

### Diagnosis note

Three rounds were spent on the wrong causes — a stale identifier aborting the
view transition (real, fixed), a background transition catching the page change
(real, fixed), and the render-blocking font stylesheets (real, fixed, and worth
doing) — because none could be reproduced on a warm desktop. The thing that
actually solved it was Pedro's observation about *which* photographs flicker.
Ask for that kind of detail earlier: "which cases don't do it" is worth more
than any amount of instrumenting the cases that do.

---

# Sizing the photographs by their shape (7 Sep 2026)

Pedro asked whether the China spread was "pretty enough or well organised
enough". The answer was that it was well organised and not yet well composed,
and the review that says why — with all 32 pages drawn to scale — is
`design/china-flat-plan.html` — which is **not in the repo**: it embeds all 37
photographs to open as a single self-contained file, so at 1.4MB it is
gitignored and lives on disk only. Regenerate it by asking for the review
again. Two of the six faults it names are fixed here.

## The diagnosis

Every size on the page came from one number, a cap on the photograph's
**height**, and that cap took four values: 78vh, 62vh for a city's first
photograph, 56vh for a pair, 46vh for a pair that also opened a city. Width was
whatever the aspect ratio then made it. So the shape of every page was decided
by the proportions of the photograph and nothing else. Of the 32 pages, 23 were
one photograph at exactly the same height in exactly the same place, and 18 of
those were the identical 1053 × 702 rectangle.

## What changed

**`capOf` is now two limits met with `min()`.** A *taste* cap — an upright asks
for 88vh, a landscape 78vh, two uprights side by side 72vh rather than 56 — met
with a *fit* cap, `--fit` / `--fit-open` on `.sequence`, which is the height the
screen actually has once 40px of paper is left above and below, and once a
chapter line has somewhere to sit above an opening.

Measured at 1440 × 900 (`--series-header-h` is 72 on desktop, not 64 — worth
remembering, the fit calc depends on it):

| | before | after | area |
|---|---|---|---|
| upright | 468 × 702 | 499 × 748 | +14% |
| two uprights side by side | 336 × 504 | 432 × 648 | +65% |
| a city's first photograph | 837 × 558 | 951 × 634 | +29% |
| Hangzhou's opening pair, each | 276 × 414 | 423 × 634 | +135% |
| landscape | 1053 × 702 | unchanged | — |

Why uprights get more: on a screen wider than it is tall, the upright is the
shape that loses. At one shared cap a landscape covered 739,000px² and an
upright 328,000 — 44% — and fourteen of China's 37 frames are uprights,
including 037, the photograph the whole series closes on.

The `min()` also means an opening is shortened *only when the window demands
it*, rather than by a flat 62vh every time. The old rule made the first
photograph of every city the smallest one in it: the height was being taken
from the picture to pay for the type.

**The chapter rule now spans its photograph, not the measure.** `.opening` is
given the width the photograph works out for itself (`widthOf`, the same sum
`Frame` and `FramePair` each already do), so the rule inside it lands on the
picture's two edges. Guilin's rule went from 1312px to 423px. It had been
running three and a half times the width of the upright it introduced, which
read as a bar across the page rather than as that photograph's caption.

`.line` in `ChapterMark` gained `flex-wrap: wrap` for the consequence: a narrow
rule on a short window can bring the city's name and the frame range within
about 10px of each other (Guilin at 1024 × 650), and the range now drops onto a
second line rather than running off the end of the rule.

**`ratioOf` and `isUpright` moved to `catalog.ts`.** The same four lines of
aspect-ratio logic were in `Frame.astro` and `FramePair.astro`, and the series
page now needs the answer too.

## Checked

Build clean, no console errors, Japan unaffected (no chapters, so no openings
and no rail), phones unchanged — an upright there was already clamped by the
measure, not by the height cap. Snap landings still exact: drift 0 across
twelve stops, singles, pairs and openings alike.

## Still open

**Fault 4 is improved, not eliminated.** A city's first photograph is still
shorter than a normal one (634 against 702), because the chapter line genuinely
needs the room above it. Closing that gap means centring the *line and the
photograph together* rather than the photograph alone — i.e. moving
`scroll-snap-align` from the frame to `.opening`. That is the snapping
behaviour that took three attempts to get right, so it was left alone here.

**Two faults are edit decisions, not layout ones**, and they are Pedro's:

- Frames 009–014 are six near-identical landscapes in a row (four to close
  Beijing, then Xi'an opens on a fifth and a sixth). Guilin repeats it at
  025–026 and 029–030. Moving one upright into the run fixes it.
- Shanghai is two frames carrying a full chapter heading. The journey runs
  12 · 11 · 7 · 5 · 2 and stops rather than closing.

**Not built, still the strongest remaining move:** a `size` word on a frame —
`'full'` (≈92vh, near the measure) or `'quiet'` (≈58vh), left off every other
line, exactly like `pair`. This is the "asymmetric editorial grid" that earlier
notes set aside as needing a decision per photograph. It doesn't: it needs a
decision on six or seven frames per series and the rest inherit.
