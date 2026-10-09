'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CookieSettingsButton from '@/components/CookieSettingsButton'

/* ── Animation presets ─────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

const stagger = (delay = 0.09) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: delay } },
})

/* ── Data ──────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    title: 'Device Discovery',
    desc: 'ARP + mDNS + ping sweep identifies every device on your WiFi within seconds — including hidden ones.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
      </svg>
    ),
    title: 'Port Scanner',
    desc: 'Probes the top 100 TCP ports per device, exposing open attack surfaces and running services.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>
      </svg>
    ),
    title: 'Manufacturer ID',
    desc: 'MAC OUI lookup tells you exactly which brand and model each device is — no guessing.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L3 7v5c0 5.25 3.84 10.15 9 11.36C17.16 17.15 21 12.25 21 12V7L12 2z"/>
      </svg>
    ),
    title: 'Risk Scoring',
    desc: 'Five-tier security ratings — Critical to Safe — with per-device vulnerability breakdowns.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Scan History',
    desc: 'Every scan saved locally. Compare over time to catch new devices and emerging threats.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'App Lock',
    desc: 'PIN + biometric protection. Your audit data stays private even on shared devices.',
  },
]

const RISK_LEVELS = [
  { label: 'Critical', color: '#FF3B3B', pct: 100, desc: 'Remote exploit possible' },
  { label: 'High',     color: '#FF6B35', pct:  78, desc: 'Significant exposure found' },
  { label: 'Medium',   color: '#FFB800', pct:  52, desc: 'Potential weakness detected' },
  { label: 'Low',      color: '#4FC3F7', pct:  28, desc: 'Minor issue noted' },
  { label: 'Safe',     color: '#00C896', pct:   6, desc: 'No threats identified' },
]

const STEPS = [
  {
    num: '01',
    title: 'Connect to WiFi',
    desc: 'Launch ProbeShield on your Android device while connected to any home or office WiFi network.',
  },
  {
    num: '02',
    title: 'Start Network Scan',
    desc: 'Tap "Start Network Scan." ProbeShield maps every device, probes ports, and fingerprints manufacturers.',
  },
  {
    num: '03',
    title: 'Review Risk Report',
    desc: 'Get a prioritised risk list with per-device breakdowns. Export a full PDF audit report.',
  },
]

const STATS = [
  { value: '100+', label: 'TCP ports per device' },
  { value: '0',    label: 'Bytes of scan data uploaded' },
  { value: '5',    label: 'Risk severity tiers' },
  { value: '100%', label: 'On-device processing' },
]

const TRUST_BADGES = ['No Cloud', 'No Account', 'No App Tracking', 'Scans Stay Local']

const PRIVACY_ITEMS = [
  'Your scan data never leaves your phone',
  'No account or sign-up required',
  'No analytics, crash reporters, or ads',
  'Scan history stored in local Room database',
  'Optional PIN + biometric app lock',
  'Open permissions model — full transparency',
]

/* ── Shared design tokens ───────────────────────────────── */
const T = {
  bg:       '#051424',
  bgLow:    '#010f1f',
  bgCard:   '#0d1c2d',
  bgMid:    '#122131',
  bgHigh:   '#1c2b3c',
  bgTop:    '#273647',
  primary:  '#4bdcc1',
  primaryOn:'#00382f',
  text:     '#d4e4fa',
  textSec:  '#bbcac4',
  muted:    '#85948f',
  border:   'rgba(75,220,193,0.2)',
  borderSub:'#3c4a46',
} as const

/* ══════════════════════════════════════════════════════════
   ROOT COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <div style={{ background: T.bg, minHeight: '100vh', color: T.text, fontFamily: 'var(--font-body)' }}>
      <LandingNav />
      <main>
        <HeroSection />
        <StatsBar />
        <FeaturesSection />
        <RiskSection />
        <PrivacySection />
        <HowItWorksSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  )
}

/* ── Shield SVG ─────────────────────────────────────────── */
function ShieldSvg({ size = 36, color = T.primary }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L3 6.5V12c0 5.25 3.84 10.15 9 11.36C17.16 22.15 21 17.25 21 12V6.5L12 2z"
        fill={`${color}20`}
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ── Animated Pulsing Shield ────────────────────────────── */
function HeroShield() {
  return (
    <div style={{ position: 'relative', width: 128, height: 128, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Outermost slow ring */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.15, 0, 0.15] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: `1px solid ${T.primary}`,
        }}
      />
      {/* Middle ring */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0, 0.25] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{
          position: 'absolute',
          width: 96, height: 96,
          borderRadius: '50%',
          border: `1.5px solid rgba(75,220,193,0.3)`,
          left: '50%', top: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      />
      {/* Inner glow disk */}
      <div style={{
        width: 72, height: 72,
        borderRadius: '50%',
        background: 'rgba(75,220,193,0.08)',
        border: `1.5px solid rgba(75,220,193,0.35)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 24px rgba(75,220,193,0.18)',
      }}>
        <motion.div
          animate={{ opacity: [1, 0.65, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ShieldSvg size={36} />
        </motion.div>
      </div>
    </div>
  )
}

/* ── Download Button ────────────────────────────────────── */
function DownloadBtn({ large = false, small = false }: { large?: boolean; small?: boolean }) {
  return (
    <motion.a
      href="https://play.google.com/store/apps/details?id=com.probeshield"
      target="_blank"
      rel="noopener noreferrer"
      className={small ? 'lp-download-btn-small' : 'lp-download-btn'}
      whileHover={{ scale: 1.04, boxShadow: '0 0 36px rgba(75,220,193,0.45)' }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: small ? '0.35rem' : '0.55rem',
        padding: large ? '1rem 2.2rem' : small ? '0.38rem 0.9rem' : '0.85rem 1.8rem',
        borderRadius: small ? 8 : 12,
        background: T.primary,
        color: T.primaryOn,
        fontWeight: 600,
        fontSize: large ? '1.05rem' : small ? '0.8rem' : '0.95rem',
        textDecoration: 'none',
        boxShadow: small ? 'none' : '0 0 20px rgba(75,220,193,0.22)',
        whiteSpace: 'nowrap',
      }}
    >
      {!small && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      )}
      {small ? (
        <>
          <span className="lp-download-prefix">Get it on </span>Google Play
        </>
      ) : (
        'Get it on Google Play'
      )}
      {!small && <span className="lp-download-subtext" style={{ fontSize: '0.72rem', fontWeight: 500, opacity: 0.65 }}>Free · Android 8+</span>}
    </motion.a>
  )
}

/* ══════════════════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════════════════ */
const LP_NAV_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Blog', href: '/blog' },
  { label: 'Checklist', href: '/checklist' },
  { label: 'Default Passwords', href: '/default-passwords' },
  { label: 'MAC Lookup', href: '/tools/mac-lookup' },
]

function LandingNav() {
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
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled || open ? 'rgba(5,20,36,0.92)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled || open ? 'blur(20px)' : 'none',
        borderBottom: scrolled || open ? `1px solid ${T.borderSub}` : '1px solid transparent',
        transition: 'background 0.35s, border-color 0.35s',
      }}
    >
      {/* Brand */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', textDecoration: 'none' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, overflow: 'hidden',
          background: `linear-gradient(135deg, ${T.primary}, #1B4F8A)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
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
      style={{ color: hovered ? T.text : T.muted, fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </Link>
  )
}

/* ══════════════════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 1.5rem 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Layered radial glows */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 70% 45% at 50% -5%, rgba(75,220,193,0.11) 0%, transparent 65%),
          radial-gradient(ellipse 45% 35% at 80% 90%, rgba(27,79,138,0.14) 0%, transparent 55%),
          radial-gradient(ellipse 35% 25% at 10% 80%, rgba(75,220,193,0.06) 0%, transparent 55%)
        `,
      }} />

      {/* Dot-grid pattern */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, rgba(60,74,70,0.45) 1px, transparent 1px)`,
        backgroundSize: '44px 44px',
        maskImage: 'radial-gradient(ellipse 85% 65% at 50% 50%, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at 50% 50%, black 30%, transparent 75%)',
      }} />

      {/* Floating scan-line decorations */}
      <FloatingScanLines />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger(0.1)}
        style={{ position: 'relative', zIndex: 1, maxWidth: 740, width: '100%' }}
      >
        {/* Platform badge */}
        <motion.div variants={fadeUp}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(75,220,193,0.08)',
            border: `1px solid rgba(75,220,193,0.28)`,
            color: T.primary,
            fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '0.35rem 1rem', borderRadius: 999,
            marginBottom: '2rem',
          }}>
            <span style={{ fontSize: '0.9rem' }}>⚡</span>
            Network Security Auditor &nbsp;·&nbsp; Android 8.0+
          </span>
        </motion.div>

        {/* Shield */}
        <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <HeroShield />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.5rem, 5vw, 3rem)',
            lineHeight: 1.18,
            color: T.text,
            marginBottom: '1.25rem',
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Probe Everything.</span>
          <span style={{ display: 'block', whiteSpace: 'nowrap', color: T.primary }}>Shield Everyone.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
            color: T.textSec,
            lineHeight: 1.75,
            maxWidth: 560,
            margin: '0 auto 2.5rem',
          }}
        >
          Discover every device on your WiFi, scan for open ports, and get a clear risk
          picture — <strong style={{ color: T.text, fontWeight: 600 }}>100% on-device</strong>.
          No account. No cloud. No compromise.
        </motion.p>

        {/* CTA row */}
        <motion.div
          variants={fadeUp}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <DownloadBtn />
        </motion.div>

        {/* Trust badges */}
        <motion.div variants={fadeUp} className="lp-trust-badges">
          {TRUST_BADGES.map((b, i) => (
            <motion.span
              key={b}
              whileHover={{ borderColor: 'rgba(75,220,193,0.4)', color: T.textSec }}
              style={{
                background: T.bgHigh,
                border: `1px solid ${T.borderSub}`,
                color: T.muted,
                fontSize: '0.78rem',
                padding: '0.3rem 0.9rem',
                borderRadius: 999,
                cursor: 'default',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              {i === 0 ? '☁️' : i === 1 ? '🔑' : i === 2 ? '📵' : '⚡'} {b}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)' }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: T.muted }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ── Floating scan line decorations ─────────────────────── */
function FloatingScanLines() {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {/* Top-left corner bracket */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.3, x: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        style={{ position: 'absolute', top: '15%', left: '8%' }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M12 2H2V12" stroke="#4bdcc1" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>
      {/* Bottom-right corner bracket */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.3, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ position: 'absolute', bottom: '15%', right: '8%' }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M36 46H46V36" stroke="#4bdcc1" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>
      {/* Animated horizontal scan line */}
      <motion.div
        animate={{ y: ['18vh', '82vh'], opacity: [0, 0.4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
        style={{
          position: 'absolute', left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent 5%, rgba(75,220,193,0.5) 40%, rgba(75,220,193,0.5) 60%, transparent 95%)',
        }}
      />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   STATS BAR
   ══════════════════════════════════════════════════════════ */
function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div style={{ padding: '0 2rem 80px' }}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={stagger(0.08)}
        className="lp-stats-grid"
        style={{ maxWidth: 900, margin: '0 auto' }}
      >
        {STATS.map(({ value, label }) => (
          <motion.div
            key={label}
            variants={fadeUp}
            style={{
              background: T.bgCard,
              padding: '1.8rem 1.5rem',
              textAlign: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, ease }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '2.4rem',
                color: T.primary,
                lineHeight: 1,
                marginBottom: '0.4rem',
              }}
            >
              {value}
            </motion.div>
            <div style={{ fontSize: '0.8rem', color: T.muted, lineHeight: 1.4 }}>{label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   FEATURES
   ══════════════════════════════════════════════════════════ */
function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" style={{ background: T.bgLow }}>
      <div className="lp-section-inner">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.08)}
        >
          {/* Heading */}
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="lp-label">Everything you need</span>
            <h2 className="lp-h2" style={{ marginTop: 0 }}>
              Complete Network Security<br />in Your Pocket
            </h2>
            <p className="lp-subtext" style={{ margin: '0.75rem auto 0' }}>
              Six powerful tools, one app. No cloud subscription, no monthly fees, no sign-up.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="lp-features-grid">
            {FEATURES.map(({ icon, title, desc }, i) => (
              <FeatureCard key={title} icon={icon} title={title} desc={desc} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: `linear-gradient(145deg, ${T.bgCard} 0%, ${T.bgMid} 100%)`,
        border: `1px solid ${hovered ? 'rgba(75,220,193,0.3)' : T.borderSub}`,
        borderRadius: 16,
        padding: '1.6rem',
        cursor: 'default',
        transition: 'border-color 0.25s',
        boxShadow: hovered ? '0 8px 32px rgba(75,220,193,0.08)' : 'none',
      }}
    >
      <div style={{
        width: 44, height: 44,
        borderRadius: 12,
        background: hovered ? 'rgba(75,220,193,0.14)' : 'rgba(75,220,193,0.08)',
        border: `1px solid ${hovered ? 'rgba(75,220,193,0.3)' : 'rgba(75,220,193,0.15)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: T.primary,
        marginBottom: '1rem',
        transition: 'background 0.25s, border-color 0.25s',
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '1rem',
        color: T.text,
        marginBottom: '0.5rem',
      }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: T.muted, lineHeight: 1.7 }}>{desc}</p>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════
   RISK SCORING
   ══════════════════════════════════════════════════════════ */
function RiskSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section>
      <div className="lp-section">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.08)}
        >
          {/* Heading */}
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="lp-label">Risk intelligence</span>
            <h2 className="lp-h2" style={{ marginTop: 0 }}>
              Five-Tier Security Rating
            </h2>
            <p className="lp-subtext" style={{ margin: '0.75rem auto 0' }}>
              Every device gets a clear, unambiguous severity label — so you know exactly
              what to fix first.
            </p>
          </motion.div>

          {/* Risk rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', maxWidth: 800, margin: '0 auto' }}>
            {RISK_LEVELS.map(({ label, color, pct, desc }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="lp-risk-row"
                style={{
                  background: `linear-gradient(135deg, ${T.bgCard} 0%, ${T.bgMid} 100%)`,
                  border: `1px solid ${T.borderSub}`,
                  borderRadius: 12,
                  padding: '1rem 1.4rem',
                  display: 'grid',
                  gridTemplateColumns: '90px 1fr 180px',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color,
                  }}>{label}</span>
                </div>
                <div style={{ background: T.bgHigh, borderRadius: 4, height: 6, overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : { width: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease }}
                    style={{ height: '100%', background: color, borderRadius: 4 }}
                  />
                </div>
                <div className="lp-risk-desc" style={{
                  fontSize: '0.8rem',
                  color: T.muted,
                  textAlign: 'right',
                  fontStyle: 'italic',
                }}>
                  {desc}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   PRIVACY PROMISE
   ══════════════════════════════════════════════════════════ */
function PrivacySection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ background: T.bgLow }}>
      <div className="lp-section-inner">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.08)}
          style={{ maxWidth: 800, margin: '0 auto' }}
        >
          <motion.div
            variants={fadeUp}
            style={{
              background: `linear-gradient(145deg, ${T.bgCard} 0%, ${T.bgMid} 100%)`,
              border: `1px solid rgba(75,220,193,0.25)`,
              borderRadius: 20,
              padding: '2.8rem',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 0 60px rgba(75,220,193,0.06)',
            }}
          >
            {/* Corner glow */}
            <div aria-hidden style={{
              position: 'absolute', top: -60, right: -60,
              width: 220, height: 220,
              background: 'radial-gradient(circle, rgba(75,220,193,0.1) 0%, transparent 65%)',
              pointerEvents: 'none',
            }} />
            <div aria-hidden style={{
              position: 'absolute', bottom: -40, left: -40,
              width: 160, height: 160,
              background: 'radial-gradient(circle, rgba(27,79,138,0.12) 0%, transparent 65%)',
              pointerEvents: 'none',
            }} />

            <div style={{ textAlign: 'center', marginBottom: '2.2rem', position: 'relative' }}>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: '2.8rem', marginBottom: '0.8rem', display: 'inline-block' }}
              >
                🛡️
              </motion.div>
              <h2 className="lp-h2" style={{ marginBottom: '0.75rem' }}>
                Your Network. Your Data.<br />
                <span style={{ color: T.primary }}>Full Stop.</span>
              </h2>
              <p style={{ color: T.textSec, fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 440, margin: '0 auto' }}>
                ProbeShield was built on a single principle: a security tool
                should never itself be a security risk.
              </p>
            </div>

            <div className="lp-privacy-grid">
              {PRIVACY_ITEMS.map((item, i) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '0.65rem',
                    fontSize: '0.875rem', color: T.textSec, lineHeight: 1.55,
                  }}
                >
                  <span style={{
                    color: T.primary, flexShrink: 0, marginTop: '0.05rem',
                    fontWeight: 700, fontSize: '0.9rem',
                  }}>✓</span>
                  {item}
                </motion.div>
              ))}
            </div>

            <motion.p
              variants={fadeUp}
              style={{
                textAlign: 'center',
                color: T.muted,
                fontSize: '0.82rem',
                lineHeight: 1.6,
                maxWidth: 560,
                margin: '1.6rem auto 0',
              }}
            >
              The only thing the app does on its own is a weekly sync of public vulnerability (CVE) data from our
              own server, sourced from NIST&apos;s National Vulnerability Database. Nothing about you, your network,
              or your scan results is sent with it.
            </motion.p>

            <motion.div
              variants={fadeUp}
              style={{ textAlign: 'center', marginTop: '2rem' }}
            >
              <Link
                href="/privacy"
                style={{
                  color: T.primary,
                  fontSize: '0.88rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  opacity: 0.9,
                }}
              >
                Read the full Privacy Policy
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   HOW IT WORKS
   ══════════════════════════════════════════════════════════ */
function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works">
      <div className="lp-section">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.1)}
        >
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="lp-label">Get started in minutes</span>
            <h2 className="lp-h2" style={{ marginTop: 0 }}>How It Works</h2>
          </motion.div>

          <div className="lp-steps-grid">
            {STEPS.map(({ num, title, desc }, i) => (
              <motion.div
                key={num}
                variants={fadeUp}
                whileHover={{ y: -4, borderColor: 'rgba(75,220,193,0.3)' }}
                style={{
                  background: `linear-gradient(145deg, ${T.bgCard} 0%, ${T.bgMid} 100%)`,
                  border: `1px solid ${T.borderSub}`,
                  borderRadius: 16,
                  padding: '2rem 1.6rem',
                  position: 'relative',
                  transition: 'border-color 0.25s',
                }}
              >
                {/* Step connector line (first two only) */}
                {i < 2 && (
                  <div style={{
                    display: 'none', // shown via CSS on desktop
                  }} />
                )}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '3rem',
                  color: 'rgba(75,220,193,0.18)',
                  lineHeight: 1,
                  marginBottom: '1.2rem',
                  letterSpacing: '-0.02em',
                }}>
                  {num}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  color: T.text,
                  marginBottom: '0.6rem',
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: T.muted, lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   CTA SECTION
   ══════════════════════════════════════════════════════════ */
function CtaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section style={{ background: T.bgLow }}>
      <div className="lp-section-inner" style={{ textAlign: 'center' }}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.1)}
          style={{ maxWidth: 640, margin: '0 auto' }}
        >
          <motion.div variants={fadeUp}>
            <HeroShield />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              color: T.text,
              lineHeight: 1.1,
              margin: '1.5rem 0 1rem',
              letterSpacing: '-0.02em',
            }}
          >
            Start Auditing Your<br />
            <span style={{ color: T.primary }}>Network Today</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              color: T.textSec,
              fontSize: '1rem',
              lineHeight: 1.75,
              marginBottom: '2.5rem',
              maxWidth: 440,
              margin: '0 auto 2.5rem',
            }}
          >
            Free download. No account. No cloud. Just a powerful network security
            audit in the palm of your hand.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center' }}>
            <DownloadBtn large />
          </motion.div>

          <motion.p
            variants={fadeUp}
            style={{ fontSize: '0.8rem', color: T.muted, marginTop: '1rem' }}
          >
            Android 8.0 (Oreo) and above &nbsp;·&nbsp; ~25 MB
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════ */
function LandingFooter() {
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
    <footer style={{
      borderTop: `1px solid ${T.borderSub}`,
      padding: '3rem 2rem',
      background: T.bgLow,
      textAlign: 'center',
    }}>
      {/* Brand */}
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '0.5rem' }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7, overflow: 'hidden',
          background: `linear-gradient(135deg, ${T.primary}, #1B4F8A)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Image src="/logo.png" alt="" width={28} height={28} />
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: T.text }}>
          Probe<span style={{ color: T.primary }}>Shield</span>
        </span>
      </Link>

      <p style={{ fontSize: '0.82rem', color: T.muted, margin: '0.4rem 0 1.4rem' }}>
        Probe everything. Shield everyone.
      </p>

      <ul style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', listStyle: 'none', margin: '0 0 1.5rem', padding: 0, flexWrap: 'wrap' }}>
        {links.map(({ label, href }) => (
          <li key={label}>
            <FooterLink label={label} href={href} />
          </li>
        ))}
        <CookieSettingsButton />
        <li>
          <FooterLink
            label="Google Play"
            href="https://play.google.com/store/apps/details?id=com.probeshield"
            icon
          />
        </li>
      </ul>

      <p style={{ fontSize: '0.76rem', color: T.muted, lineHeight: 1.5 }}>
        © {currentYear} ProbeShield &nbsp;·&nbsp; All Rights Reserved<br />
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
