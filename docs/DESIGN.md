# Design System — CFB26 Playbook Library

> Snapshot of this site's **current** design as implemented, documented so a designer or agent can understand the visual system without reading source. Generated 2026-08-14 as part of a cross-site design inventory; source of truth is always the files listed in §Source Files.

## At a Glance
| | |
|---|---|
| Live URL | https://davevoyles.github.io/College-Football-26-Playbooks-site/ |
| Stack / framework | Static multi-page HTML site (no build step, no bundler). Three.js (via `unpkg` ES module CDN, versions 0.165.0–0.167.1 depending on page) for the WebGL visualizations. PWA (`manifest.webmanifest` + `sw.js` service worker) for offline support. |
| Styling approach | CSS custom properties (design tokens) in `assets/styles/theme.css`, consumed by a large `<style>` block embedded in each page's `<head>`. No Tailwind, no CSS-in-JS, no preprocessor — hand-written CSS throughout. |
| Theme modes | Both light and dark, switched via `html[data-theme="dark"]` attribute selector. No visible in-page toggle control exists — theme is set once on load from a `clawpilotTheme` URL query param, else `prefers-color-scheme`, and is not user-adjustable from the UI despite the README's "palette cycling" claim (see Design Debt). |
| Overall vibe | Film-room / broadcast-graphics aesthetic: navy-and-Carolina-blue "UNC Tar Heels" palette, dark hero sections with radial glows, card grids with hover-lift, and WebGL football-field scenes rendered in bright turf green with neon-bright player/route markers. |

## Color Palette
Real values from `assets/styles/theme.css`. The file's own header comment labels this the "UNC Tar Heels color palette."

### Light mode (`:root`)
| Token / usage | Hex | Where defined | Notes |
|---|---|---|---|
| Primary / brand | `#13294B` (Navy Blue) | `assets/styles/theme.css:18` (`--cp-accent`) | Also used as `--cp-text`, `--cp-link` |
| Background | `#f7f4ef` | `assets/styles/theme.css:9` (`--cp-bg`) | Warm off-white |
| Surface / card | `#ffffff` | `assets/styles/theme.css:11` (`--cp-surface`) | `--cp-surface-soft: #f5f5f5` |
| Text primary | `#13294B` | `assets/styles/theme.css:15` (`--cp-text`) | |
| Text secondary | `#4a5c6a` / `#5e7080` | `assets/styles/theme.css:16-17` (`--cp-text-muted`, `--cp-text-soft`) | |
| Accent(s) | `#7BAFD4` (Carolina Blue) | `assets/styles/theme.css:14` (`--cp-border-strong`) | Also `--cp-accent-soft: rgba(123,175,212,.12)` |
| Success / warn / error | `#16a34a` / `#f59e0b` / `#dc2626` | `assets/styles/theme.css:22-24` | |

### Dark mode (`html[data-theme="dark"]`)
| Token / usage | Hex | Where defined | Notes |
|---|---|---|---|
| Primary / brand | `#7BAFD4` (Carolina Blue) | `assets/styles/theme.css:45` (`--cp-accent`) | Brand roles flip: blue becomes the accent, navy becomes the surface |
| Background | `#0e1e33` | `assets/styles/theme.css:36` (`--cp-bg`) | |
| Surface / card | `#13294B` | `assets/styles/theme.css:38` (`--cp-surface`) | `--cp-surface-soft: #1a3358` |
| Text primary | `#e0eaf2` | `assets/styles/theme.css:42` (`--cp-text`) | |
| Text secondary | `#8D9092` (Silver) / `#a8b8c4` | `assets/styles/theme.css:43-44` | |
| Accent(s) | `#7BAFD4` | `assets/styles/theme.css:41,45` (`--cp-border-strong`, `--cp-accent`) | |
| Success / warn / error | `#4ade80` / `#fbbf24` / `#f87171` | `assets/styles/theme.css:49-51` | |

### WebGL visualization palette (not theme tokens — hardcoded per-scene hex, in `visualizations/*.html`)
| Usage | Hex | Where defined |
|---|---|---|
| Field turf (hardcoded scenes) | not fixed — varies per file (see Design Debt) | e.g. `visualizations/webgl-formations.html` |
| Route — deep (go/post/corner) | `#ef476f`, `#e63946`, `#ffd166` | `visualizations/webgl-route-tree.html:241-253` |
| Route — intermediate (dig/out/curl) | `#06d6a0`, `#118ab2`, `#8338ec` | `visualizations/webgl-route-tree.html:259-271` |
| Route — short (flat/screen/check) | `#2d6a4f`, `#ff6b35`, `#4dabf7`, `#f7b267` | `visualizations/webgl-route-tree.html:277-295` |
| Offensive line | `#888888` | `visualizations/webgl-formations.html:301` |
| QB | `#ffd700` | `visualizations/webgl-formations.html:306` |
| Skill positions (RB / WR) | `#4dabf7`, `#ef476f`, `#ff7f9a` | `visualizations/webgl-formations.html:307-311` |
| Defensive line | `#ff4444` | `visualizations/webgl-coverage.html:251` |
| Linebackers / safeties | `#ff8800`, `#ffd166` | `visualizations/webgl-coverage.html:255-279` |
| Corners (man coverage) | `#4dabf7` | `visualizations/webgl-coverage.html:257-278` |
| PWA theme color | `#2d6a4f` | `manifest.webmanifest:9` (`theme_color`); background `#0d1b2a` |

## Typography
| Role | Family | Size / scale | Weight | Where defined |
|---|---|---|---|---|
| Body (global default) | `Aptos, "Segoe UI", Calibri, -apple-system, BlinkMacSystemFont, sans-serif` | browser default (~16px) | 400 | `assets/styles/theme.css:63` |
| Body (per-page override, most guide pages) | `"Segoe UI", Aptos, Calibri, -apple-system, BlinkMacSystemFont, sans-serif` | — | 400 | e.g. `air-raid.html:33`, `pro-style.html:33`, `spread.html:33`, `west-coast.html:33`, `option.html:24`, `run-and-shoot.html:24`, `veer-and-shoot.html:24`, `teams.html:26`, `call-sheet.html:26`, `routes.html:26` — note the font order is reversed vs. `theme.css` (see Design Debt) |
| Headings (hero, `index.html`) | inherits body stack | `clamp(2rem, 5vw, 3.8rem)` (h1), `1.5rem` (h2) | 700 (via inline styles/badges) | `index.html:100,124` |
| Mono / data (playbook diagrams, formation notation) | `Consolas, "Courier New", Courier, monospace` | — | 400 | e.g. `air-raid.html:227`, `pro-style.html:227`, `spread.html:227`, `west-coast.html:227`, `option.html:218`, `run-and-shoot.html:218`, `veer-and-shoot.html:218` |

Type scale notes: no formal rem-based type scale or CSS custom-property font tokens exist; sizes are set ad hoc per page/component (mostly `rem` and `clamp()` for hero text, `0.8rem`–`1.5rem` fixed values elsewhere). No explicit `line-height` or `letter-spacing` scale beyond one-off values (e.g. hero `letter-spacing: -0.03em`, nav labels `letter-spacing: 0.06em`).

## Spacing & Layout
- Grid / container: `main` uses `width: min(calc(100% - 2 * var(--page-gutter)), 1100px)` centered with `margin: 0 auto` (`index.html:29-35`); `--page-gutter: clamp(1rem, 2vw, 1.5rem)`. Nav bar container caps at `max-width: 1200px` (`assets/styles/site-nav.css:28`).
- Breakpoints: primarily one mobile breakpoint, `@media (max-width: 600px)` (`index.html:193`), used to collapse card grids to a single column; a few pages use `640px`, `700px`, `920px` for prose max-widths.
- Spacing scale: no formal token scale — values are ad hoc `rem` (`0.25rem`, `0.35rem`, `0.5rem`, `0.75rem`, `1rem`, `1.25rem`, `1.5rem`, `2rem`) chosen per component, plus `clamp()` for a couple of responsive gaps (`--section-gap: clamp(1.5rem, 3vw, 2.5rem)`).
- Border radius conventions: small controls (badges, pills) use `999px` (fully rounded); cards/buttons use `0.5rem`–`0.75rem`; large containers (hero, sections) use `1rem`. No radius token variable exists — values are repeated as raw numbers per component.
- Shadow / elevation conventions: `--cp-shadow: 0 18px 48px rgba(...)` token exists in `theme.css` and is used for the hero (`index.html:50`), but cards and sections in the same file use separate hand-rolled shadow values (`0 4px 16px rgba(0,0,0,.18)`, `0 2px 8px rgba(0,0,0,.12)`, `0 8px 24px rgba(123,175,212,.18)` on hover) rather than the shared token.

## Components
- **Nav bar** (`assets/styles/site-nav.css`, `assets/scripts/site-nav.js`): fixed top bar with backdrop blur (`.site-nav`), animated hamburger toggle (always visible, no desktop inline variant — `pulse-glow` keyframe draws attention), and a dropdown menu grouped by section (`.site-nav__group`) with pill-style links (`.site-nav__link`) that highlight on hover/active via `aria-current="page"`.
- **Hero** (`index.html`): full-bleed dark gradient panel with a WebGL canvas background (`.hero__canvas`) and a CSS-gradient fallback (`.hero__fallback`) shown before/without WebGL, an eyebrow pill, and clamp-scaled display heading.
- **Cards** (`index.html` `.card`, reused pattern across scheme-guide/team/route pages): bordered panel (`2px solid rgba(123,175,212,.5)`), emoji glyph + badge topline, title, description, footer CTA with arrow; lifts (`translateY(-3px)`) and glows on hover/focus.
- **Badges/pills**: `border-radius: 999px`, tinted background using `--cp-accent-soft`, used for personnel groupings (e.g. "10/11") and nav group labels.
- **Section wrapper** (`.section`): bordered (`2px solid #7BAFD4` — a hardcoded hex duplicate of `--cp-border-strong` rather than the token itself), translucent navy background, used to group each homepage content block.
- **WebGL scene panel** (`visualizations/*.html`): canvas-based 3D field diagram with `OrbitControls`, typically paired with a legend/HUD overlay and play-by-play narration text; some scenes read field/marker colors from CSS theme tokens at runtime, others hardcode hex (see Design Debt).
- **Playbook diagram blocks** (scheme guide pages, e.g. `air-raid.html`): monospace-font formation/route call-outs styled as code blocks.

## Motion & Interaction
- Card hover/focus: `transform: translateY(-3px)` + border-color + box-shadow transition, `180ms ease` (`index.html:144-151`).
- Nav hamburger: continuous `pulse-glow` keyframe animation (2.5s loop) on the toggle button until hovered/focused, plus a 200ms open/close animation on the dropdown menu (`opacity`/`transform`) and a 200ms hamburger-to-X icon transform (`assets/styles/site-nav.css:56-146`).
- Nav links: 150ms ease color/border/background transitions on hover/focus-visible.
- Smooth scroll: `html { scroll-behavior: smooth; }` (`assets/styles/theme.css:61`).
- WebGL scenes: continuous `requestAnimationFrame` render loops with `OrbitControls` damping for camera drag/orbit; some scenes (e.g. route tree, pre-snap reads) animate ball/route/defender motion as part of the play narration.
- No `prefers-reduced-motion` handling found anywhere in the codebase (see Design Debt).

## Imagery & Iconography
- Logo/icon: single SVG at `assets/icons/icon.svg`, referenced as the PWA manifest icon (`purpose: "any maskable"`) and as the nav brand badge.
- No photography — all "imagery" is generated: CSS gradients (hero backgrounds, fallback panels) and Three.js-rendered 3D scenes (field, players, routes, ball).
- Iconography is emoji-based throughout (🏈 🎯 🧱 🏃 🌊 🎲 🚀 🦵 for scheme cards, 👀 for read call-outs in visualizations) rather than an SVG icon set — a deliberate, low-effort but consistent choice site-wide.

## Accessibility Notes
- Nav toggle and links use `aria-expanded`, `aria-current="page"`, and visible `:focus-visible` states with accent-colored outlines/borders — a genuine strength.
- Hero canvas and decorative fallback are marked `aria-hidden="true"` appropriately.
- No `prefers-reduced-motion` media query found anywhere in `assets/styles/*.css` or the embedded page `<style>` blocks — the nav's looping `pulse-glow` animation and all WebGL camera/scene motion run unconditionally for motion-sensitive users.
- Dark-mode text/background pairs (e.g. `#e0eaf2` on `#0e1e33`) read as high contrast; light-mode body text (`#13294B` on `#f7f4ef`) is also comfortably high contrast. Muted text tokens (`--cp-text-muted`, `--cp-text-soft`) were not checked against WCAG ratios individually.
- Theme is not user-togglable in the rendered UI (see Design Debt), so users who prefer a mode different from their OS setting have no in-page way to switch it.

## Known Inconsistencies / Design Debt
- **README overstates theme control:** `README.md` advertises "Dark/light mode with palette cycling," but no visible toggle button/control exists in any page — `assets/scripts/theme.js` only reads a `clawpilotTheme` URL param or `prefers-color-scheme` once on load, with no runtime cycling UI.
- **Font stack order flips between files:** `assets/styles/theme.css:63` declares `Aptos, "Segoe UI", ...` while nearly every individual page (`air-raid.html`, `pro-style.html`, `spread.html`, `west-coast.html`, `option.html`, `run-and-shoot.html`, `veer-and-shoot.html`, `teams.html`, `call-sheet.html`, `routes.html`) redeclares the body font with the order reversed (`"Segoe UI", Aptos, ...`), overriding the shared token stylesheet with a near-duplicate, unsynced value.
- **Two conflicting color strategies in the WebGL visualizations:** `visualizations/webgl-pre-snap.html` and `webgl-blitz.html` derive Three.js colors at runtime from the page's CSS custom properties (`getComputedStyle(...).getPropertyValue(...)`), so they follow light/dark theme automatically. `webgl-formations.html`, `webgl-route-tree.html`, and `webgl-run-plays.html` hardcode raw hex values (`0xef476f`, `0x4dabf7`, etc.) directly in JS with no theme awareness. `webgl-coverage.html` and `webgl-play-concepts.html` mix both approaches in the same file. This means some 3D scenes re-theme with the site and others don't.
- **Three.js version drift:** the import map pins different Three.js versions per page — `index.html` imports `three@0.165.0`, `visualizations/webgl-formations.html` imports `three@0.167.1`; other visualization pages were not individually diffed for version but should be audited together.
- **Shadow token defined but not consistently used:** `--cp-shadow` exists in `theme.css` and is used once (hero), while cards/sections in `index.html` define their own one-off `box-shadow` values instead of referencing or extending the token.
- **`.section` border color hardcoded instead of tokenized:** `index.html:117` uses `border: 2px solid #7BAFD4` where `var(--cp-border-strong)` (same value) would keep it in sync with theme mode automatically instead of being pinned to the light/dark-shared literal.
- **No reduced-motion handling:** the always-on hamburger pulse animation and WebGL camera/scene motion have no `prefers-reduced-motion` fallback anywhere in the codebase.
- **No shared type/spacing scale:** font sizes, spacing, and border-radius values are hand-picked per component/page rather than drawn from a documented scale or CSS custom-property system (only color has a token layer).

## Source Files
- `assets/styles/theme.css` — root color tokens (light + dark), base body/link/scroll styles
- `assets/styles/site-nav.css` — nav bar, hamburger toggle, dropdown menu, link states
- `assets/scripts/theme.js` — theme mode resolution (URL param / system preference) on load
- `assets/scripts/site-nav.js` — nav toggle/menu interaction behavior
- `assets/icons/icon.svg` — site icon / PWA icon
- `manifest.webmanifest` — PWA metadata, `theme_color` / `background_color`
- `index.html` — homepage hero, section/card component styles (embedded `<style>` block)
- `air-raid.html`, `pro-style.html`, `spread.html`, `west-coast.html`, `option.html`, `run-and-shoot.html`, `veer-and-shoot.html` — scheme guide pages, each with an embedded `<style>` block (font stack, mono code blocks)
- `teams.html`, `routes.html`, `call-sheet.html` — supporting tool pages, each with an embedded `<style>` block
- `visualizations/webgl-formations.html`, `webgl-coverage.html`, `webgl-play-concepts.html`, `webgl-pre-snap.html`, `webgl-route-tree.html`, `webgl-run-plays.html`, `webgl-blitz.html` — Three.js WebGL scenes (field/route/player colors, camera/animation conventions)
