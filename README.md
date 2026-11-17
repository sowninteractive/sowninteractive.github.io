# Sown Interactive website

A static single-page site for GitHub Pages. No build step, no installs.

## Where to change things

| I want to change...                          | Edit this file                          |
|----------------------------------------------|-----------------------------------------|
| Projects, photos, screenshots, trailers, links | `content/projects.js`                  |
| Headline, About text, Our story, contact text | `index.html` (plain text, easy to find) |
| Colours                                       | top of `css/style.css` (the `:root` block) |
| Email address                                 | `index.html` (search for `sowninteractive@gmail.com`) |

## Adding a project
Open `content/projects.js`. Copy one project block (from `{` to `}`), paste it after a
comma inside the group you want (Games, Software, Websites, Videos), and edit the text.
The page rebuilds itself from that file. There is a longer guide at the top of the file.

## Adding photos
1. Put the image in `images/projects/`. Landscape 16:10 (about 1600 x 1000 px) looks best.
2. In `content/projects.js`, set `"image": "images/projects/your-file.jpg"` (the card picture).
3. Add detail-window screenshots: `"screenshots": ["images/projects/shot-1.jpg", "images/projects/shot-2.jpg"]`
4. Optional trailer: `"video": "YOUTUBE_VIDEO_ID"` (the part after `v=` in the YouTube link).
5. Leave `"image": ""` to keep the plant placeholder.
Keep photos under about 300 KB (JPG or WebP) so the page stays fast.

## Replacing the social preview image
Replace `images/og-image.png` (1200 x 630). Then, once the site address is final, make the
`og:image` line in `index.html` a full URL, e.g. `https://yourname.github.io/repo/images/og-image.png`.

## Other
- `images/sown-logo.png` is the logo shown in the hero; `images/favicon.png` is the tab icon.
- `404.html` is the "page not found" page.

## Publish
Repo Settings > Pages > deploy from the `main` branch, root folder.

## Getting found on Google (SEO)
1. **Site address:** already set to `https://sowninteractive.github.io` in `index.html`,
   `robots.txt` and `sitemap.xml`. If the address ever changes (for example a custom domain),
   find and replace it in those three files.
2. **Add the site to Google Search Console** (search.google.com/search-console): choose "URL prefix",
   enter your address, pick the "HTML tag" method, paste the tag into the commented line in
   `index.html`'s head, push, then click Verify.
3. **Submit the sitemap:** in Search Console open Sitemaps, enter `sitemap.xml`, Submit.
4. **Request indexing** for your home page using the URL Inspection box at the top.
5. Be patient. Indexing can take days to a few weeks.
Note: your repo must be named exactly `sowninteractive.github.io` so the site publishes at the root
of the domain. That is what lets `robots.txt` and `sitemap.xml` work.
Update `lastmod` in `sitemap.xml` when you make big changes.

## Before launch checklist
- Confirm the repo is named `sowninteractive.github.io` and Pages is turned on (Settings > Pages).
- Replace every `"#"` link in `content/projects.js` with a real address.
- Swap the social preview `og:image` to a full URL.
- Optional: host the two Google Fonts yourself for speed.
