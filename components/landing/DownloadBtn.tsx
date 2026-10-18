import { motion } from 'framer-motion'
import { T } from './theme'

export function DownloadBtn({ large = false, small = false }: { large?: boolean; small?: boolean }) {
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
      <svg
        width={large ? 18 : small ? 13 : 16}
        height={large ? 18 : small ? 13 : 16}
        viewBox="0 0 512 512"
        fill="currentColor"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm447.2 208.6l-60.1-34.5-67.5 67.5 67.5 67.5 60.1-34.5c7.4-4.1 12-11.8 12-20.3v-25.4c0-8.5-4.6-16.2-12-20.3zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
      </svg>
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
