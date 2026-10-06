'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '/blog', label: 'Blog' },
  { href: '/checklist', label: 'Checklist' },
  { href: '/default-passwords', label: 'Default Passwords' },
  { href: '/tools/mac-lookup', label: 'MAC Lookup' },
]

export default function Navbar() {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [path])

  const isActive = (href: string) => (href === '/blog' ? path?.startsWith('/blog') : path === href)

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand">
        <div className="navbar-logo-icon">
          <Image src="/logo.png" alt="ProbeShield Logo" width={32} height={32} priority />
        </div>
        <span className="navbar-wordmark">Probe<span>Shield</span></span>
      </Link>

      <ul className={`navbar-links${open ? ' navbar-links-open' : ''}`}>
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={isActive(href) ? 'active' : ''} onClick={() => setOpen(false)}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`navbar-toggle${open ? ' navbar-toggle-open' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  )
}
