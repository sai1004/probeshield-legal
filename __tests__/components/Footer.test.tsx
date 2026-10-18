import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

test('renders every footer link with the right destination', () => {
  render(<Footer />)
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

test('includes the Cookie settings button and the current year', () => {
  render(<Footer />)
  expect(screen.getByRole('button', { name: 'Cookie settings' })).toBeInTheDocument()
  expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument()
})
