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
        <li><a href="mailto:support@probeshield.com">Contact</a></li>
        <li>
          <a
            href="https://play.google.com/store/apps/details?id=com.probeshield"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <svg width="13" height="13" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
              <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm447.2 208.6l-60.1-34.5-67.5 67.5 67.5 67.5 60.1-34.5c7.4-4.1 12-11.8 12-20.3v-25.4c0-8.5-4.6-16.2-12-20.3zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
            </svg>
            Google Play
          </a>
        </li>
      </ul>
      <p className="footer-copy">© {new Date().getFullYear()} ProbeShield. All Rights Reserved.</p>
    </footer>
  )
}
