export type ConsentChoice = 'granted' | 'denied'

const STORAGE_KEY = 'ps_analytics_consent'

export const CONSENT_EVENT = 'ps:open-consent'
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function getStoredConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

export function storeConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // Storage blocked (e.g. private mode): the choice only lasts for this visit.
  }
}

function ensureGtag(): void {
  window.dataLayer = window.dataLayer || []
  if (!window.gtag) {
    window.gtag = function () {
      // gtag.js expects the raw `arguments` object in the data layer, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments)
    }
  }
}

let defaultsSet = false

/** Declare every Google storage type as denied before anything else can run. */
export function setConsentDefaults(): void {
  if (defaultsSet || !GA_ID) return
  ensureGtag()
  window.gtag!('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  defaultsSet = true
}

let scriptRequested = false

/** Grant analytics and only now load Google's script, so nothing is fetched before consent. */
export function grantAnalytics(): void {
  if (!GA_ID) return
  setConsentDefaults()
  ;(window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = false
  window.gtag!('consent', 'update', { analytics_storage: 'granted' })
  if (scriptRequested) return
  scriptRequested = true
  window.gtag!('js', new Date())
  window.gtag!('config', GA_ID)
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
}

/** Stop analytics and remove the cookies it already set. */
export function revokeAnalytics(): void {
  if (!GA_ID) return
  setConsentDefaults()
  window.gtag!('consent', 'update', { analytics_storage: 'denied' })
  ;(window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true
  clearGoogleCookies()
}

function clearGoogleCookies(): void {
  const host = window.location.hostname
  const labels = host.split('.')
  const domains = new Set<string | undefined>([undefined, host, `.${host}`])
  if (labels.length > 2) domains.add(`.${labels.slice(-2).join('.')}`)
  document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0].trim())
    .filter((name) => name === '_ga' || name.startsWith('_ga_'))
    .forEach((name) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ''}`
      })
    })
}
