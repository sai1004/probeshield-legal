// jest.setup.js's `import '@testing-library/jest-dom'` makes these matchers work at
// test-run time (Jest's SWC transform doesn't type-check anyway), but a plain `tsc
// --noEmit` pass -- which does type-check, and is what catches mistakes like a typo'd
// matcher name -- only sees the ambient matcher types (toBeInTheDocument, etc.) if
// something in the actual TS program imports them. jest.setup.js is a .js file and
// isn't matched by tsconfig.json's include globs, so this file exists for that one
// purpose.
import '@testing-library/jest-dom'
