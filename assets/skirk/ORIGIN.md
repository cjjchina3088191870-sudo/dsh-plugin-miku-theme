# Skirk artwork

Generated with the built-in imagegen tool for the selected Stellar Orbit concept (2026-11-12).

- Standing character: transparent full silhouette, silver-white hair, red-violet eyes, white and indigo costume, crystalline arm, holding a star. Used on home and right chat edge.
- Seated character: transparent silhouette seated on a small amethyst rock, sword down, same identity and costume. Used on left chat edge.
- Backdrop: midnight navy-violet abyss, star orbits at edges, sparse crystal architecture, reflective lower horizon; no text or characters. Used as the app background.
- Composer frame: transparent center, fine silver beveled rails, violet crystal corners and restrained cyan bottom glow. Used as a nine-slice border image.

Art references: user-supplied Skirk character poster and accepted desktop/home/mobile concepts. Character and trademarks belong to HoYoverse. UI icons come from Tabler Icons (MIT). Runtime filenames are SHA-256 content hashes.

Refinement assets: regenerated open-center six-corner shortcut rim, larger crystalline input rim, blank cyan/amethyst send gemstone, and a low-contrast faceted glass interior. All were generated with the built-in imagegen tool from the accepted concept. The title font is a subset of Noto Serif CJK SC (OFL), bundled for consistent rendering across operating systems. See THIRD_PARTY_LICENSES/Noto-CJK-LICENSE.

## Reference fidelity revision — 2026-11-13

Built-in ImageGen was used for these separate production assets, using the two exact user-supplied desktop/mobile concept images as references:

- `source/hero-v3.webp` from `work/skirk-assets/exact-hero.png`: background extraction, preserve the same Skirk face, costume, head tilt and raised open crystalline palm; remove every UI/background element; transparent background; no orb. Hair edges and the UI-obscured lower silhouette were reconstructed.
- `source/starfield-v3.webp` from `work/skirk-assets/exact-starfield.png`: remove characters and UI, retain the large faceted violet crystal disk, blue ticked orbital ring, upper-right constellation, perimeter shards and reflective star sea.
- `source/mobile-starfield.webp` from `work/skirk-assets/mobile-starfield.png`: a dedicated portrait composition with the ring behind the right-side figure, faint abyss architecture on the left, quiet indigo nebula and reflective crystal water at the bottom. UI and characters are separate layers.

The standing/star-orb asset is now used only at the right edge of the conversation view; the home scene uses the new open-palm hero. The mobile seated figure is a faint secondary layer. CSS masks only blend the cutout's lower edge into the existing backdrop. Standard UI glyphs remain Tabler Icons; `plus`, `message`, `stack-2`, `chevron-down`, `x`, `menu-2`, `brain`, `send`, and `paperclip` were sourced from the official Tabler repository under its MIT license.


## Silver/ice lettering revision — 2026-11-13

Two transparent title fragments were generated with the built-in ImageGen tool, using the exact accepted concept lettering as the reference. The first is exactly `与星海之外，` in oblique silver-white Song/Ming lettering with a shallow lavender bevel. The second is exactly `共同构建`, matched to the first with pale ice-cyan lower strokes. A targeted refinement reduced the first result’s heavier extrusion and glow. The final pair retains a slightly stronger embossed edge than the concept. Only transparent canvas margins were trimmed; deployment uses WebP copies `source/title-lead-v4.webp` and `source/title-tail-v4.webp`. Original H1 text remains available to assistive technology, and untranslated headings retain the text fallback. Complete prompts are in `TITLE-ART-PROMPTS.md`.
