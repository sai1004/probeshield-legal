# ProbeShield Legal — Development Guide

## Project Overview

Marketing landing page + legal docs (Privacy Policy, Terms of Service) for the ProbeShield Android app.
Built with Next.js 14 App Router, statically exported, deployed as a plain HTML/CSS/JS site.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Animations:** Framer Motion
- **Styling:** Plain CSS (`app/globals.css`) — no Tailwind, no CSS modules
- **Fonts:** Syne (display) + DM Sans (body) via Google Fonts
- **Output:** Static export (`out/`) — no server required
- **Analytics:** Google Analytics 4 via `NEXT_PUBLIC_GA_ID`

## Commands

```bash
npm run dev      # Start dev server (hot reload)
npm run build    # Build static export → out/
npm start        # Serve the built output (preview only)
```

## Project Structure

```
app/
  layout.tsx          # Root layout — fonts, GA scripts, global metadata
  page.tsx            # Landing page — metadata + JSON-LD structured data
  globals.css         # All styles (Cyber Sentinel design tokens + component styles)
  icon.png            # Favicon — 512×512 PNG from Android launcher icon
  privacy/page.tsx    # Privacy Policy page
  terms/page.tsx      # Terms of Service page

components/
  LandingPage.tsx     # Full animated landing page (client component)
  Navbar.tsx          # Shared navbar for legal pages (/privacy, /terms)
  Footer.tsx          # Shared footer for legal pages

public/
  logo.png            # 512×512 Play Store icon — used in navbar + OG images
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
```

Set this in your hosting platform's env vars for production. GA scripts are guarded — they only inject when the variable is present, so local dev without the var is safe.

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

### `components/LandingPage.tsx`
`'use client'` — all animation logic lives here. Sections in order:
1. `LandingNav` — fixed, glassmorphism on scroll
2. `HeroSection` — shield pulse, headline, CTA
3. `StatsBar` — 4 animated stat counters
4. `FeaturesSection` — 6 feature cards (staggered scroll reveal)
5. `RiskSection` — 5-tier risk bars (animated width on scroll)
6. `PrivacySection` — privacy promise card
7. `HowItWorksSection` — 3-step cards
8. `CtaSection` — final download CTA
9. `LandingFooter`

All scroll animations use `useInView` + Framer Motion `whileInView` variants. The `fadeUp` and `stagger` presets are defined at the top of the file.

### `app/globals.css`
Single CSS file. Two logical sections:
- **Legal page styles** — navbar, page-wrapper, toc, legal-section, contact-card, footer
- **Landing page styles** — `.lp-*` grid/layout classes + responsive breakpoints

## Google Play Link

All download CTAs point to:
```
https://play.google.com/store/apps/details?id=com.probeshield
```

Update this in `components/LandingPage.tsx` if the Play Store URL changes.

## URL conventions (read before touching metadata/sitemap)

`next.config.mjs` sets `trailingSlash: true`. Every route except the root is
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

Both use the shared `Navbar` and `Footer` from `components/`. They use the `.page-wrapper`, `.toc`, `.legal-section` CSS classes defined in `globals.css`.
