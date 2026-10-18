#!/usr/bin/env bash
# PostToolUse hook (Write|Edit): after editing either side of the theme
# mirror, run scripts/check-theme-sync.js immediately instead of waiting
# for the build. components/landing/theme.ts's `T` object must stay
# byte-identical to app/globals.css's :root custom properties — see
# .claude/rules/components.md.
set -euo pipefail

input="$(cat)"
file_path="$(printf '%s' "$input" | jq -r '.tool_input.file_path // .tool_response.filePath // empty')"

if [[ -z "$file_path" ]]; then
  exit 0
fi

case "$file_path" in
  */components/landing/theme.ts|components/landing/theme.ts|*/app/globals.css|app/globals.css)
    repo_root="$(cd "$(dirname "$0")/../.." && pwd)"
    output="$(cd "$repo_root" && node scripts/check-theme-sync.js 2>&1)" && exit 0
    escaped="$(printf '%s' "$output" | jq -Rs .)"
    jq -n --argjson msg "$escaped" '{ systemMessage: ("Theme drift: components/landing/theme.ts and app/globals.css no longer match.\n" + $msg) }'
    ;;
esac

exit 0
