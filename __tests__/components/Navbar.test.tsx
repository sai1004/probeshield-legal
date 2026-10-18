import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '@/components/Navbar'

const mockUsePathname = jest.fn()
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

test('renders every nav link', () => {
  mockUsePathname.mockReturnValue('/')
  render(<Navbar />)
  for (const label of ['Blog', 'Checklist', 'Default Passwords', 'MAC Lookup']) {
    expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
  }
})

test('marks the exact current page as active', () => {
  mockUsePathname.mockReturnValue('/checklist')
  render(<Navbar />)
  expect(screen.getByRole('link', { name: 'Checklist' })).toHaveClass('active')
  expect(screen.getByRole('link', { name: 'Blog' })).not.toHaveClass('active')
})

test('treats any /blog/* path as the Blog link being active', () => {
  mockUsePathname.mockReturnValue('/blog/some-post-slug')
  render(<Navbar />)
  expect(screen.getByRole('link', { name: 'Blog' })).toHaveClass('active')
})

test('no link is active on an unrelated page', () => {
  mockUsePathname.mockReturnValue('/privacy')
  render(<Navbar />)
  for (const label of ['Blog', 'Checklist', 'Default Passwords', 'MAC Lookup']) {
    expect(screen.getByRole('link', { name: label })).not.toHaveClass('active')
  }
})

test('the hamburger toggle opens and closes the mobile menu', () => {
  mockUsePathname.mockReturnValue('/')
  render(<Navbar />)
  const toggle = screen.getByRole('button', { name: 'Open menu' })
  fireEvent.click(toggle)
  expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
})

test('clicking a link closes the mobile menu', () => {
  mockUsePathname.mockReturnValue('/')
  render(<Navbar />)
  fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
  fireEvent.click(screen.getByRole('link', { name: 'Blog' }))
  expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument()
})
