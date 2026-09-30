# horrible-kettu-plugins

Kettu plugins that make Discord look like a terminal.

| Plugin | What it does |
| --- | --- |
| **Terminal Prompt** | Turns the message box placeholder into a shell prompt, e.g. `ethan@discord:~/#general$` |
| **Terminal Timestamps** | Shows message times as `[HH:MM:SS]`, like a shell log |
| **Background Switcher** | Adds `/background <image url>` to set your chat background. `/background` on its own (or `none` / `null`) goes back to the theme's default |

There's also a **Terminal** theme (black background, green text) in `themes/`.

## Install

In Kettu go to **Settings → Plugins → +** and paste one of these URLs.

**GitHub Pages (recommended, updates quickly):**

```
https://cathousing.github.io/horrible-kettu-plugins/terminal-prompt/
https://cathousing.github.io/horrible-kettu-plugins/terminal-timestamps/
https://cathousing.github.io/horrible-kettu-plugins/background-switcher/
```

Theme (Settings → Themes → +):

```
https://cathousing.github.io/horrible-kettu-plugins/themes/terminal.json
```

**Raw GitHub (works without Pages, but GitHub caches it for about 5 minutes):**

```
https://raw.githubusercontent.com/CatHousing/horrible-kettu-plugins/main/plugins/terminal-prompt/
https://raw.githubusercontent.com/CatHousing/horrible-kettu-plugins/main/plugins/terminal-timestamps/
https://raw.githubusercontent.com/CatHousing/horrible-kettu-plugins/main/plugins/background-switcher/
https://raw.githubusercontent.com/CatHousing/horrible-kettu-plugins/main/themes/terminal.json
```

For plugins, keep the trailing `/`. Kettu loads `manifest.json` and `index.js` from that folder.

## Background Switcher

```
/background https://i.imgur.com/example.png   set the chat background
/background                                   back to the theme's default
/background none                              same (null, reset, default and off work too)
```

- **You need a theme selected.** Kettu only draws backgrounds for themes. Any theme works, including the Terminal theme above.
- The link is stored by the plugin and put back on your theme every launch, because Kettu re-downloads themes at startup.
- Resetting (or disabling the plugin) re-downloads the theme, so you get exactly the background it ships with, or none.
- The theme's own blur and opacity are kept; only the image changes.
- Discord upload links (`cdn.discordapp.com/attachments/...`) expire after about a day. Use a permanent host like Imgur or catbox.
- Kettu's theme settings have a switch that hides custom backgrounds; if it's on, you won't see this one either.
- Only the chat area gets the background.

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
themes/
  <theme>.json      Kettu theme files
scripts/build.mjs   refreshes the hashes and builds dist/ for Pages
```

## Editing or adding a plugin

1. Edit `plugins/<id>/index.js`, or copy an existing folder to make a new plugin.
2. Run `npm run build` (plain Node 18+; nothing to install).
3. Commit and push to `main`.

Keep `index.js` starting with `(() => {` on the very first line, with no comment or blank line above it.
Kettu runs the file as `return <your code>`, so anything before the `(` makes it return nothing.

`npm run build` matters because Kettu only downloads new plugin code when the
`hash` in `manifest.json` changes. The Pages deploy recomputes the hashes by
itself, but the raw GitHub URLs serve the committed manifests as they are, so
run the build before you commit.
