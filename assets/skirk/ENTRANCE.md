# Void-cleave home entrance

An original 2.8-second composited entrance inspired by Skirk's abyss/ice skill aesthetic. Reference: [official character entry and skill showcase](https://wiki.hoyolab.com/pc/genshin/entry/7706?lang=zh-cn). This is a fan interpretation, not footage from the game.

The existing `hero-v3.webp` remains unchanged. A generated transparent crystalline singularity texture (`source/entrance-void-v1.webp`) combines with procedural converging starlight, three narrow cuts, an elliptical shockwave and dispersing crystalline fragments. The texture is original artwork generated with the built-in image generation tool. Its prompt is retained in `ENTRANCE-PROMPT.json`.

Timing: charge 0–1.08s; cleave 1.08–1.6s; settle 1.6–2.8s. After completion the canvas is removed, requestAnimationFrame stops and the figure animation is canceled, restoring the exact static artwork. There is no audio, blocking overlay or repeating timeline.

Plays on first home entry, returning from chat/another page, and requesting a new conversation while already home. Ordinary DOM mutations, changing the viewport and reopening settings do not replay it. Disabling artwork or the entrance option, leaving home, hiding the document, resizing or switching themes cancels any active or pending animation. Reduced-motion settings suppress it. Mobile uses fewer fragments and a lower canvas pixel ratio.
