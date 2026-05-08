# VBOX to MoTeC Converter — Landing Page

Static landing page for `converter.tedderengineering.com`. Mirrors the
Tedder Engineering master site conventions (Inter + Barlow Condensed,
near-black background, `.btn`/`.card`/`.section` patterns, fade-in
observer) and follows the RaceTrace precedent of using a distinct
sub-brand accent — **emerald (#10b981) → cyan (#22d3ee)** in this case.

## Files

| File | Purpose |
|---|---|
| `index.html` | The page itself |
| `style.css`  | Brand-matched styles; sub-brand greens defined as CSS variables at the top |
| `script.js`  | Fade-in `IntersectionObserver`, screenshot placeholder fallback, smooth scroll, basic form validation |
| `CNAME`      | GitHub Pages custom subdomain config |
| `hero-screenshot.png` | **Add this** — the hero image (target ~1600×1000, 16:10 ratio) |
| `showcase-1.png` | **Add this** — first "in action" screenshot (16:10, ~1600×1000) |
| `showcase-2.png` | **Add this** — second "in action" screenshot (16:10, ~1600×1000) |

## Before you publish

Two things must be edited before this goes live:

### 1. Formspree endpoint

In `index.html`, find the form `action` attribute and replace the
placeholder:

```html
<form class="waitlist-form"
      action="https://formspree.io/f/REPLACE_WITH_YOUR_FORMSPREE_ID"
      method="POST">
```

Two options here:

- **Reuse the existing master-site Formspree endpoint** (recommended for
  v1). The hidden `<input name="source" value="converter-landing">`
  field tags submissions so you can filter them in Formspree's
  dashboard. This is what the brief recommended.
- **Create a new endpoint** at formspree.io if you want a separate
  inbox.

### 2. Hero and showcase screenshots

The page references three image files in the repo root:

- **`hero-screenshot.png`** — the main visual at the top of the page.
- **`showcase-1.png`** — first image in the "See It In Action" section
  (the Driver Summary worksheet you've already captured fits here).
- **`showcase-2.png`** — second image in that section, showing a
  different aspect (Lap Analysis tab, GPS view, channel detail, etc.).

While any of these are missing, the page falls back to a diagonal-stripe
placeholder labeled with the expected filename. So the page is
publishable while you're still capturing screenshots, just visibly
incomplete.

Recommended specs for all three: 16:10 aspect ratio, ~1600×1000 px
(2400×1500 for retina), PNG format.

If you want to update the caption text under each showcase image, edit
the `<figcaption>` blocks in `index.html` &mdash; one per figure in the
`.showcase-stack` section.

## Deploying via GitHub Pages

1. Create a new GitHub repo (e.g. `tedder-engineering/converter-landing`).
2. Push these files to the `main` branch.
3. In the repo's **Settings → Pages**, set:
   - Source: **Deploy from a branch**
   - Branch: **main** / **(root)**
4. The `CNAME` file is already in the repo; GitHub Pages will pick it up.
5. Add a DNS record at your provider:
   - Type: `CNAME`
   - Name: `converter`
   - Value: `<your-github-username>.github.io`
   - TTL: default
6. Wait for DNS propagation (usually <30 minutes).
7. In the repo's GitHub Pages settings, check **Enforce HTTPS** once
   the certificate has issued.

This is the same pattern RaceTrace uses; nothing new to learn.

## Local preview

Any static-file web server works. Quickest options:

```bash
# Python 3
python -m http.server 8000

# or Node
npx serve .
```

Then open http://localhost:8000.

## Customizing the sub-brand color

The greens are defined as CSS variables at the top of `style.css`:

```css
--accent:        #10b981;
--accent-2:      #22d3ee;
--accent-strong: #14d39e;
```

Change those three values and the entire page re-themes — buttons,
gradients, links, focus rings, the logo accent, the price card
highlight, everything. Don't search-and-replace anywhere else.

## Updating the form fields

The form fields are intentionally short to maximize signups while
still capturing useful qualifying data:

1. Email (required)
2. Name (required)
3. Team (optional)
4. Series (required dropdown)
5. Files per month (required dropdown)
6. Pain point (optional free text)

If you decide to remove a field, just delete its `<div class="form-row">`
in `index.html`. If you add fields, mirror the existing markup.

## What's intentionally NOT here

- No analytics. The brief noted RaceTrace doesn't use any either —
  consistency matters. Add Plausible or GA later if you want.
- No real prices. "TBD" placeholders are deliberate; you'll fill these
  in once you've validated demand.
- No payment processor. Waitlist only for v1.
- No login/auth. Static page.
