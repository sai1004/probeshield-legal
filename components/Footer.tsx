import Link from 'next/link'
import CookieSettingsButton from '@/components/CookieSettingsButton'

export default function Footer() {
  return (
    <footer className="legal-footer">
      <div className="footer-brand">Probe<span>Shield</span></div>
      <ul className="footer-links">
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/checklist">Checklist</Link></li>
        <li><Link href="/default-passwords">Default Passwords</Link></li>
        <li><Link href="/privacy">Privacy Policy</Link></li>
        <li><Link href="/terms">Terms of Service</Link></li>
        <CookieSettingsButton />
        <li><a href="mailto:sai.bsk1@gmail.com">Contact</a></li>
      </ul>
      <p className="footer-copy">© {new Date().getFullYear()} ProbeShield. All Rights Reserved.</p>
    </footer>
  )
}
