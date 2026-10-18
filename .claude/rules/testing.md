# Testing rules
- Write unit tests alongside new code, not after — no file merges without them
- Minimum 80% coverage (statements/branches/functions/lines), whole codebase, enforced by `npm test`
- Sanity-check a new test by temporarily breaking the source and confirming it fails, not just that it passes
- Never call `jest.resetModules()` after React/Testing Library are loaded — it creates a second React instance and breaks hooks; use `jest.mock` + `jest.requireActual` instead
- `scripts/` (standalone Node CLI tools) are excluded from the coverage gate — verify those by hand, not Jest
