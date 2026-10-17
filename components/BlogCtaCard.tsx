import React from 'react'

export interface BlogCtaCardProps {
  headline?: string
  description?: string
  buttonText?: string
  badgeText?: string
  variant?: 'mid' | 'bottom'
}

export default function BlogCtaCard({
  headline = 'Audit your home WiFi in seconds with ProbeShield',
  description = 'Discover hidden devices, scan open ports, and verify device manufacturers — 100% on-device with zero cloud telemetry.',
  buttonText = 'Get it on Google Play',
  badgeText = 'Free Android App • 100% On-Device • No Account Needed',
  variant = 'mid',
}: BlogCtaCardProps) {
  return (
    <aside
      className={`blog-cta-card blog-cta-card-${variant}`}
      style={{
        margin: variant === 'mid' ? '2.5rem 0' : '3rem 0 2.5rem',
        padding: '1.6rem 1.8rem',
        borderRadius: 14,
        background: 'linear-gradient(135deg, rgba(75, 220, 193, 0.08) 0%, rgba(13, 28, 45, 0.92) 100%)',
        border: '1px solid rgba(75, 220, 193, 0.28)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.28)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.1rem',
      }}
      aria-label="ProbeShield Network Auditor Call to Action"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#4bdcc1',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#4bdcc1',
            boxShadow: '0 0 10px #4bdcc1',
          }}
        />
        {badgeText}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: '1 1 320px', minWidth: 260 }}>
          <h3
            style={{
              fontFamily: 'var(--font-display, inherit)',
              fontSize: '1.18rem',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 0.45rem',
              lineHeight: 1.35,
            }}
          >
            {headline}
          </h3>
          <p
            style={{
              fontSize: '0.88rem',
              color: '#bbcac4',
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.4rem',
            flexShrink: 0,
          }}
        >
          <a
            href="https://play.google.com/store/apps/details?id=com.probeshield"
            target="_blank"
            rel="noopener noreferrer"
            className="lp-download-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.85rem 1.6rem',
              borderRadius: 10,
              background: '#4bdcc1',
              color: '#00382f',
              fontWeight: 600,
              fontSize: '0.92rem',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(75, 220, 193, 0.25)',
              whiteSpace: 'nowrap',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 512 512"
              fill="currentColor"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm447.2 208.6l-60.1-34.5-67.5 67.5 67.5 67.5 60.1-34.5c7.4-4.1 12-11.8 12-20.3v-25.4c0-8.5-4.6-16.2-12-20.3zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
            </svg>
            <span>{buttonText}</span>
          </a>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 500,
              color: '#85948f',
              paddingLeft: '0.2rem',
            }}
          >
            Free · Android 8.0+ · 0 Permissions Abuse
          </span>
        </div>
      </div>
    </aside>
  )
}
