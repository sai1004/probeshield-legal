import { render, screen } from '@testing-library/react'
import { StatsBar } from '@/components/landing/StatsBar'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { RiskSection } from '@/components/landing/RiskSection'
import { PrivacySection } from '@/components/landing/PrivacySection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { CtaSection } from '@/components/landing/CtaSection'
import { STATS, FEATURES, RISK_LEVELS, PRIVACY_ITEMS, STEPS } from '@/components/landing/data'

test('StatsBar renders every stat value and label', () => {
  render(<StatsBar />)
  for (const { value, label } of STATS) {
    expect(screen.getByText(value)).toBeInTheDocument()
    expect(screen.getByText(label)).toBeInTheDocument()
  }
})

test('FeaturesSection renders every feature title and description', () => {
  render(<FeaturesSection />)
  for (const { title, desc } of FEATURES) {
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(desc)).toBeInTheDocument()
  }
})

test('RiskSection renders every risk level label and description', () => {
  render(<RiskSection />)
  for (const { label, desc } of RISK_LEVELS) {
    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByText(desc)).toBeInTheDocument()
  }
})

test('PrivacySection renders every privacy promise item and links to the full policy', () => {
  render(<PrivacySection />)
  for (const item of PRIVACY_ITEMS) {
    expect(screen.getByText(item)).toBeInTheDocument()
  }
  const href = screen.getByRole('link', { name: /Read the full Privacy Policy/ }).getAttribute('href')
  expect(href).toMatch(/^\/privacy\/?$/)
})

test('HowItWorksSection renders every step number, title, and description', () => {
  render(<HowItWorksSection />)
  for (const { num, title, desc } of STEPS) {
    expect(screen.getByText(num)).toBeInTheDocument()
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(desc)).toBeInTheDocument()
  }
})

test('CtaSection renders the closing headline and a large download button', () => {
  render(<CtaSection />)
  expect(screen.getByText('Network Today')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Get it on Google Play/ })).toHaveAttribute(
    'href',
    'https://play.google.com/store/apps/details?id=com.probeshield',
  )
})
