# Vidusahan Perera — Portfolio
<!-- 
An AI-operating-system-styled personal portfolio. Built as a phased project — this
repo currently ships **Phase 01: Loading Sequence + Hero/Landing** in a proper
Next.js/TypeScript codebase, structured so each future phase (About, Tech Universe,
Projects, Research, Experience, AI Assistant, Contact) can land as its own PR/version.

## Tech stack

| Layer      | Choice                                          |
|------------|--------------------------------------------------|
| Framework  | Next.js 16 (App Router, Turbopack)               |
| UI         | React 19, TypeScript (strict)                    |
| Styling    | Tailwind CSS v4 (CSS-first `@theme` tokens)      |
| Animation  | Native CSS transitions + Canvas 2D (particles), `framer-motion` available for future scroll/section work |
| Fonts      | `next/font/google` — Space Grotesk / Inter / JetBrains Mono |
| Lint/Format| ESLint (flat config) + Prettier                  |
| Deploy     | Vercel (recommended)                             |

> Three.js/R3F, Supabase, and the RAG-powered AI assistant from the original brief are
> **not** wired up yet — they're scoped for later phases (see `ROADMAP.md`) so each
> integration lands deliberately instead of as one unreviewable mega-commit.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run dev` uses Turbopack (default in Next 16).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
npm run format  # prettier --write
```

Requires Node.js ≥ 20.9 (LTS).

## Project structure

```
src/
  app/
    layout.tsx        # fonts, metadata, JSON-LD — server component
    page.tsx           # composes Loader + Header + Hero + teaser — client component
    globals.css        # Tailwind v4 @theme tokens (design system) + base styles
  components/
    loader/Loader.tsx           # VP-monogram particle formation + progress + burst
    nav/Header.tsx               # sticky/blur nav, scroll-aware
    nav/MobileNav.tsx            # fullscreen mobile menu
    hero/Hero.tsx                 # kinetic heading, layout, scroll indicator
    hero/HeroCanvas.tsx           # flow-field particle cloud (canvas 2D)
    hero/RoleRotator.tsx          # rotating role titles
    ui/MagneticButton.tsx         # shared magnetic/spotlight button primitive
    sections/NextTeaser.tsx       # "coming next" phase teaser
    layout/MeshGradient.tsx       # ambient background blobs
    layout/Atmosphere.tsx        # grain + vignette overlay
    layout/Footer.tsx
  hooks/
    useReducedMotion.ts
    useScrolled.ts
  lib/
    constants.ts        # site copy, nav links, role list — single source of truth
    flowField.ts         # hero particle math (pure functions, unit-testable)
    textParticles.ts     # canvas text-to-points sampling for the loader
```

Design tokens (colors, fonts, easing) live in `src/app/globals.css` under `@theme` —
Tailwind v4 generates utility classes (`bg-cyan`, `font-display`, `ease-signature`, etc.)
directly from those variables, so there's one place to retheme the whole site.

## Git workflow for versioning phase-by-phase

Suggested flow, since you're shipping this section by section:

1. **Branch per phase**: `feat/about-section`, `feat/tech-universe`, `feat/projects`, etc.
2. **Conventional commits**: `feat(hero): add magnetic CTA spotlight`, `fix(loader): resolve font probe race`.
3. **Tag a release per phase** once merged to `main`:
   ```bash
   git tag -a v0.1.0 -m "Phase 01: Loader + Hero"
   git push origin v0.1.0
   ```
4. Bump `package.json` `"version"` to match the tag, and add an entry to `CHANGELOG.md`.
5. Connect the repo to Vercel for preview deployments on every PR — the fastest way to
   review motion/animation work, which doesn't show well in a diff.

`ROADMAP.md` tracks what's built vs. planned so commit history stays intentional
instead of one continuous unstructured stream.

## Accessibility & performance notes

- `prefers-reduced-motion: reduce` is respected globally (see `globals.css` and the
  `useReducedMotion` hook) — particle counts drop, the loader shortens, and CSS
  transitions collapse to near-instant.
- Visible focus states (`:focus-visible`) are set globally; a skip-to-content link is
  present.
- The hero canvas and loader canvas both scale for `devicePixelRatio` (capped at 2x) and
  clean up their `requestAnimationFrame` loops and event listeners on unmount.
- Canvas particle counts step down on narrow viewports (`particleCountFor` in
  `lib/flowField.ts`) to protect mobile frame rate.

## Deployment

Push to GitHub, then import the repo in Vercel — zero config needed beyond the defaults
(`next build` / `next start`). Add environment variables there once later phases need
them (Supabase, LLM API keys for the AI assistant, analytics IDs). -->
