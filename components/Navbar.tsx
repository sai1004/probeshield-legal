'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const path = usePathname()
  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand">
        <div className="navbar-logo-icon">
          <Image src="/logo.png" alt="ProbeShield Logo" width={32} height={32} priority />
        </div>
        <span className="navbar-wordmark">Probe<span>Shield</span></span>
      </Link>
      <ul className="navbar-links">
        <li><Link href="/privacy" className={path === '/privacy' ? 'active' : ''}>Privacy Policy</Link></li>
        <li><Link href="/terms" className={path === '/terms' ? 'active' : ''}>Terms of Service</Link></li>
        <li><a href="mailto:sai.bsk1@gmail.com">Contact</a></li>
      </ul>
    </nav>
  )
}
