import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeUp, stagger } from './animations'
import { T } from './theme'
import { PRIVACY_ITEMS } from './data'
import { useScrollReveal } from './useScrollReveal'

export function PrivacySection() {
  const { ref, inView } = useScrollReveal()

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
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: -60,
                right: -60,
                width: 220,
                height: 220,
                background: 'radial-gradient(circle, rgba(75,220,193,0.1) 0%, transparent 65%)',
                pointerEvents: 'none',
              }}
            />
            <div
              aria-hidden
              style={{
                position: 'absolute',
                bottom: -40,
                left: -40,
                width: 160,
                height: 160,
                background: 'radial-gradient(circle, rgba(27,79,138,0.12) 0%, transparent 65%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ textAlign: 'center', marginBottom: '2.2rem', position: 'relative' }}>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: '2.8rem', marginBottom: '0.8rem', display: 'inline-block' }}
              >
                🛡️
              </motion.div>
              <h2 className="lp-h2" style={{ marginBottom: '0.75rem' }}>
                Your Network. Your Data.
                <br />
                <span style={{ color: T.primary }}>Full Stop.</span>
              </h2>
              <p style={{ color: T.textSec, fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 440, margin: '0 auto' }}>
                ProbeShield was built on a single principle: a security tool should never itself be a security risk.
              </p>
            </div>

            <div className="lp-privacy-grid">
              {PRIVACY_ITEMS.map((item) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.65rem',
                    fontSize: '0.875rem',
                    color: T.textSec,
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    style={{
                      color: T.primary,
                      flexShrink: 0,
                      marginTop: '0.05rem',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                    }}
                  >
                    ✓
                  </span>
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
              The only thing the app does on its own is a weekly sync of public vulnerability (CVE) data from our own
              server, sourced from NIST&apos;s National Vulnerability Database. Nothing about you, your network, or your
              scan results is sent with it.
            </motion.p>

            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link
                href="/privacy/"
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
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
