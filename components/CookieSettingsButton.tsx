'use client'

import { CONSENT_EVENT, GA_ID } from '@/lib/consent'

/** Footer entry that reopens the analytics choice; renders nothing when analytics is not configured. */
export default function CookieSettingsButton() {
  if (!GA_ID) return null
  return (
    <li>
      <button type="button" className="cookie-settings-btn" onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))}>
        Cookie settings
      </button>
    </li>
  )
}
