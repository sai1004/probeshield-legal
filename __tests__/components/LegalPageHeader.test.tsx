import { render, screen } from '@testing-library/react'
import { LegalPageHeader } from '@/components/legal/LegalPageHeader'

describe('LegalPageHeader', () => {
  test('renders the badge, title + accent, and all three meta fields', () => {
    render(
      <LegalPageHeader
        badge="📄 Legal Document"
        title="Privacy"
        titleAccent="Policy"
        effectiveDate="March 26, 2026"
        lastUpdated="October 18, 2026"
        version="1.5"
      />,
    )

    expect(screen.getByText('📄 Legal Document')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Privacy Policy')
    expect(screen.getByText('March 26, 2026')).toBeInTheDocument()
    expect(screen.getByText('October 18, 2026')).toBeInTheDocument()
    expect(screen.getByText('1.5')).toBeInTheDocument()
  })

  test('renders distinct title/accent text for a different page (Terms)', () => {
    render(
      <LegalPageHeader
        badge="📋 Legal Document"
        title="Terms of"
        titleAccent="Service"
        effectiveDate="March 26, 2026"
        lastUpdated="October 18, 2026"
        version="1.1"
      />,
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Terms of Service')
  })
})
