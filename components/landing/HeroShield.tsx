import { motion } from 'framer-motion'
import { T } from './theme'
import { ShieldSvg } from './ShieldSvg'

export function HeroShield() {
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
