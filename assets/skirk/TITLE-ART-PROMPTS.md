# Skirk title artwork v4

Generated with the built-in ImageGen tool from the exact accepted desktop and mobile Skirk concepts. No font rasterization, custom SVG, or programmatic letter drawing was used. Transparent pixels are real alpha.

Final assets:

- `title-lead-v4.png`: 1873×394, exact text `与星海之外，`.
- `title-tail-v4.png`: 1786×419, exact text `共同构建`.

The `*-full.png` files preserve uncropped tool outputs. Final files only crop mostly transparent canvas margins. QA compositing against midnight navy verified clean readable edges; the image viewer's black/checker alpha preview exaggerates faint edge pixels.

Prompt set:

1. Recreate only `与星海之外，`, in one line, as refined oblique Chinese Song/Ming serif lettering matching the supplied concepts. Silver-white faces, delicate ice-lavender bevel/shadow, graceful thin sweeping serifs. No background, decorations, extra words or chunky 3D. Transparent alpha.
2. Refine first result to thinner flatter strokes, remove thick rounded bevel/noisy glow, retain exact text and proper glyph forms. Hairline lavender shadow and icy lower edge only.
3. Use the refined silver fragment as a style reference; replace text with exactly `共同构建`, four characters and no punctuation. Match character height, right-oblique Song serifs and shallow crisp silver material, adding pale ice-cyan lower strokes. Transparent alpha. No extra elements.

Both fragments were visually inspected for the exact characters and composited on `#151830`. The result retains slightly more embossed edge contrast than the concept, and the second fragment's glyphs are naturally wider; size each fragment to the intended visual bounds rather than matching canvas widths.
