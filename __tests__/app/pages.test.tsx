import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'
import ChecklistPage from '@/app/checklist/page'
import DefaultPasswordsPage from '@/app/default-passwords/page'
import MacLookupPage from '@/app/tools/mac-lookup/page'
import BlogIndexPage from '@/app/blog/page'
import PrivacyPolicy from '@/app/privacy/page'
import TermsOfService from '@/app/terms/page'
import { posts } from '@/content/posts'

test('Home renders the landing page', () => {
  render(<HomePage />)
  expect(screen.getByText('Probe Everything.')).toBeInTheDocument()
})

test('Checklist page renders its header and the ChecklistTool', () => {
  render(<ChecklistPage />)
  expect(screen.getByRole('heading', { name: /Network Security Checklist/ })).toBeInTheDocument()
  expect(screen.getByText(/saved on this device only/)).toBeInTheDocument()
})

test('Default Passwords page renders its header and the CredentialsFinder', () => {
  render(<DefaultPasswordsPage />)
  expect(screen.getByRole('heading', { name: /Default Router.*Passwords/s })).toBeInTheDocument()
  expect(screen.getByRole('textbox', { name: 'Search by device brand' })).toBeInTheDocument()
})

test('MAC Lookup page renders its header and the MacLookupTool', () => {
  render(<MacLookupPage />)
  expect(screen.getByRole('heading', { name: /MAC Address Vendor.*Lookup/s })).toBeInTheDocument()
  expect(screen.getByRole('textbox', { name: 'MAC address or OUI' })).toBeInTheDocument()
})

test('Blog index lists every post', () => {
  render(<BlogIndexPage />)
  for (const post of posts) {
    expect(screen.getByRole('heading', { name: post.title })).toBeInTheDocument()
  }
})

test('Privacy Policy renders all 12 sections', () => {
  render(<PrivacyPolicy />)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Privacy Policy')
  for (let i = 1; i <= 12; i++) {
    expect(document.getElementById(`section-${i}`)).toBeInTheDocument()
  }
})

test('Terms of Service renders all 13 sections', () => {
  render(<TermsOfService />)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Terms of Service')
  for (let i = 1; i <= 13; i++) {
    expect(document.getElementById(`section-${i}`)).toBeInTheDocument()
  }
})
