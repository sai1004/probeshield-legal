import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CredentialsFinder from '@/components/CredentialsFinder'
import Link from 'next/link'
import { BRAND_CREDENTIALS, CREDENTIALS_LAST_REVIEWED } from '@/lib/defaultCredentials'

export const metadata: Metadata = {
  title: 'Default Router & Device Passwords by Brand',
  description:
    "The default admin logins ProbeShield's own scanner tests, by brand — not a claim to cover every model. Check yours, then change it.",
  alternates: { canonical: 'https://probeshield.com/default-passwords' },
}

function groupByBrand() {
  const map = new Map<string, typeof BRAND_CREDENTIALS>()
  for (const cred of BRAND_CREDENTIALS) {
    const list = map.get(cred.brand) ?? []
    list.push(cred)
    map.set(cred.brand, list)
  }
  return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]))
}

export default function DefaultPasswordsPage() {
  const brandGroups = groupByBrand()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: brandGroups.map(([brand, creds]) => ({
      '@type': 'Question',
      name: `What is the default admin password for a ${brand} device?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          creds.length === 1
            ? `A commonly tested default is username "${creds[0].username || '(blank)'}" with password "${creds[0].password || '(blank)'}" over ${creds[0].service}. This isn't guaranteed for every model — if it doesn't work, check the label on the device or its manual.`
            : `Commonly tested defaults include ${creds
                .map((c) => `"${c.username || '(blank)'}" / "${c.password || '(blank)'}"`)
                .join(' or ')}. These aren't guaranteed for every model — if none work, check the label on the device or its manual.`,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="page-wrapper" style={{ maxWidth: '760px' }}>
        <div className="page-header">
          <div className="page-badge">🔑 Default Credentials Reference</div>
          <h1 className="page-title">
            Default Router &amp; Device <span>Passwords</span>
          </h1>
          <p className="legal-text" style={{ marginTop: '0.5rem' }}>
            A short, honest list — not a claim to cover every brand or model. This is what{' '}
            <Link href="/">ProbeShield</Link>'s own scanner tests when it finds a device on your
            network, laid out so you can check it yourself without installing anything. Part of the
            same idea as our{' '}
            <Link href="/blog/home-network-security-checklist">network security checklist</Link>.
          </p>
          <p className="legal-text" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            Last reviewed {CREDENTIALS_LAST_REVIEWED}.
          </p>
        </div>

        <CredentialsFinder />
      </main>
      <Footer />
    </>
  )
}
