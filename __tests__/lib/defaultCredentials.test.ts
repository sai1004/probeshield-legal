import { BRAND_CREDENTIALS, GENERIC_CREDENTIALS, CREDENTIALS_LAST_REVIEWED } from '@/lib/defaultCredentials'

describe('BRAND_CREDENTIALS', () => {
  test('every entry has a non-empty brand, username, and a valid service', () => {
    const validServices = new Set(['http', 'ssh', 'telnet', 'ftp'])
    for (const cred of BRAND_CREDENTIALS) {
      expect(cred.brand.length).toBeGreaterThan(0)
      expect(cred.username.length).toBeGreaterThan(0)
      expect(validServices.has(cred.service)).toBe(true)
    }
  })

  test('is not empty', () => {
    expect(BRAND_CREDENTIALS.length).toBeGreaterThan(0)
  })
})

describe('GENERIC_CREDENTIALS', () => {
  test('every entry has a valid service (username/password may be empty, e.g. anonymous FTP)', () => {
    const validServices = new Set(['http', 'ssh', 'telnet', 'ftp'])
    for (const cred of GENERIC_CREDENTIALS) {
      expect(validServices.has(cred.service)).toBe(true)
    }
  })

  test('is not empty', () => {
    expect(GENERIC_CREDENTIALS.length).toBeGreaterThan(0)
  })
})

test('CREDENTIALS_LAST_REVIEWED is a valid date string', () => {
  expect(Number.isNaN(new Date(CREDENTIALS_LAST_REVIEWED).getTime())).toBe(false)
})
