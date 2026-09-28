'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  CONSENT_EVENT,
  GA_ID,
  getStoredConsent,
  grantAnalytics,
  revokeAnalytics,
  setConsentDefaults,
  storeConsent,
  type ConsentChoice,
} from '@/lib/consent'

export default function ConsentBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!GA_ID) return
    setConsentDefaults()
    const stored = getStoredConsent()
    if (stored === 'granted') grantAnalytics()
    else if (stored === null) setOpen(true)

    const reopen = () => setOpen(true)
    window.addEventListener(CONSENT_EVENT, reopen)
    return () => window.removeEventListener(CONSENT_EVENT, reopen)
  }, [])

  if (!GA_ID || !open) return null

  const choose = (choice: ConsentChoice) => {
    storeConsent(choice)
    if (choice === 'granted') grantAnalytics()
    else revokeAnalytics()
    setOpen(false)
  }

  return (
    <div className="consent-banner" role="dialog" aria-label="Analytics cookies">
      <p className="consent-text">
        We&apos;d like to use Google Analytics cookies to count visits and see which pages are read. Nothing is
        loaded from Google unless you accept. <Link href="/privacy#section-7">Learn more</Link>
      </p>
      <div className="consent-actions">
        <button type="button" className="consent-btn" onClick={() => choose('denied')}>
          Decline
        </button>
        <button type="button" className="consent-btn consent-btn-accept" onClick={() => choose('granted')}>
          Accept
        </button>
      </div>
    </div>
  )
}
