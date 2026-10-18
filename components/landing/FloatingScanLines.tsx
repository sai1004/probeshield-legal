import { motion } from 'framer-motion'

export function FloatingScanLines() {
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
          <path d="M12 2H2V12" stroke="#4bdcc1" strokeWidth="2" strokeLinecap="round" />
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
          <path d="M36 46H46V36" stroke="#4bdcc1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>
      {/* Animated horizontal scan line */}
      <motion.div
        animate={{ y: ['18vh', '82vh'], opacity: [0, 0.4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 1,
          background:
            'linear-gradient(90deg, transparent 5%, rgba(75,220,193,0.5) 40%, rgba(75,220,193,0.5) 60%, transparent 95%)',
        }}
      />
    </div>
  )
}
