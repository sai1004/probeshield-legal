#!/usr/bin/env node

/**
 * scripts/check-theme-sync.js
 *
 * components/LandingPage.tsx hardcodes a handful of brand colors as a `T` object
 * instead of reading app/globals.css's CSS custom properties, because `T` is consumed
 * inside inline SVG/motion props where a CSS var isn't straightforward to use. That's a
 * second source of truth for the same values — this script is the guardrail: it fails
 * the build the moment the two drift, instead of letting a `globals.css` repaint quietly
 * stop matching what the landing page actually renders.
 *
 * If this script is failing because you intentionally changed one side, update the
 * other side too, don't just rewrite the mapping below to allow the mismatch.
 */

const fs = require('fs')
const path = require('path')

const GLOBALS_CSS = path.join(__dirname, '..', 'app', 'globals.css')
const LANDING_PAGE = path.join(__dirname, '..', 'components', 'LandingPage.tsx')

// T's key -> the CSS custom property it must match.
const T_KEY_TO_CSS_VAR = {
  bg: '--bg',
  bgLow: '--bg-low',
  bgCard: '--bg-card',
  bgMid: '--bg-card2',
  bgHigh: '--bg-high',
  bgTop: '--bg-highest',
  primary: '--primary',
  primaryOn: '--primary-on',
  text: '--text',
  textSec: '--text-secondary',
  muted: '--muted',
  border: '--border',
  borderSub: '--border-subtle',
}

function normalize(value) {
  // rgba(75,220,193,0.2) and rgba(75, 220, 193, 0.2) are the same color; strip
  // whitespace and lowercase hex so formatting differences don't count as drift.
  return value.replace(/\s+/g, '').toLowerCase()
}

function parseCssCustomProperties(css) {
  const rootBlockMatch = css.match(/:root\s*{([^}]*)}/)
  if (!rootBlockMatch) {
    throw new Error(`Could not find a :root { ... } block in ${GLOBALS_CSS}`)
  }
  const vars = {}
  const declRe = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi
  let match
  while ((match = declRe.exec(rootBlockMatch[1])) !== null) {
    const [, name, rawValue] = match
    // Drop trailing CSS comments like "#4bdcc1; /* alias for ... */" being matched past
    // the semicolon is already avoided by the regex, but inline comments before the
    // semicolon (none today) would need stripping here if introduced later.
    vars[`--${name}`] = rawValue.trim()
  }
  return vars
}

function parseThemeObject(tsx) {
  const blockMatch = tsx.match(/const T = {([^}]*)}\s*as const/)
  if (!blockMatch) {
    throw new Error(`Could not find "const T = { ... } as const" in ${LANDING_PAGE}`)
  }
  const tokens = {}
  const declRe = /(\w+)\s*:\s*'([^']+)'/g
  let match
  while ((match = declRe.exec(blockMatch[1])) !== null) {
    const [, key, rawValue] = match
    tokens[key] = rawValue
  }
  return tokens
}

function main() {
  const css = fs.readFileSync(GLOBALS_CSS, 'utf8')
  const tsx = fs.readFileSync(LANDING_PAGE, 'utf8')

  const cssVars = parseCssCustomProperties(css)
  const themeTokens = parseThemeObject(tsx)

  const mismatches = []

  for (const [tKey, cssVarName] of Object.entries(T_KEY_TO_CSS_VAR)) {
    const tValue = themeTokens[tKey]
    const cssValue = cssVars[cssVarName]

    if (tValue === undefined) {
      mismatches.push(`T.${tKey} no longer exists in ${path.relative(process.cwd(), LANDING_PAGE)} — update the mapping in this script if that's intentional.`)
      continue
    }
    if (cssValue === undefined) {
      mismatches.push(`${cssVarName} no longer exists in ${path.relative(process.cwd(), GLOBALS_CSS)}, but T.${tKey} still references it.`)
      continue
    }
    if (normalize(tValue) !== normalize(cssValue)) {
      mismatches.push(`T.${tKey} ('${tValue}') != ${cssVarName} ('${cssValue}') in globals.css`)
    }
  }

  if (mismatches.length > 0) {
    console.error('✗ Theme tokens have drifted between components/LandingPage.tsx and app/globals.css:\n')
    for (const line of mismatches) console.error(`  - ${line}`)
    console.error('\nUpdate whichever side is stale so both describe the same palette, then rerun this check.')
    process.exit(1)
  }

  console.log(`✔ Theme tokens in sync (${Object.keys(T_KEY_TO_CSS_VAR).length} checked)`)
}

main()
