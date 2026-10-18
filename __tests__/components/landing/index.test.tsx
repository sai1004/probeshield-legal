import { render, screen } from '@testing-library/react'
import LandingPage from '@/components/landing'

test('composes every section without crashing', () => {
  render(<LandingPage />)
  expect(screen.getByText('Probe Everything.')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /Complete Network Security.*in Your Pocket/s })).toBeInTheDocument()
  expect(screen.getByText('Five-Tier Security Rating')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'How It Works' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /Start Auditing Your.*Network Today/s })).toBeInTheDocument()
})
