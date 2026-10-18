#!/usr/bin/env bash
# PostToolUse hook (Write|Edit): run prettier on a file right after it's
# edited, so formatting never drifts before the pre-commit hook
# (scripts/hooks/pre-commit) catches it at commit time. Mirrors
# .prettierignore's own exclusions: never .claude/ or CLAUDE.md
# (internal docs, not application code, per .claude/rules/code-style.md).
set -euo pipefail

input="$(cat)"
file_path="$(printf '%s' "$input" | jq -r '.tool_input.file_path // .tool_response.filePath // empty')"

if [[ -z "$file_path" ]]; then
  exit 0
fi

case "$file_path" in
  */.claude/*|.claude/*|*/CLAUDE.md|CLAUDE.md|*/node_modules/*|*/.next/*|*/out/*|*/coverage/*)
    exit 0
    ;;
esac

case "$file_path" in
  *.ts|*.tsx|*.js|*.jsx|*.css|*.json|*.md)
    if [[ -f "$file_path" ]]; then
      npx --no-install prettier --write "$file_path" >/dev/null 2>&1 || true
    fi
    ;;
esac

exit 0
