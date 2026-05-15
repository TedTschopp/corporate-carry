# Corporate Carry (Static Preview)

This repository is currently a flat, static website intended for GitHub Pages.

## Current state

- Full design-system homepage and editorial page templates are live.
- No middle tier.
- No backend services.
- No API calls.
- HTML + CSS only.

## Pages

- `index.html` (homepage)
- `category.html` (category layout)
- `article.html` (long-form article layout)
- `catalog.html` (category-route mirror)
- `journal.html` (article-route mirror)
- `404.html` (fallback)
- `styles.css` (shared design system styling)

## Publish on GitHub Pages

1. Push this repository to GitHub.
2. Open repository **Settings** -> **Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`.
5. Save.

GitHub will publish the static files directly with no build pipeline required.
