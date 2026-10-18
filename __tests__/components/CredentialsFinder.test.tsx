import { render, screen, fireEvent } from '@testing-library/react'
import CredentialsFinder from '@/components/CredentialsFinder'
import { BRAND_CREDENTIALS, GENERIC_CREDENTIALS } from '@/lib/defaultCredentials'

test('shows every brand by default', () => {
  render(<CredentialsFinder />)
  const uniqueBrands = new Set(BRAND_CREDENTIALS.map((c) => c.brand))
  for (const brand of uniqueBrands) {
    expect(screen.getByText(brand)).toBeInTheDocument()
  }
})

test('shows every generic default', () => {
  render(<CredentialsFinder />)
  for (const cred of GENERIC_CREDENTIALS) {
    const user = cred.username || '(blank)'
    const pass = cred.password || '(blank)'
    // Some generic/brand pairs happen to share the same text (e.g. "admin / admin"),
    // so this just needs at least one match, not exactly one.
    expect(screen.getAllByText(`${user} / ${pass}`).length).toBeGreaterThan(0)
  }
})

test('typing a brand name filters the results', () => {
  render(<CredentialsFinder />)
  fireEvent.change(screen.getByRole('textbox', { name: 'Search by device brand' }), {
    target: { value: 'netgear' },
  })
  expect(screen.getByText('Netgear')).toBeInTheDocument()
  expect(screen.queryByText('TP-Link')).not.toBeInTheDocument()
})

test('search is case-insensitive', () => {
  render(<CredentialsFinder />)
  fireEvent.change(screen.getByRole('textbox', { name: 'Search by device brand' }), {
    target: { value: 'NETGEAR' },
  })
  expect(screen.getByText('Netgear')).toBeInTheDocument()
})

test('shows a fallback message for a brand with no match', () => {
  render(<CredentialsFinder />)
  fireEvent.change(screen.getByRole('textbox', { name: 'Search by device brand' }), {
    target: { value: 'totally-not-a-real-brand' },
  })
  expect(screen.getByText(/No brand-specific entry for that yet/)).toBeInTheDocument()
})

test('clearing the search shows every brand again', () => {
  render(<CredentialsFinder />)
  const input = screen.getByRole('textbox', { name: 'Search by device brand' })
  fireEvent.change(input, { target: { value: 'netgear' } })
  fireEvent.change(input, { target: { value: '' } })
  expect(screen.getByText('TP-Link')).toBeInTheDocument()
})
