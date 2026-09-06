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

## How to add a photo later

The gallery hasn't been built yet — that's the next session. But the place
photos go is already set up:

1. Put the image file into **`src/images/`**.
2. Use a plain, descriptive filename: `iceland-black-beach.jpg`, not
   `DSC_0042.jpg`. Lowercase, dashes instead of spaces, no accents.
3. Export at full quality and a generous size (2500px on the long edge is
   plenty). **Do not shrink or compress it yourself** — the site does that
   automatically, and it does it better. It creates several smaller versions
   and hands each visitor the right one for their screen.
4. Publish it using the three lines above.

---

## What's in each folder

| Folder | What goes in it |
|---|---|
| `src/images/` | **Your photos.** Automatically resized and optimised. This is where almost everything goes. |
| `src/content/` | **Words.** Descriptions of a series, an about page, captions — written as plain text files. |
| `src/pages/` | **The pages themselves.** One file here becomes one page on the site. `index.astro` is the homepage. |
| `src/layouts/` | Page templates — the shared frame around every page. |
| `src/components/` | Reusable pieces, e.g. a gallery grid used on several pages. |
| `public/` | Files published exactly as-is, untouched: the favicon, a PDF, a CV. **Not for photos** — images here skip the optimisation. |

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
