import { motion } from 'framer-motion'
import { fadeUp, stagger } from './animations'
import { T } from './theme'
import { TRUST_BADGES } from './data'
import { HeroShield } from './HeroShield'
import { DownloadBtn } from './DownloadBtn'
import { FloatingScanLines } from './FloatingScanLines'

export function HeroSection() {
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
