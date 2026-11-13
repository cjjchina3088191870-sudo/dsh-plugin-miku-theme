# Running companions

Three original AI-generated chibi animation sheets based on the Traveler, Skirk and Paimon references. Created with the built-in image generation tool on 2026-11-13. Genshin Impact characters belong to HoYoverse; this fan theme has no official affiliation.

The full generation prompts are retained in [RUNNER-PROMPTS.json](RUNNER-PROMPTS.json).

Each sheet contains six consecutive right-facing run/flight phases, generated as a 3 × 2 grid. The build assets preserve actual alpha transparency and reorder the cells into a lossless 1152 × 192 WebP strip. Each runtime frame is 192 × 192. All six frames retain a fixed cell anchor; no per-frame auto-cropping or stretching.

- `source/aether-run-v1.webp`: blond male Traveler, brown/gold costume, white trailing cape; six run phases.
- `source/skirk-run-v1.webp`: silver hair, crystalline blue ornament, white/violet outfit and boots; six run phases.
- `source/paimon-run-v1.webp`: white hair, gold halo, ivory/rose-gold costume and starry navy cape; six airborne pursuit phases.

The CSS frame loop is independent of the group's horizontal movement. Order moving right: Traveler leads, Skirk follows, Paimon flies behind. The strip uses the existing free space below the native home composer. It disappears in chat, with reduced motion, or when less than 38px of useful height remains. Settings can disable the effect. Hidden documents pause both movement and sprite playback.
