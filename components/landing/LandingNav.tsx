import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ease } from './animations'
import { T } from './theme'
import { DownloadBtn } from './DownloadBtn'

const LP_NAV_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Blog', href: '/blog' },
  { label: 'Checklist', href: '/checklist' },
  { label: 'Default Passwords', href: '/default-passwords' },
  { label: 'MAC Lookup', href: '/tools/mac-lookup' },
]

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className="lp-navbar"
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled || open ? 'rgba(5,20,36,0.92)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled || open ? 'blur(20px)' : 'none',
        borderBottom: scrolled || open ? `1px solid ${T.borderSub}` : '1px solid transparent',
        transition: 'background 0.35s, border-color 0.35s',
      }}
    >
      {/* Brand */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', textDecoration: 'none' }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${T.primary}, #1B4F8A)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image src="/logo.png" alt="ProbeShield" width={32} height={32} priority />
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: T.text }}>
          Probe<span style={{ color: T.primary }}>Shield</span>
        </span>
      </Link>

      {/* Desktop nav links (hidden on mobile via CSS) */}
      <ul className="lp-nav-links">
        {LP_NAV_ITEMS.map(({ label, href }) => (
          <li key={label}>
            <NavLink label={label} href={href} />
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
        {/* Download button — always visible */}
        <DownloadBtn small />

        {/* Hamburger — visible on mobile via CSS */}
        <button
          type="button"
          className={`lp-nav-toggle${open ? ' lp-nav-toggle-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <ul className={`lp-nav-links-mobile${open ? ' lp-nav-links-mobile-open' : ''}`}>
        {LP_NAV_ITEMS.map(({ label, href }) => (
          <li key={label}>
            <NavLink label={label} href={href} onClick={() => setOpen(false)} />
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}

function NavLink({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        color: hovered ? T.text : T.muted,
        fontSize: '0.88rem',
        textDecoration: 'none',
        transition: 'color 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </Link>
  )
}
