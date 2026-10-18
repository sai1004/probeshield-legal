import { motion } from 'framer-motion'
import { fadeUp, stagger } from './animations'
import { T } from './theme'
import { HeroShield } from './HeroShield'
import { DownloadBtn } from './DownloadBtn'
import { useScrollReveal } from './useScrollReveal'

export function CtaSection() {
  const { ref, inView } = useScrollReveal({ once: true })

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
