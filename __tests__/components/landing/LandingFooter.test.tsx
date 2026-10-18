import { render, screen } from '@testing-library/react'
import { LandingFooter } from '@/components/landing/LandingFooter'

test('renders every footer link with the right destination', () => {
  render(<LandingFooter />)
  const expected: Record<string, string> = {
    Blog: '/blog',
    Checklist: '/checklist',
    'Default Passwords': '/default-passwords',
    'Privacy Policy': '/privacy',
    'Terms of Service': '/terms',
    Contact: 'mailto:support@probeshield.com',
  }
  for (const [label, href] of Object.entries(expected)) {
    expect(screen.getByRole('link', { name: label }).getAttribute('href')).toMatch(
      new RegExp(`^${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/?$`),
    )
  }
})

test('external links (mailto, Google Play) open safely', () => {
  render(<LandingFooter />)
  const contactLink = screen.getByRole('link', { name: 'Contact' })
  expect(contactLink).toHaveAttribute('target', '_blank')
  expect(contactLink).toHaveAttribute('rel', 'noopener noreferrer')

  const playLink = screen.getByRole('link', { name: /Google Play/ })
  expect(playLink).toHaveAttribute('href', 'https://play.google.com/store/apps/details?id=com.probeshield')
  expect(playLink).toHaveAttribute('target', '_blank')
})

test('includes the current year in the copyright line', () => {
  render(<LandingFooter />)
  expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument()
})

test('includes the Cookie settings button (GA_ID is configured in tests)', () => {
  render(<LandingFooter />)
  expect(screen.getByRole('button', { name: 'Cookie settings' })).toBeInTheDocument()
})
