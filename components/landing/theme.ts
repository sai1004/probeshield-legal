/**
 * Mirrors app/globals.css's CSS custom properties by value (not imported from them,
 * since these are consumed in contexts — inline SVG stroke colors, framer-motion style
 * props — where a `var(--x)` string isn't always straightforward). scripts/check-theme-sync.js
 * enforces that this object and globals.css's :root block stay in sync; if you're
 * changing a color, change both.
 */
export const T = {
  bg: '#051424',
  bgLow: '#010f1f',
  bgCard: '#0d1c2d',
  bgMid: '#122131',
  bgHigh: '#1c2b3c',
  bgTop: '#273647',
  primary: '#4bdcc1',
  primaryOn: '#00382f',
  text: '#d4e4fa',
  textSec: '#bbcac4',
  muted: '#85948f',
  border: 'rgba(75,220,193,0.2)',
  borderSub: '#3c4a46',
} as const
