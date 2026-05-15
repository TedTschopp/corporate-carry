# Web UI kit

The Corporate Carry website's component library is demonstrated in three live pages at the **project root**:

| File              | What it shows |
|-------------------|---------------|
| `index.html`      | Homepage — header/nav, hero with featured carry-of-the-week, marquee strip, 6-tile category grid, latest roundups, editor's carries, dark newsletter band, footer. |
| `category.html`   | Category page — breadcrumb, category hero, stats column, editorial intro, filter pills, tiered product grid (Tier 1 / Tier 2), compare table, related-categories dark band. |
| `article.html`    | Long-read feature — kicker, italic-serif headline, deck, byline meta, hero placeholder, drop-cap lede, stat band, inline product callouts, pull quote, box list, sticky kit sidebar, related articles. |

These pages share `../../styles.css` and `../../colors_and_type.css`. They are the source of truth for component implementation — copy-paste from them rather than re-deriving from the preview cards.

## How to use

1. Include the fonts in `<head>`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
   ```
2. Link both stylesheets:
   ```html
   <link rel="stylesheet" href="colors_and_type.css">
   <link rel="stylesheet" href="styles.css">
   ```
3. Optional — drop in the tweak panel for live theme exploration:
   ```html
   <script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
   <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
   <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
   <script type="text/babel" src="tweaks-panel.jsx"></script>
   <script type="text/babel" src="tweaks-app.jsx"></script>
   ```

## Component map

| Component             | Class(es)                                      | Where to find it |
|-----------------------|------------------------------------------------|------------------|
| Site header & nav     | `.site-header`, `.nav`, `.logo`, `.iconbtn`    | all three pages  |
| Buttons               | `.btn`, `.btn--ghost`, `.btn--accent`, `.btn--sm` | all              |
| Chips & stamps        | `.chip`, `.chip--accent`, `.chip--outline`, `.chip--ink` | all  |
| Striped placeholder   | `.ph`, `.ph--dark`, `.ph--accent`, `.ph__label` | all              |
| Section head          | `.section-head`, `.kicker`                     | all              |
| Article card          | `.article-card`, `.article-card.feat`          | index, article   |
| Product card          | `.product`, `.product__pick`, `.product__index` | category         |
| Inline product callout| `.inline-product`                              | article          |
| Tier header           | `.tier__head`, `.badge`, `.badge.accent`       | category         |
| Compare table         | `.compare`                                     | category         |
| Stat band             | `.stat-band`                                   | article          |
| Pull quote            | `.pull`                                        | article          |
| Box list              | `.box`                                         | article          |
| Sticky kit sidebar    | `.side`                                        | article          |
| Newsletter dark band  | `.sub`                                         | index            |
| Filter pills          | `.filters`, `.pill`                            | category         |
| Site footer           | `.site-footer`                                 | all              |

## What's not in here (yet)

- **Forms** beyond the subscribe input — auth, account, comment forms aren't designed.
- **Search results** page — only the iconbtn-trigger exists.
- **Product detail** page — products surface in category + article only.
- **Author / About / How-we-review** templates — referenced but not built.
- **Mobile nav drawer** — current breakpoints stack vertically; a proper drawer hasn't been designed.
