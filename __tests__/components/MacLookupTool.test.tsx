import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MacLookupTool from '@/components/MacLookupTool'

function mockFetchOnce(response: { ok: boolean; status?: number; json: () => Promise<unknown> }) {
  global.fetch = jest.fn().mockResolvedValueOnce(response) as jest.Mock
}

beforeEach(() => {
  jest.restoreAllMocks()
})

test('the submit button is disabled until a valid-looking MAC/OUI is entered', () => {
  render(<MacLookupTool />)
  const button = screen.getByRole('button', { name: 'Find vendor' })
  expect(button).toBeDisabled()

  fireEvent.change(screen.getByRole('textbox', { name: 'MAC address or OUI' }), {
    target: { value: 'B8:27:EB:A1:B2:C3' },
  })
  expect(button).not.toBeDisabled()
})

test('shows a live hint for input that is not yet a valid MAC/OUI, without flagging it as invalid on submit', () => {
  render(<MacLookupTool />)
  fireEvent.change(screen.getByRole('textbox', { name: 'MAC address or OUI' }), { target: { value: 'B827' } })
  expect(screen.getByText(/needs at least 6 hex characters/)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Find vendor' })).toBeDisabled()
})

test('submitting a found vendor renders the OUI and vendor name', async () => {
  mockFetchOnce({ ok: true, json: async () => ({ vendor: 'Raspberry Pi Foundation' }) })
  render(<MacLookupTool />)

  fireEvent.change(screen.getByRole('textbox', { name: 'MAC address or OUI' }), {
    target: { value: 'B8:27:EB:A1:B2:C3' },
  })
  fireEvent.click(screen.getByRole('button', { name: 'Find vendor' }))

  await waitFor(() => expect(screen.getByText('Raspberry Pi Foundation')).toBeInTheDocument())
  expect(screen.getByText('B827EB')).toBeInTheDocument()
})

test('only the 6-character OUI is sent to the lookup API, never the full address', async () => {
  mockFetchOnce({ ok: true, json: async () => ({ vendor: 'Someone' }) })
  render(<MacLookupTool />)

  fireEvent.change(screen.getByRole('textbox', { name: 'MAC address or OUI' }), {
    target: { value: 'B8:27:EB:A1:B2:C3' },
  })
  fireEvent.click(screen.getByRole('button', { name: 'Find vendor' }))

  await waitFor(() => expect(global.fetch).toHaveBeenCalled())
  const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string
  expect(calledUrl).toContain('oui=B827EB')
  expect(calledUrl).not.toContain('A1B2C3')
})

test('a 404 response shows the not-found explanation', async () => {
  mockFetchOnce({ ok: false, status: 404, json: async () => ({}) })
  render(<MacLookupTool />)

  fireEvent.change(screen.getByRole('textbox', { name: 'MAC address or OUI' }), { target: { value: 'AABBCC' } })
  fireEvent.click(screen.getByRole('button', { name: 'Find vendor' }))

  await waitFor(() => expect(screen.getByText(/No match for/)).toBeInTheDocument())
})

test('a network failure shows the service-unreachable message', async () => {
  global.fetch = jest.fn().mockRejectedValueOnce(new Error('network down'))
  render(<MacLookupTool />)

  fireEvent.change(screen.getByRole('textbox', { name: 'MAC address or OUI' }), { target: { value: 'AABBCC' } })
  fireEvent.click(screen.getByRole('button', { name: 'Find vendor' }))

  await waitFor(() => expect(screen.getByText(/Couldn't reach the lookup service/)).toBeInTheDocument())
})

test('non-hex, non-separator characters are rejected rather than silently stripped', () => {
  render(<MacLookupTool />)
  fireEvent.change(screen.getByRole('textbox', { name: 'MAC address or OUI' }), {
    target: { value: 'hellob827eb' },
  })
  // Garbage input like this must not be treated as a valid 6-hex-char OUI.
  expect(screen.getByRole('button', { name: 'Find vendor' })).toBeDisabled()
})
