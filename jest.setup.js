import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'node:util'

// jsdom's environment doesn't provide these globally (react-dom/server's browser
// build needs TextEncoder; nothing in this app uses TextDecoder directly, but some
// transitive dependency expects the pair).
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder
  global.TextDecoder = TextDecoder
}

// lib/consent.ts captures GA_ID from this env var at module-import time. Most tests
// want a deterministic non-empty value rather than whatever (if anything) .env.local
// happens to define; tests that specifically need the "no GA_ID" path mock
// @/lib/consent's GA_ID export directly instead (see __tests__/components/
// consent-ui-disabled.test.tsx) rather than mutating this at runtime, since resetting
// the module registry after React/Testing Library are already loaded breaks hooks
// (two different React instances end up in play).
if (!process.env.NEXT_PUBLIC_GA_ID) {
  process.env.NEXT_PUBLIC_GA_ID = 'G-TEST1234'
}

// jsdom has no IntersectionObserver at all; framer-motion's useInView (used throughout
// components/landing/* for scroll-reveal) needs one to exist, even though jsdom can't
// actually fire real intersection events. This stub just satisfies the "does the
// constructor exist" check so components render instead of throwing; it never reports
// anything in view, so `initial`/non-inView visual states are what tests observe.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
global.IntersectionObserver = MockIntersectionObserver
