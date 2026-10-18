import { render, screen, fireEvent } from '@testing-library/react'
import { LandingNav } from '@/components/landing/LandingNav'

// LandingNav renders every nav item twice -- once in the desktop list, once in the
// CSS-only-hidden mobile dropdown -- so assertions use getAllBy* rather than getBy*.

afterEach(() => {
  // Reset scrollY between tests since LandingNav reads it on mount via useEffect.
  Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
})

test('renders the brand link and the Google Play download button', () => {
  render(<LandingNav />)
  expect(screen.getByRole('link', { name: /ProbeShield/ })).toHaveAttribute('href', '/')
  expect(screen.getByRole('link', { name: /Google Play/ })).toHaveAttribute(
    'href',
    'https://play.google.com/store/apps/details?id=com.probeshield',
  )
})

test('renders each nav item in both the desktop and mobile lists', () => {
  render(<LandingNav />)
  for (const label of ['Features', 'How It Works', 'Blog', 'Checklist', 'Default Passwords', 'MAC Lookup']) {
    expect(screen.getAllByText(label)).toHaveLength(2)
  }
})

test('the hamburger button opens and closes the mobile menu', () => {
  render(<LandingNav />)
  const toggle = screen.getByRole('button', { name: 'Open menu' })
  expect(toggle).toHaveAttribute('aria-expanded', 'false')

  fireEvent.click(toggle)
  expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')

  fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
})

test('clicking a mobile nav link closes the mobile menu', () => {
  render(<LandingNav />)
  fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
  expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument()

  // The second "Features" link is the mobile-list one.
  const mobileFeaturesLink = screen.getAllByText('Features')[1]
  fireEvent.click(mobileFeaturesLink)

  expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument()
})

test('scrolling past the threshold adds the scrolled background', () => {
  render(<LandingNav />)
  Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
  fireEvent.scroll(window)
  const nav = document.querySelector('.lp-navbar') as HTMLElement
  expect(nav.style.background).not.toBe('transparent')
})
