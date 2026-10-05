'use client'

import { useMemo, useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

type LookupState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'found'; oui: string; vendor: string }
  | { status: 'not_found'; oui: string }
  | { status: 'invalid' }
  | { status: 'error' }

// Only hex digits and common MAC separators are ever valid input. Anything
// else means the user pasted something that isn't a MAC address at all —
// reject it outright rather than silently stripping it, since silently
// stripping stray characters (e.g. the "e" in "hello3ca6f6") would otherwise
// extract a plausible-looking but wrong OUI instead of flagging the mistake.
const ALLOWED_CHARS = /^[0-9A-Fa-f:\-.\s]*$/
const SEPARATORS = /[:\-.\s]/g

/** Validates input and extracts the first 6 hex characters — the OUI.
 *  This happens before anything is sent anywhere: a pasted full MAC address
 *  never leaves the browser intact, only its vendor-identifying prefix does. */
function extractOui(input: string): string | null {
  const trimmed = input.trim()
  if (!trimmed || !ALLOWED_CHARS.test(trimmed)) return null

  const hex = trimmed.replace(SEPARATORS, '').toUpperCase()
  if (hex.length < 6) return null

  return hex.slice(0, 6)
}

export default function MacLookupTool() {
  const [input, setInput] = useState('')
  const [state, setState] = useState<LookupState>({ status: 'idle' })

  const oui = useMemo(() => extractOui(input), [input])
  const showLiveHint = input.trim().length > 0 && !oui

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!oui) {
      setState({ status: 'invalid' })
      return
    }

    setState({ status: 'loading' })
    try {
      const res = await fetch(`${API_URL}/api/mac-lookup?oui=${oui}`)
      const data = await res.json()

      if (res.ok && 'vendor' in data) {
        setState({ status: 'found', oui, vendor: data.vendor })
      } else if (res.status === 404) {
        setState({ status: 'not_found', oui })
      } else {
        setState({ status: 'invalid' })
      }
    } catch {
      setState({ status: 'error' })
    }
  }

  return (
    <div className="mac-tool">
      <form className="mac-search" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          inputMode="text"
          required
          maxLength={32}
          placeholder="Paste a MAC address, e.g. 3C:A6:F6:9D:2E:11"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="MAC address or OUI"
          aria-invalid={showLiveHint}
        />
        <button type="submit" disabled={!oui || state.status === 'loading'}>
          {state.status === 'loading' ? 'Looking up…' : 'Find vendor'}
        </button>
      </form>

      {showLiveHint && (
        <p className="mac-live-hint">
          That doesn&apos;t look like a MAC address yet — needs at least 6 hex characters (0-9, A-F).
        </p>
      )}

      <p className="mac-privacy-note">
        🔒 Only the first 6 characters (the vendor prefix) are sent — truncated in your browser before
        anything leaves it. The rest of the address, which identifies your specific device, never goes
        anywhere.
      </p>

      {state.status === 'found' && (
        <div className="mac-result mac-result-found">
          <div className="mac-result-oui">{state.oui}</div>
          <div className="mac-result-vendor">{state.vendor}</div>
        </div>
      )}

      {state.status === 'not_found' && (
        <div className="mac-result mac-result-empty">
          <p>
            No match for <code>{state.oui}</code>. This usually means either the device uses a randomized
            (privacy) MAC address — common on modern phones when they&apos;re not connected to your saved
            network — or it&apos;s from a newer registration not yet in the public IEEE database.
          </p>
        </div>
      )}

      {state.status === 'invalid' && (
        <div className="mac-result mac-result-empty">
          <p>That doesn&apos;t look like a MAC address — paste at least the first 6 hex characters (e.g. <code>3CA6F6</code> or <code>3C:A6:F6</code>).</p>
        </div>
      )}

      {state.status === 'error' && (
        <div className="mac-result mac-result-empty">
          <p>Couldn&apos;t reach the lookup service — try again in a moment.</p>
        </div>
      )}
    </div>
  )
}
