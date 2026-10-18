# Component & structure rules
- One component per file — don't let a file grow past ~150 lines; split it the way `components/landing/*` was split
- Shared constants (colors, animation presets, data arrays) live in one dedicated file, imported by name — never redefined per-component
- `components/landing/theme.ts`'s colors must stay byte-identical to `app/globals.css`'s CSS custom properties — `scripts/check-theme-sync.js` enforces this at build time; don't bypass it
- Extract a shared component the moment markup is copy-pasted a third time (see `components/legal/LegalSection.tsx`) — don't wait for a dedicated refactor pass
- Derive repeated values (an id, a label, a number) from one prop, not two hand-typed strings that can drift apart
