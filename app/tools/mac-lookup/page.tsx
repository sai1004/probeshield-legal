import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MacLookupTool from '@/components/MacLookupTool'

export const metadata: Metadata = {
  title: 'MAC Address Vendor Lookup — Free Tool',
  description:
    'Paste a MAC address from your router\'s device list and find out the manufacturer instantly. Free, no account, and only the vendor prefix ever leaves your browser.',
  alternates: { canonical: 'https://probeshield.com/tools/mac-lookup/' },
}

export default function MacLookupPage() {
  return (
    <>
      <Navbar />
      <main className="page-wrapper" style={{ maxWidth: '760px' }}>
        <div className="page-header">
          <div className="page-badge">🔍 Free Tool</div>
          <h1 className="page-title">
            MAC Address Vendor <span>Lookup</span>
          </h1>
          <p className="legal-text" style={{ marginTop: '0.5rem' }}>
            Router admin panels and network scanners show a MAC address like{' '}
            <code>B8:27:EB:A1:B2:C3</code> — not a name you&apos;d recognize. Paste it here to find out
            the manufacturer. Looked up against the IEEE&apos;s public registry, entirely server-side,
            with only the first 6 characters (the vendor prefix) ever transmitted.
          </p>
        </div>

        <MacLookupTool />

        <div className="blog-cta">
          <div className="blog-cta-text">
            <strong>Want to see every device on your network?</strong> ProbeShield scans your WiFi and
            shows you what&apos;s connected — 100% on-device, free.
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=com.probeshield"
            target="_blank"
            rel="noopener noreferrer"
            className="blog-cta-btn"
          >
            Get ProbeShield
          </a>
        </div>

        <p className="legal-text" style={{ fontSize: '0.85rem', marginTop: '1rem' }}>
          Related: <Link href="/blog/find-hidden-devices-on-wifi">How to find every device connected to your WiFi network</Link>
        </p>
      </main>
      <Footer />
    </>
  )
}
