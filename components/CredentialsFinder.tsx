'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { BRAND_CREDENTIALS, GENERIC_CREDENTIALS } from '@/lib/defaultCredentials'

function groupByBrand() {
  const map = new Map<string, typeof BRAND_CREDENTIALS>()
  for (const cred of BRAND_CREDENTIALS) {
    const list = map.get(cred.brand) ?? []
    list.push(cred)
    map.set(cred.brand, list)
  }
  return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]))
}

const BRAND_GROUPS = groupByBrand()

export default function CredentialsFinder() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return BRAND_GROUPS
    return BRAND_GROUPS.filter(([brand]) => brand.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="creds-tool">
      <div className="creds-search">
        <input
          type="text"
          inputMode="search"
          placeholder="Search a brand, e.g. Netgear, TP-Link, Asus…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search by device brand"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="creds-empty">
          No brand-specific entry for that yet. Try the{' '}
          <a href="#generic-defaults">common generic defaults</a> below, or check the label on the
          device itself.
        </p>
      ) : (
        <div className="creds-grid">
          {filtered.map(([brand, creds]) => (
            <div className="creds-card" key={brand}>
              <div className="creds-card-brand">{brand}</div>
              {creds.map((c, i) => (
                <div className="creds-row" key={i}>
                  <span className="creds-service">{c.service}</span>
                  <code>
                    {c.username || '(blank)'} / {c.password || '(blank)'}
                  </code>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <p className="creds-note">
        {BRAND_CREDENTIALS.length} entries across {BRAND_GROUPS.length} brands — this is what
        ProbeShield's own scanner tests, not a claim that it covers every brand or model. Most
        entries here are a single guess per brand; newer devices increasingly ship with a unique
        printed password instead of a shared default, in which case none of this will work — check
        the label on the device or its manual instead.
      </p>

      <h2 id="generic-defaults" className="creds-section-title">
        Common generic defaults
      </h2>
      <p className="legal-text">
        These aren't tied to one brand — they show up across unbranded, white-label, or
        never-configured devices of all kinds.
      </p>
      <div className="creds-generic-list">
        {GENERIC_CREDENTIALS.map((c, i) => (
          <div className="creds-row creds-row-generic" key={i}>
            <span className="creds-service">{c.service}</span>
            <code>
              {c.username || '(blank)'} / {c.password || '(blank)'}
            </code>
          </div>
        ))}
      </div>

      <div className="creds-cta">
        <p>
          Found one that works? Change it now — then run through the full{' '}
          <Link href="/checklist">network security checklist</Link> to catch anything else.
        </p>
      </div>
    </div>
  )
}
