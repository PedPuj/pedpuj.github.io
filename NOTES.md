# Project notes and decisions

Context for future sessions. Set up on **6 September 2026**.

---

## What this is

A photo portfolio for Pedro (photographer, **does not write code** — all
terminal, git and file work is done for him; anything that must happen in a
browser gets click-by-click instructions).

Live at **https://pedpuj.github.io/**

This session was **setup only**. The portfolio itself — gallery, layout,
typography, actual photos — was deliberately left for a later session. The
homepage is a throwaway placeholder.

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

Left for the next session, by instruction: gallery, layout, styling, photo
pages, sample images, any design decision at all. `src/pages/index.astro` is a
placeholder and is meant to be replaced wholesale.

Also not set up: analytics, sitemap, RSS, SEO metadata, image licensing or
watermarking, a contact form.
