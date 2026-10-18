import { render } from '@testing-library/react'
import ConsentBanner from '@/components/ConsentBanner'
import CookieSettingsButton from '@/components/CookieSettingsButton'

// jest.mock (hoisted above these imports by the Jest transform) overrides GA_ID for
// every import of @/lib/consent in this file only -- unlike jest.resetModules(), this
// doesn't touch the module registry React/Testing Library already loaded, so hooks
// keep working normally.
jest.mock('@/lib/consent', () => ({
  ...jest.requireActual('@/lib/consent'),
  GA_ID: undefined,
}))

test('ConsentBanner renders nothing when no GA_ID is configured', () => {
  const { container } = render(<ConsentBanner />)
  expect(container).toBeEmptyDOMElement()
})

test('CookieSettingsButton renders nothing when no GA_ID is configured', () => {
  const { container } = render(
    <ul>
      <CookieSettingsButton />
    </ul>,
  )
  expect(container.querySelector('button')).toBeNull()
})
