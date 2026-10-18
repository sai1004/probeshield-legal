# Code style rules
- No semicolons, single quotes, 2-space indent, 120 printWidth — run `npm run format` before committing
- Prettier owns formatting, ESLint owns correctness — never add a stylistic rule to `.eslintrc.json`
- `.claude/` and `CLAUDE.md` are excluded from the format gate — internal docs, not application code
- Run `npm run lint` and `npm run typecheck` locally, don't rely on the pre-commit hook to catch it first
- `tsc --noEmit` type-checks for real; Jest's SWC transform does not — a passing test suite doesn't mean the types are right
