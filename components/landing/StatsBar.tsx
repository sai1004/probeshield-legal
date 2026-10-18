import { motion } from 'framer-motion'
import { ease, fadeUp, stagger } from './animations'
import { T } from './theme'
import { STATS } from './data'
import { useScrollReveal } from './useScrollReveal'

export function StatsBar() {
  const { ref, inView } = useScrollReveal({ once: true })

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
