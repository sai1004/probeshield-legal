#!/usr/bin/env bash
# Install probeshield-legal git hooks for local development.
# Run once after cloning: ./scripts/install-hooks.sh

set -euo pipefail
REPO_ROOT="$(git rev-parse --show-toplevel)"
HOOKS_SRC="$REPO_ROOT/scripts/hooks"
HOOKS_DST="$REPO_ROOT/.git/hooks"

cp "$HOOKS_SRC/pre-commit" "$HOOKS_DST/pre-commit"
chmod +x "$HOOKS_DST/pre-commit"
echo "✔ pre-commit hook installed"
