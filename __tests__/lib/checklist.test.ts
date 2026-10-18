import { CHECKLIST_ITEMS, loadChecklistState, saveChecklistState, type ChecklistState } from '@/lib/checklist'

beforeEach(() => {
  window.localStorage.clear()
})

describe('CHECKLIST_ITEMS', () => {
  test('every item has a unique, non-empty id', () => {
    const ids = CHECKLIST_ITEMS.map((item) => item.id)
    expect(ids.every((id) => id.length > 0)).toBe(true)
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('every item has a non-empty label and detail', () => {
    for (const item of CHECKLIST_ITEMS) {
      expect(item.label.length).toBeGreaterThan(0)
      expect(item.detail.length).toBeGreaterThan(0)
    }
  })
})

describe('loadChecklistState', () => {
  test('returns empty state when nothing is stored', () => {
    expect(loadChecklistState()).toEqual({ checked: {}, updatedAt: null })
  })

  test('round-trips a saved state', () => {
    const state: ChecklistState = { checked: { 'know-devices': true, 'wps-off': false }, updatedAt: 1700000000000 }
    saveChecklistState(state)
    expect(loadChecklistState()).toEqual(state)
  })

  test('falls back to empty state on corrupt (non-JSON) stored data', () => {
    window.localStorage.setItem('ps_checklist_v1', 'not valid json{{{')
    expect(loadChecklistState()).toEqual({ checked: {}, updatedAt: null })
  })

  test('falls back to empty state when the stored shape is wrong', () => {
    window.localStorage.setItem('ps_checklist_v1', JSON.stringify({ checked: 'not-an-object' }))
    expect(loadChecklistState()).toEqual({ checked: {}, updatedAt: null })

    window.localStorage.setItem('ps_checklist_v1', JSON.stringify([1, 2, 3]))
    expect(loadChecklistState()).toEqual({ checked: {}, updatedAt: null })
  })

  test('defaults updatedAt to null if it is present but not a number', () => {
    window.localStorage.setItem('ps_checklist_v1', JSON.stringify({ checked: { a: true }, updatedAt: 'yesterday' }))
    expect(loadChecklistState()).toEqual({ checked: { a: true }, updatedAt: null })
  })

  test('does not throw if localStorage access throws', () => {
    const spy = jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(() => loadChecklistState()).not.toThrow()
    expect(loadChecklistState()).toEqual({ checked: {}, updatedAt: null })
    spy.mockRestore()
  })
})

describe('saveChecklistState', () => {
  test('does not throw if localStorage access throws', () => {
    const spy = jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(() => saveChecklistState({ checked: {}, updatedAt: null })).not.toThrow()
    spy.mockRestore()
  })
})
