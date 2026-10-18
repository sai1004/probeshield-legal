import { render, screen, fireEvent } from '@testing-library/react'
import ConsentBanner from '@/components/ConsentBanner'
import CookieSettingsButton from '@/components/CookieSettingsButton'

// GA_ID defaults to 'G-TEST1234' for every test file via jest.setup.js, captured by
// @/lib/consent at import time -- plain static imports are safe here since nothing
// needs to change that value within this file. See consent-ui-disabled.test.tsx for
// the "no GA_ID configured" case, which needs a different approach (jest.mock, not
// module reset) to avoid breaking React's hook dispatcher.

beforeEach(() => {
  window.localStorage.clear()
  delete (window as unknown as Record<string, unknown>).gtag
  delete (window as unknown as Record<string, unknown>).dataLayer
})

test('ConsentBanner opens automatically when no choice has been stored yet', () => {
  window.gtag = jest.fn()
  render(<ConsentBanner />)
  expect(screen.getByRole('dialog', { name: 'Analytics cookies' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Decline' })).toBeInTheDocument()
})

test('ConsentBanner stays closed if a choice was already stored', () => {
  window.localStorage.setItem('ps_analytics_consent', 'granted')
  window.gtag = jest.fn()
  render(<ConsentBanner />)
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('clicking Accept stores the choice, grants analytics, and closes the banner', () => {
  const gtagSpy = jest.fn()
  window.gtag = gtagSpy
  render(<ConsentBanner />)

  fireEvent.click(screen.getByRole('button', { name: 'Accept' }))

  expect(window.localStorage.getItem('ps_analytics_consent')).toBe('granted')
  expect(gtagSpy).toHaveBeenCalledWith('consent', 'update', { analytics_storage: 'granted' })
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('clicking Decline stores the choice, revokes analytics, and closes the banner', () => {
  const gtagSpy = jest.fn()
  window.gtag = gtagSpy
  render(<ConsentBanner />)

  fireEvent.click(screen.getByRole('button', { name: 'Decline' }))

  expect(window.localStorage.getItem('ps_analytics_consent')).toBe('denied')
  expect(gtagSpy).toHaveBeenCalledWith('consent', 'update', { analytics_storage: 'denied' })
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('the "Learn more" link points at the privacy policy analytics section', () => {
  window.gtag = jest.fn()
  render(<ConsentBanner />)
  const href = screen.getByRole('link', { name: 'Learn more' }).getAttribute('href')
  expect(href).toMatch(/^\/privacy\/?#section-7$/)
})

test('CookieSettingsButton dispatching its event reopens an already-decided ConsentBanner', () => {
  window.localStorage.setItem('ps_analytics_consent', 'denied')
  window.gtag = jest.fn()
  render(
    <>
      <ConsentBanner />
      <ul>
        <CookieSettingsButton />
      </ul>
    </>,
  )

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Cookie settings' }))
  expect(screen.getByRole('dialog', { name: 'Analytics cookies' })).toBeInTheDocument()
})
