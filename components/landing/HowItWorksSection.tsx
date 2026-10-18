import { motion } from 'framer-motion'
import { fadeUp, stagger } from './animations'
import { T } from './theme'
import { STEPS } from './data'
import { useScrollReveal } from './useScrollReveal'

export function HowItWorksSection() {
  const { ref, inView } = useScrollReveal()

  return (
    <section id="how-it-works">
      <div className="lp-section">
        <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger(0.1)}>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="lp-label">Get started in minutes</span>
            <h2 className="lp-h2" style={{ marginTop: 0 }}>
              How It Works
            </h2>
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
                  <div
                    style={{
                      display: 'none', // shown via CSS on desktop
                    }}
                  />
                )}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '3rem',
                    color: 'rgba(75,220,193,0.18)',
                    lineHeight: 1,
                    marginBottom: '1.2rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {num}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: T.text,
                    marginBottom: '0.6rem',
                  }}
                >
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
