import { motion } from 'framer-motion'
import { ease, fadeUp, stagger } from './animations'
import { T } from './theme'
import { RISK_LEVELS } from './data'
import { useScrollReveal } from './useScrollReveal'

export function RiskSection() {
  const { ref, inView } = useScrollReveal()

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
