# Svelte interaction pass

## Goal
Preserve the approved dark, sparse two-column portfolio while converting the production source to Svelte and adding only a few subtle, reference-informed interactions that feel native to the content.

## Constraints
- GitHub Pages continues serving `web-design-cv:/docs` with `docs/CNAME` intact.
- No preloader, scroll hijacking, 3D scene, carousel, slow-scroll library, or interaction-only content.
- Keyboard, touch, and `prefers-reduced-motion` behavior remain first-class.
- Preserve the existing semantic content, quick-links modal accessibility, contact paths, and mobile layout.
- Do not push; create a local verified commit only.

## Implementation slices
1. Add a Vite + Svelte source project at repository root whose production build emits into `docs/`.
2. Port the approved page into focused Svelte components/data without redesigning the page.
3. Integrate 1–3 interaction patterns selected from the supplied references after parallel research.
4. Add lightweight browser-visible checks for build output, keyboard modal behavior, interaction behavior, reduced-motion, and desktop/mobile overflow.
5. Build `docs/`, review generated assets and CNAME/contact preservation, then commit the verified result.
