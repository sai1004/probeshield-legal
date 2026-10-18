import { motion } from 'framer-motion'
import { useState } from 'react'
import { fadeUp, stagger } from './animations'
import { T } from './theme'
import { FEATURES } from './data'
import { useScrollReveal } from './useScrollReveal'

export function FeaturesSection() {
  const { ref, inView } = useScrollReveal()

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
            {FEATURES.map(({ icon, title, desc }) => (
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
