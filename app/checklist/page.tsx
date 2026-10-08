import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChecklistTool from '@/components/ChecklistTool'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Home Network Security Checklist (Interactive)',
  description:
    'Check off the 10 things that actually matter for home network security, and come back to re-check them. Saved on your device only — nothing is sent anywhere.',
  alternates: { canonical: 'https://probeshield.com/checklist/' },
}

export default function ChecklistPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Home Network Security Checklist',
    description: 'Ten specific things to check on your home network, in priority order.',
    step: [
      'Know every device that is actually connected',
      'Check for default or reused credentials on IoT devices',
      'Scan for open ports on anything IoT',
      "Verify your router isn't using its default admin password",
      'Turn off WPS',
      "Confirm you're on WPA3 (or WPA2 at minimum)",
      'Separate IoT devices onto a guest network',
      "Check what's actually port-forwarded on your router",
      'Review cameras specifically',
      'Re-scan on a schedule, not just once',
    ].map((text, i) => ({ '@type': 'HowToStep', position: i + 1, text })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="page-wrapper" style={{ maxWidth: '720px' }}>
        <div className="page-header">
          <div className="page-badge">✅ Interactive Checklist</div>
          <h1 className="page-title">Network Security <span>Checklist</span></h1>
          <p className="legal-text" style={{ marginTop: '0.5rem' }}>
            The same ten things from our{' '}
            <Link href="/blog/home-network-security-checklist">full checklist guide</Link>, as something you can
            actually check off — and come back to re-check in a few months.
          </p>
        </div>

        <ChecklistTool />
      </main>
      <Footer />
    </>
  )
}
