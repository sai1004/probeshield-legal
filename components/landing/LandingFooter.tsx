import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CookieSettingsButton from '@/components/CookieSettingsButton'
import { T } from './theme'

export function LandingFooter() {
  const currentYear = new Date().getFullYear()

  const links = [
    { label: 'Blog', href: '/blog' },
    { label: 'Checklist', href: '/checklist' },
    { label: 'Default Passwords', href: '/default-passwords' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Contact', href: 'mailto:support@probeshield.com' },
  ]

  return (
    <footer
      style={{
        borderTop: `1px solid ${T.borderSub}`,
        padding: '3rem 2rem',
        background: T.bgLow,
        textAlign: 'center',
      }}
    >
      {/* Brand */}
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          textDecoration: 'none',
          marginBottom: '0.5rem',
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${T.primary}, #1B4F8A)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image src="/logo.png" alt="" width={28} height={28} />
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: T.text }}>
          Probe<span style={{ color: T.primary }}>Shield</span>
        </span>
      </Link>

      <p style={{ fontSize: '0.82rem', color: T.muted, margin: '0.4rem 0 1.4rem' }}>
        Probe everything. Shield everyone.
      </p>

      <ul
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          listStyle: 'none',
          margin: '0 0 1.5rem',
          padding: 0,
          flexWrap: 'wrap',
        }}
      >
        {links.map(({ label, href }) => (
          <li key={label}>
            <FooterLink label={label} href={href} />
          </li>
        ))}
        <CookieSettingsButton />
        <li>
          <FooterLink label="Google Play" href="https://play.google.com/store/apps/details?id=com.probeshield" icon />
        </li>
      </ul>

      <p style={{ fontSize: '0.76rem', color: T.muted, lineHeight: 1.5 }}>
        © {currentYear} ProbeShield &nbsp;·&nbsp; All Rights Reserved
        <br />
        <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>
          Intended for use on networks you own or have explicit permission to scan.
        </span>
      </p>
    </footer>
  )
}

function FooterLink({ label, href, icon = false }: { label: string; href: string; icon?: boolean }) {
  const [hovered, setHovered] = useState(false)
  const isExternal = href.startsWith('http') || href.startsWith('mailto')
  const props = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Link
      href={href}
      {...props}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        fontSize: '0.84rem',
        color: hovered ? T.primary : T.muted,
        textDecoration: 'none',
        transition: 'color 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon && (
        <svg width="13" height="13" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
          <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm447.2 208.6l-60.1-34.5-67.5 67.5 67.5 67.5 60.1-34.5c7.4-4.1 12-11.8 12-20.3v-25.4c0-8.5-4.6-16.2-12-20.3zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
        </svg>
      )}
      {label}
    </Link>
  )
}
