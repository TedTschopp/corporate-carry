## Plan: Jekyll Content Migration

Convert Corporate Carry from duplicated static HTML into a GitHub Pages/Jekyll site where items are canonical, reviews/posts reference items, and all visible numbers, products, cards, footer taxonomy, media labels, and category counts come from data/collections instead of hard-coded markup.

[ASSUMPTION] Preserve the current visual design and URL intent while enabling Liquid-generated pages. The current .nojekyll file must be removed during implementation so GitHub Pages can process Liquid.

**Steps**
1. Establish Jekyll foundation
   - Remove `.nojekyll` so GitHub Pages/Jekyll processing runs.
   - Create `_config.yml` with site metadata, baseurl/url, collections, defaults, and permalinks.
   - Keep the existing `.github/workflows/jekyll-gh-pages.yml`; verify it builds with GitHub Pages dependencies.
   - Recommended collections: `items`, `pillars`, `kits`, and standard `_posts`.
   - Use `_posts` for dated editorial/review content and `_items` for canonical item records.

2. Create canonical data model for item-centric reviews
   - Create `_items/` with one Markdown file per item already mentioned on the site.
   - Each item front matter should include: `title`, `slug`, `brand`, `product_line`, `model`, `item_type`, `pillar_ids`, `use_cases`, `contexts`, `price`, `sale_price`, `weight`, `capacity`, `score`, `specs`, `retailers`, `related_items`, `alternatives`, `recommended_with`, `appears_in`, `media`, `status`, and `source_notes`.
   - Relationship model should allow many-to-many reuse: an item can belong to multiple pillars, appear in multiple posts, be a comparison row, be in a kit, and be related by use case.
   - Preserve fictional brand naming from `product-list.md` as the canonical vocabulary.

3. Create pillar/category content model
   - Create `_pillars/` or `_data/pillars.yml` for the eight pillars.
   - Recommended: `_pillars/` if each pillar deserves a generated landing page; `_data/pillars.yml` if the taxonomy is mostly navigation metadata. Use `_pillars/` because category pages are first-class surfaces.
   - Each pillar front matter should include: `title`, `slug`, `order`, `item_count`, `short_label`, `description`, `nav_label`, `marquee_label`, `icon_svg_key`, `featured_items`, `related_pillars`, `filters`, and `permalink`.
   - Canonical pillars: Backpack essentials, Desk & office upgrades, Time-saving tools, Meeting & presentation, Notebook & paper systems, Pen & pencil, Business travel kit, Gift guides.

4. Create site data files for repeated numbers and chrome
   - Create `_data/site.yml` for issue number, quarter, version, homepage stats, newsletter stats, sponsorship claim, and footer tagline.
   - Create `_data/navigation.yml` for header nav and footer groupings.
   - Create `_data/authors.yml` for Maya Reyes and Ben C.
   - Create `_data/newsletter.yml` for The Friday Carry copy, perks, reader count, and stats.
   - Create `_data/brand_map.yml` from `product-list.md` for machine-readable real-to-fake mapping and consistency checks.

5. Create layouts and includes
   - Create `_layouts/default.html` for head, header, footer, shared scripts, and content shell.
   - Create `_layouts/home.html` for the homepage sections.
   - Create `_layouts/post.html` for articles, reviews, guides, and carry stories.
   - Create `_layouts/item.html` for canonical item pages.
   - Create `_layouts/pillar.html` for category pages.
   - Create includes for: header, footer, tweaks scripts, category card, product card, article card, tier section, comparison table, newsletter, breadcrumb, inline product callout, box list, stat band, related articles, editor carry card, and placeholder media.
   - Preserve current class names (`product__media`, `tier__head`, `cat__title`, `site-footer`, `kicker`, etc.) to keep CSS stable.

6. Move page-level hard-coded content into generated pages
   - Convert `index.html` into `index.md` or `index.html` with front matter `layout: home`.
   - Convert `article.html` into a dated post for the hybrid backpack feature.
   - Convert `journal.html` into a generated index/listing or alias route, not a duplicate article page.
   - Convert `category.html` into the Backpack essentials pillar page.
   - Convert `catalog.html` into an alias or generated catalog page that reuses the pillar/product loops.
   - Keep `404.html`, but move shared chrome to the default layout where practical.

7. Create initial post set from current site content
   - `2026-05-12-hybrid-worker-backpack-setup.md`: feature/review hybrid, primary item `northline-atelier-tokyo-totepack-compact`, related items in final kit, testing stats from article.
   - `2026-05-10-eleven-desk-gadgets-that-actually-make-you-more-productive.md`: roundup stub from homepage/related cards, pillar `desk-office-upgrades`.
   - `2026-05-08-consultants-clean-laptop-kit.md`: kit/guide stub from homepage/related cards, related kit items.
   - `2026-05-06-business-travel-gear-that-saves-an-hour-every-airport.md`: travel guide stub from related card, pillar `business-travel-kit`.
   - Optional first pass: create item-centric review stubs for top Tier 1 items so item pages can point to real reviews immediately.

8. Create all current item records
   - Fully featured product items: Voltforge 735 Nano II Charger; Northline Atelier Classic Tech Pouch; Auralith WH-1000XM5; Northlamp 1917 Hardcover A5; Voltforge Prime 20K Power Bank; Threadline PowerKnit USB-C Cable; Perchform Laptop Stand v3; Voltforge 555 USB-C Hub; Rellan Safari Rollerball; Orbital Cloudbuds Pro (2nd Gen); Stratus Forge Metro Umbrella; Orbital TraceDot (4-pack).
   - Article/carry context items: Northline Atelier Tokyo Totepack Compact; Aris Day Sling 3; Tern Bexley Synik 22; Orbital Slatebook Air; Orbital Slatebook Pro + sleeve; Mori Standard Slim; Ledgerline notebook; Gridbook; Inkplane Tablet; Compact Umbrella; Voltforge Prime 100W Power Bank; Rellan Pen.
   - Use item slugs consistently in posts, kits, comparison tables, related-items arrays, and homepage featured cards.

9. Wire dynamic Liquid rendering
   - Homepage hero pulls issue/quarter/item counts from `_data/site.yml`.
   - Homepage category grid loops over ordered pillars.
   - Homepage article cards loop over selected posts by front matter flag such as `featured_home: true`.
   - Editor carries pull from `_data/kits.yml` or `_kits/` collection.
   - Category/pillar page pulls items by `pillar_ids`, then groups by tier.
   - Product cards pull item price, weight, media, retailers, and top-pick badge from item front matter.
   - Compare table reads item slugs and table-specific values from category front matter.
   - Article inline products and sidebars resolve item references from post front matter.
   - Related categories/posts resolve via explicit `related_pillars`, `related_posts`, and `related_items` arrays rather than brittle tag-only logic.

10. Wire media and placeholders
   - Create an asset convention under `assets/images/products/`, `assets/images/articles/`, `assets/images/categories/`, and `assets/images/avatars/`.
   - Keep placeholder labels in item/post front matter until real images exist.
   - Include should render placeholder blocks when `media.image` is missing and `<img>` when present.
   - Hard-coded placeholder labels such as `product · charger`, `editorial · hero shot`, and `flat-lay · bag` move into front matter.

11. Maintain route compatibility
   - Decide whether old `.html` URLs should redirect or remain as generated HTML files.
   - Recommended: use clean permalinks (`/articles/.../`, `/items/.../`, `/categories/.../`) and add tiny redirect pages or aliases for `article.html`, `category.html`, `catalog.html`, and `journal.html` if external links matter.
   - Keep `index.html` generated by Jekyll at root.

12. Verification and quality gates
   - Run `bundle exec jekyll build` or GitHub Pages-compatible build.
   - Verify there are no raw Liquid tags in built `_site` output.
   - Verify no real brand names leak except in `product-list.md`/mapping data.
   - Verify every item referenced by a post, kit, tier, comparison table, or related block exists in `_items`.
   - Verify every pillar shown in nav/footer/homepage exists in `_pillars`.
   - Verify generated pages preserve current CSS class names and no text overlaps at desktop/mobile widths.
   - Run accessibility contrast checks after dynamic color/widget changes.

**Relevant files**
- `/Users/tedtschopp/Developer/corporate-carry/index.html` — source for homepage hero, category grid, latest article cards, editor carries, newsletter stats, footer taxonomy.
- `/Users/tedtschopp/Developer/corporate-carry/category.html` — source for pillar/category product tiers, filters, product grid, comparison table, related categories.
- `/Users/tedtschopp/Developer/corporate-carry/catalog.html` — duplicate category/catalog route to collapse into shared Liquid template or alias.
- `/Users/tedtschopp/Developer/corporate-carry/article.html` — source for long-form post layout, inline products, box lists, pull quote, sidebar kit, related articles.
- `/Users/tedtschopp/Developer/corporate-carry/journal.html` — duplicate article/journal route to convert into listing or alias.
- `/Users/tedtschopp/Developer/corporate-carry/styles.css` — shared component CSS; preserve class hooks during Liquid extraction.
- `/Users/tedtschopp/Developer/corporate-carry/tweaks-app.jsx` — theme/tweaks data and widget behavior to keep as client-side include.
- `/Users/tedtschopp/Developer/corporate-carry/tweaks-panel.jsx` — widget component shell to keep as client-side include.
- `/Users/tedtschopp/Developer/corporate-carry/product-list.md` — human-readable brand/product mapping; should remain documentation and optionally seed `_data/brand_map.yml`.
- `/Users/tedtschopp/Developer/corporate-carry/.nojekyll` — remove during implementation so Liquid can process.
- `/Users/tedtschopp/Developer/corporate-carry/.github/workflows/jekyll-gh-pages.yml` — existing build/deploy workflow to validate after migration.

**Front matter contracts**
- Post front matter: `layout`, `title`, `date`, `content_type`, `dek`, `author`, `primary_item`, `items`, `pillars`, `tags`, `read_time`, `hero`, `testing`, `scores`, `inline_products`, `kit`, `comparison`, `related_posts`, `related_items`, `related_pillars`, `featured_home`.
- Item front matter: `layout`, `title`, `slug`, `brand`, `product_line`, `model`, `item_type`, `pillars`, `use_cases`, `contexts`, `price`, `sale_price`, `weight`, `capacity`, `score`, `specs`, `retailers`, `media`, `badges`, `tiers`, `related_items`, `alternatives`, `recommended_with`, `appears_in`.
- Pillar front matter: `layout`, `title`, `slug`, `order`, `item_count`, `description`, `short_label`, `nav_label`, `marquee_label`, `icon`, `filters`, `featured_items`, `tier_groups`, `compare_table`, `related_pillars`, `permalink`.
- Kit/carry front matter or data: `title`, `person`, `role`, `bag_item`, `edited`, `item_count`, `total_weight`, `items`, `context`, `featured_home`.

**Decisions**
- Prefer `_items` collection over only `_data/products.yml` because item pages need canonical URLs and relationships.
- Prefer `_posts` for dated content because GitHub Pages/Jekyll supports it natively and reviews can remain item-centric through `primary_item`/`items` references.
- Prefer `_pillars` collection for category pages because the eight pillars are navigable content surfaces, not just labels.
- Keep React/Babel tweaks client-side for now; do not introduce a JS build pipeline unless later needed.
- Keep existing design-source templates under `.agents/skills/corporate-carry-design` aligned after production migration.

**Further Considerations**
1. Aliases: preserve legacy `.html` URLs with redirect pages if search/shared links matter.
2. Source of truth for products: once `_items` exists, avoid editing product facts in posts unless they are review-specific observations.
3. Validation script: add a small checker later to fail builds when posts reference missing item slugs or legacy brand names.
