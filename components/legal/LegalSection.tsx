import type { ReactNode } from 'react'

/**
 * Wraps one numbered section of a legal page (Privacy Policy, Terms of Service). Before
 * this component existed, every section hand-typed its number twice — once in
 * `id="section-N"`, once in the visible "Section 0N" label — 25 times combined across
 * both pages, with nothing to catch the two going out of sync if a section was
 * inserted, removed, or reordered. Deriving both from a single `number` prop fixes that.
 */
export function LegalSection({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <section className="legal-section" id={`section-${number}`}>
      <div className="section-number">Section {String(number).padStart(2, '0')}</div>
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  )
}
