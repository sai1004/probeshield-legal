import { render, screen, fireEvent } from '@testing-library/react'
import ChecklistTool from '@/components/ChecklistTool'
import { CHECKLIST_ITEMS } from '@/lib/checklist'

beforeEach(() => {
  window.localStorage.clear()
})

test('renders every checklist item after hydrating', () => {
  render(<ChecklistTool />)
  for (const item of CHECKLIST_ITEMS) {
    expect(screen.getByRole('checkbox', { name: item.label })).toBeInTheDocument()
  }
})

test('starts with nothing checked and the zero-state message when no prior state is stored', () => {
  render(<ChecklistTool />)
  expect(screen.getByText('Just starting out')).toBeInTheDocument()
  expect(screen.getByText(/saved on this device only/)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: 'Reset' })).not.toBeInTheDocument()
})

test('clicking an item checks it, shows the Reset button, and persists to localStorage', () => {
  render(<ChecklistTool />)
  const first = CHECKLIST_ITEMS[0]
  const checkbox = screen.getByRole('checkbox', { name: first.label })

  fireEvent.click(checkbox)

  expect(checkbox).toHaveAttribute('aria-checked', 'true')
  expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
  const stored = JSON.parse(window.localStorage.getItem('ps_checklist_v1')!)
  expect(stored.checked[first.id]).toBe(true)
})

test('clicking a checked item unchecks it again', () => {
  render(<ChecklistTool />)
  const first = CHECKLIST_ITEMS[0]
  const checkbox = screen.getByRole('checkbox', { name: first.label })

  fireEvent.click(checkbox)
  fireEvent.click(checkbox)

  expect(checkbox).toHaveAttribute('aria-checked', 'false')
})

test('checking every item shows "Fully checked"', () => {
  render(<ChecklistTool />)
  for (const item of CHECKLIST_ITEMS) {
    fireEvent.click(screen.getByRole('checkbox', { name: item.label }))
  }
  expect(screen.getByText('Fully checked')).toBeInTheDocument()
})

test('Reset clears all checked items and removes itself', () => {
  render(<ChecklistTool />)
  fireEvent.click(screen.getByRole('checkbox', { name: CHECKLIST_ITEMS[0].label }))
  fireEvent.click(screen.getByRole('button', { name: 'Reset' }))

  expect(screen.getByRole('checkbox', { name: CHECKLIST_ITEMS[0].label })).toHaveAttribute('aria-checked', 'false')
  expect(screen.queryByRole('button', { name: 'Reset' })).not.toBeInTheDocument()
  const stored = JSON.parse(window.localStorage.getItem('ps_checklist_v1')!)
  expect(stored.checked).toEqual({})
})

test('loads previously saved progress on mount', () => {
  window.localStorage.setItem(
    'ps_checklist_v1',
    JSON.stringify({ checked: { [CHECKLIST_ITEMS[0].id]: true }, updatedAt: Date.now() }),
  )
  render(<ChecklistTool />)
  expect(screen.getByRole('checkbox', { name: CHECKLIST_ITEMS[0].label })).toHaveAttribute('aria-checked', 'true')
  expect(screen.getByText(/Last updated/)).toBeInTheDocument()
})
