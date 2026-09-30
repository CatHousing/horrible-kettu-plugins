# horrible-kettu-plugins

Kettu plugins that make Discord look like a terminal.

| Plugin | What it does |
| --- | --- |
| **Terminal Prompt** | Turns the message box placeholder into a shell prompt, e.g. `ethan@discord:~/#general$` |
| **Terminal Timestamps** | Shows message times as `[HH:MM:SS]`, like a shell log |

## Install

In Kettu go to **Settings → Plugins → +** and paste one of these URLs.

**GitHub Pages (recommended, updates quickly):**

```
https://cathousing.github.io/horrible-kettu-plugins/terminal-prompt/
https://cathousing.github.io/horrible-kettu-plugins/terminal-timestamps/
```

**Raw GitHub (works without Pages, but GitHub caches it for about 5 minutes):**

```
https://raw.githubusercontent.com/CatHousing/horrible-kettu-plugins/main/plugins/terminal-prompt/
https://raw.githubusercontent.com/CatHousing/horrible-kettu-plugins/main/plugins/terminal-timestamps/
```

Keep the trailing `/`. Kettu loads `manifest.json` and `index.js` from that folder.

## One-time setup: turn on GitHub Pages

1. Open the repo on GitHub and go to **Settings → Pages**.
2. Under **Build and deployment → Source**, pick **GitHub Actions**.
3. Push to `main`, or run the **Deploy plugins to GitHub Pages** workflow from the **Actions** tab.

After that, every push to `main` redeploys the plugins, and
`https://cathousing.github.io/horrible-kettu-plugins/` lists them all.

## Layout

```
plugins/
  <plugin-id>/
    manifest.json   name, description, authors, icon, hash
    index.js        the plugin code
scripts/build.mjs   refreshes the hashes and builds dist/ for Pages
```

## Editing or adding a plugin

1. Edit `plugins/<id>/index.js`, or copy an existing folder to make a new plugin.
2. Run `npm run build` (plain Node 18+; nothing to install).
3. Commit and push to `main`.

`npm run build` matters because Kettu only downloads new plugin code when the
`hash` in `manifest.json` changes. The Pages deploy recomputes the hashes by
itself, but the raw GitHub URLs serve the committed manifests as they are, so
run the build before you commit.
