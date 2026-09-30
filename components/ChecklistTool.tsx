'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { CHECKLIST_ITEMS, loadChecklistState, saveChecklistState, type ChecklistState } from '@/lib/checklist'

function scoreLabel(percent: number): string {
  if (percent === 100) return 'Fully checked'
  if (percent >= 70) return 'Mostly there'
  if (percent >= 40) return 'Getting started'
  return 'Just starting out'
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function ChecklistTool() {
  const [state, setState] = useState<ChecklistState>({ checked: {}, updatedAt: null })
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setState(loadChecklistState())
    setHydrated(true)
  }, [])

  const checkedCount = useMemo(() => Object.values(state.checked).filter(Boolean).length, [state.checked])
  const total = CHECKLIST_ITEMS.length
  const percent = Math.round((checkedCount / total) * 100)

  const toggle = (id: string) => {
    setState((prev) => {
      const next: ChecklistState = {
        checked: { ...prev.checked, [id]: !prev.checked[id] },
        updatedAt: Date.now(),
      }
      saveChecklistState(next)
      return next
    })
  }

  const reset = () => {
    const next: ChecklistState = { checked: {}, updatedAt: null }
    setState(next)
    saveChecklistState(next)
  }

  // Avoid a hydration mismatch: server has no localStorage, so render the zero-state until mounted.
  if (!hydrated) {
    return <div className="checklist-tool" aria-hidden="true" />
  }

  return (
    <div className="checklist-tool">
      <div className="checklist-score">
        <div
          className="checklist-ring"
          style={{ ['--pct' as string]: `${percent}%` }}
        >
          <span className="checklist-ring-number">{checkedCount}</span>
          <span className="checklist-ring-total">/ {total}</span>
        </div>
        <div className="checklist-score-text">
          <div className="checklist-score-label">{scoreLabel(percent)}</div>
          <div className="checklist-score-sub">
            {state.updatedAt
              ? `Last updated ${formatDate(state.updatedAt)}`
              : 'Check off items as you go — saved on this device only'}
          </div>
        </div>
        {checkedCount > 0 && (
          <button type="button" className="checklist-reset" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul className="checklist-items">
        {CHECKLIST_ITEMS.map((item, i) => {
          const checked = !!state.checked[item.id]
          return (
            <li key={item.id} className={`checklist-item${checked ? ' checklist-item-checked' : ''}`}>
              <button
                type="button"
                className="checklist-checkbox"
                role="checkbox"
                aria-checked={checked}
                aria-label={item.label}
                onClick={() => toggle(item.id)}
              >
                {checked ? '✓' : i + 1}
              </button>
              <div className="checklist-item-body">
                <span className="checklist-item-label">{item.label}</span>
                <span className="checklist-item-detail">
                  {item.detail}
                  {item.link && (
                    <>
                      {' — '}
                      <Link href={item.link.href}>{item.link.label}</Link>
                    </>
                  )}
                </span>
              </div>
            </li>
          )
        })}
      </ul>

      <p className="checklist-privacy-note">
        Nothing you check here is sent anywhere — it&apos;s saved only in this browser, on this device.
      </p>
    </div>
  )
}
