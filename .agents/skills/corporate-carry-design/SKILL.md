---
name: corporate-carry-design
description: Use this skill to generate well-branded interfaces and assets for Corporate Carry, the curated everyday-carry website for office professionals. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping homepage, category, and article-style layouts.
user-invocable: true
---

Read the `README.md` file at the root of this skill, and explore the other available files.

Key entry points:
- `README.md` — brand overview, content fundamentals, visual foundations, iconography rules.
- `colors_and_type.css` — design tokens (CSS custom properties). Light + dark modes.
- `styles.css` — full component layer used across the live sample pages.
- `index.html`, `category.html`, `article.html` — three live sample pages that double as the UI kit. **Copy-paste from these rather than re-deriving.**
- `tweaks-panel.jsx` + `tweaks-app.jsx` — optional in-page Tweaks panel with accent / background / density / headline-style / tagline controls.
- `ui_kits/web/README.md` — component map.
- `preview/` — single-purpose cards for individual tokens and components.

When generating visual artifacts (slides, mocks, throwaway prototypes), copy `styles.css`, `colors_and_type.css`, and the Geist Google Fonts link into the new file. The site's distinctive moves to preserve in any new artifact:

1. **Warm cream `#f6f1e6` + warm black `#1a1614`** — never use cool greys.
2. **Dijon-amber accent `#a16207`** as the only chromatic hue.
3. **Hairlines (1px at `#ddd2b8`)** carry the structure, not shadows.
4. **Geist sans + Geist Mono only**, with **Times New Roman italic** as the *single* ornamental gesture inside H1s and pull quotes.
5. **Mono uppercase kickers** like `§ 02 · Latest roundups` open every section.
6. **Striped SVG placeholders** with mono labels stand in for any photography you don't have.
7. **Sentence case** with **periods** at the end of display headings. **No emoji.**

If working on production code, copy the tokens from `colors_and_type.css` and read `README.md` for voice + visual rules. The style of writing is direct, useful, slightly clever, honest about pros and cons. We say "we" and "you," never "I."

If invoked without other guidance, ask the user what they want to build (article page? category? gift guide? newsletter? brand artifact?), ask a few questions about scope, then deliver as an HTML artifact using these tokens and components.
