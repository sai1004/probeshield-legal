# ProbeShield Legal Site — Code Quality Refactor Plan

**Scope:** `probeshield-legal` only. Pure refactor — no visual, behavioral, or content changes. Every phase must produce a pixel-identical `npm run build` output; verification is screenshot diffing + `git diff` review, not "looks about right."

## Why

The site works and ships, but `components/LandingPage.tsx` is 1,150 lines holding 18 components, several patterns are copy-pasted instead of shared, and one set of values (brand colors) is defined twice and has already drifted once. None of this is visible to users — it's a cost paid every time someone (human or Claude) has to read, extend, or safely change this code. Below are the five concrete problems found, each with file/line evidence, not a general "clean this up" ask.

## Findings

### 1. `components/LandingPage.tsx` is a 1,150-line monolith
`wc -l` across the repo: every other component/page file is 15–294 lines; this one is 1,150 — 4x the next-largest file (`app/terms/page.tsx`, 291 lines). It holds 18 functions (`LandingPage`, `ShieldSvg`, `HeroShield`, `DownloadBtn`, `LandingNav`, `NavLink`, `HeroSection`, `FloatingScanLines`, `StatsBar`, `FeaturesSection`, `FeatureCard`, `RiskSection`, `PrivacySection`, `HowItWorksSection`, `CtaSection`, `LandingFooter`, `FooterLink`, plus the animation/data constants at the top). Finding any one section means scrolling through unrelated ones; a merge conflict in one section touches the same file as every other section.

### 2. Brand colors are defined twice, and have already drifted
`components/LandingPage.tsx:125` declares a `const T = { bg: '#051424', primary: '#4bdcc1', text: '#d4e4fa', ... }` — 13 hardcoded hex/rgba values. These are the *exact same* values already defined as CSS custom properties in `app/globals.css:5-24` (`--bg`, `--primary`, `--text`, etc.), which are themselves documented as the canonical design system in `probeshield-legal/CLAUDE.md`. Proof this isn't theoretical: `globals.css` has since grown a `--bg-bright: #2c3a4c` token that has no counterpart in `T` — the two have already diverged once. The next person to retheme the site has to find and update both.

### 3. The scroll-reveal pattern is copy-pasted 6 times
`const ref = useRef(null); const inView = useInView(ref, { once: true, margin: '-80px' })` (or the no-margin variant) appears identically in `StatsBar`, `FeaturesSection`, `RiskSection`, `PrivacySection`, `HowItWorksSection`, and `CtaSection` (`components/LandingPage.tsx:582,632,716,796,920,992`). Every section wires this up by hand instead of once.

### 4. The legal-section wrapper is copy-pasted 25 times
`app/privacy/page.tsx` (12 instances) and `app/terms/page.tsx` (13 instances) each repeat:
```tsx
<section className="legal-section" id="section-N">
  <div className="section-number">Section 0N</div>
  <h2 className="section-title">...</h2>
  ...
</section>
```
with the section number **hand-typed as a string** in two places per section (`id="section-5"` and `Section 05`). Inserting or removing a section means manually renumbering every instance after it, in two different string formats, with nothing to catch a mismatch.

### 5. The legal-page header is copy-pasted between the two legal pages
`app/privacy/page.tsx` and `app/terms/page.tsx` both open with the identical `page-badge` / `page-title` / `page-meta` (Effective Date / Last Updated / Version) block, differing only in the actual text content.

## Non-goals

- No visual changes. No copy changes. No animation timing/easing changes.
- No new dependencies.
- Not touching `content/posts/*.tsx` (blog posts) — their `<p className="legal-text">`/`<h2 className="blog-h2">` repetition is prose content, not logic; extracting it would make posts *harder* to read and edit for marginal byte savings. Explicitly out of scope.
- Not touching `lib/`, `components/ChecklistTool.tsx`, `components/MacLookupTool.tsx`, `components/CredentialsFinder.tsx` — these are already reasonably sized, single-purpose files with no found duplication.

## Target structure

```
components/
  landing/
    index.tsx              # LandingPage — composes the sections below, same default export
    theme.ts                # re-exports color tokens FROM globals.css values (single source of truth — see Phase 1)
    animations.ts           # ease, fadeUp, stagger
    data.ts                 # FEATURES, TRUST_BADGES, PRIVACY_ITEMS
    useScrollReveal.ts       # the ref+useInView hook (Finding #3)
    ShieldSvg.tsx
    HeroShield.tsx
    DownloadBtn.tsx
    LandingNav.tsx           # + NavLink
    HeroSection.tsx
    FloatingScanLines.tsx
    StatsBar.tsx
    FeaturesSection.tsx      # + FeatureCard
    RiskSection.tsx
    PrivacySection.tsx
    HowItWorksSection.tsx
    CtaSection.tsx
    LandingFooter.tsx        # + FooterLink
components/
  legal/
    LegalPageHeader.tsx      # Finding #5: badge/title/dates, props instead of copy-paste
    LegalSection.tsx         # Finding #4: number is derived (auto-incrementing or array index), not hand-typed twice
```

`components/LandingPage.tsx` becomes a thin re-export (`export { default } from './landing'`) so `app/page.tsx`'s import doesn't need to change — or the import is updated directly; decide at implementation time, whichever keeps the diff smaller.

## Phases

### Phase 1 — Single-source the design tokens (Finding #2) — DONE

- [x] Went with option (c): kept both `T` and the CSS custom properties, added a drift-check script rather than a build-time codegen step (lower risk for a site with no build step today).
- [x] `scripts/check-theme-sync.js` parses `:root { ... }` from `app/globals.css` and `const T = { ... } as const` from `components/LandingPage.tsx`, maps each of `T`'s 13 keys to its CSS custom property, normalizes whitespace/case, and exits 1 with a specific mismatch message per drifted token. Sanity-tested against a real induced drift (temporarily edited `T.bg`, confirmed it caught it with exit code 1, confirmed clean exit 0 restored).
- [x] Wired into `package.json`: `"build": "npm run check:theme && next build"`, new `"check:theme"` script.
- [x] Verified: `npm run build` runs the check first (prints `✔ Theme tokens in sync (13 checked)`), then builds clean with identical route output sizes to before (`/` still 48.6 kB / 148 kB First Load JS).

### Phase 2 — Extract the scroll-reveal hook (Finding #3) — DONE

- [x] Added `components/landing/useScrollReveal.ts` — `useScrollReveal(options = { once: true, margin: '-80px' })`, same default every call site already used.
- [x] Replaced all 6 call sites (`StatsBar`, `FeaturesSection`, `RiskSection`, `PrivacySection`, `HowItWorksSection`, `CtaSection`); 2 of them (`StatsBar`, `CtaSection`) pass `{ once: true }` explicitly since they didn't use the `-80px` margin, same as before.
- [x] `useRef`/`useInView` dropped from `LandingPage.tsx`'s imports — confirmed via diagnostics they had no other call sites in the file before removing.
- [x] Verified: `npm run build` — `check:theme` still passes, `/` still exactly 48.6 kB / 148 kB First Load JS. Built the static export, served `out/` with `serve`, drove it with Playwright: zero console/page errors, and after scrolling through all 6 sections every one reached `opacity: 1` (computed style), confirming the reveal animations still fire through the extracted hook. Screenshot of the final CTA/footer section after scroll matches the original layout.

### Phase 3 — Split `LandingPage.tsx` into `components/landing/*` (Finding #1) — DONE

- [x] `animations.ts` (`ease`/`fadeUp`/`stagger`), `theme.ts` (`T`, location `scripts/check-theme-sync.js` now points at), and `data.tsx` (`FEATURES`/`RISK_LEVELS`/`STEPS`/`STATS`/`TRUST_BADGES`/`PRIVACY_ITEMS` — found 3 more data constants than the plan originally named; `.tsx` extension since `FEATURES` holds JSX icons).
- [x] One file per component, moved verbatim: `ShieldSvg`, `HeroShield`, `DownloadBtn`, `LandingNav`+`NavLink` (co-located, `NavLink` is nav-only), `HeroSection`, `FloatingScanLines`, `StatsBar`, `FeaturesSection`+`FeatureCard` (co-located), `RiskSection`, `PrivacySection`, `HowItWorksSection`, `CtaSection`, `LandingFooter`+`FooterLink` (co-located). `LP_NAV_ITEMS` stayed colocated inside `LandingNav.tsx` rather than moving to `data.tsx` — it was already positioned right next to `LandingNav` in the original file, not with the other shared data.
- [x] `components/landing/index.tsx` composes them (the only file with `'use client'` — it doesn't need repeating on every leaf file, matching how the original single file only had it once).
- [x] `components/LandingPage.tsx` deleted outright rather than kept as a re-export shim — it had exactly one importer (`app/page.tsx`), so updating that one import line to `@/components/landing` was a smaller, cleaner diff than a permanent dead re-export file.
- [x] Two incidental, zero-risk cleanups surfaced while rewriting call sites (not logic changes — TS itself was already flagging these as unused before I touched them): dropped the unused `i` index param from `FEATURES.map` and `PRIVACY_ITEMS.map`, and didn't carry forward the already-dead `AnimatePresence` import.
- [x] Verified incrementally, not just at the end: ran `npx tsc --noEmit` after every 2-4 file group (animations/theme/data → ShieldSvg/HeroShield/DownloadBtn → LandingNav → HeroSection/FloatingScanLines → StatsBar/FeaturesSection → RiskSection/PrivacySection → HowItWorksSection/CtaSection → LandingFooter), catching import mistakes immediately rather than at the end of an 18-file move.
- [x] Final verification after the full split: `npx tsc --noEmit` clean across the whole project; `npm run build` clean, `/` still **exactly** 48.6 kB / 148 kB First Load JS — byte-identical to pre-split, strong evidence nothing was duplicated or left unreferenced. Served the static export, drove it with Playwright: zero console/page errors, all 6 scroll-reveal sections still reach `opacity: 1` on scroll. Full-page screenshot of `/` shows every section (hero, stats, features, risk, privacy, how-it-works, CTA, footer) rendering identically to the original. Spot-checked `/privacy/` and `/terms/` (untouched by this phase) — unaffected.

### Phase 4 — Extract `LegalSection` and `LegalPageHeader` (Findings #4, #5)
- [ ] `LegalSection`: props `{ number: number, title: string, children }` — renders `Section 0{number}` and `id="section-{number}"` from the single `number` prop, so there's exactly one number per section instead of two hand-typed strings that can go out of sync.
- [ ] `LegalPageHeader`: props `{ badge, title, titleAccent, effectiveDate, lastUpdated, version }`.
- [ ] Migrate `app/privacy/page.tsx` (12 sections) and `app/terms/page.tsx` (13 sections) to use both.
- [ ] Verify: Playwright screenshot diff of `/privacy/` and `/terms/` against pre-refactor baselines; `npm run build`.

## Verification approach (every phase)

1. `npm run build` — must stay clean, same route output sizes (`Route (app)` table in build output should be near-identical byte-for-byte for unrelated routes).
2. Playwright: screenshot each affected route before starting and after each phase; diff them. Zero pixel diff is the bar for a pure refactor — any diff means something leaked in.
3. `git diff --stat` reviewed before each commit to confirm the change is additive (new files) + mechanical (moves/renames), not rewritten logic.
4. Commit per phase, not one giant commit — if Phase 3 (the biggest, riskiest one) needs to be reverted, Phases 1/2/4 shouldn't have to go with it.

## Out of scope for this plan, noticed in passing

`PRIVACY_ITEMS` in `components/LandingPage.tsx:117` includes the line `'No analytics, crash reporters, or ads'` — this is now imprecise: the site itself does use GA4 with consent (Section 7 of the Privacy Policy, `ConsentBanner.tsx`), and "crash reporters" is true for the site but could be misread given the Android app's Crashlytics (unrelated system, but the sentence doesn't disambiguate). This is a content-accuracy issue, not a code-quality one — flagging it here rather than fixing it, since fixing it is a content/product decision outside this plan's scope.
