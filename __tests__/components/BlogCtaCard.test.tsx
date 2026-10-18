import { render, screen } from '@testing-library/react'
import BlogCtaCard from '@/components/BlogCtaCard'

describe('BlogCtaCard', () => {
  test('renders sensible defaults when no props are passed', () => {
    render(<BlogCtaCard />)
    expect(screen.getByText('Audit your home WiFi in seconds with ProbeShield')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Get it on Google Play/ })).toHaveAttribute(
      'href',
      'https://play.google.com/store/apps/details?id=com.probeshield',
    )
  })

  test('renders custom headline, description, and button text when provided', () => {
    render(
      <BlogCtaCard
        headline="Custom headline"
        description="Custom description"
        buttonText="Custom CTA"
        badgeText="Custom badge"
        variant="bottom"
      />,
    )
    expect(screen.getByText('Custom headline')).toBeInTheDocument()
    expect(screen.getByText('Custom description')).toBeInTheDocument()
    expect(screen.getByText('Custom badge')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Custom CTA/ })).toBeInTheDocument()
  })

  test('opens the Play Store link in a new tab safely', () => {
    render(<BlogCtaCard />)
    const link = screen.getByRole('link', { name: /Get it on Google Play/ })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
