/**
 * lib/consent.ts holds the Google Consent Mode v2 logic verified by hand (Playwright)
 * earlier in this project — these tests exist so that verification isn't only ever
 * manual. `GA_ID` is captured into a module-level const at import time, and
 * `defaultsSet`/`scriptRequested` are module-level mutable flags, so every test needs
 * a fresh module instance (`jest.resetModules()` + re-`require()`) after setting
 * `process.env.NEXT_PUBLIC_GA_ID` for that test.
 */

const GA_ID = 'G-TEST1234'

function freshConsentModule(gaId: string | undefined) {
  jest.resetModules()
  if (gaId === undefined) {
    delete process.env.NEXT_PUBLIC_GA_ID
  } else {
    process.env.NEXT_PUBLIC_GA_ID = gaId
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require('@/lib/consent') as typeof import('@/lib/consent')
}

function clearAllCookies() {
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim()
    if (name) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  })
}

beforeEach(() => {
  window.localStorage.clear()
  clearAllCookies()
  delete (window as unknown as Record<string, unknown>).gtag
  delete (window as unknown as Record<string, unknown>).dataLayer
})

describe('getStoredConsent / storeConsent', () => {
  test('returns null when nothing has been stored', () => {
    const { getStoredConsent } = freshConsentModule(GA_ID)
    expect(getStoredConsent()).toBeNull()
  })

  test('round-trips a stored choice', () => {
    const { getStoredConsent, storeConsent } = freshConsentModule(GA_ID)
    storeConsent('granted')
    expect(getStoredConsent()).toBe('granted')
    storeConsent('denied')
    expect(getStoredConsent()).toBe('denied')
  })

  test('treats an unrecognized stored value as no choice made', () => {
    const { getStoredConsent } = freshConsentModule(GA_ID)
    window.localStorage.setItem('ps_analytics_consent', 'yes-please')
    expect(getStoredConsent()).toBeNull()
  })

  test('getStoredConsent does not throw if localStorage access throws', () => {
    const { getStoredConsent } = freshConsentModule(GA_ID)
    const spy = jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(() => getStoredConsent()).not.toThrow()
    expect(getStoredConsent()).toBeNull()
    spy.mockRestore()
  })

  test('storeConsent does not throw if localStorage access throws', () => {
    const { storeConsent } = freshConsentModule(GA_ID)
    const spy = jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(() => storeConsent('granted')).not.toThrow()
    spy.mockRestore()
  })
})

describe('without a GA_ID configured (e.g. local dev with no env var)', () => {
  test('setConsentDefaults, grantAnalytics, and revokeAnalytics are all safe no-ops', () => {
    const { setConsentDefaults, grantAnalytics, revokeAnalytics } = freshConsentModule(undefined)
    expect(() => setConsentDefaults()).not.toThrow()
    expect(() => grantAnalytics()).not.toThrow()
    expect(() => revokeAnalytics()).not.toThrow()
    // None of them should have installed gtag, since there's nothing to configure it for.
    expect(window.gtag).toBeUndefined()
  })
})

describe('with a GA_ID configured', () => {
  test('setConsentDefaults declares every storage type denied, exactly once even if called twice', () => {
    const { setConsentDefaults } = freshConsentModule(GA_ID)
    const gtagSpy = jest.fn()
    window.gtag = gtagSpy

    setConsentDefaults()
    setConsentDefaults()

    expect(gtagSpy).toHaveBeenCalledTimes(1)
    expect(gtagSpy).toHaveBeenCalledWith('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
  })

  test('grantAnalytics updates consent to granted, re-enables the GA flag, and injects the gtag script exactly once', () => {
    const { grantAnalytics } = freshConsentModule(GA_ID)
    const gtagSpy = jest.fn()
    window.gtag = gtagSpy

    grantAnalytics()
    grantAnalytics()

    expect(gtagSpy).toHaveBeenCalledWith('consent', 'update', { analytics_storage: 'granted' })
    expect((window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`]).toBe(false)
    expect(gtagSpy).toHaveBeenCalledWith('config', GA_ID)

    const scripts = document.querySelectorAll(`script[src^="https://www.googletagmanager.com/gtag/js"]`)
    expect(scripts).toHaveLength(1)
  })

  test('revokeAnalytics updates consent to denied and sets the GA opt-out flag', () => {
    const { revokeAnalytics } = freshConsentModule(GA_ID)
    const gtagSpy = jest.fn()
    window.gtag = gtagSpy

    revokeAnalytics()

    expect(gtagSpy).toHaveBeenCalledWith('consent', 'update', { analytics_storage: 'denied' })
    expect((window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`]).toBe(true)
  })

  test('revokeAnalytics clears _ga and _ga_* cookies but leaves unrelated cookies alone', () => {
    const { revokeAnalytics } = freshConsentModule(GA_ID)
    window.gtag = jest.fn()

    document.cookie = '_ga=GA1.1.12345; path=/'
    document.cookie = '_ga_ABCDEF=GS1.1.1; path=/'
    document.cookie = 'unrelated_cookie=keep-me; path=/'

    revokeAnalytics()

    expect(document.cookie).not.toMatch(/_ga=/)
    expect(document.cookie).not.toMatch(/_ga_ABCDEF=/)
    expect(document.cookie).toMatch(/unrelated_cookie=keep-me/)
  })
})
