# ProbeShield Legal — Development Guide

## Project Overview

Marketing landing page, a blog, legal docs (Privacy Policy, Terms of Service), and a handful of standalone
lookup tools (network security checklist, default-password reference, MAC vendor lookup) for the ProbeShield
Android app. Built with Next.js 14 App Router, statically exported, deployed as a plain HTML/CSS/JS site.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Animations:** Framer Motion
- **Styling:** Plain CSS (`app/globals.css`) — no Tailwind, no CSS modules
- **Fonts:** Syne (display) + DM Sans (body) via Google Fonts
- **Output:** Static export (`out/`) — no server required
- **Analytics:** Google Analytics 4 via `NEXT_PUBLIC_GA_ID`, gated behind a Consent Mode v2 banner — nothing
  loads until the visitor accepts (`lib/consent.ts`, `components/ConsentBanner.tsx`)
- **Testing:** Jest + React Testing Library, 80% coverage gate (`__tests__/`)
- **Code quality:** ESLint (`next/core-web-vitals`) + Prettier, enforced by a pre-commit hook

## Commands

```bash
npm run dev # Start dev server (hot reload)
npm run build # check:theme, then build static export → out/
npm start # Serve the built output (preview only)
npm test # Jest with coverage (80% gate: statements/branches/functions/lines)
npm run test:watch # Jest watch mode, no coverage
npm run lint # next lint (next/core-web-vitals + eslint-config-prettier)
npm run format # prettier --write .
npm run format:check # prettier --check . (what the pre-commit hook runs)
npm run typecheck # tsc --noEmit — catches what Jest's SWC transform doesn't (it never type-checks)
npm run check:theme # fails if components/landing/theme.ts and globals.css have drifted
./scripts/install-hooks.sh # Install the pre-commit hook locally (once per clone)
```

## Project Structure

```
app/
  layout.tsx                 # Root layout — fonts, ConsentBanner, global metadata
  page.tsx                   # Landing page — metadata + JSON-LD structured data
  sitemap.ts / robots.ts / manifest.ts
  globals.css                # All styles (Cyber Sentinel design tokens + component styles)
  icon.png                   # Favicon — 512×512 PNG from Android launcher icon
  privacy/page.tsx           # Privacy Policy page
  terms/page.tsx             # Terms of Service page
  blog/page.tsx               # Blog index
  blog/[slug]/page.tsx         # Blog post (generateStaticParams from content/posts)
  checklist/page.tsx           # Interactive network security checklist
  default-passwords/page.tsx    # Default router/device credentials reference
  tools/mac-lookup/page.tsx      # MAC address vendor lookup tool

components/
  landing/                   # The landing page, one component per file (see Key Files below)
  legal/                     # LegalSection, LegalPageHeader — shared by privacy/ and terms/
  Navbar.tsx                 # Shared navbar for every non-landing page
  Footer.tsx                 # Shared footer for legal pages
  ConsentBanner.tsx / CookieSettingsButton.tsx  # Consent Mode v2 UI (lib/consent.ts)
  ChecklistTool.tsx / CredentialsFinder.tsx / MacLookupTool.tsx  # The three interactive tools
  BlogCtaCard.tsx             # Shared CTA card rendered inside blog post bodies

content/posts/                # One file per blog post (typed BlogPost export) + index.ts registry
lib/                          # consent.ts, checklist.ts, defaultCredentials.ts — pure logic, unit-tested
scripts/                      # check-theme-sync.js, ping-indexnow.js — standalone Node CLI tools
__tests__/                    # Jest + React Testing Library, mirrors the app/components/lib tree

public/
  logo.png                   # 512×512 Play Store icon — used in navbar + OG images
```

## Design System

Mirrors the Android app's **Cyber Sentinel** palette exactly (`AppColors.kt`):

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#051424` | Page background |
| `--bg-card` | `#0d1c2d` | Card backgrounds |
| `--bg-card2` | `#122131` | Elevated cards |
| `--bg-high` | `#1c2b3c` | Highest surface |
| `--primary` / `--cyan` | `#4bdcc1` | Cyber Teal — primary accent |
| `--text` | `#d4e4fa` | Primary text |
| `--text-secondary` | `#bbcac4` | Secondary text |
| `--muted` | `#85948f` | Muted / placeholder text |
| `--border-subtle` | `#3c4a46` | Subtle dividers and card borders |
| `--risk-critical` | `#FF3B3B` | Risk indicator |
| `--risk-high` | `#FF6B35` | Risk indicator |
| `--risk-medium` | `#FFB800` | Risk indicator |
| `--risk-low` | `#4FC3F7` | Risk indicator |
| `--risk-safe` | `#00C896` | Risk indicator |

CSS class prefixes:
- `.lp-*` — landing page layout classes
- No prefix — legal page classes (navbar, page-wrapper, toc, etc.)

## Environment Variables

```bash
# .env.local (gitignored — never commit)
NEXT_PUBLIC_GA_ID=G-MRWMD50MC5
NEXT_PUBLIC_API_URL=http://localhost:8080
```

`NEXT_PUBLIC_GA_ID` — GA scripts are guarded and only inject once the visitor accepts the consent banner, so
local dev without the var is safe either way. Set it in your hosting platform's env vars for production.

`NEXT_PUBLIC_API_URL` — base URL for `probeshield-api` (see `../probeshield-api`), used by `MacLookupTool.tsx`'s
vendor lookup. Defaults to `http://localhost:8080` if unset; production is `https://api.probeshield.com`.

Copy `.env.example` when onboarding.

## Key Files

### `app/layout.tsx`
Root layout. Handles:
- Global metadata (title template, OG, Twitter card, icons)
- Google Fonts preconnect + stylesheet
- GA4 scripts (`afterInteractive` strategy — non-blocking)

### `app/page.tsx`
Server component. Exports page-level metadata and injects the JSON-LD `@graph`:
- `SoftwareApplication` schema (Play Store link, feature list, pricing)
- `Organization` schema
- `WebSite` schema
- `FAQPage` schema

Renders `<LandingPage />` client component.

### `components/landing/`
Was a single 1,150-line `components/LandingPage.tsx` — split one component per file (see
`.claude/plan/code-quality-refactor-plan.md` for the full rationale). `index.tsx` is the only file with
`'use client'` and composes the rest, in order:
1. `LandingNav` — fixed, glassmorphism on scroll
2. `HeroSection` — shield pulse, headline, CTA (uses `HeroShield`, `DownloadBtn`, `FloatingScanLines`)
3. `StatsBar` — 4 animated stat counters
4. `FeaturesSection` — 6 feature cards (staggered scroll reveal)
5. `RiskSection` — 5-tier risk bars (animated width on scroll)
6. `PrivacySection` — privacy promise card
7. `HowItWorksSection` — 3-step cards
8. `CtaSection` — final download CTA
9. `LandingFooter`

Shared across these: `animations.ts` (`ease`/`fadeUp`/`stagger`), `theme.ts` (the `T` color object — **must stay
in sync with `globals.css`'s CSS custom properties**, enforced by `scripts/check-theme-sync.js` at build time),
`data.tsx` (`FEATURES`/`RISK_LEVELS`/`STEPS`/`STATS`/`TRUST_BADGES`/`PRIVACY_ITEMS`), and `useScrollReveal.ts`
(the `useRef` + Framer Motion `useInView` hook every scroll-reveal section uses).

### `app/globals.css`
Single CSS file. Two logical sections:
- **Legal page styles** — navbar, page-wrapper, toc, legal-section, contact-card, footer
- **Landing page styles** — `.lp-*` grid/layout classes + responsive breakpoints

## Google Play Link

All download CTAs point to:
```
https://play.google.com/store/apps/details?id=com.probeshield
```

Update it in `components/landing/DownloadBtn.tsx` if the Play Store URL changes — that's the single source
other CTAs render through (`HeroSection`, `CtaSection`, `LandingNav`). `components/BlogCtaCard.tsx` and
`components/Footer.tsx`/`components/landing/LandingFooter.tsx` hardcode it separately and need updating too.

## URL conventions (read before touching metadata/sitemap)

`next.config.js` sets `trailingSlash: true`. Every route except the root is
served at `/path/` and 308-redirects from `/path` (no slash) — Cloudflare
Pages enforces this at the edge to match the static export's `path/index.html`
file layout. `next/link` already respects this automatically in rendered
`href`s; it's only ever a problem in **hardcoded URL strings** — `app/sitemap.ts`,
each page's `alternates.canonical`, and any JSON-LD `url`/`@id` field. All of
those must include the trailing slash (except the bare root). A sitemap entry
or canonical tag that points at a URL which just redirects elsewhere is
exactly what Google Search Console flags as "Page with redirect" — this
happened for real here once (every non-root sitemap URL was wrong) before
being caught and fixed; don't reintroduce it when adding a new page.

**www/apex**: both `probeshield.com` and `www.probeshield.com` are attached
as custom domains on the same Cloudflare Pages project, and currently both
serve `200` directly — there is no host-level redirect consolidating them,
only a self-referencing canonical tag (soft signal, not a hard fix). Fixing
this requires a zone-level Cloudflare **Redirect Rule** ("Redirect from WWW
to root" template, dashboard → zone → Rules → Redirect Rules) — not a
`public/_redirects` file, which is path-only and cannot match by hostname.
Nobody has set this up yet; it's not in the repo and won't be found by
searching the codebase.

## Deployment

The site is a fully static export. No Node.js server needed in production.

```bash
npm run build   # generates out/
```

Deploy the `out/` directory to any static host:

| Platform | Config |
|---|---|
| Vercel | Auto-detected; set env vars in Project Settings |
| Netlify | Publish dir: `out`, build cmd: `npm run build` |
| GitHub Pages | Push `out/` to `gh-pages` branch |
| Cloudflare Pages | Build cmd: `npm run build`, output: `out` |

## Logo / Favicon

Both sourced from the Android app's Play Store icon (`ic_launcher-playstore.png`, 512×512):

```bash
# To refresh from Android source:
cp ../probeshield-app/app/src/main/ic_launcher-playstore.png public/logo.png
cp ../probeshield-app/app/src/main/ic_launcher-playstore.png app/icon.png
```

## Legal Pages

- `/privacy` — Privacy Policy (`app/privacy/page.tsx`)
- `/terms` — Terms of Service (`app/terms/page.tsx`)

Both use the shared `Navbar` and `Footer` from `components/`, and `LegalPageHeader`/`LegalSection` from
`components/legal/` for the header block and each numbered section — `LegalSection` derives both
`id="section-N"` and the visible "Section 0N" label from one `number` prop, so sections can be inserted,
removed, or reordered without the two drifting out of sync (see `.claude/rules/components.md`). They use the
`.page-wrapper`, `.toc`, `.legal-section` CSS classes defined in `globals.css`.

## Testing & Code Quality

- `npm test` runs Jest with coverage; the pre-commit hook (`scripts/hooks/pre-commit`, installed via
  `./scripts/install-hooks.sh`) blocks the commit if coverage drops below 80% on any of
  statements/branches/functions/lines, or if format/lint/typecheck fail.
- Coverage is measured across the whole codebase (`collectCoverageFrom` in `jest.config.js`), not just
  whatever files a test happens to import — `scripts/` is the one deliberate exclusion (standalone Node CLI
  tools, verified by hand instead).
- `jest.setup.js` polyfills things jsdom doesn't provide: `IntersectionObserver` (Framer Motion's `useInView`
  needs one to exist, even though jsdom can't fire real intersection events) and `TextEncoder`/`TextDecoder`
  (`react-dom/server`'s browser build needs them). `NEXT_PUBLIC_GA_ID` also defaults to a test value there, so
  consent-gated components don't need `jest.resetModules()` to test — that call resets React's own module
  instance too and breaks hooks; see `.claude/rules/testing.md`.
- Rule files live in `.claude/rules/`: `testing.md`, `code-style.md`, `components.md`.
