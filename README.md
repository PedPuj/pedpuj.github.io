# bedrofoto — photo portfolio

The website that lives at **https://pedpuj.github.io/**

This file is written for you, not for a programmer. Nothing here assumes you
know how any of it works.

---

## The one thing to understand

Your photos and text live in **this folder on your Mac**. GitHub is a copy of
that folder stored online. Whenever you send your changes to GitHub, a robot
there rebuilds the website and publishes it — usually within a minute or two.

So the rhythm is always: **change something → look at it locally → publish it.**

---

## How to run the site on your own computer

This shows you the site privately, on your Mac, before anyone else sees it.

1. Open the **Terminal** app.
2. Copy and paste this line, then press Return:

   ```
   cd ~/Documents/Projects/bedrofoto.github.io && npm run dev
   ```

3. It prints an address like `http://localhost:4321/`. Open that in your browser.
4. Leave the Terminal window open while you work. The browser page updates by
   itself every time you save a file — no need to refresh.
5. When you're finished, click the Terminal window and press **Ctrl + C** to
   stop it.

`localhost` means "this computer only". Nobody else can see this version.

---

## How to publish a change

Once you're happy with how it looks locally, run these three lines in the
Terminal, one at a time:

```
cd ~/Documents/Projects/bedrofoto.github.io
git add -A
git commit -m "Describe what you changed"
git push
```

Replace the words inside the quotes with a short note to your future self —
"Added Iceland series", "Fixed typo on about page". That's all it's for.

After `git push`, wait 1–2 minutes and reload **https://pedpuj.github.io/**.

**To watch it publish:** go to
https://github.com/PedPuj/pedpuj.github.io/actions — a yellow dot means it's
working, a green tick means your change is live, a red cross means something
broke (nothing is lost; the previous version stays up).

---

## The site, in one picture

Six kinds of page:

| Address | What it is |
|---|---|
| `/` | One photograph, full screen. Nothing else. |
| `/work` | The three series, one under the other. |
| `/work/workers`, `/work/china`, `/work/japan` | A series, read one frame at a time, top to bottom. |
| `/loose` | The contact sheet — everything that didn't make a series. |
| `/frame/china-004` | One photograph full screen on black, with its film and camera details. Arrow keys move between frames, Escape closes. |
| `/about` | You, your kit, and two links. |

---

## How to add photos

There are two steps: **put the file somewhere**, and **add a line to the list**.

### Step 1 — put the file in the right folder

| Folder | What goes in it |
|---|---|
| `src/images/home/` | `hero.jpg` — the single homepage photograph |
| `src/images/workers/` | The Workers series |
| `src/images/china/` | The China series |
| `src/images/japan/` | The Japan series |
| `src/images/loose/` | Everything loose |
| `src/images/about/` | `portrait.jpg` — the photo of you |

Export at full quality, 2500px on the long edge is plenty. **Do not shrink or
compress them yourself** — the site does that automatically and does it better.
Use plain filenames: lowercase, no spaces, no accents. Keeping the camera's own
number (`dscf2327.jpg`) is a good idea — it means you can always find the raw
file again.

Each series also needs a **cover** for the `/work` page. That is just one of the
series' own photographs, named on the `cover:` line near the top of that series
in `frames.ts`.

### Step 2 — add a line to the edit

Open **`src/data/frames.ts`**. It is a list, and **the order of the list is the
order the photographs appear on the site.** Nothing is sorted for you — you
decide, the way you'd decide the order of prints on a table.

Each photograph is one line that looks like this:

```
{ file: 'china-01.jpg', slot: 'Market stall, Xian', orientation: 'h', film: 'KODAK PORTRA 400', place: "XI'AN", year: 2026 },
```

| The bit | What it means |
|---|---|
| `file` | The filename, exactly as it is on disk |
| `slot` | A note to yourself. Also what a blind visitor's screen reader says. |
| `orientation` | `'h'` if it's landscape, `'v'` if it's portrait |
| `film`, `place`, `year` | Printed under the photograph in the full-screen view |
| `pair: true` | Add this and the photograph sits **side by side** with the next one in the list. Use it sparingly — it's there to break the rhythm. |

Copy an existing line, change the words between the quote marks, keep the
commas and brackets exactly where they are. That's the whole job.

**Until a file exists, its place on the site shows as a flat grey block** with a
note telling you which file is missing. That is deliberate — you can lay out the
whole sequence first and fill it in later.

Your name, email, Instagram, camera and film list live in **`src/data/site.ts`**.
Same idea: change the words between the quote marks, nothing else.

---

## What's in each folder

| Folder | What goes in it |
|---|---|
| `src/images/` | **Your photos**, in the six folders above. Automatically resized and optimised. |
| `src/data/` | **The two files you edit**: `frames.ts` (the sequence) and `site.ts` (your details). |
| `src/pages/` | The pages themselves. One file here becomes one page. |
| `src/layouts/`, `src/components/`, `src/styles/` | The machinery of the design. Leave these alone unless you want to change how the site looks. |
| `public/` | Files published exactly as-is: the favicon, a PDF, a CV. **Not for photos** — images here skip the optimisation. |

Folders you can ignore completely: `node_modules` (the machinery, thousands of
files, never edit), `dist` (the built site, thrown away and rebuilt each time),
`.github` (the publishing robot's instructions).

---

## If something goes wrong

Nothing you do locally can break the live site — it only ever changes when you
`git push`, and if a build fails the previous version stays up.

If the site behaves strangely on your Mac, this fixes most things:

```
cd ~/Documents/Projects/bedrofoto.github.io && rm -rf node_modules && npm install
```

See `NOTES.md` for why the project is built the way it is.
