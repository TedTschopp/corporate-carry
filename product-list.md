# Product and Brand Mapping (Real -> Alternative-Universe)

Purpose: canonical mapping reference for future content updates so company names, product lines, and model numbers stay aligned.

Status: verified clean across all HTML files in this repo on 2026-05-15 (no remaining matches for prior real-world terms in scanned set).

## Company and Retailer Mapping

| Real      | Fake              |
|-----------|-------------------|
| Amazon    | Meridian Market   |
| Anker     | Voltforge         |
| Apple     | Orbital           |
| Sony      | Auralith          |
| Bellroy   | Northline Atelier |
| Best Buy  | Signal Depot      |
| Huckberry | Granite & Pine    |
| B&H       | Lens & Lantern    |
| Goulet    | Paperwright       |
| Nimble    | Threadline        |
| Roost     | Perchform         |
| Lamy      | Rellan            |
| Blunt     | Stratus Forge     |
| Muji      | Mori Standard     |
| Tom Bihn  | Tern Bexley       |

## Product-Line and Generic Term Mapping

| Real             | Fake             |
|------------------|------------------|
| MacBook          | Orbital Slatebook |
| AirPods          | Orbital Cloudbuds |
| AirTag           | Orbital TraceDot |
| Notion           | Gridbook         |
| Remarkable Paper | Inkplane Tablet  |
| Leuchtturm1917   | Northlamp 1917   |
| Leuchtturm       | Northlamp        |
| Field Notes      | Ledgerline       |
| Aer Day Sling 3  | Aris Day Sling 3 |

## Model-Level Examples (Aligned Transformations)

| Real Product String            | Fake Product String                      |
|--------------------------------|------------------------------------------|
| Sony WH-1000XM5                | Auralith WH-1000XM5                      |
| Apple AirPods Pro (2nd Gen)    | Orbital Cloudbuds Pro (2nd Gen)          |
| Apple AirTag (4-pack)          | Orbital TraceDot (4-pack)                |
| Apple AirTag                   | Orbital TraceDot                         |
| Anker 735 Nano II Charger      | Voltforge 735 Nano II Charger            |
| Anker Prime 20K Power Bank     | Voltforge Prime 20K Power Bank           |
| Anker 555 USB-C Hub            | Voltforge 555 USB-C Hub                  |
| Bellroy Classic Tech Pouch     | Northline Atelier Classic Tech Pouch     |
| Bellroy Tokyo Totepack Compact | Northline Atelier Tokyo Totepack Compact |
| Leuchtturm1917 Hardcover A5    | Northlamp 1917 Hardcover A5              |
| Lamy Safari Rollerball         | Rellan Safari Rollerball                 |
| Nimble PowerKnit USB-C Cable   | Threadline PowerKnit USB-C Cable         |
| Roost Laptop Stand v3          | Perchform Laptop Stand v3                |
| Blunt Metro Umbrella           | Stratus Forge Metro Umbrella             |
| Tom Bihn Synik 22              | Tern Bexley Synik 22                     |
| 13" MacBook Air                | 13" Orbital Slatebook Air                |
| 16" MacBook Pro + sleeve       | 16" Orbital Slatebook Pro + sleeve       |
| Notion + Remarkable Paper      | Gridbook + Inkplane Tablet               |
| Field Notes + Lamy pen         | Ledgerline + Rellan pen                  |

## Extension Rules

1. Apply company mapping first, then product-line terms, then model-level cleanup.
2. Keep model numbers intact unless there is a deliberate naming strategy change.
3. Prefer deterministic substitutions (same source term always maps to the same target).
4. In HTML, encode ampersands as &amp;.
5. After updates, run a scan against legacy terms to confirm zero matches in target files.
