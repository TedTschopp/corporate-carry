# Corporate Carry — Design System

A curated guide to the gadgets, tools, and everyday essentials that help modern office professionals work smarter, stay organized, and carry better. This design system is the visual + editorial language that runs the Corporate Carry website.

The brand sits at the intersection of **gear + usefulness + office life + productivity** — premium tech-review meets editorial EDC blog. Confident, organized, slightly literary, never gimmicky.

---

## What's in this folder

```
├── README.md                ← you are here
├── SKILL.md                 ← agent-skill entrypoint
├── colors_and_type.css      ← raw tokens (CSS custom properties)
├── styles.css               ← full base + component layer used by the site
├── tweaks-panel.jsx         ← in-page tweak controls (reused across pages)
├── tweaks-app.jsx           ← Corporate Carry tweak wiring (accent / bg / density)
├── index.html               ← homepage (sample)
├── category.html            ← category page (Backpack Essentials, sample)
├── article.html             ← long-read article (sample)
├── ui_kits/web/             ← reusable component reference + screens
└── preview/                 ← cards rendered in the Design System tab
```

The three sample pages at the root double as the UI kit — they show every component in context.

---

## Content fundamentals

### Voice
Clear, helpful, professional, with just enough personality to make it enjoyable to read. Sounds like a sharp coworker who always has the right charger, the perfect adapter, and a surprisingly useful gadget in their bag.

- **Direct** — no "you won't believe…" copy.
- **Useful** — every claim is something a reader can act on.
- **Skimmable** — short paragraphs, kicker labels, mono metadata strips.
- **Slightly clever** — wry, dry, never goofy. Allowed to admit something didn't work.
- **Honest about pros and cons** — items get rejected, tiers exist, "what we removed" is a real section.
- **Grounded** — better workdays, not fantasy luxury.

### Tone, in two examples

> Your backpack does not need to be full of gadgets. It needs the right few things that save you time, reduce friction, and make you look more prepared than everyone else in the meeting.

> Most "backpack essentials" lists are too generous — every charger, every pouch, every notebook gets a slot. Ours is the opposite. The bar to be on this page is simple: does it survive a normal corporate week without becoming clutter?

### Casing
- **Headlines:** sentence case. Almost never title case. Periods are common at end of display headings ("Six pillars of the workday carry.").
- **Kickers / metadata / labels:** UPPERCASE, mono, generous letter-spacing.
- **Numerals in metadata:** mono, tabular-feeling.
- **Buttons / CTAs:** sentence case ("Browse the carry"), never SHOUTED.

### Pronouns
"We" (the editors) and "you" (the reader). Never "I" in editorial. Never "us" as the company.

### What we don't do
- ❌ Emoji.
- ❌ "Top 25 amazing gadgets" listicle energy.
- ❌ Exclamation marks (sparingly, in newsletter only).
- ❌ Affiliate-style "BUY NOW" CTAs. Retailer links are quiet, mono, side-by-side.
- ❌ Stock-photo hero shots — placeholders are honest stripes labeled in mono.

### Editorial scaffolding we lean on
- A **kicker** at the top of every section: `§ 02 · Latest roundups`
- A **section number** in mono inside H2s on long reads: `01 The bag itself`
- A **tier** system on category pages: Tier 1 (★), Tier 2, Tier 3.
- An honest **"What we removed"** section in every roundup.

---

## Visual foundations

### Mood
Editorial, hairline-thin, mono-metadata, italic-serif accents inside an otherwise grotesque-sans system. Think: The Verge meets Carryology meets a print quarterly.

### Color
Two background modes, one accent.

**Light (default):**
- `--bg`        `#f6f1e6` — warm cream
- `--bg-soft`   `#efe8d6` — toasted cream (band fills)
- `--surface`   `#fbf7ec`
- `--paper`     `#fffdf6` — cards, products
- `--ink`       `#1a1614` — primary text
- `--ink-2`     `#2c2722` — body
- `--ink-soft`  `#5d564d` — secondary
- `--ink-mute`  `#8a8275` — labels
- `--hairline`  `#ddd2b8` — every 1px border in the system

**Dark:**
- `--bg`        `#1c1714`
- `--bg-soft`   `#2a221c`
- `--surface`   `#241d18`
- `--paper`     `#2f2620`
- `--ink`       `#f3eee5`
- `--hairline`  `#3b3027`

**Accent — dijon amber (the only chromatic hue):**
- `--accent`      `#a16207`
- `--accent-2`    `#854d0e` (hover)
- `--accent-tint` `#f0e6cd` (highlight backgrounds, avatar fills)

Accents are deployed sparingly: italic-serif emphasis word in headlines, "★ Top pick" tags, scores in compare tables, kicker eyebrows when we want a section to read accented.

### Typography
Two families, no more.

- **Geist** (Google Fonts) — modern grotesque, used for everything except mono.
- **Geist Mono** — used for kickers, metadata, prices, spec rows, footer bottom strip, breadcrumbs, "shop on:" link rows.
- **Times New Roman** — used *only* for the italic-serif accent word inside an H1 and the pull quote body. A single ornamental gesture in an otherwise neutral system.

**Scale (clamp where it makes sense):**

| Token       | Size                  | Use |
|-------------|-----------------------|-----|
| `.display`  | `clamp(48, 7vw, 96)`  | landing-hero headlines |
| `.h1`       | `clamp(36, 4vw, 56)`  | page headers |
| `.h2`       | `clamp(28, 2.6vw, 36)`| section heads |
| `.h3`       | `22`                  | card titles |
| `.h4`       | `17`                  | product names |
| body        | `16` / `1.5`          | UI |
| `.lede`     | `19` / `1.45`         | deck under H1 |
| `.kicker`   | `11` mono, `0.12em` tracking, uppercase | eyebrows |
| `.tiny`     | `12`                  | footnotes |

All sans headlines: `letter-spacing: -0.025em → -0.04em` (tighter at larger sizes), `font-weight: 600`, `text-wrap: balance`.

### Spacing & rhythm
- Page max width: `1320px` (`--maxw`), narrow column `760px` (`--maxw-narrow`).
- Outer page padding: `32px` desktop, `24px` mobile.
- Section vertical rhythm: `72px` standard, `48px` compact, scales with density tweak.
- Card padding: `18–24px`.
- Grid gaps: `20–32px` between cards, `48–56px` between major columns.

### Radii
- `--radius-sm: 4px` — chips, labels stamped on cards
- `--radius: 8px` — small components, filter pills
- `--radius-lg: 12px` — cards, products, all major surfaces

Pills (nav, filters, buttons): `999px`.

### Borders
**Hairlines are the system's structural element.** Every divider, every card edge, every table row is a single 1px line at `--hairline`. No drop shadows on cards by default. Hover *can* introduce `--shadow` (1px translucent), but the resting state is always pure hairline.

Dashed hairlines (`border-bottom: 1px dashed var(--hairline)`) appear in box-list rows — a small visual difference that signals "list item" vs "structural divider."

### Shadows
- `--shadow-sm: 0 1px 0 rgba(26,22,20,0.04)` — almost-invisible card lift on hover
- `--shadow: 0 1px 2px rgba(26,22,20,0.05), 0 0 0 1px rgba(26,22,20,0.04)` — full hover state

Default state: **no shadow.** The cream + hairline aesthetic does the lifting.

### Imagery system — striped placeholders
We intentionally do not generate or stock-photo product images. Imagery slots are striped SVG placeholders with a mono uppercase label that tells you exactly what should go there:

```
PRODUCT · CHARGER       EDITORIAL · HERO SHOT       FLAT-LAY · BAG
```

The placeholder pattern: 135° repeating linear-gradient at 11px / 12px spacing, 5% ink-on-cream. The label sits in a hairline-bordered cream chip in the middle. There are three variants: default, `.ph--dark`, `.ph--accent` (uses dijon tint).

When real product images come in, the `.ph` class is replaced with an `<img>` — same aspect ratio, same border-radius, same hairline.

### Animation
Minimal and quick. Most transitions are `0.15s ease` for color/border changes, `0.2s ease` for transforms (card-hover lift of `-2px`). One single ambient animation: the strip marquee on the homepage (`40s` linear infinite).

No bouncy springs. No fades-on-scroll. The static layout is doing the work.

### Hover states
- **Buttons:** lift `-1px`, darken background slightly, arrow icon translates `+2px`.
- **Nav links:** background fills with `--bg-soft`.
- **Cards:** border darkens (`--hairline` → `--hairline-2`), `-2px` translate.
- **Shop / retailer links (mono):** color → accent, background → accent-tint.
- **Article links inside long-read:** dijon underline thickens from translucent to solid.

### Press / active states
Buttons don't get a separate press style — the lift is enough. Nav active state is a black pill (`--ink` bg, `--bg` fg).

### Layout primitives
- `.wrap` — 1320 max, 32 padding, the standard page container.
- `.wrap-narrow` — 760 max, used for editorial body.
- `.grid-12` — 12-col CSS grid for the few times we need a real grid.
- `.hairline` — a 1px horizontal divider; use everywhere.

### Transparency / blur
Used in two places only:
1. **Sticky header** — `backdrop-filter: blur(8px)` on a 92% bg color-mix.
2. **Tweaks panel** — translucent with backdrop-blur, by design (the only chrome element that floats above the page).

The rest of the page is opaque and structural.

### Grain
Optional 6%-opacity SVG fractal-noise texture, fixed-position, mix-blend multiply. Toggled by the in-page Tweaks panel (default ON). Adds tactile warmth without interfering with type. Use it on long-form editorial; turn it off if rendering pixel-art / screenshots.

---

## Iconography

The site uses **only line icons drawn directly in SVG** with `stroke-width: 1.6`, `stroke-linecap: round`, `stroke-linejoin: round`, currentColor stroke, no fill. They live as inline `<svg class="i">` markup — small, hand-built for the specific shape we need (search, arrows, chevrons).

There is **no icon font.** There is **no emoji.** The mono `§` symbol is used in kickers as a deliberate editorial mark. `·`, `★`, `↗`, `→`, and `/` (slash, in breadcrumbs) are the only typographic glyphs that act icon-like.

For the six category tiles on the homepage, we use slightly larger, custom-drawn 80×64 line illustrations — same stroke spec, but they read as small editorial diagrams rather than UI icons. They are *purposely* hand-built per category so they feel commissioned rather than off-the-shelf.

If you need a glyph not in this set, draw it using the same stroke spec rather than reaching for Lucide / Heroicons / Feather.

---

## CAVEATS

- **No real photography.** Imagery slots ship as striped placeholders by design — when production rolls, photo direction needs its own brief.
- **Substituted font.** Geist is used directly from Google Fonts; if Vercel ships an updated weight set, swap the import URL.
- **One accent only.** The system is intentionally monochromatic + dijon. Semantic colors (success / error) aren't defined yet because the editorial site doesn't surface them; if a commerce / account UI ships, this needs to expand.
