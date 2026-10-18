#!/usr/bin/env bash
# PostToolUse hook (Write|Edit): warn if a test file calls
# jest.resetModules() after React/Testing Library are loaded — it creates
# a second React module instance and breaks hooks. Use jest.mock +
# jest.requireActual instead. See .claude/rules/testing.md.
set -euo pipefail

input="$(cat)"
file_path="$(printf '%s' "$input" | jq -r '.tool_input.file_path // .tool_response.filePath // empty')"

if [[ -z "$file_path" ]]; then
  exit 0
fi

case "$file_path" in
  *.test.ts|*.test.tsx)
    if [[ -f "$file_path" ]] && grep -q 'resetModules' "$file_path"; then
      jq -n '{
        systemMessage: "jest.resetModules() gotcha: this test file calls resetModules(). If React/Testing Library are already loaded by then, this creates a second React module instance and breaks hooks (useState receives null). Use jest.mock(...) + jest.requireActual(...) instead — see .claude/rules/testing.md."
      }'
    fi
    ;;
esac

exit 0
